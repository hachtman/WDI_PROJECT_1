//Create the game object to store the vars, functions game material and flavour text.
var Game = Game || {
  diff: 0,
  points: 0,
  answerString: '',
  workingString: [],
  strings_low_diff: ['password', '1234', '12345678', 'enter', 'dragon', 'baseball', 'football', 'monkey', '696969', 'master', 'jordan', 'asshole', 'fuckme', 'test', 'fuck', 'pass', 'yellow', 'secret', 'guitar', 'love'],
  strings_med_diff: ['abc123', 'jennifer', 'joshua', 'computer', 'ranger', 'batman'],
  strings_high_diff: ['qwerty', 'mustang', 'TOUGH', '789'],
  cipher_functions: {caesarKey: function getCaesarShift() {
    return Math.floor(Math.random() * 26);
  }
  }
};

$(run);

function run () {
  $('#input').focus();
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
  $('.points').html('POINTS: ' + Game.points);
  Game.lvlUp();
};

Game.clear = function(winOrLose) {
  if(winOrLose === true){
    $('.tosolve').val();
  } else if (winOrLose === false) {
    console.log('.clear shouldn\'t be running');
    return false;
  }
  $('#input'). find('input[type=text], textarea').val('');
  Game.workingString = [];
  console.log($('cleared'));
  Game.generateProblem();
};

//Check for lvl up. Broken.
Game.lvlUp = function() {
  if(Game.points < 10) {
    return true;
  } else if(Game.points < 20){
    Game.diff = 1;
    $('.Level').html('LVL: 1');
    // youLvldUp();
  } else if(Game.points < 30){
    Game.diff = 2;
    $('.Level').html('LVL: 2');
    // youLvldUp();
  } else if(Game.points === 40) {
    // Game.youWon();
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
  if(Game.diff === 0 || Game.diff === 1){
    Game.fisherYatesShuffleMiddleOnly();
  } else {
    Game.fisherYatesShuffle();
  }
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

Game.fisherYatesShuffleMiddleOnly = function() {
  //Remove the first and last elements from the working string array.
  var char0    = Game.workingString.shift();
  var charLast = Game.workingString.pop();
  //Shuffle the middle elements.
  var i = Game.workingString.length;
  if (i === 0) {
    console.log('broken in function fischerYatesMiddle');
    return false;
  }
  while (--i) {
    var j = Math.floor( Math.random() * (i + 1) );
    var tempi = Game.workingString[i];
    var tempj = Game.workingString[j];
    Game.workingString[i] = tempj;
    Game.workingString[j] = tempi;
  }
  //Re-add the first and last elements.
  Game.workingString.unshift(char0);
  Game.workingString.push(charLast);
  console.log(Game.workingString);
};



Game.caesarCipher = function() {
  var key    = Game.cipher_functions.caesarKey();
  var string =
};
