import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ProjectType from './ProjectType';
import WebLibraryJpg from "../img/weblibrary.jpg";
import WebLibraryParameters from "./WebLibraryParameters";

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
            {name: "uiFramework", type: "Text", value: state.uiFramework},
            {name: "nativeResource", type: "Text", value: state.nativeResource},
            {name: "stubResource", type: "Text", value: state.stubResource}
        ];
        return list.concat(params);
    }
}