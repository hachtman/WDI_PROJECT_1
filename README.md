#WDI_PROJECT_1
Cipher me that.

Scenario.
You are a White hat working for your govt. protecting a nuclear power plant or similar.

You are at your terminal about to log off when you receive a message from one 'L337 H4X0R'.

The message informs you that your system has been compromised, and invites you to play a game... 4 TEH LULZ.

Main Mechanic.

A series of predetermined strings (maybe randomly chosen from a dictions/library of common/amusing phrases) are simply enciphered and presented to the player. The object of the game is to guess the meaning of the string and type the completed phrase into your terminal(in browser).

The strings will be pulled from a list of the top 200 most commonly used passwords, which will be grouped in difficulty.

Example ciphers:

Full Caesar shift, 1 char along.
A bad day.
--> B cbe ebz.

Jumble middle letters.
--> srieoulsy weeavhtr ayntnhig.



Extra mechanics.
The goal is to prevent a disaster, so the obvious extra mechanic would be to set it against a timer. Quick fire rounds to win extra time.

Throughout the game, the L337 will message you asking stupid q's about what your favourite Linux distro is and telling you how they are actually Guy Fawkes.

Endless potential for animation.


Basic Pseudo Code for v1.0.

Display intro scene, working away normally. Prompt user to type 'log off' and then..

Interrupt with hacky message (write text dynamically on screen?)

Explain instructions, challenge user to solve codes to avoid meltdown.

Present user with the first code, simple jumbles of internal letters. Input field styled to look like terminal.

Allow user to make guesses, display sarcastic messages on failure.

When they guess correctly, present user with a more complex problem. When they solve congratulate and display congratulations.

//end.

Generic screen object, with fields that can be rewritten dynamically with new problems.
