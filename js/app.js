$(run);
//Create the game object to store the vars, functions game material and flavour text.
var Game = Game || {
  diff: 0,

  workingString: [],

  strings_low_diff: ['password', '1234', '12345678', 'enter'],
  strings_med_diff: ['password', '1234', '12345678', 'enter'],
  strings_high_diff: ['password', '1234', '12345678', 'enter'],

  cipher_functions: {caesarKey: function getCaesarShift() {
    return Math.floor(Math.random() * 26);
  }

  }
};

//Function to run the game, call the first challenge and listen for user input.
function run () {
  $('form').on('submit', function(e){
    e.preventDefault();

    Game.generateProblem();
    var $input = $('#input');
    Game.isCorrect($input.val());
  });
}

Game.generateProblem = function() {

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
  fisherYatesShuffle(Game.workingString);
};

function fisherYatesShuffle (workingString) {
  var i = workingString.length;
  if (i === 0) return false;
  while ( --i ) {
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var tempi = workingString[i];
    var tempj = workingString[j];
    workingString[i] = tempj;
    workingString[j] = tempi;
  }
  console.log(Game.workingString);
}


//Function to pick random string.
Game.pickRandomString = function(diff){
  if(diff === 0) {
    return Game.strings_low_diff[Math.floor(Math.random() * Game.strings_low_diff.length)];
  } else if(diff === 1) {
    return Game.strings_med_diff[Math.floor(Math.random() * Game.strings_med_diff.length)];
  } else {
    return Game.strings_high_diff[Math.floor(Math.random() * Game.strings_high_diff.length)];
  }
};

//Function to test user input for correctness.
Game.isCorrect = function($input) {
  if($input === Game.strings_low_diff[0]) {
    console.log('Well Played!');
  } else{
    console.log('false');
    Game.clear();
  }
};

Game.clear = function() {
  $('.input').val();
  console.log($('#input'));
};
