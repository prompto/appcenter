import axios from 'axios';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalDialog, closeModal } from '../components/ModalDialog';


export default class TagProjectDialog extends React.Component {


    tagModule() {
        const module = this.props.module;
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}]) };
        axios.get('/ws/run/tagModule',  { params: params }).then(resp => {
            closeModal();
            this.props.moduleTagged(module);
        });
    }

   render() {
        return <ModalDialog>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Tag project?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tagging a project makes it eligible for deployment.<br/>
                    A tagged project can no longer be modified.<br/><br/>
                    { "Tag project '" + this.props.module.value.name + "'?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={closeModal}>Cancel</Button>
                    <Button onClick={this.tagModule.bind(this)}>Tag</Button>
                </Modal.Footer>
        </ModalDialog>;
    }
}