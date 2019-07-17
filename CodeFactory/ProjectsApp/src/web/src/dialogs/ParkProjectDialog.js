import axios from 'axios';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalDialog, closeModal } from '../components/ModalDialog';


export default class ParkProjectDialog extends React.Component {


    parkModule() {
        const module = this.props.module;
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}]) };
        axios.get('/ws/run/parkModule',  { params: params }).then(resp => {
            closeModal();
            this.props.moduleParked(module);
        });
    }

   render() {
        return <ModalDialog>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Park project?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { "Park project " + this.props.module.value.name + "?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={closeModal}>Cancel</Button>
                    <Button onClick={this.parkModule.bind(this)}>Park</Button>
                </Modal.Footer>
        </ModalDialog>;
    }
}