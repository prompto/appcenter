/* a mock implementation for native binding resolution purpose */
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
    InputGroup: React.Component,
    FormGroup: React.Component,
    FormControl: React.Component,
    ControlLabel: React.Component,
    HelpBlock: React.Component,
    Table: React.Component,
    Modal: {
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
    NavItem: React.Component
};

