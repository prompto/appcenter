import TextResourceType from "./TextResourceType";

export default class StylesheetType extends TextResourceType {

    constructor() {
        super("css", "Css/Stylesheet", "text/css", "styles");
    }

    getSampleBody() {
        return "body {\n" +
            "\tbackground-color: white;\n" +
            "}";
    }

}