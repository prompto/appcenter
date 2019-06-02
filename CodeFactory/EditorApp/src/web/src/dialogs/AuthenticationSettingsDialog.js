import axios from 'axios';
import React from 'react';
import { Modal, Button, Checkbox, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { ALL_AUTH_METHODS, NAME_TO_AUTH_METHOD_MAP } from "../authentication/AuthenticationMethods";
import { NAME_TO_AUTH_SOURCE_MAP } from "../authentication/AuthenticationSources";
import {closeModal} from "../components/ModalDialog";
import ModalDialog from "../components/ModalDialog";

export default class AuthenticationSettingsDialog extends React.Component {

    constructor(props) {
        super(props);
        const state = this.getStateFromSettings();
        this.state = { ...state, show: true };
        this.handleMethod = this.handleMethod.bind(this);
        this.handleSource = this.handleSource.bind(this);
        this.handleSkipAuthInDev = this.handleSkipAuthInDev.bind(this);
        this.handleWhiteList = this.handleWhiteList.bind(this);
        this.handleUseDefaultWhiteList = this.handleUseDefaultWhiteList.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    getProject() {
        return this.props.root.getProject().value;
    }

    getStateFromSettings() {
        const state = {};
        const settings = (this.getProject().authenticationSettings || {}).value || {};
        if(settings.authenticationMethod && settings.authenticationMethod.type) {
            state.method = NAME_TO_AUTH_METHOD_MAP[settings.authenticationMethod.type];
            state.method.setStateFromValue(settings.authenticationMethod.value, this.state);
        } else
            state.method = NAME_TO_AUTH_METHOD_MAP["NoAuthenticationMethod"];
        state.skipAuthInDev = settings.skipAuthInDev || false;
        if(settings.authenticationSource && settings.authenticationSource.type) {
            state.source = NAME_TO_AUTH_SOURCE_MAP[settings.authenticationSource.type];
            state.source.setStateFromValue(settings.authenticationSource.value, this.state);
        } else
            state.source = NAME_TO_AUTH_SOURCE_MAP["STORE"];
        state.useTestSourceInDev = settings.useTestSourceInDev || false;
        state.useDefaultWhiteList = settings.useDefaultWhiteList || false;
        state.whiteList = (settings.whiteList || {}).value || [];
        return state;
    }

    setSettingsFromState(settings) {
        if(this.state.method.typeName==="NoAuthenticationMethod") {
            settings.authenticationMethod = null;
            settings.authenticationSource = null;
        } else {
            // save method
            const method = settings.authenticationMethod || {};
            if(method.type!==this.state.method.typeName) {
                method.type = this.state.method.typeName;
                method.value = {}; // TODO cleanup orphans on server
            }
            this.state.method.setValueFromState(this.state, method.value);
            settings.authenticationMethod = method;
            // save source
            const source = settings.authenticationSource || {};
            if(source.type!==this.state.source.typeName) {
                source.type = this.state.source.typeName;
                source.value = {}; // TODO cleanup orphans on server
            }
            this.state.source.setValueFromState(this.state, source.value);
            settings.authenticationSource = source;
        }
        settings.skipAuthInDev = this.state.skipAuthInDev;
        settings.useTestSourceInDev = this.state.useTestSourceInDev;
        settings.useDefaultWhiteList = this.state.useDefaultWhiteList;
        settings.whiteList = { type: "Text[]", value: this.state.whiteList };
    }

    componentDidMount() {
        this.state.method.createDefaults(this);
        this.state.source.createDefaults(this);
    }

    handleMethod(e) {
        const typeName = e.currentTarget.value;
        const method = NAME_TO_AUTH_METHOD_MAP[typeName];
        method.createDefaults(this);
        this.setState({method: method});
    }

    handleSkipAuthInDev(e) {
        this.setState({skipAuthInDev: e.currentTarget.checked});
    }

    handleWhiteList(e) {
        const whiteList = e.target.value.split("\n");
        this.setState({whiteList: whiteList});
    }

    handleUseDefaultWhiteList(e) {
        this.setState({useDefaultWhiteList: e.currentTarget.checked});
    }


    handleSource(e) {
        const typeName = e.currentTarget.value;
        const source = NAME_TO_AUTH_SOURCE_MAP[typeName];
        source.createDefaults(this);
        this.setState({source: source});
    }

    handleSave() {
        // load latest full description before updating it
        const params = {
            params: JSON.stringify([{name: "dbId", value: this.props.root.projectId}, {
                name: "register",
                type: "Boolean",
                value: false
            }])
        };
        axios.get('/ws/run/getModuleDescription', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.saveSettings(response.data);
        });
    }

    saveSettings(project) {
        const settings = (project.value.authenticationSettings || {}).value || {};
        this.setSettingsFromState(settings);
        project.value.authenticationSettings = { type: "AuthenticationSettings", value: settings };
        const formData = new FormData();
        const params = [ {name: "module", type: project.type, value: project.value} ];
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/storeModule", formData)
            .then(response=>{
                this.props.root.loadDescription();
                closeModal();
            })
            .catch(error=>alert(error));
    }


    render() {
        const cleanName = this.getProject().name.toLowerCase().replace(/ /g, "-");
        const showWhiteList = this.state.method.typeName!=="NoAuthenticationMethod";
        return <ModalDialog >
            <Modal.Header closeButton={true}>
                <Modal.Title>Authentication settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>Select the authentication method for this application:</ControlLabel><br/>
                        <FormControl componentClass="select" defaultValue={this.state.method.typeName} onChange={this.handleMethod}>
                            { ALL_AUTH_METHODS.map(m=><option key={m.typeName} value={m.typeName}
                                                              disabled={m.disabled} >{m.label}</option>) }
                        </FormControl>
                    </FormGroup>
                    { this.state.method.typeName !== "NoAuthenticationMethod" &&
                    <FormGroup>
                        <Checkbox inline checked={this.state.skipAuthInDev} onChange={this.handleSkipAuthInDev}>Skip authentication for development</Checkbox>
                    </FormGroup>
                    }
                    { this.state.method.renderItems(this, false) }
                    { showWhiteList &&
                    <FormGroup>
                        <ControlLabel>List resources to <i>NOT</i> protect (white list) in this application:</ControlLabel><br/>
                        <FormControl componentClass="textarea" value={this.state.whiteList.join("\n")} onChange={this.handleWhiteList} />
                        <HelpBlock>List 1 resource per line.&nbsp;Valid resources are of the form:<br/>
                            &nbsp;-&nbsp;Exact resource name<br/>
                            &nbsp;-&nbsp;Path pattern such as: {cleanName} {String.raw`/auth/*`}<br/>
                            &nbsp;-&nbsp;Extension pattern such as: *.jpeg</HelpBlock>
                        <Checkbox inline checked={this.state.useDefaultWhiteList} onChange={this.handleUseDefaultWhiteList}>Also use default white list</Checkbox>
                    </FormGroup>
                    }
                 </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </ModalDialog>;
    }



}
