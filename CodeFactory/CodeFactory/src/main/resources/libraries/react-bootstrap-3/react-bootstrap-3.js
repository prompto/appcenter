/* a mock implementation required for native binding resolution */
var React = {
	Component : function() {
		this.render = function() { return {}; };
		return this;
	}
};

self.ReactBootstrap = {
    Button: React.Component,
    Checkbox: React.Component,
    Radio: React.Component,
    DropdownButton: React.Component,
    SplitButton: React.Component,
    InputGroup: {
        render: React.Component.render,
        Addon: React.Component,
        Button: React.Component
    },
    Form: React.Component,
    FormGroup: React.Component,
    FormControl: React.Component,
    ControlLabel: React.Component,
    HelpBlock: React.Component,
    Table: React.Component,
    Modal: {
    	Dialog: React.Component,
    	Title: React.Component,
    	Header: React.Component,
    	Body: React.Component,
    	Footer: React.Component
    },
    Navbar: {
        Brand: React.Component,
        Header: React.Component,
        Text: React.Component,
        Toggle: React.Component,
        Collapse: React.Component,
        Form: React.Component
    },
    Panel: {
       	Collapse: React.Component,
       	Toggle: React.Component,
       	Title: React.Component,
    	Heading: React.Component,
    	Body: React.Component,
        Footer: React.Component
    },
    PanelGroup: React.Component,
    Nav: React.Component,
    NavDropdown: React.Component,
    NavItem: React.Component,
    ContextMenu: React.Component,
    MenuItem: React.Component,
    Tabs: React.Component,
    Tab: React.Component,
    Grid: React.Component,
    Row: React.Component,
    Col: React.Component,
    Clearfix: React.Component,
    Glyphicon: React.Component,
    Thumbnail: React.Component,
    PageHeader: React.Component,
	ButtonToolbar: React.Component,
	ButtonGroup: React.Component,
	ToggleButtonGroup: React.Component,
	ToggleButton: React.Component,
    Typeahead: React.Component,
    DatePicker: React.Component
};

