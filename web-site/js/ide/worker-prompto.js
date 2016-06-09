importScripts("worker-base.js");
ace.define('ace/worker/prompto',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var PromptoWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
        this.$projectId = null;
        this.$dialect = null;
        this.$value = this.doc.getValue();
        this.$core = false;
        this.$repo = new codebase.Repository();
        this.$loading = {};
        this.onInit();
    };

    oop.inherits(PromptoWorker, Mirror);

    PromptoWorker.prototype.setDialect = function(dialect) {
        var old = this.$dialect;
        this.$dialect = dialect;
        if(old && dialect!==old) {
            var value = this.doc.getValue();
            if(value) {
                var worker = this;
                // remember value since it does not result from an edit
                this.$value = safe_require(function() {
                    return worker.$repo.translate(value, old, dialect);
                });
                this.sender.emit("value", this.$value);
            }
        }
    };

    PromptoWorker.prototype.setContent = function(id) {
        var worker = this;
        safe_require(function() {
            // remember value if it does not result from an edit
            if(id) {
                worker.$value = worker.$repo.getDeclarationBody(id, worker.$dialect);
                worker.$core = id.core || false;
            } else {
                worker.$value = "";
                worker.$core = false;
            }
            worker.sender.emit("value", worker.$value);
        });
    };

    PromptoWorker.prototype.destroy = function(id) {
        this.$value = "";
        var worker = this;
        safe_require(function() {
            var catalog = worker.$repo.handleDestroyed(id);
            if(catalog) {
                worker.sender.emit("catalog", catalog);
            }
        });
        this.sender.emit("value", this.$value);
    };

    PromptoWorker.prototype.runMethod = function(id, mode) {
        if (mode.indexOf("LOCAL")>=0)
            this.interpretLocally(id);
        else if(mode.indexOf("INTERPRET")>=0)
            this.runRemotely(id,"interpret");
        else // compiled
            this.runRemotely(id, "execute");
    };

    PromptoWorker.prototype.runRemotely = function(id, mode) {
        var worker = this;
        this.getDataExplorerURL(function(url) {
            var name = id.method || id.test;
            var fullUrl = url + "/ws/run/" + mode + "/" + name;
            worker.loadJSON(fullUrl, function(response) {
                if(response.error)
                    console.log(response.error);
                else
                    console.log(response.data);
                worker.sender.emit("done");
            });
        });
    };

    PromptoWorker.prototype.executeRemotely = function(id) {
        var name = id.method || id.test;
        console.log("Execute remotely " + name + " not implemented yet!")
        this.sender.emit("done");
    };

    PromptoWorker.prototype.interpretLocally = function(id) {
        var context = this.$repo.projectContext;
        safe_require(function () {
            if(id.test)
                prompto.runtime.Interpreter.interpretTest(context, id.test);
            else if(id.method) {
                prompto.runtime.Interpreter.interpret(context, id.method, "");
                console.log("Finished running " + id.method);
            }
        });
        this.sender.emit("done");
    };

    PromptoWorker.prototype.setProject = function(projectId, loadDependencies) {
        this.$projectId = projectId;
        this.unpublishProject();
        this.loadProject(projectId, loadDependencies);
    };

    PromptoWorker.prototype.loadDependency = function(dependency) {
        this.markLoading(dependency.name);
        var worker = this;
        this.fetchLibraryDeclarations(dependency.name, dependency.version, function(response) {
            if(response.error)
                ; // TODO something
            else {
                safe_require(function() {
                    var declarations = response.data.value;
                    worker.$repo.registerLibraryDeclarations(declarations);
                    worker.markLoaded(dependency.name);
                });
            }
        });
    };

    PromptoWorker.prototype.loadProject = function(projectId, loadDependencies) {
        var worker = this;
        this.fetchModuleDescription(projectId, true, function(response) {
            if(response.error)
                ; // TODO something
            else {
                var project = response.data.value;
                if(loadDependencies && project.dependencies) {
                    project.dependencies.value.map(function(dep) {
                        worker.loadDependency(dep.value);
                    });
                }
                worker.markLoaded("%Description%");
            }
        });
        this.fetchProjectDeclarations(projectId, function(response) {
            if(response.error)
                ; // TODO something
            else {
                safe_require(function() {
                    var declarations = response.data.value;
                    worker.$repo.registerProjectDeclarations(projectId, declarations);
                    worker.markLoaded("Project");
                });
            }
        });
    };

    PromptoWorker.prototype.getDataExplorerURL = function(success) {
        var url = '/ws/run/getDataExplorerURL';
        this.loadJSON(url, function(response) {
            if (response.error)
                ; // TODO something
            else {
                var actual = response.data.substring(0, response.data.lastIndexOf("/"));
                success(actual);
            }
        });
    };

    PromptoWorker.prototype.fetchModuleDescription = function(projectId, register, success) {
        var params = [ {name:"dbId", value:projectId.toString()}, {name:"register", type:"Boolean", value:register}];
        var url = '/ws/run/getModuleDescription?params=' + JSON.stringify(params);
        this.loadJSON(url, success);
    };

    PromptoWorker.prototype.fetchLibraryDeclarations = function(name, version, success) {
        var params = [ {name:"name", type:"Text", value:name}, {name:"version", type:"Text", value:version}];
        var url = '/ws/run/getModuleDeclarations?params=' + JSON.stringify(params);
        this.loadJSON(url, success);
    };

    PromptoWorker.prototype.fetchProjectDeclarations = function(projectId, success) {
        var params = [ {name:"dbId", value:projectId.toString()}];
        var url = '/ws/run/getModuleDeclarations?params=' + JSON.stringify(params);
        this.loadJSON(url, success);
    };

    PromptoWorker.prototype.commit = function() {
        var worker = this;
        safe_require(function() {
            worker.commitProject();
        });
    };

    /* a utility function to inspect worker data from Safari/Firefox/IE */
    PromptoWorker.prototype.inspect = function(name) {
        var inspected = eval(name);
        this.sender.emit("inspected", inspected);
    };

    PromptoWorker.prototype.onUpdate = function() {
        var value = this.doc.getValue();
        var errorListener = new AnnotatingErrorListener();
        var worker = this;
        safe_require(function () {
            if(value==worker.$value)
                worker.$repo.handleSetContent(value, worker.$dialect, errorListener);
            else {
                var catalog = worker.$repo.handleEditContent(value, worker.$dialect, errorListener);
                if (catalog) {
                    worker.sender.emit("catalog", catalog);
                }
            }
        });
        this.$value = value;
        this.sender.emit("annotate", errorListener.problems);
    };

    PromptoWorker.prototype.onInit = function() {
        this.markLoading("Project");
        // fake 'library' to ensure libraries are published only once dependencies are loaded
        this.markLoading("%Description%");
        // load core
        this.markLoading("Core");
        var worker = this;
        this.loadText("../../prompto/prompto.pec", function(text) {
            safe_require(function() {
                worker.$repo.registerLibraryCode(text, "E");
                worker.markLoaded("Core");
            });
        });
    };

    PromptoWorker.prototype.markLoading = function(name) {
        this.$loading[name] = true;
    };


    PromptoWorker.prototype.markLoaded = function(name) {
        delete this.$loading[name];
        // is this the Project ?
        if(name=="Project")
            this.publishProject();
        // is this the last library ?
        else if (Object.keys(this.$loading).length == 1 && "Project" in this.$loading)
            this.publishLibraries();
        // is this the last loading
        else if (Object.keys(this.$loading).length == 0)
            this.publishLibraries();
    };

    PromptoWorker.prototype.loadJSON = function(url, success) {
        this.loadText(url, function (text) {
            var json = JSON.parse(text);
            success(json);
        });
    };

    PromptoWorker.prototype.loadText = function(url, success) {
        var xhr = new XMLHttpRequest();
        xhr.onerror = function(e) {
            self.console.log("Error " + e.target.status + " occurred while receiving the document.");
            return null;
        };
        xhr.onload = function(e) {
            success(xhr.responseText);
        };
        xhr.open('GET', url);
        if(url[0]!="/" && url[0]!=".")
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.send(null);
    };

    PromptoWorker.prototype.publishLibraries = function () {
        var catalog = this.$repo.publishLibraries();
        this.sender.emit("catalog", catalog);
    };


    PromptoWorker.prototype.publishProject = function() {
        var catalog = this.$repo.publishProject();
        this.sender.emit("catalog", catalog);
    };


    PromptoWorker.prototype.unpublishProject = function() {
        var catalog = this.$repo.unpublishProject();
        this.sender.emit("catalog", catalog);
    };

    PromptoWorker.prototype.commitProject = function() {
        var edited = this.$repo.prepareCommit();
        if(edited) {
            var worker = this;
            var form = new FormData();
            form.append("params", JSON.stringify([{name: "edited", type: "EditedDeclaration[]", value: edited}]));
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('load', function(success) { worker.commitSuccessful(success); });
            xhr.addEventListener('error', function(failure) { worker.commitFailed(failure); });
            xhr.open('POST', '/ws/run/storeDeclarations', true);
            xhr.send(form);
        }
    };

    PromptoWorker.prototype.commitFailed = function(failure) {
        console.log("Commit failed!"); // TODO send to UI
    };

    PromptoWorker.prototype.commitSuccessful = function(success) {
        console.log("Commit ok!");
        var worker = this;
        var declarations = this.fetchProjectDeclarations(this.$projectId, function(response) {
            if (response.error)
                ; // TODO something
            else {
                var declarations = response.data.value;
                worker.$repo.registerCommitted(declarations);
            }
        });
    };


    exports.PromptoWorker = PromptoWorker;
});

// load nodejs compatible require
var antlr4_require = null;
var ace_require = require;
try {
    self.require = undefined;
    Honey = {'requirePath': ['..']}; // walk up to js folder
    importScripts("../lib/require.js");
    antlr4_require = require;
} finally {
    self.require = ace_require;
}

function safe_require(method) {
    try {
        self.require = antlr4_require;
        return method();
    } finally {
        self.require = ace_require;
    }

}

// load antlr4, prompto and codebase
importScripts("../lib/prompto.bundle.js", "codebase.js");

// class for gathering errors and posting them to editor
var AnnotatingErrorListener = function(problems) {
    prompto.problem.ProblemCollector.call(this);
    this.problems = problems || [];
    return this;
};

AnnotatingErrorListener.prototype = Object.create(prompto.problem.ProblemCollector.prototype);
AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

AnnotatingErrorListener.prototype.collectProblem = function(problem) {
    // convert to ACE annotation
    problem = { row : problem.startLine - 1,
        column : problem.startColumn,
        endRow : problem.endLine - 1,
        endColumn : problem.endColumn,
        type : problem.type,
        text : problem.message };
    this.problems.push(problem);
};




