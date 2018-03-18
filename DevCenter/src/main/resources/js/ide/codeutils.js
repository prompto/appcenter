var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var prompto = prompto;

if(typeof prompto === 'undefined') {
    prompto = isNodeJs ?
        require("../../../../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto :
        require('prompto/index');
}


if(typeof exports === 'undefined')
    exports = {};

/* a function for inferring dialect from file extension */
exports.inferDialect = function(path) {
    return path.substring(path.length-2, path.length-1).toUpperCase();
}

/* a function for parsing prompto code into declarations */
exports.parse = function(input, dialect, listener) {
    var klass = prompto.parser[dialect + "CleverParser"];
    var parser = new klass(input);
    parser.removeErrorListeners();
    if(listener)
        parser.addErrorListener(listener);
    return parser.parse();
}

/* a function for producing code from a declaration object */
exports.unparse = function(context, decl, dialect) {
    var d = prompto.parser.Dialect[dialect];
    var writer = new prompto.utils.CodeWriter(d, context.newChildContext());
    if(decl.comments) {
        decl.comments.forEach(function (cmt) {
            cmt.toDialect(writer);
        });
    }
    decl.toDialect(writer);
    return writer.toString();
}

/* a function for translating current input to other dialect */
exports.translate = function(context, data, from, to) {
    var decls = parse(data, from); // could be cached
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

if(self)
    self.codeutils = exports;