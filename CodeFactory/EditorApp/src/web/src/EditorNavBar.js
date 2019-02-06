import { getParam } from "./utils/Utils";
import React from 'react';
import { Navbar, Nav, NavItem, MenuItem, DropdownButton, ButtonGroup, Button } from 'react-bootstrap';
import AuthenticationSettingsDialog from './dialogs/AuthenticationSettingsDialog';
import DependenciesDialog from './dialogs/DependenciesDialog';
import ConfigurationDialog from './dialogs/ConfigurationDialog';
import { ALL_ELEMENT_TYPES } from "./resource-types/ResourceTypes";
import Defaults from './code/Defaults';
import Activity from './utils/Activity';
import Launcher from "./run/Launcher";

const dialectLabels = { "E": "Engly", "O": "Objy", "M": "Monty"};
const ALL_DIALECTS = ["E", "O", "M"];
const runModeLabels = { "LI": "Local interpreted", "LE": "Local transpiled", "SI": "Server interpreted", "SE": "Server compiled"};
const ALL_RUN_MODES = ["LI", "SI", "SE"]; // LE not supported yet


export default class EditorNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialect: Defaults.dialect, runMode: "LI", dialog: null};
        this.setDialect = this.setDialect.bind(this);
        this.setRunMode = this.setRunMode.bind(this);
        this.launch = this.launch.bind(this);
        this.stopPromptoCode = this.stopPromptoCode.bind(this);
        this.clearOutput = this.clearOutput.bind(this);
    }

    setDialect(dialect, callback) {
        this.props.root.setDialect(dialect);
        this.setState({ dialect: dialect}, callback);
    }

    setRunMode(mode) {
        this.setState({ runMode: mode});
    }

    launch(debug) {
        const root = this.props.root;
        const launcher = new Launcher(root, root.state.content, this.state.runMode, debug);
        launcher.launch();
    }

    stopServer() {
        this.props.root.killModule();
    }

    stopPromptoCode() {
        this.props.root.setState({activity: Activity.Editing});
    }

    clearOutput() {
        const doc = document.getElementById("output");
        doc.innerHTML = "";
    }

    render() {
        const projectName = getParam("name");
        return <div>
            <Navbar inverse fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand pullLeft>
                        <a href="/">Project: <b>{projectName}</b></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem href="http://www.prompto.org" target="_blank">Reference</NavItem>
                </Nav>
                { this.renderEditWidgets() }
                { this.renderOutputWidgets() }
            </Navbar>
            { this.state.dialog==="Authentication" && <AuthenticationSettingsDialog root={this.props.root} onClose={()=>this.setState({dialog: null})}/>}
            { this.state.dialog==="Dependencies" && <DependenciesDialog root={this.props.root} onClose={()=>this.setState({dialog: null})}/>}
            { this.state.dialog==="Configuration" && <ConfigurationDialog root={this.props.root} onClose={()=>this.setState({dialog: null})}/>}
        </div>;
    }

    renderOutputWidgets() {
        const activity = this.props.root.state.activity;
        const style = {display: activity===Activity.Running || activity===Activity.Idling ? "block" : "none"};
        return <Navbar.Form style={style}>
                <Button type="button" onClick={this.stopPromptoCode}>{activity===Activity.Running ? "Stop" : "Done"}</Button>
                &nbsp;
                <Button type="button" onClick={this.clearOutput}>Clear</Button>
            </Navbar.Form>;
    }

    renderEditWidgets() {
        const project = this.props.root.getProject();
        const hasStartMethod = project && project.type==="Batch";
        const hasServerStartMethod = project && (project.type==="Service" || project.type==="WebSite");
        const hasHomePage = project && project.type==="WebSite";
        const hasConfiguration = hasStartMethod || hasServerStartMethod || hasHomePage;
        const activity = this.props.root.state.activity;
        const style = {display: activity===Activity.Editing ? "block" : "none"};
        return <div style={style}>
                <Navbar.Form pullRight>
                    <DropdownButton id="dialect" title="Dialect">
                        { ALL_DIALECTS.map(d => <MenuItem key={d} active={this.state.dialect===d} onClick={()=>this.setDialect(d)}>{dialectLabels[d]}</MenuItem>) }
                    </DropdownButton>
                </Navbar.Form>
                <Navbar.Form pullRight>
                    <DropdownButton id="dialect" title="Settings">
                        { hasConfiguration && <MenuItem onClick={()=>this.setState({dialog: "Configuration"})}>Configuration</MenuItem> }
                        <MenuItem onClick={()=>this.setState({dialog: "Dependencies"})}>Dependencies</MenuItem>
                        { hasServerStartMethod && <MenuItem onClick={()=>this.setState({dialog: "Authentication"})}>Authentication</MenuItem> }
                </DropdownButton>
                </Navbar.Form>
                <Navbar.Form pullRight>
                    <ButtonGroup>
                        <DropdownButton id="mode" title={runModeLabels[this.state.runMode]}>
                            { ALL_RUN_MODES.map(m=><MenuItem key={m} active={this.state.runMode===m} onClick={()=>this.setRunMode(m)}>{runModeLabels[m]}</MenuItem>) }
                        </DropdownButton>
                        <Button type="button" onClick={()=>this.launch(false)}>Run</Button>
                        <Button type="button" onClick={()=>this.launch(true)}>Debug</Button>
                    </ButtonGroup>
                    &nbsp;
                    <Button type="button" onClick={()=>this.stopServer()} disabled={this.state.runMode==="LI"}>Shutdown</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.resetServer()} disabled={this.state.runMode==="LI"}>Reset</Button>
                </Navbar.Form>
                <Navbar.Form pullRight>
                    <Button type="button" onClick={()=>this.props.root.revert()}>Revert</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.commitAndReset()}>Commit</Button>
                    &nbsp;
                    { false &&  <Button type="button" onClick={()=>this.props.root.push()}>Push</Button> }
                </Navbar.Form>
                <Navbar.Form pullRight>
                    <DropdownButton id="btnNew" title="New">
                        { ALL_ELEMENT_TYPES.map(t=><MenuItem key={t.id} id={t.id} onClick={()=>t.newResource(this.props.root)}>{t.label}</MenuItem>) }
                    </DropdownButton>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.destroy()}>Delete</Button>
                </Navbar.Form>
            </div>;
    }

}
