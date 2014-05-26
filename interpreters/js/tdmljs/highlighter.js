// Highlighter

String.prototype.insertTextAtIndex = function(text, index) {
	var pre = this.substr(0,index);
	var post = this.substr(index, this.length);
	return pre + text + post;
}

String.prototype.wrapListItems = function(exp) {
	var pos = 0;
	var test = 0;
	var output = this;
	var prefix = "<div class='list-item'>";
	var postfix = "</div>";

	while (test != -1) {
		var startPos = output.regexIndexOf(exp, pos);
		if (startPos != -1) {
			var endPos = output.regexIndexOf(exp, startPos + 2);

			pos = endPos + prefix.length + postfix.length;
			test = endPos;

			if (endPos == -1) {
				endPos = output.length;
				postfix = postfix + "<br>"
			}

			var ended = output.insertTextAtIndex(postfix, endPos);
			output = ended.insertTextAtIndex(prefix, startPos);
		} else {
			break;
		}
	}

	return output;
}

String.prototype.wrapPriorities = function(exp) {
	var pos = 0;
	var test = 0;
	var output = this;
	var prefix = "<span class='priority-mark'>";
	var postfix = "</span>";

	while (test != -1) {
		var startPos = output.regexIndexOf(exp, pos);
		if (startPos != -1) {
			var endPos = output.regexIndexOf(/[^0-9\!]/, startPos + 1);
			pos = endPos + prefix.length + postfix.length;
			test = endPos;

			if (endPos == -1) {
				endPos = output.length;
			}

			var ended = output.insertTextAtIndex(postfix, endPos);
			output = ended.insertTextAtIndex(prefix, startPos);
		} else {
			break;
		}
	}

	return output;
}

String.prototype.wrapTags = function(exp) {
	var pos = 0;
	var test = 0;
	var output = this;
	var prefix = "<span class='tag'>";
	var postfix = "</span>";

	while (test != -1) {
		var startPos = output.regexIndexOf(exp, pos);
		if (startPos != -1) {
			var endPos = output.regexIndexOf(/[^A-Za-z0-9]/, startPos + 1);
			pos = endPos + prefix.length + postfix.length;
			test = endPos;

			if (endPos == -1) {
				endPos = output.length;
			}

			var ended = output.insertTextAtIndex(postfix, endPos);
			output = ended.insertTextAtIndex(prefix, startPos);
		} else {
			break;
		}
	}

	return output;
}

_TDML.prototype.toggleCompletions = function(el) {
	var list = el.getElementsByClassName("list-item");
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		firstMatch = item.innerHTML.regexIndexOf(/[\-\/]/);
		if (firstMatch == 0) {
			item.className += " completed";
		}
	}
}

_TDML.prototype.highlight = function(el) {
	var placeCaretAtEnd = function(el) {
	    el.focus();
	    if (typeof window.getSelection != "undefined"
	            && typeof document.createRange != "undefined") {
	        var range = document.createRange();
	        range.selectNodeContents(el);
	        range.collapse(false);
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	        sel.addRange(range);
	    } else if (typeof document.body.createTextRange != "undefined") {
	        var textRange = document.body.createTextRange();
	        textRange.moveToElementText(el);
	        textRange.collapse(false);
	        textRange.select();
	    }
	}

	var format = this.cleanToString(el.innerHTML);
	var wrapped = format.wrapListItems(this.listItemIdentifierExpression);
	wrapped = wrapped.wrapPriorities(/\^/);
	wrapped = wrapped.wrapTags(/\#/);
	el.innerHTML = wrapped;
	this.toggleCompletions(el);
	placeCaretAtEnd(el);
}