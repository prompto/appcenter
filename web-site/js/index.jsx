class NewModuleTypeButton extends React.Component {

    render() {
        let style = { width: "90px", height: "130px", boxSizing: "content-box", textAlign: "center", marginBottom: "10px"};
        if(this.props.active)
            style = Object.assign(style, { borderStyle: "solid",  borderWidth: "med",  borderRadius: "10%", borderColor: "lightsteelblue"});
        return <div className="col-md-2 placeholder" style={style} >
            <h5>
                <a id={this.props.id} className="thumbnail" onClick={this.props.click}>
                    <div style={{width: "86px", height: "82px" }}>
                        <img src={this.props.image} style={{ maxWidth: "90%", maxHeight: "90%", width: "auto", height: "auto", borderRadius: 0 }}/>
                    </div>
                    <strong>{this.props.title}</strong>
                </a>
            </h5>
        </div>
    }
}

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleModuleType = this.handleModuleType.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleIcon = this.handleIcon.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleStartMethod = this.handleStartMethod.bind(this);
        this.createNewModule = this.createNewModule.bind(this);
        this.state = { type: "batch", name: null, description: null, iconFile: null, hasStartMethod: true, create: true, startMethod: null};
    }

    createNewModule() {
        const formData = new FormData();
        let image = null;
        if(this.state.iconFile) {
            image = { mimeType: this.state.iconFile.type, partName: "@" + this.state.iconFile.name };
            formData.append(image.partName, this.state.iconFile);
        }
        const params = [
            {name: "type", type: "Text", value: this.state.type},
            {name: "name", type: "Text", value: this.state.name},
            {name: "description", type: "Text", value: this.state.description},
            {name: "createEntryPoint", type: "Boolean", value: this.state.hasStartMethod},
            {name: "entryPoint", type: "Text", value: this.state.startMethod},
            {name: "image", type: "Image", value: image}
        ];
        formData.append("params", JSON.stringify(params));
        $.ajax({
            url: "/ws/run/createModule",
            type: 'POST',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            error: function (xhr, status, thrown) {
                alert(thrown);
            },
            success: function (returndata) {
                getAllModules(response => viewer.all.modulesReceived(response));
            }
        });
        $("#new-project-dialog").modal("hide");
    }


    handleModuleType(e) {
        const id = e.currentTarget.id;
        const hasStartMethod = ["batch", "service", "website"].indexOf(id) >= 0;
        this.setState( { type: id, hasStartMethod: hasStartMethod } );
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.setState( { name: name } );
    }

    handleDescription(e) {
        const description = e.currentTarget.value;
        this.setState( { description: description } );
    }

    handleIcon(e) {
        const files = e.currentTarget.files;
        const iconFile = files.length ? files[0] : null;
        this.setState( { iconFile: iconFile } );
    }

    handleCreate(e) {
        const id = e.currentTarget.id;
        this.setState( { create: id==="create" } );
    }

    handleStartMethod(e) {
        const startMethod = e.currentTarget.value;
        this.setState( { startMethod: startMethod } );
    }

    render() {
        const type = this.state.type;
        return <div className="modal-dialog" style={{width: "640px"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 className="modal-title">New project</h4>
                    </div>
                    <div className="modal-body row">
                        <form role="form">
                            <div className="col-md-12">
                                <div className="form-group" style={{marginBottom: "0px"}}>
                                    <label htmlFor="module-type">Type</label>
                                    <div id="module-type" className="placeholders btn-group" data-toggle="buttons" style={{marginBottom: "0px"}}>
                                        <NewModuleTypeButton id="batch" image="/img/batch.jpg" title="Batch" click={this.handleModuleType} active={type==="batch"}/>
                                        <NewModuleTypeButton id="script" image="/img/script.jpg" title="Script" click={this.handleModuleType} active={type==="script"}/>
                                        <NewModuleTypeButton id="service" image="/img/service.jpg" title="Web service" click={this.handleModuleType} active={type==="service"}/>
                                        <NewModuleTypeButton id="website" image="/img/website.jpg" title="Web site" click={this.handleModuleType} active={type==="website"}/>
                                        <NewModuleTypeButton id="library" image="/img/library.jpg" title="Library" click={this.handleModuleType} active={type==="library"}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter module name" onChange={this.handleName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" placeholder="Enter module description" onChange={this.handleDescription}/>
                                </div>
                                <div id="icon" className="form-group">
                                    <label htmlFor="icon">Icon</label>
                                    <input type="file" accept="image/*" className="form-control" id="icon" placeholder="Icon file" onChange={this.handleIcon}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="entry-point">Start method&nbsp;&nbsp;</label>
                                    <div id="has-start-method" className="btn-group">
                                        <label className="radio-inline" htmlFor="create">
                                            <input id="create" type="radio" name="entry-point" disabled={!this.state.hasStartMethod} checked={this.state.create} onChange={this.handleCreate}/>Create</label>
                                        <label className="radio-inline" htmlFor="existing">
                                            <input id="existing" type="radio" name="entry-point" disabled={!this.state.hasStartMethod} checked={!this.state.create} onChange={this.handleCreate}/>Use existing</label>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Enter existing entry point" readOnly={this.state.create || !this.state.hasStartMethod} onChange={this.handleStartMethod} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.createNewModule}>Create</button>
                    </div>
                </div>
            </div>;
    }

}


class ProjectMenu extends React.Component {

    constructor(props) {
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
        this.state = { active: false, left: null, top: null };
    }

    render() {
        const id = "project-menu-" + this.props.module.dbId.value.toString();
        const exportUrl = '/ws/run/exportModule?params=[{"name":"dbId", "value":"' + this.props.module.dbId.value.toString() + '"}]';
        return this.state.active && <div id={id} className="dropdown clearfix" style={{ position: "fixed", display: "block", left: this.state.left, top: this.state.top, zIndex: 999999 }}>
            <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style={{ display: "block", position: "static", marginBottom: "5px"}} >
                <li><a tabIndex="-1" href={exportUrl} target="_blank">Export</a></li>
                <li><a tabIndex="-1" href="#" onClick={this.deleteProject} >Delete</a></li>
            </ul>
        </div>

    }

    deleteProject() {
        const deleteUrl = '/ws/run/deleteModule?params=[{"name":"dbId", "value":"' + this.props.module.dbId.value.toString() + '"}]';
        $.getJSON(deleteUrl, null, () => {
            getRecentModules(response => viewer.recent.modulesReceived(response));
            getAllModules(response => viewer.all.modulesReceived(response));
        });
    }

}

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    render() {
        const module = this.props.module;
        const id = module.dbId.value;
        const href = "../ide/index.html?dbId=" + module.dbId.value + "&name=" + module.name;
        const imageSrc = module.image || "/img/library.jpg";
        return <div className="col-xs-4 col-sm-2 placeholder project" style={{width: "170px", boxSizing: "content-box" }}>
                    <a id={id} href={href} target="_blank" className="thumbnail" onContextMenu={this.handleContextMenu}>
                        <div style={{width: "160px", height: "160px" }}>
                            <img src={imageSrc} style={{ maxWidth: "90%", maxHeight: "90%", width: "auto", height: "auto" }}/>
                        </div>
                        <strong>{module.name}</strong><br/>
                        <span className="text-muted">{module.description}</span>
                    </a>
                    <ProjectMenu module={this.props.module} ref={ m => this.menu = m} />
                </div>;
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.menu.setState( { active: true, left: "" + e.pageX + "px",  top: "" + e.pageY + "px" } );
        document.addEventListener("click", this.handleDocumentClick );
        document.addEventListener("contextmenu", this.handleDocumentClick );
    }

    handleDocumentClick(e) {
        const menu = $("#" + "project-menu-" + this.props.module.dbId.value.toString())[0];
        const inside = menu==e.target || $.contains(menu, e.target);
        if(!inside || e.target.href==="#")
            e.preventDefault();
        this.menu.setState( { active: false } );
        document.removeEventListener("contextmenu", this.handleDocumentClick );
        document.removeEventListener("click", this.handleDocumentClick );
    }
}


class ProjectsSection extends React.Component {

    constructor(props) {
        super(props);
        this.modulesReceived = this.modulesReceived.bind(this);
        this.props.getModules(this.modulesReceived);
        this.state = { modules: [] };
    }

    modulesReceived(response) {
        if(response.error)
            alert(response.error);
        else {
            const modules = response.data.value.map(item => item.value);
            this.setState( { modules: modules } );
        }
    }

    render() {
        const modules = this.state.modules;
        return <div id={this.props.id} className="col-sm-9 col-md-10 main">
            <h3 className="page-header">{this.props.title}</h3>
            <div id={this.props.itemsId} className="row placeholders">
                {
                    modules.map( module => {
                        return <Project key={module.dbId.value} module={module} />;
                    } )
                }
            </div>
        </div>;
    }
}

function getRecentModules(callback) {
    $.getJSON('/ws/run/getRecentModules?params=[{"name":"count", "type":"Integer", "value":8}]', null, callback);
}

function getAllModules(callback) {
    $.getJSON('/ws/run/getAllModules', null, callback);
}

class ProjectsViewer extends React.Component {

    render() {
        return <div className="container-fluid">
                    <div className="row">
                        <ProjectsSection ref={r=>this.recent=r} id="recent-projects" itemsId="recent-items" getModules={getRecentModules} title="Recent projects"/>
                        <ProjectsSection ref={r=>this.all=r} id="all-projects" itemsId="all-items" getModules={getAllModules} title="All projects"/>
                    </div>
                </div>;
    }

}

function newProject() {
    ReactDOM.render(<NewProjectDialog/>, document.getElementById('new-project-dialog'));
    $("#new-project-dialog").modal("show");
}


function installDataViewerHref() {
    $.getJSON('/ws/run/getDataPort', null, response => {
        if (response.error)
            ;
        else {
            const href = $(location).attr('protocol')
                + "//" + $(location).attr('hostname')
                + ":" + response.data + "/";
            $("#data-explorer").attr("href", href);
        }
    });
}

let viewer = null;

$(document).ready(function() {
    viewer = ReactDOM.render(<ProjectsViewer/>, document.getElementById('projects-viewer'));
    installDataViewerHref();
});
