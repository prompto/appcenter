import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Button, Checkbox } from 'react-bootstrap';

const btnStyle = {backgroundImage: "none"};

export default class ProjectsNavBar extends React.Component {

    render() {
        return <Navbar inverse fluid fixedTop>
            <Navbar.Header>
                <Navbar.Brand pullLeft>
                    <a href="/">Prompto Project Explorer</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavDropdown id="tools" title="Tools">
                    <MenuItem href="/data/index.html" target="DataExplorer">Data explorer</MenuItem>
                    <MenuItem href="/stores/index.page" target="StoreExplorer">Store explorer</MenuItem>
                </NavDropdown>
                <NavDropdown id="help" title="Help">
                    <MenuItem href="http://www.prompto.org/?section=tutorials" target="PromptoTutorials">Tutorials</MenuItem>
                    <MenuItem href="http://www.prompto.org/?section=libraries" target="PromptoReference">Reference</MenuItem>
                </NavDropdown>
            </Nav>
            <Navbar.Form pullRight>
                <Checkbox style={{color: "white"}} inline onChange={this.props.onShowParked}>Show parked</Checkbox>
                &nbsp;&nbsp;
                <Button type="button" id="btnNewProject" onClick={this.props.onNewProject} style={btnStyle}>New</Button>
                &nbsp;
                <Button type="button" onClick={this.props.onImportProject} style={btnStyle}>Import</Button>
            </Navbar.Form>
        </Navbar>;
    }

}

