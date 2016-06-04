var config = require("../config");
var _utils = require("underscore");

var InitialStateRule = function() {
	this.errorMessage = config.errors.initialState;
}
InitialStateRule.prototype =  {
	isValid: function(tuples) {
		return(_utils.contains(tuples.states, tuples.initialState));
	}
};

var FinalStatesRule = function() {
	this.errorMessage = config.errors.finalState;
}
FinalStatesRule.prototype = {
	isValid: function(tuples) {
		return tuples.finalStates.every(function(finalState) {
			return(_utils.contains(tuples.states, finalState));
		});
	}
}

var getAllRules = function() {
	return [
		new InitialStateRule(),
		new FinalStatesRule()
	];
};

module.exports =  {
	InitialStateRule: InitialStateRule,
	FinalStatesRule: FinalStatesRule,
	all: getAllRules
}