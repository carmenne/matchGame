<!-- Variables -->
var started = false,
    clickedValues = [],
    clickedIds = [];

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
    document.getElementById('c' + i).style.backgroundColor = "blue";
  }
}

function clearGrid() {
  initializeGrid(createFullAnswer());
}

function changeColor(el, color) {
    el.style.backgroundColor = color;
}

function showTheValue(el) {
  el.children[0].style.display = 'block';
}

function hideTheValue(el) {
  el.children[0].style.display = 'none';
}

function startCounter() {

  var start = new Date().getTime();

  setInterval( function() {
    var time = new Date().getTime() - start;
    document.getElementById('elapsedTime').innerHTML = "Time elapsed: " +
      Math.floor(time / 1000);
  }, 1000)

}

function reset(el) {

  document.getElementById("matchGrid").style.border = '';
  if (el.style.backgroundColor !== "purple") {
    changeColor(el,"blue");
    hideTheValue(el);
  }


}
function markFound(el) {
    changeColor(el,"purple");
    showTheValue(el);
}

function storeValues(id, val) {
  clickedIds.push(id);
  clickedValues.push(val);
}

function clean() {
  clickedIds = [];
  clickedValues = [];
}

function makeBorderRed() {
  document.getElementById("matchGrid").style.border = "5px solid red";
}

function handleMatch(el) {
  var value = el.children[0].innerHTML;
  var id = el.id.replace("c", "");

  switch (clickedIds.length) {
    case 0: // just created
      storeValues(id, value);
      break;
    case 1: // matching pair?

      var prevEl = document.getElementById('c' + clickedIds[0]);
      if (id === clickedIds[0]) {
        // clicked on same element twice, do nothing
      } else if (value === clickedValues[0]){
        // Matching pair
        markFound(el);
        markFound(prevEl);
        clean();
      } else {

        makeBorderRed();

        setTimeout( function() {
          reset(el);
          reset(prevEl);
          clean();}, 400);

      }

      break;
    default:

  }

}

<!-- DOM manipulation -->
$(document).ready(function() {
  initializeGrid(createFullAnswer());


<!-- Events listeners -->
    document.addEventListener('mouseover', function(event) {

    var el = event.target;
    if (!el.classList.contains('bluesquare')) {
      return;
    }

    if (el.style.backgroundColor !== "blue") {
      return;
    }

    changeColor(el, "orange");
  });

  document.addEventListener('mouseout', function(event) {
    if (event.target.style.backgroundColor === 'orange') {
      changeColor(event.target, "blue");
    }
  });

  document.addEventListener('click', function(event) {
    if (!event.target.classList.contains('bluesquare')) {
      return;
    }

    var el = event.target;
    changeColor(el, "red", "click");
    showTheValue(el);

    if (!started) {
      startCounter();
      started = true;
    }

    handleMatch(el);

  });

});

module.exports.getRandomInteger = getRandomInteger;
module.exports.createAnswers = createAnswers;
module.exports.shuffle = shuffle;
module.exports.createFullAnswer = createFullAnswer;
