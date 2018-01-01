const { Modal, Button, Checkbox, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock } = ReactBootstrap;

class AuthenticationSource {

    constructor(id, label, help) {
        this.id = id;
        this.label = label;
        this.help = help;
        this.disabled = false;
    }

    createDefaults(dialog, forTesting) {
        // nothing to do
    }

    renderItems(dialog) {
        // nothing to do
    }

    setStateFromValue(value, state) {
        // nothing to do
    }

    setValueFromState(state, value) {
        // nothing to do
    }

}

class DataStoreAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("STORE", "Data store", "Login and password are checked against an encrypted Prompto data store.");
        this.handleUseTestSourceInDev = this.handleUseTestSourceInDev.bind(this);
        this.handleStoreName = this.handleStoreName.bind(this);
    }

    handleUseTestSourceInDev(e, dialog) {
        dialog.setState({useTestSourceInDev: e.currentTarget.checked});
    }

    handleStoreName(e, dialog) {
        dialog.setState({storeName: e.target.value});
    }

    renderItems(dialog) {
        const storeName = dialog.state.storeName || ""; // must not be null otherwise React sees it as uncontrolled
       return <div><FormGroup>
                <ControlLabel>Data store name:</ControlLabel><br/>
                <FormControl type="text" value={storeName} onChange={(e)=>this.handleStoreName(e, dialog)} />
                <HelpBlock>You can create a login/password data store using the 'Data Stores' application.</HelpBlock>
            </FormGroup>
           {!dialog.state.skipAuthInDev &&
               <FormGroup>
                   <Checkbox inline checked={dialog.state.useTestSourceInDev} onChange={(e) => this.handleUseTestSourceInDev(e, dialog)}>Use
                       'Password is login' for development</Checkbox>
               </FormGroup>
           }
       </div>;
    }

    setStateFromValue(value, state) {
        state.storeName = value.storeName;
    }

    setValueFromState(state, value) {
        value.storeName = state.storeName;
    }


}


class LDAPAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("LDAP", "LDAP - not implemented yet", "Login and password are checked using LDAP.");
        this.disabled = true;
    }

}

class PasswordIsLoginAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("TEST", "Password is login - test only", "Any login is valid, password is equal to login - for test only.");
    }

}


const ALL_AUTH_SOURCES = [
    new DataStoreAuthenticationSource(),
    new LDAPAuthenticationSource(),
    new PasswordIsLoginAuthenticationSource()
];


const ID_TO_AUTH_SOURCE_MAP = {};

ALL_AUTH_SOURCES.forEach(t => ID_TO_AUTH_SOURCE_MAP[t.id] = t);


class AuthenticationMethod {

    constructor(id, label) {
        this.id = id;
        this.label = label;
        this.disabled = false;
    }

    createDefaults(dialog) {
        // nothing to do
    }

    renderItems(dialog) {
        return <div>
            <FormGroup>
                <ControlLabel>Select the login/password data source for this application:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={dialog.state.source.id} onChange={dialog.handleSource}>
                    { ALL_AUTH_SOURCES.map(m=><option key={m.id} value={m.id}
                                                      disabled={m.disabled} >{m.label}</option>) }
                </FormControl>
                <HelpBlock>{dialog.state.source.help}</HelpBlock>
            </FormGroup>
            {  dialog.state.source.renderItems(dialog) }
        </div>
    }

    setValueFromState(state, value) {
        // nothing to do
    }

    setStateFromValue(value, state) {
        // nothing to do
    }

};

class NoAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("NONE", "No authentication");
    }

    renderItems(dialog) {
        // nothing to do
    }
};

class BasicAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("BASIC", "Browser basic (BASIC)");
    }
};

class FormAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("FORM", "Developer provided form (FORM)");
    }

    handleLoginFolder(e, dialog) {
        dialog.setState({loginFolder: e.target.value});
    }

    handleLoginPage(e, dialog) {
        dialog.setState({loginPage: e.target.value});
    }

    handleErrorFolder(e, dialog) {
        dialog.setState({errorFolder: e.target.value});
    }

    handleErrorPage(e, dialog) {
        dialog.setState({errorPage: e.target.value});
    }

    createDefaults(dialog) {
        super.createDefaults(dialog);
        const cleanName = getParam("name").replace(/ /g, "_");
        let { loginFolder, errorFolder } = dialog.state;
        loginFolder = loginFolder || cleanName;
        errorFolder = errorFolder || cleanName;
        dialog.setState({loginFolder: loginFolder, errorFolder: errorFolder});
    }

    renderItems(dialog) {
        const { loginFolder, loginPage, errorFolder, errorPage } = dialog.state;
        const extension = "html";
        return <div>
            <FormGroup>
                <ControlLabel>Login page:</ControlLabel><br/>
                <InputGroup>
                    <FormControl type="text" value={loginFolder || ""} onChange={(e)=>this.handleLoginFolder(e, dialog)} />
                    <InputGroup.Addon>/</InputGroup.Addon>
                    <FormControl type="text" value={loginPage || ""} style={{width:300}} onChange={(e)=>this.handleLoginPage(e, dialog)} placeholder={"loginPage"} />
                    <InputGroup.Addon>.</InputGroup.Addon>
                    <FormControl type="text" value={extension} style={{width:60}} readOnly={true}/>
                </InputGroup>
                <HelpBlock>This page will be displayed when the user connects to the web site.</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Error page:</ControlLabel><br/>
                <InputGroup>
                    <FormControl type="text" value={errorFolder || ""} onChange={(e)=>this.handleErrorFolder(e, dialog)} />
                    <InputGroup.Addon>/</InputGroup.Addon>
                    <FormControl type="text" value={errorPage || ""} style={{width:300}} onChange={(e)=>this.handleErrorPage(e, dialog)} placeholder={"errorPage"} />
                    <InputGroup.Addon>.</InputGroup.Addon>
                    <FormControl type="text" value={extension} style={{width:60}} readOnly={true}/>
                </InputGroup>
                <HelpBlock>This page will be displayed when the user connection fails.</HelpBlock>
            </FormGroup>
            {super.renderItems(dialog)}
        </div>;
    }

    setStateFromValue(value, state) {
        let parts = this.extractParts(value.loginPage);
        state.loginFolder = parts.folder;
        state.loginPage = parts.page;
        parts = this.extractParts(value.errorPage);
        state.errorFolder = parts.folder;
        state.errorPage = parts.page;
    }

    extractParts(path) {
        if(!path)
            return { folder: null, page: null };
        else {
            let idx = path.indexOf('/');
            let folder = idx < 0 ? null : path.substring(0, idx);
            if (folder && !folder.length)
                folder = null;
            if (idx > 0)
                path = path.substring(idx + 1);
            idx = path.indexOf('.');
            let page = idx < 0 ? (path.length) : path.substring(0, idx);
            if (page && !page.length)
                page = null;
            if (idx > 0)
                path = path.substring(idx + 1);
            let extension = path;
            if (extension && !extension.length)
                extension = null;
            return {folder: folder, page: page, extension: extension};
        }
    }

    setValueFromState(state, value) {
        value.loginPage = state.loginFolder + "/" + state.loginPage + ".html";
        value.errorPage = state.errorFolder + "/" + state.errorPage + ".html";
    }

};

class ClientCertAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("CLIENT-CERT", "Client certificate (CLIENT-CERT) - not implemented yet");
        this.disabled = true;
    }

};

const ALL_AUTH_METHODS = [
    new NoAuthenticationMethod(),
    new BasicAuthenticationMethod(),
    new FormAuthenticationMethod(),
    new ClientCertAuthenticationMethod()
];


const ID_TO_AUTH_METHOD_MAP = {};

ALL_AUTH_METHODS.forEach(t => ID_TO_AUTH_METHOD_MAP[t.id] = t);


class AuthenticationSettingsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: true};
        this.setStateFromSettings();
        this.handleClose = this.handleClose.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
        this.handleSource = this.handleSource.bind(this);
        this.handleSkipAuthInDev = this.handleSkipAuthInDev.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    setStateFromSettings() {
        const settings = (this.props.root.project.value.authenticationSettings || {}).value || {};
        if(settings.authenticationMethod && settings.authenticationMethod.type) {
            this.state.method = new (eval(settings.authenticationMethod.type))();
            this.state.method.setStateFromValue(settings.authenticationMethod.value, this.state);
        } else
            this.state.method = ID_TO_AUTH_METHOD_MAP["NONE"];
        this.state.skipAuthInDev = settings.skipAuthInDev || false;
        if(settings.authenticationSource && settings.authenticationSource.type) {
            this.state.source = new (eval(settings.authenticationSource.type))();
            this.state.source.setStateFromValue(settings.authenticationSource.value, this.state);
        } else
            this.state.source = ID_TO_AUTH_SOURCE_MAP["STORE"];
        this.state.useTestSourceInDev = settings.useTestSourceInDev || false;
    }

    setSettingsFromState(settings) {
        if(this.state.method.id==="NONE") {
            settings.authenticationMethod = null;
            settings.authenticationSource = null;
        } else {
            // save method
            const method = settings.authenticationMethod || {};
            if(method.type!==this.state.method.constructor.name) {
                method.type = this.state.method.constructor.name;
                method.value = {}; // TODO cleanup orphans on server
            }
            this.state.method.setValueFromState(this.state, method.value);
            settings.authenticationMethod = method;
            // save source
            const source = settings.authenticationSource || {};
            if(source.type!==this.state.method.constructor.name) {
                source.type = this.state.source.constructor.name;
                source.value = {}; // TODO cleanup orphans on server
            }
            this.state.source.setValueFromState(this.state, source.value);
            settings.authenticationSource = source;
        }
        settings.skipAuthInDev = this.state.skipAuthInDev;
        settings.useTestSourceInDev = this.state.useTestSourceInDev;
    }

    componentDidMount() {
        this.state.method.createDefaults(this);
        this.state.source.createDefaults(this);
    }

    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }

    handleMethod(e) {
        const id = e.currentTarget.value;
        const method = ID_TO_AUTH_METHOD_MAP[id];
        method.createDefaults(this);
        this.setState({method: method});
    }

    handleSkipAuthInDev(e) {
        const checked = e.currentTarget.checked;
        this.setState({skipAuthInDev: checked});
    }

    handleSource(e) {
        const id = e.currentTarget.value;
        const source = ID_TO_AUTH_SOURCE_MAP[id];
        source.createDefaults(this);
        this.setState({source: source});
    }

    handleSave() {
        // load latest full description before updating it
        const dbId = this.props.root.project.value.dbId.value.toString();
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
                this.saveSettings(response.data);
        });
    }

    saveSettings(project) {
        const settings = (project.value.authenticationSettings || {}).value || {};
        this.setSettingsFromState(settings);
        project.value.authenticationSettings = { type: "AuthenticationSettings", value: settings };
        const formData = new FormData();
        const params = [ {name: "module", type: project.type, value: project.value} ];
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/storeModule", formData).
            then(response=>{
                this.props.root.loadDescription();
                this.handleClose()
            }).catch(error=>alert(error));
    }


    render() {
        return <Modal show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton={true}>
                <Modal.Title>Authentication settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>Select the authentication method for this application:</ControlLabel><br/>
                        <FormControl componentClass="select" defaultValue={this.state.method.id} onChange={this.handleMethod}>
                            { ALL_AUTH_METHODS.map(m=><option key={m.id} value={m.id}
                                                       disabled={m.disabled} >{m.label}</option>) }
                        </FormControl>
                    </FormGroup>
                    { this.state.method.id != "NONE" &&
                    <FormGroup>
                        <Checkbox inline checked={this.state.skipAuthInDev} onChange={this.handleSkipAuthInDev}>Skip authentication for development</Checkbox>
                    </FormGroup>
                    }
                    { this.state.method.renderItems(this, false) }
                 </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>;
    }



}
