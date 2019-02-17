import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ProjectType from './ProjectType';
import WebLibraryJpg from "../img/weblibrary.jpg";

class WebLibraryParameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = { widgetLibrary: "react-bootstrap-3", htmlEngine: "react-16", uiFramework: "bootstrap-3" };
    }

    render() {
        const widgetLibrary = this.state.widgetLibrary;
        const htmlEngine = this.state.htmlEngine;
        const uiFramework = this.state.uiFramework;
        return <div>
            <FormGroup>
                <ControlLabel>Widget library:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={widgetLibrary} onChange={e=>this.setState({widgetLibrary: e.currentTarget.value})}>
                    <option key="none" value="none">None</option>
                    <option key="react-bootstrap-3" value="react-bootstrap-3" >React-bootstrap-3</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Html engine:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={htmlEngine} onChange={e=>this.setState({htmlEngine: e.currentTarget.value})} disabled={widgetLibrary!=="none"}>
                    <option key="react-16" value="react" >React</option>
                    <option key="vue" value="vue" disabled>Vue (not supported yet)</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>UI framework:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={uiFramework} onChange={e=>this.setState({uiFramework: e.currentTarget.value})} disabled={widgetLibrary!=="none"}>
                    <option key="none" value="none" >None</option>
                    <option key="bootstrap-3" value="bootstrap-3" >Bootstrap v3</option>
                    <option key="bootstrap-4" value="bootstrap-4" disabled>Bootstrap v4 (not supported yet)</option>
                    <option key="foundation-6" value="foundation-6" disabled>Foundation v6(not supported yet)</option>
                    <option key="semantic-2" value="semantic-2" disabled>Semantic v2(not supported yet)</option>
                    <option key="material-1" value="material-1" disabled>Material v1(not supported yet)</option>
                </FormControl>
            </FormGroup>
        </div>;
    }
}


export default class WebLibraryType extends ProjectType {

    constructor() {
        super("WebLibrary", "Web library", WebLibraryJpg, "createWebLibrary");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <WebLibraryParameters ref={ref => this.params = ref} dialog={dialog} forRename={forRename || false}/>;
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        const params = [
            {name: "widgetLibrary", type: "Text", value: state.widgetLibrary},
            {name: "htmlEngine", type: "Text", value: state.htmlEngine},
            {name: "uiFramework", type: "Text", value: state.uiFramework}
        ];
        return list.concat(params);
    }
}