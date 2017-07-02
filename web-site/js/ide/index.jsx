const catalog = new Catalog();
let currentContent = null;

function getParam(name) {
    // return new URL(window.location.href).searchParams.get(name);
    return new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)[1];
}


function makeTreeId(content) {
    return content.type==="Prompto" ?
        content.subType + "_" + makeValidId(content.name) :
        content.value.mimeType.replace("/", "_") + "_" + makeValidId(content.value.name);
}

function saveBlob() {
    const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob,'test.txt');
}

function getEditorWindow() {
    const frame = document.getElementById("editor");
    return frame.contentWindow;
}

function editorReady() {
    setEditorDefaults();
    loadProject(true);
}

function setEditorDefaults() {
    const window = getEditorWindow();
    window.setDialect("E");
}

function loadProject(loadDependencies) {
    const dbId = getParam("dbId");
    loadCodeInWorker(dbId, loadDependencies);
    loadResources(dbId);
}

function loadResources(dbId) {
    const params = [ {name:"dbId", value:dbId} ];
    const url = '/ws/run/getModuleResources?params=' + JSON.stringify(params);
    loadJSON(url, function(response) {
        if (response.error)
            alert(response.error);
        else {
            const resources = response.data.value;
            const delta = { added: { resources: resources}};
            catalogUpdated(delta, () => {});
        }
    });
}

function loadJSON(url, success) {
    loadText(url, function (text) {
        const json = JSON.parse(text);
        success(json);
    });
}

function loadText(url, success) {
    const xhr = new XMLHttpRequest();
    xhr.onerror = function(e) {
        self.console.log("Error " + e.target.status + " occurred while receiving the document.");
        return null;
    };
    xhr.onload = function(e) {
        success(xhr.responseText);
    };
    xhr.open('GET', url);
    //noinspection EqualityComparisonWithCoercionJS
    if(url[0]!="/" && url[0]!=".")
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(null);
}

function loadCodeInWorker(dbId, loadDependencies) {
    const window = getEditorWindow();
    window.setProject(dbId, loadDependencies);
}

class GroupTree extends React.Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
        this.itemClicked = this.itemClicked.bind(this);
    }

    render() {
        let items = this.props.items;
        if(!this.props.showLibraries)
            items = items.filter(item => !item.core);
        return <li className="list-group-item"><label className="nav-header" onClick={this.toggleTreeNode}>{this.props.title}</label>
            <ul id={this.props.type + "s"} className="list-group collapse">
                {
                    items.map(item => { return this.renderItem(item); }, this)
                }
            </ul>
        </li>
    }


    renderItem(item) {
        const key = this.props.type + "_" + makeValidId(item.name);
        const className = 'list-group-item' + (item.core ? ' core' : '');
        return <li id={key} key={key} className={className} onClick={this.itemClicked}>
            <a is core={item.core}>{item.name}</a>
            {item.core && <span className='glyphicon glyphicon-cog'/>}
        </li>;
    }

    toggleTreeNode(e) {
        $(e.target).parent().children('ul').toggle(300);
    }

    itemClicked(e) {
        e.stopPropagation();
        const a = $(e.target);
        let content = { type: "Prompto", subType: this.props.type, name: a.text() };
        content.core = a.attr("core") ? eval(a.attr("core")) : false;
        setEditorContent(content);
    }
}

class MethodTree extends GroupTree {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderProto = this.renderProto.bind(this);
    }

    renderItem(method) {
        const key = this.props.type + "_" + makeValidId(method.name);
        const className = 'list-group-item' + (method.core ? ' core' : '');
        if(method.protos.length>1) {
            return <li id={key} key={key} className={className} onClick={this.toggleTreeNode}>
                <label className='nav-header'>{method.name}</label>
                <ul className='list-group method' key={key}>
                    {
                        method.protos.map(proto => {
                            return this.renderProto(method, proto);
                        }, this)
                    }
                </ul></li>;
        } else {
            const proto = method.protos[0];
            return <li id={key} key={key} className={className}>
                <a is name={method.name} proto={proto.proto} core={method.core} main={proto.main} onClick={this.itemClicked}>{method.name}</a>
                {method.core && <span className='glyphicon glyphicon-cog'/>}
                </li>;
        }
    }

    renderProto(method, proto) {
        const key = this.props.type + "_" + makeValidId(proto.proto);
        const className = 'list-group-item' + (method.core ? ' core' : '');
        return <li id={key} key={key} className={className}>
                <a is name={method.name} proto={proto.proto} core={method.core} main={proto.main} onClick={this.itemClicked}>{proto.proto}</a>
                { method.core && <span className='glyphicon glyphicon-cog'/> }
                </li>;
    }

    itemClicked(e) {
       e.stopPropagation();
        const a = $(e.target);
        const name = a.attr("name");
        const proto = a.attr("proto");
        const core = a.attr("core") ? eval(a.attr("core")) : false;
        const main = a.attr("main") ? eval(a.attr("main")) : false;
        const content = { type: "Prompto", subType: this.props.type, name: name, proto: proto, core: core, main: main };
        setEditorContent(content);
    }

}

class TextResourceTree extends GroupTree {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.itemClicked = this.itemClicked.bind(this);
    }

    renderItem(item) {
        const key = item.value.mimeType.replace("/", "_") + "_" + makeValidId(item.value.name);
        return <li id={key} key={key} className='list-group-item' onClick={this.itemClicked}>
            <a>{item.value.name}</a>
        </li>;
    }

    itemClicked(e) {
        e.stopPropagation();
        const a = $(e.target);
        let content = { type: this.props.type, name: a.text() };
        content.body = catalog.getResourceBody(content);
        setEditorContent(content);
    }
}



class BinaryResourceTree extends GroupTree {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.itemClicked = this.itemClicked.bind(this);
    }

    renderItem(item) {
        const key = item.value.mimeType.replace("/", "_") + "_" + makeValidId(item.value.name);
        return <li id={key} key={key} className='list-group-item' onClick={this.itemClicked}>
            <a>{item.value.name}</a>
        </li>;
    }

    itemClicked(e) {
        e.stopPropagation();
        const a = $(e.target);
        let content = { type: this.props.type, name: a.text() };
        let resource = catalog.resourceFromContent(content);
        content.file = resource.value.file;
        setEditorContent(content);
    }
}

class ProjectTree extends React.Component {

    render() {
        const catalog = this.props.catalog;
        return <ul className="list-group">
                <li id="code-items" className="list-group">
                    <label className='nav-header' onClick={this.toggleTreeNode}>Code</label>
                    <div>
                        <div className="checkbox">
                            <label><input id="show-libs" type="checkbox" checked={catalog.showLibraries} onChange={this.toggleShowLibraries} /> Show libraries</label>
                        </div>
                        <ul className="list-group">
                            <GroupTree title="Attributes" items={catalog.attributes} type="attribute" showLibraries={catalog.showLibraries}/>
                            <MethodTree title="Methods" items={catalog.methods} type="method" showLibraries={catalog.showLibraries}/>
                            <GroupTree title="Categories" items={catalog.categories} type="category" showLibraries={catalog.showLibraries}/>
                            <GroupTree title="Enumerations" items={catalog.enumerations} type="enumeration" showLibraries={catalog.showLibraries}/>
                            <GroupTree title="Tests" items={catalog.tests} type="test" showLibraries={catalog.showLibraries}/>
                        </ul>
                    </div>
                </li>
            <li id="resource-items" className="list-group">
                <label className='nav-header' onClick={this.toggleTreeNode}>Resources</label>
                <div>
                    <ul className="list-group">
                        <TextResourceTree title="Html" items={catalog.resources.html} type="Html" showLibraries="true"/>
                        <TextResourceTree title="Javascript" items={catalog.resources.js} type="Js" showLibraries="true"/>
                        <TextResourceTree title="Jsx" items={catalog.resources.jsx} type="Jsx" showLibraries="true"/>
                        <TextResourceTree title="Css" items={catalog.resources.css} type="Css" showLibraries="true"/>
                        <TextResourceTree title="Json" items={catalog.resources.json} type="Json" showLibraries="true"/>
                        <TextResourceTree title="Xml" items={catalog.resources.xml} type="Xml" showLibraries="true"/>
                        <TextResourceTree title="Yaml" items={catalog.resources.yaml} type="Yaml" showLibraries="true"/>
                        <TextResourceTree title="Text" items={catalog.resources.text} type="Txt" showLibraries="true"/>
                        <BinaryResourceTree title="Image" items={catalog.resources.image} type="Image" showLibraries="true"/>
                        <BinaryResourceTree title="Audio" items={catalog.resources.audio} type="Audio" showLibraries="true"/>
                        <BinaryResourceTree title="Video" items={catalog.resources.video} type="Video" showLibraries="true"/>
                        <BinaryResourceTree title="Other" items={[]} type="Binary" showLibraries="true"/>
                    </ul>
                </div>
            </li>
        </ul>;
    }

    toggleShowLibraries(e) {
        showLibraries(e.target.checked);
    }

    toggleTreeNode(e) {
        $(e.target).parent().children('div').toggle(300);
    }



}

function showLibraries(show) {
    catalog.showLibraries = show;
    ReactDOM.render(<ProjectTree catalog={catalog}/>, document.getElementById('project-tree'));
}

function catalogUpdated(delta, callback) {
    catalog.applyDelta(delta);
    ReactDOM.render(<ProjectTree catalog={catalog}/>, document.getElementById('project-tree'), callback);
}

function installDialectDropdownHandler() {
    $('#nav-dialect').click(function (e) {
        if(e.target.id.indexOf('dialect-')===0) {
            $('li').removeClass('active');
            $(e.target).parent().addClass('active');
            const dialect = e.target.id.substring('dialect-'.length, 'dialect-'.length + 1);
            const window = getEditorWindow();
            window.setDialect(dialect);
        }
    });
}

function installNewDropdownHandler() {
    $('#nav-new').click(function (e) {
        if(e.target.id.indexOf('new-')===0) {
            const label = $(e.target).text();
            const type = e.target.id.substring('new-'.length);
            if(type==='Prompto')
                setEditorContent({ type: "Prompto" });
            else if(type==='Image' || type==='Audio' || type==='Video' || type==='Other')
                newFileResource(type, label);
            else
                newTextResource(type, label);
        }
    });
}

function renderNavbar() {
    const projectName = getParam("name");
    ReactDOM.render(<a className="navbar-brand">Prompto Code Editor for: <b>{projectName}</b></a>, document.getElementById('project-name'));
}

$(document).ready(function () {
    renderNavbar();
    installDialectDropdownHandler();
    installNewDropdownHandler();
});

function selectContentInProjectTree(content) {
    const id = makeTreeId(content);
    const leaf = $("#" + id);
    leaf.parentsUntil("#project-tree").show(50);
    leaf.trigger("click");
}


function isTextResourceContent() {
    return currentContent &&
        currentContent.type !== "Prompto" &&
        currentContent.type !== "Image" &&
        currentContent.type !== "Audio" &&
        currentContent.type !== "Video" &&
        currentContent.type !== "Other";
}

function setEditorContent(content) {
    if(content && content===currentContent)
        return;
    const window = getEditorWindow();
    if(isTextResourceContent()) {
        currentContent.body = window.getResourceBody();
        catalog.setResourceBody(currentContent);
    }
    currentContent = content;
    window.setContent(content);
}


class NewTextResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {folder: getParam("name"), name: '', extension: this.props.type.toLowerCase().replace(" ", "-")};
        this.handleFolder = this.handleFolder.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleExtension = this.handleExtension.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const placeholder = this.props.label;
        return <div className="modal-dialog" style={{width:680}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title">New {this.props.label}</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" role="form">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="resourcePath">Enter the unique path for this resource:</label>
                                    <div className="input-group input-group-lg">
                                        <input type="text" className="form-control input-lg" id="folderInput" value={this.state.folder} style={{width:245}} onChange={this.handleFolder}/>
                                        <span className="input-group-addon" id="basic-addon1">/</span>
                                        <input type="text" className="form-control input-lg" id="nameInput" placeholder={placeholder} style={{width:245}} onChange={this.handleName}/>
                                        <span className="input-group-addon" id="basic-addon2">.</span>
                                        <input type="text" className="form-control input-lg" id="extensionInput" value={this.state.extension} style={{width:80}} onChange={this.handleExtension}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>OK</button>
                        </div>

                    </div>
                </div>;
    }

    handleFolder(event) {
        this.state.folder = event.target.value;
    }

    handleName(event) {
        this.state.name = event.target.value;
    }

    handleExtension(event) {
        this.state.extension = event.target.value;
    }

    handleSubmit(event) {
        const path = this.state.folder + "/" + this.state.name + "." + this.state.extension;
        this.props.submit(this.props.type, path);
    }

}

function newTextResource(type, label) {
    ReactDOM.render(<NewTextResourceDialog type={type} label={label} submit={createTextResource}/>, document.getElementById('new-resource'));
    const dialog = $("#new-resource");
    dialog.on('shown.bs.modal', () => $("#nameInput").focus());
    dialog.modal();
}

function createTextResource(type, path) {
    const id = createTextResourceInCatalog(type, path, () => selectContentInProjectTree(id));
    $('#new-resource').modal('toggle');
}

function createTextResourceInCatalog(type, path, callback) {
    const methodName = "createResource" + type;
    if(!window[methodName])
        alert("No such method:" + methodName);
    const content = window[methodName](path);
    content.value.module =  { type: "Module", value: { dbId: getParam("dbId") } };
    const delta = { added: { resources: [content]}};
    catalogUpdated(delta, callback);
    return content;
}


function createResourceHtml(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/html",
            body: "<!DOCTYPE html>\n" +
                "<html>\n" +
                "\t<head>\n" +
                "\t</head>\n" +
                "\t<body>\n" +
                "\t\tHello!\n" +
                "\t</body>\n" +
                "</html>"
        }
    };
}

function createResourceJs(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/javascript",
            body: "function hello() {\n" +
                "\talert('Hello');\n" +
                "}"
        }
    };
}


function createResourceJsx(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/babel",
            body: "function hello() {\n" +
                "\talert('Hello');\n" +
                "}"
        }
    };
}


function createResourceCss(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/css",
            body: "body {\n" +
            "\tbackground-color: white;\n" +
            "}"
        }
    };
}


function createResourceJson(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/json",
            body: '{ "field": 123 }'
        }
    };
}


function createResourceXml(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/xml",
            body: '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<document>\n' +
            '\tdata\n' +
            '</document>\n'
        }
    };
}

function createResourceYaml(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/yaml",
            body: 'invoice: 34843\n' +
            'date   : 2001-01-23\n' +
            'bill-to: &id001\n' +
            '\tgiven  : Chris\n' +
            '\tfamily : Dumars\n' +
            '\taddress:\n' +
            '\t\tlines: |\n' +
            '\t\t\t458 Walkman Dr.\n' +
            '\t\t\tSuite #292\n' +
            '\t\tcity    : Royal Oak\n' +
            '\t\tstate   : MI\n' +
            '\t\tpostal  : 48046\n'
        }
    };
}


function createResourceTxt(path) {
    return {
        type: "TextResource",
        value: {
            name: path,
            mimeType: "text/plain",
            body: 'Hello there!'
        }
    };
}

const DroppedFileWidget = widgets.DroppedFileWidget.default;
const DroppedWidgetStyle = {
    display: 'inline-flex',
    border: '1px solid lightgray',
    height: '300px',
    width: '650px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center'
};

class NewFileResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {folder: getParam("name"), file: null};
        this.handleFolder = this.handleFolder.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    render() {
        return <div className="modal-dialog" style={{width:680}}>
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 className="modal-title">New {this.props.label}</h4>
                </div>
                <div className="modal-body">
                    <form className="form" role="form">
                        <div className="form-group">
                            <label className="control-label" htmlFor="resourcePath">Enter the unique path for this resource:</label>
                            <div className="input-group input-group-lg">
                                <input type="text" className="form-control input-lg" id="folderInput" value={this.state.folder} style={{width:245}} onChange={this.handleFolder}/>
                                <span className="input-group-addon" id="basic-addon1">/</span>
                                {this.state.name && <input type="text" className="form-control input-lg" id="nameInput" value={this.state.name} style={{width:365}} onChange={this.handleName}/>}
                                {!this.state.name && <input type="text" className="form-control input-lg" id="nameInput" placeholder={this.props.label} style={{width:365}} onChange={this.handleName}/>}
                            </div>
                        </div>
                    </form>
                    <DroppedFileWidget onDrop={this.handleDrop} style={DroppedWidgetStyle}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>OK</button>
                </div>

            </div>
        </div>;
    }

    handleDrop(file) {
        this.setState({ file: file, name: file.name });
    }

    handleFolder(event) {
        this.setState({ folder: event.target.value });
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        const path = this.state.folder + "/" + this.state.name;
        this.props.submit(this.props.type, path, this.state.file);
    }

}

function newFileResource(type, label) {
    ReactDOM.render(<NewFileResourceDialog type={type} label={label} submit={createFileResource}/>, document.getElementById('new-resource'));
    const dialog = $("#new-resource");
    dialog.on('shown.bs.modal', () => $("#nameInput").focus());
    dialog.modal();
}


function createFileResource(type, path, file) {
    const id = createFileResourceInCatalog(type, path, file, () => selectContentInProjectTree(id));
    $('#new-resource').modal('toggle');
}

function createFileResourceInCatalog(type, path, file, callback) {
    const content = {
        type: "BinaryResource",
        value: {
        name: path,
            mimeType: file.type,
            file: file
        }
    };
    content.value.module =  { type: "Module", value: { dbId: getParam("dbId") } };
    const delta = { added: { resources: [content]}};
    catalogUpdated(delta, callback);
    return content;
}


class ImageDisplayer extends React.Component {

    constructor(props) {
        super(props);
        this.loadPreview = this.loadPreview.bind(this);
        this.state = { preview: null, file: null };
        this.loadPreview(this.props.file);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.file === nextProps.file) {
            return this.state.preview !== nextState.preview;
        } else {
            this.setState({ preview: null, file: null });
            this.loadPreview(nextProps.file);
            return true;
        }
    }

    loadPreview(file) {
        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ preview: e.target.result, file: file });
            };
            reader.readAsDataURL(file);
        }

    }

    render() {
        const state = this.state.preview ? "PREVIEW" : "LOADING";
        return <div>
                { state==="PREVIEW" && <img src={this.state.preview} style={{ maxWidth: "98%", maxHeight: "98%", width: "auto", height: "auto" }}/> }
                { state==="LOADING" && 'Loading...' }
                </div>
    }
}


function setContentImage(element, content) {
    ReactDOM.render(<ImageDisplayer file={content.file}/>, element);
}

function destroy() {
    if(currentContent===null)
        window.alert("Nothing to destroy!");
    else {
        const id = currentContent;
        currentContent = null;
        const window = getEditorWindow();
        window.destroy(id);
    }
}

function revert() {
    // TODO confirm
    setEditorContent({ type: "Prompto" });
    loadProject(false);
}

function commit() {
    // TODO confirm
    setEditorContent({ type: "Prompto" });
    const window = getEditorWindow();
    window.prepareCommit();
}

function commitPrepared(declarations) {
    var resources = catalog.prepareCommit();
    var stuff = (declarations || []).concat(resources || []);
    if(stuff.length > 0) {
        var params = [{name: "edited", type: "EditedStuff[]", value: stuff}];
        var form = new FormData();
        form.append("params", JSON.stringify(params));
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('load', function(success) { commitSuccessful(success); });
        xhr.addEventListener('error', function(failure) { commitFailed(failure); });
        xhr.open('POST', '/ws/run/storeEdited', true);
        xhr.send(form);
    }
}


function commitFailed(failure) {
    alert("Commit failed!"); // TODO send to UI
}

function commitSuccessful(success) {
    alert("Commit ok!");
    const window = getEditorWindow();
    window.commitSuccessful();
}

function setRunMode(label) {
    $("#run-mode").html(" " + label + " " + "<span class='caret'/>");
}


function getRunMode() {
    const text = $("#run-mode").text();
    const mode = text.indexOf("compiled")>=0 ? "EXECUTE/" : "INTERPRET/";
    return mode + (text.indexOf("Server")>=0 ? "REMOTE" : "LOCAL");
}

function run() {
    const msg = getRunnableAlert(currentContent);
    if(msg)
        alert(msg);
    else {
        switchUIToRunMode();
        print("Running " + currentContent.name + "...");
        const runMode = getRunMode();
        const window = getEditorWindow();
        window.runMethod(currentContent, runMode);
    }
}

function done(data) {
    const button = document.getElementById("run-button");
    button.innerHTML = "Done";
}

function getRunnableAlert(id) {
    if (!id)
        return "Nothing to run!";
    else if(id.subType==="test")
        return null;
    else if(id.subType==="method" && id.main)
        return null;
    else
        return "Can only run tests or main methods!";
}

function stop() {
    edit();
}

function edit() {
    switchUIToEditMode();
}

function switchUIToRunMode() {
    const doc = document.getElementById("output");
    doc.innerHTML = "";
    $(".edit-mode").hide();
    $(".run-mode").show();
    const button = document.getElementById("run-button");
    button.onclick = function() { stop(); };
    button.innerHTML = "Stop";
}

function switchUIToEditMode() {
    $(".run-mode").hide();
    $(".edit-mode").show();
    const button = document.getElementById("run-button");
    button.onclick = function() { run(); };
    button.innerHTML = "Run";
}

function print(msg) {
    const doc = document.getElementById("output");
    doc.innerHTML += msg + "<br/>";
}

// a utility method to inspect worker data in Firefox/Safari
function inspect(name) {
    const window = getEditorWindow();
    window.inspect(name);
}

// a utility method to inspect worker data in Firefox/Safari
function inspected(data) {
    console.log(data);
}