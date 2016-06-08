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

	hasString: function(inputString) {
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

	hasString: function(inputString) {
		var self = this;
		var lastStates = inputString.split('').reduce(function(states, alphabet) {
			states = states.concat(self.getEpsilonStatesFrom(states));
			return states.reduce(function(newStates, state) {
				var resultState = self.transitionFunction(state, alphabet);
				if(resultState) return newStates.concat(resultState);
				return newStates;
			},[]);
		}, [self.initialState]);
		if(inputString.length == 0) {
			lastStates = [self.initialState].concat(self.getEpsilonStatesFromGiven(self.initialState));
		}
		return _utils.intersection(self.finalStates, lastStates).length > 0;
	},

	getEpsilonStatesFrom: function(states) {
		var self = this;
		return states.reduce(function(epsilonStates, state) {
			return epsilonStates.concat(self.getEpsilonStatesFromGiven(state));
		}, []);
	},

	getEpsilonStatesFromGiven: function(state) {
		var epsilonStates = this.transitionTable[state]['E'] || [];
		return epsilonStates.concat(this.getEpsilonStatesFrom(epsilonStates));
	}
}








