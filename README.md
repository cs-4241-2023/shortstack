Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  

Aarsh Zadaphiya https://a2-aarshzadaphiya.glitch.me/

## Web Application Title: To DO List Generator
I have developed a dynamic To-Do List Generator using HTML, CSS, and JavaScript. The application utilizes CSS Flexbox positioning for responsive design. To use this application, simply input your task details in the provided form and click "Generate To-Do List." Your tasks will be displayed in a table, and you can delete items as needed by clicking the adjacent delete buttons. The app also calculates and displays the remaining days until each task's due date, offering valuable task management assistance. 

## Technical Achievements
**Tech Achievement 1**: This single-page web application, named "TO Do List Generator," allows users to manage their tasks efficiently. The app provides a user-friendly form where users can submit task details, including the task name, due date, and task priority. Upon submission, the server processes the data, calculates the remaining days until the task's due date, and updates the task list. The app always displays the current state of the server-side data, ensuring real-time synchronization between the client and server. Task Submission: Users can submit new tasks with details such as task name, due date, and priority.
Real-time Updates: When a user submits a task, the server responds with updated task data, including the calculated remaining days until the due date. The client then updates the task list without the need for page reload.
Task Deletion: Users can delete tasks individually, and the app will automatically remove the task from the list, ensuring data consistency.

Technologies Used:
Front-end: HTML, CSS, JavaScript
Back-end: Node.js
Server: HTTP Server
Data Storage: In-memory array (appdata)

## Design/Evaluation Achievements
**Design Achievement 1**:

Testing with Nicholas Borrello:
Last name: Borrello
Problems with design: No option to dynamically sort the items in the table based on priority.
Comments: Derived field "Remaining days" is usefull for the user to know how many days they have left to comple the tak
Changes suggested: Adding the Sort feature.

Testing with Matthew McAlarney:
Last name: McAlarney
Problems with design: The header needs to be at the top so there is no gat at the top, and the table needs to be lowered so that there is a gab between the generate button and the table. 
Comments: User friendly design for an average ueser. Delete buttons next to the items to easyly identify the items to delete.
Changes suggested: Fixing the header and the spacing between the button and the table.

