/* a function for inferring dialect from file extension */
exports.inferDialect = function(path) {
    return path.substring(path.length-2, path.length-1).toUpperCase();
}

/* a function for getting a new prompto code parser */
exports.newParser = function(input, dialect, listener) {
    /* eslint-disable-next-line */
    const prompto = self.prompto;
    var klass = prompto.parser[dialect + "CleverParser"];
    var parser = new klass(input);
    parser.removeErrorListeners();
    if(listener)
        parser.addErrorListener(listener);
    return parser;
}

/* a function for parsing prompto code into declarations */
exports.parse = function(input, dialect, listener) {
    var parser = exports.newParser(input, dialect, listener);
    return parser.parse();
}

/* a function for producing code from a declaration object */
exports.unparse = function(context, decl, dialect) {
    /* eslint-disable-next-line */
    const prompto = self.prompto;
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
exports.translate = function(context, data, from, to) {
    /* eslint-disable-next-line */
    const prompto = self.prompto;
    var decls = exports.parse(data, from); // could be cached
    var dialect = prompto.parser.Dialect[to];
    var writer = new prompto.utils.CodeWriter(dialect, context.newChildContext());
    decls.toDialect(writer);
    return writer.toString();
}

/* a utility function to sort by field name */
exports.sortBy = function(a, f) {
    return a.sort(function(i1,i2) {
        return (i1[f]>i2[f]) ? 1 : ((i1[f]<i2[f]) ? -1 : 0);
    });
}
