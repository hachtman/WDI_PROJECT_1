var Game = Game || {
  diff: 0,
  points: 0,
  answerString: '',
  workingString: [],
  strings_low_diff: ['password', 'enter', 'dragon', 'baseball', 'football', 'monkey', 'master', 'jordan', 'asshole', 'fuckme', 'let me in', 'fuck', 'pass', 'yellow', 'secret', 'guitar', 'love'],
  strings_med_diff: ['abc123', 'jennifer', 'joshua', 'computer', 'ranger', 'batman'],
  strings_high_diff: ['qwerty', 'mustang', 'TOUGH', '789'],
  cipher_functions: {caesarKey: function getCaesarShift() {
    return Math.floor(Math.random() * 26);
  }
  }
};

var countForFlicker = 0;

$(run);

function run() {
  Game.caret();
  Game.intro();
  $('#start').on('click', Game.initialise);
  $('#input').focus();
}

Game.intro = function() {

  $(function(){
    $('.information').typed({
      strings: ['You\'ve been using a sh*t password and have been hacked by L337 H4x0r. Common passwords are easy to crack, even when they\'re scrambled. Crack 10 in 30s to move on. PRESS START TO BEGIN.'],
      typeSpeed: 0
    });
  });
  var startButton = document.createElement('button');
  $(startButton).attr('id', 'start');
  $(startButton).html('START');
  $('.terminalMock').append(startButton);

};

Game.initialise = function() {

  $('#start').remove();
  $('#input').focus();
  $('.information').html('');
  console.log($('.tosolve'));
  $('.tosolve').html('');
  $('form').on('submit', function(e){
    e.preventDefault();
    $('#writer').html('');
    var $input = $('#input');
    Game.isCorrect($input.val());
    $(this).closest('form').find('input[type=text], textarea').val('');
  });
  Game.generateProblem();
  Game.timeOnLvl1();
};

Game.timeOnLvl1 = function() {
  Game.cc = 30;
  var interval = setInterval(function() {
    $('.timer').html('TIME: ' + --Game.cc);
    if(Game.points === 10) {
      console.log('fired');
      clearInterval(interval);
    }
    if (Game.cc === 0) {
      clearInterval(interval);
      Game.timeOut();
    }
  }, 1000);
};

Game.timeOnLvl2 = function() {
  Game.cc = 35;
  var interval = setInterval(function() {
    $('.timer').html('TIME: ' + --Game.cc);
    if(Game.points === 20) {
      clearInterval(interval);
    }
    if (Game.cc === 0) {
      clearInterval(interval);
      Game.timeOut();
    }
  }, 1000);
};

Game.timeOnLvl3 = function() {
  Game.cc = 35;
  var interval = setInterval(function() {
    $('.timer').html('TIME: ' + --Game.cc);
    if(Game.points === 30) {
      console.log('fired');
      clearInterval(interval);
    }
    if (Game.cc === 0) {
      clearInterval(interval);
      Game.timeOut();
    }
  }, 1000);
};

Game.timeOut = function() {
  // $('.information').html('You lose! Do you wish to play again?');
  $(function(){
    $('.information').typed({
      strings: ['You lose! Do you wish to play again?'],
      typeSpeed: 0
    });
  });
  Game.flicker();
  $('.tosolve').html('');

  var startButton = document.createElement('button');
  $(startButton).attr('id', 'start');
  $(startButton).html('START');
  $('.terminalMock').append(startButton);
  $('#start').on('click', Game.reset);
};



Game.isCorrect = function($input) {
  if($input === Game.answerString) {
    console.log('Well Played!');
    Game.points++;
    Game.clear(1);
    $('.information').html('');
  } else {
    console.log('false');
    Game.flicker();
    $('#input').focus();
  }
  $('.points').html('POINTS: ' + Game.points);
  Game.lvlUp();
};

Game.clear = function() {
  $('.tosolve').val();
  $('#input').html('');
  Game.workingString = [];
  console.log($('cleared'));
  Game.generateProblem();
};
//Check for lvl up.
Game.lvlUp = function() {
  if(Game.points < 10) {
    return true;
  } else if(Game.points === 10){
    Game.diff = 1;
    $('.Level').html('LVL: 1');
    Game.youLvldUp();
  } else if(Game.points === 20){
    Game.diff = 2;
    $('.Level').html('LVL: 2');
    Game.youLvldUp();
  } else if(Game.points === 30) {
    Game.youWon();
  }
};

Game.generateProblem = function() {
  Game.jumble();
  Game.workingString = Game.workingString.join('');
  $(function(){
    $('.information').typed({
      strings: [Game.workingString],
      typeSpeed: 1
    });
  });
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
  //While removing one element from length still evals to true...
  while (--i) {
    //Create a random number
    var j = Math.floor( Math.random() * (i + 1));
    var tempi = Game.workingString[i];
    var tempj = Game.workingString[j];
    Game.workingString[i] = tempj;
    Game.workingString[j] = tempi;
  }
  //Re-add the first and last elements.
  Game.workingString.unshift(char0);
  Game.workingString.push(charLast);
};

Game.youLvldUp = function() {
  console.log('fired');
  $('.tosolve').html('');
  if(Game.diff === 1) {
    $('.information').html('Well done. Round two coming up.');
  } else if(Game.diff === 2) {
    $('.information').html('That was good. Feeeling lucky this time? This time the whole word is rearranged.');
  }
  $('.terminalMock').append('<button id = "continue" class="button">Continue</button>');

  $('#continue').on('click', function(){
    $('#continue').remove();
    var cc = 5;
    var interval = setInterval(function() {
      $('.timer').html('TIME: ' + --cc);
      if (cc === 0) {
        clearInterval(interval);
        $('.tosolve').html('');
        if(Game.diff === 1) {
          Game.timeOnLvl2();
        } else if(Game.diff === 2) {
          Game.timeOnLvl3();
        }
      }
    }, 1000);
  });
};

Game.youWon = function() {
  $('.information').html('WEll DONE. DO YOU WISH TO PLAY AGAIN?');
  var startButton = document.createElement('button');
  $(startButton).attr('id', 'start');
  $(startButton).html('START');
  $('.display').append(startButton);
  $('#start').on('click', Game.reset);
};

Game.reset = function() {
  Game.diff = 0;
  Game.points = 0;
  Game.answerString= '';
  Game.String = [];
  location.reload();
};

Game.playCaesar = function() {
  Game.caesarCipher();
  $('.tosolve').html(Game.workingString);
  Game.timeOnLvl2();
};

Game.caesarCipher = function() {
  Game.workingString = [];
  Game.caesarString  = [];
  var key    = Game.cipher_functions.caesarKey();
  var str    = Game.pickRandomString(0);
  console.log(key);
  for(var i = 0; i < str.length; i++) {
    Game.caesarString.push(str[i]);
  }
  for(var k = 0; k < Game.caesarString.length; k++ ) {
    Game.workingString.push(Game.caesarString[k].charCodeAt(0));
  }
  for(var j = 0; j < Game.workingString.length; j++) {
    Game.workingString[j] = (Game.workingString[j] - 97 + key) % 26 + 97;
  }
  for(var l = 0; l < Game.workingString.length; l++) {
    Game.workingString[l] = String.fromCharCode(Game.workingString[l]);
  }
  Game.answerString = Game.caesarString.join('');
  console.log(Game.answerString);
};

Game.caret = function() {
  //Select the span and save as a variable.
  var textArea = $('#writer');
  //Add event listener to input.
  $('#input').on('keyup', function(e) {
    //Set the html to ''.
    textArea.html('');
    //Collect the value of the keypress.
    var ascii = $(e.target).val();
    textArea.append(ascii);
  });
};

Game.flicker = function(count, callback, current) {
  /*Shout to Arun P Johny for the meat of this one. https://stackoverflow.com/questions/19508211/creating-a-flickering-style-effect-in-jquery */
  countForFlicker++;
  if (countForFlicker > 10){
    return false;
  }
  current = current || 0;
  $('.terminalMock')[current % 2 === 0 ? 'hide' : 'show']();
  setTimeout(function(){
    if (count * 2 <= current) {
      callback();
      return;
    }
    Game.flicker(count, callback, current + 1);
  }, 20);
  setTimeout(function () {
    Game.flicker(3, function () {
      $('.terminalMock').fadeIn('fast');
    });
  }, 1000);
};
