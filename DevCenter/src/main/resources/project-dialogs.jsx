const { Modal, Button, FormGroup, ControlLabel, ToggleButtonGroup, FormControl, Radio } = ReactBootstrap;
const DroppedFileWidget = widgets.DroppedFileWidget.default;

class ProjectType {

    constructor(id, title, image, createMethod) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.createMethod = createMethod;
    }

    renderParameters(dialog) {
        return null;
    }

    appendFormParameters(formData) {
    }

    appendPromptoParameters(list) {
        return list;
    }
}

class ScriptType extends ProjectType {

    constructor() {
        super("script", "Script", "/img/script.jpg", "createScript");
    }
}

class LibraryType extends ProjectType {

    constructor() {
        super("library", "Library", "/img/library.jpg", "createLibrary");
    }
}

class BatchType extends ProjectType {

    constructor() {
        super("batch", "Batch", "/img/batch.jpg", "createBatch");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog) {
        return <BatchParameters ref={ref=>this.params=ref} dialog={dialog}/>;
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        const params = [
            {name: "createStart", type: "Boolean", value: state.createStart},
            {name: "startMethod", type: "Text", value: state.startMethod}
        ];
        return list.concat(params);
    }

}


class WebServiceType extends ProjectType {

    constructor() {
        super("service", "Web service", "/img/service.jpg", "createService");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog) {
        return <ServiceParameters ref={ref=>this.params=ref} dialog={dialog}/>;
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        const params = [
            {name: "createStart", type: "Boolean", value: state.createStart},
            {name: "serverAboutToStartMethod", type: "Text", value: state.startMethod}
        ];
        return list.concat(params);
    }

}



class WebSiteType extends ProjectType {

    constructor() {
        super("website", "Web site", "/img/website.jpg", "createWebSite");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
        this.appendFormParameters = this.appendFormParameters.bind(this);
    }

    renderParameters(dialog) {
        return <WebSiteParameters ref={ref=>this.params=ref} dialog={dialog} />;
    }

    appendFormParameters(formData) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            formData.append(partName, state.iconFile);
        }
    }

    appendPromptoParameters(list) {
        super.appendPromptoParameters(list);
        const state = this.params.state;
        let image = null;
        if(state.iconFile) {
            const partName = "@" + state.iconFile.name;
            image = { mimeType: state.iconFile.type, partName: partName };
        };
        const params = [
            {name: "image", type: "Image", value: image},
            {name: "createStart", type: "Boolean", value: state.createStart},
            {name: "serverAboutToStartMethod", type: "Text", value: state.startMethod},
            {name: "createHome", type: "Boolean", value: state.createHome},
            {name: "homePage", type: "Text", value: state.homePage}
        ];
        return list.concat(params);

    }
}



const ALL_PROJECT_TYPES = [new WebSiteType(), new WebServiceType(), new LibraryType(), new BatchType(), new ScriptType()];

class NewModuleTypeButton extends React.Component {

    render() {
        let style = { width: "100px", height: "130px", boxSizing: "content-box", textAlign: "center", marginLeft: "4px", marginRight: "4px", marginTop: "2px", marginBottom: "10px", float: "left"};
        if(this.props.active)
            style = { ...style, borderStyle: "solid",  borderRadius: "10%", borderColor: "lightsteelblue", borderWidth: "medium", marginTop: "0px", marginLeft: "2px", marginRight: "2px"};
        const projectType = this.props.projectType;
        return <Thumbnail src={projectType.image} onClick={()=>this.props.onClick(projectType)} style={style}>
                    <p><strong>{projectType.title}</strong></p>
               </Thumbnail>;
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
        this.state = { createStart: true, startMethod: ""}
    }

    handleCreateStart(create) {
        this.setState( { createStart: create } );
    }

    handleStartMethod(name) {
        this.setState( { startMethod: name } );
    }

    render() {
        const cleanName = (this.props.dialog.state.name || "").replace(/ /g, "_");
        const placeHolder = "main_" + cleanName;
        return <OptionalInput name="method" label={this.startMethodLabel} create={this.state.createStart} placeHolder={placeHolder} value={this.state.startMethod}
                              handleCreate={this.handleCreateStart} handleName={this.handleStartMethod} />
    }

}

class ServiceParameters extends BatchParameters {

    constructor(props) {
        super(props);
        this.startMethodLabel = "Server about to start method:";
    }

}

const widgetStyle = {
    display: 'inline-flex',
    border: '1px solid lightgray',
    height: '160px',
    width: '160px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center'
};

class WebSiteParameters extends ServiceParameters {

    constructor(props) {
        super(props);
        this.handleDropIcon = this.handleDropIcon.bind(this);
        this.handleCreateHome = this.handleCreateHome.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
        this.state = { ...this.state, iconFile: null, createHome: true, homePage: "" };
    }

    handleDropIcon(file) {
        this.setState( { iconFile: file } );
    }

    handleCreateHome(create) {
        this.setState( { createHome: create } );
    }

    handleHomePage(name) {
        this.setState( { homePage: name } );
    }

    render() {
        const cleanName = (this.props.dialog.state.name || "").replace(/ /g, "_");
        const placeHolder = cleanName + "/index.html";
        return <div>
                <FormGroup>
                    <ControlLabel>Icon</ControlLabel><br/>
                    <DroppedFileWidget onDrop={this.handleDropIcon} style={widgetStyle}/>
                </FormGroup>
                { super.render() }
                <OptionalInput name="home" label="Home page:" create={this.state.createHome} placeHolder={ cleanName }
                               handleCreate={this.handleCreateHome} handleName={this.handleHomePage} />
            </div>;
    }

}

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = { show: true, type: ALL_PROJECT_TYPES[0], name:"", description: "" };
    }

    handleCreate() {
        const formData = new FormData();
        this.state.type.appendFormParameters(formData);
        let params = [
            {name: "name", type: "Text", value: this.state.name},
            {name: "description", type: "Text", value: this.state.description} ];
        params = this.state.type.appendPromptoParameters(params);
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/" + this.state.type.createMethod, formData).then(response=>{
            this.props.viewer.fetchRecentModules();
            this.props.viewer.fetchAllModules();
        }).catch(error=>alert(error));
        this.handleClose();
    }


    handleType(type) {
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

    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }

    render() {
        return <Modal show={this.state.show} onHide={this.handleClose} bsSize="large" dialogClassName="new-project-dialog">
                <Modal.Header closeButton={true}>
                    <Modal.Title>New project</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{padding: "8px"}}>
                    <form style={{margin: "8px"}}>
                        <FormGroup style={{marginBottom: "0px"}}>
                            <ControlLabel>Type</ControlLabel><br/>
                            <ToggleButtonGroup name={"project-type"}>
                                {ALL_PROJECT_TYPES.map(type=><NewModuleTypeButton key={type.id} projectType={type} onClick={this.handleType} active={type===this.state.type}/>)}
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
                        { this.state.type.renderParameters(this) }
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button>
                </Modal.Footer>
            </Modal>;
    }

}

