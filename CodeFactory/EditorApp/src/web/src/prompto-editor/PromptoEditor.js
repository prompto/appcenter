import React from 'react';
import AceEditor from 'react-ace';

/*eslint-disable no-alert, no-console */
import 'brace/theme/eclipse';
import 'brace/mode/text';
import PromptoMode from "./PromptoMode";

export default class PromptoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.aceEditor = null;
        this.getSession = this.getSession.bind(this);
        this.setContent = this.setContent.bind(this);
        this.codeEdited = this.codeEdited.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.state = {display: "block", value: ""};
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

    setContent(content) {
        const display = (content && content.type.toLowerCase()==="prompto") ? "block" : "none";
        this.setState({display: display});
        if(display==="block") {
            const session = this.getSession();
            session.getMode().setContent(content)
            session.setScrollTop(0);
            this.getEditor().setReadOnly(content ? content.core : false);
        }
    }

    runMethod(content, runMode) {
        this.getSession().getMode().runMethod(content, runMode);
    }

    fetchRunnablePage(content, andThen) {
        this.getSession().getMode().fetchRunnablePage(content, andThen);
    }

    done() {
        this.props.done();
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

    prepareCommit() {
        this.getSession().getMode().prepareCommit();
    }

    commitPrepared(declarations) {
        this.props.commitPrepared(declarations);
    }

    commitFailed() {
        this.getSession().getMode().commitFailed();
    }

    commitSuccessful() {
        this.getSession().getMode().commitSuccessful();
    }

    render() {
        const style = {display: this.state.display};
        return <div className="editor" style={style} >
                <AceEditor ref={ref=>{if(ref)this.aceEditor=ref;}} name="prompto-editor"
                           theme="eclipse" mode="text"
                           value={this.state.value} onChange={this.codeEdited}
                           width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }} />
            </div>;
    }

}