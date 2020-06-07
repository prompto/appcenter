const { Navbar, Nav, NavItem, Modal, FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;

class LoginPage extends React.Component {

    handleClose() {
        document.location = "/auth/errorPage.html";
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
               </Navbar>
                <div style={{height: "450px", textAlign: "center"}} className="centered" >
                    <img src="/auth/developer_icon.png" style={imgStyle}/>
                    <h2>Welcome to Prompto!</h2>
                </div>
                <Modal show={true} onHide={this.handleClose}>
	                <form method='POST' action="/j_security_check">
	                    <Modal.Header closeButton={true}>
	                        <Modal.Title>Connect to your development server</Modal.Title>
	                    </Modal.Header>
	                    <Modal.Body style={{padding: "8px"}}>
							<div style={{margin: "8px"}}>
	                            <FormGroup>
	                                <ControlLabel>Name</ControlLabel><br/>
	                                <FormControl type="text" name="j_username"/>
	                            </FormGroup>
	                            <FormGroup>
	                                <ControlLabel>Password</ControlLabel><br/>
	                                <FormControl type="password" name="j_password" />
	                            </FormGroup>
							</div>
	                    </Modal.Body>
	                    <Modal.Footer>
	                        <Button style={btnStyle} onClick={this.handleClose}>Cancel</Button>
	                        <Button style={btnStyle} bsStyle="primary" type="submit">Connect</Button>
	                    </Modal.Footer>
                    </form>
                </Modal>
            </div>;
    }
}