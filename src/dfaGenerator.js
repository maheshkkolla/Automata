var config = require("../config");
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
		var self = this;
		[this.validateInitialState, this.validateFinalStates].forEach(function(validation) {
			validation.apply(self);
		});
	},

	validateInitialState: function() {
		var tuples = this.tuples;
		if(tuples.states.indexOf(tuples.initialState) < 0) 
			throw new Error(config.errors.initialState);
	},

	validateFinalStates: function() {
		var tuples = this.tuples;
		var allIn = tuples.finalStates.every(function(finalState) {
			return(tuples.states.indexOf(finalState) > 0);
		});
		if(!allIn) throw new Error(config.errors.finalState);
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