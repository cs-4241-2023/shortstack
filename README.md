## a2-tRaymodn
My project is a web application that serves as a database for one's favorite music artists. Using the provided HTML form, the user
can input the name, genre, and their rating of that artist into the database. The artists entered will then be given a leadership ranking and sort the artist based on that on the web page, showing the user what their favorite music artists are. A user can also enter the name and genre of an existing artist and input a new rating value to edit the entry in the database. A "delete" form is included, so that users can input the name of the artist they would like to delete and remove that artist from the database.
All of my CSS was done using relative positioning, and I used flexboxes to arrange the elements in the <main> tag

Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.

## Technical Achievements
- **Create a Single-Page Application**: When the client sends data to the server such as an artist that needs to be removed from the database, or one that needs to be added to it using the HTML forms, that same page is updated when it receives the response from the server, in the form of the complete list of data to display from the database. This makes it such that the page can respond immedietly when the response from the server is received and edit the appropriate HTML elements.

- **Be Able to Modify Existing Data in the Database**: My application implements this functionality in that if the name and genre of an artist that already exists in the database is entered into the submit form with an updated rating, the value on the server, and displayed on the screen will be updated with the new value

### Design/Evaluation Achievements
- **Application Test 1**: 
Last Name: Catania 
Problems with Design: A bit unclear regarding how to modify data - as when asked to complete that task, they looked around the page for a "modify" form due to the fact that there were forms for submitting and deleting data from the server. They did not read the text at the top of the webpage telling the user how to modify data.
Surprising Comments: They told me that my "submit" form looked almost like a popup window, maybe due to it's color, or it's contrast with the rest of the page. They also said that I should make my title a larger font size.
What I Would Change: I would take the instructions on how to modify the data out of the text at the beginning of the page, and perhaps add a note inside the form telling the user how to modify data, maybe with the word "modify" with bold text or otherwise pointed out to the user in some way. I would also make my title font bigger.
