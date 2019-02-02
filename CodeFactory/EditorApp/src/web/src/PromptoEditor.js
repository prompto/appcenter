import React from 'react';
import AceEditor from 'react-ace';

/*eslint-disable no-alert, no-console */
import 'brace/theme/eclipse';
import 'brace/mode/text';
import PromptoMode from "./worker/PromptoMode";

export default class PromptoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.aceEditor = null;
        this.setContent = this.setContent.bind(this);
        this.codeEdited = this.codeEdited.bind(this);
        this.state = {display: "block", value: ""};
    }

    componentDidMount() {
        const session = this.aceEditor.editor.getSession();
        session.setMode(new PromptoMode());
        session.setUseWorker(true);
    }

    setContent(content) {
        const display = (content && content.type==="prompto") ? "block" : "none";
        this.setState({display: display});
    }

    codeEdited(newValue) {
        this.setState({value: newValue});
        // this.props.codeEdited(newValue);
    }

    render() {
        const style = {display: this.state.display};
        return <div className="editor" style={style} >
                <AceEditor ref={ref=>this.aceEditor=ref} name="prompto-editor"
                           theme="eclipse" mode="text"
                           value={this.state.value} onChange={this.textEdited}
                           width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }} />
            </div>;
    }

}