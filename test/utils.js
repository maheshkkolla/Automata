var expect = require("chai").expect;
var u = require("./utils");
describe("utils", function() {
	it("gives partial function for Math min", function() {
		var partialMin = Math.min.partial({2:10,3:15,4:6});
		expect(partialMin(20,44,32,65)).to.be.equals(6);
	});

	it("gives partial function with given order of parameters", function() {
		var sub = function(a, b) {
			return a - b;
		};

		var partialSub1 = sub.partial({1: 10});
		var partialSub2 = sub.partial({2: 3});

		expect(partialSub1(5)).to.be.equals(5);
		expect(partialSub2(13)).to.be.equals(10);
	});
});