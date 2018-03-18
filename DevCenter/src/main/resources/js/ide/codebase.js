var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var prompto = prompto;

if(typeof prompto === 'undefined') {
    prompto = isNodeJs ?
        require("../../../../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto :
        require('prompto/index');
}

/* an object which represents a catalog of declarations, classified by type */
function Codebase(decls, filterContext) {
    this.readCatalog(decls);
    if(filterContext)
        this.filterOutDeclarations(filterContext);
    return this;
}

Codebase.prototype.length = function() {
    var length = 0;
    if(this.attributes)
        length += this.attributes.length;
    if(this.categories)
        length += this.categories.length;
    if(this.enumerations)
        length += this.enumerations.length;
    if(this.methods)
        length += this.methods.length;
    if(this.tests)
        length += this.tests.length;
    return length;
};


Codebase.prototype.readCatalog = function(decls) {
    var content = this.loadCatalog(decls);
    this.attributes = content.attributes;
    this.categories = content.categories;
    this.enumerations = content.enumerations;
    this.methods = content.methods;
    this.tests = content.tests;
};

Codebase.prototype.loadCatalog = function(decls) {
    if(prompto && decls) {
        var context = prompto.runtime.Context.newGlobalContext();
        // need a fresh context to ensure all get registered
        context.problemListener = new prompto.problem.ProblemCollector(); // we'll ignore these errors but let's catch them
        decls.register(context);
        return context.getLocalCatalog();
    } else
        return {};
};

Codebase.prototype.filterOutDeclarations = function(filterContext) {
    this.filterOutObjects("attributes", filterContext);
    this.filterOutMethods(filterContext);
    this.filterOutObjects("categories", filterContext);
    this.filterOutObjects("enumerations", filterContext);
    this.filterOutObjects("tests", filterContext);
};

Codebase.prototype.filterOutObjects = function(type, filterContext) {
    if(this[type])
        this[type] = this[type].filter(function (name) {
            return filterContext.contextForDeclaration(name) === null;
        });
};

Codebase.prototype.filterOutMethods = function(filterContext) {
    if(this.methods)
        this.methods = this.methods.filter(function (method) {
            var context = filterContext.contextForDeclaration(method.name);
            if(context === null)
                return true;
            // if core has such method, need to check protos
            if(method.protos.length === 1)
                return false;
            var map = filterContext.getRegisteredDeclaration(method.name);
            method.protos = method.protos.filter(function (proto) {
                return !map.hasPrototype(proto.proto);
            });
            return method.protos.length>0;
        });
};

if(typeof exports === 'undefined')
    exports = {};
exports.Codebase = Codebase;
if(typeof self !== 'undefined')
    self.Codebase = Codebase