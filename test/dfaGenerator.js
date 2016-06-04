var assert = require("chai").assert;
var expect = require("chai").expect;
var DfaGenerator = require("../src/dfaGenerator");
var config = require("../config");

describe("DFA Generator", function() {	
	describe("Happy paths", function() {
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

	describe("Edge cases", function() {
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

		it("throws error when final states is not in given states", function() {
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["1", "0"],
				transitionTable: { 
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q1"} 
				},
				initialState: "q1",
				finalStates: ["q1", "q4"]
			};
			var dfaGenerator = new DfaGenerator();
			var generator = dfaGenerator.generate.bind(dfaGenerator, tuples);
			expect(generator).to.throw(config.errors.finalState);
		});

		it("throws error when there are no enough links for states in transition table", function() {
			var tuples = {
				states: ["q1", "q2", "q3"],
				alphabets: ["1", "0"],
				transitionTable: { 
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q1"} 
				},
				initialState: "q1",
				finalStates: ["q1"]
			};
			var dfaGenerator = new DfaGenerator();
			var generator = dfaGenerator.generate.bind(dfaGenerator, tuples);
			expect(generator).to.throw(config.errors.trasitionTableStates);
		});

		it("throws error when there are no enough links for alphabets in transition table", function() {
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["1", "0"],
				transitionTable: { 
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2"} 
				},
				initialState: "q1",
				finalStates: ["q1"]
			};
			var dfaGenerator = new DfaGenerator();
			var generator = dfaGenerator.generate.bind(dfaGenerator, tuples);
			expect(generator).to.throw(config.errors.transitionTableAlphabets);
		});

		it("throws error when the result states of transition table are not present", function() {
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["1", "0"],
				transitionTable: { 
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q5"} 
				},
				initialState: "q1",
				finalStates: ["q1"]
			};
			var dfaGenerator = new DfaGenerator();
			var generator = dfaGenerator.generate.bind(dfaGenerator, tuples);
			expect(generator).to.throw(config.errors.transitionTableResultState);
		});


	});
});
