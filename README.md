## MY TODO LIST
https://a2-jamesstaryi.glitch.me/
This is a pretty simple and straightforward website to keep track of one's todo list.
A user can input a todo item and also the corresponding due date(or leave it blank). It then adds it the the list at the bottom of the page.
The user can then check off completed actions, inline edit the todo item, view the item's urgency, or delete the todo item.

## Baseline Requriements
- A server that maintains a dataset of the todo item, due date, and whether or not it has been completed.
- Displays the results of the dataset that resides in the server's memory
- A form/entry that allows users to add or delete todo items
- Server logic that determines the urgency of the todo item
- The derived field of urgency that is based upon the due date or whether or not it is complete.
  - Item due within 7 days = Urgent
  - Past due date = Late
  - Checkbox marked as complete = Done
  - Everything else = Not Urgent

**HTML**
- Use of HTML Forms for text and date inputs
- Results at bottom of page, displaying data that is on the server
- Page validates

**CSS**
- CSS styling of the primary visual elements in the application
- Three CSS Selector functionalities
- Use of flexbox and Google's Lato font
- CSS in external stylesheet

**JavaScript**
- Get/Fetch from server

## Technical Achievements

- **Single Page App**: Single page application that allows users to add and always view the dataset.
- **Modifying**: Use of inline text editing for the todo items. Did not add editing for due dates as that would require validators for date formatting.

### Design/Evaluation Achievements

- **User 1: Sharich**
  - User didn't have much to comment about the design of the application. He thought it was clear what was allowed and not allowed on the site.
  - They thought that a Due Date of today should be flagged as Urgent, but in my mind I had it flagged as Late since I assumed that a due date of today meant it was due at around midnight the day before.
  - I would maybe add some additional text to show that urgent means within 7 days or add time to the date as well.
  
- **User 2: McCormick**
  - User enjoyed the overall color coding of the urgency.
  - A thing that surprised me is that they tested todo items that had the same names which would cause uninteded behavior in the code which I didn't initially think of.
  - Based on feedback I would order the list based off of what is most urgent and what is least urgent.
