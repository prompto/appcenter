/* a mock implementation required for native binding resolution */
self.DroppedFileWidget = { 
    default: function() {
		this.render = function() { return {}; };
		return this;
	}
};