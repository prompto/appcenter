import axios from 'axios';
import React from 'react';
import { displayModal } from './components/ModalDialog';
import { Grid, PageHeader } from 'react-bootstrap';
import ProjectsNavBar from './ProjectsNavBar';
import ProjectsBrowser from './ProjectsBrowser';
import NewProjectDialog from './dialogs/NewProjectDialog';
import ModifyProjectDialog from './dialogs/ModifyProjectDialog';
import ParkProjectDialog from './dialogs/ParkProjectDialog';
import TagProjectDialog from './dialogs/TagProjectDialog';
import UntagProjectDialog from './dialogs/UntagProjectDialog';
import NewVersionDialog from './dialogs/NewVersionDialog';
import DeleteProjectDialog from './dialogs/DeleteProjectDialog';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { recent: [], active: [], parked: [], showParked: false };
        this.newProject = this.newProject.bind(this);
        this.importProject = this.importProject.bind(this);
        this.showParked = this.showParked.bind(this);
        this.fetchAllModules = this.fetchAllModules.bind(this);
    }

    componentDidMount() {
        this.fetchAllModules();
    }

    fetchAllModules() {
        this.fetchRecentModules();
        this.fetchActiveModules();
        this.fetchParkedModules();
    }


    fetchRecentModules() {
        const params = { params: JSON.stringify([{"name": "count", "type": "Integer", "value": 8}]) };
        axios.get('/ws/run/fetchRecentModules',  { params: params }).then(resp => {
            const modules = this.modulesReceived.bind(this)(resp.data);
            this.setState({recent: modules})
        });
    }

    fetchActiveModules() {
        axios.get('/ws/run/fetchActiveModules').then(resp => {
            const modules = this.modulesReceived.bind(this)(resp.data);
            this.setState({active: modules})
        });
    }

    fetchParkedModules() {
        axios.get('/ws/run/fetchParkedModules').then(resp => {
            const modules = this.modulesReceived.bind(this)(resp.data);
            this.setState({parked: modules})
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
        displayModal(<NewProjectDialog viewer={this} moduleCreated={this.fetchAllModules}/>)
    }

    modifyProject(module) {
        displayModal(<ModifyProjectDialog module={module} moduleUpdated={this.fetchAllModules}/>);
    }

    parkProject(module) {
        displayModal(<ParkProjectDialog module={module} moduleParked={this.fetchAllModules}/>);
    }

    unparkProject(module) {
        const dbId = (module.value.dbId.value || module.value.dbId).toString()
        const params = { params: JSON.stringify([{"name": "dbId", "value": dbId}]) };
        axios.get('/ws/run/unparkModule',  { params: params }).then(this.fetchAllModules);
    }

    tagProject(module) {
        displayModal(<TagProjectDialog module={module} moduleTagged={this.fetchAllModules}/>);
    }

    untagProject(module) {
        displayModal(<UntagProjectDialog module={module} moduleUntagged={this.fetchAllModules}/>);
    }

    newVersion(module) {
        displayModal(<NewVersionDialog module={module} versionCreated={this.fetchAllModules}/>);
    }

    deleteProject(module) {
        displayModal(<DeleteProjectDialog module={module} moduleDeleted={this.fetchAllModules}/>);
    }

    importProject() {
        const input = document.createElement("input");
        input.type = 'file';
        input.style = { display: "none" };
        input.accept = ".zip"
        input.onchange = e => {
            const file = e.target.files[0];
            const formData = new FormData();
            const partName = "@" + file.name;
            formData.append(partName, file);
            const blob = { mimeType: file.type, partName: partName };
            let params = [ { name: "blob", type: "Blob", value: blob } ];
            formData.append("params", JSON.stringify(params));
            axios.post("/ws/run/importModule", formData).then(response=>{
                this.fetchAllModules();
            }).catch(error=>alert(error));
        };
        input.click();
    }

    showParked() {
        this.setState({showParked: !this.state.showParked});
    }

    render() {
        return <div>
            <ProjectsNavBar onNewProject={this.newProject} onImportProject={this.importProject} showParked={this.state.showParked} onShowParked={this.showParked}/>
            <Grid fluid style={{paddingTop: 16}}>
                <PageHeader>Recent projects</PageHeader>
                <ProjectsBrowser root={this} id="recent" modules={this.state.recent}/>
                <PageHeader>Active projects</PageHeader>
                <ProjectsBrowser root={this} id="active" modules={this.state.active}/>
                { this.state.showParked &&
                    <>
                        <PageHeader>Parked projects</PageHeader>
                        <ProjectsBrowser root={this} id="parked" modules={this.state.parked}/>
                    </>
                }
            </Grid>
        </div>
    }
}