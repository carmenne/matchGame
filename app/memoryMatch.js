<!-- Variables -->
var started = false,
    clicked = {}; // {'value1':['el1'], 'value2':['el1', 'el2']}


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
    document.getElementById('c' + i).children[0].innerHTML = values[i - 1];
  }
}

function clearGrid() {
  initializeGrid(createFullAnswer());
}

function changeColorOnMouseOver(el, color) {

  if (el.classList.contains('bluesquare')) {
    if (el.style.backgroundColor !== 'purple') {
      el.style.backgroundColor = color;
    }
  }
}

function displayTheValue(el) {

  if (el.classList.contains('bluesquare')) {
      el.children[0].style.display = 'block';
  }
}

function startCounter() {

  var start = new Date().getTime();

  setInterval( function() {
    var time = new Date().getTime() - start;
    document.getElementById('elapsedTime').innerHTML = "Time elapsed: " +
      Math.floor(time / 1000);
  }, 1000)

}

function handleMatch(el) {
  if (el.classList.contains('bluesquare')) {
      var prop = el.children[0].innerHTML;
      var id = el.id.replace("c", "");
      if (clicked[prop]) {
        // it's a match
        el.style.backgroundColor = 'purple';
        document.getElementById('c'+clicked[prop]).style.backgroundColor = 'purple';
        clicked[prop].push(id);

      } else {
        var v = [];
        v.push(id);
        clicked[prop] = v;
      }
  }
}

<!-- DOM manipulation -->
$(document).ready(function() {
  initializeGrid(createFullAnswer());

  document.addEventListener('mouseover', function(event) {
    changeColorOnMouseOver(event.target, "orange");
  });

  document.addEventListener('mouseout', function(event) {
    changeColorOnMouseOver(event.target, "blue");
  });

  document.addEventListener('click', function(event) {

    if (!started) {
      startCounter();
      started = true;
    }

    handleMatch(event.target);

    changeColorOnMouseOver(event.target, "red");
    displayTheValue(event.target);
  });

});

module.exports.getRandomInteger = getRandomInteger;
module.exports.createAnswers = createAnswers;
module.exports.shuffle = shuffle;
module.exports.createFullAnswer = createFullAnswer;
