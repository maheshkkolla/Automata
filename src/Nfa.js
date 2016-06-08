var _utils = require("underscore");
var Nfa = function(states, alphabets, transitionTable, initialState, finalStates) {
	this.states = states;
	this.alphabets = alphabets;
	this.transitionTable = transitionTable;
	this.initialState = initialState;
	this.finalStates = finalStates;
}

Nfa.prototype = {
	transitionFunction: function(state, alphabet) {
		return(this.transitionTable[state][alphabet]) || [];
	},

	multipleStateTransitionFunction: function(states, alphabet) {
		var self = this;
		states = states.concat(self.getEpsilonStates(states));
		var newStates = states.map(self.transitionFunction.partial({2:alphabet}, self));
		return _utils.uniq(Array.prototype.concat.apply([], newStates));
	},

	hasString: function(inputString) {
		var self = this;
		if(inputString.length == 0) return self.hasEmptyString();
		var lastStates = inputString.split('').reduce(self.multipleStateTransitionFunction.bind(self), [self.initialState]);
		lastStates = lastStates.concat(self.getEpsilonStates(lastStates));
		return self.anyInFinalStates(lastStates);
	},

	getEpsilonStates: function(states) {
		var self = this;
		return _utils.uniq(states.reduce(function(epsilonStates, state) {
			return epsilonStates.concat(self.getEpsilonStatesFromGiven(state));
		}, []));
	},

	getEpsilonStatesFromGiven: function(state) {
		var epsilonStates = this.transitionTable[state]['E'] || this.transitionTable[state]['e'] || [];
		return _utils.uniq(epsilonStates.concat(this.getEpsilonStates(epsilonStates)));
	},

	anyInFinalStates: function(states) {
		return _utils.intersection(this.finalStates, states).length > 0;
	},

	hasEmptyString: function() {
		var lastStates = [this.initialState].concat(this.getEpsilonStatesFromGiven(this.initialState));
		return this.anyInFinalStates(lastStates);
	}
};

module.exports = Nfa;