import React from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class PromptoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.expandContent = this.expandContent.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a href="/">{this.props.item.name}</a> {this.props.item.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const content = { type: "Prompto", subType: this.props.subType.id, name: this.props.item.name, core: this.props.item.core };
        this.props.root.setEditorContent(content);
    }

    expandContent(content, simulateClick) {
        // can only happen from editor -> tree so no action required
        return content.type==="Prompto" && content.value.name===this.props.item.name;
    }
}