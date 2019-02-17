import React from 'react';
import AceEditor from 'react-ace';

/*eslint-disable no-alert, no-console */
import 'brace/theme/eclipse';
import 'brace/mode/text';
import PromptoMode from "./PromptoMode";
import Activity from "../utils/Activity";

const EditSession = window.ace.EditSession;
EditSession.prototype.clearGutterDecorations = function() {
    this.$decorations = [];
    this._signal("changeBreakpoint",{});
};

export default class PromptoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.aceEditor = null;
        this.getSession = this.getSession.bind(this);
        this.setContent = this.setContent.bind(this);
        this.codeEdited = this.codeEdited.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.state = {value: "", readOnly: false, display: true, debugMode: null};
    }


    getEditor() {
        return this.aceEditor.editor;
    }


    getSession() {
        return this.getEditor().getSession();
    }

    componentDidMount() {
        const session = this.getSession();
        session.setMode(new PromptoMode(this));
        session.setUseWorker(true);
        this.getEditor().commands.addCommand({
            name: "commit",
            bindKey: { win: "Ctrl-S", mac: "Command-S" },
            exec: this.commitAndReset
        });
    }

    setDialect(dialect) {
        this.getSession().getMode().setDialect(dialect);
    }


    commitAndReset() {
        this.props.commitAndReset();
        return true;
    }

    setProject(dbId, loadDependencies) {
        this.getSession().getMode().setProject(dbId, loadDependencies);
    }

    setDebugMode(mode, callback) {
        this.setState({debugMode: mode}, callback);
    }

    stopDebugging() {
        this.setState({debugMode: null});
        this.getSession().clearGutterDecorations();
        this.getEditor().setReadOnly(this.state.readOnly);
    }

    setContent(content, callback) {
        const display = content && content.type.toLowerCase()==="prompto";
        const readOnly = content && content.core;
        this.setState({display: display, readOnly: readOnly}, () => {
            if(display) {
                this.getEditor().setReadOnly(this.props.activity===Activity.Debugging  || readOnly);
                const session = this.getSession();
                session.clearGutterDecorations();
                session.getMode().setContent(content, () => {
                    session.setScrollTop(0);
                    if(callback)
                        callback();
                });
            } else if(callback)
                callback();
        });
   }

    showStackFrame(stackFrame) {
        const session = this.getSession();
        session.getMode().locateContent(stackFrame, content => {
            this.setContent(content, () => {
                this.getEditor().gotoLine(stackFrame.line, 0, true);
                session.addGutterDecoration(stackFrame.line-1, "debugger-line");
            });
        });
    }

    runTestOrMethod(content, runMode, callback) {
        this.getSession().getMode().runTestOrMethod(content, runMode, callback);
    }

    fetchRunnablePage(content, andThen) {
        this.getSession().getMode().fetchRunnablePage(content, andThen);
    }

    codeEdited(newValue) {
        this.setState({value: newValue});
    }

    catalogUpdated(catalog) {
        this.props.catalogUpdated(catalog);
    }

    destroy(content) {
        const session = this.getSession();
        session.getMode().destroy(content);
        session.setScrollTop(0);
    }

    prepareCommit(callback) {
        this.getSession().getMode().prepareCommit(callback);
    }

    commitFailed() {
        this.getSession().getMode().commitFailed();
    }

    commitSuccessful() {
        this.getSession().getMode().commitSuccessful();
    }

    render() {
        return <React.Fragment>
                { this.renderEditor() }
                { this.renderProcessing() }
                { this.renderIdling() }
            </React.Fragment>;
    }

    renderEditor() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const hidden = this.state.debugMode && this.state.debugMode!=="STEPPING";
        const style = {display: (this.state.display && !hidden) ? "block" : "none" };
        return <div className={className} style={style}>
                <AceEditor ref={ref=>{if(ref)this.aceEditor=ref;}} name="prompto-editor"
                       theme="eclipse" mode="text"
                       value={this.state.value} onChange={this.codeEdited}
                       width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }} />
                </div>;
    }

    renderProcessing() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const style = { display: this.state.debugMode==="PROCESSING" ? "block" : "none"};
        return <div className={className} style={style}>
            <img id="processing" src="img/processing.gif" alt=""/>
        </div>;
    }

    renderIdling() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const style = { display: this.state.debugMode==="IDLING" ? "block" : "none"};
        return <div className={className} style={style}>
            <img id="idling" src="img/vortex.gif" alt=""/>
            <div id="idling-text">No code to execute<br/><i>(server is running)</i></div>
        </div>;
    }
}