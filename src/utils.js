var _utils = require("underscore");

Array.prototype.containsAll = function(otherArray) {
	var selfArray = this;
	return otherArray.every(function(otherArrayElement) {
		return(_utils.contains(selfArray, otherArrayElement));
	});
};


module.exports = {

};