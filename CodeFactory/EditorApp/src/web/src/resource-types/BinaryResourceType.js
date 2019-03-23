import React from 'react';
import ResourceType from "./ResourceType";
import NewFileResourceDialog from "../dialogs/NewFileResourceDialog";
import {displayModal} from "../components/ModalDialog";

export default class BinaryResourceType extends ResourceType {

    newResource(root) {
        displayModal(<NewFileResourceDialog root={root} type={this} />);
    }

    createBinaryResource(path, file) {
        return {
            type: "BinaryResource",
            value: {
                name: path,
                mimeType: file.type,
                file: file
            }
        };
    }
}