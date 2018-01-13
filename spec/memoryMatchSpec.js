var game = require("../app/memoryMatch.js");
var window = undefined;

describe("Memory Match game suite", function() {

  describe("Generate random numbers", function() {

    it("Should generate a random integer between 1-9", function() {
      for (var i = 0; i < 100; i++) {
        var actual = game.getRandomInteger(1,10);
        expect(actual).toBeLessThan(10)
        expect(actual).toBeGreaterThan(0);
      }
    });

    it("Should generate different integers", function() {
      for (var i = 0; i < 100; i++) {
        var items = game.createAnswers();
        var uniqueItems = [...new Set(items)]
        expect(items.length).toBe(5);
      }
    });

    it("Should shuffle an array", function() {
      var input = [1,1,2,2,3,3,4,4];
      var actual = game.shuffle(input);
      expect(actual).not.toBe(input);
    });

    it("Should generate a shuffled array of 8 integers " +
      "which is the double of an array of 4 integers]", function() {
      var actual = game.createFullAnswer();
      var actualSorted = actual.slice().sort();
      
      expect(actual.length).toBe(9);
      expect(actual).not.toBe(actualSorted);
    });
  });
});
