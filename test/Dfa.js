var Dfa = require("../src/Dfa");
var expect = require("chai").expect;

describe("Dfa", function() {
	it("hasString tells whether the given string is in language or not", function() {
		var states = ["q1", "q2"];
		var alphabets = ["1", "0"];
		var transitionTable = { 
			"q1": { 0: "q2", 1: "q1"},
			"q2": { 0: "q2", 1: "q1"} 
		};
		var initialState = "q1";
		var finalStates = ["q2"];

		var dfa = new Dfa(states, alphabets, transitionTable, initialState, finalStates);
		expect(dfa.hasString('1110')).to.be.true;
		expect(dfa.hasString('0000')).to.be.true;
		expect(dfa.hasString('11000000')).to.be.true;
		expect(dfa.hasString('00011100000011')).to.be.false;
		expect(dfa.hasString('111')).to.be.false;
	});

	it("transitionFunction gives the new state after applying the alphabet to a given state", function() {
		var states = ["q1", "q2"];
		var alphabets = ["1", "0"];
		var transitionTable = { 
			"q1": { 0: "q2", 1: "q1"},
			"q2": { 0: "q2", 1: "q1"} 
		};
		var initialState = "q1";
		var finalStates = ["q2"];

		var dfa = new Dfa(states, alphabets, transitionTable, initialState, finalStates);
		expect(dfa.transitionFunction("q1", 0)).to.be.equals("q2");
		expect(dfa.transitionFunction("q1", 1)).to.be.equals("q1");
		expect(dfa.transitionFunction("q2", 0)).to.be.equals("q2");
		expect(dfa.transitionFunction("q2", 1)).to.be.equals("q1");
	});	

});