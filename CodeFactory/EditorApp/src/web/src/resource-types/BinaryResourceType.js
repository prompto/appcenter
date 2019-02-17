import ResourceType from "./ResourceType";

export default class BinaryResourceType extends ResourceType {

    newResource(root) {
        root.setState({newFileResourceType: this});
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