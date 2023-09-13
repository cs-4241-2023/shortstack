NOTICE: Professor Roberts gave me an extension of 12 hours for this assignment. This has been submitted on time. 

---
## Character Creator
My Project is a character creator that takes in a character's name and stats, and displays them on a table alongside their stat average and the recommended class for them based on their stats. There are a total of 7 classes that can be recommended. The CSS positioning technique I used was the grid, in order to format my table to display for the full length. In order to use my application, enter a character's name and their attack, defense, and speed. To delete a character, press on them in the table and click on delete at the bottom. To modify a character, enter the name of an existing character and their new stats. 

I implemented every single requirement successfully, including the following:

HTML:
- One or more [HTML Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms), with any combination of form tags appropriate for the user input portion of the application
- A results page displaying all data currently available on the server. You will most likely use a `<table>` tag for this, but `<ul>` or `<ol>` could also work and might be simpler to work with. Alternatively, you can create a single-page app (see Technical Acheivements) but this is not a requirement.
- All pages should [validate](https://validator.w3.org)
- If your app contains multple pages, they should all be accessible from the homepage (index.html)

CSS:
- CSS styling of the primary visual elements in the application
- Various CSS Selector functionality must be demonstrated:
    - Element selectors
    - ID selectors
    - Class selectors
- CSS positioning and styling of the primary visual elements in the application:
    - Use of either a CSS grid or flexbox for layout
    - Rules defining fonts for all text used; no default fonts! Be sure to use a web safe font or a font from a web service like [Google Fonts](http://fonts.google.com/)

- CSS defined in a maintainable, readable form, in external stylesheets 

JavaScript:
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server; a sample is provided in this repository.

Node.js:
- An HTTP Server that delivers all necessary files and data for the application, and also creates the required `Derived Fields` in your data. 
A starting point is provided in this repository.


## Technical Achievements
- **Tech Achievement 1**: My program, Character Creator, allows the user to add a new character with stats and a name and displays the results on the same page using the server side data. It creates and updates the table on the fly from the server data and displays it using a grid layout. It takes 4 fields, and calculates two extra fields using three of the four fields provided. These two calculated fields are the average and the recommended class and return alongside the original data. 
- **Tech Achievement 2**: My program is able to modify data by finding the specified character in the server side data and deleting + replacing their data in the table. It uses the name as the key element and if the same name is used, it will modify the previous data. 
### Design/Evaluation Achievements
- **Design Achievement 1**: 

1. Wonoski
Problems: The table is not visble from the get go, leading to previously entered data popping up.
Surprising feedback: The site is very readable and user friendly. I had thought the colors may be a bit jarring, but it seems they were not. 
Changes I would implement: The table not being visible was a choice, but I would make it visible to be more user friendly. 

2. Donnelly
Problems: There are no specified ranges for stats, leading to the ability to enter negative stats or very high numbers.
Surprising feedback: I did not actually think high stat values would be a problem, with the large range of video games out there.
Changes I would implement: I would likely include a little banner specifying to enter a positive number from 1-100 or something similar. 