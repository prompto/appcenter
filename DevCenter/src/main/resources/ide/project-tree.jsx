const { ListGroup, ListGroupItem, Collapse, Glyphicon } = ReactBootstrap;

class GenericItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.item.name}</a> {this.props.item.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const content = { type: "Prompto", subType: this.props.type, name: this.props.item.name, core: this.props.item.core };
        this.props.root.setEditorContent(content);
    }
}

class GroupTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showItems: false };
        this.renderItem = this.renderItem.bind(this);
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
    }

    render() {
        let items = this.props.items;
        if(!this.props.showLibraries)
            items = items.filter(item => !item.core);
        return <ListGroupItem>
            <label className="nav-header" onClick={this.toggleTreeNode}>{this.props.title}</label>
            <Collapse in={this.state.showItems}>
                <ListGroup>
                    {items.length===0 && <ListGroupItem><i>Empty</i></ListGroupItem>}
                    {items.map(item => this.renderItem(item))}
                </ListGroup>
            </Collapse>
        </ListGroupItem>;
    }


    renderItem(item) {
        const key = this.props.type + "_" + makeValidId(item.name);
        return <GenericItem key={key} type={this.props.type} item={item} root={this.props.root}/>;
    }

    toggleTreeNode(e) {
        this.setState({showItems: !this.state.showItems});
    }

}

class SingleProtoMethodItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.method.name}</a> {this.props.method.core && <Glyphicon glyph="lock"/>}
        </ListGroupItem>;
    }


    itemClicked(e) {
        e.stopPropagation();
        const method = this.props.method;
        const content = { type: "Prompto", subType: this.props.type, name: method.name, proto: method.proto, core: method.core, main: method.main };
        this.props.root.setEditorContent(content);
    }

}

class MethodProtoItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
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

}

class MultiProtoMethodItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showProtos: true };
        this.toggleTreeNode = this.toggleTreeNode.bind(this);
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
                            return <MethodProtoItem key={key} method={method} proto={proto} root={this.props.root}/>;
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

}


class MethodTree extends GroupTree {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(method) {
        const key = this.props.type + "_" + makeValidId(method.name);
        if(method.protos.length>1)
            return <MultiProtoMethodItem key={key} method={method} type={this.props.type} root={this.props.root}/>;
        else
            return <SingleProtoMethodItem key={key} method={method} type={this.props.type} root={this.props.root}/>;
    }
}

class TextResourceItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.resource.value.name}</a>
        </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        let content = { type: this.props.type, name: this.props.resource.value.name };
        content.body = this.props.root.catalog.getResourceBody(content);
        this.props.root.setEditorContent(content);
    }
}

class TextResourceTree extends GroupTree {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        const key = item.value.mimeType.replace("/", "_") + "_" + makeValidId(item.value.name);
        return <TextResourceItem key={key} type={this.props.type} resource={item} root={this.props.root}/>
    }

}

class BinaryResourceItem extends React.Component {

    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
    }

    render() {
        return <ListGroupItem onClick={this.itemClicked}>
            <a>{this.props.resource.value.name}</a>
        </ListGroupItem>;
    }

    itemClicked(e) {
        e.stopPropagation();
        let content = { type: this.props.type, name: this.props.resource.value.name };
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
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(item) {
        const key = item.value.mimeType.replace("/", "_") + "_" + makeValidId(item.value.name);
        return <BinaryResourceItem key={key} type={this.props.type} resource={item} root={this.props.root}/>
    }


}

class ProjectTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showCodeItems: true, showResourceItems: true };
        this.toggleCodeItems = this.toggleCodeItems.bind(this);
        this.toggleResourceItems = this.toggleResourceItems.bind(this);
    }

    render() {
        const catalog = this.props.catalog;
        const showLibs = this.props.showLibraries;
        return <ListGroup>
            <ListGroupItem>
                <label onClick={this.toggleCodeItems}>Code</label>
                <Collapse in={this.state.showCodeItems}>
                    <ListGroup ref={ref=>this.codeItems=ref}>
                        <GroupTree title="Attributes" items={catalog.attributes} type="attribute" showLibraries={showLibs} root={this.props.root}/>
                        <MethodTree title="Methods" items={catalog.methods} type="method" showLibraries={showLibs} root={this.props.root}/>
                        <GroupTree title="Categories" items={catalog.categories} type="category" showLibraries={showLibs} root={this.props.root}/>
                        <GroupTree title="Enumerations" items={catalog.enumerations} type="enumeration" showLibraries={showLibs} root={this.props.root}/>
                        <GroupTree title="Tests" items={catalog.tests} type="test" showLibraries={showLibs} root={this.props.root}/>
                    </ListGroup>
                </Collapse>
            </ListGroupItem>
            <ListGroupItem>
                <label onClick={this.toggleResourceItems}>Resources</label>
                <Collapse in={this.state.showResourceItems}>
                    <ListGroup ref={ref=>this.resourceItems=ref}>
                        <TextResourceTree title="Html" items={catalog.resources.html} type="Html" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Javascript" items={catalog.resources.js} type="Js" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Jsx" items={catalog.resources.jsx} type="Jsx" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Css" items={catalog.resources.css} type="Css" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Json" items={catalog.resources.json} type="Json" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Xml" items={catalog.resources.xml} type="Xml" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Yaml" items={catalog.resources.yaml} type="Yaml" showLibraries={showLibs} root={this.props.root}/>
                        <TextResourceTree title="Text" items={catalog.resources.text} type="Txt" showLibraries={showLibs} root={this.props.root}/>
                        <BinaryResourceTree title="Image" items={catalog.resources.image} type="Image" showLibraries={showLibs} root={this.props.root}/>
                        <BinaryResourceTree title="Audio" items={catalog.resources.audio} type="Audio" showLibraries={showLibs} root={this.props.root}/>
                        <BinaryResourceTree title="Video" items={catalog.resources.video} type="Video" showLibraries={showLibs} root={this.props.root}/>
                        <BinaryResourceTree title="Other" items={[]} type="Binary" showLibraries={showLibs} root={this.props.root}/>
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

}
