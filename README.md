Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## a2-andrewhariyanto
## https://a2-andrewhariyanto.glitch.me/
This website is a tracker for calculating the accrued amount for a deposit after certain number of time with simple interest. The derived field is the accrued amount and is calculated in the server. This app is a single-page app and users can modify, submit, and delete data on this one page. I used 2 forms (one for modify and one for submit). For CSS positioning, I used a grid for the submit area and the data display area uses flex. I also used a font called Rubik from Google Fonts. All HTML files have been validated.

## Technical Achievements
- **Sinle-Page App**: Made a single-page app where users can submit, modify, and delete data for a deposit and interest tracker. The interface then updates the data accordingly both client-sde and server-side for users when they hit the buttons.
- **Modify Data**: Added the ability to modify data. The way I implemented this is by creating a separate <tbody></tbody> for the modify display that I hid whenever the main data display was shown. Whenever new data is added/deleted, the modify display also changes in addition to the data display to keep everything updated.

### Design/Evaluation Achievements
- **Design Achievement 1**: User test with Wong, Nathan

1. Provide the last name of each student you conduct the evaluation with. -> Wong
2. What problems did the user have with your design?

The user did not find any errors or app-breaking problems when doing the task. However, the user expressed that the UI needed more styling and colors. The user also found that interest rate only accepted whole numbers.

3. What comments did they make that surprised you?

The user said that the modify and delete functionality was intuitive. This was surprising because I thought that the way I implemented modify and delete might require more button clicks.

4. What would you change about the interface based on their feedback?

I would change and have already changed the styling to make it more colorful and added higher precision for interest rate
