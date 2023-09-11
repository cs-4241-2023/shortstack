Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Brandon Vuong: https://a2-bdvuong.glitch.me/
## What to Do?
My project is a very basic notetaking/task app. By using flexbox, I was able to achieve the centered design that I wanted to use. By default, you will only need a title. Date, due date, priority, and the description are all optional fields. The due date field is a derived field taking the current date and priority, then adding a constant to the set date to create the field. To delete a note, select the note you want to delete, then click the delete note button. When you want to add a note, click the add a new note button on the sidebar. Whenever an adjustment is made to your note, click the save note button and the note will be saved. 

## Technical Achievements
- **Tech Achievement 1**: I was able to create a single-page app, with a table displaying all the data within the app below the main page.

- **Tech Achievement 2**: In addition, I implemented the ability to delete and edit data on the server. Using the nanoid node package, I was able to use UUID's to uniquely define each and every note, so you can theoretically have a unique note with the same title, date, due date, priority, and description.

### Design/Evaluation Achievements
- **Design Achievement 1**: A big design achievement I believe I created was messing with the overflow of the sidepane. When you have enough notes, the entire page does not expand, instead it creates a scrollbar with all the notes.
