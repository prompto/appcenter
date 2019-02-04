/* not Webpacking this yet because that would require webpacking and installing prompto runtime too, which is not ready yet */

class AnnotatingErrorListener extends prompto.problem.ProblemCollector {

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