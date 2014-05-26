// TDML Manager

// Create core, extensible TDML object
var _TDML = function() {

	// Create data object to contain lists and attributes
	this.data = {};

	// Create a list item id expression
	this.listItemIdentifierExpression = new RegExp(/(\/|\-)?\*\s/);

	// Create a priority id expression
	this.priorityIdentifierExpression = new RegExp(/\^/);

}

window.tdml = new _TDML();
console.log(window.tdml);