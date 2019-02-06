import axios from 'axios';
import React from 'react';
import Mousetrap from 'mousetrap';
import { getParam, print } from './utils/Utils';
import Catalog from './code/Catalog';
import MessageArea from './components/MessageArea';
import NewFileResourceDialog from "./dialogs/NewFileResourceDialog";
import NewTextResourceDialog from "./dialogs/NewTextResourceDialog";
import RenameResourceDialog from "./dialogs/RenameResourceDialog";
import ContentNavigator from './project-tree/ContentNavigator';
import EditorNavBar from './EditorNavBar';
import PromptoEditor from './prompto-editor/PromptoEditor';
import ResourceEditor from './resource-editors/ResourceEditor';
import BinaryEditor from './resource-editors/BinaryEditor';
import Runner from './run/Runner';

export default class EditorPage extends React.Component {

    constructor(props) {
        super(props);
        this.projectId = getParam("dbId");
        this.projectName = getParam("name");
        this.specialTypes = new Set(["prompto", "image", "audio", "video", "other"]);
        this.navBar = null;
        this.contentNavigator = null;
        this.loadDescription = this.loadDescription.bind(this);
        this.loadResources = this.loadResources.bind(this);
        this.resourcesLoaded = this.resourcesLoaded.bind(this);
        this.setDialect = this.setDialect.bind(this);
        this.destroy = this.destroy.bind(this);
        this.revert = this.revert.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.commitPrepared = this.commitPrepared.bind(this);
        this.commitFailed = this.commitFailed.bind(this);
        this.commitSuccessful = this.commitSuccessful.bind(this);
        this.resetServer = this.resetServer.bind(this);
        this.textResourceEdited = this.textResourceEdited.bind(this);
        this.renameResource = this.renameResource.bind(this);
        this.addResource = this.addResource.bind(this);
        this.addCode = this.addCode.bind(this);
        this.getProject = this.getProject.bind(this);
        this.prepareResourceFiles = this.prepareResourceFiles.bind(this);
        this.catalogUpdated = this.catalogUpdated.bind(this);
        this.done = this.done.bind(this);
        this.tryRun = this.tryRun.bind(this);
        this.promptoEditor = null;
        this.resourceEditor = null;
        this.imageDisplayer = null;
        this.state = { project: null, editMode: "EDIT", content: null, resourceToRename: null, newFileResourceType: null, newTextResourceType: null };
        this.catalog = new Catalog();
        Mousetrap.bind('command+s', this.commitAndReset);
        console.log = print;
    }

    getProject() {
        return this.state.project;
    }

    componentDidMount() {
        if(!this.projectId)
            alert("Missing project ID in URL!")
        else {
            this.loadDescription();
            this.loadResources();
            this.loadCode(true);
            document.title = "Project: " + this.projectName;
        }
    }

    setDialect(dialect) {
        this.promptoEditor.setDialect(dialect);
    }

    revert() {
        // TODO confirm
        this.loadResources();
        this.loadCode(false);
    }

    commitAndReset() {
        // TODO confirm
        this.promptoEditor.prepareCommit(this.commitPrepared);
        this.resetServer();
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
            axios.post('/ws/run/storeEdited', formData)
                .then(response=>this.commitSuccessful(response))
                .catch(error=>this.commitFailed(error));
        } else {
            this.messageArea.setMessage("Nothing to commit!");
        }

    }

    commitFailed(failure) {
        this.messageArea.setMessage("Commit failed!");
        this.promptoEditor.commitFailed();
    }

    commitSuccessful(success) {
        this.messageArea.setMessage("Commit ok!");
        this.promptoEditor.commitSuccessful();
        // this.loadResources();
    }

    resetServer() {
        this.fetchModuleURL(url => {
            const fullUrl = url + "ws/control/clear-context";
            axios.get(fullUrl);
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
        const params = {params: JSON.stringify([{name: "dbId", value: this.projectId}])};
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
        let content = null;
        if(delta.select)
            content = {type: "Prompto", value: {name: delta.select}};
        else if(delta.project && this.state.content)
            content = {type: this.state.content.type, value: {subType: this.state.content.subType, name: this.state.content.name}};
        this.setCatalog(this.catalog, content, callback);
    }

    loadCode(loadDependencies) {
        this.promptoEditor.setProject(this.projectId, loadDependencies);
    }

    loadDescription() {
        const params = { params: JSON.stringify([{name: "dbId", value: this.projectId.toString()}, {name: "register", type: "Boolean", value: false}]) };
        axios.get('/ws/run/getModuleDescription',  { params: params }).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.setState({project: response.data});
        });
    }

    killModule() {
        const dbId = this.getProject().value.dbId.value || this.getProject().value.dbId;
        const params = { params: JSON.stringify([ {name:"dbId", value: dbId}]) };
        axios.get('/ws/run/killModule', { params: params })
            .then(resp=>{
                this.messageArea.setMessage("Server stopped!");
            })
            .catch(error=>alert(error));
    }

    fetchModuleURL(success) {
        const dbId = this.getProject().value.dbId.value || this.getProject().value.dbId;
        const params = { params: JSON.stringify([ {name:"dbId", value: dbId}]) };
        axios.get('/ws/run/getModulePort', { params: params })
            .then(resp=>{
                const response = resp.data;
                if (response.error)
                    ; // TODO something
                else if(response.data === -1)
                    alert("Server is not running!");
                else {
                    const href = window.location.protocol +
                        "//" + window.location.hostname +
                        ":" + response.data + "/";
                    success(href);
                }
            })
            .catch(error=>alert(error));
    }

    render() {
        const editorStyle = { display: this.state.editMode==="EDIT" ? "block" : "none"};
        const outputStyle = { display: this.state.editMode==="EDIT" ? "none" : "block"};
        return <div>
            <EditorNavBar ref={ref=>this.navBar=ref} root={this}/>
            <MessageArea ref={ref=>this.messageArea=ref}/>
            <div style={editorStyle}>
                <ContentNavigator ref={ref=>{if(ref)this.contentNavigator=ref;}} root={this} catalog={this.catalog}/>
                <PromptoEditor ref={ref=>this.promptoEditor=ref}
                               commitAndReset={this.commitAndReset} commitPrepared={this.commitPrepared}
                               catalogUpdated={this.catalogUpdated} projectUpdated={this.projectUpdated}
                                done={()=>this.setState({editMode: "IDLE"})}/>
                <ResourceEditor ref={ref=>this.resourceEditor=ref} textEdited={this.textResourceEdited} />
                <BinaryEditor ref={ref=>this.binaryEditor=ref} /> }
                { this.state.newFileResourceType!=null && <NewFileResourceDialog type={this.state.newFileResourceType} root={this} onClose={()=>this.setState({newFileResourceType: null})}/> }
                { this.state.newTextResourceType!=null && <NewTextResourceDialog type={this.state.newTextResourceType} root={this} onClose={()=>this.setState({newTextResourceType: null})}/> }
                { this.state.resourceToRename!=null && <RenameResourceDialog resource={this.state.resourceToRename} root={this} onClose={()=>this.setState({resourceToRename: null})}/>}
            </div>
            <div id="output" style={outputStyle}>
            </div>
        </div>;
    }

    setEditorContent(content, callback) {
        if(!content)
            content = { type: "Prompto" };
        if (content === this.state.content)
            return;
        this.setState({content: content}, ()=>{
            if(this.promptoEditor)
                this.promptoEditor.setContent(content);
            if(this.resourceEditor)
                this.resourceEditor.setContent(content);
            if(this.binaryEditor)
                this.binaryEditor.setContent(content);
            if(callback)
                callback();
        });
    }

    setCatalog(catalog, content, callback) {
        this.setState({catalog: catalog}, () => {
            this.contentNavigator.projectTree.setContentToSelect(content);
            if(callback)
                callback();
        })
    }

    textResourceEdited(newValue) {
        const content = {...this.state.content, body: newValue};
        this.catalog.setResourceBody(content);
        this.setState({content: content});
    }

    destroy() {
        if(this.state.content===null)
            alert("Nothing to destroy!");
        else {
            const content = this.state.content;
            if(content.type.toLowerCase()==="prompto") {
                this.promptoEditor.destroy(content);
                this.setEditorContent({ type: "prompto" });
            } else {
                var res = this.catalog.resourceFromContent(content);
                this.catalog.removeResources([res]);
                this.catalogUpdated({}, ()=>{
                    this.setEditorContent({ type: "prompto" });
                });
            }
        }
    }

    addResource(content, callback) {
        content.value.module =  { type: "Module", value: { dbId: this.projectId.toString() } };
        const delta = { added: { resources: [content]}};
        const projectTree = this.contentNavigator.projectTree;
        if(callback)
            this.catalogUpdated(delta, () => projectTree.showContent(content, callback));
        else
            this.catalogUpdated(delta, () => projectTree.selectContent(content));
    }

    renameResource(current, newName) {
        this.currentContent = null;
        const renamed = this.catalog.renameResource(current, newName);
        this.setCatalog(this.catalog, renamed);
    }

    addCode(content, code, dialect) {
        this.setEditorContent(content,
            () => this.navBar.setDialect(dialect,
                () => this.promptoEditor.setContent({type: "prompto", body: code})));
    }


    done(data) {
        this.setState({editMode: "IDLE"});
    }

    tryRun(runMode) {
        const runner = new Runner(this, this.state.content, runMode);
        runner.tryRun();
    }





}

