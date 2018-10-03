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

    getInitialState() {
        return {};
    }

    renderFormControls(dialog) {
        return <div/>;
    }

    createResources(state, addResource, addCode) {
        const resource = {
            type: "TextResource",
            value: {
                name: state.folder + "/" + state.name + "." + state.extension,
                mimeType: this.mimeType,
                body: this.getSampleBody(state)
            }
        };
        addResource(resource);
    }

}


class PageType extends TextResourceType {

    constructor() {
        super("page", "Web page", "text/page", "web_page");
    }

    createResources(state, addResource, addCode) {
        super.createResources(state, res => addResource(res, () => this.createWidget(state, addCode)), addCode);
    }

    computeWidgetName(name) {
        const widgetName = name.replace(/[ -]/g, "_");
        return widgetName.charAt(0).toUpperCase() + widgetName.substring(1) + "Page";
    }

    getSampleBody(state) {
        const widgetName = this.computeWidgetName(state.name);
        var sample = "header:\n" +
            "  title: "+ state.name + '\n' +
            "  icon: favicon.ico\n";
        if(state.widgetLibrary!=="none")
            sample = sample + "  widgetLibrary: " + state.widgetLibrary + "\n";
        else
            sample = sample + "  htmlEngine: " + state.htmlEngine + "\n" +
            "  uiFramework: " + state.uiFramework + "\n"
        sample = sample + "\n" +
            "body:\n" +
            '  widget: ' + widgetName + '\n';
        return sample;
    }


    createWidget(state, addCode) {
        const resourceName = state.folder + "/" + state.name + "." + state.extension;
        const widgetName = this.computeWidgetName(state.name);
        const widgetCode = "@PageWidgetOf(\"" + resourceName + "\")\n" +
            "widget " + widgetName + " {\n" +
            "\n" +
            "\tHtml method render() {\n" +
            '\t\treturn <div>Hello "' + state.name + '"!</div>;\n' +
            "\t}\n" +
            "\n" +
            "}\n";
        addCode(widgetCode, "O", widgetName);
    }

    getInitialState() {
        return {widgetLibrary: "react-bootstrap-3", htmlEngine: "react-16", uiFramework: "bootstrap-3"};
    }

    renderFormControls(dialog) {
        const widgetLibrary = dialog.state.widgetLibrary || "react-bootstrap-3";
        const htmlEngine = dialog.state.htmlEngine || "react-16";
        const uiFramework = dialog.state.uiFramework || "bootstrap-3";
        return <div>
            <FormGroup>
                <ControlLabel>Widget library:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={widgetLibrary} onChange={e=>this.handleWidgetLibrary(e, dialog)}>
                    <option key="none" value="none">None</option>
                    <option key="react-bootstrap-3" value="react-bootstrap-3" >React-bootstrap-3</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Html engine:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={htmlEngine} onChange={e=>this.handleHtmlEngine(e, dialog)} disabled={widgetLibrary!=="none"}>
                    <option key="react-16" value="react" >React</option>
                    <option key="vue" value="vue" disabled>Vue (not supported yet)</option>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <ControlLabel>UI framework:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={uiFramework} onChange={e=>this.handleUIFramework(e, dialog)} disabled={widgetLibrary!=="none"}>
                    <option key="none" value="none" >None</option>
                    <option key="bootstrap-3" value="bootstrap-3" >Bootstrap v3</option>
                    <option key="bootstrap-4" value="bootstrap-4" disabled>Bootstrap v4 (not supported yet)</option>
                    <option key="foundation-6" value="foundation-6" disabled>Foundation v6(not supported yet)</option>
                    <option key="semantic-2" value="semantic-2" disabled>Semantic v2(not supported yet)</option>
                    <option key="material-1" value="material-1" disabled>Material v1(not supported yet)</option>
                </FormControl>
            </FormGroup>
        </div>;
    }



    handleWidgetLibrary(e, dialog) {
        const widgetLibrary = e.currentTarget.value;
        dialog.setState({widgetLibrary: widgetLibrary});
    }

    handleHtmlEngine(e, dialog) {
        const htmlEngine = e.currentTarget.value;
        dialog.setState({htmlEngine: htmlEngine});
    }

    handleUIFramework(e, dialog) {
        const uiFramework = e.currentTarget.value;
        dialog.setState({uiFramework: uiFramework});
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
         '  given  : Chris\n' +
         '  family : Dumars\n' +
         '  address:\n' +
         '    lines: |\n' +
         '      458 Walkman Dr.\n' +
         '      Suite #292\n' +
         '    city    : Royal Oak\n' +
         '    state   : MI\n' +
         '    postal  : 48046\n';
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
        new PageType(),
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
