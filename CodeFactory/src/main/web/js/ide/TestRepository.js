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

function clearws(text) {
    return text.replace(/(\n|\r|\t)+/g, "");
}

exports.codeIsLoaded = function (test) {
    global.Event = function () {}; // referred by web stuff
    var code = loadText("../prompto/prompto.pec");
    var repo = new Repository();
    repo.registerLibraryCode(code, "E");
    test.notEqual(repo.librariesContext, null);
    test.ok(Object.keys(repo.librariesContext.declarations).length > 0);
    test.done();
};


exports.creatingAttributeSetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Text attribute", "E", listener);
    test.equal(delta.added.attributes[0], "name");
    test.equal(repo.statuses["name"].editStatus, "CREATED");
    test.done();
};

exports.creatingASeriesOfAttributeSetsStatusesToCREATED = function (test) {
    var repo = new Repository();
    var inputs = [
        "defin",
        "define na",
        "define name as Te",
        "define name as Text attri",
        "define name as Text attribute",
        "define name as Text attribute\ndefine name as Text attribute",
        "define name as Text attribute\ndefine cou as Text attribute",
        "define name as Text attribute\ndefine count as Text attribute",
        "define names as Text attribute\ndefine count as Text attribute",
        "define names as Text attribute\ndefine count as Text attribute\ndefine count as Text attribute",
        "define names as Text attribute\ndefine count as Text attribute\ndefine xcount as Text attribute",
        "define names as Text attribute\ndefine count as Text attribute\ndefine xcounts as Text attribute"
    ];
    inputs.map(function(input) {
        repo.handleEditContent(input, "E", new prompto.problem.ProblemCollector());
    });
    var names = Object.getOwnPropertyNames(repo.statuses);
    test.equal(names.length, 3);
    test.equal(repo.statuses["count"].editStatus, "CREATED");
    test.equal(repo.statuses["xcounts"].editStatus, "CREATED");
    test.equal(repo.statuses["names"].editStatus, "CREATED");
    test.done();
};

exports.updatingNewAttributeKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define name as Integer attribute", "E", listener);
    test.equal(delta, null);
    test.equal(repo.statuses["name"].editStatus, "CREATED");
    test.equal(clearws(repo.statuses["name"].stuff.value.body), clearws("define name as Integer attribute"));
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
    test.equal(delta, null);
    test.equal(repo.statuses["name"].editStatus, "DIRTY");
    test.equal(repo.statuses["name"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["name"].stuff.value.body), clearws("define name as Text attribute"));
    test.done();
};


exports.changingDialectOfExistingAttributePreservesDbIdAndSetsStatusToDIRTY = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("attribute name: Text;", "O", listener);
    test.equal(repo.statuses["name"].editStatus, "DIRTY");
    test.equal(repo.statuses["name"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["name"].stuff.value.dialect, "O");
    test.equal(repo.statuses["name"].stuff.value.body, "attribute name: Text;");
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
    test.equal(delta, null);
    test.equal(repo.statuses["name"].editStatus, "CREATED");
    test.equal(repo.statuses["name"].stuff.value.body, "define name as Integer attribute");
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
    test.equal(delta, null);
    test.equal(repo.statuses["name"].editStatus, "DIRTY");
    test.equal(repo.statuses["name"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["name"].stuff.value.body, "define name as Text attribute");
    test.done();
};


exports.renamingNewAttributeKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as Text attribute", "E", listener);
    test.equal(delta.removed.attributes[0], "name");
    test.equal(delta.added.attributes[0], "renamed");
    test.equal(repo.statuses["name"], undefined);
    test.equal(repo.statuses["renamed"].editStatus, "CREATED");
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
    test.equal(delta.removed.attributes[0], "name");
    test.equal(delta.added.attributes[0], "renamed");
    test.equal(repo.statuses["name"], undefined);
    test.equal(repo.statuses["renamed"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["renamed"].editStatus, "DIRTY");
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
    test.equal(delta.removed.attributes[0], "name");
    test.equal(delta.added.attributes[0], "renamed");
    test.equal(repo.statuses["name"], undefined);
    test.equal(repo.statuses["renamed"].editStatus, "CREATED");
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
    test.equal(delta.removed.attributes[0], "name");
    test.equal(delta.added.attributes[0], "renamed");
    test.equal(repo.statuses["name"], undefined);
    test.equal(repo.statuses["renamed"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["renamed"].editStatus, "DIRTY");
    test.done();
};


exports.destroyingNewAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    test.equal(repo.statuses["name"].editStatus, "CREATED");
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.equal(delta.removed.attributes[0], "name");
    test.equal(repo.statuses["name"].editStatus, "DELETED");
    test.done();
};


exports.destroyingExistingAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    repo.statuses["name"].editStatus = "CLEAN";
    repo.statuses["name"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.equal(delta.removed.attributes[0], "name");
    test.equal(repo.statuses["name"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["name"].editStatus, "DELETED");
    test.done();
};


exports.selectingThenDestroyingNewAttributeSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define name as Text attribute", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define name as Text attribute", "E", listener);
    var delta = repo.handleDestroyed({subType: "attribute", name: "name"});
    test.equal(delta.removed.attributes[0], "name");
    test.equal(repo.statuses["name"].editStatus, "DELETED");
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
    test.equal(delta.removed.attributes[0], "name");
    test.equal(repo.statuses["name"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["name"].editStatus, "DELETED");
    test.done();
};


exports.creatingCategorySetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    test.equal(delta.added.categories[0], "Xyz");
    test.equal(repo.statuses["Xyz"].editStatus, "CREATED");
    test.done();
};


exports.updatingNewCategoryKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Xyz as category with attribute other", "E", listener);
    test.equal(delta, null);
    test.equal(repo.statuses["Xyz"].editStatus, "CREATED");
    test.equal(clearws(repo.statuses["Xyz"].stuff.value.body), "define Xyz as category with attribute other");
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
    test.equal(delta, null);
    test.equal(repo.statuses["Xyz"].editStatus, "DIRTY");
    test.equal(repo.statuses["Xyz"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["Xyz"].stuff.value.body), "define Xyz as category with attribute other");
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
    test.equal(delta, null);
    test.equal(repo.statuses["Xyz"].editStatus, "CREATED");
    test.equal(clearws(repo.statuses["Xyz"].stuff.value.body), "define Xyz as category with attribute other");
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
    test.equal(delta, null);
    test.equal(repo.statuses["Xyz"].editStatus, "DIRTY");
    test.equal(repo.statuses["Xyz"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["Xyz"].stuff.value.body), "define Xyz as category with attribute other");
    test.done();
};

exports.renamingNewCategoryKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define Abc as category with attribute name", "E", listener);
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(delta.added.categories[0], "Abc");
    test.equal(repo.statuses["Xyz"], undefined);
    test.equal(repo.statuses["Abc"].editStatus, "CREATED");
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
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(delta.added.categories[0], "Abc");
    test.equal(repo.statuses["Xyz"], undefined);
    test.equal(repo.statuses["Abc"].editStatus, "DIRTY");
    test.equal(repo.statuses["Abc"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["Abc"].stuff.value.body), "define Abc as category with attribute other");
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
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(delta.added.categories[0], "Abc");
    test.equal(repo.statuses["Xyz"], undefined);
    test.equal(repo.statuses["Abc"].editStatus, "CREATED");
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
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(delta.added.categories[0], "Abc");
    test.equal(repo.statuses["Xyz"], undefined);
    test.equal(repo.statuses["Abc"].editStatus, "DIRTY");
    test.equal(repo.statuses["Abc"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["Abc"].stuff.value.body, "define Abc as category with attribute other");
    test.done();
};


exports.destroyingNewCategorySetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    test.equal(repo.statuses["Xyz"].editStatus, "CREATED");
    var delta = repo.handleDestroyed({subType: "category", name: "Xyz"});
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(repo.statuses["Xyz"].editStatus, "DELETED");
    test.done();
};


exports.destroyingExistingCategoryPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define Xyz as category with attribute name", "E", listener);
    repo.statuses["Xyz"].editStatus = "CLEAN";
    repo.statuses["Xyz"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "category", name: "Xyz"});
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(repo.statuses["Xyz"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["Xyz"].editStatus, "DELETED");
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
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(repo.statuses["Xyz"].editStatus, "DELETED");
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
    test.equal(delta.removed.categories[0], "Xyz");
    test.equal(repo.statuses["Xyz"].stuff.value.dbId, "Some UUID");
    test.equal(repo.statuses["Xyz"].editStatus, "DELETED");
    test.done();
};


exports.creatingTestSetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2', "E", listener);
    test.equal(delta, null);
    test.equal(repo.statuses['"simple test"'].editStatus, "CREATED");
    test.equal(clearws(repo.statuses['"simple test"'].stuff.value.body), clearws('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n'));
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
    test.equal(delta, null);
    test.equal(repo.statuses['"simple test"'].editStatus, "CREATED");
    test.equal(clearws(repo.statuses['"simple test"'].stuff.value.body), clearws('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n'));
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
    test.equal(delta, null);
    test.equal(repo.statuses['"simple test"'].editStatus, "DIRTY");
    test.equal(repo.statuses['"simple test"'].stuff.value.dbId, 'Some UUID');
    test.equal(clearws(repo.statuses['"simple test"'].stuff.value.body), clearws('define "simple test" as test method doing:\n\ta = 3\nand verifying:\n\ta = 2\n'));
    test.done();
};


exports.renamingNewTestKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent('define "renamed test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(delta.added.tests[0], '"renamed test"');
    test.equal(repo.statuses['"simple test"'], undefined);
    test.equal(repo.statuses['"renamed test"'].editStatus, "CREATED");
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
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(delta.added.tests[0], '"renamed test"');
    test.equal(repo.statuses['"simple test"'], undefined);
    test.equal(repo.statuses['"renamed test"'].editStatus, "DIRTY");
    test.equal(repo.statuses['"renamed test"'].stuff.value.dbId, 'Some UUID');
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
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(delta.added.tests[0], '"renamed test"');
    test.equal(repo.statuses['"simple test"'], undefined);
    test.equal(repo.statuses['"renamed test"'].editStatus, "CREATED");
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
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(delta.added.tests[0], '"renamed test"');
    test.equal(repo.statuses['"simple test"'], undefined);
    test.equal(repo.statuses['"renamed test"'].editStatus, "DIRTY");
    test.equal(repo.statuses['"renamed test"'].stuff.value.dbId, 'Some UUID');
    test.done();
};



exports.destroyingNewTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    test.equal(repo.statuses['"simple test"'].editStatus, "CREATED");
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(repo.statuses['"simple test"'].editStatus, "DELETED");
    test.done();
};


exports.destroyingExistingTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    repo.statuses['"simple test"'].editStatus = "CLEAN";
    repo.statuses['"simple test"'].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(repo.statuses['"simple test"'].editStatus, "DELETED");
    test.equal(repo.statuses['"simple test"'].stuff.value.dbId, 'Some UUID');
    test.done();
};



exports.selectingThenDestroyingNewTestSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent('define "simple test" as test method doing:\n\ta = 2\nand verifying:\n\ta = 2', "E", listener);
    var delta = repo.handleDestroyed({type: "test", name: '"simple test"'});
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(repo.statuses['"simple test"'].editStatus, "DELETED");
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
    test.equal(delta.removed.tests[0], '"simple test"');
    test.equal(repo.statuses['"simple test"'].editStatus, "DELETED");
    test.equal(repo.statuses['"simple test"'].stuff.value.dbId, 'Some UUID');
    test.done();
};




exports.creatingMethodSetsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/"].editStatus, "CREATED");
    test.done();
};


exports.updatingNewMethodKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method doing:\n\ta = 3\n", "E", listener);
    test.equal(delta, null);
    test.equal(repo.statuses["main/"].editStatus, "CREATED");
    test.equal(clearws(repo.statuses["main/"].stuff.value.body), clearws("define main as method doing:\n\ta = 3\n"));
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
    test.equal(delta, null);
    test.equal(repo.statuses["main/"].editStatus, "DIRTY");
    test.equal(repo.statuses["main/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/"].stuff.value.body), clearws("define main as method doing:\n\ta = 3\n"));
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
    test.equal(delta, null);
    test.equal(repo.statuses["main/"].editStatus, "CREATED");
    test.equal(clearws(repo.statuses["main/"].stuff.value.body), clearws("define main as method doing:\n\ta = 3\n"));
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
    test.equal(delta, null);
    test.equal(repo.statuses["main/"].editStatus, "DIRTY");
    test.equal(repo.statuses["main/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/"].stuff.value.body), clearws("define main as method doing:\n\ta = 3\n"));
    test.done();
};




exports.renamingNewMethodWith1ProtoKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define renamed as method doing:\n\ta = 2\n", "E", listener);
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "DIRTY");
    test.equal(repo.statuses["renamed/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["renamed/"].stuff.value.body), clearws("define renamed as method doing:\n\ta = 2\n"));
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "DIRTY");
    test.equal(repo.statuses["renamed/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["renamed/"].stuff.value.body), clearws("define renamed as method doing:\n\ta = 2\n"));
    test.done();
};

exports.updatingProtoOfNewMethodWith1ProtoKeepsStatusToCREATED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    var delta = repo.handleEditContent("define main as method receiving Text value doing:\n\ta = 2\n", "E", listener);
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Text");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Text");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "DIRTY");
    test.equal(repo.statuses["main/Text"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/Text"].stuff.value.body), clearws("define main as method receiving Text value doing:\n\ta = 2\n"));
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Text");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Text");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "DIRTY");
    test.equal(repo.statuses["main/Text"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/Text"].stuff.value.body), clearws("define main as method receiving Text value doing:\n\ta = 2\n"));
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(delta.added.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(delta.added.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "DIRTY");
    test.equal(repo.statuses["renamed/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["renamed/"].stuff.value.body), clearws("define renamed as method doing:\n\ta = 2\n"));
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(delta.added.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "renamed");
    test.equal(delta.added.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["renamed/"].editStatus, "DIRTY");
    test.equal(repo.statuses["renamed/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["renamed/"].stuff.value.body), clearws("define renamed as method doing:\n\ta = 2\n"));
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Integer");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/Integer"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Integer");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/Integer"].editStatus, "DIRTY");
    test.equal(repo.statuses["main/Integer"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/Integer"].stuff.value.body), clearws("define main as method receiving Integer value doing:\n\ta = 2"));
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Integer");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/Integer"].editStatus, "CREATED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(delta.added.methods[0].name, "main");
    test.equal(delta.added.methods[0].protos[0].proto, "Integer");
    test.equal(repo.statuses["main/"], undefined);
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/Integer"].editStatus, "DIRTY");
    test.equal(repo.statuses["main/Integer"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/Integer"].stuff.value.body), clearws("define main as method receiving Integer value doing:\n\ta = 2\n"));
    test.done();
};


exports.destroyingNewMethodWith1ProtoSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.equal(repo.statuses["main/"].editStatus, "CREATED");
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/"].editStatus, "DELETED");
    test.done();
};


exports.destroyingExistingMethodWith1ProtoPreservesDbIdAndSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    repo.statuses["main/"].editStatus = "CLEAN";
    repo.statuses["main/"].stuff.value.dbId = "Some UUID";
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/"].editStatus, "DELETED");
    test.equal(repo.statuses["main/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/"].stuff.value.body), clearws("define main as method doing:\n\ta = 2\n"));
    test.done();
};


exports.selectingThenDestroyingNewMethodWith1ProtoSetsStatusToDELETED = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = 2\n", "E", listener);
    listener = new prompto.problem.ProblemCollector();
    repo.handleSetContent("define main as method doing:\n\ta = 2\n", "E", listener);
    test.equal(repo.statuses["main/"].editStatus, "CREATED");
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/"].editStatus, "DELETED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/"].editStatus, "DELETED");
    test.equal(repo.statuses["main/"].stuff.value.dbId, "Some UUID");
    test.equal(clearws(repo.statuses["main/"].stuff.value.body), clearws("define main as method doing:\n\ta = 2\n"));
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
    test.equal(repo.statuses["main/"].editStatus, "CREATED");
    var delta = repo.handleDestroyed({subType: "method", name: "main", proto: ""});
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/"].editStatus, "DELETED");
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
    test.equal(delta.removed.methods[0].name, "main");
    test.equal(delta.removed.methods[0].protos[0].proto, "");
    test.equal(repo.statuses["main/Text"].editStatus, "CREATED");
    test.equal(repo.statuses["main/"].editStatus, "DELETED");
    test.equal(repo.statuses["main/"].stuff.value.dbId, "Some UUID");
    test.done();
};


var widgetBody = '@PageWidgetOf("accounts/index.page")' +
'widget IndexPage extends ReactWidget {' +
'' +
'    Document method getInitialState () {' +
'        return { view:"Accounts"};' +
'    }' +
'' +
'    Html method render () {' +
'        state = getState();' +
'        return <div>' +
'        <AccountsNavbar/>' +
'        <AccountsTable visible={state.view == "Accounts"} />' +
'        <UsersTable visible={state.view == "Users"} />' +
'        <OrganizationsTable visible={state.view == "Organizations"} />' +
'        </div>;' +
'    }' +
'' +
'}';

exports.storedBodyIsComplete = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent(widgetBody, "O", listener);
    test.equal(repo.statuses["IndexPage"].editStatus, "CREATED");
    test.equal(clearws(repo.statuses["IndexPage"].stuff.value.body), clearws(widgetBody));
    test.done();
};


exports.checkFailureDoesNotPreventRegistering = function (test) {
    var repo = new Repository();
    var listener = new prompto.problem.ProblemCollector();
    repo.handleEditContent("define main as method doing:\n\ta = stuff for each stuff in stuffs\n", "E", listener);
    repo.statuses["main/"].editStatus = "DIRTY";
    test.done();
};
