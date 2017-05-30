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

function editorReady() {
    const frame = document.getElementById("editor");
    frame.contentWindow.setDialect("E");
    frame.contentWindow.setProject(getParam("dbId"), true);
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

class ResourceTree extends GroupTree {

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
                        <ResourceTree title="Web pages" items={catalog.resources.html} type="Html" showLibraries="true"/>
                        <ResourceTree title="Javascripts" items={catalog.resources.js} type="Js" showLibraries="true"/>
                        <ResourceTree title="Jsx" items={catalog.resources.jsx} type="Jsx" showLibraries="true"/>
                        <ResourceTree title="Stylesheets" items={catalog.resources.css} type="Css" showLibraries="true"/>
                        <ResourceTree title="Json" items={catalog.resources.json} type="Json" showLibraries="true"/>
                        <ResourceTree title="Xml" items={catalog.resources.xml} type="Xml" showLibraries="true"/>
                        <ResourceTree title="Text" items={catalog.resources.text} type="Txt" showLibraries="true"/>
                        <ResourceTree title="Medias" items={[]} type="media" showLibraries="true"/>
                        <ResourceTree title="Other" items={[]} type="bin" showLibraries="true"/>
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
            const frame = document.getElementById("editor");
            frame.contentWindow.setDialect(dialect);
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
            else if(type==='Media' || type==='Other')
                newFileResource(type);
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

function setEditorContent(content) {
    if(content && content===currentContent)
        return;
    const frame = document.getElementById("editor");
    if(currentContent && currentContent.type !== "Prompto") {
        currentContent.body = frame.contentWindow.getResourceBody();
        catalog.setResourceBody(currentContent);
    }
    currentContent = content;
    frame.contentWindow.setContent(content);
}


class NewTextResource extends React.Component {

    constructor(props) {
        super(props);
        this.state = {path: ''};
        this.handlePath = this.handlePath.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const projectName = getParam("name");
        const placeholder = projectName + "/" + this.props.label + "." + this.props.type.toLowerCase().replace(" ", "-");
        return <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title">New {this.props.label}</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form" role="form" >
                                <div className="form-group">
                                    <label className="control-label" htmlFor="resourcePath">Enter the unique path for this resource:</label>
                                    <div className="input-group input-group-lg">
                                        <input type="text" className="form-control input-lg" id="resourcePath" placeholder={placeholder} style={{width:530}} onChange={this.handlePath}/>
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

    handlePath(event) {
        this.setState({path: event.target.value});
    }

    handleSubmit(event) {
        this.props.submit(this.props.type, this.state.path);
    }

}

function newTextResource(type, label) {
    ReactDOM.render(<NewTextResource type={type} label={label} submit={createResource}/>, document.getElementById('new-resource'));
    $("#new-resource").modal();
}

function createResource(type, path) {
    const id = createResourceInCatalog(type, path, () => selectContentInProjectTree(id));
    $('#new-resource').modal('toggle');
}

function createResourceInCatalog(type, path, callback) {
    const methodName = "createResource" + type;
    if(!window[methodName])
        alert("No such method:" + methodName);
    const content = window[methodName](path);
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


function destroy() {
    if(currentContent===null)
        window.alert("Nothing to destroy!");
    else {
        const id = currentContent;
        currentContent = null;
        const frame = document.getElementById("editor");
        frame.contentWindow.destroy(id);
    }
}

function revert() {
    // TODO confirm
    setEditorContent({ type: "Prompto" });
    const frame = document.getElementById("editor");
    frame.contentWindow.setProject(getParam("dbId"), false); // TODO move to codebase.js
}

function commit() {
    // TODO confirm
    setEditorContent({ type: "Prompto" });
    const frame = document.getElementById("editor");
    frame.contentWindow.prepareCommit();
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
    const frame = document.getElementById("editor");
    frame.contentWindow.commitSuccessful();
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
        const name = currentContent.test || currentContent.method;
        print("Running " + name + "...");
        const runMode = getRunMode();
        const frame = document.getElementById("editor");
        frame.contentWindow.runMethod(currentContent, runMode);
    }
}

function done(data) {
    const button = document.getElementById("run-button");
    button.innerHTML = "Done";
}

function getRunnableAlert(id) {
    if (!id)
        return "Nothing to run!";
    else if(!id.test && !id.main)
        return "Can only run tests or main methods!";
    else
        return null;
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
    const frame = document.getElementById("editor");
    frame.contentWindow.inspect(name);
}

// a utility method to inspect worker data in Firefox/Safari
function inspected(data) {
    console.log(data);
}