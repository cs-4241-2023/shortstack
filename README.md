
# Fitness Tracker

The Fitness Tracker is a web application that fulfills the baseline requirements of the CS4241 Assignment 2, "Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js." This section provides a more in-depth explanation of how each requirement was fulfilled using HTML, CSS, JavaScript, and Node.js.

## Baseline Requirements

### Server Functionality

**Node.js Server:**

- The application uses Node.js to create an HTTP server that serves files and handles client requests.

**Tabular Dataset:**

- A tabular dataset representing training sessions is created on the server. Each session is an object with fields such as date, type, distance, time, and heart rate.

**Results Functionality:**

- A Results functionality is implemented on the server to provide a list of all training sessions. When the client requests this data, the server responds with the entire dataset.

**Form/Entry Functionality:**

- Users can add new training sessions through a form on the client side. The data from the form is sent to the server and added to the dataset.
- Users can delete training sessions by clicking a "Delete" button on the client side. The server processes the deletion request and updates the dataset.

**Derived Field Calculation:**

- The server logic includes a function that calculates a derived field, "average speed," for each training session based on the distance and time fields. This calculation is performed on the server for each new or modified entry before integrating it with the dataset.

### HTML

**HTML Forms:**

- The application uses HTML forms to gather user input. The form elements include text inputs, number inputs, and date inputs.
- Users can input data such as date, training type, distance, time, and heart rate via these forms.

**Results Page:**

- A results page is implemented using HTML to display the training sessions in a table format. The `<table>` element is used to structure the data.

**Validation:**

- All HTML pages, including the form pages and results page, validate correctly to ensure data integrity.

**Multiple Pages:**

- Although the application primarily operates as a single-page app, multiple HTML pages are accessible from the homepage, allowing users to navigate between different sections.

### CSS

**Styling Primary Elements:**

- CSS is applied to style the primary visual elements of the application, including headers, forms, tables, and buttons.

**CSS Selectors:**

- Various CSS selectors are demonstrated, including element selectors (e.g., `table`, `button`), ID selectors (e.g., `#submit-button`), and class selectors (e.g., `.edit-button`, `.delete-button`).

**Layout with Flexbox:**

- CSS flexbox is used for layout. The `display: flex` property is applied to organize elements in a columnar fashion for the results section.

**Font Styling:**

- Fonts are defined for all text elements to ensure consistent and visually appealing typography. Default fonts are avoided, and web-safe fonts or fonts from external services like Google Fonts are used.

**External Stylesheets:**

- CSS styles are organized and maintained in external stylesheets to keep the codebase maintainable and readable.

### JavaScript

**Front-end JavaScript:**

- JavaScript is used to fetch data from the server and update the user interface dynamically without requiring a page reload.

**Data Manipulation:**

- JavaScript functions handle adding, editing, and deleting training session data on the client side, and these actions trigger corresponding requests to the server.

### Node.js

**HTTP Server:**

- Node.js is used to create an HTTP server that listens for incoming client requests. It serves static files and handles data requests from the client.

**Data Integration:**

- The server integrates new and modified training session data into the dataset, applying the derived field calculation (average speed) before updating the dataset.

## Technical Achievements

### Single-Page App

- The Fitness Tracker is implemented as a single-page app. It offers a seamless user experience by providing a form for users to submit data while simultaneously displaying the current state of server-side data. When the user submits data, the server responds by sending back the updated data, including the derived average speed. The client then updates its data display without requiring a full page reload.

## Design/Evaluation Achievements

### User Interface Testing

- User interface testing was conducted with other students in the class. Users were assigned specific tasks to complete, and the think-aloud protocol was used to obtain feedback on the design and usability of the application.
- The evaluation process involved defining tasks, ensuring that users could complete them without verbal instructions, and addressing issues users encountered.
- Feedback from users was collected, and potential interface changes were identified based on their comments and difficulties. Here is that feedback:
	
  **Marek Garbaczonek:**
	
	1. **Prefilling Date:** Consider pre-filling the date field with  current date to make it more convenient for users.
	    
	2. **Layout and Design:**
	    
	    - Ensure that the date field doesn't flow into a new line.
	    - Make the Edit and Delete buttons the same size and add space between them for better consistency.
	    - Replace the "Add Session" button with the "Save" functionality when editing.
	3. **Layout Condensation:** Consider optimizing the layout so that scrolling isn't required on desktop interfaces. This can improve the overall user experience.
	    
	
	**David Gobran:**
	
	1. **User-Friendly Interface:** Users found the interface to be intuitive, with session adding, editing, and deletion coming naturally to them.
	    
	2. **Decimal Input:** Clarify whether the distance input should accept decimal values or only whole numbers to prevent any confusion.
	    
	3. **Template Session:** Users didn't look at the template session beforehand, indicating that it may not be prominently noticed. Consider making it more visible or providing a tooltip/explanation.
