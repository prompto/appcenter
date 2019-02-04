import React from 'react';
import TreeItem from './TreeItem';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class SingleProtoMethodItem extends TreeItem {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.expandContent = this.expandContent.bind(this);
    }

    render() {
        const id = "method_" + this.props.method.name;
        return <ListGroupItem id={id} onClick={this.itemClicked}>
            { /* eslint-disable-next-line */ }
            <a href="#">{this.props.method.name}</a> {this.props.method.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        this.select();
    }

    select() {
        const method = this.props.method;
        const content = { type: "Prompto", subType: "method", name: method.name, proto: method.proto, core: method.core, main: method.main };
        this.props.root.setEditorContent(content);
    }

    expandContent(content, simulateClick) {
        if(content.type==="Prompto" && content.value.name===this.props.method.name){
            if(simulateClick)
                this.select();
            return true;
        } else
            return false;
    }

}