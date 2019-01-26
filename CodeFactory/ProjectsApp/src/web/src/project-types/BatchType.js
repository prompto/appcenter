import React from 'react';
import ProjectType from './ProjectType';
import BatchParameters from './BatchParameters';
import BatchJpg from "../img/batch.jpg";

export default class BatchType extends ProjectType {

    constructor() {
        super("Batch", "Batch", BatchJpg , "createBatch");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <BatchParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    appendPromptoParameters(list) {
        return list.concat([{name: "startMethod", type: "Text", value: this.params.startMethod()}]);
    }

}
