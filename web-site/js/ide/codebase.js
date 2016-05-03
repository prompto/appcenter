/**
 * The purpose of these classes is to minimize the re-processing in the IDE
 * when code is updated. Typically, various scenarios can occur:
 *  - code body change, this has not impact on the catalog
 *  - declaration removed
 *  - declaration added
 *  - declarations changed, which for global methods adds complexity because
 *  methods are displayed differently depending on their number of prototypes
 *  The below code is not optimized. The optimization is to only redisplay what is needed,
 *  not to optimize the calculating what needs to be redisplayed.
 *  This follows the assumption that the number of prototypes is generally very low.
 */

var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';

var prompto = isNodeJs ?
    require("../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto :
    require('prompto/index');

/* a function for inferring dialect from file extension */
function inferDialect(path) {
    return path.substring(path.length-2, path.length-1).toUpperCase();
}

/* a function for parsing prompto code into declarations */
function parse(input, dialect, listener) {
    var klass = prompto.parser[dialect + "CleverParser"];
    var parser = new klass(input);
    parser.removeErrorListeners();
    if(listener)
        parser.addErrorListener(listener);
    return parser.parse();
}

/* a function for producing code from a declaration object */
function unparse(context, decl, dialect) {
    var dialect = prompto.parser.Dialect[dialect];
    var writer = new prompto.utils.CodeWriter(dialect, context.newChildContext());
    if(decl.comments) {
        decl.comments.forEach(function (cmt) {
            cmt.toDialect(writer);
        });
    }
    decl.toDialect(writer);
    return writer.toString();
}

/* a function for translating current input to other dialect */
function translate(context, data, from, to) {
    var decls = parse(data, from); // could be cached
    var dialect = prompto.parser.Dialect[to];
    var writer = new prompto.utils.CodeWriter(dialect, context.newChildContext());
    decls.toDialect(writer);
    return writer.toString();
}

/* a utility function to sort by field name */
function sortBy(a, f) {
    return a.sort(function(i1,i2) {
        return (i1[f]>i2[f]) ? 1 : ((i1[f]<i2[f]) ? -1 : 0);
    });
}

/* an object holding all data required for an edit session */
function Repository() {
    this.librariesContext = prompto.runtime.Context.newGlobalContext();
    this.projectContext = this.librariesContext.newLocalContext();
    this.moduleId = null;
    this.statuses = {};
    return this;
}


Repository.prototype.registerLibraryCode = function(code, dialect) {
    var decls = parse(code, dialect);
    decls.register(this.librariesContext);
};

Repository.prototype.registerLibraryDeclarations = function(declarations) {
    var worker = this;
    declarations.map( function(obj) {
        var decl = parse(obj.value.body, obj.value.dialect);
        decl.register(worker.librariesContext);
    });
};

Repository.prototype.publishLibraries = function() {
    return {
        removed: {},
        added: this.librariesContext.getCatalog(),
        core: true
    };
};


Repository.prototype.publishProject = function() {
    return {
        removed: {},
        added: this.projectContext.getLocalCatalog()
    };
};


Repository.prototype.unpublishProject = function() {
    var delta = {
        removed: this.projectContext.getLocalCatalog(),
        added: {}
    };
    this.projectContext = this.librariesContext.newLocalContext();
    this.statuses = {};
    return delta;
};

Repository.prototype.registerProjectDeclarations = function(moduleId, declarations) {
    this.moduleId = moduleId;
    var worker = this;
    declarations.map( function(obj) {
        var decl = parse(obj.value.body, obj.value.dialect);
        decl.register(worker.projectContext);
        // prepare for commit
        if(obj.value.module)
            delete obj.value.module.value.image; // to avoid sending it back
        worker.registerClean(obj);
    });
};

Repository.prototype.getDeclarationBody = function(id, dialect) {
    var decl = this.getDeclaration(id);
    return unparse(this.projectContext, decl, dialect);
};


Repository.prototype.getDeclaration = function(id) {
    if(id.test)
        return this.projectContext.getRegisteredTest(id.test);
    else if(id.method) {
        var methodsMap = this.projectContext.getRegisteredDeclaration(id.method);
        if(id.proto) {
            return methodsMap.protos[id.proto];
        } else {
            // simply return the first
            for(var proto in methodsMap.protos) {
                return methodsMap.protos[proto];
            }
        }
    } else {
        var name = id.attribute || id.category
        return this.projectContext.getRegisteredDeclaration(name);
    }
}

Repository.prototype.registerClean = function(obj) {
    var decl = obj.value;
    var id = decl.name + ( decl.prototype ? "/" + decl.prototype : "" );
    this.statuses[id] = { declaration : obj, editStatus : "CLEAN" };
};


Repository.prototype.registerDestroyed = function(id) {
    var id = id.attribute ? id.attribute :
        id.category ? id.category :
            id.test ? id.test :
            id.method + ( id.proto ? "/" + id.proto : "" );
    var status = this.statuses[id];
    if (status)
        status.editStatus = "DELETED";
};


Repository.prototype.registerDirty = function(decls, dialect) {
    var worker = this;
    decls.map(function(decl) {
        var id = decl.name + ( decl.getProto!==undefined ? "/" + decl.getProto() : "" );
        var existing = worker.statuses[id];
        if(existing) {
            var decl_obj = existing.declaration.value;
            var body = unparse(worker.projectContext, decl, dialect);
            if(decl_obj.dialect != dialect || decl_obj.body != body) {
                decl_obj.dialect = dialect;
                decl_obj.body = body;
                if (existing.editStatus != "CREATED") // don't overwrite
                    existing.editStatus = "DIRTY";
                if(decl.getProto!==undefined)
                    decl_obj.prototype = decl.getProto();
                if(decl.storable!==undefined)
                    decl_obj.storable = decl.storable;
            }
        } else {
            var decl_obj = {
                name: decl.name,
                version: "0.0.0.1",
                dialect: dialect,
                body: unparse(worker.projectContext, decl, dialect),
                module: {
                    type: "Module",
                    value: {
                        dbId: worker.moduleId
                    }
                }
            };
            if(decl.getProto!==undefined)
                decl_obj.prototype = decl.getProto();
            if(decl.storable!==undefined)
                decl_obj.storable = decl.storable;
            worker.statuses[id] = {
                editStatus: "CREATED",
                declaration : {
                    type: decl.getDeclarationType() + "Declaration",
                    value: decl_obj
                }
            };
        };
    });
};


Repository.prototype.registerCommitted = function(declarations) {
    var worker = this;
    declarations.map(function (decl) {
        var decl_obj = obj.value;
        var id = decl_obj.name + ( decl_obj.prototype ? "/" + decl_obj.prototype : "" );
        worker.statuses[id].declaration.dbId = d.dbId;
        worker.statuses[id].editStatus = "CLEAN";
    });
};


Repository.prototype.prepareCommit = function () {
    var edited = [];
    for(var id in this.statuses) {
        if(this.statuses[id].editStatus!="CLEAN")
            edited.push({ type : "EditedDeclaration", value : this.statuses[id] });
    }
    if(edited.length)
        return edited;
    else
        return null;
};

Repository.prototype.translate = function (data, from, to) {
    return translate(this.projectContext, data, from, to);
};


Repository.prototype.handleUpdate = function (isCore, previous, current, dialect, listener) {
    // always annotate new content
    var new_decls = parse(current, dialect, listener);
    // if this is a core object, no catalog update required
    if(isCore)
        return null;
    // we'll ignore errors but let's catch them using a temporary listener
    var previousListener = Object.create(listener);
    var old_decls = parse(previous, dialect, previousListener);
    // only update catalog and projectContext if syntax is correct
    if (listener.problems.length == 0) {
        var changes = new Delta();
        // only update catalog if event results from an edit
        if(previous!=current) {
            changes.removed = new Catalog(old_decls, this.librariesContext);
            changes.added = new Catalog(new_decls, this.librariesContext);
            // mark decls as dirty
            this.registerDirty(new_decls, dialect); // the old decls were either clean, or went through this call previously
        }
        // update appContext, collecting prompto errors
        old_decls.unregister(this.projectContext); // TODO: manage damage on objects referring to these
        new_decls.unregister(this.projectContext); // avoid duplicate declaration errors
        var saved_listener = this.projectContext.problemListener;
        try {
            this.projectContext.problemListener = listener;
            new_decls.register(this.projectContext);
            new_decls.check(this.projectContext.newChildContext()); // don't pollute projectContext
        } finally {
            this.projectContext.problemListener = saved_listener;
        }
        // only update UI if this input fixed an error or there was a change meaningful to the UI
        if(previousListener.problems.length || changes.adjustForMovingProtos(this.projectContext))
            return changes.getContent();
        else
            return null;
    }
};

/* an object which represents a catalog of declarations */
function Catalog(decls, filterContext) {
    this.readCatalog(decls);
    if(filterContext)
        this.filterOutDeclarations(filterContext);
    return this;
}

Catalog.prototype.length = function() {
    var length = 0;
    if(this.attributes)
        length += this.attributes.length;
    if(this.categories)
        length += this.categories.length;
    if(this.methods)
        length += this.methods.length;
    if(this.tests)
        length += this.tests.length;
    return length;
};


Catalog.prototype.readCatalog = function(decls) {
    var content = this.loadCatalog(decls);
    this.attributes = content.attributes;
    this.categories = content.categories;
    this.methods = content.methods;
    this.tests = content.tests;
};

Catalog.prototype.loadCatalog = function(decls) {
    if(prompto && decls) {
        var context = prompto.runtime.Context.newGlobalContext();
        // need a fresh context to ensure all get registered
        context.problemListener = new prompto.problem.ProblemCollector(); // we'll ignore these errors but let's catch them
        decls.register(context);
        return context.getLocalCatalog();
    } else
        return {};
};

Catalog.prototype.filterOutDeclarations = function(filterContext) {
    this.filterOutObjects("attributes", filterContext);
    this.filterOutMethods(filterContext);
    this.filterOutObjects("categories", filterContext);
    this.filterOutObjects("tests", filterContext);
};

Catalog.prototype.filterOutObjects = function(type, filterContext) {
    if(this[type])
        this[type] = this[type].filter(function (name) {
            return filterContext.contextForDeclaration(name) == null;
        });
};

Catalog.prototype.filterOutMethods = function(filterContext) {
    if(this.methods)
        this.methods = this.methods.filter(function (method) {
            var context = filterContext.contextForDeclaration(method.name);
            if(context==null)
                return true;
            // if core has such method, need to check protos
            if(method.protos.length==1)
                return false;
            var map = filterContext.getRegisteredDeclaration(method.name);
            method.protos = method.protos.filter(function (proto) {
                return !map.hasPrototype(proto.proto);
            });
            return method.protos.length>0;
        });
};

/* an object which represents the delat between 2 catalogs */
function Delta() {
    this.removed = null;
    this.added = null;
    return this;
}

Delta.prototype.length = function() {
    var length = 0;
    if(this.removed)
        length += this.removed.length();
    if(this.added)
        length += this.added.length();
    return length;
};

Delta.prototype.getContent = function() {
    return { removed : this.removed, added : this.added };
};

Delta.prototype.filterOutDuplicates = function() {
    if(!this.removed && !this.added)
        return 0;
    if(!this.removed)
        return this.added.length();
    if(!this.added)
        return this.removed.length();
    var length = this.filterOutDuplicatesInLists(this.removed.attributes, this.added.attributes);
    length += this.filterOutDuplicatesInMethods(this.removed.methods, this.added.methods)
    length += this.filterOutDuplicatesInLists(this.removed.categories, this.added.categories);
    length += this.filterOutDuplicatesInLists(this.removed.tests, this.added.tests);
    return length;
};

Delta.prototype.filterOutDuplicatesInLists = function(a, b, field) {
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
};

Delta.prototype.filterOutDuplicatesInMethods = function(a, b) {
    if(a && b) {
        sortBy(a, "name");
        sortBy(b, "name");
        for(var i=0,j=0;i<a.length && j<b.length;) {
            if(a[i].name===b[j].name) {
                this.filterOutDuplicatesInLists(a[i].protos, b[j].protos, "proto");
                if(!a[i].protos || !a[i].protos.length)
                    a.splice(i,1);
                i++;
                if(!b[j].protos || !b[j].protos.length)
                    b.splice(j,1);
                j++;
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

Delta.prototype.adjustForMovingProtos = function(context) {
    var count = this.filterOutDuplicates();
    if(count==0)
        return false;
    // methods with 1 proto are displayed differently than methods with multiple protos
    // if proto cardinality changes from N to 1 or 1 to N, we need to rebuild the corresponding displays
    var self = this;
    if (this.removed && this.removed.methods) {
        this.removed.methods.map(function (method) {
            var decl = context.getRegisteredDeclaration(method.name);
            if (decl && Object.keys(decl.protos).length == 1) // moved from N to 1
                self.adjustMethodForRemovedProtos(method, decl);
        });
    }
    if (this.added && this.added.methods) {
        this.added.methods.map(function (method) {
            var decl = context.getRegisteredDeclaration(method.name);
            if (decl && Object.keys(decl.protos).length - method.protos.length == 1) // moved from 1 to N
                self.adjustMethodForAddedProtos(method, decl);
        });
    }
    // cleanup
    if (this.removed && this.removed.methods) {
        this.removed.methods.map(function (method) {
            if(method.proto_to_remove) {
                method.protos.push(method.proto_to_remove);
                sortBy(method.protos, "proto");
                delete method.proto_to_remove;
            }
        });
    }
    if (this.added && this.added.methods) {
        this.added.methods.map(function (method) {
            if(method.proto_to_add) {
                method.protos.push(method.proto_to_add);
                sortBy(method.protos, "proto");
                delete method.proto_to_add;
            }
        });
    }
    // done
    return true;
};


Delta.prototype.adjustMethodForAddedProtos = function(method, decl)
{
    var proto = this.findPreExistingProto(method, decl);
    if(proto) {
        var main = decl.protos[proto].isEligibleAsMain();
        var proto_to_move = {proto: proto, main: main};
        // add it to the remove list
        if(!this.removed)
            this.removed = new Catalog();
        var removed = this.findOrCreateMethod(this.removed, method.name);
        removed.proto_to_remove = proto_to_move;
        // add it to the add list
        method.proto_to_add = proto_to_move;
    }
};


Delta.prototype.findPreExistingProto = function(method, decl) {
    for(var proto in decl.protos) {
        var found = false;
        for(var i=0; !found && i<method.protos.length; i++) {
            found = proto == method.protos[i].proto;
        }
        if(!found)
            return proto;
    }
    return null; // TODO throw error?
};

Delta.prototype.adjustMethodForRemovedProtos = function(method, decl) {
    // the below will only loop once
    for (var proto in decl.protos)
        this.adjustMethodForRemovedProto(method, decl, proto);
};

Delta.prototype.adjustMethodForRemovedProto = function(method, decl, proto) {
    var main = decl.protos[proto].isEligibleAsMain();
    var proto_to_move = { proto: proto, main: main };
    // add it to the remove list
    method.proto_to_remove = proto_to_move;
    // add it to the added list
    if(!this.added)
        this.added = new Catalog();
    var added = this.findOrCreateMethod(this.added, decl.name);
    // avoid adding it twice (it might have just been added)
    added.protos.map(function (current) {
        if (proto_to_move && proto_to_move.proto == current.proto)
            proto_to_move = null; // don't add it
    });
    // not an existing proto ?
    if (proto_to_move)
        added.proto_to_add = proto_to_move;
};

Delta.prototype.findOrCreateMethod = function(catalog, name) {
    if(!catalog.methods)
        catalog.methods = [];
    for(var i=0;i<catalog.methods.length;i++) {
        if(catalog.methods[i].name===name)
            return catalog.methods[i];
    }
    var created = { name: name, protos: [] };
    catalog.methods.push(created);
    return created;
};


exports.prompto = prompto;
exports.Repository = Repository;
exports.Catalog = Catalog;
exports.Delta = Delta;