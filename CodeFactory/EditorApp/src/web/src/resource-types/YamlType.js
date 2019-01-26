import TextResourceType from "./TextResourceType";

export default class YamlType extends TextResourceType {

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