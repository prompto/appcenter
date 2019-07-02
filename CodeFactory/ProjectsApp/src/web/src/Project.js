import React from 'react';
import { MenuItem, Col, Thumbnail, Clearfix } from 'react-bootstrap';
import LibraryPng from "./img/library.png";
import BatchJpg from "./img/batch.jpg";
import ScriptJpg from "./img/script.jpg";
import ServiceJpg from "./img/service.jpg";
import WebSiteJpg from "./img/website.jpg";
import WebLibraryJpg from "./img/weblibrary.jpg";
import { displayContextMenu } from "./components/ContextMenu";

export const PROJECT_DEFAULT_IMAGES = {
    library : LibraryPng,
    script : ScriptJpg,
    website : WebSiteJpg,
    weblibrary : WebLibraryJpg,
    batch : BatchJpg,
    service : ServiceJpg,
};

class ContextMenu extends React.Component {

    render() {
        const root = this.props.root;
        const module = this.props.module;
        return <Clearfix>
             <ul className="dropdown-menu" style={{display: "block"}}>
                <MenuItem href={"#"} onSelect={()=>root.exportProject(module)}>Export</MenuItem>
                <MenuItem href={"#"} onSelect={()=>root.modifyProject(module)}>Modify</MenuItem>
                <MenuItem href={"#"} onSelect={()=>root.deleteProject(module)}>Delete</MenuItem>
                <MenuItem divider/>
                <MenuItem href={"#"} onSelect={()=>alert("Under construction")}>New version...</MenuItem>
                <MenuItem href={"#"} onSelect={()=>alert("Under construction")}>Freeze...</MenuItem>
                <MenuItem href={"#"} onSelect={()=>alert("Under construction")}>Deploy...</MenuItem>
            </ul>
        </Clearfix>;
    }
}


export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }

    render() {
        const module = this.props.module;
        const imageSrc = module.value.image || PROJECT_DEFAULT_IMAGES[module.type.toLowerCase()];
        const description = module.value.description || "No description";
        const descClassName = "text-muted" + (description==="No description" ? " placeholder" : "");
        return <Col xs={4} sm={2} style={{width: "170px", boxSizing: "content-box" }} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
            <Thumbnail src={imageSrc} >
                <p><strong>{module.value.name}</strong></p>
                <p><span className="text-muted">{module.value.version.value}</span></p>
                <span className={descClassName}>{description}</span>
            </Thumbnail>
        </Col>;
    }

    handleClick() {
        const module = this.props.module;
        // TODO find why dbId.value stopped working
        const href = "../ide/index.html?dbId=" + (module.value.dbId.value || module.value.dbId) + "&name=" + module.value.name;
        const name = "Project:" + module.value.name;
        window["openWindowOrBringItToFront"](href, name);
    }

    handleContextMenu(e) {
        const menu = <ContextMenu root={this.props.root} module={this.props.module}/>;
        displayContextMenu(e, menu);
    }


}