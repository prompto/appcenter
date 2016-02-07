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
                this.$value = safe_require(function() { return translate(value, old, dialect); } );
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
                var dialect = prompto.parser.Dialect[worker.$dialect];
                var writer = new prompto.utils.CodeWriter(dialect, appContext.newChildContext());
                decl.toDialect(writer);
                value = writer.toString();
                core = id.core || false;
            }
            // remember value since it does not result from an edit
            worker.$value = value;
            worker.$core = core;
            worker.sender.emit("value", worker.$value);
        });
    };

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
            loadProject(worker, dbId);
            publishProject(worker);
        });
    };

    PromptoWorker.prototype.onUpdate = function() {
        var value = this.doc.getValue();
        var annotations = [];
        var errorListener = new AnnotatingErrorListener(annotations);
        var worker = this;
        safe_require(function() { handleUpdate(worker, worker.$value, value, worker.$dialect, errorListener); });
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
var antlr4, prompto;
try {
    self.require = antlr4_require;
    antlr4 = require('antlr4/index');
    prompto = require('prompto/index');
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
    prompto.parser.ProblemCollector.call(this);
    this.problems = problems || [];
    return this;
};

AnnotatingErrorListener.prototype = Object.create(prompto.parser.ProblemCollector.prototype);
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
    // don't annotate previous content
    var previousListener = new AnnotatingErrorListener();
    var old_decls = parse(previous, dialect, previousListener); // we'll ignore these errors but let's catch them
    // only update catalog and appContext if syntax is correct
    if (listener.problems.length == 0) {
        // only update catalog if event results from an edit
        if(previous!=current) {
            var added = readCatalog(new_decls);
            // only remove previous decls if parsing successful. This is because
            // if previous parsing failed, we never actually reached this section
            var removed = [];
            if(previousListener.problems.length == 0)
                removed = readCatalog(old_decls);
            // compute delta
            var delta = { removed: removed, added: added };
            var count = filterOutDuplicates(delta);
            // done
            if (count)
                worker.sender.emit("catalog", delta);
        }
        // update appContext, collecting prompto errors
        old_decls.unregister(appContext); // TODO: manage damage on objects referring to these
        var saved_listener = appContext.problemListener;
        try {
            appContext.problemListener = listener;
            new_decls.register(appContext);
            new_decls.check(appContext.newChildContext());// don't pollute appContext
        } finally {
            appContext.problemListener = saved_listener;
        }
    }
}

function readCatalog(decls) {
    var context = prompto.runtime.Context.newGlobalContext();
    context.problemListener = new AnnotatingErrorListener(); // we'll ignore these errors but let's catch them
    decls.register(context);
    var catalog = context.getLocalCatalog();
    filterOutCoreFromCatalog(catalog);
    return catalog;
}

function filterOutCoreFromCatalog(catalog) {
    filterOutCoreObjects(catalog, "attributes");
    filterOutCoreMethods(catalog);
    filterOutCoreObjects(catalog, "categories");
    filterOutCoreObjects(catalog, "tests");
}

function filterOutCoreMethods(catalog) {
    if(catalog.methods)
        catalog.methods = catalog.methods.filter(function (method) {
            var context = coreContext.contextForDeclaration(method.name);
            if(context==null)
                return true;
            // if core has such method, need to check protos
            if(method.protos.length==1)
                return false;
            var map = coreContext.getRegisteredDeclaration(method.name);
            method.protos = method.protos.filter(function (proto) {
                return !map.hasPrototype(proto.proto);
            });
            return method.protos.length>0;
       });
}

function filterOutCoreObjects(catalog, type) {
    if(catalog[type])
        catalog[type] = catalog[type].filter(function (name) {
            return coreContext.contextForDeclaration(name) == null;
        });
}

function filterOutDuplicates(delta) {
    var length = filterOutDuplicatesInLists(delta.removed.attributes, delta.added.attributes);
    length += filterOutDuplicatesInMethods(delta.removed.methods, delta.added.methods)
    length += filterOutDuplicatesInLists(delta.removed.categories, delta.added.categories);
    length += filterOutDuplicatesInLists(delta.removed.tests, delta.added.tests);
    return length;
}

function sortBy(a, f) {
    return a.sort(function(i1,i2) {
        return (i1[f]>i2[f]) ? 1 : ((i1[f]<i2[f]) ? -1 : 0);
    });
}

function filterOutDuplicatesInMethods(a, b) {
    if(a && b) {
        sortBy(a, "name");
        sortBy(b, "name");
        for(var i=0,j=0;i<a.length && j<b.length;) {
            if(a[i].name===b[j].name) {
                filterOutDuplicatesInLists(a.protos, b.protos, "proto");
                if(!a.protos || !a.protos.length)
                    a.splice(i,1);
                if(!b.protos || !b.protos.length)
                    b.splice(j,1);
            } else if(a[i].name>b[j].name) {
                j++;
            } else {
                i++;
            }
        }
        var length = a.length + b.length;
        if(!a.length)
            delete a;
        if(!b.length)
            delete b;
        return length;
    } else if(a)
        return a.length;
    else if(b)
        return b.length;
    else
        return 0;
}

function filterOutDuplicatesInLists(a, b, field) {
    if(a && b) {
        if(field) {
            sortBy(a, field);
            sortBy(b, field);
        } else {
            a.sort();
            b.sort();
        }
        for(var i=0,j=0;i<a.length && j< b.length;) {
            var va = a[i];
            if(field)
                va = va[field];
            var vb = b[j];
            if(field)
                vb = vb[field];
            if(va===vb) {
                a.splice(i,1);
                b.splice(j,1);
            } else if(va>vb) {
                j++;
            } else {
                i++;
            }
        }
        var length = a.length + b.length;
        if(!a.length)
            delete a;
        if(!b.length)
            delete b;
        return length;
    } else if(a)
        return a.length;
    else if(b)
        return b.length;
    else
        return 0;
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

function loadProject(worker, dbId) {
    self.console.log("Load module " + dbId.toString());
    var url = '/ws/run/getModuleDeclarations?params=[{"name":"dbId", "value":"' + dbId.toString() + '"}]';
    var text = loadText(url);
    var declarations = JSON.parse(text);
    if(declarations.error)
        ; // do something
    else {
        declarations.data.map( function(d) {
            var decl = parse(d.body, d.dialect);
            decl.register(appContext);
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



