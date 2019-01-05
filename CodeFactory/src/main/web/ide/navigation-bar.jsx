const { Navbar, Nav, NavItem, NavDropdown, MenuItem, DropdownButton, ButtonGroup, Button } = ReactBootstrap;

const dialectLabels = { "E": "Engly", "O": "Objy", "M": "Monty"};
const ALL_DIALECTS = ["E", "O", "M"];
const runModeLabels = { "LI": "Local interpreted", "SI": "Server interpreted", "SE": "Server compiled"};
const ALL_RUN_MODES = ["LI", "SI", "SE"];


class EditorNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialect: "O", runMode: "LI", dialog: null};
        this.setDialect = this.setDialect.bind(this);
        this.setRunMode = this.setRunMode.bind(this);
        this.tryRun = this.tryRun.bind(this);
        this.getRunnableContent = this.getRunnableContent.bind(this);
        this.runPromptoCode = this.runPromptoCode.bind(this);
        this.stopPromptoCode = this.stopPromptoCode.bind(this);
        this.clearOutput = this.clearOutput.bind(this);
        this.openWebPage = this.openWebPage.bind(this);
    }

    setDialect(dialect, callback) {
        this.props.root.editorWindow.setDialect(dialect);
        this.setState({ dialect: dialect}, callback);
    }

    setRunMode(mode) {
        this.setState({ runMode: mode});
    }

    tryRun() {
        this.getRunnableContent(this.props.root.currentContent, runnable => {
            if (runnable == null) {
                alert("Nothing to run!");
                return true;
            }
            if (!runnable.valid) {
                alert("Can only run tests methods, main methods or web pages!");
                return;
            }
            if (runnable.content.type === "html" || runnable.content.type === "page")
                this.openWebPage(runnable.content);
            else
                this.runPromptoCode(runnable.content);
        });
    }

    getRunnableContent(content, onFound) {
        // check runnable code
        if(content.subType==="test" || (content.subType==="method" && content.main))
            return onFound({ valid: true, content: content });
        // check runnable page
        if(this.props.root.getProject().type !== "WebSite")
            return onFound({ valid: false, content: null });
        if(content.type=="html" || content.type=="page")
            return onFound({ valid: true, content: content });
        if(content.subType!=="widget")
            return onFound({ valid: false, content: null });
        this.props.root.editorWindow.fetchRunnablePage(content, onFound);
    }

    openWebPage(content) {
        this.props.root.fetchModuleURL(url => {
            const tab = window.open(url + content.name, '_blank', '');
            if(tab)
                tab.focus();
            else {
                var msg = "It seems your browser is blocking popups.\n" +
                    "Allow popups for [*.]prompto.cloud to open your web site automatically.\n" +
                    "Alternately, open a new tab or window with the following URL:\n" +
                    url + content.name;
                alert(msg);
            }

        });
    }

    stopServer() {
        this.props.root.killModule();
    }

    runPromptoCode(content) {
        this.props.root.setState({editMode: "RUNNING"});
        print("Running " + content.name + "...");
        this.props.root.editorWindow.runMethod(content, this.state.runMode);
    }

    stopPromptoCode() {
        this.props.root.setState({editMode: "EDIT"});
    }

    clearOutput() {
        const doc = document.getElementById("output");
        doc.innerHTML = "";
    }

    render() {
        const projectName = getParam("name");
        const editStyle = {display: this.props.root.state.editMode==="EDIT" ? "block" : "none"};
        const runningStyle = {display: this.props.root.state.editMode!=="EDIT" ? "block" : "none"};
        const runningLabel = this.props.root.state.editMode==="RUNNING" ? "Stop" : "Done";
        const project = this.props.root.getProject();
        const hasStartMethod = project && project.type==="Batch";
        const hasServerStartMethod = project && (project.type==="Service" || project.type==="WebSite");
        const hasHomePage = project && project.type==="WebSite";
        const hasConfiguration = hasStartMethod || hasServerStartMethod || hasHomePage;
        return <div>
                <Navbar inverse fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand pullLeft>
                        <a href="#">Project: <b>{projectName}</b></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Form pullRight style={editStyle}>
                    <DropdownButton id="dialect" title="Dialect">
                        { ALL_DIALECTS.map(d => <MenuItem key={d} active={this.state.dialect===d} onClick={()=>this.setDialect(d)}>{dialectLabels[d]}</MenuItem>) }
                    </DropdownButton>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <DropdownButton id="dialect" title="Settings">
                        { hasConfiguration && <MenuItem onClick={()=>this.setState({dialog: "Configuration"})}>Configuration</MenuItem> }
                        <MenuItem onClick={()=>this.setState({dialog: "Dependencies"})}>Dependencies</MenuItem>
                        { hasServerStartMethod && <MenuItem onClick={()=>this.setState({dialog: "Authentication"})}>Authentication</MenuItem> }
                    </DropdownButton>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <ButtonGroup>
                        <DropdownButton id="mode" title={runModeLabels[this.state.runMode]}>
                            { ALL_RUN_MODES.map(m=><MenuItem key={m} active={this.state.runMode===m} onClick={()=>this.setRunMode(m)}>{runModeLabels[m]}</MenuItem>) }
                        </DropdownButton>
                        <Button type="button" onClick={this.tryRun} >Run</Button>
                    </ButtonGroup>
                    &nbsp;
                    <Button type="button" onClick={()=>this.stopServer()} disabled={this.state.runMode==="LI"}>Shutdown</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.resetServer()} disabled={this.state.runMode==="LI"}>Reset</Button>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <Button type="button" onClick={()=>this.props.root.revert()}>Revert</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.commitAndReset()}>Commit</Button>
                    &nbsp;
                    { false &&  <Button type="button" onClick={()=>this.props.root.push()}>Push</Button> }
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <DropdownButton id="btnNew" title="New">
                        { ALL_ELEMENT_TYPES.map(t=><MenuItem key={t.id} id={t.id} onClick={()=>t.newResource(this.props.root)}>{t.label}</MenuItem>) }
                    </DropdownButton>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.destroy()}>Delete</Button>
                </Navbar.Form>
                <Navbar.Form style={runningStyle}>
                    <Button type="button" style={{marginRight: "5px"}} onClick={this.stopPromptoCode}>{runningLabel}</Button>
                    <Button type="button" onClick={this.clearOutput}>Clear</Button>
                </Navbar.Form>
            </Navbar>
            { this.state.dialog==="Authentication" && <AuthenticationSettingsDialog root={this.props.root} onClose={()=>this.setState({dialog: null})}/>}
            { this.state.dialog==="Dependencies" && <DependenciesDialog root={this.props.root} onClose={()=>this.setState({dialog: null})}/>}
            { this.state.dialog==="Configuration" && <ConfigurationDialog root={this.props.root} onClose={()=>this.setState({dialog: null})}/>}
        </div>;
    }


}
