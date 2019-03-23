import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import ResourceItem from "./ResourceItem";

export default class TextResourceItem extends ResourceItem {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.select = this.select.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked} onContextMenu={this.handleContextMenu}>
            { /* eslint-disable-next-line */ }
            <a href="#">{this.props.resource.value.name}</a>
            { this.renderContextMenu() }
        </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        this.select();
    }

    select() {
        let content = { type: this.props.type.id, name: this.props.resource.value.name };
        this.props.root.catalog.loadResourceBody(content);
        this.props.root.setEditorContent(content);
    }
}