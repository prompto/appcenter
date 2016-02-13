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

function Catalog(prompto, decls, coreContext) {
    this.readCatalog(prompto, decls);
    if(coreContext)
        this.filterOutCoreDeclarations(coreContext);
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


Catalog.prototype.readCatalog = function(prompto, decls) {
    var content = this.loadCatalog(prompto, decls);
    this.attributes = content.attributes;
    this.categories = content.categories;
    this.methods = content.methods;
    this.tests = content.tests;
};

Catalog.prototype.loadCatalog = function(prompto, decls) {
    if(prompto && decls) {
        var context = prompto.runtime.Context.newGlobalContext();
        // need a fresh context to ensure all get registered
        context.problemListener = new prompto.problem.ProblemCollector(); // we'll ignore these errors but let's catch them
        decls.register(context);
        return context.getLocalCatalog();
    } else
        return {};
};

Catalog.prototype.filterOutCoreDeclarations = function(coreContext) {
    this.filterOutCoreObjects("attributes", coreContext);
    this.filterOutCoreMethods(coreContext);
    this.filterOutCoreObjects("categories", coreContext);
    this.filterOutCoreObjects("tests", coreContext);
};

Catalog.prototype.filterOutCoreObjects = function(type, coreContext) {
    if(this[type])
        this[type] = this[type].filter(function (name) {
            return coreContext.contextForDeclaration(name) == null;
        });
};

Catalog.prototype.filterOutCoreMethods = function(coreContext) {
    if(this.methods)
        this.methods = this.methods.filter(function (method) {
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
};

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

function sortBy(a, f) {
    return a.sort(function(i1,i2) {
        return (i1[f]>i2[f]) ? 1 : ((i1[f]<i2[f]) ? -1 : 0);
    });
}


exports.Catalog = Catalog;
exports.Delta = Delta;