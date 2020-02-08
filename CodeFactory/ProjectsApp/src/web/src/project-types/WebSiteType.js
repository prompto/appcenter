import React from 'react';
import ProjectType from './ProjectType';
import WebSiteJpg from "../img/website.jpg";
import WebSiteParameters from "./WebSiteParameters";



export default class WebSiteType extends ProjectType {

    constructor() {
        super("WebSite", "Web site", WebSiteJpg, "createWebSite");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
        this.appendFormParameters = this.appendFormParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <WebSiteParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    updateModule(module) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            module.value.image = { type: "Image", value: { mimeType: state.iconFile.type, partName: partName } };
        }
    }

    appendFormParameters(formData, forRename) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            formData.append(partName, state.iconFile);
        }
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        let image = null;
        if(state.iconFile) {
            const partName = "@" + state.iconFile.name;
            image = { type: "Image", value: { mimeType: state.iconFile.type, partName: partName } };
        };
        const params = [
            {name: "image", type: "Image", value: image},
            {name: "serverAboutToStartMethod", type: "Text", value: this.params.startMethod()},
            {name: "homePage", type: "Text", value: this.params.homePage()}
        ];
        return list.concat(params);
    }
}
