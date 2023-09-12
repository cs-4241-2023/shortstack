Mahir Sowad\
[https://a2-mahirsowad3.glitch.me/](https://a2-mahirsowad3.glitch.me/)

## TODO List Application

This is a todo list application which allows a user to add and delete tasks. The fields that it collects for adding a task are "Task Name", "Task Description", "Task Deadline", and "Task Priority." It uses the HTML Forms element to create the form to add tasks. The CSS selectors use a variety of element, ID, and class selectors. I used CSS Flexbox to assist with positioning. I used the flex-grow property to make the main section of my page grow to fit as much space as possible while pushing my footer to the bottom even when there is not enough content to push it to the bottom on its own. I also used Flexbox to center the items on the vertical axis. I used the Roboto Condensed font from Google Fonts. All of my CSS rules have been defined in an external stylesheet.The frontend fetches and modifies data from the server by issuing GET, POST, and DELETE requests. The time when the task created is also included in the POST request to be sent to the server in the body of the POST request. The server also creates the additional derived fields of "Total Time" and "Time Remaining." Total Time is derived by taking the difference of the deadline and the created date of the task. Time remaining is calculated by taking the difference between the deadline and the day today. There is also a delete button next to each task that allows the user to delete each task in the table.

## Technical Achievements

- **Tech Achievement 1**: I created a single-page app that always shows the state of the server-side data. When the page initially loads, a fetch request is immediately made in order to retrieve and display the data that is currently stored in the server. Anytime the data in the server is modified through a POST or DELETE request, the repsonse always sends back the updated dataset after the modification has ocurred and the table in the frontend gets updated immediately.

### Design/Evaluation Achievements

- **Design Achievement 1**:
  I did a user test with one other person in class.

1. Last Name: Dyer
2. The user thought that the delete button which said "Delete" in every row was a bit redundant, so he advised that it should be replaced with an 'X' instead.
3. They did not make any comments that surprised me.
4. I would change the inner text of the delete button to have an 'X' rather 'delete'. I have already implemented this change here.
