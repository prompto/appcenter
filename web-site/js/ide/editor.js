console.log = parent.print;
var promptoEditor = null;
var resourceEditor = null;
var modeId = null;

function setDialect(dialect) {
    var mode = promptoEditor.getSession().getMode();
    mode.setDialect(dialect);
}

function setProject(dbId, loadDependencies) {
    var mode = promptoEditor.getSession().getMode();
    mode.setProject(dbId, loadDependencies);
}

function setContent(content) {
    setMode(content.type, (editor) => {
        var methodName = "setContent" + content.type;
        window[methodName](editor, content);
    })
}

function setContentPrompto(editor, content) {
    var session = editor.getSession();
    var mode = session.getMode();
    mode.setContent(content);
    var ro = content ? content.core : false;
    editor.setReadOnly(ro);
    session.setScrollTop(0);
}

function setContentHtml(editor, content) {
    editor.setValue(content.body);
    editor.setReadOnly(false);
    editor.getSession().setScrollTop(0);
}


function destroy(content) {
    var methodName = "destroy" + content.type;
    window[methodName](content);
}

function destroyPrompto(content) {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.destroy(content);
    session.setScrollTop(0);
}

function commit() {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.commit();
}

function runMethod(id, runMode) {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.runMethod(id, runMode);
}

// a utility method to inspect worker data in Firefox/Safari
function inspect(name) {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.inspect(name);
}

function done(data) {
    parent.done(data);
}

function setMode(mode, callback) {
    if (mode === modeId) {
        var editor = mode === "Prompto" ? promptoEditor : resourceEditor;
        callback(editor);
        return;
    }
    $("#prompto-container").hide();
    $("#resource-container").hide();
    modeId = null; // so we know mode is stale
    var methodName = "setMode" + mode;
    if (!window[methodName])
        throw methodName;
    window[methodName](editor => {
        modeId = mode;
        editor.setValue("", -1);
        callback(editor);
    });
}

function setModeHtml(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/html", () => {
        callback(resourceEditor);
    });
}

function setModePrompto(callback) {
    $("#prompto-container").show();
    callback(promptoEditor);
}

function initPromptoEditor(callback) {
    var editor = ace.edit("prompto-editor");
    editor.$blockScrolling = Infinity;
    editor.setTheme("ace/theme/eclipse");
    editor.getSession().$editor = editor;
    editor.getSession().setMode("ace/mode/prompto", () => {
        editor.getSession().getMode().setDialect("E"); // start with something
        editor.getSession().setUseWorker(true);
        callback(editor);
    });

}

function initResourceEditor(callback) {
    var editor = ace.edit("resource-editor");
    editor.$blockScrolling = Infinity;
    editor.setTheme("ace/theme/eclipse");
    editor.getSession().setMode("ace/mode/text", () => {
        callback(editor);
    });
}

$(document).ready(function () {
    initResourceEditor(editor => {
        resourceEditor = editor;
    });
    initPromptoEditor(editor => {
        promptoEditor = editor;
        parent.editorReady();
    });
});

