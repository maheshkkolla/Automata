var assert = require("chai").assert;
var expect = require("chai").expect;
var DfaGenerator = require("../src/dfaGenerator");
var config = require("../config");

describe("DFA Generator happy paths", function() {
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
		expect(dfa.isInLaguage(1110)).to.be.true;
		expect(dfa.isInLaguage(111)).to.be.false;
	});
});


describe("DFA Generator edge cases", function() {
	it("throws error when initial state is not in given states", function() {
		var tuples = {
			states: ["q1", "q2"],
			alphabets: ["1", "0"],
			transitionTable: { 
				"q1": { 0: "q2", 1: "q1"},
				"q2": { 0: "q2", 1: "q1"} 
			},
			initialState: "q3",
			finalStates: ["q2"]
		};
		var dfaGenerator = new DfaGenerator();
		var generator = dfaGenerator.generate.bind(dfaGenerator, tuples);
		expect(generator).to.throw(config.errors.initialState);
	});
});