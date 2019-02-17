import TextResourceType from "./TextResourceType";

export default class TextType extends TextResourceType {

    constructor() {
        super("text", "Text", "text/plain");
    }

    getSampleBody() {
        return 'Hello there!';
    }

}