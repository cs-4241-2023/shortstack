Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
Mirandi McCormick
mlmccormick
cabbag3

## Creature Creator
on this webpage, you can name your creature, give it an age, and select the kind of creature it is from a dropdown.

You will then recieve back your creatures information, as well as an age status:
- For my derived field, I used the "creature type" and "creature age" to determine if the creature is: young, middle aged, or very old based on the avg and max lifespan of the creature.

I used a Grid for my CSS layout, the form is in the right column, and the output/stored creatures are in the left column

I used one HTML form with multiple fields to fill out
- one is a text input, min length 1 char, max length 30 chars
- one is a dropdown selector with 8 options
- one is a number input that cannot be < 0

I used all 3 CSS selectors
- element selectors: used this for ul, ul li, ul li span, and body
- id selectors: submitButton, formTitle
- class selectors: evenFormRow, oddFormRow

## Technical Achievements
- **Tech Achievement 1**: Made a single page app, has the form and the data returned on the same page

### Design/Evaluation Achievements
- **Design Achievement 1**:
- Yi: had a little confusion on if the first field of name meant creature type, could make it so you select the creature type first. Could also specifiy that age is in full years, no months or decimals. Nothing really surprised me from the feedback, but i could definitly make the change of making sure it says creature ages (years)
- Blanchard: mentioned the photos took a bit long to load (30 seconds) that kind of surprised me since on my end it was pretty instant when I tested. Noticed the font of the submission button is different. I would change that and may do so before submitting.
