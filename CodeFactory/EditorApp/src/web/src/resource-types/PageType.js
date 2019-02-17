import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import TextResourceType from './TextResourceType';

export default class PageType extends TextResourceType {

    constructor() {
        super("page", "Web page", "text/page", "web_page");
        this.aceMode = "yaml";
    }

    createResources(state, addResource, addCode) {
        super.createResources(state, res => addResource(res, () => this.createWidget(state, addCode)), addCode);
    }

    computeWidgetName(name) {
        const widgetName = name.replace(/[ -]/g, "_");
        return widgetName.charAt(0).toUpperCase() + widgetName.substring(1) + "Page";
    }

    getSampleBody(state) {
        const widgetName = this.computeWidgetName(state.name);
        var sample = "header:\n" +
            "  title: "+ state.name + '\n' +
            "  icon: favicon.ico\n";
        if(state.widgetLibrary!=="none")
            sample += "  widgetLibrary: " + state.widgetLibrary + "\n";
        else
            sample += "  htmlEngine: " + state.htmlEngine + "\n" +
                "  uiFramework: " + state.uiFramework + "\n"
        sample += "\n" +
            "body:\n" +
            '  widget: ' + widgetName + '\n';
        return sample;
    }

    computeWidgetRoot(state) {
        if(state.htmlEngine && state.htmlEngine.toLowerCase().startsWith("react"))
            return " extends ReactWidget"
        else
            return "";
    }

    createWidget(state, addCode) {
        const resourceName = state.folder + "/" + state.name + "." + state.extension;
        const widgetName = this.computeWidgetName(state.name);
        const widgetRoot = this.computeWidgetRoot(state);
        const widgetCode = "@PageWidgetOf(\"" + resourceName + "\")\n" +
            "widget " + widgetName + widgetRoot + " {\n" +
            "\n" +
            "\tHtml method render() {\n" +
            '\t\treturn <div>Hello "' + state.name + '"!</div>;\n' +
            "\t}\n" +
            "\n" +
            "}\n";
        const content = { type: "Prompto", subType: "widget", name: widgetName, creating: true };
        addCode(content, widgetCode, "O");
    }

    getInitialState() {
        return {widgetLibrary: "react-bootstrap-3", htmlEngine: "react-16", uiFramework: "bootstrap-3"};
    }

    renderFormControls(dialog) {
        const widgetLibrary = dialog.state.widgetLibrary || "react-bootstrap-3";
        const htmlEngine = dialog.state.htmlEngine || "react-16";
        const uiFramework = dialog.state.uiFramework || "bootstrap-3";
        return <div>
            <FormGroup>
                <ControlLabel>Widget library:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={widgetLibrary} onChange={e=>this.handleWidgetLibrary(e, dialog)}>
                    <option key="none" value="none">None</option>
                    <option key="react-bootstrap-3" value="react-bootstrap-3" >React-bootstrap-3</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Html engine:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={htmlEngine} onChange={e=>this.handleHtmlEngine(e, dialog)} disabled={widgetLibrary!=="none"}>
                    <option key="react-16" value="react" >React</option>
                    <option key="vue" value="vue" disabled>Vue (not supported yet)</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>UI framework:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={uiFramework} onChange={e=>this.handleUIFramework(e, dialog)} disabled={widgetLibrary!=="none"}>
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



    handleWidgetLibrary(e, dialog) {
        const widgetLibrary = e.currentTarget.value;
        dialog.setState({widgetLibrary: widgetLibrary});
    }

    handleHtmlEngine(e, dialog) {
        const htmlEngine = e.currentTarget.value;
        dialog.setState({htmlEngine: htmlEngine});
    }

    handleUIFramework(e, dialog) {
        const uiFramework = e.currentTarget.value;
        dialog.setState({uiFramework: uiFramework});
    }

}
