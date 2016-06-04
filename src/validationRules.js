var config = require("../config");
var _utils = require("underscore");
var u = require("./utils");

var InitialStateRule = function() {
	this.errorMessage = config.errors.initialState;
};
InitialStateRule.prototype =  {
	isValid: function(tuples) {
		return(_utils.contains(tuples.states, tuples.initialState));
	}
};

var FinalStatesRule = function() {
	this.errorMessage = config.errors.finalState;
};
FinalStatesRule.prototype = {
	isValid: function(tuples) {
		return tuples.states.containsAll(tuples.finalStates);
	}
};

var TrasitionTableStatesRule = function() {
	this.errorMessage = config.errors.trasitionTableStates
};
TrasitionTableStatesRule.prototype = {
	isValid: function(tuples) {
		var trasitionTableStates = Object.keys(tuples.transitionTable)
		return trasitionTableStates.containsAll(tuples.states);
	}
};

var getAllRules = function() {
	return [
		new InitialStateRule(),
		new FinalStatesRule(),
		new TrasitionTableStatesRule()
	];
};

module.exports =  {
	InitialStateRule: InitialStateRule,
	FinalStatesRule: FinalStatesRule,
	TrasitionTableStatesRule: TrasitionTableStatesRule,
	all: getAllRules
};