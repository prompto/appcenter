import React from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class SingleProtoMethodItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.expandContent = this.expandContent.bind(this);
    }

    render() {
        const id = "method_" + this.props.method.name;
        return <ListGroupItem id={id} onClick={this.itemClicked}>
            <a href="/">{this.props.method.name}</a> {this.props.method.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const method = this.props.method;
        const content = { type: "Prompto", subType: "method", name: method.name, proto: method.proto, core: method.core, main: method.main };
        this.props.root.setEditorContent(content);
    }

    expandContent(content, simulateClick) {
        return false; // TODO
    }

}