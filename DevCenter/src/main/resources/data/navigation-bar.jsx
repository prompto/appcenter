const { Navbar, FormGroup, ControlLabel, DropdownButton, MenuItem } = ReactBootstrap;

class DataNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const store = this.props.root.state.store;
        const title = store.substring(0, 1) + store.substring(1).toLowerCase();
        return <Navbar inverse fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand pullLeft>
                        <a href="#"><b>Data explorer</b></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <ControlLabel id="store-type-label">Store:&nbsp;</ControlLabel>
                            <DropdownButton id="store-type" title={title}>
                                <MenuItem active={store==="APPS"} onSelect={()=>this.props.root.setState({store: "APPS"})}>Apps</MenuItem>
                                <MenuItem active={store==="DATA"} onSelect={()=>this.props.root.setState({store: "DATA"})}>Data</MenuItem>
                                <MenuItem active={store==="LOGIN"} onSelect={()=>this.props.root.setState({store: "LOGIN"})}>Login</MenuItem>
                                <MenuItem divider/>
                                <MenuItem active={store==="TOOLS"} onSelect={()=>this.props.root.setState({store: "TOOLS"})}>Tools</MenuItem>
                            </DropdownButton>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>;
    }


}
