import React from 'react';
import ProjectType from './ProjectType';
import ServiceParameters from './ServiceParameters';
import ServiceJpg from "../img/service.jpg";

export default class WebServiceType extends ProjectType {

    constructor() {
        super("Service", "Web service", ServiceJpg, "createService");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <ServiceParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    appendPromptoParameters(list) {
        return list.concat([{name: "serverAboutToStartMethod", type: "Text", value: this.params.startMethod()}]);
    }

}