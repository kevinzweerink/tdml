// TDML Parser

// Add insertBefore to String

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

String.prototype.insertBefore = function(exp, insertion) {
	var position = 0;
	var block = this.regexIndexOf(exp, position);
	var returnString = this.substr(0, this.length);
	while(block != -1) {
		var pre = returnString.substr(0, block);
		var post = returnString.substr(block, returnString.length);
		returnString = pre + insertion + post;
		position = block + insertion.length + 2;
		block = returnString.regexIndexOf(exp, position);
	}
	return returnString;
}

// Expects block of raw HTML or plain text
// Returns list as array
_TDML.prototype.clean = function(text) {

	var TDML_LIST_ITEM_BREAK_CODE = (Math.random() * 10000).toString();

	var clean = function(text) {
		var output = text.replace(/<(?:.|\n)*?>/gm, '');
		return output;
	}

	var prep = function(text) {
		var output = text.insertBefore(/(\/|\-)?\*\s/, TDML_LIST_ITEM_BREAK_CODE);
		return output;
	}

	var cleanText = clean(text);
	if (cleanText == "") {
		return "There was an error parsing the text";
	}

	var prepText = prep(cleanText);
	if (prepText == "") {
		return "There was an error parsing the text";
	}

	var listArray = prepText.split(TDML_LIST_ITEM_BREAK_CODE);
	for (var i = 0; i < listArray.length; i++) {
		listArray[i] = listArray[i].trim();
	}

	for (var i = 0; i < listArray.length; i++) {
		if (listArray[i] == "") {
			listArray.splice(i, 1);
			i--;
		}
	}

	var result = listArray;
	return result;
}

// Abstraction of parsing item for characters
// Options object is:
// {
// 	beginDelimiter : string,
// 	endDelimiter : string (optional, defaults to space),
// 	includeBeginningDelimiter : bool (optional, defaults to false),
// 	includeEndingDelimiter : bool (optional, defaults to false)
// }
_TDML.prototype.getBlock = function(item, options) {
	if (!options.beginDelimiter) {
		return "Please set a beginning delimiter to parse"
	}

	if (!options.endDelimiter) {
		options.endDelimiter == " ";
	}

	var blockStart = item.indexOf(options.beginDelimiter);

	if (blockStart != -1) {
		var blockEnd = item.indexOf(options.endDelimiter, blockStart);
		var inset = options.includeBeginningDelimiter ? 0 : options.beginDelimiter.length;
		var outset = options.includeEndingDelimiter ? 0 : options.endDelimiter.length - 1;
		var block;

		if (blockEnd != -1) {
			block = item.substring(blockStart + inset, blockEnd - outset);
			return block;
		}

		block = item.substring(blockStart + inset, item.length - outset);
		return block;

	}

	return null;
}

_TDML.prototype.getBlocks = function(item, options) {
	if (!options.beginDelimiter) {
		return "Please set a beginning delimiter to parse"
	}

	if (!options.endDelimiter) {
		options.endDelimiter == " ";
	}
	var exp = RegExp(options.beginDelimiter, "gi");
	var matches = item.match(exp);

	if (!matches) {
		return 0;
	}

	var position = 0;
	for (var i = 0; i < matches.length; i++) {
		var blockStart = item.indexOf(options.beginDelimiter, position);
		if (blockStart != -1) {
			var blockEnd = item.indexOf(options.endDelimiter, blockStart);
			position = blockEnd
			var inset = options.includeBeginningDelimiter ? 0 : options.beginDelimiter.length;
			var outset = options.includeEndingDelimiter ? 0 : options.endDelimiter.length - 1;
			var block;

			if (blockEnd != -1) {
				block = item.substring(blockStart + inset, blockEnd - outset);
				matches[i] = block;
				continue;
			}

			block = item.substring(blockStart + inset, item.length - outset);
			matches[i] = block;
			continue;
		}
	}
	return matches;
}

// Expects item as string
// Returns priority as number or Boolean
_TDML.prototype.getItemPriority = function(item) {
	var priorityBlock = this.getBlock(item, {
		beginDelimiter : "^",
		endDelimiter : " ",
		includeBeginningDelimiter : false,
		includeEndingDelimiter : false
	});

	if (priorityBlock) {

		if (priorityBlock.indexOf("!") != -1) {
			return 10;
		}

		var priority = parseInt(priorityBlock);

		return priority;
	}

	return 0;
}

_TDML.prototype.getItemTags = function(item) {

	var tagBlocks = this.getBlocks(item, {
		beginDelimiter: "#",
		endDelimiter: " ",
		includeBeginningDelimiter : true,
		includeEndingDelimiter : false,
	});

	return tagBlocks;
	
}

_TDML.prototype.getItemStatus = function(item) {
	if (item.indexOf("-") == 0 || item.indexOf("/") == 0) {
		return 1;
	}

	return 0;
}

// Expects list items as array
// Returns list data as object
_TDML.prototype.parse = function(listArray) {
	listData = {};
	listData.items = [];
	listData.numberOfItems = listArray.length;
	for (var i = 0; i < listArray.length; i++) {
		var item = listArray[i];
		var itemPriority = this.getItemPriority(item);
		var itemTags = this.getItemTags(item);
		var itemStatus = this.getItemStatus(item);

		listData.items[i] = {
			item : item,
			priority : itemPriority,
			tags : itemTags,
			completed : itemStatus
		}
	}

	return listData;
}