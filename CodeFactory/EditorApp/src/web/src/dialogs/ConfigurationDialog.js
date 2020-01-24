import axios from 'axios';
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ModalDialog, { closeModal } from "../components/ModalDialog";
import Project from "../Project";

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
        if(project) {
            if (project.hasStartMethod())
                state.startMethod = project.value.startMethod;
            if (project.hasServerStartMethod())
                state.serverAboutToStartMethod = project.value.serverAboutToStartMethod;
            if (project.hasHomePage())
                state.homePage = project.value.homePage;
            if (project.hasResources()) {
                state.nativeResource = project.value.nativeResource;
                state.stubResource = project.value.stubResource;
            }
        }
        return state;
    }

    setConfigFromState(project) {
        if(project.hasStartMethod())
            project.value.startMethod = this.state.startMethod;
        if(project.hasServerStartMethod())
            project.value.serverAboutToStartMethod = this.state.serverAboutToStartMethod;
        if(project.hasHomePage())
            project.value.homePage = this.state.homePage;
        if(project.hasResources()) {
            project.value.nativeResource = this.state.nativeResource;
            project.value.stubResource = this.state.stubResource;
        }
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
        axios.get('/ws/run/fetchModuleDescription', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.saveConfig(response.data);
        });
    }

    saveConfig(data) {
        const project = new Project(data);
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
        return <ModalDialog>
            <Modal.Header closeButton={true}>
                <Modal.Title>Module configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    { project && project.hasStartMethod() &&
                    <FormGroup>
                        <ControlLabel>Select the start method for this application:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({startMethod: e.currentTarget.value})} value={this.state.startMethod || ""}/>
                    </FormGroup>
                    }
                    { project && project.hasServerStartMethod() &&
                    <FormGroup>
                        <ControlLabel>Select the method to run when server is launched:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({serverAboutToStartMethod: e.currentTarget.value})} value={this.state.serverAboutToStartMethod || ""}/>
                    </FormGroup>
                    }
                    { project && project.hasHomePage() &&
                    <FormGroup>
                        <ControlLabel>Select the home page:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({homePage: e.currentTarget.value})} value={this.state.homePage || ""}/>
                    </FormGroup>
                    }
                    { project && project.hasResources() &&
                    <FormGroup>
                        <ControlLabel>Select the native resource for this web library:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({nativeResource: e.currentTarget.value})} value={this.state.nativeResource || ""}/>
                    </FormGroup>
                    }
                    { project && project.hasResources() &&
                    <FormGroup>
                        <ControlLabel>Select the stub resource for this web library:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({stubResource: e.currentTarget.value})} value={this.state.stubResource || ""}/>
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
