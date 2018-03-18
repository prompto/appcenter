var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var prompto = prompto;

if(typeof prompto === 'undefined') {
    prompto = isNodeJs ?
        require("../../../../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto :
        require('prompto/index');
}


var Delta = require("./delta").Delta;
var Codebase = require("./codebase").Codebase;

exports.filterOutDuplicatesAddsSingleProto = function (test) {
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [{proto: "simple", main: true}]
    }];
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

exports.filterOutDuplicatesRemovesSingleProto = function (test) {
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [{proto: "simple", main: true}]
    }];
    delta.added = new Codebase();
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

exports.filterOutDuplicatesFiltersSingleProto = function (test) {
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "simple", main: true}
        ]
    }];
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "simple", main: true}
        ]
    }];
    test.equal(delta.filterOutDuplicates(), 0);
    test.done();
};

exports.filterOutDuplicatesAddsAndRemovesDistinctProtos = function (test) {
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "simple1", main: true}
        ]
    }];
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "simple2", main: true}
        ]
    }];
    test.equal(delta.filterOutDuplicates(), 2);
    test.done();
};

exports.filterOutDuplicatesAddsProtoWhenAddingAndRemovingOtherProto = function (test) {
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "simple2", main: true}
        ]
    }];
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "simple1", main: true},
            {proto: "simple2", main: true}
        ]
    }];
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

exports.filterOutDuplicatesRemovesProtoWhenAddingAndRemovingOtherProto = function (test) {
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "simple1", main: true},
            {proto: "simple2", main: true}
        ]
    }];
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "simple2", main: true}
        ]
    }];
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

function createContextWithMethods(methods) {
    var context = prompto.runtime.Context.newGlobalContext();
    methods.map(function (method) {
        var args = new prompto.grammar.ArgumentList();
        method.args.map(function (name) {
            var id = new prompto.grammar.Identifier(name);
            var arg = new prompto.argument.AttributeArgument(id);
            args.push(arg);
        });
        var id = new prompto.grammar.Identifier(method.name);
        var decl = new prompto.declaration.ConcreteMethodDeclaration(id, args);
        decl.register(context);
    });
    return context;
}


exports.adjustForMovingProtosPreservesAddedProto = function (test) {
    var context = createContextWithMethods([{name: "test", args: ["simple"]}]);
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "(simple)", main: true}
        ]
    }];
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
    test.equal(delta.length(), 1);
    test.done();
};

exports.adjustForMovingProtosPreservesRemovedProto = function (test) {
    var context = createContextWithMethods([]);
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "(simple)", main: true}
        ]
    }];
    delta.added = new Codebase();
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
    test.equal(delta.length(), 1);
    test.done();
};

exports.adjustForMovingProtosPreservesAddedAndRemovedProtos = function (test) {
    var context = createContextWithMethods([{name: "test", args: ["(simple2)"]}]);
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "(simple1)", main: true}
        ]
    }];
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "(simple2)", main: true}
        ]
    }];
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
    test.equal(delta.length(), 2);
    test.done();
};

exports.adjustForMovingProtosPreservesExistingProtosWhenMovingProto = function (test) {
    var context = createContextWithMethods([{name: "test", args: ["(simple1)"]},
        {name: "test", args: ["(simple2)"]}]);
    var delta = new Delta();
    delta.added = new Codebase();
    delta.added.methods = [{
        name: "test", protos: [
            {proto: "(simple2)", main: true}
        ]
    }];
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
    test.equal(delta.length(), 2);
    test.equal(delta.removed.methods.length, 1);
    var method = delta.removed.methods[0];
    test.equal(method.name, "test");
    test.equal(method.protos[0].proto, "(simple1)");
    test.equal(delta.added.methods.length, 1);
    method = delta.added.methods[0];
    test.equal(method.protos[0].proto, "(simple1)");
    test.equal(method.protos[1].proto, "(simple2)");
    test.done();
};

exports.adjustForMovingProtosPreservesExistingProtosWhenRemovingProto = function (test) {
    var context = createContextWithMethods([{name: "test", args: ["(simple2)"]}]);
    var delta = new Delta();
    delta.removed = new Codebase();
    delta.removed.methods = [{
        name: "test", protos: [
            {proto: "(simple1)", main: true}
        ]
    }];
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
    test.equal(delta.length(), 2);
    test.equal(delta.removed.methods.length, 1);
    var method = delta.removed.methods[0];
    test.equal(method.name, "test");
    test.equal(method.protos[0].proto, "(simple1)");
    test.equal(method.protos[1].proto, "(simple2)");
    test.equal(delta.added.methods.length, 1);
    method = delta.added.methods[0];
    test.equal(method.protos[0].proto, "(simple2)");
    test.done();
};

