## Todo List
This website allows users to connect to an https server and load in data about pending tasks on their todo list. Additionally, it allows you to add and delete the server's task data. It will also generate a priority depending on how close the task's deadline is to the current day.

Fill out all input fields at the top and click the 'submit' button to add that data to the server. Clicking the 'reset' button will clear the forms. Click the trash icon to delete its corresponding row.

Glitch:

### CSS Requirements
I used a flexbox to layout my 'Add Task' form. My layout uses the row flex-direction and justifies the content in the center of the window. I also used a table to neatly organize my data, which uses a element selector. 

I used id selectors with my addItemContainer and task-table, and class selectors for my addTask and addItem classes. This website is styled with the use of an external css sheet, which includes information regarding my custom font and color palette.

## Technical Achievements
- **Tech Achievement 1**: Created a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. 
- **Tech Achievement 2**: Using the fetch request api, I enabled adding data on the server.
- **Tech Achievement 3**: Using the fetch request api, I enabled deleting data on the server.
- **Tech Achievement 5**: Used specialized input types to collect dates.
- **Tech Achievement 5**: Implemented a reset button that will clear the form.
- **Tech Achievement 6**: Implemented a sorting feature in the server that sorts appdata's contents by deadline (descending) whenever a new element is added.
- **Tech Achievement 6**: Using window.onload I was able to automatically load the server data whenever the user opens or refreshes the page.

### Design/Evaluation Achievements
- **Design Achievement 1**: Used a table to neatly organize task data.
- **Design Achievement 2**: Used a flexbox to layout my 'Add Task' form. My layout uses the row flex-direction and justifies the content in the center of the window.
- **Design Achievement 3**: Created and used a color palette from color.adobe.com.
- **Design Achievement 4**: I used Lato as the font from GoogleFonts for the primary copy text in my site. I specified that Arial, Helvetica, and sans-serif as backup fonts.
- **Design Achievement 5**: I used a Font Awesome script to import the trash icon that is used when users delete data.
