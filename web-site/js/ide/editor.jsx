function getParam(name) {
        // return new URL(window.location.href).searchParams.get(name);
        return new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)[1];
    }

function makeId(name) {
    return name.replace(/[ ]/g, "_").replace(/[\"\'\(\),]/g,"");
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
        return <li className="list-group-item"><label className="tree-toggler nav-header" onClick={this.toggleTreeNode}>{this.props.title}</label>
            <ul id={this.props.type + "s"} className="list-group collapse">
                {
                    items.map(item => { return this.renderItem(item); }, this)
                }
            </ul>
        </li>
    }


    renderItem(item) {
        const key = this.props.type + "_" + makeId(item.name);
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
        let content = {};
        content[this.props.type] = a.text();
        content.core = a.attr("core") ? eval(a.attr("core")) : false;
        setContent(content);
    }
}

class MethodTree extends GroupTree {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.renderProto = this.renderProto.bind(this);
    }

    renderItem(method) {
        const key = this.props.type + "_" + makeId(method.name);
        const className = 'list-group-item' + (method.core ? ' core' : '');
        if(method.protos.length>1) {
            return <li id={key} key={key} className={className} onClick={this.toggleTreeNode}>
                <label className='tree-toggler nav-header'>{method.name}</label>
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
        const key = this.props.type + "_" + makeId(proto.proto);
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
        setContent({ method : name, proto : proto, core: core, main: main });
    }

}

class ProjectTree extends React.Component {

    render() {
        const catalog = this.props.catalog;
        return <div>
                    <div className="checkbox">
                        <label><input id="show-libs" type="checkbox" checked={catalog.showLibraries} onChange={this.onShowLibraries} /> Show libraries</label>
                    </div>
                    <ul className="list-group">
                        <GroupTree title="Attributes" items={catalog.attributes} type="attribute" showLibraries={catalog.showLibraries}/>
                        <MethodTree title="Methods" items={catalog.methods} type="method" showLibraries={catalog.showLibraries}/>
                        <GroupTree title="Categories" items={catalog.categories} type="category" showLibraries={catalog.showLibraries}/>
                        <GroupTree title="Enumerations" items={catalog.enumerations} type="enumeration" showLibraries={catalog.showLibraries}/>
                        <GroupTree title="Tests" items={catalog.tests} type="test" showLibraries={catalog.showLibraries}/>
                    </ul>
        </div>;
    }

    onShowLibraries(e) {
        showLibraries(e.target.checked);
    }

}

const catalog = new Catalog();

function showLibraries(show) {
    catalog.showLibraries = show;
    ReactDOM.render(<ProjectTree catalog={catalog}/>, document.getElementById('project-tree'));
}

function catalogUpdated(delta) {
    catalog.applyDelta(delta);
    ReactDOM.render(<ProjectTree catalog={catalog}/>, document.getElementById('project-tree'));
}


$(document).ready(function () {
    $('#nav-dialect').click(function (e) {
        if(e.target.id.indexOf('dialect-')===0) {
            $('li').removeClass('active');
            $(e.target).parent().addClass('active');
            const dialect = e.target.id.substring('dialect-'.length, 'dialect-'.length + 1);
            const frame = document.getElementById("editor");
            frame.contentWindow.setDialect(dialect);
        }
    });
    const projectName = getParam("name");
    ReactDOM.render(<a className="navbar-brand">Prompto Code Editor for: <b>{projectName}</b></a>, document.getElementById('project-name'));
});

let contentId = null;

function setContent(id) {
    if(id && id===contentId)
        return;
    contentId = id;
    const frame = document.getElementById("editor");
    frame.contentWindow.setContent(id);
}

function destroy() {
    if(contentId===null)
        window.alert("Nothing to destroy!");
    else {
        const id = contentId;
        contentId = null;
        const frame = document.getElementById("editor");
        frame.contentWindow.destroy(id);
    }
}

function revert() {
    // TODO confirm
    setContent(null);
    const frame = document.getElementById("editor");
    frame.contentWindow.setProject(getParam("dbId"), false); // TODO move to codebase.js
}

function commit() {
    // TODO confirm
    setContent(null);
    const frame = document.getElementById("editor");
    frame.contentWindow.commit();
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
    const msg = getRunnableAlert(contentId);
    if(msg)
        alert(msg);
    else {
        switchUIToRunMode();
        const name = contentId.test || contentId.method;
        print("Running " + name + "...");
        const runMode = getRunMode();
        const frame = document.getElementById("editor");
        frame.contentWindow.runMethod(contentId, runMode);
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