var assert = require("chai").assert;
var DfaGenerator = require("../src/dfaGenerator");

describe("DFA Generator", function() {
	it("generates DFA that ends with 0", function() {
		var tuples = {
			states: ["q1", "q2"],
			alphabets: ["1", "0"],
			transitionTable: { 
				"q1": { 0: "q2", 1: "q1"},
				"q2": { 0: "q2", 1: "q1"} 
			},
			initialState: "q1",
			finalStates: ["q2"]
		};
		var dfa = new DfaGenerator().generate(tuples);
		assert.isTrue(dfa.isInLaguage(1110));
		assert.isFalse(dfa.isInLaguage(111));
	});
});