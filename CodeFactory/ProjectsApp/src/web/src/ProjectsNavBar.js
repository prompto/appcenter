import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

const btnStyle = {backgroundImage: "none"};

export default class ProjectsNavBar extends React.Component {

    render() {
        return <Navbar inverse fluid fixedTop>
            <Navbar.Header>
                <Navbar.Brand pullLeft>
                    <a href="/">Prompto Development Center</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavItem href="/data/index.html" target="_blank">Data</NavItem>
                <NavItem href="#" target="_blank">Tutorials</NavItem>
                <NavItem href="http://www.prompto.org" target="_blank">Reference</NavItem>
            </Nav>
            <Navbar.Form pullRight>
                <Button type="button" id="btnNewProject" onClick={this.props.root.newProject} style={btnStyle}>New</Button>
                &nbsp;
                <Button type="button" style={btnStyle}>Import</Button>
            </Navbar.Form>
        </Navbar>;
    }

}

