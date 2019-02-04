import React from 'react';
import { makeValidId } from '../code/Utils';
import GroupTree from "./GroupTree";
import PromptoItem from "./PromptoItem";

export default class PromptoTree extends GroupTree {

    constructor(props) {
        super(props);
        this.title = this.props.subType.items.substring(0,1).toUpperCase() + this.props.subType.items.substring(1);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        const key = this.props.type + "_" + makeValidId(item.name);
        return <PromptoItem  ref={this.addChild} parent={this} title key={key} subType={this.props.subType} item={item} root={this.props.root}/>;
    }


}