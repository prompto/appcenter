const { ListGroup, ListGroupItem, Collapse, Glyphicon, Clearfix, MenuItem } = ReactBootstrap;

class GroupTree extends React.Component {

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

class PromptoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.expandContent = this.expandContent.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.item.name}</a> {this.props.item.core && <Glyphicon glyph="lock"/>}
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
        this.expandContent = this.expandContent.bind(this);
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

    expandContent(content, simulateClick) {
        return false; // TODO
    }

}

class MethodProtoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.expandContent = this.expandContent.bind(this);
    }

    render() {
        const method = this.props.method;
        const proto = this.props.proto;
        const key = "method_" + makeValidId(proto.proto);
        return <ListGroupItem key={key} onClick={this.itemClicked}>
            {proto.proto.length===0 && <a><i>{"<no parameter>"}</i></a>}
            {proto.proto.length>0 && <a>{proto.proto}</a>}
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

class MultiProtoMethodItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showProtos: true };
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
        this.expandContent = this.expandContent.bind(this);
        this.children = new Set();
        this.addChild = this.addChild.bind(this);
    }

    addChild(ref) {
        if(ref)
            this.children.add(ref);
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
        this.state = { contextMenu: null };
        this.expandContent = this.expandContent.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    expandContent(content, simulateClick) {
        if(content.type===this.props.resource.type && content.value.name===this.props.resource.value.name){
            if(simulateClick)
                this.select();
            return true;
        } else
            return false;
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.setState( { contextMenu: true, menuLeft: e.pageX,  menuTop: e.pageY } );
        document.addEventListener("click", this.handleDocumentClick );
        document.addEventListener("contextmenu", this.handleDocumentClick );
    }

    contains(elem, child) {
        while(child!=null) {
            if(child==elem)
                return true;
            child = child.parentElement;
        }
        return false;
    }

    handleDocumentClick(e) {
        const menu = document.getElementById("item-menu");
        const inside = this.contains(menu, e.target);
        // only bubble up useful clicks
        if(!inside || e.target.href==="#")
            e.stopPropagation();
        this.setState( { contextMenu: false } );
        document.removeEventListener("contextmenu", this.handleDocumentClick );
        document.removeEventListener("click", this.handleDocumentClick );
    }



}

class TextResourceItem extends ResourceItem {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
        this.select = this.select.bind(this);
    }

    render() {
        const menuStyle = { position: "fixed", display: "block", left: this.state.menuLeft, top: this.state.menuTop, zIndex: 999999 };
        return <ListGroupItem onClick={this.itemClicked} onContextMenu={this.handleContextMenu}>
            <a>{this.props.resource.value.name}</a>
            {this.state.contextMenu &&
                <Clearfix id="item-menu" style={menuStyle}>
                    <ul className="dropdown-menu" style={{display: "block"}}>
                        <MenuItem href={"#"} onSelect={()=>this.props.root.setState({ resourceToRename: this.props.resource })}>Rename</MenuItem>
                    </ul>
                </Clearfix>
            }
            </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        this.select();
    }

    select() {
        let content = { type: this.props.type.id, name: this.props.resource.value.name };
        this.props.root.catalog.loadResourceBody(content);
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
        return <ListGroupItem onClick={this.itemClicked} onContextMenu={this.handleContextMenu}>
            <a>{this.props.resource.value.name}</a>
            {this.state.contextMenu &&
            <Clearfix id="item-menu" style={menuStyle}>
                <ul className="dropdown-menu" style={{display: "block"}}>
                    <MenuItem href={"#"} onSelect={()=>this.props.root.setState({ resourceToRename: this.props.resource })}>Rename</MenuItem>
                </ul>
            </Clearfix>
            }
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

const ALL_PROMPTO_SUBTYPES = [{id:"attribute", items:"attributes"}, {id:"method", items: "methods"}, {id:"category", items: "categories"}, {id:"enumeration", items: "enumerations" }, {id:"test", items: "tests"}, , {id:"widget", items: "widgets"}];

class ProjectTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showCodeItems: true, showResourceItems: true };
        this.toggleCodeItems = this.toggleCodeItems.bind(this);
        this.toggleResourceItems = this.toggleResourceItems.bind(this);
        this.selectContent = this.selectContent.bind(this);
        this.showContent = this.showContent.bind(this);
        this.expandContent = this.expandContent.bind(this);
        this.addCodeRoot = this.addCodeRoot.bind(this);
        this.addResourceRoot = this.addResourceRoot.bind(this);
        this.codeRoots = new Set();
        this.resourceRoots = new Set();
    }

    addCodeRoot(ref) {
        if(ref)
            this.codeRoots.add(ref);
    }


    addResourceRoot(ref) {
        if(ref)
            this.resourceRoots.add(ref);
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
                                        return <MethodTree key={subType.id} ref={this.addCodeRoot} items={catalog.methods} subType={subType} showLibraries={showLibs} root={this.props.root}/>;
                                    else
                                        return <PromptoTree key={subType.id} ref={this.addCodeRoot} items={catalog[subType.items]} subType={subType} showLibraries={showLibs} root={this.props.root}/>
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
                                    return <TextResourceTree key={t.id} ref={this.addResourceRoot} type={t}
                                                             items={items} type={t} showLibraries={showLibs}
                                                             root={this.props.root}/>;
                                else
                                    return <BinaryResourceTree key={t.id} ref={this.addResourceRoot} type={t}
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

    showContent(content, callback) {
        this.expandContent(content, callback, false);
    }

    selectContent(content, callback) {
        this.expandContent(content, callback, false);
    }

    expandContent(content, callback, simulateClick) {
        if (this.expandContentInRoots(this.resourceRoots, content, simulateClick))
            this.setState({showResourceItems: true}, callback);
        else if(this.expandContentInRoots(this.codeRoots, content, simulateClick))
            this.setState({showCodeItems: true}, callback);
    }

    expandContentInRoots(roots, content, simulateClick) {
        for (const root of roots) {
            if (root.expandContent(content, simulateClick))
                return true;
        }
        return false;
    }

}
