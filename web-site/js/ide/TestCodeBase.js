var codebase = require("./codebase");
var prompto = codebase.prompto;
var Repository = codebase.Repository;
var Catalog = codebase.Catalog;
var Delta = codebase.Delta;
var path = require("path");
var fs = require("fs");

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
            var arg = new prompto.argument.AttributeArgument(id);
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
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
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
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
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
    test.ok(delta.filterOutDuplicates());
    delta.adjustForMovingProtos(context);
    test.equal(delta.length(), 2);
    test.done();
};

exports.testMoving2ndProtoAdded = function(test) {
    var context = createContextWithMethods([ { name : "test", args : [ "(simple1)" ] },
        { name : "test", args : [ "(simple2)" ] }]);
    var delta = new Delta();
    delta.added = new Catalog();
    delta.added.methods = [ { name : "test", protos : [
        {   proto : "(simple2)", main : true }
    ] } ];
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

exports.testMoving2ndProtoRemoved = function(test) {
    var context = createContextWithMethods([ { name : "test", args : [ "(simple2)" ] }]);
    var delta = new Delta();
    delta.removed = new Catalog();
    delta.removed.methods = [ { name : "test", protos : [
        {   proto : "(simple1)", main : true }
    ] } ];
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


function fixPath(filePath) {
    return path.normalize(path.dirname(path.dirname(module.filename)) + filePath);
}

function loadText(filePath) {
    return fs.readFileSync(fixPath(filePath), { encoding : 'utf8'} );
}

exports.testLoadCore = function(test) {
    var code = loadText("../../prompto/prompto.pec");
    var repo = new Repository();
    repo.registerLibraryCode(code, "E");
    test.ok(repo.librariesContext);
    test.ok(Object.keys(repo.librariesContext.declarations).length>0);
    test.done();
};


exports.testCreateAttribute = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Text attribute", "E", listener);
    test.ok(delta.added.attributes[0]=="name");
    test.ok(repo.statuses["name"].editStatus=="CREATED");
    test.done();
};

exports.testUpdateCreatedAttribute = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Integer attribute", "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses["name"].editStatus=="CREATED");
    test.ok(repo.statuses["name"].declaration.value.body=="define name as Integer attribute");
    test.done();
};

exports.testUpdateSelectedAttribute = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Integer attribute", "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses["name"].editStatus=="CREATED");
    test.ok(repo.statuses["name"].declaration.value.body=="define name as Integer attribute");
    test.done();
};

exports.testUpdateCreatedAttributeName = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.ok(delta.removed.attributes[0]=="name");
    test.ok(delta.added.attributes[0]=="renamed");
    test.ok(repo.statuses["name"]==undefined);
    test.ok(repo.statuses["renamed"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateSelectedAttributeName = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.ok(delta.removed.attributes[0]=="name");
    test.ok(delta.added.attributes[0]=="renamed");
    test.ok(repo.statuses["name"]==undefined);
    test.ok(repo.statuses["renamed"].editStatus=="CREATED");
    test.done();
};

exports.testDestroyCreatedAttribute = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    test.ok(repo.statuses["name"].editStatus=="CREATED");
    var delta = repo.handleDestroyed({attribute : "name"});
    test.ok(delta.removed.attributes[0]=="name");
    test.ok(repo.statuses["name"].editStatus=="DELETED");
    test.done();
};


exports.testDestroySelectedAttribute = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    var delta = repo.handleDestroyed({attribute : "name"});
    test.ok(delta.removed.attributes[0]=="name");
    test.ok(repo.statuses["name"].editStatus=="DELETED");
    test.done();
};


exports.testCreateCategory = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    test.ok(delta.added.categories[0]=="Xyz");
    test.ok(repo.statuses["Xyz"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateCreatedCategory = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses["Xyz"].editStatus=="CREATED");
    test.ok(repo.statuses["Xyz"].declaration.value.body=="define Xyz as category with attribute other\n");
    test.done();
};

exports.testUpdateSelectedCategory = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses["Xyz"].editStatus=="CREATED");
    test.ok(repo.statuses["Xyz"].declaration.value.body=="define Xyz as category with attribute other\n");
    test.done();
};

exports.testUpdateCreatedCategoryName = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute name", "E", listener);
    test.ok(delta.removed.categories[0]=="Xyz");
    test.ok(delta.added.categories[0]=="Abc");
    test.ok(repo.statuses["Xyz"]==undefined);
    test.ok(repo.statuses["Abc"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateSelectedCategoryName = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute name", "E", listener);
    test.ok(delta.removed.categories[0]=="Xyz");
    test.ok(delta.added.categories[0]=="Abc");
    test.ok(repo.statuses["Xyz"]==undefined);
    test.ok(repo.statuses["Abc"].editStatus=="CREATED");
    test.done();
};


exports.testDestroyCreatedCategory = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    test.ok(repo.statuses["Xyz"].editStatus=="CREATED");
    var delta = repo.handleDestroyed({category : "Xyz"});
    test.ok(delta.removed.categories[0]=="Xyz");
    test.ok(repo.statuses["Xyz"].editStatus=="DELETED");
    test.done();
};


exports.testDestroySelectedCategory = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    repo.registerDestroyed({category : "Xyz"});
    var delta = repo.handleDestroyed({category : "Xyz"});
    test.ok(delta.removed.categories[0]=="Xyz");
    test.ok(repo.statuses["Xyz"].editStatus=="DELETED");
    test.done();
};



exports.testCreateTest = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.added.tests[0]=='"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus=="CREATED");
    test.done();
};


exports.testUpdateCreatedTest = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses['"simple test"'].editStatus=="CREATED");
    test.ok(repo.statuses['"simple test"'].declaration.value.body=='define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n');
    test.done();
};


exports.testUpdateSelectedTest = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses['"simple test"'].editStatus=="CREATED");
    test.ok(repo.statuses['"simple test"'].declaration.value.body=='define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n');
    test.done();
};


exports.testUpdateCreatedTestName = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.removed.tests[0]=='"simple test"');
    test.ok(delta.added.tests[0]=='"renamed test"');
    test.ok(repo.statuses['"simple test"']==undefined);
    test.ok(repo.statuses['"renamed test"'].editStatus=="CREATED");
    test.done();
};


exports.testUpdateSelectedTestName = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.removed.tests[0]=='"simple test"');
    test.ok(delta.added.tests[0]=='"renamed test"');
    test.ok(repo.statuses['"simple test"']==undefined);
    test.ok(repo.statuses['"renamed test"'].editStatus=="CREATED");
    test.done();
};


exports.testDestroyCreatedTest = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(repo.statuses['"simple test"'].editStatus=="CREATED");
    var delta = repo.handleDestroyed({test : '"simple test"'});
    test.ok(delta.removed.tests[0]=='"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus=="DELETED");
    test.done();
};


exports.testDestroySelectedTest = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    var delta = repo.handleDestroyed({test : '"simple test"'});
    test.ok(delta.removed.tests[0]=='"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus=="DELETED");
    test.done();
};


exports.testCreateMethod = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.added.methods[0].name=="main");
    test.ok(delta.added.methods[0].protos[0].proto=="");
    test.ok(repo.statuses["main/"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateCreatedMethod = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses["main/"].editStatus=="CREATED");
    test.ok(repo.statuses["main/"].declaration.value.body=="define main as method doing:\n\ta = 3\n");
    test.done();
};


exports.testUpdateSelectedMethod = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.ok(delta==null);
    test.ok(repo.statuses["main/"].editStatus=="CREATED");
    test.ok(repo.statuses["main/"].declaration.value.body=="define main as method doing:\n\ta = 3\n");
    test.done();
};


exports.testUpdateCreatedMethodName1Proto = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.added.methods[0].name=="renamed");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["renamed/"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateSelectedTestName1Proto = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.added.methods[0].name=="renamed");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["renamed/"].editStatus=="CREATED");
    test.done();
};

exports.testUpdateCreatedMethodProto1Proto = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(delta.added.methods[0].name=="main");
    test.ok(delta.added.methods[0].protos[0].proto=="Text");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.done();
};

exports.testUpdateSelectedMethodProto1Proto = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(delta.added.methods[0].name=="main");
    test.ok(delta.added.methods[0].protos[0].proto=="Text");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateCreatedMethodName2Protos = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(delta.added.methods[0].name=="renamed");
    test.ok(delta.added.methods[0].protos[0].proto=="");
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["renamed/"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateSelectedTestName2Protos = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(delta.added.methods[0].name=="renamed");
    test.ok(delta.added.methods[0].protos[0].proto=="");
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["renamed/"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateCreatedMethodProto2Protos = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Integer value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(delta.added.methods[0].name=="main");
    test.ok(delta.added.methods[0].protos[0].proto=="Integer");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.ok(repo.statuses["main/Integer"].editStatus=="CREATED");
    test.done();
};


exports.testUpdateSelectedMethodProto2Protos = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Integer value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(delta.added.methods[0].name=="main");
    test.ok(delta.added.methods[0].protos[0].proto=="Integer");
    test.ok(repo.statuses["main/"]==undefined);
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.ok(repo.statuses["main/Integer"].editStatus=="CREATED");
    test.done();
};


exports.testDestroyCreatedMethod1Proto = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(repo.statuses["main/"].editStatus=="CREATED");
    var delta = repo.handleDestroyed({method : "main", proto : "" });
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(repo.statuses["main/"].editStatus=="DELETED");
    test.done();
};


exports.testDestroySelectedMethod1Proto = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(repo.statuses["main/"].editStatus=="CREATED");
    var delta = repo.handleDestroyed({method : "main", proto : "" });
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(repo.statuses["main/"].editStatus=="DELETED");
    test.done();
};


exports.testDestroyCreatedMethod2Protos = function(test){
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(repo.statuses["main/"].editStatus=="CREATED");
    var delta = repo.handleDestroyed({method : "main", proto : "" });
    test.ok(delta.removed.methods[0].name=="main");
    test.ok(delta.removed.methods[0].protos[0].proto=="");
    test.ok(repo.statuses["main/Text"].editStatus=="CREATED");
    test.ok(repo.statuses["main/"].editStatus=="DELETED");
    test.done();
};