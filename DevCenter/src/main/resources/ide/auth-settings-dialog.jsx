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

}

class DataStoreAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("STORE", "Data store", "Login and password are checked against an encrypted Prompto data store.");
        this.handleUseMockInDev = this.handleUseMockInDev.bind(this);
    }

    handleUseMockInDev(e, dialog) {
        const checked = e.currentTarget.checked;
        dialog.setState({useMockInDev: checked});
    }

    renderItems(dialog) {
       return <div><FormGroup>
                <ControlLabel>Data store name:</ControlLabel><br/>
                <FormControl type="text" value={dialog.state.source.dataStore} onChange={()=>this.handleDataStore(dialog)} />
                <HelpBlock>You can create a login/password data store using the 'Data Stores' application.</HelpBlock>
            </FormGroup>
           {!dialog.state.skipAuthInDev &&
               <FormGroup>
                   <Checkbox inline checked={dialog.state.useMockInDev} onClick={(e) => this.handleUseMockInDev(e, dialog)}>Use
                       'Password is login' for development</Checkbox>
               </FormGroup>
           }
       </div>;
    }
}


class LDAPAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("LDAP", "LDAP - not implemented yet", "Login and password are checked using LDAP.");
        this.disabled = true;
    }

}

class TestAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("TEST", "Password is login - test only", "Any login is valid, password is equal to login - for test only.");
    }

}


const ALL_AUTH_SOURCES = [
    new DataStoreAuthenticationSource(),
    new LDAPAuthenticationSource(),
    new TestAuthenticationSource()
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

};

class NoAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("NONE", "No authentication");
    }

    createDefaults(dialog) {
        // nothing to do
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

    handleLoginFolder(e) {
        this.state.loginFolder = event.target.value;
    }

    handleLoginPage(e) {
        this.state.loginPage = event.target.value;
    }

    handleErrorFolder(e) {
        this.state.errorFolder = event.target.value;
    }

    handleErrorPage(e) {
        this.state.errorPage = event.target.value;
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
                        <FormControl type="text" value={loginFolder} onChange={this.handleLoginFolder} />
                        <InputGroup.Addon>/</InputGroup.Addon>
                        <FormControl type="text" value={loginPage} style={{width:300}} onChange={this.handleLoginPage} placeholder={"loginPage"} />
                        <InputGroup.Addon>.</InputGroup.Addon>
                        <FormControl type="text" value={extension} style={{width:60}} readOnly={true}/>
                    </InputGroup>
                    <HelpBlock>This page will be displayed when the user connects to the web site.</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Error page:</ControlLabel><br/>
                    <InputGroup>
                        <FormControl type="text" value={errorFolder} onChange={this.handleErrorFolder} />
                        <InputGroup.Addon>/</InputGroup.Addon>
                        <FormControl type="text" value={errorPage} style={{width:300}} onChange={this.handleErrorPage} placeholder={"errorPage"} />
                        <InputGroup.Addon>.</InputGroup.Addon>
                        <FormControl type="text" value={extension} style={{width:60}} readOnly={true}/>
                    </InputGroup>
                    <HelpBlock>This page will be displayed when the user connection fails.</HelpBlock>
                </FormGroup>
                {super.renderItems(dialog)}
            </div>;
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
        this.state = {show: true, method: ID_TO_AUTH_METHOD_MAP["NONE"], source: ID_TO_AUTH_SOURCE_MAP["STORE"], skipAuthInDev: false, useMockInDev: false};
        this.handleClose = this.handleClose.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
        this.handleSource = this.handleSource.bind(this);
        this.handleSkipAuthInDev = this.handleSkipAuthInDev.bind(this);
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
                        <Checkbox inline checked={this.state.skipAuthInDev} onClick={this.handleSkipAuthInDev}>Skip authentication for development</Checkbox>
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
