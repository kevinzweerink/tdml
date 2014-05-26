// Cursor for working on text inline

_TDML.prototype.cursor = 0;

_TDML.prototype.watch = function(el) {
	_LIB = this;
	el.addEventListener("keyup", function(e) {
		var position = window.getSelection();
		console.log(position);

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

		var maintainCaretPosition = function(el) {
			var range = document.createRange();
			var sel = window.getSelection();
			range.setStart(position, position);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}

		var cleaned = _LIB.clean(el.innerHTML);
		_LIB.data = _LIB.parse(cleaned);
		
		if (e.keyCode == 13) {
			_LIB.highlight(el);
		}

		if (e.keyCode == 189) {
			_LIB.highlight(el);
		}
	});
}