import axios from 'axios';
import React from 'react';
import Mousetrap from 'mousetrap';
import { getParam } from './utils/Utils';
import { getFirstCodebaseEntry, getContentFromEntry } from './code/Utils';
import Catalog from './code/Catalog';
import MessageArea from './components/MessageArea';
import ContentNavigator from './project-tree/ContentNavigator';
import ContentEditor from './ContentEditor';
import EditorNavBar from './EditorNavBar';
import Activity from './utils/Activity';
import fetcher from './utils/Fetcher';
import Project from "./Project";

export default class EditorPage extends React.Component {

    projectId: string | null;
    projectName: string | null;
    state: { project: any | null, activity: Activity, content: any | null };
    catalog: Catalog;

    constructor(props:any) {
        super(props);
        this.projectId = getParam("dbId");
        this.projectName = getParam("name");
        this.resourcesLoaded = this.resourcesLoaded.bind(this);
        this.setDialect = this.setDialect.bind(this);
        this.destroy = this.destroy.bind(this);
        this.revert = this.revert.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.commitPrepared = this.commitPrepared.bind(this);
        this.commitFailed = this.commitFailed.bind(this);
        this.commitSuccessful = this.commitSuccessful.bind(this);
        this.clearModuleContext = this.clearModuleContext.bind(this);
        this.textResourceEdited = this.textResourceEdited.bind(this);
        this.renameResource = this.renameResource.bind(this);
        this.addResource = this.addResource.bind(this);
        this.addCode = this.addCode.bind(this);
        this.getProject = this.getProject.bind(this);
        this.getContentEditor = this.getContentEditor.bind(this);
        this.getContentNavigator = this.getContentNavigator.bind(this);
        this.prepareResourceFiles = this.prepareResourceFiles.bind(this);
        this.catalogUpdated = this.catalogUpdated.bind(this);
        this.contentUpdated = this.contentUpdated.bind(this);
        this.breakpointSelected = this.breakpointSelected.bind(this);
        this.dependenciesUpdated = this.dependenciesUpdated.bind(this);
        this.state = { project: null, activity: Activity.Loading, content: null };
        this.catalog = new Catalog();
        Mousetrap.bind('command+s', this.commitAndReset);
    }

    getProject() {
        return this.state.project;
    }

    componentDidMount() {
        if(!this.projectId)
            alert("Missing project ID in URL!")
        else {
            this.loadDescription();
            this.loadResources(null);
            this.loadCode(true);
            document.title = "Project: " + this.projectName;
        }
    }

    setDialect(dialect: any) {
        this.getContentEditor().setDialect(dialect);
    }

    revert() {
        // TODO confirm
        this.loadResources(null);
        this.loadCode(false);
    }

    commitAndReset() {
        // TODO confirm
        this.getContentEditor().prepareCommit(this.commitPrepared);
        this.clearModuleContext();
        return false;
    }

    commitPrepared(declarations: any[]) {
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
            this.getMessageArea().setMessage("Nothing to commit!");
            this.getContentEditor().commitSuccessful();
        }

    }

    commitFailed(failure) {
        this.refs.MessageArea.setMessage("Commit failed!");
        this.refs.ContentEditor.commitFailed();
    }

    commitSuccessful(success) {
        this.refs.MessageArea.setMessage("Commit ok!");
        this.refs.ContentEditor.commitSuccessful();
        this.clearModuleContext();
    }

    clearModuleContext() {
        fetcher.fetchModuleURL(this.projectId, "READ", url => {
            // port is 0 if server is not running
            if(url.indexOf(":0/")<0) {
                const fullUrl = url + "ws/control/clear-context";
                axios.get(fullUrl);
            }
        }, error => alert(error));
    }

    prepareResourceFiles(formData, resources) {
        return resources.map(res => {
            let stuff = res.value.stuff;
            if(stuff.type==="BinaryResource" && stuff.value.file) {
                stuff = Object.assign({}, stuff);
                stuff.value.data = {
                    type: stuff.value.file.type.startsWith("image/") ? "Image" : "Blob",
                    value: {
                        mimeType: stuff.value.file.type,
                        partName: "@" + stuff.value.file.name
                    }
                };
                formData.append(stuff.value.data.value.partName, stuff.value.file);
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
        axios.get('/ws/run/fetchModuleResources', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else {
                const cursor = response.data.value;
                this.resourcesLoaded(cursor.items, success);
            }
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
        if(delta.selected)
            content = {type: "Prompto", value: {name: delta.selected}};
        else if(delta.project) {
            if(this.state.activity===Activity.Loading)
                this.setState({activity: Activity.Editing});
            if (this.state.content)
                content = { type: this.state.content.type, value: {subType: this.state.content.subType, name: this.state.content.name} };
        }
        this.setCatalog(this.catalog, content, callback);
    }

    contentUpdated(delta, callback) {
        this.catalogUpdated(delta, callback);
        this.updateCurrentContent(delta);
    }

    updateCurrentContent(delta) {
        if(delta.editedCount===1 && delta.added) {
            const entry = getFirstCodebaseEntry(delta.added);
            const content = getContentFromEntry(entry);
            if(content)
                this.setEditorContent(content);
       }
    }


    breakpointSelected(breakpoint) {
        const content = breakpoint.toContent();
        this.setEditorContent(content);
    }


    loadCode(loadDependencies) {
        this.refs.ContentEditor.setProject(this.projectId, loadDependencies);
    }

    loadDescription() {
        const params = { params: JSON.stringify([{name: "dbId", value: this.projectId.toString()}, {name: "register", type: "Boolean", value: false}]) };
        axios.get('/ws/run/fetchModuleDescription',  { params: params }).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.setState({project: new Project(response.data)});
        });
    }

    killModule() {
        const dbId = this.getProject().value.dbId.value || this.getProject().value.dbId;
        const params = { params: JSON.stringify([ {name:"dbId", value: dbId}]) };
        axios.get('/ws/run/killModule', { params: params })
            .then(resp=>{
                this.refs.MessageArea.setMessage("Server stopped!");
            })
            .catch(error=>alert(error));
    }

    dependenciesUpdated() {
        this.loadDescription();
        this.refs.ContentEditor.dependenciesUpdated();
    }

   render() {
        return <div>
            <EditorNavBar ref="EditorNavBar" root={this}/>
            <MessageArea ref="MessageArea"/>
            <div>
                { this.renderLoading() }
                { this.renderEditor() }
                { this.renderOutput() }
            </div>
        </div>;
    }

    renderOutput() {
        const activity = this.state.activity;
        const style = { display: activity===Activity.Running || activity===Activity.Idling ? "block" : "none"};
        return <div id="output" style={style} />;
    }


    renderLoading() {
        const style = { display: this.state.activity===Activity.Loading ? "block" : "none"};
        return <div style={style}>
                <img id="loading" src="img/loading.gif" alt=""/>
            </div>;
    }

    renderEditor() {
        const activity = this.state.activity;
        const style = { display: activity===Activity.Editing || activity===Activity.Debugging ? "block" : "none"};
        return <div className="content" style={style}>
                <div className="navigator">
                    <ContentNavigator ref="ContentNavigator" root={this} catalog={this.catalog}/>
                </div>
                <div className="editor">
                    <ContentEditor ref="ContentEditor" root={this} />
                </div>
            </div>;
    }

    getContentNavigator() {
        return this.refs.ContentNavigator;
    }


    getContentEditor() {
        return this.refs.ContentEditor as ContentEditor;
    }


    getMessageArea() {
        return this.refs.MessageArea as MessageArea;
    }

    setEditorContent(content, callback) {
        if(!content)
            content = { type: "Prompto" };
        if (content === this.state.content)
            return;
        this.setState({content: content}, ()=>{
            if(this.refs.ContentEditor)
                this.refs.ContentEditor.setContent(content);
            if(callback)
                callback();
        });
    }

    setCatalog(catalog, content, callback) {
        this.setState({catalog: catalog}, () => {
            this.refs.ContentNavigator.getProjectTree().setContentToSelect(content);
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
                this.refs.ContentEditor.destroyContent(content);
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
        const projectTree = this.refs.ContentNavigator.getProjectTree();
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
            () => this.refs.EditorNavBar.setDialect(dialect,
                () => this.refs.ContentEditor.setContent({type: "prompto", body: code})));
    }

    fetchRunnablePage(content, callback) {
        this.refs.ContentEditor.fetchRunnablePage(content, callback);
    }

    runTestOrMethod(content, runMode) {
        this.refs.ContentEditor.runTestOrMethod(content, runMode);
    }

    stopServer() {
        this.killModule();
    }

    stopRunning() {
        this.setState({activity: Activity.Editing});
    }

    setDebugger(dbg) {
        this.refs.ContentEditor.setDebugger(dbg);
    }

    getDebuggerView() {
        return this.refs.ContentEditor.getDebuggerView();
    }

    getDebugger() {
        return this.refs.ContentEditor.getDebuggerView().getDebugger();
    }

    stopDebugging() {
        this.getDebuggerView().disconnect();
        this.killModule();
        this.setState({activity: Activity.Editing});

    }

}

