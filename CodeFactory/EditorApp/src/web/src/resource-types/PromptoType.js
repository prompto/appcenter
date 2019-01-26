import ElementType from "./ElementType";

export default class PromptoType extends ElementType {

    constructor() {
        super("prompto", "Prompto code");
    }

    newResource(root) {
        root.setEditorContent({ type: "prompto" });
    }
}
