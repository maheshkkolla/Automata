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
});