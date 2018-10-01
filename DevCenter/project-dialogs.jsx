const { Modal, Button, FormGroup, ControlLabel, ToggleButtonGroup, FormControl, Radio } = ReactBootstrap;
const DroppedFileWidget = widgets.DroppedFileWidget.default;

class ProjectType {

    constructor(id, title, image, createMethod) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.createMethod = createMethod;
    }

    updateModule(module) {

    }

    renderParameters(dialog) {
        return null;
    }

    appendFormParameters(formData, forRename) {
    }

    appendPromptoParameters(list) {
        return list;
    }
}

class ScriptType extends ProjectType {

    constructor() {
        super("Script", "Script", "/img/script.jpg", "createScript");
    }
}

class LibraryType extends ProjectType {

    constructor() {
        super("Library", "Library", "/img/library.png", "createLibrary");
    }
}

class BatchType extends ProjectType {

    constructor() {
        super("Batch", "Batch", "/img/batch.jpg", "createBatch");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <BatchParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    appendPromptoParameters(list) {
        return list.concat([{name: "startMethod", type: "Text", value: this.params.startMethod()}]);
    }

}


class WebServiceType extends ProjectType {

    constructor() {
        super("Service", "Web service", "/img/service.jpg", "createService");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <ServiceParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    appendPromptoParameters(list) {
        return list.concat([{name: "serverAboutToStartMethod", type: "Text", value: this.params.startMethod()}]);
    }

}



class WebSiteType extends ProjectType {

    constructor() {
        super("WebSite", "Web site", "/img/website.jpg", "createWebSite");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
        this.appendFormParameters = this.appendFormParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <WebSiteParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    updateModule(module) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            module.value.image = { mimeType: state.iconFile.type, partName: partName };
        }
    }

    appendFormParameters(formData, forRename) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            formData.append(partName, state.iconFile);
        }
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        let image = null;
        if(state.iconFile) {
            const partName = "@" + state.iconFile.name;
            image = { mimeType: state.iconFile.type, partName: partName };
        };
        const params = [
            {name: "image", type: "Image", value: image},
            {name: "serverAboutToStartMethod", type: "Text", value: this.params.startMethod()},
            {name: "homePage", type: "Text", value: this.params.homePage()}
        ];
        return list.concat(params);
    }
}

class WebLibraryType extends ProjectType {

    constructor() {
        super("WebLibrary", "Web library", "/img/weblibrary.jpg", "createWebLibrary");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <WebLibraryParameters ref={ref => this.params = ref} dialog={dialog} forRename={forRename || false}/>;
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        const params = [
            {name: "widgetLibrary", type: "Text", value: state.widgetLibrary},
            {name: "htmlEngine", type: "Text", value: state.htmlEngine},
            {name: "uiFramework", type: "Text", value: state.uiFramework}
        ];
        return list.concat(params);
    }
}

const ALL_PROJECT_TYPES = [new WebSiteType(), new WebServiceType(), new WebLibraryType(), new LibraryType(), new BatchType(), new ScriptType()];
const WEB_PROJECT_TYPES = ALL_PROJECT_TYPES.slice(0, 3);
const CODE_PROJECT_TYPES = ALL_PROJECT_TYPES.slice(3, 6);
const ID_TO_TYPE_MAP = {};

ALL_PROJECT_TYPES.forEach(t => ID_TO_TYPE_MAP[t.id] = t);


class NewModuleTypeButton extends React.Component {

    render() {
        let style = { width: "120px", height: "130px", boxSizing: "content-box", textAlign: "center",
            marginTop: "0px", marginLeft: "2px", marginRight: "2px", marginBottom: "10px", float: "left",
            borderStyle: "solid",  borderRadius: "10%", borderColor: "white", borderWidth: "medium"
            };
        if(this.props.active)
            style = { ...style, borderColor: "lightsteelblue" };
        const projectType = this.props.projectType;
        return <Thumbnail src={projectType.image} onClick={()=>this.props.onClick(projectType)} style={style}>
                    <p><strong>{projectType.title}</strong></p>
               </Thumbnail>;
    }
}

class OptionalInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleCustom = this.handleCustom.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleCustom(create) {
        this.props.handleCustom(create);
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.props.handleName(name);
    }


    render() {
        return <FormGroup>
            <ControlLabel>{this.props.label}</ControlLabel>
            <div style={{marginBottom: 5}}>
                <Radio inline name={this.props.name + "-radio"} checked={!this.props.customize} onChange={()=>this.handleCustom(false)}>Use default</Radio>
                <Radio inline name={this.props.name + "-radio"} checked={this.props.customize} onChange={()=>this.handleCustom(true)}>Customize</Radio>
            </div>
            <FormControl type="text" placeholder={this.props.placeHolder} readOnly={!this.props.customize} onChange={this.handleName} value={this.props.value || ""}/>
        </FormGroup>;
    }

}

class BatchParameters extends React.Component {

    constructor(props) {
        super(props);
        this.startMethodLabel = "Start method:";
        this.startMethodPrefix = "main_";
        this.handleCustomStart = this.handleCustomStart.bind(this);
        this.handleStartMethod = this.handleStartMethod.bind(this);
        this.state = { customStart: false, startMethod: ""}
    }

    handleCustomStart(custom) {
        this.setState( { customStart: custom } );
    }

    handleStartMethod(name) {
        this.setState( { startMethod: name } );
    }

    startMethod() {
        return this.state.customStart ? this.state.startMethod : this.startMethodPlaceHolder();
    }

    startMethodPlaceHolder() {
        const cleanName = (this.props.dialog.state.name || "").replace(/ /g, "_");
        return this.startMethodPrefix + cleanName;
    }


    render() {
        if(this.props.forRename)
            return null;
        else
            return <OptionalInput name="method" label={this.startMethodLabel} customize={this.state.customStart}
                                  placeHolder={this.startMethodPlaceHolder()} value={this.state.startMethod}
                                  handleCustom={this.handleCustomStart} handleName={this.handleStartMethod}/>;
    }

}

class ServiceParameters extends BatchParameters {

    constructor(props) {
        super(props);
        this.startMethodPrefix = "start_";
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
        this.handleCustomHome = this.handleCustomHome.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
        this.image = this.props.forRename ? this.props.dialog.props.module.value.image : null;
        this.state = { ...this.state, iconFile: null, customHome: false, homePage: "" };
    }

    handleDropIcon(file) {
        this.setState( { iconFile: file } );
    }

    handleCustomHome(custom) {
        this.setState( { customHome: custom } );
    }

    handleHomePage(name) {
        this.setState( { homePage: name } );
    }

    homePage() {
        return this.state.customHome ? this.state.homePage : this.homePagePlaceHolder();
    }

    homePagePlaceHolder() {
        const cleanName = (this.props.dialog.state.name || "").toLowerCase().replace(/ /g, "-");
        return cleanName + "/index.html";
    }



    render() {
        return <div>
                <FormGroup>
                    <ControlLabel>Icon</ControlLabel><br/>
                    <DroppedFileWidget onDrop={this.handleDropIcon} style={widgetStyle} image={this.image}/>
                </FormGroup>
                { super.render() }
                { !this.props.forRename && <OptionalInput name="home" label="Home page:" customize={this.state.customHome} placeHolder={this.homePagePlaceHolder()} value={this.state.homePage}
                               handleCustom={this.handleCustomHome} handleName={this.handleHomePage} /> }
            </div>;
    }

}


class WebLibraryParameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = { widgetLibrary: "react-bootstrap-3", htmlEngine: "react-16", uiFramework: "bootstrap-3" };
    }

    render() {
        const widgetLibrary = this.state.widgetLibrary;
        const htmlEngine = this.state.htmlEngine;
        const uiFramework = this.state.uiFramework;
        return <div>
            <FormGroup>
                <ControlLabel>Widget library:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={widgetLibrary} onChange={e=>this.setState({widgetLibrary: e.currentTarget.value})}>
                    <option key="none" value="none">None</option>
                    <option key="react-bootstrap-3" value="react-bootstrap-3" >React-bootstrap-3</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Html engine:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={htmlEngine} onChange={e=>this.setState({htmlEngine: e.currentTarget.value})} disabled={widgetLibrary!=="none"}>
                    <option key="react-16" value="react" >React</option>
                    <option key="vue" value="vue" disabled>Vue (not supported yet)</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>UI framework:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={uiFramework} onChange={e=>this.setState({uiFramework: e.currentTarget.value})} disabled={widgetLibrary!=="none"}>
                    <option key="none" value="none" >None</option>
                    <option key="bootstrap-3" value="bootstrap-3" >Bootstrap v3</option>
                    <option key="bootstrap-4" value="bootstrap-4" disabled>Bootstrap v4 (not supported yet)</option>
                    <option key="foundation-6" value="foundation-6" disabled>Foundation v6(not supported yet)</option>
                    <option key="semantic-2" value="semantic-2" disabled>Semantic v2(not supported yet)</option>
                    <option key="material-1" value="material-1" disabled>Material v1(not supported yet)</option>
                </FormControl>
            </FormGroup>
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
        this.state = { show: true, page: 1, type: ALL_PROJECT_TYPES[0], name:"", description: "" };
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
                    { this.state.page===1 &&
                        <form style={{margin: "8px"}}>
                            <FormGroup style={{marginBottom: "0px"}}>
                                <ControlLabel>Select type:</ControlLabel><br/>
                                <ToggleButtonGroup name={"project-type"}>
                                    {WEB_PROJECT_TYPES.map(type=><NewModuleTypeButton key={type.id} projectType={type} onClick={this.handleType} active={type===this.state.type}/>)}
                                </ToggleButtonGroup><br/>
                                <ToggleButtonGroup name={"project-type"}>
                                    {CODE_PROJECT_TYPES.map(type=><NewModuleTypeButton key={type.id} projectType={type} onClick={this.handleType} active={type===this.state.type}/>)}
                                </ToggleButtonGroup>
                            </FormGroup>
                        </form>
                    }
                    {this.state.page === 2 &&
                        <form style={{margin: "8px"}}>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel><br/>
                                <FormControl type="text" id="name" placeholder="Enter project name"
                                             onChange={this.handleName}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel><br/>
                                <FormControl type="text" id="description" placeholder="Enter project description"
                                             onChange={this.handleDescription}/>
                            </FormGroup>
                            {this.state.type.renderParameters(this)}
                        </form>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    { this.state.page===1 && <Button bsStyle="primary" onClick={()=>this.setState({page: 2})}>Next</Button> }
                    { this.state.page===2 && <Button onClick={()=>this.setState({page: 1})}>Previous</Button> }
                    { this.state.page===2 && <Button bsStyle="primary" onClick={this.handleCreate}>Create</Button> }
                </Modal.Footer>
            </Modal>;
    }

}

class ModifyProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.type = ID_TO_TYPE_MAP[this.props.module.type];
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveModule = this.saveModule.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {show: true, name: this.props.module.value.name, description: this.props.module.value.description};
    }

    handleSave() {
        // load latest full description before updating
        const dbId = (this.props.module.value.dbId.value || this.props.module.value.dbId).toString();
        const params = {
            params: JSON.stringify([{name: "dbId", value: dbId}, {
                name: "register",
                type: "Boolean",
                value: false
            }])
        };
        axios.get('/ws/run/getModuleDescription', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.saveModule(response.data);
        });
    }

    saveModule(module) {
        module.value.name = this.state.name;
        module.value.description = this.state.description;
        this.type.updateModule(module);
        const formData = new FormData();
        const params = [ {name: "module", type: module.type, value: module.value} ];
        formData.append("params", JSON.stringify(params));
        this.type.appendFormParameters(formData, true);
        axios.post("/ws/run/storeModule", formData).then(response=>{
            this.props.viewer.fetchRecentModules();
            this.props.viewer.fetchAllModules();
        }).catch(error=>alert(error));
        this.handleClose();
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
        return <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="rename-project-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>Modify project</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{padding: "8px"}}>
                <form style={{margin: "8px"}}>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel><br/>
                        <FormControl type="text" id="name" value={this.state.name} onChange={this.handleName}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel><br/>
                        <FormControl type="text" id="description" value={this.state.description} onChange={this.handleDescription}/>
                    </FormGroup>
                    { this.type.renderParameters(this, true) }
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>;
    }

}
