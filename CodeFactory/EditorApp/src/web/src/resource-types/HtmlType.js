import TextResourceType from './TextResourceType';

export default class HtmlType extends TextResourceType {

    constructor() {
        super("html", "Html", "text/html", "web_page");
    }

    getSampleBody() {
        return "<!DOCTYPE html>\n" +
            "<html>\n" +
            "\t<head>\n" +
            "\t</head>\n" +
            "\t<body>\n" +
            "\t\tHello!\n" +
            "\t</body>\n" +
            "</html>";
    }
}