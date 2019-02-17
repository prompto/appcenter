import TextResourceType from './TextResourceType';

export default class JavascriptType extends TextResourceType {

    constructor() {
        super("js", "Javascript", "text/javascript", "script");
        this.aceMode = "javascript";
    }

    getSampleBody() {
        return "function hello() {\n" +
            "\talert('Hello');\n" +
            "}";
    }
}
