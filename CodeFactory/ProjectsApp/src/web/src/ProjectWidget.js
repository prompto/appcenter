import React from 'react';
import { MenuItem, Col, Thumbnail, Clearfix } from 'react-bootstrap';
import LibraryPng from "./img/library.png";
import BatchJpg from "./img/batch.jpg";
import ScriptJpg from "./img/script.jpg";
import ServiceJpg from "./img/service.jpg";
import WebSiteJpg from "./img/website.jpg";
import WebLibraryJpg from "./img/weblibrary.jpg";
import LockedPng from "./img/locked.png";
import TaggedPng from "./img/green-light.jpg";
import ParkedPng from "./img/parked.png";
import { displayContextMenu } from "./components/ContextMenu";

export const PROJECT_DEFAULT_IMAGES = {
    library : LibraryPng,
    script : ScriptJpg,
    website : WebSiteJpg,
    weblibrary : WebLibraryJpg,
    batch : BatchJpg,
    service : ServiceJpg,
};

const PROJECT_STATUS_IMAGES = {
    PROVIDED: LockedPng,
    TAGGED: TaggedPng
};

class ContextMenu extends React.Component {

    render() {
        const root = this.props.root;
        const module = this.props.module;
        const moduleStatus = module.value.moduleStatus || { name: "ACTIVE" };
        const status = moduleStatus.name;
        const parked = module.value.parked || false;
        const canModify = status==="ACTIVE";
        const canPark = !parked && status!=="PROVIDED";
        const canUnpark = parked;
        const canDelete = parked;
        const canVersion = status !== "PROVIDED";
        const canTag = status==="ACTIVE";
        const canUntag = status==="TAGGED";
        return <Clearfix>
             <ul className="dropdown-menu" style={{display: "block"}}>
                <MenuItem href={"#"} onSelect={()=>root.exportProject(module)}>Export</MenuItem>
                 { canModify && <MenuItem href={"#"} onSelect={()=>root.modifyProject(module)}>Modify...</MenuItem> }
                 { canPark && <MenuItem href={"#"} onSelect={()=>root.parkProject(module)}>Park...</MenuItem> }
                 { canUnpark && <MenuItem href={"#"} onSelect={()=>root.unparkProject(module)}>Unpark</MenuItem> }
                 { canDelete && <MenuItem href={"#"} onSelect={()=>root.deleteProject(module)}>Delete...</MenuItem> }
                 { (canVersion || canTag || canUntag) && <MenuItem divider/> }
                 { canVersion && <MenuItem href={"#"} onSelect={()=>root.newVersion(module)}>New version...</MenuItem> }
                 { canTag && <MenuItem href={"#"} onSelect={()=>root.tagProject(module)}>Tag...</MenuItem> }
                 { canUntag && <MenuItem href={"#"} onSelect={()=>root.untagProject(module)}>Untag...</MenuItem> }
            </ul>
        </Clearfix>;
    }
}


export default class ProjectWidget extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }

    render() {
        const module = this.props.module;
        const status = module.value.moduleStatus.name;
        const statusImg = module.value.parked ? ParkedPng : (PROJECT_STATUS_IMAGES[status] || null);
        const imageSrc = module.value.image ? module.value.image.value.url : PROJECT_DEFAULT_IMAGES[module.type.toLowerCase()];
        const description = module.value.description || "No description";
        const descClassName = "text-muted" + (description==="No description" ? " placeholder" : "");

        return <Col xs={4} sm={2} style={{width: "170px", boxSizing: "content-box" }} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
            <div>
                <Thumbnail src={imageSrc}>
                    <p><strong>{module.value.name}</strong></p>
                    <p><span className="text-muted">{module.value.version.value}</span></p>
                    <span className={descClassName}>{description}</span>
                </Thumbnail>
                { statusImg && <img alt="" className="status" src={statusImg}/> }
            </div>
        </Col>;
    }

    handleClick() {
        const module = this.props.module;
        if(module.value.moduleStatus.name==="ACTIVE" || window.location.protocol==="http:") {
            // TODO find why dbId.value stopped working
            const href = "../ide/index.html?dbId=" + (module.value.dbId.value || module.value.dbId) + "&name=" + module.value.name;
            const name = "Project:" + module.value.name;
            window["openWindowOrBringItToFront"](href, name);
        }
    }

    handleContextMenu(e) {
        const menu = <ContextMenu root={this.props.root} module={this.props.module}/>;
        displayContextMenu(e, menu);
    }


}