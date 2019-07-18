import axios from 'axios';
import React from 'react';
import { Modal, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { ModalDialog, closeModal } from '../components/ModalDialog';

export default class NewVersionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {version: '1.0.0'};
        this.handleVersion = this.handleVersion.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleVersion(evt) {
        const text = evt.currentTarget.value;
        this.setState({version: text});
    }

    handleCreate() {
        const module = this.props.module;
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}, {"name": "version", "value": this.state.version}]) };
        axios.get('/ws/run/newModuleVersion',  { params: params }).then(resp => {
            closeModal();
            this.props.versionCreated(module);
        });

    }

    render() {
        const module = this.props.module.value;
        return <ModalDialog dialogClassName="new-version-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>New version</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{padding: "8px"}}>
                <form style={{margin: "8px"}}>
                    <FormGroup>
                        <ControlLabel>Project</ControlLabel><br/>
                        <FormControl type="text" id="version" value={module.name} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Current version</ControlLabel><br/>
                        <FormControl type="text" id="version" value={module.version.value} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>New version</ControlLabel><br/>
                        <FormControl type="text" id="version" value={this.state.version} onChange={this.handleVersion}/>
                    </FormGroup>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button>
            </Modal.Footer>
        </ModalDialog>;
    }


}