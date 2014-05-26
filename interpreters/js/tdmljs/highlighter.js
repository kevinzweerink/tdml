// Highlighter

String.prototype.insertTextAtIndex = function(text, index) {
	var pre = this.substr(0,index);
	var post = this.substr(index, this.length);
	return pre + text + post;
}

String.prototype.wrapListItems = function(exp) {
	var startPos = this.regexIndexOf(exp, 0);
	var endPos = this.regexIndexOf(exp, startPos + 2);
	var ended = this.insertTextAtIndex("</span>", endPos);
	var started = ended.insertTextAtIndex("<span class='list-item'>", startPos);
}

_TDML.prototype.highlight = function(el) {
	var format = el.value;
	format.wrapListItems(this.listItemIdentifierExpression);
	el.value = format;
	console.log(el.value);
}