import React from 'react';
import { ListGroupItem, Clearfix, MenuItem } from 'react-bootstrap';
import ResourceItem from './ResourceItem';

export default class BinaryResourceItem extends ResourceItem {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.select = this.select.bind(this);
    }

    render() {
        const menuStyle = { position: "fixed", display: "block", left: this.state.menuLeft, top: this.state.menuTop, zIndex: 999999 };
        return <ListGroupItem onClick={this.itemClicked} onContextMenu={this.handleContextMenu}>
            <a href="/">{this.props.resource.value.name}</a>
            {this.state.contextMenu &&
            <Clearfix id="item-menu" style={menuStyle}>
                <ul className="dropdown-menu" style={{display: "block"}}>
                    <MenuItem href={"#"} onSelect={()=>this.props.root.setState({ resourceToRename: this.props.resource })}>Rename</MenuItem>
                </ul>
            </Clearfix>
            }
        </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        this.select();
    }

    select() {
        let content = { type: this.props.type.id, name: this.props.resource.value.name };
        let resource = this.props.root.catalog.resourceFromContent(content);
        if(resource.value.data)
            content.data = resource.value.data;
        else if(resource.value.file)
            content.file = resource.value.file;
        this.props.root.setEditorContent(content);
    }
}