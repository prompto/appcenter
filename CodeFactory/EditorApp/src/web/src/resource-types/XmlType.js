import TextResourceType from "./TextResourceType";

export default class XmlType extends TextResourceType {

    constructor() {
        super("xml", "Xml", "text/xml");
    }

    getSampleBody() {
        return '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<document>\n' +
            '\tdata\n' +
            '</document>\n';
    }
}