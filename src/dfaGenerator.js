var config = require("../config");
var _utils = require("underscore");
var validationRules = require("./validationRules");
var DfaGenerator = function() {
}
module.exports = DfaGenerator;

DfaGenerator.prototype = {
	generate: function(tuples) {
		this.tuples = tuples;
		this.validate();
		return new Dfa(tuples.states, tuples.alphabets, tuples.transitionTable, tuples.initialState, tuples.finalStates);
	},

	validate: function() {
		var tuples = this.tuples;
		var validations = validationRules.all();
		validations.forEach(function(validationRule) {
			if(!validationRule.isValid(tuples)) throw new Error(validationRule.errorMessage);
		});
	}
}

var Dfa = function(states, alphabets, transitionTable, initialState, finalStates) {
	this.states = states;
	this.alphabets = alphabets;
	this.transitionTable = transitionTable
	this.initialState = initialState;
	this.finalStates = finalStates;
};

Dfa.prototype = {
	transitionFunction: function(state, alphabet) {
		return(this.transitionTable[state][alphabet]);
	},

	isInLaguage: function(inputString) {
		var self = this;
		var lastState = String(inputString).split("").reduce(function(state, alphabet) {
			return self.transitionFunction(state, alphabet);
		}, self.initialState);	
		return((this.finalStates.indexOf(lastState)) >= 0);
	}
}