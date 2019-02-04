import { makeValidId } from '../code/Utils';
import React from 'react';
import TreeItem from './TreeItem';
import { ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';
import MethodProtoItem from './MethodProtoItem';

export default class MultiProtoMethodItem extends TreeItem {

    constructor(props) {
        super(props);
        this.state = { showProtos: true };
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
        this.expandContent = this.expandContent.bind(this);
        this.children = new Set();
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
    }

   addChild(ref) {
        if(ref)
            this.children.add(ref);
    }

    removeChild(ref) {
        if(ref)
            this.children.delete(ref);
    }

    render() {
        const method = this.props.method;
        return <ListGroupItem>
            <label className='nav-header' onClick={this.toggleTreeNode}>{method.name}</label>
            <Collapse in={this.state.showProtos}>
                <ListGroup>
                    {
                        method.protos.map(proto => {
                            const key = "method_" + makeValidId(proto.proto);
                            return <MethodProtoItem ref={this.addChild} parent={this} title key={key} method={method} proto={proto} root={this.props.root}/>;
                        })
                    }
                </ListGroup>
            </Collapse>
        </ListGroupItem>;
    }


    toggleTreeNode(e) {
        this.setState({showProtos: !this.state.showProtos});
    }

    expandContent(content, simulateClick) {
        for(const child of this.children) {
            if(child.expandContent(content, simulateClick)) {
                this.setState({showItems: true});
                return true;
            }
        }
        return false;
    }

}
