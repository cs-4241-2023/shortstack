Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 11th, by 11:59 AM.

Glitch Site: https://classy-veiled-legend.glitch.me

Notes: 
I made a simple game where two people enter in a number to try and guess what number
the computer is "thinking" of.

In my project the server recives a number from each player of the game, 0-10, 
and a random number, 0-10, that is generated in main.js. 
The server takes this data and evaluates if a player guessed the same number that was 
randomly generated. It returns true or false, depending on if a player won, back to the front end.
It also sends all the orginal front end data back to it.

I used the felbox formatting to make a table like structure. I tried to make custom cells for some 
of the categories to help make things look better. The result didn't look as nice as I hoped but 
the flexbox structure is there. 

Feedback: 

Andrew Sosa:
What problems did the user have with your design?
    The formatting of the data within the flexbox table is very uneven and not appealing to the eye
What comments did they make that surprised you?
    Liked that the pervious attempts showed up along witht the newest ones. I would have liked to add a 
    reset button to delte all data stored for the session
What would you change about the interface based on their feedback?
    I would change the flexbox design layout. 

James Yi: 

There may be a bug or I am not understanding something. Player 1 guessed 5 and player 2 guessed 10. It says the Computer guessed 5 but Player 1 didn't win? 

Every run of the game duplicates the past game and adds it to the page. This could get troublesome fast, possibly only add the most recent game to the list instead of adding all previous ones over and over again.

Overall I think its pretty solid, may need some minor bug fixes and some css that differentiates between player 1 and 2.

