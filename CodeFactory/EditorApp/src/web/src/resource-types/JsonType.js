import TextResourceType from "./TextResourceType";

export default class JsonType extends TextResourceType {

    constructor() {
        super("json", "Json", "text/json");
    }

    getSampleBody() {
        return '{ "field": 123 }';
    }
}