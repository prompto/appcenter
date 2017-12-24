const { Modal, Button, FormGroup, ControlLabel, ToggleButtonGroup, FormControl, Radio } = ReactBootstrap;
const DroppedFileWidget = widgets.DroppedFileWidget.default;

class NewModuleTypeButton extends React.Component {

    render() {
        let style = { width: "100px", height: "130px", boxSizing: "content-box", textAlign: "center", marginLeft: "4px", marginRight: "4px", marginTop: "2px", marginBottom: "10px", float: "left"};
        if(this.props.active)
            style = { ...style, borderStyle: "solid",  borderRadius: "10%", borderColor: "lightsteelblue", borderWidth: "medium", marginTop: "0px", marginLeft: "2px", marginRight: "2px"};
        return <Thumbnail id={this.props.id} src={this.props.image} onClick={this.props.click} style={style}>
                    <p><strong>{this.props.title}</strong></p>
               </Thumbnail>;
    }
}

class LibraryParameters extends React.Component {

    render() {
        return null;
    }
}

class ScriptParameters extends React.Component {

    render() {
        return null;
    }
}

class OptionalInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleCreate(create) {
        this.props.handleCreate(create);
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.props.handleName(name);
    }


    render() {
        return <FormGroup>
            <ControlLabel>{this.props.label}</ControlLabel>
            <div style={{marginBottom: 5}}>
                <Radio inline name={this.props.name + "-radio"} checked={this.props.create} onChange={()=>this.handleCreate(true)}>Create new</Radio>
                <Radio inline name={this.props.name + "-radio"} checked={!this.props.create} onChange={()=>this.handleCreate(false)}>Use existing</Radio>
            </div>
            <FormControl type="text" placeholder={this.props.placeHolder} readOnly={this.props.create} onChange={this.handleName} value={this.props.value || ""}/>
        </FormGroup>;
    }

}

class BatchParameters extends React.Component {

    constructor(props) {
        super(props);
        this.startMethodLabel = "Start method:";
        this.handleCreateStart = this.handleCreateStart.bind(this);
        this.handleStartMethod = this.handleStartMethod.bind(this);
    }

    handleCreateStart(create) {
        this.props.dialog.setState( { createStart: create } );
    }

    handleStartMethod(name) {
        this.props.dialog.setState( { startMethod: name } );
    }

    render() {
        const dialog = this.props.dialog;
        const moduleName = dialog.state.name || "";
        const cleanName = moduleName.replace(/ /g, "_");
        const placeHolderName = "main_" + cleanName;
        const methodName = dialog.state.startMethod;
        return <OptionalInput name="method" label={this.startMethodLabel} create={dialog.state.createStart} placeHolder={placeHolderName} value={methodName}
                              handleCreate={this.handleCreateStart} handleName={this.handleStartMethod} />
    }

}

class ServiceParameters extends BatchParameters {

    constructor(props) {
        super(props);
        this.startMethodLabel = "Server about to start method:";
    }

}

class WebSiteParameters extends ServiceParameters {

    constructor(props) {
        super(props);
        this.handleCreateHome = this.handleCreateHome.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
    }

    handleCreateHome(create) {
        this.props.dialog.setState( { createHome: create } );
    }

    handleHomePage(name) {
        this.props.dialog.setState( { homePage: name } );
    }

    render() {
        const dialog = this.props.dialog;
        const moduleName = dialog.state.name || "";
        const cleanName = moduleName.replace(/ /g, "_");
        const placeHolderName = "main_" + cleanName;
        const methodName = dialog.state.startMethod;
        return <div>
                <OptionalInput name="method" label={this.startMethodLabel} create={dialog.state.createStart} placeHolder={placeHolderName} value={methodName}
                              handleCreate={this.handleCreateStart} handleName={this.handleStartMethod} />
                <OptionalInput name="home" label="Home page:" create={dialog.state.createHome} placeHolder={ cleanName + "/index.html" }
                               handleCreate={this.handleCreateHome} handleName={this.handleHomePage} />
                </div>;
    }

}

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleModuleType = this.handleModuleType.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDropIcon = this.handleDropIcon.bind(this);
        this.state = { show: true, type: "website", name: null, description: null, iconFile: null, createStart: true, startMethod: null, createHome: true, homePage: null };
    }

    handleCreate() {
        const formData = new FormData();
        let image = null;
        if(this.state.iconFile) {
            image = { mimeType: this.state.iconFile.type, partName: "@" + this.state.iconFile.name };
            formData.append(image.partName, this.state.iconFile);
        }
        const params = [
            {name: "type", type: "Text", value: this.state.type},
            {name: "name", type: "Text", value: this.state.name},
            {name: "description", type: "Text", value: this.state.description},
            {name: "image", type: "Image", value: image},
            {name: "createStart", type: "Boolean", value: this.state.createStart},
            {name: "startMethod", type: "Text", value: this.state.startMethod},
            {name: "createHome", type: "Boolean", value: this.state.createHome},
            {name: "homePage", type: "Text", value: this.state.homePage}
        ];
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/createModule", formData).then(response=>{
            this.props.viewer.fetchRecentModules();
            this.props.viewer.fetchAllModules();
        }).catch(error=>alert(error));
        this.handleClose();
    }


    handleModuleType(e) {
        const type = e.currentTarget.id;
        this.setState( { type: type } );
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.setState( { name: name } );
    }

    handleDescription(e) {
        const description = e.currentTarget.value;
        this.setState( { description: description } );
    }

    handleDropIcon(file) {
        this.setState( { iconFile: file } );
    }

    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }

    render() {
        const type = this.state.type;
        const widgetStyle = {
            display: 'inline-flex',
            border: '1px solid lightgray',
            height: '160px',
            width: '160px',
            padding: '20px',
            alignItems: 'center',
            justifyContent: 'center'
        };

        return <Modal show={this.state.show} onHide={this.handleClose} bsSize="large" dialogClassName="new-project-dialog">
                <Modal.Header closeButton={true}>
                    <Modal.Title>New project</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{padding: "8px"}}>
                    <form>
                        <FormGroup style={{marginBottom: "0px"}}>
                            <ControlLabel>Type</ControlLabel><br/>
                            <ToggleButtonGroup name={"project-type"}>
                                <NewModuleTypeButton id="website" image="/img/website.jpg" title="Web site" click={this.handleModuleType} active={type==="website"}/>
                                <NewModuleTypeButton id="service" image="/img/service.jpg" title="Web service" click={this.handleModuleType} active={type==="service"}/>
                                <NewModuleTypeButton id="library" image="/img/library.jpg" title="Library" click={this.handleModuleType} active={type==="library"}/>
                                <NewModuleTypeButton id="batch" image="/img/batch.jpg" title="Batch" click={this.handleModuleType} active={type==="batch"}/>
                                <NewModuleTypeButton id="script" image="/img/script.jpg" title="Script" click={this.handleModuleType} active={type==="script"}/>
                            </ToggleButtonGroup>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel><br/>
                            <FormControl type="text" id="name" placeholder="Enter project name" onChange={this.handleName}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel><br/>
                            <FormControl type="text" id="description" placeholder="Enter project description" onChange={this.handleDescription}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Icon</ControlLabel><br/>
                            <DroppedFileWidget onDrop={this.handleDropIcon} style={widgetStyle}/>
                        </FormGroup>
                        { type==="script" && <ScriptParameters dialog={this}/> }
                        { type==="library" && <LibraryParameters  dialog={this}/> }
                        { type==="batch" && <BatchParameters  dialog={this}/> }
                        { type==="service" && <ServiceParameters  dialog={this}/> }
                        { type==="website" && <WebSiteParameters  dialog={this}/> }
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button>
                </Modal.Footer>
            </Modal>;
    }

}

