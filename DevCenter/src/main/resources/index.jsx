const { Grid, PageHeader } = ReactBootstrap;

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialog: null, module: null, recent: [], all: [] };
        this.newProject = this.newProject.bind(this);
        this.fetchRecentModules = this.fetchRecentModules.bind(this);
        this.fetchAllModules = this.fetchAllModules.bind(this);
        this.modulesReceived = this.modulesReceived.bind(this);
        this.modifyProject = this.modifyProject.bind(this);
    }

    componentDidMount() {
        this.fetchRecentModules();
        this.fetchAllModules();
    }

    fetchRecentModules() {
        const params = { params: JSON.stringify([{"name": "count", "type": "Integer", "value": 8}]) };
        axios.get('/ws/run/getRecentModules',  { params: params }).then(resp => {
                const modules = this.modulesReceived(resp.data);
                this.setState({recent: modules})
            });
    }

    fetchAllModules() {
        axios.get('/ws/run/getAllModules').then(resp => {
            const modules = this.modulesReceived(resp.data);
            this.setState({all: modules})
        });
    }

    modulesReceived(response) {
        if(response.error) {
            alert(response.error);
            return [];
        } else
            return response.data.value;
    }

    exportProject(module) {
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const exportUrl = '/ws/run/exportModule?params=[{"name":"dbId", "value":"' + dbId + '"}]';
        window.open(exportUrl, "Download");

    }

    modifyProject(module) {
        this.setState({dialog: "ModifyProject", module: module});
    }

    deleteProject(module) {
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}]) };
        axios.get('/ws/run/deleteModule',  { params: params }).then(resp => {
            this.fetchRecentModules();
            this.fetchAllModules();
        });
    }

    newProject() {
        this.setState({dialog: "NewProject"});
    }

    render() {
        return <div>
            <ProjectsNavBar root={this}/>
            {this.state.dialog==="NewProject" && <NewProjectDialog onClose={()=>this.setState({dialog: null})} viewer={this}/>}
            {this.state.dialog==="ModifyProject" && <ModifyProjectDialog onClose={()=>this.setState({dialog: null})} viewer={this} module={this.state.module}/>}
            <Grid fluid style={{paddingTop: 16}}>
                <PageHeader>Recent projects</PageHeader>
                <ProjectsBrowser root={this} id="recent" modules={this.state.recent}/>
                <PageHeader>All projects</PageHeader>
                <ProjectsBrowser root={this} id="all" modules={this.state.all}/>
            </Grid>
        </div>
    }
}