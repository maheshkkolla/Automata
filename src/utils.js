var _utils = require("underscore");

Array.prototype.containsAll = function(otherArray) {
	var selfArray = this;
	return otherArray.every(function(otherArrayElement) {
		return(_utils.contains(selfArray, otherArrayElement));
	});
};

Function.prototype.partial = function(preArgs, thisArg) {
	var methodToCall = this;
	return function() {
		var args = [...arguments];
		Object.keys(preArgs).forEach(function(indexOfPreArg) {
			var secondHalf = args.splice(indexOfPreArg - 1)
			args.push(preArgs[indexOfPreArg]);
			args = args.concat(secondHalf);
		});
		return methodToCall.apply(thisArg, args);
	}
}


module.exports = {

};