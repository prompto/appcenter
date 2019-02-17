// eslint-disable-next-line
const globals = self || window;
const prompto = globals.prompto;

/* a function for inferring dialect from file extension */
export const inferDialect = function(path) {
    return path.substring(path.length-2, path.length-1).toUpperCase();
}

/* a function for getting a new prompto code parser */
export const newParser = function(input, dialect, listener) {
    var klass = prompto.parser[dialect + "CleverParser"];
    var parser = new klass(input);
    parser.removeErrorListeners();
    if(listener)
        parser.addErrorListener(listener);
    return parser;
}

/* a function for parsing prompto code into declarations */
export const parse = function(input, dialect, listener) {
    var parser = newParser(input, dialect, listener);
    return parser.parse();
}

/* a function for producing code from a declaration object */
export const unparse = function(context, decl, dialect) {
    var d = prompto.parser.Dialect[dialect];
    var writer = new prompto.utils.CodeWriter(d, context.newChildContext());
    // avoid throwing since this would stop the translation
    writer.context.problemListener = new prompto.problem.ProblemCollector();
    if(decl.comments) {
        decl.comments.forEach(function (cmt) {
            cmt.toDialect(writer);
        });
    }
    if(decl.annotations) {
        decl.annotations.forEach(function (ant) {
            ant.toDialect(writer);
        });
    }
    decl.toDialect(writer);
    return writer.toString();
}

/* a function for translating current input to other dialect */
export const translate = function(context, data, from, to) {
    var decls = parse(data, from); // could be cached
    var dialect = prompto.parser.Dialect[to];
    var writer = new prompto.utils.CodeWriter(dialect, context.newChildContext());
    decls.toDialect(writer);
    return writer.toString();
}

/* a utility function to sort by field name */
export const sortBy = function(a, f) {
    return a.sort(function(i1,i2) {
        return (i1[f]>i2[f]) ? 1 : ((i1[f]<i2[f]) ? -1 : 0);
    });
}

export const makeValidId = function(name) {
    /*eslint no-useless-escape: "off"*/
    return name.replace(/[ /\.]/g, "_").replace(/[\"\'\(\),]/g,"");
};

