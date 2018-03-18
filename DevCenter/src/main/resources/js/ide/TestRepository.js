var isNodeJs = typeof window === 'undefined' && typeof importScripts === 'undefined';
var prompto = prompto;

if(typeof prompto === 'undefined') {
    prompto = isNodeJs ?
        require("../../../../../../../prompto-javascript/JavaScript-Core/src/test/prompto/parser/PromptoLoader").prompto :
        require('prompto/index');
}


//noinspection NodeJsCodingAssistanceForCoreModules
var path = require("path");
//noinspection NodeJsCodingAssistanceForCoreModules
var fs = require("fs");

var Delta = require("./delta").Delta;
var Codebase = require("./codebase").Codebase;
var Repository = require("./repository").Repository;


function fixPath(filePath) {
    return path.normalize(path.dirname(path.dirname(module.filename)) + "/" + filePath);
}

function loadText(filePath) {
    return fs.readFileSync(fixPath(filePath), {encoding: 'utf8'});
}

exports.codeIsLoaded = function (test) {
    var code = loadText("../prompto/prompto.pec");
    var repo = new Repository();
    repo.registerLibraryCode(code, "E");
    test.ok(repo.librariesContext);
    test.ok(Object.keys(repo.librariesContext.declarations).length > 0);
    test.done();
};


exports.creatingAttributeSetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Text attribute", "E", listener);
    test.ok(delta.added.attributes[0] === "name");
    test.ok(repo.statuses["name"].editStatus === "CREATED");
    test.done();
};

exports.updatingNewAttributeKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Integer attribute", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["name"].editStatus === "CREATED");
    test.ok(repo.statuses["name"].stuff.value.body === "define name as Integer attribute");
    test.done();
};

exports.updatingExistingAttributePreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Integer attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleEditContent("define name as Text attribute", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["name"].editStatus === "DIRTY");
    test.ok(repo.statuses["name"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["name"].stuff.value.body === "define name as Text attribute");
    test.done();
};

exports.selectingThenUpdatingNewAttributeKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Integer attribute", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["name"].editStatus === "CREATED");
    test.ok(repo.statuses["name"].stuff.value.body === "define name as Integer attribute");
    test.done();
};

exports.selectingThenUpdatingExistingAttributePreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Integer attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    repo.handleSetContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Text attribute", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["name"].editStatus === "DIRTY");
    test.ok(repo.statuses["name"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["name"].stuff.value.body === "define name as Text attribute");
    test.done();
};


exports.renamingNewAttributeKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(delta.added.attributes[0] === "renamed");
    test.ok(repo.statuses["name"] === undefined);
    test.ok(repo.statuses["renamed"].editStatus === "CREATED");
    test.done();
};


exports.renamingExistingAttributePreservesDbIdAndStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(delta.added.attributes[0] === "renamed");
    test.ok(repo.statuses["name"] === undefined);
    test.ok(repo.statuses["renamed"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["renamed"].editStatus === "DIRTY");
    test.done();
};


exports.selectingThenRenamingNewAttributeKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(delta.added.attributes[0] === "renamed");
    test.ok(repo.statuses["name"] === undefined);
    test.ok(repo.statuses["renamed"].editStatus === "CREATED");
    test.done();
};


exports.selectingThenRenamingExistingAttributePreservesDbIdAndStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleSetContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(delta.added.attributes[0] === "renamed");
    test.ok(repo.statuses["name"] === undefined);
    test.ok(repo.statuses["renamed"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["renamed"].editStatus === "DIRTY");
    test.done();
};


exports.destroyingNewAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    test.ok(repo.statuses["name"].editStatus === "CREATED");
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(repo.statuses["name"].editStatus === "DELETED");
    test.done();
};


exports.destroyingExistingAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(repo.statuses["name"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["name"].editStatus === "DELETED");
    test.done();
};


exports.selectingThenDestroyingNewAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(repo.statuses["name"].editStatus === "DELETED");
    test.done();
};


exports.selectingThenDestroyingExistingAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.ok(delta.removed.attributes[0] === "name");
    test.ok(repo.statuses["name"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["name"].editStatus === "DELETED");
    test.done();
};


exports.creatingCategorySetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    test.ok(delta.added.categories[0] === "Xyz");
    test.ok(repo.statuses["Xyz"].editStatus === "CREATED");
    test.done();
};


exports.updatingNewCategoryKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["Xyz"].editStatus === "CREATED");
    test.ok(repo.statuses["Xyz"].stuff.value.body === "define Xyz as category with attribute other\n");
    test.done();
};


exports.updatingExistingCategoryPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["Xyz"].editStatus === "DIRTY");
    test.ok(repo.statuses["Xyz"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["Xyz"].stuff.value.body === "define Xyz as category with attribute other\n");
    test.done();
};



exports.selectingThenUpdatingNewCategoryKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["Xyz"].editStatus === "CREATED");
    test.ok(repo.statuses["Xyz"].stuff.value.body === "define Xyz as category with attribute other\n");
    test.done();
};


exports.selectingThenUpdatingExistingCategoryPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["Xyz"].editStatus === "DIRTY");
    test.ok(repo.statuses["Xyz"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["Xyz"].stuff.value.body === "define Xyz as category with attribute other\n");
    test.done();
};

exports.renamingNewCategoryKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute name", "E", listener);
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(delta.added.categories[0] === "Abc");
    test.ok(repo.statuses["Xyz"] === undefined);
    test.ok(repo.statuses["Abc"].editStatus === "CREATED");
    test.done();
};


exports.renamingExistingCategoryPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute other", "E", listener);
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(delta.added.categories[0] === "Abc");
    test.ok(repo.statuses["Xyz"] === undefined);
    test.ok(repo.statuses["Abc"].editStatus === "DIRTY");
    test.ok(repo.statuses["Abc"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["Abc"].stuff.value.body === "define Abc as category with attribute other\n");
    test.done();
};


exports.selectingThenRenamingNewCategoryKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute name", "E", listener);
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(delta.added.categories[0] === "Abc");
    test.ok(repo.statuses["Xyz"] === undefined);
    test.ok(repo.statuses["Abc"].editStatus === "CREATED");
    test.done();
};



exports.selectedThenRenamingExistingCategoryPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute other", "E", listener);
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(delta.added.categories[0] === "Abc");
    test.ok(repo.statuses["Xyz"] === undefined);
    test.ok(repo.statuses["Abc"].editStatus === "DIRTY");
    test.ok(repo.statuses["Abc"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["Abc"].stuff.value.body === "define Abc as category with attribute other\n");
    test.done();
};


exports.destroyingNewCategorySetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    test.ok(repo.statuses["Xyz"].editStatus === "CREATED");
    var delta = repo.handleDestroyed({subType: "category", name: "Xyz"});
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(repo.statuses["Xyz"].editStatus === "DELETED");
    test.done();
};


exports.destroyingExistingCategoryPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "category", name: "Xyz"});
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(repo.statuses["Xyz"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["Xyz"].editStatus === "DELETED");
    test.done();
};


exports.selectingThenDestroyingNewCategorySetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    repo.registerDestroyed({category: "Xyz"});
    var delta = repo.handleDestroyed({subType: "category", name: "Xyz"});
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(repo.statuses["Xyz"].editStatus === "DELETED");
    test.done();
};


exports.selectingThenDestroyingExistingCategoryPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define Xyz as category with attribute name", "E", listener);
    var delta = repo.handleDestroyed({subType: "category", name: "Xyz"});
    test.ok(delta.removed.categories[0] === "Xyz");
    test.ok(repo.statuses["Xyz"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["Xyz"].editStatus === "DELETED");
    test.done();
};


exports.creatingTestSetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses['"simple test"'].editStatus === "CREATED");
    test.ok(repo.statuses['"simple test"'].stuff.value.body === 'define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n');
    test.done();
};


exports.selectingThenUpdatingNewTestKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses['"simple test"'].editStatus === "CREATED");
    test.ok(repo.statuses['"simple test"'].stuff.value.body === 'define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n');
    test.done();
};


exports.selectingThenUpdatingExistingTestPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    repo.statuses['"simple test"'].editStatus = "CLEAN";
    repo.statuses['"simple test"'].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses['"simple test"'].editStatus === "DIRTY");
    test.ok(repo.statuses['"simple test"'].stuff.value.dbId === 'Some UUID');
    test.ok(repo.statuses['"simple test"'].stuff.value.body === 'define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n');
    test.done();
};


exports.renamingNewTestKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(delta.added.tests[0] === '"renamed test"');
    test.ok(repo.statuses['"simple test"'] === undefined);
    test.ok(repo.statuses['"renamed test"'].editStatus === "CREATED");
    test.done();
};


exports.renamingExistingTestPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    repo.statuses['"simple test"'].editStatus = "CLEAN";
    repo.statuses['"simple test"'].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(delta.added.tests[0] === '"renamed test"');
    test.ok(repo.statuses['"simple test"'] === undefined);
    test.ok(repo.statuses['"renamed test"'].editStatus === "DIRTY");
    test.ok(repo.statuses['"renamed test"'].stuff.value.dbId === 'Some UUID');
    test.done();
};



exports.selectingThenRenamingNewTestKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(delta.added.tests[0] === '"renamed test"');
    test.ok(repo.statuses['"simple test"'] === undefined);
    test.ok(repo.statuses['"renamed test"'].editStatus === "CREATED");
    test.done();
};


exports.selectingThenRenamingExistingTestPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    repo.statuses['"simple test"'].editStatus = "CLEAN";
    repo.statuses['"simple test"'].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(delta.added.tests[0] === '"renamed test"');
    test.ok(repo.statuses['"simple test"'] === undefined);
    test.ok(repo.statuses['"renamed test"'].editStatus === "DIRTY");
    test.ok(repo.statuses['"renamed test"'].stuff.value.dbId === 'Some UUID');
    test.done();
};



exports.destroyingNewTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.ok(repo.statuses['"simple test"'].editStatus === "CREATED");
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus === "DELETED");
    test.done();
};


exports.destroyingExistingTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    repo.statuses['"simple test"'].editStatus = "CLEAN";
    repo.statuses['"simple test"'].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus === "DELETED");
    test.ok(repo.statuses['"simple test"'].stuff.value.dbId === 'Some UUID');
    test.done();
};



exports.selectingThenDestroyingNewTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus === "DELETED");
    test.done();
};


exports.selectingThenDestroyingExistingTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    repo.statuses['"simple test"'].editStatus = "CLEAN";
    repo.statuses['"simple test"'].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.ok(delta.removed.tests[0] === '"simple test"');
    test.ok(repo.statuses['"simple test"'].editStatus === "DELETED");
    test.ok(repo.statuses['"simple test"'].stuff.value.dbId === 'Some UUID');
    test.done();
};




exports.creatingMethodSetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/"].editStatus === "CREATED");
    test.done();
};


exports.updatingNewMethodKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["main/"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"].stuff.value.body === "define main as method doing:\n\ta = 3\n");
    test.done();
};


exports.updatingExistingMethodPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["main/"].editStatus === "DIRTY");
    test.ok(repo.statuses["main/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/"].stuff.value.body === "define main as method doing:\n\ta = 3\n");
    test.done();
};


exports.selectingThenUpdatingNewMethodKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["main/"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"].stuff.value.body === "define main as method doing:\n\ta = 3\n");
    test.done();
};


exports.selectingThenUpdatingExistingMethodPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.ok(delta === null);
    test.ok(repo.statuses["main/"].editStatus === "DIRTY");
    test.ok(repo.statuses["main/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/"].stuff.value.body === "define main as method doing:\n\ta = 3\n");
    test.done();
};




exports.renamingNewMethodWith1ProtoKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "CREATED");
    test.done();
};


exports.renamingExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "DIRTY");
    test.ok(repo.statuses["renamed/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["renamed/"].stuff.value.body === "define renamed as method doing:\n\ta = 2\n");
    test.done();
};



exports.selectingThenRenamingNewMethodWith1ProtoKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "CREATED");
    test.done();
};


exports.selectingThenrenamingExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "DIRTY");
    test.ok(repo.statuses["renamed/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["renamed/"].stuff.value.body === "define renamed as method doing:\n\ta = 2\n");
    test.done();
};

exports.updatingProtoOfNewMethodWith1ProtoKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Text");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.done();
};



exports.updatingProtoOfExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Text");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "DIRTY");
    test.ok(repo.statuses["main/Text"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/Text"].stuff.value.body === "define main as method receiving Text value doing:\n\ta = 2\n");
    test.done();
};


exports.selectingThenUpdatingProtoOfNewMethodWith1ProtoKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Text");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.done();
};



exports.selectingThenUpdatingProtoOfExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Text");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "DIRTY");
    test.ok(repo.statuses["main/Text"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/Text"].stuff.value.body === "define main as method receiving Text value doing:\n\ta = 2\n");
    test.done();
};


exports.renamingNewMethodWith2ProtosKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(delta.added.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "CREATED");
    test.done();
};


exports.renamingExistingMethodWith2ProtosPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(delta.added.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "DIRTY");
    test.ok(repo.statuses["renamed/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["renamed/"].stuff.value.body === "define renamed as method doing:\n\ta = 2\n");
    test.done();
};


exports.selectingThenRenamingNewMethodWith2ProtosKeepsStatusToCREATED = function (test) {
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
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(delta.added.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "CREATED");
    test.done();
};


exports.selectingThenRenamingExistingMethodWith2ProtosPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "renamed");
    test.ok(delta.added.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["renamed/"].editStatus === "DIRTY");
    test.ok(repo.statuses["renamed/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["renamed/"].stuff.value.body === "define renamed as method doing:\n\ta = 2\n");
    test.done();
};



exports.updatingProtoOfNewMethodWith2ProtosKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Integer value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Integer");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/Integer"].editStatus === "CREATED");
    test.done();
};


exports.updatingProtoOfExistingMethodWith2ProtosPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Integer value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Integer");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/Integer"].editStatus === "DIRTY");
    test.ok(repo.statuses["main/Integer"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/Integer"].stuff.value.body === "define main as method receiving Integer value doing:\n\ta = 2\n");
    test.done();
};



exports.selectingThenUpdatingProtoOfNewMethodWith2ProtosKeepsStatusToCREATED = function (test) {
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
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Integer");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/Integer"].editStatus === "CREATED");
    test.done();
};


exports.selectingThenUpdatingProtoOfExistingMethodWith2ProtosPreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Integer value doing:\n\ta = 2\n", "E", listener);
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(delta.added.methods[0].name === "main");
    test.ok(delta.added.methods[0].protos[0].proto === "Integer");
    test.ok(repo.statuses["main/"] === undefined);
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/Integer"].editStatus === "DIRTY");
    test.ok(repo.statuses["main/Integer"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/Integer"].stuff.value.body === "define main as method receiving Integer value doing:\n\ta = 2\n");
    test.done();
};


exports.destroyingNewMethodWith1ProtoSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(repo.statuses["main/"].editStatus === "CREATED");
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/"].editStatus === "DELETED");
    test.done();
};


exports.destroyingExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/"].editStatus === "DELETED");
    test.ok(repo.statuses["main/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/"].stuff.value.body === "define main as method doing:\n\ta = 2\n");
    test.done();
};


exports.selectingThenDestroyingNewMethodWith1ProtoSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(repo.statuses["main/"].editStatus === "CREATED");
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/"].editStatus === "DELETED");
    test.done();
};


exports.selectingThenDestroyingExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/"].editStatus === "DELETED");
    test.ok(repo.statuses["main/"].stuff.value.dbId === "Some UUID");
    test.ok(repo.statuses["main/"].stuff.value.body === "define main as method doing:\n\ta = 2\n");
    test.done();
};


exports.destroyingNewMethodWith2ProtosSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.ok(repo.statuses["main/"].editStatus === "CREATED");
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"].editStatus === "DELETED");
    test.done();
};


exports.destroyingExistingMethodWith2ProtosPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("", "E", listener); // new
    listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.ok(delta.removed.methods[0].name === "main");
    test.ok(delta.removed.methods[0].protos[0].proto === "");
    test.ok(repo.statuses["main/Text"].editStatus === "CREATED");
    test.ok(repo.statuses["main/"].editStatus === "DELETED");
    test.ok(repo.statuses["main/"].stuff.value.dbId === "Some UUID");
    test.done();
};