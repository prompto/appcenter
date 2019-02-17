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
};

export default class PromptoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.aceEditor = null;
        this.getSession = this.getSession.bind(this);
        this.setContent = this.setContent.bind(this);
        this.codeEdited = this.codeEdited.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.state = {value: "", display: true, processing: true};
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

    setProcessing(processing, callback) {
        this.setState({processing: processing}, callback);
    }

    setContent(content, callback) {
        const display = content && content.type.toLowerCase()==="prompto";
        this.setState({display: display}, () => {
            if(display) {
                this.getEditor().setReadOnly(this.props.activity===Activity.Debugging  || (content ? content.core : false));
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
        this.getEditor().gotoLine(stackFrame.line, 0, true);
        this.getSession().addGutterDecoration(stackFrame.line-1, "debugger-line");
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
            </React.Fragment>;
    }

    renderEditor() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const style = {display: (this.state.display && !this.state.processing) ? "block" : "none" };
        return <div className={className} style={style}>
                <AceEditor ref={ref=>{if(ref)this.aceEditor=ref;}} name="prompto-editor"
                       theme="eclipse" mode="text"
                       value={this.state.value} onChange={this.codeEdited}
                       width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }} />
                </div>;
    }

    renderProcessing() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const style = { display: this.state.processing ? "block" : "none"};
        return <div className={className} style={style}>
            <img id="processing" src="img/processing.gif" alt=""/>
        </div>;
    }
}