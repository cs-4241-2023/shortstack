Samuel Karkache - Assignment 2  
===
# WPI School Work Tracker
The web application acts as a school work tracker that allows users to input assignments into the website. Each assignment has an associated class name, an assignment name, a due date, a 
difficulty (on a scale from 1 to 10) and a priority (Low, Medium, or High). The Node.js server automatically calculates the priority of the assignment based on the inputted values for 
difficulty and the due date. Users are also able to edit and delete the inputted assignments in the server. Each assignment is put into an HTML table and has its own edit and delete buttons
that users can press to use this functionality. The application uses CSS grids to position the elements on the page. The grid was specified in the body element to be ten columns by five rows.

## Technical Achievements
- **DELETE Request Assignment Delete Functionality**: The DELETE HTTP request was implemented in order to allow users to delete assignments that they add to the server. Each assignment
has a delete button that will run the DELETE HTTP request when pressed. The server will remove the assignment specified in the body of the DELETE request by searching the `appdata` array and removing
the specified assignment.

- **PUT Request Assignment Edit Functionality**: Edit functionality, via implementing the HTTP PUT request, was added to the web application as well. In order to differentiate each
assignment in the Node.js server, the assignment object is given an ID field that is specified via a unique timestamp. The JSON assignment object that is sent to the server in the
body of the PUT request maintains the same ID as the assignment object that is being edited. Because of this, the server is able to determine which assignment object to update. 

- **Single-page app that always shows the current state of the server-side data**: An HTML table is used to show the status of the Node.js server data. Each time the page loads or
data is modified by the user (adding, deleting, or editing) the data in the HTML table is updated such that the current state of the server is always displayed on the index.html
page. 

## Design/Evaluation Achievements
- **HTML Pop-Up**: The edit functionality includes an HTML pop-up that lets users edit the assignment. This pop-up is visually distinct and its text fields are filled in automatically
with the existing data. The desired edits can be made by pressing the submit button which will close the window and run the HTTP PUT request. If the user changes their mind, the cancel button
can be pressed to close the window and discard any changes.
