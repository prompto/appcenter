const { ListGroup, ListGroupItem, Collapse, Glyphicon } = ReactBootstrap;

class GroupTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showItems: false };
        this.children = [];
        this.addChild = this.addChild.bind(this);
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
    }

    addChild(ref) {
        if(ref)
            this.children.push(ref);
    }

    render() {
        let items = this.props.items;
        if(!this.props.showLibraries)
            items = items.filter(item => !item.core);
        return <ListGroupItem>
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

    selectContent(content) {
        for(var i=0; i<this.children.length; i++) {
            const child = this.children[i];
            if(child.selectContent(content)) {
                this.setState({showItems: true});
                return true;
            }
        }
        return false;
    }

}

class PromptoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.selectContent = this.selectContent.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.item.name}</a> {this.props.item.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const content = { type: "Prompto", subType: this.props.subType, name: this.props.item.name, core: this.props.item.core };
        this.props.root.setEditorContent(content);
    }

    selectContent(content) {
        return false; // TODO
    }
}

class PromptoTree extends GroupTree {

    constructor(props) {
        super(props);
        this.title = this.props.subType.items.substring(0,1).toUpperCase() + this.props.subType.items.substring(1);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        const key = this.props.type + "_" + makeValidId(item.name);
        return <PromptoItem  ref={this.addChild} title key={key} subType={this.props.subType} item={item} root={this.props.root}/>;
    }


}

class SingleProtoMethodItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.selectContent = this.selectContent.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.method.name}</a> {this.props.method.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const method = this.props.method;
        const content = { type: "Prompto", subType: "method", name: method.name, proto: method.proto, core: method.core, main: method.main };
        this.props.root.setEditorContent(content);
    }

    selectContent(content) {
        return false; // TODO
    }

}

class MethodProtoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.selectContent = this.selectContent.bind(this);
    }

    render() {
        const method = this.props.method;
        const proto = this.props.proto;
        const key = "method_" + makeValidId(proto.proto);
        return <ListGroupItem key={key} onClick={this.itemClicked}>
            <a>{proto.proto}</a> {method.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const method = this.props.method;
        const proto = this.props.proto;
        const content = { type: "Prompto", subType: "method", name: method.name, proto: proto.proto, core: method.core, main: proto.main };
        this.props.root.setEditorContent(content);
    }

    selectContent(content) {
        return false; // TODO
    }

}

class MultiProtoMethodItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showProtos: true };
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
        this.selectContent = this.selectContent.bind(this);
        this.children = [];
        this.addChild = this.addChild.bind(this);
    }

    addChild(ref) {
        if(ref)
            this.children.push(ref);
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
                            return <MethodProtoItem ref={this.addChild} title key={key} method={method} proto={proto} root={this.props.root}/>;
                        })
                    }
                </ListGroup>
            </Collapse>
        </ListGroupItem>;
        return <div/>;
    }


    toggleTreeNode(e) {
        this.setState({showProtos: !this.state.showProtos});
    }

    selectContent(content) {
        for(var i=0; i<this.children.length; i++) {
            const child = this.children[i];
            if(child.selectContent(content)) {
                this.setState({showItems: true});
                return true;
            }
        }
        return false;
    }



}


class MethodTree extends GroupTree {

    constructor(props) {
        super(props);
        this.title = "Methods";
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(method) {
        const key = this.props.type + "_" + makeValidId(method.name);
        if(method.protos.length>1)
            return <MultiProtoMethodItem  ref={this.addChild} title key={key} method={method} root={this.props.root}/>;
        else
            return <SingleProtoMethodItem  ref={this.addChild} title key={key} method={method} root={this.props.root}/>;
    }
}


class ResourceItem extends React.Component {

    constructor(props) {
        super(props);
        this.selectContent = this.selectContent.bind(this);
    }

    selectContent(content) {
        if(content.type===this.props.resource.type && content.value.name===this.props.resource.value.name){
            this.select();
            return true;
        } else
            return false;
    }
}

class TextResourceItem extends ResourceItem {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.select = this.select.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.resource.value.name}</a>
        </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        this.select();
    }

    select() {
        let content = { type: this.props.type.id, name: this.props.resource.value.name };
        content.body = this.props.root.catalog.getResourceBody(content);
        this.props.root.setEditorContent(content);
    }
}

class TextResourceTree extends GroupTree {

    constructor(props) {
        super(props);
        this.title = this.props.type.label;
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        const key = item.value.mimeType.replace("/", "_") + "_" + makeValidId(item.value.name);
        return <TextResourceItem  ref={this.addChild} title key={key} type={this.props.type} resource={item} root={this.props.root}/>
    }

}

class BinaryResourceItem extends ResourceItem {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.select = this.select.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.resource.value.name}</a>
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


class BinaryResourceTree extends GroupTree {

    constructor(props) {
        super(props);
        this.title = this.props.type.label;
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        const key = item.value.mimeType.replace("/", "_") + "_" + makeValidId(item.value.name);
        return <BinaryResourceItem  ref={this.addChild} title key={key} type={this.props.type} resource={item} root={this.props.root}/>
    }


}

const ALL_PROMPTO_SUBTYPES = [{id:"attribute", items:"attributes"}, {id:"method", items: "methods"}, {id:"category", items: "categories"}, {id:"enumeration", items: "enumerations" }, {id:"test", items: "tests"}];

class ProjectTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showCodeItems: true, showResourceItems: true };
        this.toggleCodeItems = this.toggleCodeItems.bind(this);
        this.toggleResourceItems = this.toggleResourceItems.bind(this);
        this.selectContent = this.selectContent.bind(this);
        this.codeRoots = [];
        this.resourceRoots = [];
    }

    render() {
        const catalog = this.props.catalog;
        const showLibs = this.props.showLibraries;
        return <ListGroup>
            <ListGroupItem>
                <label onClick={this.toggleCodeItems}>Code</label>
                <Collapse in={this.state.showCodeItems}>
                    <ListGroup>
                        {
                            ALL_PROMPTO_SUBTYPES.map(subType=>{
                                    if(subType.id==="method")
                                        return <MethodTree key={subType.id} ref={ref=>this.codeRoots.push(ref)} items={catalog.methods} subType={subType} showLibraries={showLibs} root={this.props.root}/>;
                                    else
                                        return <PromptoTree key={subType.id} ref={ref=>this.codeRoots.push(ref)} items={catalog[subType.items]} subType={subType} showLibraries={showLibs} root={this.props.root}/>
                                }
                            )
                        }
                    </ListGroup>
                </Collapse>
            </ListGroupItem>
            <ListGroupItem>
                <label onClick={this.toggleResourceItems}>Resources</label>
                <Collapse in={this.state.showResourceItems}>
                    <ListGroup>
                        {
                            ALL_RESOURCE_TYPES.map((t => {
                                const items = catalog.resources[t.id];
                                if (t instanceof TextResourceType)
                                    return <TextResourceTree key={t.id} ref={ref => this.resourceRoots.push(ref)} type={t}
                                                             items={items} type={t} showLibraries={showLibs}
                                                             root={this.props.root}/>;
                                else
                                    return <BinaryResourceTree key={t.id} ref={ref => this.resourceRoots.push(ref)} type={t}
                                                               items={items} type={t}
                                                               showLibraries={showLibs} root={this.props.root}/>;
                        }), this)
                        }
                    </ListGroup>
                </Collapse>
            </ListGroupItem>
        </ListGroup>;
    }

    toggleCodeItems(e) {
        this.setState({showCodeItems: !this.state.showCodeItems});
    }


    toggleResourceItems(e) {
        this.setState({showResourceItems: !this.state.showResourceItems});
    }

    selectContent(content) {
        if (this.selectContentInRoots(this.resourceRoots, content))
            this.setState({showResourceItems: true});
        else if(this.selectContentInRoots(this.codeRoots, content))
            this.setState({showCodeItems: true});
    }

    selectContentInRoots(roots, content) {
        for (var i = 0; i < roots.length; i++) {
            const root = roots[i];
            if (root.selectContent(content))
                return true;
        }
        return false;
    }

}
