const {  MenuItem, Row, Col, Thumbnail, Clearfix } = ReactBootstrap;

const moduleImage = {
    library : "img/library.png",
    script : "img/script.jpg",
    website : "img/website.jpg",
    weblibrary : "img/weblibrary.jpg",
    batch : "img/batch.jpg",
    service : "img/service.jpg",
};

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
        const imageSrc = module.value.image || moduleImage[module.type.toLowerCase()];
        const menuStyle = { position: "fixed", display: "block", left: this.state.menuLeft, top: this.state.menuTop, zIndex: 999999 };
        return <Col xs={4} sm={2} style={{width: "170px", boxSizing: "content-box" }} onContextMenu={this.handleContextMenu}>
            <Thumbnail src={imageSrc} onClick={this.handleClick}>
                <p><strong>{module.value.name}</strong></p>
                <span className="text-muted">{module.value.description}</span>
            </Thumbnail>
            {this.state.contextMenu && <Clearfix id="project-menu" style={menuStyle}>
                <ul className="dropdown-menu" style={{display: "block"}}>
                    <MenuItem href={"#"} onSelect={()=>this.props.root.exportProject(module)}>Export</MenuItem>
                    <MenuItem href={"#"} onSelect={()=>this.props.root.modifyProject(module)}>Modify</MenuItem>
                    <MenuItem href={"#"} onSelect={()=>this.props.root.deleteProject(module)}>Delete</MenuItem>
                </ul>
            </Clearfix>}
        </Col>;
    }

    handleClick() {
        const module = this.props.module;
        // TODO find why dbId.value stopped working
        const href = "../ide/index.html?dbId=" + (module.value.dbId.value || module.value.dbId) + "&name=" + module.value.name;
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


class ProjectsBrowser extends React.Component {

    render() {
        return <Row>
            {this.props.modules.map( module => {
                const dbId = module.value.dbId.value || module.value.dbId;
                return <Project key={dbId} root={this.props.root} module={module} />;
            })}
        </Row>;
    }
}
