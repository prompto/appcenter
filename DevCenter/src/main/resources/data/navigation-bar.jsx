const { Navbar, FormGroup, ControlLabel, DropdownButton, MenuItem } = ReactBootstrap;

class DataNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                            <DropdownButton id="store-type" title="Apps">
                                <MenuItem key="APPS" active>Apps</MenuItem>
                                <MenuItem key="DATA">Data</MenuItem>
                                <MenuItem key="LOGIN">Login</MenuItem>
                            </DropdownButton>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>;
    }


}
