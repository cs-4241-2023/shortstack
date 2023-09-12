Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Due: September 11th, by 11:59 AM.

This assignment aims to introduce you to creating a prototype two-tiered web application. 
Your application will include the use of HTML, CSS, JavaScript, and Node.js functionality, with active communication between the client and the server over the life of a user session.

## Blogging Web App

Glitch: https://a2-huangrandy.glitch.me/

Users can create, edit, and manage blog posts. The CSS positioning technique employed in this application is CSS Grid. To use the application, users can create a blog post, which will display below after the post is created. They can also edit existing posts by clicking the "Edit" button and delete posts using the "Delete" button. The dervied field is the "Reading Time", which is derived from the length of the post's content.

## Technical Achievements
- **SPA w/ Real-time Updates**: The application is a single-page application, including all functionality on the same page and real-time updates. When a user creates a post, the post is added to the page without refreshing the page. When a user edits a post, the post is updated without refreshing the page. When a user deletes a post, the post is removed from the page without refreshing the page. Challenge: I had to use `document.createElement` to create the post elements, as I couldn't figure out how to use the `html` template literal to create the elements.

- **Edit/Delete Functionality**: When a user clicks the "Edit" button, the post's title and content are displayed as input fields. The user can then edit the title and content and click the "Save" button to save the changes. The post is then updated with the modified content. When a user clicks the "Delete" button, the post is removed. Challenge: I had to navigate through the different HTTP methods to figure out how to implement the edit and delete functionality.

### Design/Evaluation Achievements
- **User Test**: 
    - **User's Last Name**: Wu
    - **Problems with Design**: When the post content is long, the post proportions aren't very ideal, as it can go much longer than the other posts in the same row.
    - **Surprising Comments**: She mentioned that the reading time calculation was a nice touch, which was surprising as I didn't expect her to pay much attention to it.
    - **Interface Changes**: Add some more styling to restrain each post if the content is too long, so that the proportions of each post are more ideal.



