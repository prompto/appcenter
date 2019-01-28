const { Navbar, Nav, NavItem } = ReactBootstrap;



class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
    }

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
                    <Nav pullRight>
                        <NavItem href="/data/index.html" target="_blank">Data</NavItem>
                        <NavItem href="#" target="_blank">Tutorials</NavItem>
                        <NavItem href="http://www.prompto.org" target="_blank">Reference</NavItem>
                    </Nav>
                </Navbar>
                <div style={{height: "450px", textAlign: "center"}} className="centered" >
                    <img src="/img/developer_icon.png" style={imgStyle}/>
                    <h2>Sorry that you could not connect!</h2>
                </div>
           </div>;
    }
}