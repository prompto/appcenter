import React from 'react';
import { Navbar, Nav, NavDropdown, FormGroup, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

export default class DataNavBar extends React.Component {

    storeSelected(key) {
        this.props.root.setState({store: key.toUpperCase()});
    }

    render() {
        const store = this.props.root.state.store;
        const title = store.substring(0, 1) + store.substring(1).toLowerCase();
        return <Navbar inverse fluid fixedTop>
            <Navbar.Header>
                <Navbar.Brand pullLeft>
                    <a href="/">Prompto Data Explorer</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavDropdown title="Tools">
                    <MenuItem href="/" target="ProjectExplorer">Project explorer</MenuItem>
                    <MenuItem href="/stores/index.page" target="StoreExplorer">Store explorer</MenuItem>
                </NavDropdown>
                <NavDropdown title="Help">
                    <MenuItem href="http://www.prompto.org/?section=tutorials" target="PromptoTutorials">Tutorials</MenuItem>
                    <MenuItem href="http://www.prompto.org/?section=libraries" target="PromptoReference">Reference</MenuItem>
                </NavDropdown>
            </Nav>
            <Navbar.Form pullLeft>
                <FormGroup>
                    <ControlLabel id="store-type-label">Store:&nbsp;</ControlLabel>
                    <DropdownButton id="store-type" title={title}>
                        {["Data", "Apps", "Login"].map(ds =>
                            <MenuItem key={ds} eventKey={ds} active={store === ds.toUpperCase()}
                                      onSelect={this.storeSelected.bind(this)}>{ds}</MenuItem>, this)
                        }
                    </DropdownButton>
                </FormGroup>
            </Navbar.Form>
        </Navbar>;
    }


}