import React from 'react';
import AceEditor from 'react-ace';
import Activity from '../utils/Activity';
/*eslint-disable no-alert, no-console */
import 'brace/theme/eclipse';
import 'brace/mode/text';
import 'brace/mode/html';
import 'brace/mode/yaml';
import 'brace/mode/xml';
import 'brace/mode/css';
import 'brace/mode/json';
import 'brace/mode/javascript';
import 'brace/mode/jsx';

import { ID_TO_TYPE_MAP, TEXT_RESOURCE_TYPES } from '../resource-types/ResourceTypes';

const TextTypes = new Set(TEXT_RESOURCE_TYPES.map(t=>t.id));

export default class ResourceEditor extends React.Component {

    constructor(props) {
        super(props);
        this.aceEditor = null;
        this.setContent = this.setContent.bind(this);
        this.textEdited = this.textEdited.bind(this);
        this.state = {display: "none", name: "", value: ""};
    }

    setContent(content) {
        const editor = this.aceEditor.editor;
        const session = editor.getSession();
        const currentModeId = this.currentModeId();
        const newModeId = this.computeModeId(content);
        if(newModeId && currentModeId !== newModeId) {
            session.setMode("ace/mode/" + newModeId);
            session.setUseWorker(true);
        }
        if(newModeId!=null) {
            editor.setValue(content.body, -1);
            session.setScrollTop(0);
        }
        editor.setReadOnly(this.props.activity===Activity.Debugging);
        // re-display
        const display = this.computeDisplay(content);
        this.setState({display: display, name: content.name, value: content.body});
    }

    currentModeId() {
        const aceModeId = this.aceEditor.editor.getSession().getMode().$id;
        return aceModeId.split("/")[2];
    }

    computeModeId(content) {
        if(content && TextTypes.has(content.type)) {
            const type = ID_TO_TYPE_MAP[content.type];
            return type.aceMode;
        } else
            return null;
    }

    computeDisplay(content) {
        if(content && TextTypes.has(content.type))
            return "block";
        else
            return "none";
    }

    textEdited(newValue) {
        this.setState({value: newValue});
        this.props.textEdited(newValue);
    }

    render() {
        const style = {display: this.state.display};
        return <div className="resource-editor-wrapper" style={style} >
                <div className="ace-editor-wrapper">
                    <AceEditor ref={ref=>this.aceEditor=ref} name="resource-editor"
                               theme="eclipse" mode="text"
                               value={this.state.value} onChange={this.textEdited}
                               width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }}  />
                </div>
                <div id="resource-name">{this.state.name}</div>
            </div>;
    }

}