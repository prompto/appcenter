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
    InputGroup: React.Component,
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
        Form: React.Component
    },
    Nav: React.Component,
    NavItem: React.Component,
    MenuItem: React.Component,
    Tabs: React.Component,
    Tab: React.Component,
    Grid: React.Component,
    Row: React.Component,
    Col: React.Component,
    Clearfix: React.Component
};

