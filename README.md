Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
Jade Logan

https://a2-jdlogan0.glitch.me/

## High Score Tracker
The project is for keeping track of high scores in different games. The user can enter the name of the game, their current high score, the maximum possible score for the game, and initials (similar to the initials/name input for an arcade high score board). The max score is not required, but is taken into account for calculating a score goal, which is the derived field. If a max score is provided, the goal is 5% of the difference between the current high score and tha max score. If it isn't provided, the goal is just based off of a percentage of the high score.

A flexbox was used for the form, and a grid was used for displaying the results.

## Technical Achievements
- **Created a single-page app**
    - When the user submits data, it is automatically added to the table underneath the form (including the derived field)
    - createElement was used to make new rows to display all of the data stored in the server
- **Modify existing data**
    - Existing data can be modified using the "EDIT" button at the end of its row
    - A pop up appears with the same format as the original form for the data to be changed
    - PUT method used
    - Display table updated after the server responds
- I found both technical achievements difficult because I am not very familiar with working with servers, so it took awhile for me just to figure out how data in the server's memory could be accessed/changed

### Design/Evaluation Achievements
- **First user test**
    - Last name: Caplan
    - Problems: Didn't have any issues navigating, no comments about issues
    - Comments that surprised me: I'm glad the UI was intuitive and she liked the way it looked, no comments about the goal stuff being confusing which I'd been expecting so that was good
    - What I would change: Nothing major based on feedback. One thing I'd want to do is make sure that it still looks fine on more varied screen sizes and different browsers
- **Second user test**
    - Last name: McCormick
    - Problems: Did not have any problems with the interface
    - Comments that surprised me: A comment about liking the pop up screen for editing, since I wasn't sure if that'd make the screen feel to busy or seem too redundant since it's almost exactly the same as the original form
    - What I would change: Nothing major based on the comments. If anything I'd see if there are other effects I could add to really lean into the old arcade machine look
- I also got some feedback from someone outside the class before testing it with classmates, and the main issue that came up was wanting to know how the goal was calculated - I considered changing the goal help text to include more info about calculations, but it that version was kind of convoluted so I'm still not sure what the best solution would be
