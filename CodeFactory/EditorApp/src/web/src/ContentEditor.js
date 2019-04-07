import DebuggerView from "./debugger/DebuggerView";
import PromptoEditor from "./prompto-editor/PromptoEditor";
import Activity from "./utils/Activity";
import ResourceEditor from "./resource-editors/ResourceEditor";
import BinaryEditor from "./resource-editors/BinaryEditor";
import React from "react";
import {Breakpoints} from "./debugger/Breakpoints";

export default class ContentEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { breakpoints: new Breakpoints() };
        this.breakpointsUpdated = this.breakpointsUpdated.bind(this);
        this.getResourceEditor = this.getResourceEditor.bind(this);
        this.getDebuggerView = this.getDebuggerView.bind(this);
        this.getPromptoEditor = this.getPromptoEditor.bind(this);
        this.getBinaryEditor = this.getBinaryEditor.bind(this);
    }

    setProject(projectId, loadDependencies) {
        this.refs.PromptoEditor.setProject(projectId, loadDependencies);
    }

    setContent(content) {
        if(this.refs.PromptoEditor)
            this.refs.PromptoEditor.setDebugMode(null, () => this.refs.PromptoEditor.setContent(content));
        if(this.refs.ResourceEditor)
            this.refs.ResourceEditor.setContent(content);
        if(this.refs.BinaryEditor)
            this.refs.BinaryEditor.setContent(content);
    }

    destroyContent(content) {
        if(content.type.toLowerCase()==="prompto")
            this.refs.PromptoEditor.destroy(content);
    }

    setDialect(dialect) {
        this.refs.PromptoEditor.setDialect(dialect);
    }

    prepareCommit(commitPrepared) {
        this.refs.PromptoEditor.prepareCommit(commitPrepared);
    }

    commitFailed() {
        this.refs.PromptoEditor.commitFailed();
    }

    commitSuccessful() {
        this.refs.PromptoEditor.commitSuccessful();
    }

    runTestOrMethod(content, runMode) {
        const root = this.props.root;
        this.refs.PromptoEditor.runTestOrMethod(content, runMode, ()=>root.setState({activity: Activity.Idling}));
    }

    fetchRunnablePage(content, callback) {
        this.refs.PromptoEditor.fetchRunnablePage(content, callback);
    }

    setDebugger(dbg) {
        this.refs.DebuggerView.setDebugger(dbg);
    }

    getDebugger() {
        return this.refs.DebuggerView.getDebugger();
    }

    breakpointsUpdated(breakpoints) {
        this.setState({ breakpoints: breakpoints });
    }

    dependenciesUpdated() {
        this.refs.PromptoEditor.dependenciesUpdated();
    }

   render() {
        const root = this.props.root;
        const activity = root.state.activity;
        return <div className="container">
            <DebuggerView ref="DebuggerView" activity={activity} container={this}
                          breakpoints={this.state.breakpoints} breakpointSelected={root.breakpointSelected}/>
            <PromptoEditor ref="PromptoEditor" commitAndReset={root.commitAndReset}
                           catalogUpdated={root.catalogUpdated} contentUpdated={root.contentUpdated}
                           projectUpdated={root.projectUpdated} breakpointsUpdated={this.breakpointsUpdated}
                           root={this.props.root} activity={activity}/>
            <ResourceEditor ref="ResourceEditor" textEdited={root.textResourceEdited}
                            root={this.props.root} activity={activity} />
            <BinaryEditor ref="BinaryEditor"
                          root={this.props.root} activity={activity} />
        </div>
    }

    getDebuggerView() {
        return this.refs.DebuggerView;
    }

    getPromptoEditor() {
        return this.refs.PromptoEditor;
    }

    getResourceEditor() {
        return this.refs.ResourceEditor;
    }

    getBinaryEditor() {
        return this.refs.BinaryEditor;
    }


}