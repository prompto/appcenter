const { Modal, Button, Checkbox, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock } = ReactBootstrap;

class ConfigurationDialog extends React.Component {

    constructor(props) {
        super(props);
        this.getProject = ()=>this.props.root.getProject().value;
        this.state = {show: true};
        this.setStateFromConfig();
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
    }

    setStateFromConfig() {
        const project = this.props.root.getProject();
        const hasStartMethod = project.type==="Batch";
        const hasServerStartMethod = project.type==="Service" || project.type==="WebSite";
        const hasHomePage = project && project.type==="WebSite";
        if(hasStartMethod)
            this.state.startMethod = project.value.startMethod;
        if(hasServerStartMethod)
            this.state.serverAboutToStartMethod = project.value.serverAboutToStartMethod;
        if(hasHomePage)
            this.state.homePage = project.value.homePage;
    }

    setConfigFromState(project) {
        const hasStartMethod = project.type==="Batch";
        const hasServerStartMethod = project.type==="Service" || project.type==="WebSite";
        const hasHomePage = project && project.type==="WebSite";
        if(hasStartMethod)
            project.value.startMethod = this.state.startMethod;
        if(hasServerStartMethod)
            project.value.serverAboutToStartMethod = this.state.serverAboutToStartMethod;
        if(hasHomePage)
            project.value.homePage = this.state.homePage;
    }

    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }

    handleSave() {
        // load latest full description before updating it
        const dbId = this.getProject().dbId.value.toString();
        const params = {
            params: JSON.stringify([{name: "dbId", value: dbId}, {
                name: "register",
                type: "Boolean",
                value: false
            }])
        };
        axios.get('/ws/run/getModuleDescription', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.saveConfig(response.data);
        });
    }

    saveConfig(project) {
        this.setConfigFromState(project);
        const formData = new FormData();
        const params = [ {name: "module", type: project.type, value: project.value} ];
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/storeModule", formData).
            then(response=>{
                this.props.root.loadDescription();
                this.handleClose()
            }).catch(error=>alert(error));
    }


    render() {
        const project = this.props.root.getProject();
        const hasStartMethod = project.type==="Batch";
        const hasServerStartMethod = project.type==="Service" || project.type==="WebSite";
        const hasHomePage = project && project.type==="WebSite";
        return <Modal show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton={true}>
                <Modal.Title>Module configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    { hasStartMethod &&
                        <FormGroup>
                            <ControlLabel>Select the start method for this application:</ControlLabel><br/>
                            <FormControl type="text" onChange={e => this.setState({startMethod: e.currentTarget.value})} value={this.state.startMethod || ""}/>
                        </FormGroup>
                    }
                    { hasServerStartMethod &&
                    <FormGroup>
                        <ControlLabel>Select the method to run when server is launched:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({serverAboutToStartMethod: e.currentTarget.value})} value={this.state.serverAboutToStartMethod || ""}/>
                    </FormGroup>
                    }
                    { hasHomePage &&
                    <FormGroup>
                        <ControlLabel>Select the home page:</ControlLabel><br/>
                        <FormControl type="text" onChange={e => this.setState({homePage: e.currentTarget.value})} value={this.state.homePage || ""}/>
                    </FormGroup>
                    }

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>;
    }



}
