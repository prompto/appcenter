var workerConsole = self.console;

importScripts("worker-base.js","react-bootstrap-3.js");
ace.define('ace/worker/prompto',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var PromptoWorker = function(sender) {
        Mirror.call(this, sender);
        // this.setTimeout(200);
        this.$projectId = null;
        this.$project = null;
        this.$dialect = null;
        this.$value = this.doc.getValue();
        this.$core = false;
        this.$repo = new Repository();
        this.$loading = {};
        this.$authorization = null;
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

    PromptoWorker.prototype.setContent = function(content) {
        var worker = this;
        safe_require(function() {
            // remember value if it does not result from an edit
            if(content.name) {
                worker.$value = worker.$repo.getDeclarationBody(content, worker.$dialect);
                worker.$core = content.core || false;
            } else {
                worker.$value = content.body || "";
                worker.$select = (content.body || null) !== null;
                worker.$core = false;
            }
            worker.sender.emit("value", worker.$value);
        });
    };

    PromptoWorker.prototype.destroy = function(content) {
        this.$value = "";
        var worker = this;
        safe_require(function() {
            var catalog = worker.$repo.handleDestroyed(content);
            if(catalog) {
                worker.sender.emit("catalogUpdated", catalog);
            }
        });
        this.sender.emit("value", this.$value);
    };

    PromptoWorker.prototype.runMethod = function(id, mode) {
        if (mode==="LI")
            this.interpretLocally(id);
        else if(mode==="SI")
            this.runRemotely(id,"interpret");
        else // compiled
            this.runRemotely(id, "execute");
    };


    PromptoWorker.prototype.fetchRunnablePage = function(content) {
        var runnable = { valid: false, content: null };
        var decl = this.$repo.getDeclaration(content);
        if(decl!==null && decl.annotations && decl instanceof prompto.declaration.ConcreteWidgetDeclaration) {
            var annotations = decl.annotations.filter(function(a) { return a.id.name==="@PageWidgetOf" });
            if(annotations.length>0 && annotations[0].expression instanceof prompto.literal.TextLiteral)
                runnable = { valid: true, content: { type: "page", name: annotations[0].expression.value.toString() }};
        }
        this.sender.emit("runnablePageFetched", runnable);
    };


    PromptoWorker.prototype.runRemotely = function(id, mode) {
        var worker = this;
        this.fetchModuleURL(worker.$projectId, function(url) {
            var fullUrl = url + "ws/run/" + id.name +
                "?mode=" + mode;
            if(id.subType==="method")
                fullUrl = fullUrl + "&main=true";
            worker.loadJSON(fullUrl, function (response) {
                if (response.error)
                    console.log(response.error);
                else if(response.data instanceof Array)
                    response.data.map(console.log);
                else
                    console.log(response.data);
                worker.sender.emit("done");
            });
        });
    };

    PromptoWorker.prototype.interpretLocally = function(id) {
        var context = this.$repo.projectContext;
        safe_require(function () {
            if(id.subType==="test") {
                var store = prompto.store.DataStore.instance;
                prompto.store.DataStore.instance = new prompto.memstore.MemStore();
                try {
                    prompto.runtime.Interpreter.interpretTest(context, id.name);
                } finally {
                    prompto.store.DataStore.instance = store;
                }
            } else  {
                prompto.runtime.Interpreter.interpret(context, id.name, "");
                console.log("Finished running " + id.name);
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
                worker.$project = response.data.value;
                if(loadDependencies && worker.$project.dependencies) {
                    worker.$project.dependencies.value
                        .filter(function(dep) {
                            return dep!=null;
                        }).map(function(dep) {
                        worker.loadDependency(dep.value || dep);
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

    PromptoWorker.prototype.fetchModuleDescription = function(projectId, register, success) {
        var params = [ {name:"dbId", value:projectId.toString()}, {name:"register", type:"Boolean", value:register}];
        var url = '/ws/run/getModuleDescription?params=' + JSON.stringify(params);
        this.loadJSON(url, success);
    };

    PromptoWorker.prototype.fetchLibraryDeclarations = function(name, version, success) {
        var params = [ {name:"name", type:"Text", value:name}, {name:"version", type:version.type, value:version.value} ];
        var url = '/ws/run/getModuleDeclarations?params=' + JSON.stringify(params);
        this.loadJSON(url, success);
    };

    PromptoWorker.prototype.fetchProjectDeclarations = function(projectId, success) {
        var params = [ {name:"dbId", value:projectId.toString()}];
        var url = '/ws/run/getModuleDeclarations?params=' + JSON.stringify(params);
        this.loadJSON(url, success);
    };

    PromptoWorker.prototype.fetchModuleURL = function(projectId, success) {
        var params = [ {name:"dbId", value:projectId.toString()}, {name:"optional", type:"Boolean", value: false}];
        var url = '/ws/run/getModulePort?params=' + JSON.stringify(params);
        this.loadJSON(url, function(response) {
                if (response.error)
                    ; // TODO something
                else {
                    var href = self.location.protocol +
                        "//" + self.location.hostname +
                        ":" + response.data + "/";
                    success(href);
                }
        });
    };

    PromptoWorker.prototype.prepareCommit = function() {
        var worker = this;
        safe_require(function() {
            worker.prepareCommit();
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
            if(value === worker.$value && !worker.$select)
                worker.$repo.handleSetContent(value, worker.$dialect, errorListener);
            else {
                var catalog = worker.$repo.handleEditContent(value, worker.$dialect, errorListener, worker.$select);
                delete worker.$select;
                if (catalog) {
                    worker.sender.emit("catalogUpdated", catalog);
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
        if(name==="Project")
            this.publishProject();
        // is this the last library ?
        else if (Object.keys(this.$loading).length === 1 && "Project" in this.$loading)
            this.publishLibraries();
        // is this the last loading
        else if (Object.keys(this.$loading).length === 0)
            this.publishLibraries();
    };

    PromptoWorker.prototype.loadJSON = function(url, success) {
        this.loadText(url, function (text) {
            var json = JSON.parse(text);
            success(json);
        });
    };

    PromptoWorker.prototype.loadText = function(url, success) {
    	var worker = this;
        var xhr = new XMLHttpRequest();
        xhr.onerror = function(e) {
            self.console.log("Error " + e.target.status + " occurred while receiving the document.");
            return null;
        };
        xhr.onload = function(e) {
            if(url[0]=="/" || url[0]==".") {
            	// can't read unsafe header
            	worker.$authorization = xhr.getResponseHeader("X-Authorization") || null;
            }
            success(xhr.responseText);
        };
        xhr.open('GET', url);
        if(url[0]!="/" && url[0]!=".") {
        	if(worker.$authorization!=null) 
                xhr.setRequestHeader("X-Authorization", worker.$authorization);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.withCredentials = true;
        }
        xhr.send(null);
    };

    PromptoWorker.prototype.publishLibraries = function () {
        var catalog = this.$repo.publishLibraries();
        this.sender.emit("catalogUpdated", catalog);
    };


    PromptoWorker.prototype.publishProject = function() {
        var catalog = this.$repo.publishProject();
        this.sender.emit("catalogUpdated", catalog);
    };


    PromptoWorker.prototype.unpublishProject = function() {
        var catalog = this.$repo.unpublishProject();
        this.sender.emit("catalogUpdated", catalog);
    };

    PromptoWorker.prototype.prepareCommit = function() {
        var edited = this.$repo.prepareCommit();
        this.sender.emit("commitPrepared", edited);
    };

    PromptoWorker.prototype.commitFailed = function() {
    };

    PromptoWorker.prototype.commitSuccessful = function() {
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
importScripts("../lib/prompto.core.bundle.js", "codeutils.js", "codebase.js", "delta.js", "repository.js" );

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




