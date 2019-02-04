/* an object which represents a catalog of declarations, classified by type */
export default class Codebase {

    constructor(decls, globalContext, filterContext) {
        this.readCatalog(globalContext, decls);
        if (filterContext)
            this.filterOutDeclarations(filterContext);
        return this;
    }

    length() {
        var length = 0;
        if (this.attributes)
            length += this.attributes.length;
        if (this.categories)
            length += this.categories.length;
        if (this.enumerations)
            length += this.enumerations.length;
        if (this.methods)
            length += this.methods.length;
        if (this.tests)
            length += this.tests.length;
        if (this.widgets)
            length += this.widgets.length;
        return length;
    }


    readCatalog(globalContext, decls) {
        const content = this.loadCatalog(globalContext, decls);
        this.attributes = content.attributes;
        this.categories = content.categories;
        this.enumerations = content.enumerations;
        this.methods = content.methods;
        this.tests = content.tests;
        this.widgets = content.widgets;
    }

    loadCatalog(globalContext, decls) {
        if (prompto && decls) {
            const context = prompto.runtime.Context.newGlobalContext();
            // need a fresh context to ensure all get registered
            context.problemListener = new prompto.problem.ProblemCollector(); // we'll ignore these errors but let's catch them
            decls.register(context);
            context.globals = globalContext;
            return context.getLocalCatalog();
        } else
            return {};
    }

    filterOutDeclarations(filterContext) {
        this.filterOutObjects("attributes", filterContext);
        this.filterOutMethods(filterContext);
        this.filterOutObjects("categories", filterContext);
        this.filterOutObjects("enumerations", filterContext);
        this.filterOutObjects("tests", filterContext);
        this.filterOutObjects("widgets", filterContext);
    }

    filterOutObjects(type, filterContext) {
        if (this[type])
            this[type] = this[type].filter(name => filterContext.contextForDeclaration(name) === null);
    }

    filterOutMethods(filterContext) {
        if (this.methods)
            this.methods = this.methods.filter(method => this.filterOutMethod(method, filterContext));
    }

    filterOutMethod(method, filterContext) {
        const context = filterContext.contextForDeclaration(method.name);
        if (context === null)
            return true;
        // if core has such method, need to check protos
        if (method.protos.length === 1)
            return false;
        const map = filterContext.getRegisteredDeclaration(method.name);
        method.protos = method.protos.filter(proto=> !map.hasPrototype(proto.proto));
        return method.protos.length > 0;
    }

}