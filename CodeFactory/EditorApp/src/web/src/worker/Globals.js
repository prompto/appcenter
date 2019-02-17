// eslint-disable-next-line
const globals = self;
globals.Honey = {'requirePath': ['..']}; // walk up to js folder
globals.importScripts("/js/lib/require.js", "/js/lib/prompto.core.bundle.js");

const log = function() {
    var e = Array.prototype.slice.call(arguments, 0);
    postMessage({
        type: "log",
        data: e
    });
};

console.error = console.warn = console.log = console.trace = log;

/* not Webpacking this yet because that would require webpacking and installing prompto runtime too, which is not ready yet */

globals.AnnotatingErrorListener = class AnnotatingErrorListener extends globals["prompto"].problem.ProblemCollector {

    constructor(problems) {
        super();
        this.problems = problems || [];
    }

    collectProblem(problem) {
        // convert to ACE annotation
        problem = { row : problem.startLine - 1,
            column : problem.startColumn,
            endRow : problem.endLine - 1,
            endColumn : problem.endColumn,
            type : problem.type,
            text : problem.message };
        this.problems.push(problem);
    }
}