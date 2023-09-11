
## WPI Badminton Club Grade Tracker
a2-sarahaolson.glitch.me

I created a web app for Badminton Club members who are using their participation in this course as a gym credit to track their progress toward their grade goal.  The user enters their target grade and the dates + amount of hours they attended on each day to keep track of the user's progress toward their grading goal. 

The user can also edit their grading goal and delete entries they make. 

I used flexbox to accomplish the side by side look of the grades and the logged hours of attendance. I also used element selectors, id selectors, and class selectors to help with styling the page (adding background colors and borders specific to certain classes, elements, or ids).

## Technical Achievements
- **Tech Achievement 1**: 
    This single-page app provides a form for users to submit data that is always displayed (as seen with the current grade goal and list of past badminton atendance). Even when the grade goal is changed, all of the data that relies on that is 
    updated and shown to the user. The user is always seeing the most up to date data, no matter how it is edited.
- **Tech Achievement 2**: 
    There is the ability to edit the grade goal after previously establishing one, even if there is data in the table. Upon setting the new grading goal the table automatically updates the time reamining to reflect the new goal (whether the new threshold is higher or lower)

### Design/Evaluation Achievements
- **Design Achievement 1**: 
    I preformed 2 user tests.

    Last name: Pianka

    Problems:
    - Nothing major, just having the table not update automatically when changing the grade was confusing 

    Comments:
    - Easy to navigate, clean design
    - Having the posibility of dates being our of order does not matter too much 
        - What is more important is that the time remaining is in order and easy to see
    
    Changes:
    - (IMPLEMENTED!) have the table automatically update when changing the grade, not only after entering new data after the grade change was made


    Last name: McInerney

    Problems:
    - validation bug for entering the grade (would check for validation of edited grades but not for first time entries)

    Comments:
    - easy navigaion, intuitive
    - outside of validation fail was essentially flawless
    - easy to use with little instruction

    Changes:
    - (IMPLEMENTED!) validation fail of first time grade entires


