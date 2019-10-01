import axios from 'axios';
import React from 'react';
import { Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { ID_TO_TYPE_MAP } from '../project-types/ProjectTypes';
import { ModalDialog, closeModal } from '../components/ModalDialog';

export default class ModifyProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.type = ID_TO_TYPE_MAP[this.props.module.type];
        this.handleSave = this.handleSave.bind(this);
        this.saveModule = this.saveModule.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {show: true, name: this.props.module.value.name, description: this.props.module.value.description};
    }

    handleSave() {
        // load latest full description before updating
        const dbId = (this.props.module.value.dbId.value || this.props.module.value.dbId).toString();
        const params = {
            params: JSON.stringify([{name: "dbId", value: dbId}, {
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
                this.saveModule(response.data);
        });
    }

    saveModule(module) {
        module.value.name = this.state.name;
        module.value.description = this.state.description;
        this.type.updateModule(module);
        const formData = new FormData();
        const params = [ {name: "module", type: module.type, value: module.value} ];
        formData.append("params", JSON.stringify(params));
        this.type.appendFormParameters(formData, true);
        axios.post("/ws/run/storeModule", formData).then(response=>{
            closeModal();
            this.props.moduleUpdated();
        }).catch(error=>alert(error));
    }


    handleName(e) {
        const name = e.currentTarget.value;
        this.setState( { name: name } );
    }

    handleDescription(e) {
        const description = e.currentTarget.value;
        this.setState( { description: description } );
    }

    render() {
        return <ModalDialog dialogClassName="rename-project-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>Modify project</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{padding: "8px"}}>
                <form style={{margin: "8px"}}>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel><br/>
                        <FormControl type="text" id="name" value={this.state.name} onChange={this.handleName}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel><br/>
                        <FormControl type="text" id="description" value={this.state.description} onChange={this.handleDescription}/>
                    </FormGroup>
                    { this.type.renderParameters(this, true) }
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </ModalDialog>;
    }


}