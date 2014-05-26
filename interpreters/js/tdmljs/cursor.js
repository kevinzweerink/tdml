// Cursor for working on text inline

_TDML.prototype.cursor = 0;

_TDML.prototype.watch = function(el) {
	_LIB = this;
	el.addEventListener("keyup", function(e) {
		var cleaned = _LIB.clean(el.innerHTML);
		_LIB.data = _LIB.parse(cleaned);

		if (e.keyCode == 13) {
			_LIB.highlight(el);
		}
	});
}