const { Overlay } = ReactBootstrap;

function getParam(name) {
    let value = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)[1];
    return decodeURIComponent(value);
}

function print(msg) {
    const doc = document.getElementById("output");
    doc.innerHTML += msg + "<br/>";
}

class MessageContent extends React.Component {

    render() {
        return <div id="message-content">{this.props.message}</div>;
    }

}


class MessageArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false, message: "<init>"};
        this.setMessage = this.setMessage.bind(this);
    }

    setMessage(message) {
        this.setState({show: true, message: message});
        setTimeout(()=>this.setState({show: false}), 2000);
    }

    render() {
        return <Overlay show={this.state.show}>
            <MessageContent message={this.state.message} />
        </Overlay>;
    }
}

class ContentNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.toggleShowLibraries = this.toggleShowLibraries.bind(this);
        this.state = {showLibraries: false}
    }

    render() {
        return <div id="sidebar">
                    <div className="checkbox">
                        <label><input type="checkbox" checked={this.state.showLibraries} onChange={this.toggleShowLibraries} />&nbsp;Show libraries</label>
                    </div>
                    <ProjectTree ref={ref=>this.projectTree=ref} catalog={this.props.catalog} showLibraries={this.state.showLibraries} root={this.props.root}/>
                </div>;
    }

    toggleShowLibraries(e) {
        this.setState({showLibraries: e.target.checked});
    }

}

class EditorFrame extends React.Component {

    render() {
        return <iframe id="editor" src="editor.html"></iframe>;
    }
}

class ImageDisplayer extends React.Component {

    constructor(props) {
        super(props);
        this.loadPreview = this.loadPreview.bind(this);
        this.state = { preview: null};
        this.loadPreview(this.props.file);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.file !== nextProps.file) {
            this.setState({preview: null});
            this.loadPreview(nextProps.file);
        }
    }

    loadPreview(file) {
        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ preview: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const source = this.props.source || this.state.preview;
        const state = source ? "PREVIEW" : "LOADING";
        return <div id="image">
            { state==="PREVIEW" && <img src={source} style={{ maxWidth: "98%", maxHeight: "98%", width: "auto", height: "auto" }}/> }
            { state==="LOADING" && 'Loading...' }
        </div>
    }
}

class EditorPage extends React.Component {

    constructor(props) {
        super(props);
        this.specialTypes = new Set(["prompto", "image", "audio", "video", "other"]);
        this.project = null;
        this.navBar = null;
        this.elementsNavigator = null;
        this.editorFrame = null;
        this.editorWindow = null;
        this.editorDidMount = this.editorDidMount.bind(this);
        this.setEditorDefaults = this.setEditorDefaults.bind(this);
        this.loadCodeInWorker = this.loadCodeInWorker.bind(this);
        this.loadDescription = this.loadDescription.bind(this);
        this.loadResources = this.loadResources.bind(this);
        this.resourcesLoaded = this.resourcesLoaded.bind(this);
        this.destroy = this.destroy.bind(this);
        this.revert = this.revert.bind(this);
        this.commit = this.commit.bind(this);
        this.commitPrepared = this.commitPrepared.bind(this);
        this.commitFailed = this.commitFailed.bind(this);
        this.commitSuccessful = this.commitSuccessful.bind(this);
        this.renameResource = this.renameResource.bind(this);
        this.addResource = this.addResource.bind(this);
        this.prepareResourceFiles = this.prepareResourceFiles.bind(this);
        this.catalogUpdated = this.catalogUpdated.bind(this);
        this.done = this.done.bind(this);
        this.state = { editMode: "EDIT", contentType: "Prompto", resourceToRename: null, newFileResourceType: null, newTextResourceType: null };
        this.catalog = new Catalog();
        this.currentContent = null;
        Mousetrap.bind('command+s', this.commit);
    }

    componentDidMount() {
        this.editorWindow = document.getElementById("editor").contentWindow;
        this.loadDescription();
        this.loadResources();
        document.title = "Project: " + getParam("name");
    }

    editorDidMount() {
        this.setEditorDefaults();
        this.loadCodeInWorker(true);
    }

    setEditorDefaults() {
        this.editorWindow.setDialect("E");
    }

    revert() {
        // TODO confirm
        this.setEditorContent({ type: "Prompto" });
        this.loadCodeInWorker(false);
        this.loadResources();
    }

    commit() {
        // TODO confirm
        // remember content to restore
        this.activeContent = this.currentContent;
        this.setEditorContent({ type: "Prompto" });
        this.editorWindow.prepareCommit();
        return false;
    }

    commitPrepared(declarations) {
        let resources = this.catalog.prepareCommit();
        if((declarations && declarations.length) || (resources && resources.length)) {
            const formData = new FormData();
            if(resources && resources.length)
                resources = this.prepareResourceFiles(formData, resources);
            const stuff = (declarations || []).concat(resources || []);
            formData.append("params", JSON.stringify([{name: "edited", type: "EditedStuff[]", value: stuff}]));
            axios.post('/ws/run/storeEdited', formData).
                then(response=>this.commitSuccessful(response)).
                catch(error=>this.commitFailed(error));
        } else {
            this.messageArea.setMessage("Nothing to commit!");
            this.setEditorContent(this.activeContent);
            this.activeContent = null;
        }

    }

    commitFailed(failure) {
        this.messageArea.setMessage("Commit failed!");
        this.editorWindow.commitFailed();
        this.setEditorContent(this.activeContent);
        this.activeContent = null;
    }

    commitSuccessful(success) {
        this.messageArea.setMessage("Commit ok!");
        this.editorWindow.commitSuccessful();
        this.loadResources(()=>{
            this.setEditorContent(this.activeContent);
            this.activeContent = null;
        });
    }

    prepareResourceFiles(formData, resources) {
        return resources.map(res => {
            let stuff = res.value.stuff;
            if(stuff.type==="BinaryResource" && stuff.value.file) {
                stuff = Object.assign({}, stuff);
                stuff.value.data = { mimeType: stuff.value.file.type, partName: "@" + stuff.value.file.name };
                formData.append(stuff.value.data.partName, stuff.value.file);
                delete stuff.value.file;
                res.value.stuff = stuff;
            }
            let module = stuff.value.module;
            if(module) {
                // avoid sending back large objects
                delete module.value.dependencies;
                delete module.value.image;
            }
            return res;
        });
    }

    loadResources(success) {
        const params = {params: JSON.stringify([{name: "dbId", value: this.props.projectId}])};
        axios.get('/ws/run/getModuleResources', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.resourcesLoaded(response.data.value, success);
        });
    }

    resourcesLoaded(resources, success) {
        this.catalog.clearResources();
        const delta = { added: { resources: resources}};
        this.catalogUpdated(delta, () => this.catalog.markResources(resources, "CLEAN"));
        if(success)
            success();
    }

    catalogUpdated(delta, callback) {
        this.catalog.applyDelta(delta);
        this.elementsNavigator.setState({catalog: this.catalog}, callback);
    }

    loadCodeInWorker(loadDependencies) {
        this.editorWindow.setProject(this.props.projectId, loadDependencies);
    }

    loadDescription() {
        const params = { params: JSON.stringify([{name: "dbId", value: this.props.projectId.toString()}, {name: "register", type: "Boolean", value: false}]) };
        axios.get('/ws/run/getModuleDescription',  { params: params }).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.project = response.data;
        });
    }

    render() {
        const editorStyle = { display: this.state.editMode==="EDIT" ? "block" : "none"};
        const outputStyle = { display: this.state.editMode==="EDIT" ? "none" : "block"};
        const showImage = this.state.contentType==="image";
        return <div>
            <EditorNavBar ref={ref=>this.navBar=ref} root={this}/>
            <MessageArea ref={ref=>this.messageArea=ref}/>
            <div style={editorStyle}>
                <ContentNavigator ref={ref=>this.elementsNavigator=ref} root={this} catalog={this.catalog}/>
                /* always render editor otherwise iframe, ace editor and prompto worker are destroyed */
                <EditorFrame ref={ref=>this.editorFrame=ref} root={this}/>
                { showImage && <ImageDisplayer file={this.currentContent.file} source={this.currentContent.data}/> }
                { this.state.newFileResourceType!=null && <NewFileResourceDialog type={this.state.newFileResourceType} root={this} onClose={()=>this.setState({newFileResourceType: null})}/> }
                { this.state.newTextResourceType!=null && <NewTextResourceDialog type={this.state.newTextResourceType} root={this} onClose={()=>this.setState({newTextResourceType: null})}/> }
                { this.state.resourceToRename!=null && <RenameResourceDialog resource={this.state.resourceToRename} root={this} onClose={()=>this.setState({resourceToRename: null})}/>}
            </div>
            <div id="output" style={outputStyle}>
            </div>
        </div>;
    }

    setEditorContent(content) {
        if(!content)
            content = { type: "Prompto" };
        if (content === this.currentContent)
            return;
        this.saveEditedTextResource();
        this.currentContent = content;
        const contentType = ((content || {}).type || "prompto").toLowerCase();
        this.setState({contentType: contentType}, ()=> {
            // need to adjust visibility in callback otherwise it is always 'block'
            const editor = document.getElementById("editor");
            if (contentType === "image")
                editor.style.display = "none";
            else {
                editor.style.display = "block";
                this.editorWindow.setContent(content);
            }
        });
    }

    saveEditedTextResource() {
        if(this.currentContent===null || this.specialTypes.has(this.currentContent.type.toLowerCase()))
            return;
        this.currentContent.body = this.editorWindow.getResourceBody();
        this.catalog.setResourceBody(this.currentContent);
    }

    destroy() {
        if(this.currentContent===null)
            alert("Nothing to destroy!");
        else {
            const content = this.currentContent;
            this.currentContent = null;
            if(content.type.toLowerCase()==="prompto") {
                this.editorWindow.destroyPrompto(content);
            } else {
                var res = this.catalog.resourceFromContent(content);
                this.catalog.removeResources([res]);
                this.catalogUpdated({}, ()=>{
                    this.setEditorContent({ type: "prompto" });
                });
            }
        }
    }

    addResource(content) {
        content.value.module =  { type: "Module", value: { dbId: this.props.projectId.toString() } };
        const delta = { added: { resources: [content]}};
        const projectTree = this.elementsNavigator.projectTree;
        this.catalogUpdated(delta, () => projectTree.selectContent(content));
    }

    renameResource(current, newName) {
        this.saveEditedTextResource();
        this.currentContent = null;
        const renamed = this.catalog.renameResource(current, newName);
        const projectTree = this.elementsNavigator.projectTree;
        this.elementsNavigator.setState({catalog: this.catalog}, () => projectTree.selectContent(renamed));
    }


    done(data) {
        this.setState({editMode: "IDLE"});
    }

}

/* plain js calls invoked from prompto worker */
function editorMounted() {
    root.editorDidMount();
}

function catalogUpdated(delta) {
    root.catalogUpdated(delta);
}

function catalogUpdated(delta) {
    root.catalogUpdated(delta);
}

function destroy() {
    root.destroy();
}

function commit() {
    root.commit();
}

function commitPrepared(declarations) {
    root.commitPrepared(declarations);
}

function done(data) {
    root.done(data);
}

// a utility method to inspect worker data in Firefox/Safari
function inspect(name) {
    root.editorWindow.inspect(name);
}

// a utility method to inspect worker data in Firefox/Safari
function inspected(data) {
    console.log(data);
}
