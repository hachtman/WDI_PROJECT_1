//Create the game object to store the vars, functions game material and flavour text.
var Game = Game || {
  diff: 0,
  points: 0,
  answerString: '',
  workingString: [],
  strings_low_diff: ['password', '1234', '12345678', 'enter'],
  strings_med_diff: ['PASSWORRD', 'MORE', 'DIFF', 'MEDIUM'],
  strings_high_diff: ['HARD', 'VERY', 'TOUGH', '789'],
  cipher_functions: {caesarKey: function getCaesarShift() {
    return Math.floor(Math.random() * 26);
  }
  }
};

$(run);

function run () {
  Game.generateProblem();
  $('form').on('submit', function(e){
    e.preventDefault();
    var $input = $('#input');
    Game.isCorrect($input.val());
  });
}

Game.isCorrect = function($input) {
  console.log(Game.workingString);
  if($input === Game.answerString) {
    console.log('Well Played!');
    Game.points++;
    Game.clear(1);
  } else{
    console.log('false');
    Game.points--;
  }
  $('.points').html('SCORE: ' + Game.points);
  Game.lvlUp();
};

Game.clear = function(winOrLose) {
  if(winOrLose === true){
    $('.tosolve').val();
  } else if (winOrLose === false) {
    console.log('.clear shouldn\'t be running');
    return false;
  }
  $('#input'). find('input[type=text], textarea').val();
  Game.workingString = [];
  console.log($('cleared'));
  Game.generateProblem();
};

Game.lvlUp = function() {
  if(Game.points < 10) {
    return true;
  } else if(Game.points < 20){
    Game.diff++;
    // youLvldUp();
  } else if(Game.points < 30){
    Game.diff++;
    // youLvldUp();
  }
};



Game.generateProblem = function() {
  Game.jumble();
  $('.tosolve').html(Game.workingString);
};

Game.jumble = function() {
  //Call the pickRandomString function and store result in a variable.
  var x = Game.pickRandomString(Game.diff);
  //Set the answer prior to scrambling.
  Game.answerString = x;
  //Iterate over the returned string and push to the working array.
  for(var i = 0; i < x.length; i++) {
    Game.workingString.push(x.charAt(i));
  }
  //Shuffle the array using the knuth shuffle and overwrite the working string variable.
  // if(Game.diff === 0 || Game.diff === 1){
  //   Game.fisherYatesShuffleMiddleOnly();
  // } else {
  Game.fisherYatesShuffle();
  // }
  // fisherYatesShuffle(Game.workingString);
};

//Function to pick a random string, dependant on difficulty.
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

Game.fisherYatesShuffle = function() {
  var i = Game.workingString.length;
  if (i === 0) {
    console.log('broken in function fischerYates');
    return false;
  }
  while (--i) {
    var j = Math.floor( Math.random() * (i + 1) );
    var tempi = Game.workingString[i];
    var tempj = Game.workingString[j];
    Game.workingString[i] = tempj;
    Game.workingString[j] = tempi;
  }
};
