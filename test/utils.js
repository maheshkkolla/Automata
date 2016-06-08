var expect = require("chai").expect;
var u = require("./utils");
describe("utils", function() {
    it("checks whether all the elements in one array present in another array", function() {
    	var array1 = [2,4,6,5];
    	var array2 = [4,5];
    	var array3 = [4, 2, 1];
    	expect(array1.containsAll(array2)).to.be.true;
    	expect(array1.containsAll(array3)).to.be.false;
    })

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