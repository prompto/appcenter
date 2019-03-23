import React from 'react';
import ResourceType from './ResourceType';
import { displayModal } from '../components/ModalDialog';
import NewTextResourceDialog from "../dialogs/NewTextResourceDialog";

export default class TextResourceType extends ResourceType {

    constructor(id, label, mimeType, placeholder) {
        super(id, label);
        this.aceMode = id;
        this.mimeType = mimeType;
        this.placeholder = placeholder || "data";
    }

    newResource(root) {
        displayModal(<NewTextResourceDialog root={root} type={this}/>);
    }

    getInitialState() {
        return {};
    }

    renderFormControls(dialog) {
        return <div/>;
    }

    createResources(state, addResource, addCode) {
        const resource = {
            type: "TextResource",
            value: {
                name: state.folder + "/" + state.name + "." + state.extension,
                mimeType: this.mimeType,
                body: this.getSampleBody(state)
            }
        };
        addResource(resource);
    }

}

// needed by editor frame
window.TextResourceType = TextResourceType;