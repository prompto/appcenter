

function selectContentInProjectTree(content) {
    const id = makeTreeId(content);
    const leaf = $("#" + id);
    leaf.parentsUntil("#project-tree").show(50);
    leaf.trigger("click");
}


class NewTextResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        let cleanName = getParam("name").replace(/ /g, "_");
        this.state = {folder: cleanName, name: '', extension: this.props.type.toLowerCase().replace(" ", "-")};
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
                                    <label className="control-label" htmlFor="folderInput">Enter the unique path for this resource:</label>
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
        let cleanName = getParam("name").replace(/ /g, "_");
        this.state = {folder: cleanName, file: null};
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
                            <label className="control-label" htmlFor="folderInput">Enter the unique path for this resource:</label>
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



function run() {
    const msg = getRunnableAlert(currentContent);
    if (msg)
        alert(msg);
    else if (currentContent.type === "Html")
        openWebPage(currentContent);
    else
        runPromptoCode();
}

function stopServer() {
    fetchModuleURL((url)=>{
        var fullUrl = url + "ws/control/exit";
        loadText(fullUrl);
    }, true); // optional  = true, don't launch server only to stop it
}

function resetServer() {
    fetchModuleURL((url)=>{
        var fullUrl = url + "ws/control/clear-context";
        loadText(fullUrl);
    });
}

function openWebPage(id) {
    const tab = window.open(window.location.href, '_blank', '');
    fetchModuleURL((url)=>{
        tab.location = url + id.name;
        tab.focus();
    });
}

function fetchModuleURL(success, optional) {
    const dbId = getParam("dbId");
    const params = [ {name:"dbId", value:dbId.toString()}, {name: "optional", type: "Boolean", value: optional || false}];
    const url = '/ws/run/getModulePort?params=' + JSON.stringify(params);
    loadJSON(url, function(response) {
        if (response.error)
            ; // TODO something
        else if(response.data == -1)
            alert("Module not running!");
        else {
            const href = self.location.protocol +
                "//" + self.location.hostname +
                ":" + response.data + "/";
            success(href);
        }
    });
}


function runPromptoCode() {
    switchUIToRunMode();
    print("Running " + currentContent.name + "...");
    const runMode = getRunMode();
    const window = getEditorWindow();
    window.runMethod(currentContent, runMode);
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
    else if(id.type=="Html" && project.type==="WebSite")
        return null;
    else
        return "Can only run tests methods, main methods or web pages!";
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