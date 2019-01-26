import { getParam } from '../code/Utils';
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock } from 'react-bootstrap';

export default class NewTextResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        const cleanName = getParam("name").toLowerCase().replace(/ /g, "-");
        const typeState = this.props.type.getInitialState();
        this.state = Object.assign(typeState, {show: true, folder: cleanName, name: '', extension: this.props.type.id.toLowerCase(), canCreate: false});
        this.handleClose = this.handleClose.bind(this);
        this.handleFolder = this.handleFolder.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleExtension = this.handleExtension.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
        this.getValidationMessage = this.getValidationMessage.bind(this);
        this.checkValidationState = this.checkValidationState.bind(this);
    }

    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }


    render() {
        return <Modal show={this.state.show} onHide={this.handleClose} bsSize="large"
                      dialogClassName="new-text-resource-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>New {this.props.type.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup validationState={this.getValidationState()}>
                        <ControlLabel>Enter the unique path for this resource:</ControlLabel><br/>
                        <InputGroup>
                            <FormControl id="folder" type="text" value={this.state.folder} style={{width: 245}} onChange={this.handleFolder}/>
                            <InputGroup.Addon>/</InputGroup.Addon>
                            <FormControl id="name" type="text" value={this.state.name} style={{width: 245}} onChange={this.handleName} placeholder={this.props.type.placeholder}/>
                            <InputGroup.Addon>.</InputGroup.Addon>
                            <FormControl id="extension" type="text" value={this.state.extension} style={{width: 80}} onChange={this.handleExtension} placeholder={this.props.type.id}/>
                        </InputGroup>
                        <HelpBlock>{this.getValidationMessage()}</HelpBlock>
                    </FormGroup>
                    { this.props.type.renderFormControls(this) }
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button id="btnCreate" bsStyle="primary" disabled={!this.state.canCreate} onClick={this.handleCreate}>Create</Button>
            </Modal.Footer>
        </Modal>;
    }

    getValidationState() {
        return this.state.canCreate ? "success" : "error";
    }

    getValidationMessage() {
        if(this.state.canCreate)
            return "";
        if(this.state.folder.length===0)
            return "Folder is mandatory";
        if(this.state.name.length===0)
            return "Name is mandatory";
        if(this.state.extension.length===0)
            return "Extension is mandatory";
        const resourceName = this.state.folder + "/" + this.state.name + "." + this.state.extension;
        return "A resource named '" + resourceName + "' already exists.";
    }

    checkValidationState() {
        const catalog = this.props.root.catalog;
        const resourceName = this.state.folder + "/" + this.state.name + "." + this.state.extension;
        const canCreate = this.state.folder.length > 0 && this.state.name.length > 0 && this.state.extension.length > 0 && !catalog.resourceExists(resourceName);
        this.setState({canCreate: canCreate});
    }

    handleFolder(event) {
        this.setState({ folder: event.target.value }, this.checkValidationState);
    }

    handleName(event) {
        this.setState({ name: event.target.value }, this.checkValidationState);
    }

    handleExtension(event) {
        this.setState({ extension: event.target.value }, this.checkValidationState);
    }

    handleCreate(event) {
        this.props.type.createResources(this.state, this.props.root.addResource, this.props.root.addCode)
        this.handleClose();
    }

}

