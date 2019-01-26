import TextResourceType from './TextResourceType';

export default class BabelType extends TextResourceType {

    constructor() {
        super("jsx", "Jsx/Babel", "text/babel", "script");
    }

    getSampleBody() {
        return "class SomeClass {\n" +
            "\thello() {\n" +
            "\t\talert('Hello');\n" +
            "\t}\n" +
            "}";
    }
}