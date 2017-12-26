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

    constructor(id, label) {
        super(id, label);
    }
}

class HtmlType extends TextResourceType {

    constructor() {
        super("html", "Html");
    }
}

class JavascriptType extends TextResourceType {

    constructor() {
        super("js", "Javascript");
    }
}

class BabelType extends TextResourceType {

    constructor() {
        super("jsx", "Jsx/Babel");
    }
}


class StylesheetType extends TextResourceType {

    constructor() {
        super("css", "Css/Stylesheet");
    }

}

class JsonType extends TextResourceType {

    constructor() {
        super("json", "Json");
    }
}

class XmlType extends TextResourceType {

    constructor() {
        super("xml", "Xml");
    }
}

class YamlType extends TextResourceType {

    constructor() {
        super("yaml", "Yaml");
    }
}

class TextType extends TextResourceType {

    constructor() {
        super("text", "Text");
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
