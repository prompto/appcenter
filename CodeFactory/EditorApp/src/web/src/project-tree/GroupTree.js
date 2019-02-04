import React from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';

export default class GroupTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showItems: false };
        this.children = new Set();
        this.addChild = this.addChild.bind(this);
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
    }

    addChild(ref) {
        if(ref)
            this.children.add(ref);
    }

    render() {
        let items = this.props.items;
        if(!this.props.showLibraries)
            items = items.filter(item => !item.core);
        return <ListGroupItem id={this.id}>
            <label className="nav-header" onClick={this.toggleTreeNode}>{this.title}</label>
            <Collapse in={this.state.showItems}>
                <ListGroup>
                    {items.length===0 ? <ListGroupItem><i>Empty</i></ListGroupItem> : items.map(item => this.renderItem(item))}
                </ListGroup>
            </Collapse>
        </ListGroupItem>;
    }


    toggleTreeNode(e) {
        this.setState({showItems: !this.state.showItems});
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