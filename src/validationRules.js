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

var TransitionTableStatesRule = function() {
	this.errorMessage = config.errors.transitionTableStates;
};
TransitionTableStatesRule.prototype = {
	isValid: function(tuples) {
		var transitionTableStates = Object.keys(tuples.transitionTable);
		return transitionTableStates.containsAll(tuples.states);
	}
};

var TransitionTableAlphabetsRule = function() {
	this.errorMessage = config.errors.transitionTableAlphabets;
};
TransitionTableAlphabetsRule.prototype = {
	isValid: function(tuples) {
		var transitionTableStates = Object.keys(tuples.transitionTable);
		return transitionTableStates.every(function(state) {
			var alphabets = Object.keys(tuples.transitionTable[state]);
			return alphabets.containsAll(tuples.alphabets);
		});
	}
};


var getAllRules = function() {
	return [
		new InitialStateRule(),
		new FinalStatesRule(),
		new TransitionTableStatesRule(),
		new TransitionTableAlphabetsRule()
	];
};

module.exports =  {
	InitialStateRule: InitialStateRule,
	FinalStatesRule: FinalStatesRule,
	TransitionTableStatesRule: TransitionTableStatesRule,
	TransitionTableAlphabetsRule: TransitionTableAlphabetsRule,
	all: getAllRules
};