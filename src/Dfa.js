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

module.exports = Dfa;