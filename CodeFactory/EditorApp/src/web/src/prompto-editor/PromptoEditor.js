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
        this.state = {display: "block", value: ""};
    }

    getSession() {
        return this.aceEditor.editor.getSession();
    }

    componentDidMount() {
        const session = this.getSession();
        session.setMode(new PromptoMode(this));
        session.setUseWorker(true);
    }

    setProject(dbId, loadDependencies) {
        var mode = this.getSession().getMode();
        mode.setProject(dbId, loadDependencies);

    }

    setContent(content) {
        const display = (content && content.type==="prompto") ? "block" : "none";
        this.setState({display: display});
    }

    codeEdited(newValue) {
        this.setState({value: newValue});
        // this.props.codeEdited(newValue);
    }

    catalogUpdated(catalog) {
        this.props.catalogUpdated(catalog);
    }

    render() {
        const style = {display: this.state.display};
        return <div className="editor" style={style} >
                <AceEditor ref={ref=>this.aceEditor=ref} name="prompto-editor"
                           theme="eclipse" mode="text"
                           value={this.state.value} onChange={this.codeEdited}
                           width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }} />
            </div>;
    }

}