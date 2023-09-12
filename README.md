Expense Tracker
This project allows you to track expenses by name, amount, and the date each expense is due. Remaining days is calculated by the server. They can be added using the form at the top, or removed using the each expense's corresponding remove button. I utilized a flex box in order to space/align the different inputs for the form, and styled many of the individual elements of the table (th, tr, ts, td, thead, tbody).

Technical Achievements
Tech Achievement 1: Current State: Using a combination of POST and GET requests, I was able to create a single-page app that both provides a form for user to submit data and always show the current state of the server-side data. Whenever the create button is pressed, a new POST request is created containing all of the information for the new expense, which then gets added to the appdata, which then triggers a function called updateExpenses(). This function creates an new GET request that obtains all of the expenses from the server, ensuring the table is always updated. Delete is similar but it POST's an index for the server to remove, and then updateExpenses is called afterwards.
Tech Achievement 2: Editing: Incomplete, table fields are editable but do not effect the server data.
Design/Evaluation Achievements
Design Achievement 1: Testing with Aarsh Zadaphiya:
Last name: Zadaphiya.
Problems with design: On full screen, the form inputs do not stretch to fill the empty space.
Comments: Nice use of dark colors rather than light. Pleasant to look at.
Changes?: Fill negative space, css on buttons.
