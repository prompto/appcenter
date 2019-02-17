import DebuggerView from "./debugger/DebuggerView";
import PromptoEditor from "./prompto-editor/PromptoEditor";
import Activity from "./utils/Activity";
import ResourceEditor from "./resource-editors/ResourceEditor";
import BinaryEditor from "./resource-editors/BinaryEditor";
import React from "react";

export default class ContentEditor extends React.Component {

    constructor(props) {
        super(props);
        this.debuggerView = null;
        this.promptoEditor = null;
        this.resourceEditor = null;
        this.binaryEditor = null;
    }

    setProject(projectId, loadDependencies) {
        this.promptoEditor.setProject(projectId, loadDependencies);
    }

    setContent(content) {
        if(this.promptoEditor)
            this.promptoEditor.setDebugMode(null, () => this.promptoEditor.setContent(content));
        if(this.resourceEditor)
            this.resourceEditor.setContent(content);
        if(this.binaryEditor)
            this.binaryEditor.setContent(content);
    }

    destroyContent(content) {
        if(content.type.toLowerCase()==="prompto")
            this.contentEditor.promptoEditor.destroy(content);
    }


    setDialect(dialect) {
        this.promptoEditor.setDialect(dialect);
    }

    prepareCommit(commitPrepared) {
        this.promptoEditor.prepareCommit(commitPrepared);
    }

    commitFailed() {
        this.promptoEditor.commitFailed();
    }

    commitSuccessful() {
        this.promptoEditor.commitSuccessful();
    }

    runTestOrMethod(content, runMode) {
        const root = this.props.root;
        this.promptoEditor.runTestOrMethod(content, runMode, ()=>root.setState({activity: Activity.Idling}));
    }

    fetchRunnablePage(content, callback) {
        this.promptoEditor.fetchRunnablePage(content, callback);
    }

    setDebugger(dbg) {
        this.debuggerView.setDebugger(dbg);
    }

    getDebuggerView() {
        return this.debuggerView;
    }

    render() {
        const root = this.props.root;
        const activity = root.state.activity;
        return <div className="container">
            <DebuggerView ref={ref=>this.debuggerView=ref||this.debuggerView} activity={activity} container={this}/>
            <PromptoEditor ref={ref=>this.promptoEditor=ref||this.promptoEditor} commitAndReset={root.commitAndReset}
                           catalogUpdated={root.catalogUpdated} projectUpdated={root.projectUpdated}
                           activity={activity}/>
            <ResourceEditor ref={ref=>this.resourceEditor=ref||this.resourceEditor} textEdited={root.textResourceEdited}
                            activity={activity} />
            <BinaryEditor ref={ref=>this.binaryEditor=ref||this.binaryEditor}
                          activity={activity} />
        </div>
    }

}