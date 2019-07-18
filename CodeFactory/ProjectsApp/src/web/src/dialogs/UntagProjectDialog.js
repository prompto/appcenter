import axios from 'axios';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalDialog, closeModal } from '../components/ModalDialog';


export default class UntagProjectDialog extends React.Component {


    untagModule() {
        const module = this.props.module;
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}]) };
        axios.get('/ws/run/untagModule',  { params: params }).then(resp => {
            closeModal();
            this.props.moduleUntagged(module);
        });
    }

   render() {
        return <ModalDialog>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Untag project?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Untagging and modifying a deployed project may affect its stability.<br/>
                    The recommended approach is to create a new version from the tagged one.<br/><br/>
                    { "Do you really want to untag project '" + this.props.module.value.name + "'?"}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={closeModal}>Cancel</Button>
                    <Button onClick={this.untagModule.bind(this)}>Untag</Button>
                </Modal.Footer>
        </ModalDialog>;
    }
}