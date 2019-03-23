import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';
import ModalDialog, { closeModal } from "../components/ModalDialog";

export default class RenameResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        const resourceName = this.props.resource.value.name;
        const idx1 = resourceName.indexOf("/");
        const folder = resourceName.substring(0, idx1);
        const idx2 = resourceName.lastIndexOf(".");
        const name = resourceName.substring(idx1 + 1, idx2);
        const extension = resourceName.substring(idx2 + 1);
        this.state = {show: true, folder: folder, name: name, extension: extension};
        this.handleFolder = this.handleFolder.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleExtension = this.handleExtension.bind(this);
        this.handleRename = this.handleRename.bind(this);
    }

    render() {
        return <ModalDialog bsSize="large" dialogClassName="rename-resource-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>Rename resource</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>Enter the new unique path for this resource:</ControlLabel><br/>
                        <InputGroup>
                            <FormControl type="text" value={this.state.folder} style={{width: 245}} onChange={this.handleFolder}/>
                            <InputGroup.Addon>/</InputGroup.Addon>
                            <FormControl type="text" value={this.state.name} style={{width: 245}} onChange={this.handleName}/>
                            <InputGroup.Addon>.</InputGroup.Addon>
                            <FormControl type="text" value={this.state.extension} style={{width: 80}} onChange={this.handleExtension}/>
                        </InputGroup>
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleRename}>Rename</Button>
            </Modal.Footer>
        </ModalDialog>;
    }

    handleFolder(event) {
        this.setState({ folder: event.target.value });
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleExtension(event) {
        this.setState({ extension: event.target.value });
    }

    handleRename(event) {
        const path = this.state.folder + "/" + this.state.name + "." + this.state.extension;
        this.props.root.renameResource(this.props.resource, path);
        closeModal();
    }

}
