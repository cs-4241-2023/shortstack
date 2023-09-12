## READ ME

## To do List
This project allows users to add items they have to do, along with the due date and the time due.

To successfully add an element, each field must be filled in. If a field is missing, an alert is shown that tells the user to fill in the required fields.

Once an element is successfully added, it appears below the add item button, and as many items as the user wants can be added.

For CSS positioning, I centered the items and used CSS grid on the form. The grid allowed me to place each of the 3 labels and inputs in a row, with a height of 40px each, spacing them out nicely.

I made sure to change the fonts of all elements, using 2 different Google fonts that were imported into the external stylesheet.


## Technical Achievements
**Tech Achievement 1**:

I used JavaScript to allow this app to be single page, allowing users to see the data they just inputted in and show the current state of all data they have in the to do list.

I did this by getting the values of each user input item by their IDs, and creating a new list element with all of their text.

I then appended this new list element to the current list of items if all fields had values, otherwise I gave the user an alert back instructing them to fill in the fields.
