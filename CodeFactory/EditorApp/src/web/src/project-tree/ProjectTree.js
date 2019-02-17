import React from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'react-bootstrap';
import MethodTree from './MethodTree';
import PromptoTree from './PromptoTree';
import TextResourceTree from './TextResourceTree';
import BinaryResourceTree from './BinaryResourceTree';
import TextResourceType from '../resource-types/TextResourceType';
import { ALL_RESOURCE_TYPES } from '../resource-types/ResourceTypes';

const ALL_PROMPTO_SUBTYPES = [{id:"attribute", items:"attributes"}, {id:"method", items: "methods"}, {id:"category", items: "categories"}, {id:"enumeration", items: "enumerations" }, {id:"test", items: "tests"}, {id:"widget", items: "widgets"}];

export default class ProjectTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showCodeItems: true, showResourceItems: true, contentToSelect: null };
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


    setContentToSelect(content) {
        this.setState({contentToSelect: content});
    }

    componentDidUpdate() {
        if(this.state.contentToSelect) {
            if(!this.selectContent(this.state.contentToSelect))
                this.props.root.setEditorContent({type: "Prompto"});
            this.setState({contentToSelect: null});
        }
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
                                                             items={items} showLibraries={showLibs}
                                                             root={this.props.root}/>;
                                else
                                    return <BinaryResourceTree key={t.id} ref={this.addResourceRoot} type={t}
                                                               items={items}  showLibraries={showLibs}
                                                               root={this.props.root}/>;
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
        return this.expandContent(content, callback, false);
    }

    selectContent(content, callback) {
        return this.expandContent(content, callback, true);
    }

    expandContent(content, callback, simulateClick) {
        if (this.expandContentInRoots(this.resourceRoots, content, simulateClick)) {
            this.setState({showResourceItems: true}, callback);
            return true;
        } else if(this.expandContentInRoots(this.codeRoots, content, simulateClick)) {
            this.setState({showCodeItems: true}, callback);
            return true;
        } else
            return false;
    }

    expandContentInRoots(roots, content, simulateClick) {
        for (const root of roots) {
            if (root.expandContent(content, simulateClick))
                return true;
        }
        return false;
    }

}
