import axios from 'axios';
import React from 'react';
import { displayModal } from './components/ModalDialog';
import { Grid, PageHeader } from 'react-bootstrap';
import ProjectsNavBar from './ProjectsNavBar';
import ProjectsBrowser from './ProjectsBrowser';
import NewProjectDialog from './dialogs/NewProjectDialog';
import ModifyProjectDialog from './dialogs/ModifyProjectDialog';
import DeleteProjectDialog from './dialogs/DeleteProjectDialog';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recent: [], all: [] };
        this.newProject = this.newProject.bind(this);
    }

    componentDidMount() {
        this.fetchRecentModules();
        this.fetchAllModules();
    }

    fetchRecentModules() {
        const params = { params: JSON.stringify([{"name": "count", "type": "Integer", "value": 8}]) };
        axios.get('/ws/run/getRecentModules',  { params: params }).then(resp => {
            const modules = this.modulesReceived.bind(this)(resp.data);
            this.setState({recent: modules})
        });
    }

    fetchAllModules() {
        axios.get('/ws/run/getAllModules').then(resp => {
            const modules = this.modulesReceived.bind(this)(resp.data);
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

    newProject() {
        displayModal(<NewProjectDialog viewer={this} moduleCreated={this.moduleCreated.bind(this)}/>)
    }

    moduleCreated() {
        this.fetchRecentModules();
        this.fetchAllModules();
    }

    modifyProject(module) {
        displayModal(<ModifyProjectDialog module={module} moduleUpdated={this.moduleUpdated.bind(this)}/>);
    }

    moduleUpdated() {
        this.fetchRecentModules();
        this.fetchAllModules();
    }

    deleteProject(module) {
        displayModal(<DeleteProjectDialog module={module} moduleDeleted={this.moduleDeleted.bind(this)}/>);
    }

    moduleDeleted() {
        this.fetchRecentModules();
        this.fetchAllModules();
    }

    render() {
        return <div>
            <ProjectsNavBar root={this}/>
            <Grid fluid style={{paddingTop: 16}}>
                <PageHeader>Recent projects</PageHeader>
                <ProjectsBrowser root={this} id="recent" modules={this.state.recent}/>
                <PageHeader>All projects</PageHeader>
                <ProjectsBrowser root={this} id="all" modules={this.state.all}/>
            </Grid>
        </div>
    }
}