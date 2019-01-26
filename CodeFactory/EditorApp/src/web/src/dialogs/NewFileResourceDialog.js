import { getParam } from '../code/Utils';
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';
import DroppedFileWidget from "../components/DroppedFileWidget";

export default class NewFileResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        const cleanName = getParam("name").toLowerCase().replace(/ /g, "-");
        this.state = {show: true, folder: cleanName, name: "", file: null};
        this.handleClose = this.handleClose.bind(this);
        this.handleFolder = this.handleFolder.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }

    render() {
        const droppedWidgetStyle = {
            display: 'inline-flex',
            border: '1px solid lightgray',
            height: '650px',
            width: '650px',
            padding: '20px',
            alignItems: 'center',
            justifyContent: 'center'
        };

        return <Modal show={this.state.show} onHide={this.handleClose} bsSize="large" dialogClassName="new-file-resource-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>New {this.props.type.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>Enter the unique path for this resource:</ControlLabel><br/>
                        <InputGroup>
                            <FormControl type="text" value={this.state.folder} style={{width:245}} onChange={this.handleFolder}/>
                            <InputGroup.Addon>/</InputGroup.Addon>
                            <FormControl type="text" value={this.state.name} style={{width:374}} onChange={this.handleName} placeholder={this.props.type.label} />
                        </InputGroup>
                    </FormGroup>
                </form>
                <DroppedFileWidget onDrop={this.handleDrop} style={droppedWidgetStyle}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button id="btnCreate" bsStyle="primary" onClick={this.handleCreate}>Create</Button>
            </Modal.Footer>
        </Modal>;
    }

    handleDrop(file) {
        this.setState({ file: file, name: file.name });
    }

    handleFolder(event) {
        this.setState({ folder: event.target.value });
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleCreate(event) {
        const path = this.state.folder + "/" + this.state.name;
        const resource = this.props.type.createBinaryResource(path, this.state.file)
        this.props.root.addResource(resource);
        this.handleClose();
    }

}

