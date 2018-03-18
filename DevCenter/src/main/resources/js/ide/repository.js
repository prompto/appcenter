var codeutils = codeutils;
var Delta = Delta;
var Codebase = Codebase;

var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var prompto = prompto;

if(typeof prompto === 'undefined') {
    prompto = isNodeJs ?
        require("../../../../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto :
        require('prompto/index');
}

if(isNodeJs) {
    codeutils = require("./codeutils");
    Delta = require("./delta").Delta;
    Codebase = require("./codebase").Codebase;
}


/* a class to maintain an up-to-date copy of the repository */
/* which can be used to detect required changes in the UI, and deltas to commit */
function Repository() {
    this.librariesContext = prompto.runtime.Context.newGlobalContext();
    this.projectContext = prompto.runtime.Context.newGlobalContext();
    this.projectContext.setParentContext(this.librariesContext);
    this.moduleId = null;
    this.lastSuccess = ""; // last piece of code successfully registered through handleUpdate
    this.statuses = {};
    return this;
}


Repository.prototype.registerLibraryCode = function(code, dialect) {
    var decls = codeutils.parse(code, dialect);
    decls.register(this.librariesContext);
};

Repository.prototype.registerLibraryDeclarations = function(declarations) {
    var worker = this;
    declarations.map( function(obj) {
        var decl = codeutils.parse(obj.value.body, obj.value.dialect);
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
    this.projectContext = prompto.runtime.Context.newGlobalContext();
    this.projectContext.setParentContext(this.librariesContext);
    this.statuses = {};
    return delta;
};

Repository.prototype.registerProjectDeclarations = function(moduleId, declarations) {
    this.moduleId = moduleId;
    var worker = this;
    declarations.map( function(obj) {
        var decl = codeutils.parse(obj.value.body, obj.value.dialect);
        decl.register(worker.projectContext);
        // prepare for commit
        var module = obj.value.module;
        if(module) {
            // avoid sending back large objects
            delete obj.value.module.value.dependencies;
            delete obj.value.module.value.image;
        }
        worker.registerClean(obj);
    });
};

Repository.prototype.getDeclarationBody = function(content, dialect) {
    var decl = this.getDeclaration(content);
    return codeutils.unparse(this.projectContext, decl, dialect);
};


Repository.prototype.getDeclaration = function(content) {
    if(content.subType==="test")
        return this.projectContext.getRegisteredTest(content.name);
    else if(content.subType==="method") {
        var methodsMap = this.projectContext.getRegisteredDeclaration(content.name);
        if(content.proto!==null && content.proto!==undefined) {
            return methodsMap.protos[content.proto];
        } else {
            // simply return the first proto
            for(var proto in methodsMap.protos) {
                if(methodsMap.protos.hasOwnProperty(proto))
                    return methodsMap.protos[proto];
            }
        }
    } else
        return this.projectContext.getRegisteredDeclaration(content.name);
};

/* dbDecl = object received from the server */
Repository.prototype.idFromDbDecl = function(dbDecl) {
    if(dbDecl.type==="MethodDeclaration")
        return dbDecl.value.name + "/" + ( dbDecl.value.prototype || "" );
    else
        return dbDecl.value.name;
};


/* id = object received from the UI */
Repository.prototype.idFromContent = function(content) {
    if(content.subType==="method")
        return content.name + "/" + (content.proto || "");
    else
        return content.name;
};

/* decl = object received from the parser */
Repository.prototype.idFromDecl = function(decl) {
    return decl.name + ( decl.getProto!==undefined ? "/" + ( decl.getProto() || "") : "" );
};

Repository.prototype.registerClean = function(obj) {
    var id = this.idFromDbDecl(obj);
    this.statuses[id] = { stuff : obj, editStatus : "CLEAN" };
};


Repository.prototype.registerDestroyed = function(id) {
    var obj_status = this.statuses[id];
    if (obj_status)
        obj_status.editStatus = "DELETED";
};


Repository.prototype.registerDirty = function(decls, dialect) {
    decls.map(function(decl) {
        var decl_obj;
        var id = this.idFromDecl(decl);
        var existing = this.statuses[id];
        if(existing) {
            decl_obj = existing.stuff.value;
            var body = codeutils.unparse(this.projectContext, decl, dialect);
            if(decl_obj.dialect !== dialect || decl_obj.body !== body) {
                decl_obj.dialect = dialect;
                decl_obj.body = body;
                if (existing.editStatus !== "CREATED") // don't overwrite
                    existing.editStatus = "DIRTY";
                if(decl.getProto!==undefined)
                    decl_obj.prototype = decl.getProto();
                if(decl.storable!==undefined)
                    decl_obj.storable = decl.storable;
                if(decl.symbols!==undefined)
                    decl_obj.symbols = decl.symbols.map(function(s) { return s.name; });
            }
        } else {
            decl_obj = {
                name: decl.name,
                version: "0.0.1",
                dialect: dialect,
                body: codeutils.unparse(this.projectContext, decl, dialect),
                module: {
                    type: "Module",
                    value: {
                        dbId: this.moduleId
                    }
                }
            };
            if(decl.getProto!==undefined)
                decl_obj.prototype = decl.getProto();
            if(decl.storable!==undefined)
                decl_obj.storable = decl.storable;
            if(decl.symbols!==undefined)
                decl_obj.symbols = decl.symbols.map(function(s) { return s.name; });
            this.statuses[id] = {
                editStatus: "CREATED",
                stuff : {
                    type: decl.getDeclarationType() + "Declaration",
                    value: decl_obj
                }
            };
        }
    }, this);
};


Repository.prototype.registerCommitted = function(declarations) {
    var repo = this;
    declarations.map(function (decl) {
        var id = repo.idFromDbDecl(decl);
        repo.statuses[id].stuff.value.dbId = decl.dbId;
        repo.statuses[id].editStatus = "CLEAN";
    });
};


Repository.prototype.prepareCommit = function () {
    var edited = [];
    for(var id in this.statuses) {
        if(this.statuses.hasOwnProperty(id) && this.statuses[id].editStatus !== "CLEAN")
            edited.push({type: "EditedStuff", value: this.statuses[id]});
    }
    if(edited.length)
        return edited;
    else
        return null;
};


Repository.prototype.translate = function (data, from, to) {
    return translate(this.projectContext, data, from, to);
};


Repository.prototype.handleDestroyed = function (content) {
    var id = this.idFromContent(content);
    this.registerDestroyed(id);
    var obj_status = this.statuses[id];
    if (obj_status && obj_status.editStatus === "DELETED") {
        var decls = codeutils.parse(obj_status.stuff.value.body, obj_status.stuff.value.dialect);
        decls[0].unregister(this.projectContext);
        var delta = new Delta();
        delta.removed = new Codebase(decls, this.librariesContext);
        delta.filterOutDuplicates();
        return delta.getContent();
    } else
        return null;
};


Repository.prototype.handleSetContent = function (content, dialect, listener) {
    codeutils.parse(content, dialect, listener);
    this.lastSuccess = content; // assume registered content is always parsed successfully
};


Repository.prototype.handleEditContent = function (content, dialect, listener) {
    // analyze what has changed, we'll ignore errors but let's catch them using a temporary listener
    var previousListener = Object.create(listener);
    var old_decls = codeutils.parse(this.lastSuccess, dialect, previousListener);
    // always annotate new content
    var new_decls = codeutils.parse(content, dialect, listener);
    // only update codebase if syntax is correct
    if (listener.problems.length === 0) {
        this.lastSuccess = content;
        return this.updateCodebase(old_decls, new_decls, dialect, listener);
    } else
        return null;
};


Repository.prototype.updateCodebase = function (old_decls, new_decls, dialect, listener) {
    var delta = new Delta();
    delta.removed = new Codebase(old_decls, this.librariesContext);
    delta.added = new Codebase(new_decls, this.librariesContext);
    var changedIdsCount = delta.filterOutDuplicates();
    var handled = false;
    // special case when changing id of a single declaration
    if (changedIdsCount !== 0 && old_decls.length === 1 && new_decls.length === 1) {
        // assume the old_decl changed id/nature
        // check for existing old decl
        var old_id = this.idFromDecl(old_decls[0]);
        var old_status = this.statuses[old_id];
        // check for non existing new decl
        var new_id = this.idFromDecl(new_decls[0]);
        var new_status = this.statuses[new_id];
        // all ok, move the object
        if (old_status && !new_status) {
            // update statuses
            this.statuses[new_id] = this.statuses[old_id];
            delete this.statuses[old_id];
            // update status obj
            new_status = old_status;
            if (new_status.editStatus !== "CREATED") // don't overwrite
                new_status.editStatus = "DIRTY";
            // update declaration obj
            var new_decl = new_decls[0];
            new_status.stuff.type = new_decl.getDeclarationType() + "Declaration";
            var decl_obj = new_status.stuff.value;
            decl_obj.name = new_decl.name;
            decl_obj.dialect = dialect;
            decl_obj.body = codeutils.unparse(this.projectContext, new_decl, dialect);
            if(new_decl.getProto!==undefined)
                decl_obj.prototype = new_decl.getProto();
            if(new_decl.storable!==undefined)
                decl_obj.storable = new_decl.storable;
            handled = true;
        } else
            handled = false; // fallback to conservative strategy
    }
    if(!handled) {
        // either no change in ids, or more than one decl
        // simply mark new decls as dirty, don't destroy old ones, since this can
        // be achieved safely through an explicit action in the UI
        this.registerDirty(new_decls, dialect);
    }
    this.updateAppContext(old_decls, new_decls, listener);
    if(changedIdsCount !== 0) {
        delta.adjustForMovingProtos(this.projectContext);
        return delta.getContent();
    } else
        return null; // no UI update required
};

Repository.prototype.updateAppContext = function (old_decls, new_decls, listener) {
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
};


if(typeof exports === 'undefined')
    exports = {};
exports.Repository = Repository;
if(self)
    self.Repository = Repository;
