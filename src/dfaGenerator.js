var DfaGenerator = function() {
}
module.exports = DfaGenerator;

DfaGenerator.prototype = {
	generate: function(tuples) {
		return new Dfa(tuples.states, tuples.alphabets, tuples.transitionTable, tuples.initialState, tuples.finalStates);
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