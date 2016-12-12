$(run);
//Create the game object to store the vars, functions game material and flavour text.
var Game = Game || {
  diff: 0,
  answerString: [],
  workingString: [],

  strings_low_diff: ['password', '1234', '12345678', 'enter'],
  strings_med_diff: ['password', '1234', '12345678', 'enter'],
  strings_high_diff: ['password', '1234', '12345678', 'enter'],
snail
  cipher_functions: {caesarKey: function getCaesarShift() {
    return Math.floor(Math.random() * 26);
  }
  }
};

//Function to run the game on DOM load, call the first challenge and listen for user input.
function run () {
  Game.generateProblem();
  $('form').on('submit', function(e){
    e.preventDefault();
    var $input = $('#input');
    Game.isCorrect($input.val());
  });
}

Game.generateProblem = function() {
  Game.jumble();

  // var toSolve = $('.tosolve');
  // console.log(toSolve);

};

//
Game.jumble = function() {
  //Call the pick random string function and store result in a variable.
  var x = Game.pickRandomString(Game.diff);
  //Iterate over the returned string and push to the working array.
  for(var i = 0; i < x.length; i++) {
    Game.workingString.push(x.charAt(i));
  }
  //Shuffle the array using the knuth shuffle and overwrite the variable.
  if(Game.diff === 0 || Game.diff === 1){
    Game.fisherYatesShuffleMiddleOnly();
  } else {
    Game.fisherYatesShuffle();
  }
  // fisherYatesShuffle(Game.workingString);
};


//Executes a Fisher Yates shuffle on the entire string or excludes the first and last chars.
Game.fisherYatesShuffle = function() {
  var i = Game.workingString.length;
  if (i === 0) {
    console.log('broken in function fischerYates');
    return false;
  }
  while (--i) {
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var tempi = Game.workingString[i];
    var tempj = Game.workingString[j];
    Game.workingString[i] = tempj;
    Game.workingString[j] = tempi;
  }
  console.log(Game.workingString);
};

//Function to pick random string.
Game.pickRandomString = function(diff){
  if(diff === 0) {
    return Game.strings_low_diff[Math.floor(Math.random() * Game.strings_low_diff.length)];
  } else if(diff === 1) {
    return Game.strings_med_diff[Math.floor(Math.random() * Game.strings_med_diff.length)];
  } else if (diff === 2) {
    return Game.strings_high_diff[Math.floor(Math.random() * Game.strings_high_diff.length)];
  } else {
    console.log('pickRandomString is broken');
    return false;
  }
};

//Function to test user input for correctness.
Game.isCorrect = function($input) {
  console.log(Game.workingString);
  Game.workingString = Game.workingString.join('');
  if($input === Game.workingString) {
    console.log('Well Played!');
    Game.clear();
  } else{
    console.log('false');
    Game.clear();
  }
};

Game.clear = function() {
  $('.input').val();
  Game.workingString = [];
  console.log($('cleared'));
};


/*
Game.fisherYatesShuffleMiddleOnly = function() {
  //Remove the first and last elements from the working string array.
  Game.char0    = Game.workingString.pop();
  Game.charLast = Game.workingString.shift();
  //Shuffle the middle elements.
  var i = Game.workingString.length;
  if (i === 0) {
    console.log('broken in function fischerYates');
    return false;
  }
  while (--i) {
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var tempi = Game.workingString[i];
    var tempj = Game.workingString[j];
    Game.workingString[i] = tempj;
    Game.workingString[j] = tempi;
  }
  Game.workingString[0] = Game.char0;
  Game.workingString.push(Game.charLast);
  console.log(Game.workingString);
};
*/


// Game.youLvldUp = function() {
//   window.setInterval(function() {
//     if(diff === 1) {
//     caesarCipher();
//   $('.tosolve').html('WELL DONE. TIME TO RAMP THINGS UP A NOTCH.');
// } else if (diff === 2) {
//   $('.tosolve').html('PRETTY GOOD');
// }
// }, 2000);

// Game.caret =  function() {
//   var cursor;
//   cursor = Game.setInterval(function () {
//   $('#fakeCursor').on('click', function(){
//     if($(caret).css('visibility') === 'visible') {
//       $(caret).css({visibility: 'hidden'
//     });
//   } else {
//       $('#fakeCursor').css({visibility: 'visible'});
//     };

Game.caret = function() {
  var textArea = $('.textArea');
  $('#input').on('keydown', function(e) {
    var ascii = $(e.target).val();
    console.log(ascii);
    textArea.append(ascii)
  });
};
