importScripts("worker-base.js");
ace.define('ace/worker/prompto',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var PromptoWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
        this.$dialect = null;
        this.$value = this.doc.getValue();
        this.$core = false;
        this.onInit();
    };

    oop.inherits(PromptoWorker, Mirror);

    PromptoWorker.prototype.setDialect = function(dialect) {
        var old = this.$dialect;
        this.$dialect = dialect;
        if(old && dialect!==old) {
            var value = this.doc.getValue();
            if(value) {
                // remember value since it does not result from an edit
                this.$value = safe_require(function() {
                    return translate(value, old, dialect);
                });
                this.sender.emit("value", this.$value);
            }
        }
    };

    PromptoWorker.prototype.setContent = function(id) {
        var worker = this;
        safe_require(function() {
            var value = "";
            var core = false;
            if(id) {
                var decl = getDeclaration(id);
                value = getDeclarationBody(decl, worker.$dialect);
                core = id.core || false;
            }
            // remember value since it does not result from an edit
            worker.$value = value;
            worker.$core = core;
            worker.sender.emit("value", worker.$value);
        });
    };

    PromptoWorker.prototype.destroy = function(id) {
        var worker = this;
        safe_require(function() {
            registerDestroyed(id);
            handleUpdate(worker, worker.$value, "", worker.$dialect, new AnnotatingErrorListener());
        });
        this.$value = "";
        this.sender.emit("value", this.$value);
    }

    PromptoWorker.prototype.interpret = function(id) {
        safe_require(function () {
            if(id.test)
                prompto.runtime.Interpreter.interpretTest(appContext, id.test);
            else if(id.method)
                prompto.runtime.Interpreter.interpret(appContext, id.method, "");
        });
    }

    PromptoWorker.prototype.setProject = function(dbId) {
        var worker = this;
        safe_require(function() {
            unpublishProject(worker);
            loadProject(worker, dbId);
            publishProject(worker);
        });
    };

    PromptoWorker.prototype.commit = function(dbId) {
        var worker = this;
        safe_require(function() {
            commitProject(worker, dbId);
        });
    };

    PromptoWorker.prototype.onUpdate = function() {
        var value = this.doc.getValue();
        var annotations = [];
        var errorListener = new AnnotatingErrorListener(annotations);
        var worker = this;
        safe_require(function() {
            handleUpdate(worker, worker.$value, value, worker.$dialect, errorListener);
        });
        this.$value = value;
        this.sender.emit("annotate", annotations);
    };

    PromptoWorker.prototype.onInit = function() {
        var worker = this;
        safe_require(function() {
            loadCore(worker);
            publishCore(worker);
        });
    };

    exports.PromptoWorker = PromptoWorker;
});

// load nodejs compatible require
var ace_require = require;
try {
    self.require = undefined;
    Honey = {'requirePath': ['..']}; // walk up to js folder
    importScripts("../lib/require.js");
    var antlr4_require = require;
} finally {
    self.require = ace_require;
}

// load antlr4 and prompto
var antlr4, prompto, delta;
try {
    self.require = antlr4_require;
    antlr4 = require('antlr4/index');
    prompto = require('prompto/index');
    delta = require('ide/delta');
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

// method for producing editor input
function getDeclarationBody(decl, dialect) {
    var dialect = prompto.parser.Dialect[dialect];
    var writer = new prompto.utils.CodeWriter(dialect, appContext.newChildContext());
    decl.toDialect(writer);
    return writer.toString();
}

// method for parsing editor input
function parse(input, dialect, listener) {
    var klass = prompto.parser[dialect + "CleverParser"];
    var parser = new klass(input);
    parser.removeErrorListeners();
    if(listener)
        parser.addErrorListener(listener);
    return parser.parse();
}

// method for updating context, catalog and annotations on document update
function handleUpdate(worker, previous, current, dialect, listener) {
    // always annotate new content
    var new_decls = parse(current, dialect, listener);
    // if this is a core object, we're done
    if(worker.$core)
        return;
    // don't annotate previous content using provided listener
    var previousListener = new AnnotatingErrorListener();
    var old_decls = parse(previous, dialect, previousListener); // we'll ignore these errors but let's catch them
    registerDirty(new_decls, dialect); // the old decls were either clean, or went through this call previously
    // only update catalog and appContext if syntax is correct
    if (listener.problems.length == 0) {
        // only update catalog if event results from an edit
        var changes = new delta.Delta();
        if(previous!=current) {
            changes.added = new delta.Catalog(prompto, new_decls, coreContext);
            // only remove previous decls if parsing successful. This is because
            // if previous parsing failed, we never actually reached this section
            if(previousListener.problems.length == 0)
                changes.removed = new delta.Catalog(prompto, old_decls, coreContext);
        }
        // update appContext, collecting prompto errors
        old_decls.unregister(appContext); // TODO: manage damage on objects referring to these
        var saved_listener = appContext.problemListener;
        try {
            appContext.problemListener = listener;
            new_decls.register(appContext);
            new_decls.check(appContext.newChildContext()); // don't pollute appContext
        } finally {
            appContext.problemListener = saved_listener;
        }
        // done
        if(changes.adjustForMovingProtos(appContext))
            worker.sender.emit("catalog", changes.getContent());
    }
}

// method for translating current input to other dialect
function translate(input, from, to) {
    var decls = parse(input, from); // could be cached
    var dialect = prompto.parser.Dialect[to];
    var writer = new prompto.utils.CodeWriter(dialect, appContext.newChildContext());
    decls.toDialect(writer);
    return writer.toString();
}

function loadText(url) {
    var xhr = new XMLHttpRequest();
    xhr.onerror = function(e) {
        self.console.log("Error " + e.target.status + " occurred while receiving the document.");
        return null;
    };
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}

var coreContext = prompto.runtime.Context.newGlobalContext();
var appContext = coreContext.newLocalContext();
var moduleId = null;
var statuses = {};

function registerStatus(d) {
    var id = d.name + d.prototype ? "/" + d.prototype : "";
    statuses[id] = d;
}

function registerDestroyed(id) {
    var id = id.attribute ? id.attribute :
        id.category ? id.category :
            id.test ? id.test :
                id.method + id.proto ? "/" + id.proto : "";
    var status = statuses[id];
    if (status)
        status.editStatus = "DELETED";
}

function registerDirty(decls, dialect) {
    decls.map(function(decl) {
        var proto = decl.getProto ? decl.getProto() : null;
        var body = getDeclarationBody(decl, dialect);
        var id = decl.name + proto ? "/" + proto : "";
        var existing = statuses[id];
        if(existing) {
            if(existing.dialect != dialect || existing.body != body) {
                existing.dialect = dialect;
                existing.body = body;
                if (existing.editStatus != "CREATED") // don't overwrite
                    existing.editStatus = "DIRTY";
            }
        } else
            statuses[id] = { name : decl.name, version : "0.0.0.1", dialect : dialect, prototype : proto, body : body, module : moduleId, editStatus : "CREATED" };
    });
}

function loadCore(worker) {
    var code = loadText("../../prompto/prompto.pec");
    var decls = parse(code, "E");
    decls.register(coreContext);
}

function publishCore(worker) {
    var delta = {
        removed : {},
        added   : coreContext.getCatalog(),
        core    : true
    };
    worker.sender.emit("catalog", delta);
}

function inferDialect(path) {
    return path.substring(path.length-2, path.length-1).toUpperCase();
}

function unpublishProject(worker) {
    var delta = {
        removed : appContext.getLocalCatalog(),
        added   : {}
    };
    appContext = coreContext.newLocalContext();
    worker.sender.emit("catalog", delta);
}

function loadProject(worker, dbId) {
    self.console.log("Load module " + dbId.toString());
    moduleId = dbId;
    var url = '/ws/run/getModuleDeclarations?params=[{"name":"dbId", "value":"' + dbId.toString() + '"}]';
    var text = loadText(url);
    var declarations = JSON.parse(text);
    if(declarations.error)
        ; // do something
    else {
        declarations.data.map( function(d) {
            var decl = parse(d.body, d.dialect);
            decl.register(appContext);
            d.editStatus = "CLEAN";
            d.module = moduleId; // TODO for now, to avoid sending back the image
            registerStatus(d);
        });
    }
}

function publishProject(worker) {
    var delta = {
        removed : {},
        added   : appContext.getLocalCatalog()
    };
    worker.sender.emit("catalog", delta);
}

function commitProject(worker, dbId) {
    var edited = [];
    for(var id in statuses) {
        if(statuses[id].editStatus!="CLEAN")
            edited.push({ type : "EditedDeclaration", value : statuses[id] });
    }
    var form = new FormData();
    form.append("params", JSON.stringify([ { name: "edited", type: "EditedDeclaration[]", value : edited } ]));
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', console.log("Commit ok!"));
    xhr.addEventListener('error', console.log("Commit failed!"));
    xhr.open('POST', '/ws/run/storeDeclarations', true);
    xhr.send(form);
}

function getDeclaration(id) {
    if(id.test)
        return appContext.getRegisteredTest(id.test);
    else if(id.method) {
        var map = appContext.getRegisteredDeclaration(id.method);
        if(id.proto)
            return map.protos[id.proto];
        else for(var proto in map.protos)
            return map.protos[proto];
    } else {
        var name = id.attribute || id.category
        return appContext.getRegisteredDeclaration(name);
    }
}



