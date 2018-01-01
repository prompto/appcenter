const { Navbar, Nav, NavItem, NavDropdown, MenuItem, DropdownButton, ButtonGroup, Button } = ReactBootstrap;

const dialectLabels = { "E": "Engly", "O": "Objy", "M": "Monty"};
const ALL_DIALECTS = ["E", "O", "M"];
const runModeLabels = { "LI": "Local interpreted", "SI": "Server interpreted", "SE": "Server compiled"};
const ALL_RUN_MODES = ["LI", "SI", "SE"];


class EditorNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialect: "E", runMode: "LI", dialog: null};
        this.setDialect = this.setDialect.bind(this);
        this.setRunMode = this.setRunMode.bind(this);
        this.tryRun = this.tryRun.bind(this);
        this.alertIfNotRunnable = this.alertIfNotRunnable.bind(this);
        this.runPromptoCode = this.runPromptoCode.bind(this);
        this.stopPromptoCode = this.stopPromptoCode.bind(this);
        this.openWebPage = this.openWebPage.bind(this);
    }

    setDialect(dialect) {
        this.props.root.editorWindow.setDialect(dialect);
        this.setState({ dialect: dialect});
    }

    setRunMode(mode) {
        this.setState({ runMode: mode});
    }

    tryRun() {
        const content = this.props.root.currentContent;
        if(this.alertIfNotRunnable(content))
            return;
        if(content.type === "html")
            this.openWebPage(content);
        else
            this.runPromptoCode(content);
    }

    openWebPage(content) {
        const tab = window.open(window.location.href, '_blank', '');
        this.fetchModuleURL((url)=>{
            tab.location = url + content.name;
            tab.focus();
        });
    }

    stopServer() {
        this.fetchModuleURL((url)=>{
            const fullUrl = url + "ws/control/exit";
            axios.get(fullUrl);
        }, true); // optional  = true, don't launch server only to stop it
    }

    resetServer() {
        this.fetchModuleURL((url)=>{
            const fullUrl = url + "ws/control/clear-context";
            axios.get(fullUrl);
        });
    }

    fetchModuleURL(success, optional) {
        const dbId = this.props.root.project.value.dbId.value;
        const params = { params: JSON.stringify([ {name:"dbId", value: dbId}, {name: "optional", type: "Boolean", value: optional || false}]) };
        axios.get('/ws/run/getModulePort', { params: params }).
            then(resp=>{
                const response = resp.data;
                if (response.error)
                    ; // TODO something
                else if(response.data == -1)
                    alert("Server is not running!");
                else {
                    const href = self.location.protocol +
                        "//" + self.location.hostname +
                        ":" + response.data + "/";
                    success(href);
                }
            }).
            catch(error=>alert(error));
     }

    runPromptoCode(content) {
        this.props.root.setState({editMode: "RUNNING"});
        print("Running " + content.name + "...");
        this.props.root.editorWindow.runMethod(content, this.state.runMode);
    }

    stopPromptoCode() {
        this.props.root.setState({editMode: "EDIT"});
    }

    alertIfNotRunnable(content) {
        let msg = null
        if (!content) {
            alert("Nothing to run!");
            return true;
        } else if(content.subType==="test")
            return false;
        else if(content.subType==="method" && content.main)
            return false;
        else if(content.type=="html" && this.props.root.project.type==="WebSite")
            return false;
        else {
            alert("Can only run tests methods, main methods or web pages!");
            return true;
        }
    }

    render() {
        const projectName = getParam("name");
        const editStyle = {display: this.props.root.state.editMode==="EDIT" ? "block" : "none"};
        const runningStyle = {display: this.props.root.state.editMode!=="EDIT" ? "block" : "none"};
        const runningLabel = this.props.root.state.editMode==="RUNNING" ? "Stop" : "Done";
        return <div>
                <Navbar inverse fluid fixedTop>
                <Navbar.Header>
                    <Navbar.Brand pullLeft>
                        <a href="#">Prompto Code Editor for: <b>{projectName}</b></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Form pullRight style={editStyle}>
                    <DropdownButton id="dialect" title="Dialect">
                        { ALL_DIALECTS.map(d => <MenuItem key={d} active={this.state.dialect===d} onClick={()=>this.setDialect(d)}>{dialectLabels[d]}</MenuItem>) }
                    </DropdownButton>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <DropdownButton id="dialect" title="Settings">
                        <MenuItem onClick={()=>this.setState({dialog: "AuthenticationSettings"})}>Authentication</MenuItem>
                    </DropdownButton>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <ButtonGroup>
                        <Button type="button" onClick={this.tryRun} >Run</Button>
                        <DropdownButton id="mode" title={runModeLabels[this.state.runMode]}>
                            { ALL_RUN_MODES.map(m=><MenuItem key={m} active={this.state.runMode===m} onClick={()=>this.setRunMode(m)}>{runModeLabels[m]}</MenuItem>) }
                        </DropdownButton>
                    </ButtonGroup>
                    &nbsp;
                    <Button type="button" onClick={()=>this.stopServer()} disabled={this.state.runMode==="LI"}>Shutdown</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.resetServer()} disabled={this.state.runMode==="LI"}>Reset</Button>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <Button type="button" onClick={()=>this.props.root.revert()}>Revert</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.commit()}>Commit</Button>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.push()}>Push</Button>
                </Navbar.Form>
                <Navbar.Form pullRight style={editStyle}>
                    <DropdownButton id="mode" title="New">
                        { ALL_ELEMENT_TYPES.map(t=><MenuItem key={t.id} onClick={()=>t.newResource(this.props.root)}>{t.label}</MenuItem>) }
                    </DropdownButton>
                    &nbsp;
                    <Button type="button" onClick={()=>this.props.root.destroy()}>Delete</Button>
                </Navbar.Form>
                <Navbar.Form style={runningStyle}>
                    <Button type="button" onClick={()=>this.stopPromptoCode()}>{runningLabel}</Button>
                </Navbar.Form>
            </Navbar>
            { this.state.dialog==="AuthenticationSettings" && <AuthenticationSettingsDialog onClose={()=>this.setState({dialog: null})}/>}
        </div>;
    }


}
