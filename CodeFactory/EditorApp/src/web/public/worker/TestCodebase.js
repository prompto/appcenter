var Codebase = require("./codebase").Codebase;

exports.codebaseIsCreated = function (test) {
    var codebase = new Codebase();
    test.ok(codebase);
    test.done();
};


