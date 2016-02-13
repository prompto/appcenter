/**
 * Created by ericvergnaud on 13/02/16.
 */
var prompto = require("../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto;
var Catalog = require("./delta").Catalog;
var Delta = require("./delta").Delta;

var noDecls = new prompto.declaration.DeclarationList();

exports.testEmptyCatalog = function(test) {
    var catalog = new Catalog();
    test.ok(catalog);
    test.done();
};

exports.testDuplicates1ProtoAdded = function(test) {
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
                                    {   proto : "simple", main : true }
                                    ] } ];
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

exports.testDuplicates1ProtoRemoved = function(test) {
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "simple", main : true }
    ] } ];
    delta.added = new Catalog();
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

exports.testDuplicates1ProtoAddedAndRemoved = function(test) {
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "simple", main : true }
    ] } ];
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "simple", main : true }
    ] } ];
    test.equal(delta.filterOutDuplicates(), 0);
    test.done();
};

exports.testDuplicates1ProtoAddedAnd1Removed = function(test) {
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "simple1", main : true }
    ] } ];
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "simple2", main : true }
    ] } ];
    test.equal(delta.filterOutDuplicates(), 2);
    test.done();
};

exports.testDuplicates2ProtosAddedAnd1Removed = function(test) {
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "simple2", main : true }
    ] } ];
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "simple1", main : true },
        {   proto : "simple2", main : true }
    ] } ];
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

exports.testDuplicates1ProtoAddedAnd2Removed = function(test) {
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "simple1", main : true },
        {   proto : "simple2", main : true }
    ] } ];
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "simple2", main : true }
    ] } ];
    test.equal(delta.filterOutDuplicates(), 1);
    test.done();
};

function createContextWithMethods(methods) {
    var context = prompto.runtime.Context.newGlobalContext();
    methods.map( function(method) {
        var args = new prompto.grammar.ArgumentList();
        method.args.map( function(name) {
            var id = new prompto.grammar.Identifier(name);
            var arg = new prompto.grammar.AttributeArgument(id);
            args.push(arg);
        });
        var id = new prompto.grammar.Identifier(method.name);
        var decl = new prompto.declaration.ConcreteMethodDeclaration(id, args);
        decl.register(context);
    });
    return context;
};

exports.testMoving1ProtoAdded = function(test) {
    var context = createContextWithMethods([ { name : "test", args : [ "simple" ] }]);
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "(simple)", main : true }
    ] } ];
    test.ok(delta.adjustForMovingProtos(context));
    test.equal(delta.length(), 1);
    test.done();
};

exports.testMoving1ProtoRemoved = function(test) {
    var context = createContextWithMethods([]);
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "(simple)", main : true }
    ] } ];
    delta.added = new Catalog();
    test.ok(delta.adjustForMovingProtos(context));
    test.equal(delta.length(), 1);
    test.done();
};

exports.testMoving1ProtoChanged = function(test) {
    var context = createContextWithMethods([ { name : "test", args : [ "simple2" ] }]);
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "(simple1)", main : true }
    ] } ];
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "(simple2)", main : true }
    ] } ];
    test.ok(delta.adjustForMovingProtos(context));
    test.equal(delta.length(), 2);
    test.done();
};

exports.testMoving2ndProtoAdded = function(test) {
    var context = createContextWithMethods([ { name : "test", args : [ "simple1" ] },
        { name : "test", args : [ "simple2" ] }]);
    var delta = new Delta();
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "(simple2)", main : true }
    ] } ];
    test.ok(delta.adjustForMovingProtos(context));
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

exports.testMoving2ndProtoRemoved = function(test) {
    var context = createContextWithMethods([ { name : "test", args : [ "simple2" ] }]);
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "(simple1)", main : true }
    ] } ];
    test.ok(delta.adjustForMovingProtos(context));
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

