<!-- Functions -->

// max is excluseive
function getRandomInteger(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function createAnswers() {

  var answers = [],
      i = 0;

  while (i < 4) {
    var answer = getRandomInteger(1, 10);
    if (answers.indexOf(answer) === -1) {
      answers.push(answer);
      i++;
    }
  }

  return answers;
}

function shuffle(input) {

  var l = input.length,
      new_arr = input.slice();

  for (var i = 0; i < l; i++) {

    var temp = new_arr[i];

    // swap it in place with an element at a random i < index < l
    var rdm = getRandomInteger(i, l);
    new_arr[i] = new_arr[rdm];
    new_arr[rdm] = temp;
  }
  return new_arr;

}

function createFullAnswer() {

  var half = createAnswers();
  var full = half.concat(half).concat([""]);

  return shuffle(full);

}

function initializeGrid(values) {

  for (var i = 1; i < 10; i++) {
    document.getElementById('c' + i).append(values[i - 1]);
  }
}

<!-- DOM manipulation -->
$(document).ready(function() {
  initializeGrid(createFullAnswer());
});

module.exports.getRandomInteger = getRandomInteger;
module.exports.createAnswers = createAnswers;
module.exports.shuffle = shuffle;
module.exports.createFullAnswer = createFullAnswer;
