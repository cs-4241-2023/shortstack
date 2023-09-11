# CS 4241 a2-alocnayr

# Ryan Kornitsky

<br>

## **Glitch link:** https://a2-alocnayr.glitch.me/

<br>

## Expense Tracker Web Application

I created an expense tracking website that serves as a budget management tool. It allows users to manage their expenses, view their current budget, add new expenses, delete existing expenses, and update expense details. The application demonstrates several key concepts, including HTML forms, data display, CSS styling, and server-side data management.

### Features

1. **Server-Side Data Management**
   - The server maintains a dataset of expenses, each with three fields: name, amount, and category. This dataset resides in the server's memory and is used for expense management.

2. **Results Functionality**
   - The application displays the entire dataset of expenses in a user-friendly tabular format. This results functionality ensures that users can easily view all their expenses.

3. **Form/Entry Functionality**
   - Users can interact with the application through HTML forms. The following form functionalities are available:
     - Add New Expense: Users can add new expenses by providing a name, amount, and category. Duplicate expense names are not allowed.
     - Delete Expense: Users can delete existing expenses by clicking on the "Delete" button next to each expense.
     - Update Expense: Users can update existing expenses by clicking on the "Edit" button, making changes, and clicking the "Update Changes" button.

4. **Server Logic with Derived Field**
   - Upon receiving new or modified incoming data, the server incorporates a derived field, which is the remaining budget, into the dataset. The remaining budget is calculated based on existing items in your expenses and your total budget. It is updated whenever a new expense is added, deleted, or an expense amount changes.

### HTML:

- **HTML Forms:** I have included HTML forms for user input. I have two main forms in my application: one for adding new expenses and one for updating existing expenses. These forms allow users to input data such as expense name, amount, and category.

- **Results Page:** I have implemented a results page that displays all the data currently available on the server. I've used an unordered list (`<ul>`) to display the list of expenses in a user-friendly format. Each expense item is represented as a list item (`<li>`).

- **Validation:** While my HTML forms are present, the specific validation of form inputs (e.g., checking for empty fields) is done using JavaScript rather than pure HTML. This approach is perfectly acceptable and often necessary for more complex validation.

### CSS:

- **CSS Styling:** I have applied CSS styling to the primary visual elements of my application, enhancing its visual appeal. I've defined styles for elements like headings, labels, input fields, buttons, and list items.

- **CSS Selectors:** I have effectively used various CSS selectors, including element selectors (e.g., body, h1, h2), ID selectors (e.g., #addExpenseSection, #updateExpenseSection), and class selectors (e.g., .switch, .delete-btn).

- **CSS Positioning:** I've used CSS positioning techniques like flexbox for layout and alignment of elements. This is evident in the layout and alignment of form elements and buttons.

- **Font Rules:** I've defined font rules for text used in my website, making use of a specified font-family.

- **External Stylesheets:** My CSS styles are defined in external stylesheets (main.css).

### Technical Achievements

I achieved all the technical requirements, including:

1. **Single-Page Application:** The application functions as a single-page app, providing a seamless user experience. When users add or modify expenses, the server responds with updated data, and the client updates its data display without requiring a full page reload.

2. **Modify existing data:** Users can click the edit button right next to each expense that they have created to edit and update its information.

### Think Aloud User Testing

#### User 1 - Galvin:

**Task:** User 1 was tasked with adding a new expense to the Expense Tracker web application.

**Feedback:**

- **Positive Feedback:** The user found the form for adding a new expense intuitive and easy to use. They appreciated the clear labels for each input field, such as "Expense Name," "Expense Amount," and "Expense Category."

- **Surprising Comment:** The user mentioned that they were pleasantly surprised by the real-time updates after adding the expense. They liked how the application instantly reflected the changes in the displayed expense list without requiring a page refresh and how they stayed there when the page reloaded.

- **Suggestions for Improvement:** The user suggested adding some better visual feedback or success message after adding an expense to provide a more satisfying user experience instead of using alerts.

#### User 2 - Phan:

**Task:** User 2 was tasked with updating an existing expense in the Expense Tracker web application.

**Feedback:**

- **Positive Feedback:** User 2 found the "Edit" functionality straightforward. They appreciated the fact that they could easily identify and select the expense they wanted to edit from the displayed list.

- **Problems Encountered:** The user faced some confusion when updating an expense. They initially expected the "Edit" button to transform into a "Save" button after making changes. However, they found that there was a separate "Update Changes" button, which they didn't notice immediately. This caused a momentary delay in their task.

- **Suggestions for Improvement:** Based on the feedback, it might be beneficial to consider a design change where the "Edit" button transforms into a "Save" or "Update" button when in edit mode. This could make the process more intuitive and reduce the likelihood of user confusion.
