## Web Application Title: Expense Tracker

### Live Demo

Check out the live demo of the project hosted on Glitch: [Expense Tracker on Glitch](https://thunder-awesome-catshark.glitch.me)

### Project Description

Expense Tracker is a comprehensive web application designed to simplify the task of managing daily expenses. Utilizing Material Design, the application offers a rich, user-friendly interface. Key features include:

- **Expense Management**: Enables users to add new expenses by entering essential details such as item name, cost, and date.
- **Expense Deletion**: Allows users to selectively remove specific expenses from their list.
- **Expense Editing**: Gives users the ability to edit existing expenses directly from the list.
- **Monthly Summaries**: Automatically compiles and displays summaries for each month to provide a quick snapshot of spending habits.
- **Realistic Simulation**: Pre-populates with randomly generated expense data to simulate a real-world experience.

### Technical Achievements

- **Single-Page App**: Designed as a single-page application to dynamically update the UI, offering a fluid user experience.
- **Expense Deletion**:
  - **Initial Approach**: Initially, the application used index-based deletion to remove expenses from the list. Users could simply click a "Delete" button next to an expense, and it would be removed based on its position in the array.
  - **Challenge**: This approach became problematic when monthly summaries were introduced. These summaries changed the indices of the expenses, causing the wrong items to be deleted.
  - **Solution**: To overcome this, the system was restructured to use unique IDs for each expense. This made it possible to accurately identify and delete expenses regardless of their position or any additional elements like monthly summaries.
- **Expense Editing**:
  - **Initial Approach**: Introduced an "Edit" button next to each expense, allowing the row to become editable.
  - **Challenge 1**: The primary challenge was making the input fields show up directly within the row in HTML, replacing the existing text content.
  - **Challenge 2**: Needed to ensure that changes are not only reflected in the UI but also updated on the server.
  - **Solution**: Utilized JavaScript to replace the text content with input fields when the "Edit" button is clicked. Asynchronous JavaScript is used to update the expense on the server via a `PUT` request when the "Save" button is clicked.
- **Server-Side Handling**:
  - **Complexity**: The server had to manage multiple types of files and data, including JavaScript, CSS, HTML, and the actual expense data.
  - **Challenge with GET Requests**: One of the most challenging aspects was handling GET requests properly. When a GET request was made to fetch data, the server had to ensure it sent back the correct information without interfering with the other types of files it was handling.
  - **Balancing Act**: Managing this while keeping the codebase clean and maintainable was a complex task. The server needed to be structured in a way that could easily differentiate between requests for static files like CSS and JS, and dynamic data queries.

### Design Choices

- **Material Design**:
  - **UI Principles**: The application leverages Material Design, a design language developed by Google, to provide a seamless and visually appealing user interface.
  - **Consistency and Responsiveness**: Material Design principles ensure that the application has a consistent look and feel across different screen sizes and platforms.
  - **User Experience**: By adhering to Material Design guidelines, the application aims to offer intuitive navigation and a highly functional layout, making it easy for users to manage their expenses effectively.

### Design/Evaluation Achievements

- **User Testing with Fred**:

  1. Problems: Identified an issue with the fetch function where the page failed to refresh.
  2. Surprising Comments: None.
  3. Changes: Resolved by correctly linking the event to the button.

- **User Testing with Cameron**:

  1. Suggestions: Cameron expressed a desire for the ability to add expenses with past dates.
  2. Changes: While this feature has not yet been implemented, it's considered a valuable addition for future releases.

- **User Testing with Casey**:
  1. Suggestions: Casey wanted the ability to edit multiple expenses at the same time, instead of one by one.
  2. Changes: This feature has not been added yet but is under consideration for future releases to improve bulk editing of expenses.
