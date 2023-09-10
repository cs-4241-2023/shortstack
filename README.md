## Vehicle Service Log
The "Vehicle Service Log" web application is designed to help users manage and track their scheduled vehicle appointments. This single-page web app provides a user-friendly interface that allows users to input and manage their vehicle service appointments effectively. The application utilizes CSS positioning techniques, a clean and intuitive layout, and interactive design elements to enhance the user experience.

## Glitch: https://a2-ngrozdani.glitch.me

## CSS Positioning Technique:
The CSS positioning technique used in this web application primarily relies on Flexbox. I used Flexbox to create a responsive and dynamic layout that adapts to different screen sizes, ensuring a consistent and visually pleasing experience for users on various devices. 

## CSS Styling Techniques:

- **Targeted Specific Elements with ID Selectors:** I utilized ID selectors, such as #content-title, to precisely style individual elements. This allowed me to control aspects like font size, border-bottom, and margin for elements like the content title.
- **Global Styling with HTML Element Selectors:** To apply styles universally across various HTML elements, I used element selectors. This involved styling elements like headings (h1, h2), paragraphs (p), unordered lists (ul), list items (li), and buttons (button) to maintain a consistent design throughout the webpage.
- **Styled Main Header Section with Class Selectors:** By using class selectors, such as '.main-header,' I focused on styling specific sections of my webpage. This included customization of attributes like background color and positioning for the main header.
- **Interactive Element Styling with Pseudo-Classes:** For enhancing user interactions, I used pseudo-classes. For instance, I defined styles for the :focus state of form inputs and buttons to modify border colors and introduce box shadows when these elements received focus. I also utilized :hover and :active pseudo-classes to add hover and click effects onto buttons for an engaging user experience.

## Application Usage Instructions:
To use the application effectively, users can follow these instructions:

## Adding an Appointment: 
To add a vehicle service appointment, simply fill out the form in the main section of the page. Input the year, make, model, service type, and appointment date. Click the "Submit" button to log the appointment.

## Modifying an Appointment: 
If you need to modify an existing appointment, update the form with the new information and then click the "Modify" button for the specific appointment you want to update.

## Removing an Appointment: 
To remove an appointment, click the "Remove" button corresponding to the appointment you wish to delete.

## Technical Achievements
## Tech Achievement 1: Single-Page App with Real-Time Data Handling
- This web application operates as a single-page app, eliminating the need for page reloads or redirection to other pages. Users can interact with the form, and the application dynamically updates the table to reflect changes. 
- Real-time data handling ensures that the current state of server-side data is always displayed to the user. When users submit new appointments or modify/delete existing ones, the table is instantly updated without requiring a page refresh.
- The client-side code is responsible for fetching data stored on the server, and submitting new appointment data to the server. This seamless interaction with the server enhances the user's experience by providing real-time feedback and data synchronization.
## Tech Achievement 2: Modification of Existing Appointments
- In addition to adding and deleting data on the server, the web application allows users to modify existing vehicle appointments. Users can update appointment details such as the year, make, model, service type, and appointment date with ease.
- The "Modify" button provides a straightforward way to edit and save changes to existing appointments, ensuring that users have full control over their appointment data.

## Design/Evaluation Achievements

- **Design Achievement 1**: Flexbox Layout: I used Flexbox to create a flexible and efficient layout system. 
- **Design Achievement 2**: Interactive Buttons: I incorporated interactive buttons with captivating hover and active effects, offering users clear visual cues during their interactions.
- **Design Achievement 3**: Responsive Design: I implemented responsive design principles using media queries to ensure that my web page adapts effortlessly to various screen sizes.
- **Design Achievement 4**: Table Design: I structured the vehicle appointment table with captions and borders, and a clear header to enhance the table's purpose and content clarity.
- **Design Achievement 5**: Consistent Typography: I used the 'Rubik' font for the text, providing a sleek and uniform typography throughout the page. 

## User Study Evaluation

- **Student Name: Justin Santiago Wonoski**:
- Task: The user was asked to modify an existing vehicle appointment in the log using the provided form.

- Problems: Justin initially had difficulty figuring out how to edit an existing appointment. He mentioned that the "Modify" and "Remove" buttons were not very prominent and suggested making them more visually distinct.

- Surprising Comments: Justin appreciated the responsive design, particularly how the web page adapted to his mobile device. He also mentioned that the use of UUIDs for appointments was a smart choice for data management.

- Changes Based on Feedback: Based on Justin's feedback, I would consider making the "Modify" and "Remove" buttons more prominent, either by using contrasting colors or larger buttons. This would make it easier for users to interact with and modify existing appointments.

- **Student Name: Ryan Kornitsky**:
- Task: The user was asked to add a new vehicle appointment to the service log using the provided form.

- Problems Encountered: The user found the error handling a bit unclear, mistaking it for referring to the appointment year instead of vehicle year. They also recommended changing the date format under "vehicle appointments" to mm/dd/year to match the format used in the appointment date field.

- Surprising Comments: The user commented that they appreciated the clear labels for each input field but expected a tooltip or brief description when hovering over them to provide additional context.

- Interface Changes: Based on the feedback, I would consider enhancing error messages for clarity, specifying the nature of errors more explicitly; Ensure consistency in date formatting, making it mm/dd/year under "vehicle appointments" to match the appointment date field; Use "appointment ID" instead of "UUID" for user-friendliness.
