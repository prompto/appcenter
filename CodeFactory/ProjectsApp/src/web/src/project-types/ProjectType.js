export default class ProjectType {

    constructor(id, title, image, createMethod) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.disabled = false;
        this.createMethod = createMethod;
    }

    updateModule(module) {

    }

    renderParameters(dialog) {
        return null;
    }

    appendFormParameters(formData, forRename) {
    }

    appendPromptoParameters(list) {
        return list;
    }
}
