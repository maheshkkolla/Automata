var config = require("../config");
var _utils = require("underscore");
var validationRules = require("./validationRules");
var DfaGenerator = function() {
}
module.exports = DfaGenerator;

DfaGenerator.prototype = {
	generate: function(tuples) {
		this.validate(tuples);
		return new Dfa(tuples.states, tuples.alphabets, tuples.transitionTable, tuples.initialState, tuples.finalStates);
	},

	validate: function(tuples) {
		var validations = validationRules.all();
		validations.forEach(function(validationRule) {
			if(!validationRule.isValid(tuples)) throw new Error(validationRule.errorMessage);
		});
	},

	generateNfa: function(tuples) {
		return new Nfa(tuples.states, tuples.alphabets, tuples.transitionTable, tuples.initialState, tuples.finalStates);
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
		var lastState = inputString.split('').reduce(this.transitionFunction.bind(this), this.initialState);	
		return((this.finalStates.indexOf(lastState)) >= 0);
	}
}


var Nfa = function(states, alphabets, transitionTable, initialState, finalStates) {
	this.states = states;
	this.alphabets = alphabets;
	this.transitionTable = transitionTable;
	this.initialState = initialState;
	this.finalStates = finalStates;
}

Nfa.prototype = {
	transitionFunction: function(state, alphabet) {
		return(this.transitionTable[state][alphabet]);
	},

	isInLaguage: function(inputString) {
		return this.isStringInLanguage(inputString, [this.initialState], 0);
	},

	isStringInLanguage: function(inputString, states, alphabetIndex) {
		var self = this;
		states = states.concat(self.getEpsilonStatesFrom(states));
		if(inputString.length == alphabetIndex) {
			return(_utils.difference(states, this.finalStates).length < states.length);
		}
		var newIndex = alphabetIndex + 1;
		return states.reduce(function(result, state) {
			var newStates = self.transitionFunction(state, inputString[alphabetIndex]);
			if(!newStates) return result || false;
			return(result || self.isStringInLanguage(inputString, newStates, newIndex));
		}, false);
	},

	getEpsilonStatesFrom: function(states) {
		var self = this;
		return states.reduce(function(result, state) {
			var epsilonStates = self.transitionTable[state]['E'] || [];
			return(result.concat(epsilonStates));
		}, []);
	}
}








