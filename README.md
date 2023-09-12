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
    - Last name: 
    - Problems: 
    - Comments that surprised me:
    - What I would change:
