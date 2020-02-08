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
        this.setContent = this.setContent.bind(this);
        this.textEdited = this.textEdited.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.state = {display: "none", name: "", value: ""};
    }


    getEditor() {
        return this.refs.AceEditor.editor;
    }

    getSession() {
        return this.getEditor().getSession();
    }

    componentDidMount() {
        const editor = this.getEditor();
        editor.commands.addCommand({
            name: "commit",
            bindKey: { win: "Ctrl-S", mac: "Command-S" },
            exec: this.commitAndReset
        });
    }

    commitAndReset() {
        this.props.commitAndReset();
        return true;
    }

    setContent(content) {
        const editor = this.getEditor();
        const session = this.getSession();
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
        const aceModeId = this.getSession().getMode().$id;
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
                    <AceEditor ref="AceEditor" name="resource-editor"
                               theme="eclipse" mode="text"
                               value={this.state.value} onChange={this.textEdited}
                               width="100%" height="100%" editorProps={{ $blockScrolling: Infinity }}  />
                </div>
                <div id="resource-name">{this.state.name}</div>
            </div>;
    }

}