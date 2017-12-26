const { Modal, Button, FormGroup, ControlLabel, InputGroup, FormControl } = ReactBootstrap;
const DroppedFileWidget = widgets.DroppedFileWidget.default;

class NewFileResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        let cleanName = getParam("name").replace(/ /g, "_");
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
                <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button>
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


class NewTextResourceDialog extends React.Component {

    constructor(props) {
        super(props);
        let cleanName = getParam("name").replace(/ /g, "_");
        this.state = {show: true, folder: cleanName, name: '', extension: this.props.type.id.toLowerCase()};
        this.handleClose = this.handleClose.bind(this);
        this.handleFolder = this.handleFolder.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleExtension = this.handleExtension.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
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
                            <FormGroup>
                                <ControlLabel>Enter the unique path for this resource:</ControlLabel><br/>
                                <InputGroup>
                                    <FormControl type="text" value={this.state.folder} style={{width: 245}} onChange={this.handleFolder}/>
                                    <InputGroup.Addon>/</InputGroup.Addon>
                                    <FormControl type="text" value={this.state.name} style={{width: 245}} onChange={this.handleName} placeholder={this.props.type.placeholder}/>
                                    <InputGroup.Addon>/</InputGroup.Addon>
                                    <FormControl type="text" value={this.state.extension} style={{width: 80}} onChange={this.handleExtension} placeholder={this.props.type.id}/>
                                </InputGroup>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button>
                    </Modal.Footer>
                </Modal>;
    }

    handleFolder(event) {
        this.state.folder = event.target.value;
    }

    handleName(event) {
        this.state.name = event.target.value;
    }

    handleExtension(event) {
        this.state.extension = event.target.value;
    }

    handleCreate(event) {
        const path = this.state.folder + "/" + this.state.name + "." + this.state.extension;
        const resource = this.props.type.createTextResource(path)
        this.props.root.addResource(resource);
        this.handleClose();
    }

}
