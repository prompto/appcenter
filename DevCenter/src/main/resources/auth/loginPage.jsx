const { Navbar, Nav, NavItem, Modal, FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;

/*
class RenameProjectDialog extends React.Component {

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
        const dbId = this.props.module.value.dbId.value.toString();
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
        return <
    }

}
*/


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: null, password: null};
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
    }

    handleClose() {
        document.location = "/auth/errorPage.html";
    }

    handleConnect() {
        axios({
            method: 'post',
            url: "/j_security_check",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
                'j_username': encodeURI(this.state.name),
                'j_password': encodeURI(this.state.password)
            }
        }).then(response=>{
            document.open("text/html", "replace");
            document.write(response.data);
            document.close();
        }).catch(error=>{
            document.location = "/auth/errorPage.html";
        });
    }

    handleName(e) {
        this.setState( { name: e.currentTarget.value } );
    }

    handlePassword(e) {
        this.setState( { password: e.currentTarget.value } );
    }


    render() {
        const btnStyle = { backgroundImage: "none" };
        const imgStyle = { width: "400px", height: "400px" };
        return <div>
                <Navbar inverse fluid fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand pullLeft>
                            <a href="#">Prompto Development Center</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem href="/data/index.html" target="_blank">Data</NavItem>
                        <NavItem href="#" target="_blank">Tutorials</NavItem>
                        <NavItem href="http://www.prompto.org" target="_blank">Reference</NavItem>
                    </Nav>
                </Navbar>
                <div style={{height: "450px", textAlign: "center"}} className="centered" >
                    <img src="/img/developer_icon.png" style={imgStyle}/>
                    <h2>Welcome to Prompto!</h2>
                </div>
                <Modal show={true} onHide={this.handleClose}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Connect to your development server</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding: "8px"}}>
                        <form style={{margin: "8px"}} method='post'>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel><br/>
                                <FormControl type="text" id="name" onChange={this.handleName}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel><br/>
                                <FormControl type="password" id="description" onChange={this.handlePassword}/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.handleConnect}>Connect</Button>
                    </Modal.Footer>
                </Modal>
            </div>;
    }
}