A2-KSMANGONE
---

## Run Training Index

This is a website made to index runs for a training program you follow. Simple tracking website. CSS Grid was used to create the 3 input boxes (and titles) to appear in a 3 across position instead of 3 top down in one column.
To use the application simply input a Distance traveled in miles, Time taken in minutes (use decimals to indicate seconds -- secs/60) and an optional description of the run, if it was a workout or not this may be important or part of a 
multi part run. Finally, an output will appear on the table with the information inputted, as well as a calculated average pace of the run. Finally, there are 2 buttons in which the user can edit or delete a row. Clicking the edit button
will return 3 prompts in which you can adjust either of the 3 original inputs. The delete button (on first attempt takes 2 clicks) instantly deletes the run from the table.

## Technical Achievements
- (5 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

When receiving a request, the server will modify the data on it's end (appdata array) if the request is a put, post, or delete. Then, the server will return the appdata array back to the client for the information to be parsed (using parseReturnData function) and the table is updated on the user interface end with the proper data that is currently stored in the server.

- (5 points) In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data.

The edit button (next to the delete button) is available on each row under the column (Edit/Delete) in which once pressed a prompt appears for the 3 inputs, the current value is displayed. Once edited, the information is sent to the server to replace the current indexed run with the new information, a new pace is calculated, and the table is updated without moving the index of the edited run.

