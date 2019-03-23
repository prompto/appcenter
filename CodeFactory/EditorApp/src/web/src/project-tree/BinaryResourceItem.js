import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import ResourceItem from './ResourceItem';

export default class BinaryResourceItem extends ResourceItem {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked.bind(this)} onContextMenu={this.handleContextMenu}>
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
        let resource = this.props.root.catalog.resourceFromContent(content);
        if(resource.value.data)
            content.data = resource.value.data;
        else if(resource.value.file)
            content.file = resource.value.file;
        this.props.root.setEditorContent(content);
    }

}