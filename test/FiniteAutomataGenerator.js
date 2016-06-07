var assert = require("chai").assert;
var expect = require("chai").expect;
var DfaGenerator = require("../src/FiniteAutomataGenerator");
var config = require("../config");

describe("Automata Generator", function() {	
	describe("Dfa generator", function() {
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

			it("generates DFA to accept all binary numbers that are multiple by 2", function() {
				var tuples = {
					states: ["q1", "q2"],
					alphabets: ["0", "1"],
					transitionTable: {
						"q1": { 0: "q1", 1: "q2"},
						"q2": { 0: "q1", 1: "q2"}
					},
					initialState: "q1",
					finalStates: ["q1"]
				};
				var dfa = new DfaGenerator().generate(tuples);
				expect(dfa.isInLaguage(00)).to.be.true;
				expect(dfa.isInLaguage(100)).to.be.true;
				expect(dfa.isInLaguage(101)).to.be.false;
				expect(dfa.isInLaguage(110110)).to.be.true;
				expect(dfa.isInLaguage(111001)).to.be.false;
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

	describe("Nfa generator", function() {
		it("generates Nfa for language that strings has 11 or 101 as sub strings", function() {
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["0", "1"],
				transitionTable: {
					"q1": { 0: ["q1"], 1: ["q1","q2"]},
					"q2": { 0: ["q3"], E: ["q3"]},
					"q3": { 1: ["q4"]},
					"q4": { 0: ["q4"], 1:["q4"]}
				},
				initialState: "q1",
				finalStates: ["q4"]
			}

			var nfa = new DfaGenerator().generateNfa(tuples);
			expect(nfa.isInLaguage('01010')).to.be.true;
			expect(nfa.isInLaguage('111100')).to.be.true;
			expect(nfa.isInLaguage('1101')).to.be.true;
			expect(nfa.isInLaguage('10010001')).to.be.false;
		});
	});
});
