var config = require("../config");
var Dfa = require("./Dfa");
var Nfa = require("./Nfa");
var validationRules = require("./validationRules");

var DfaGenerator = function() {
}

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
};

module.exports = DfaGenerator;
