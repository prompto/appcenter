export default class ElementType {

    constructor(id, label) {
        this.id = id;
        this.label = label;
    }

    newResource(root) {
        throw new Error("Need to override!");
    }

}