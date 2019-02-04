import { makeValidId } from '../code/Utils';
import React from 'react';
import GroupTree from "./GroupTree";
import SingleProtoMethodItem from './SingleProtoMethodItem';
import MultiProtoMethodItem from './MultiProtoMethodItem';

export default class MethodTree extends GroupTree {

    constructor(props) {
        super(props);
        this.id = "methods";
        this.title = "Methods";
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(method) {
        const key = this.props.type + "_" + makeValidId(method.name);
        if(method.protos.length>1)
            return <MultiProtoMethodItem  ref={this.addChild} parent={this} title key={key} method={method} root={this.props.root}/>;
        else
            return <SingleProtoMethodItem  ref={this.addChild} parent={this} title key={key} method={method} root={this.props.root}/>;
    }
}