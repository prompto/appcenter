import axios from 'axios';
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ModalDialog, { closeModal } from "../components/ModalDialog";

export default class ConfigurationDialog extends React.Component {

    constructor(props) {
        super(props);
        const state = this.getStateFromConfig();
        this.state = { ...state };
        this.handleSave = this.handleSave.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
    }

    getProject() {
        return this.props.root.getProject();
    }

    getProjectValue() {
        return this.getProject().value;
    }

    getStateFromConfig() {
        const state = {};
        const project = this.getProject();
        const hasStartMethod = project.type==="Batch";
        const hasServerStartMethod = project.type==="Service" || project.type==="WebSite";
        const hasHomePage = project && project.type==="WebSite";
        if(hasStartMethod)
            state.startMethod = project.value.startMethod;
        if(hasServerStartMethod)
            state.serverAboutToStartMethod = project.value.serverAboutToStartMethod;
        if(hasHomePage)
            state.homePage = project.value.homePage;
        return state;
    }

    setConfigFromState(project) {
        const hasStartMethod = project.type==="Batch";
        const hasServerStartMethod = project.type==="Service" || project.type==="WebSite";
        const hasHomePage = project && project.type==="WebSite";
        if(hasStartMethod)
            project.value.startMethod = this.state.startMethod;
        if(hasServerStartMethod)
            project.value.serverAboutToStartMethod = this.state.serverAboutToStartMethod;
        if(hasHomePage)
            project.value.homePage = this.state.homePage;
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
                this.saveConfig(response.data);
        });
    }

    saveConfig(project) {
        this.setConfigFromState(project);
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
        const project = this.getProject();
        const hasStartMethod = project.type==="Batch";
        const hasServerStartMethod = project.type==="Service" || project.type==="WebSite";
        const hasHomePage = project && project.type==="WebSite";
        return <ModalDialog>
            <Modal.Header closeButton={true}>
                <Modal.Title>Module configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    { hasStartMethod &&
                    <FormGroup>
                        <ControlLabel>Select the start method for this application:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({startMethod: e.currentTarget.value})} value={this.state.startMethod || ""}/>
                    </FormGroup>
                    }
                    { hasServerStartMethod &&
                    <FormGroup>
                        <ControlLabel>Select the method to run when server is launched:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({serverAboutToStartMethod: e.currentTarget.value})} value={this.state.serverAboutToStartMethod || ""}/>
                    </FormGroup>
                    }
                    { hasHomePage &&
                    <FormGroup>
                        <ControlLabel>Select the home page:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({homePage: e.currentTarget.value})} value={this.state.homePage || ""}/>
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
