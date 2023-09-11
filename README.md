Brendan Mannion
http://a2-bman4.glitch.me

This project shows:

## Cars
The project is a basic page form for inputting and modifyingcar data. It uses a flex grid to organize parts of the page. The user can modify and delete any car data they enter.

## Technical Achievements
- **Single Page App Always Showing Server-Data**: This one page form starts out empty but everytime data is entered it will always appear as a new row on the table on the screen. From there each row on the screen can also be 
modified or deleted with the use of POST, PUT, and DELETE calls to the backend service to maintain integrity.
- **Modify Data**: modify data works by the user entering in the new values they want for a certain row. After clicking save, this sends a PUT request to backend and the backend will respond with JSON file with the new data,
including the derived field 'Rating' which is calculated after possible changes occurr. This new data is then populated to the table.
- **Delete Data**: delete data works by a user selecting a row they want to delete which will first remove the row element in HMTL. A DELETE call is also sent to the backend, the backend will receive this call and look at the unique
ID of the row that is being deleted and remove that from its server memory. 

