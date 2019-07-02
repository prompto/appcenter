import axios from 'axios';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalDialog, closeModal } from '../components/ModalDialog';


export default class DeleteProjectDialog extends React.Component {


    deleteModule() {
        const module = this.props.module;
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}]) };
        axios.get('/ws/run/deleteModule',  { params: params }).then(resp => {
            closeModal();
            this.props.moduleDeleted(module);
        });
    }

   render() {
        return <ModalDialog>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Delete project?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { "Delete project " + this.props.module.value.name + "?"}<br/>
                    This cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={closeModal}>Cancel</Button>
                    <Button onClick={this.deleteModule.bind(this)}>Delete forever</Button>
                </Modal.Footer>
        </ModalDialog>;
    }
}