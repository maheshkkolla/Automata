var Nfa = require("../src/Nfa");
var expect = require("chai").expect;
var nfa = null;

describe("Nfa", function() {
	before(function() {
		var states = ["q1", "q2", "q3", "q4", "q5"];
		var alphabets = ["0", "1"];
		var transitionTable = {
			"q1": { E: ["q2", "q4"] },
			"q2": { 0: ["q2"], E: ["q3"] },
			"q3": { 1: ["q3"] },
			"q4": { 1: ["q4"], E:["q5"] },
			"q5": { 0: ["q5"] }
		};
		var initialState = "q1"
		var finalStates = ["q3", "q5"];

		nfa = new Nfa(states, alphabets, transitionTable, initialState, finalStates);
	});

	it("transitionFunction gives the new states after applying the alphabet to a given state", function() {
		expect(nfa.transitionFunction("q1", 'E')).to.eql(["q2", "q4"]);
		expect(nfa.transitionFunction("q2", '0')).to.eql(["q2"]);
		expect(nfa.transitionFunction("q2", 'E')).to.eql(["q3"]);
		expect(nfa.transitionFunction("q3", '1')).to.eql(["q3"]);
		expect(nfa.transitionFunction("q4", '1')).to.eql(["q4"]);
		expect(nfa.transitionFunction("q4", 'E')).to.eql(["q5"]);
		expect(nfa.transitionFunction("q5", '0')).to.eql(["q5"]);
	});

	it("multipleStateTransitionFunction gives the new states after applying the alphabet to a given multiple states", function() {
		expect(nfa.multipleStateTransitionFunction(["q1"], 'E')).to.eql(["q2", "q4", "q3", "q5"]);
		expect(nfa.multipleStateTransitionFunction(["q1", "q2"], '0')).to.eql(["q2", "q5"]);
		expect(nfa.multipleStateTransitionFunction(["q2", "q3"], '1')).to.eql(["q3"]);
		expect(nfa.multipleStateTransitionFunction(["q2", "q4"], '1')).to.eql(["q4", "q3"]);
		expect(nfa.multipleStateTransitionFunction(["q2", "q5"], '0')).to.eql(["q2", "q5"]);
	});	

	it("hasString tells whether the given string is in language or not", function() {
		expect(nfa.hasString('')).to.be.true;
		expect(nfa.hasString('111100')).to.be.true;
		expect(nfa.hasString('0000011111')).to.be.true;
		expect(nfa.hasString('01010')).to.be.false;
		expect(nfa.hasString('1101')).to.be.false;
	});

	it("getEpsilonStates gives the all result states of epsilon transaction from the given states", function() {
		expect(nfa.getEpsilonStates(["q1"])).to.eql(["q1", "q2", "q4", "q3", "q5"]);
		expect(nfa.getEpsilonStates(["q1", "q2"])).to.eql(["q1", "q2", "q4", "q3", "q5"]);
		expect(nfa.getEpsilonStates(["q2", "q3"])).to.eql(["q2", "q3"]);
		expect(nfa.getEpsilonStates(["q2", "q4"])).to.eql(["q2", "q4", "q3", "q5"]);
	});

	it("getEpsilonStatesFromGiven gives the result states of epsilon transaction from a given single state", function() {
		expect(nfa.getEpsilonStatesFromGiven("q1")).to.eql(["q2", "q4"]);
		expect(nfa.getEpsilonStatesFromGiven("q2")).to.eql(["q3"]);
		expect(nfa.getEpsilonStatesFromGiven("q3")).to.eql([]);
		expect(nfa.getEpsilonStatesFromGiven("q4")).to.eql(["q5"]);
	});

	it("anyInFinalStates tells whether any of the given states are in final states or not", function() {
		expect(nfa.anyInFinalStates(["q3", "q1"])).to.be.true;
		expect(nfa.anyInFinalStates(["q5", "q1", "q8"])).to.be.true;
		expect(nfa.anyInFinalStates(["q3", "q5", "q4"])).to.be.true;
		expect(nfa.anyInFinalStates(["q2", "q5"])).to.be.true;
		expect(nfa.anyInFinalStates(["q1", "q2"])).to.be.false;
		expect(nfa.anyInFinalStates([])).to.be.false;
	});

	it("hasEmptyString tells that wheter the language of nfa has empty string or not", function() {
		expect(nfa.hasEmptyString()).to.be.true;

		var states = ["q1", "q2", "q3"];
		var alphabets = ["0", "1"];
		var transitionTable = {
			"q1": { E: ["q2"] },
			"q2": { 0: ["q3"], 1: ["q3"] },
			"q3": { 0: ["q3"], 1: ["q3"] }
		};
		var initialState = "q1"
		var finalStates = ["q3"];
		nfa = new Nfa(states, alphabets, transitionTable, initialState, finalStates);

		expect(nfa.hasEmptyString()).to.be.false;
	});
});