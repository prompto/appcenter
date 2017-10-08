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

class LibraryParameters extends React.Component {

    render() {
        return null;
    }
}

class ScriptParameters extends React.Component {

    render() {
        return null;
    }
}

class OptionalInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { create: this.props.create, name: null };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleCreate(e) {
        const create = e.currentTarget.id === this.props.id + "-create";
        this.setState( { create: create });
        this.props.handleCreate(create);
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.setState( { name: name });
        this.props.handleName(name);
    }


    render() {
        return <div className="form-group">
                    <label htmlFor={ this.props.id + "-create-method" }>{this.props.label}&nbsp;&nbsp;</label>
                    <div id={ this.props.id + "-create-method" } className="btn-group">
                        <label className="radio-inline" htmlFor={ this.props.id + "-create" }>
                            <input id={ this.props.id + "-create" } type="radio" name={ this.props.id + "-start-method" } checked={this.state.create} onChange={this.handleCreate}/>Create new</label>
                        <label className="radio-inline" htmlFor={ this.props.id + "-existing" }>
                            <input id={ this.props.id + "-existing" } type="radio" name={ this.props.id + "-start-method" } checked={!this.state.create} onChange={this.handleCreate}/>Use existing</label>
                    </div>
                    <input type="text" className="form-control" placeholder={this.props.placeHolder} readOnly={this.state.create} onChange={this.handleName} />
                </div>
    }

}

class BatchParameters extends React.Component {

    constructor(props) {
        super(props);
        this.dialog = this.props.dialog;
        this.startMethodLabel = "Start method:";
        this.handleCreateStart = this.handleCreateStart.bind(this);
        this.handleStartMethod = this.handleStartMethod.bind(this);
    }

    handleCreateStart(create) {
        this.dialog.setState( { createStart: create } );
    }

    handleStartMethod(name) {
        this.dialog.setState( { startMethod: name } );
    }

    render() {
        let moduleName = this.dialog.state.name || "";
        let methodName = "main_" + moduleName.replace(/ /g, "_");
        return <OptionalInput id="method" label={this.startMethodLabel} create={this.dialog.state.createStart} placeHolder={ methodName }
                              handleCreate={this.handleCreateStart} handleName={this.handleStartMethod} />
    }

}

class ServiceParameters extends BatchParameters {

    constructor(props) {
        super(props);
        this.startMethodLabel = "Server about to start method:";
    }

}

class WebSiteParameters extends ServiceParameters {

    constructor(props) {
        super(props);
        this.handleCreateHome = this.handleCreateHome.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
    }

    handleCreateHome(create) {
        this.dialog.setState( { createHome: create } );
    }

    handleHomePage(name) {
        this.dialog.setState( { homePage: name } );
    }

    render() {
        let moduleName = this.dialog.state.name || "";
        let methodName = "main_" + moduleName.replace(/ /g, "_");
        return <div>
                <OptionalInput id="method" label={this.startMethodLabel} create={this.dialog.state.createStart} placeHolder={ methodName }
                               handleCreate={this.handleCreateStart} handleName={this.handleStartMethod} />
                <OptionalInput id="home" label="Home page:" create={this.dialog.state.createHome} placeHolder={ this.dialog.state.name + "/index.html" }
                               handleCreate={this.handleCreateHome} handleName={this.handleHomePage} />
               </div>;
    }

}

const DroppedFileWidget = widgets.DroppedFileWidget.default;

const DroppedWidgetStyle = {
    display: 'inline-flex',
    border: '1px solid lightgray',
    height: '160px',
    width: '160px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center'
};

class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleModuleType = this.handleModuleType.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDropIcon = this.handleDropIcon.bind(this);
        this.createNewModule = this.createNewModule.bind(this);
        this.state = { type: "batch", name: null, description: null, iconFile: null, createStart: true, startMethod: null, createHome: true, homePage: null };
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
            {name: "image", type: "Image", value: image},
            {name: "createStart", type: "Boolean", value: this.state.createStart},
            {name: "startMethod", type: "Text", value: this.state.startMethod},
            {name: "createHome", type: "Boolean", value: this.state.createHome},
            {name: "homePage", type: "Text", value: this.state.homePage}
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
        const type = e.currentTarget.id;
        this.setState( { type: type } );
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.setState( { name: name } );
    }

    handleDescription(e) {
        const description = e.currentTarget.value;
        this.setState( { description: description } );
    }

    handleDropIcon(file) {
        this.setState( { iconFile: file } );
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
                                        <NewModuleTypeButton id="script" image="/img/script.jpg" title="Script" click={this.handleModuleType} active={type==="script"}/>
                                        <NewModuleTypeButton id="library" image="/img/library.jpg" title="Library" click={this.handleModuleType} active={type==="library"}/>
                                        <NewModuleTypeButton id="batch" image="/img/batch.jpg" title="Batch" click={this.handleModuleType} active={type==="batch"}/>
                                        <NewModuleTypeButton id="service" image="/img/service.jpg" title="Web service" click={this.handleModuleType} active={type==="service"}/>
                                        <NewModuleTypeButton id="website" image="/img/website.jpg" title="Web site" click={this.handleModuleType} active={type==="website"}/>
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
                                    <label htmlFor="icon">Icon</label><br/>
                                    <DroppedFileWidget onDrop={this.handleDropIcon} style={DroppedWidgetStyle}/>
                                </div>
                                { this.state.type==="script" && <ScriptParameters dialog={this}/> }
                                { this.state.type==="library" && <LibraryParameters  dialog={this}/> }
                                { this.state.type==="batch" && <BatchParameters  dialog={this}/> }
                                { this.state.type==="service" && <ServiceParameters  dialog={this}/> }
                                { this.state.type==="website" && <WebSiteParameters  dialog={this}/> }
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


let viewer = null;

$(document).ready(function() {
    viewer = ReactDOM.render(<ProjectsViewer/>, document.getElementById('projects-viewer'));
});
