console.log = parent.print;
var promptoEditor = null;
var resourceEditor = null;
var resourceContent = null;
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
        if(content.type.toLowerCase()==="prompto")
            setContentPrompto(editor, content);
        else {
            var type = ID_TO_TYPE_MAP[content.type];
            if (type instanceof TextResourceType)
                setContentResource(editor, content);
        }
    });
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
    resourceContent.innerText = content.name;
}

function getResourceBody() {
    return resourceEditor.getValue();
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


function commitFailed() {
    var session = promptoEditor.getSession();
    var mode = session.getMode();
    mode.commitFailed();
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

function show(id) {
    document.getElementById(id).style.display = "block";    
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function setMode(mode, callback) {
    if (mode === modeId) {
        var editor = mode.toLowerCase() === "prompto" ? promptoEditor : resourceEditor;
        callback(editor);
        return;
    }
    hide("prompto-container");
    hide("resource-container");
    hide("file-container");
    modeId = null; // so we know mode is stale
    var method = null;
    if(mode.toLowerCase()==="prompto")
        method = setModePrompto;
    else {
        var type = ID_TO_TYPE_MAP[mode];
        if(type instanceof TextResourceType) {
            method = setModeResource;
        } else
            method = setModeFile;
    }
    method(mode, editor => {
        modeId = mode;
        if(editor)
            editor.setValue("", -1);
        callback(editor);
    });
}

function setModePrompto(mode, callback) {
    show("prompto-container");
    callback(promptoEditor);
}

function setModeResource(mode, callback) {
    show("resource-container");
    resourceEditor.getSession().setMode("ace/mode/" + mode, () => {
        callback(resourceEditor);
    });
}

function setModeFile(mode, callback) {
    show("file-container");
    callback(null);
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

function documentLoaded() {
    initResourceEditor(editor => {
        resourceEditor = editor;
        resourceContent = document.getElementById("resource-content");
    });
    initPromptoEditor(editor => {
        promptoEditor = editor;
        parent.editorMounted();
    });
}
