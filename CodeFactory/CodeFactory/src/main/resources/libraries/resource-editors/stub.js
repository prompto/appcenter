/* a mock implementation required for native binding resolution */
var ResourceEditors = {
	AcePromptoEditor : function() {
		this.render = function() { return {}; };
		return this;
	},
	AceResourceEditor : function() {
		this.render = function() { return {}; };
		return this;
	}
};