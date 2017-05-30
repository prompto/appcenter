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
    setMode(content.type, editor => {
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

function setContentResource(editor, content) {
    editor.setValue(content.body, -1);
    editor.setReadOnly(false);
    editor.getSession().setScrollTop(0);
}

function setContentHtml(editor, content) {
    setContentResource(editor, content);
}

function setContentJs(editor, content) {
    setContentResource(editor, content);
}

function setContentJsx(editor, content) {
    setContentResource(editor, content);
}

function setContentCss(editor, content) {
    setContentResource(editor, content);
}

function setContentJson(editor, content) {
    setContentResource(editor, content);
}

function setContentXml(editor, content) {
    setContentResource(editor, content);
}

function setContentText(editor, content) {
    setContentResource(editor, content);
}

function getResourceBody() {
    return resourceEditor.getValue();
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

function prepareCommit() {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.prepareCommit();
}

function commitPrepared(declarations) {
    parent.commitPrepared(declarations);
}

function commitSuccessful() {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.commitSuccessful();
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

function setModePrompto(callback) {
    $("#prompto-container").show();
    callback(promptoEditor);
}

function setModeHtml(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/html", () => {
        callback(resourceEditor);
    });
}

function setModeJs(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/javascript", () => {
        callback(resourceEditor);
    });
}

function setModeJsx(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/jsx", () => {
        callback(resourceEditor);
    });
}

function setModeCss(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/css", () => {
        callback(resourceEditor);
    });
}

function setModeJson(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/json", () => {
        callback(resourceEditor);
    });
}

function setModeXml(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/xml", () => {
        callback(resourceEditor);
    });
}

function setModeTxt(callback) {
    $("#resource-container").show();
    resourceEditor.getSession().setMode("ace/mode/text", () => {
        callback(resourceEditor);
    });
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

