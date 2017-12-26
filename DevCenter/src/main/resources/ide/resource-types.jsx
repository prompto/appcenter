class ElementType {

    constructor(id, label) {
        this.id = id;
        this.label = label;
    }

    newResource(root) {
        throw "Need to override!"
    }

}

class PromptoType extends ElementType {
    
    constructor() {
        super("prompto", "Prompto code");
    }

    newResource(root) {
        root.setEditorContent({ type: "prompto" });
    }
}

class ResourceType extends ElementType {

    constructor(id, label) {
        super(id, label);
    }
}

class TextResourceType extends ResourceType {

    constructor(id, label, mimeType, placeholder) {
        super(id, label);
        this.aceMode = id;
        this.mimeType = mimeType;
        this.placeholder = placeholder || "data";
    }

    newResource(root) {
        root.setState({newTextResourceType: this});
    }

    createTextResource(path, file) {
        return {
            type: "TextResource",
            value: {
                name: path,
                mimeType: this.mimeType,
                body: this.getSampleBody()
            }
        };
    }

}

class HtmlType extends TextResourceType {

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

class JavascriptType extends TextResourceType {

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

class BabelType extends TextResourceType {

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


class StylesheetType extends TextResourceType {

    constructor() {
        super("css", "Css/Stylesheet", "text/css", "styles");
    }

    getSampleBody() {
        return "body {\n" +
            "\tbackground-color: white;\n" +
            "}";
    }

}

class JsonType extends TextResourceType {

    constructor() {
        super("json", "Json", "text/json");
    }

    getSampleBody() {
        return '{ "field": 123 }';
    }
}


class XmlType extends TextResourceType {

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

class YamlType extends TextResourceType {

    constructor() {
        super("yaml", "Yaml", "text/yaml");
    }

    getSampleBody() {
        return 'invoice: 34843\n' +
         'date   : 2001-01-23\n' +
         'bill-to: &id001\n' +
         '\tgiven  : Chris\n' +
         '\tfamily : Dumars\n' +
         '\taddress:\n' +
         '\t\tlines: |\n' +
         '\t\t\t458 Walkman Dr.\n' +
         '\t\t\tSuite #292\n' +
         '\t\tcity    : Royal Oak\n' +
         '\t\tstate   : MI\n' +
         '\t\tpostal  : 48046\n';
    }
}

class TextType extends TextResourceType {

    constructor() {
        super("text", "Text", "text/plain");
    }

    getSampleBody() {
        return 'Hello there!';
    }

}

class BinaryResourceType extends ResourceType {

    constructor(id, label) {
        super(id, label);
    }

    newResource(root) {
        root.setState({newFileResourceType: this});
    }

    createBinaryResource(path, file) {
        return {
            type: "BinaryResource",
            value: {
                name: path,
                mimeType: file.type,
                file: file
            }
        };
    }
}

class MediaResourceType extends BinaryResourceType {

    constructor(id, label) {
        super(id, label);
    }
}


class ImageType extends MediaResourceType {

    constructor() {
        super("image", "Image");
    }
}

class AudioType extends MediaResourceType {

    constructor() {
        super("audio", "Audio");
    }

}

class VideoType extends MediaResourceType {

    constructor() {
        super("video", "Video");
    }

}


class OtherType extends BinaryResourceType {

    constructor() {
        super("binary", "Other");
    }

}

const ALL_ELEMENT_TYPES = [
        new PromptoType(),
        new HtmlType(),
        new JavascriptType(),
        new BabelType(),
        new StylesheetType(),
        new JsonType(),
        new XmlType(),
        new YamlType(),
        new TextType(),
        new ImageType(),
        new AudioType(),
        new VideoType(),
        new OtherType() ];

const ID_TO_TYPE_MAP = {};

ALL_ELEMENT_TYPES.forEach(t => ID_TO_TYPE_MAP[t.id] = t);

const ALL_RESOURCE_TYPES = ALL_ELEMENT_TYPES.filter(t => t instanceof ResourceType);
