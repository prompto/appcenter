import React from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

export default class WebLibraryParameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = { widgetLibrary: "react-bootstrap-3", htmlEngine: "react-16", uiFramework: "bootstrap-3", nativeResource:"", stubResource:"" };
    }

    render() {
        if(this.props.forRename)
            return null;
        else {
            const widgetLibrary = this.state.widgetLibrary;
            const htmlEngine = this.state.htmlEngine;
            const uiFramework = this.state.uiFramework;
            const nativeResource = this.state.nativeResource;
            const stubResource = this.state.stubResource;
            return <div>
                <FormGroup>
                    <ControlLabel>Widget library:</ControlLabel><br/>
                    <FormControl componentClass="select" defaultValue={widgetLibrary}
                                 onChange={e => this.setState({widgetLibrary: e.currentTarget.value})}>
                        <option key="none" value="none">None</option>
                        <option key="react-bootstrap-3" value="react-bootstrap-3">React-bootstrap-3</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Html engine:</ControlLabel><br/>
                    <FormControl componentClass="select" defaultValue={htmlEngine}
                                 onChange={e => this.setState({htmlEngine: e.currentTarget.value})}
                                 disabled={widgetLibrary !== "none"}>
                        <option key="react-16" value="react">React</option>
                        <option key="vue" value="vue" disabled>Vue (not supported yet)</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>UI framework:</ControlLabel><br/>
                    <FormControl componentClass="select" defaultValue={uiFramework}
                                 onChange={e => this.setState({uiFramework: e.currentTarget.value})}
                                 disabled={widgetLibrary !== "none"}>
                        <option key="none" value="none">None</option>
                        <option key="bootstrap-3" value="bootstrap-3">Bootstrap v3</option>
                        <option key="bootstrap-4" value="bootstrap-4" disabled>Bootstrap v4 (not supported yet)</option>
                        <option key="foundation-6" value="foundation-6" disabled>Foundation v6(not supported yet)
                        </option>
                        <option key="semantic-2" value="semantic-2" disabled>Semantic v2(not supported yet)</option>
                        <option key="material-1" value="material-1" disabled>Material v1(not supported yet)</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Native resource:</ControlLabel><br/>
                    <FormControl value={nativeResource}
                                 onChange={e => this.setState({nativeResource: e.currentTarget.value})}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Stub resource:</ControlLabel><br/>
                    <FormControl value={stubResource}
                                 onChange={e => this.setState({stubResource: e.currentTarget.value})}/>
                </FormGroup>
            </div>;
        }
    }
}
