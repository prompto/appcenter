const { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Grid, Row, Col, PageHeader, Thumbnail, Clearfix } = ReactBootstrap;

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {contextMenu: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    render() {
        const module = this.props.module;
        const imageSrc = module.value.image || "/img/" + module.type.toLowerCase() + ".jpg";
        const menuStyle = { position: "fixed", display: "block", left: this.state.menuLeft, top: this.state.menuTop, zIndex: 999999 };
        return <Col xs={4} sm={2} style={{width: "170px", boxSizing: "content-box" }} onContextMenu={this.handleContextMenu}>
                    <Thumbnail src={imageSrc} onClick={this.handleClick}>
                        <p><strong>{module.value.name}</strong></p>
                        <span className="text-muted">{module.value.description}</span>
                    </Thumbnail>
                    {this.state.contextMenu && <Clearfix id="project-menu" style={menuStyle}>
                        <ul className="dropdown-menu" style={{display: "block"}}>
                            <MenuItem href={"#"} onSelect={()=>this.props.root.exportProject(module)}>Export</MenuItem>
                            <MenuItem href={"#"} onSelect={()=>this.props.root.renameProject(module)}>Rename</MenuItem>
                            <MenuItem href={"#"} onSelect={()=>this.props.root.deleteProject(module)}>Delete</MenuItem>
                        </ul>
                    </Clearfix>}
                </Col>;
    }

    handleClick() {
        const module = this.props.module;
        const href = "../ide/index.html?dbId=" + module.value.dbId.value + "&name=" + module.value.name;
        window.open(href, "_blank");
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.setState( { contextMenu: true, menuLeft: e.pageX,  menuTop: e.pageY } );
        document.addEventListener("click", this.handleDocumentClick );
        document.addEventListener("contextmenu", this.handleDocumentClick );
    }

    contains(elem, child) {
        while(child!=null) {
            if(child==elem)
                return true;
            child = child.parentElement;
        }
        return false;
    }

    handleDocumentClick(e) {
        const menu = document.getElementById("project-menu");
        const inside = this.contains(menu, e.target);
        // only bubble up useful clicks
        if(!inside || e.target.href==="#")
            e.stopPropagation();
        this.setState( { contextMenu: false } );
        document.removeEventListener("contextmenu", this.handleDocumentClick );
        document.removeEventListener("click", this.handleDocumentClick );
    }

}


class ProjectsSection extends React.Component {

    render() {
        return <Row>
            {this.props.modules.map( module => <Project key={module.value.dbId.value} root={this.props.root} module={module} />)}
        </Row>;
    }
}

class ProjectsNavBar extends React.Component {

    render() {
        const btnStyle = {backgroundImage: "none"};
        return <Navbar inverse fluid fixedTop>
            <Navbar.Header>
                <Navbar.Brand pullLeft>
                    <a href="#">Prompto Development Center</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <NavItem href="/data/index.html" target="_blank">Data</NavItem>
                <NavItem href="#" target="_blank">Tutorials</NavItem>
                <NavItem href="http://www.prompto.org" target="_blank">Reference</NavItem>
            </Nav>
            <Navbar.Form pullRight>
                <Button type="button" onClick={this.props.root.newProject} style={btnStyle}>New</Button>
                &nbsp;
                <Button type="button" style={btnStyle}>Import</Button>
            </Navbar.Form>
        </Navbar>;
    }

}

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialog: null, module: null, recent: [], all: [] };
        this.newProject = this.newProject.bind(this);
        this.fetchRecentModules = this.fetchRecentModules.bind(this);
        this.fetchAllModules = this.fetchAllModules.bind(this);
        this.modulesReceived = this.modulesReceived.bind(this);
        this.renameProject = this.renameProject.bind(this);
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
        const dbId = module.value.dbId.value.toString()
        const exportUrl = '/ws/run/exportModule?params=[{"name":"dbId", "value":"' + dbId + '"}]';
        window.open(exportUrl, "Download");

    }

    renameProject(module) {
        this.setState({dialog: "RenameProject", module: module});
    }

    deleteProject(module) {
        const dbId = module.value.dbId.value.toString()
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
            {this.state.dialog==="RenameProject" && <RenameProjectDialog onClose={()=>this.setState({dialog: null})} viewer={this} module={this.state.module}/>}
            <Grid fluid style={{paddingTop: 16}}>
                <PageHeader>Recent projects</PageHeader>
                <ProjectsSection root={this} id="recent" modules={this.state.recent}/>
                <PageHeader>All projects</PageHeader>
                <ProjectsSection root={this} id="all" modules={this.state.all}/>
            </Grid>
        </div>
    }
}