var expect = require("chai").expect;
var validationRules = require("../src/validationRules");
var config = require("../config");

describe("Validation Rules", function() {
	describe("Initial State Rule", function() {
		it("should tell that inital state is present in given states", function() {
			var rule = new validationRules.InitialStateRule();
			var tuples = {
				states: ["q0", "q1"],
				initialState: "q1"
			};
			expect(rule.isValid(tuples)).to.be.true;
		});

		it("should tell that inital state is not present in given states", function() {
			var rule = new validationRules.InitialStateRule();
			var tuples = {
				states: ["q0", "q1"],
				initialState: "q4"
			};
			expect(rule.isValid(tuples)).to.be.false;
		});

		it("should give the error message for in valid initial state", function() {
			var rule = new validationRules.InitialStateRule();
			expect(rule.errorMessage).to.equal(config.errors.initialState);
		});
	});
	
	describe("Final State Rule", function() {
		it("should tell that all final states are present in given states", function() {
			var rule = new validationRules.FinalStatesRule();
			var tuples = {
				states: ["q0", "q1", "q2", "q3", "q4", "q5"],
				finalStates: ["q1", "q2", "q4"]
			};
			expect(rule.isValid(tuples)).to.be.true;
		});

		it("should tell that some of the final states are not present in given states", function() {
			var rule = new validationRules.FinalStatesRule();
			var tuples = {
				states: ["q0", "q1"],
				finalStates: ["q1", "q4"]
			};
			expect(rule.isValid(tuples)).to.be.false;
		});


		it("should give the error message for in valid final states", function() {
			var rule = new validationRules.FinalStatesRule();
			expect(rule.errorMessage).to.equal(config.errors.finalState);
		});
	});	

	describe("Transition Table States Rule", function() {
		it("should tell that given transition table have links from all given states", function() {
			var rule = new validationRules.TransitionTableStatesRule();
			var tuples = {
				states: ["q1", "q2"],
				transitionTable: {
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q1"}
				}
			};
			expect(rule.isValid(tuples)).to.be.true;
		});

		it("should tell that given transition table does not have links from all given states", function() {
			var rule = new validationRules.TransitionTableStatesRule();
			var tuples = {
				states: ["q1", "q2", "q3"],
				transitionTable: {
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q1"}
				}
			};
			expect(rule.isValid(tuples)).to.be.false;
		});

		it("should give the error message for in valid transition table states", function() {
			var rule = new validationRules.TransitionTableStatesRule();
			expect(rule.errorMessage).to.equal(config.errors.transitionTableStates);
		});
	});

	describe("Transition Table Alphabets Rule", function() {
		it("should tell that given trasition table have links for all alphabets from all states", function() { 
			var rule = new validationRules.TransitionTableAlphabetsRule();
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["0", "1"],
				transitionTable: {
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q1"}
				}
			};
			expect(rule.isValid(tuples)).to.be.true;
		});

		it("should tell that given trasition table does not have links for all alphabets from all states", function() { 
			var rule = new validationRules.TransitionTableAlphabetsRule();
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["0", "1"],
				transitionTable: {
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2"}
				}
			};
			expect(rule.isValid(tuples)).to.be.false;
		});

		it("should give the error message for not enough links for all alphabets", function() {
			var rule = new validationRules.TransitionTableAlphabetsRule();
			expect(rule.errorMessage).to.equal(config.errors.transitionTableAlphabets);
		});
	});

	describe("Transition Table Result State Rule", function() {
		it("should tell that given transition table all result states are in given states", function() {
			var rule = new validationRules.TransitionTableResultStateRule();
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["1", "0"],
				transitionTable: {
					"q1": { 0: "q2", 1: "q1"},
					"q2": { 0: "q2", 1: "q1"}
				}
			};
			expect(rule.isValid(tuples)).to.be.true;
		});

		it("should tell that given transition table all result states are not in given states", function() {
			var rule = new validationRules.TransitionTableResultStateRule();
			var tuples = {
				states: ["q1", "q2"],
				alphabets: ["1", "0"],
				transitionTable: {
					"q1": { 0: "q2", 1: "q4"},
					"q2": { 0: "q2", 1: "q1"}
				}
			};
			expect(rule.isValid(tuples)).to.be.false;
		});

		it("should give the error message for transition table result states not in given states", function() {
			var rule = new validationRules.TransitionTableResultStateRule();
			expect(rule.errorMessage).to.equal(config.errors.transitionTableResultState);
		});
	});
});