import { makeValidId } from '../code/Utils';
import React from 'react';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class MethodProtoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.expandContent = this.expandContent.bind(this);
    }

    componentWillUnmount() {
        this.props.parent.removeChild(this);
    }

    render() {
        const method = this.props.method;
        const proto = this.props.proto;
        const key = "method_" + makeValidId(proto.proto);
        return <ListGroupItem key={key} onClick={this.itemClicked}>
            { /* eslint-disable-next-line */ }
            {proto.proto.length===0 && <a href="#"><i>{"<no parameter>"}</i></a>}
            { /* eslint-disable-next-line */ }
            {proto.proto.length>0 && <a href="#">{proto.proto}</a>}
            {method.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const method = this.props.method;
        const proto = this.props.proto;
        const content = { type: "Prompto", subType: "method", name: method.name, proto: proto.proto, core: method.core, main: proto.main };
        this.props.root.setEditorContent(content);
    }

    expandContent(content, simulateClick) {
        return false; // TODO
    }

}