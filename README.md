Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Matthew McAlarney

Glitch Project: https://a2-maccode7110.glitch.me/ 

## Music Listening Tracker
 - Uses flexbox positioning for primary visual elements of the application.
 - Web-safe fonts for all text are coded in main.css.
 - The derived field in this application is the age of an album, which is calculated by subtracting the release year of the album from the current year (2023).

 - Music Listening Tracker is a web application that allows a user to keep a list of any music they have listened to recently or throughout their life. This application gives a user the abilities to submit new music to be added to server memory and subsequently the list, and submit existing music (music that is already shown in the list) to be deleted from server memory and the list.

 - How to use Music Listening Tracker:

    View Music Listening List Page
    - The View Music Listening List page can be accessed through the top navigation bar on the application. The View Music Listening List page has a button labeled "Get Music". Press the Get Music button to display the full list of music currently saved in server memory. It is highly recommended to check the View Music Listening List page before submitting music for addition to the list or deletion from the list.

    Submit New Music form
    - Use the Submit New Music form on the home page to enter a band name, the name of one of their albums, and the year the album was released. The Submit New Music form is used to add new music to the list. 
        - When the submitted music saves in server memory, a message will appear below the Submit New Music form indicating that the submitted music has indeed been saved in server memory. The age of the album (derived field) will also appear in an additional message.
        - If the submitted music contains at least one field consisting of only white space (an empty field), a message will appear below the form informing the user that the submitted music could not be sent to the server and that at least one field is missing information.
        - If the submitted music contains at least one field consisting of the default input tag value (ex. "band name here"), a message will appear below the form informing the user that the submitted music could not be sent to the server and that at least one field is missing information.
        - If the submitted music contains an invalid album release year (a negative number), a message will appear below the form telling the user that the submitted music could not be sent to the server and that the album release year is invalid.
        - If the submitted music contains an album release year that has not occurred yet (ex. a year in the future such as 2024 or 2025), a message will appear below the form telling the user that the submitted music could not be sent to the server since the input album has not been released yet.

    Delete Existing Music form
    - Use the Delete Existing Music form on the home page to enter a band name, the name of one of their albums, and the year the album was released. The Delete Existing Music form is used to delete music already shown in the list.
        - When the submitted music has been sent to the server, a message will appear below the Delete Existing Music form indicating that the submitted music has indeed been sent to the server for comparison against existing music (this comparison attempts to find a match between the submission and a data entry in server memory. If there is a match, then the data entry is deleted from server memory and is no longer shown in the full list of music). A user should then go to the View Music Listening List page to see if the submitted music has been deleted. Keep in mind, if the submitted music was not shown in the full list of music accessed through the View Music Listening List page before completing the submission, then the submitted music could not have been deleted.
        - If the submitted music contains at least one field consisting of only white space (an empty field), a message will appear below the form informing the user that the submitted music could not be sent to the server and that at least one field is missing information.
        - If the submitted music contains at least one field consisting of the default input tag value (ex. "band name here"), a message will appear below the form informing the user that the submitted music could not be sent to the server and that at least one field is missing information.
        - If the submitted music contains an invalid album release year (a negative number), a message will appear below the form telling the user that the submitted music could not be sent to the server and that the album release year is invalid.
        - If the submitted music contains an album release year that has not occurred yet (ex. a year in the future such as 2024 or 2025), a message will appear below the form telling the user that the submitted music could not be sent to the server since the input album has not been released yet.

    Please note! Both the Submit New Music and Delete Existing Music forms are case-sensitive and are also senstive to the amount of entered whitespace. When deleting music from the full list, be sure to enter the existing music with the correct casing and whitespace amount!

## Technical Achievements
- No technical achievements addressed in this assignment.

### Design/Evaluation Achievements
- **Testing the user interface with other students**: 
    - I tested my user interface with two other students: _ and _
    - I assigned and stated the following task for both students to complete individually on Music Listening Tracker:
        - 1. Submit new music; submit new music for album Hybrid Theory by band Linkin Park released in year 2000.
        - 2. View the full list of music saved in server memory. Make sure that album Hybrid Theory by band Linkin Park released in year 2000 is included in the list.
        - 3. Delete existing music; submit a deletion for album Hybrid Theory by band Linkin Park released in year 2000.
        - 4. View the full list of music saved in server memory. Make sure that album Hybrid Theory by band Linkin Park released in year 2000 is no longer included in the list.

    - Study 1 with _
        1. What problems did the user have with your design?
        2. What comments did they make that surprised you?
        3. What would you change about the interface based on their feedback?
    - Study 2 with _
        1. What problems did the user have with your design?
        2. What comments did they make that surprised you?
        3. What would you change about the interface based on their feedback?