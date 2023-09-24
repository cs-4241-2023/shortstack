Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  


I was given an extension on this assignment.

## Request for Extension
My form includes multiple fields, a name, email, assignment, days until due, and an optional message.
I used a CSS Flexbox layout. All of the text used has fonts taken from google fonts and properly sized for the form.
For the derived field- "priority", I used the days until due and whether or not the user submitted a reason to calculate the priority. If the user did not provide a reason they immediately were a 'Low' priority regardless of days until due. Otherwise, if the due date was <5 days away they were high priority, between 5 and 10 medium priority, and i gave medium priority to people with more than 10 days if they included a reason. 


## Technical Achievements
- **Tech Achievement 1**: I made a "Sort by Priority" button that rerenders the data to show the submissions from 'high' to 'low' priority. This was a bit challenging to me to figure out the rendering aspect and also how to redo the data. I opted to make a new list and just add the values accordingly so as to keep the original log and data intact.
- **Tech Achievement 2**: I have a "modify" functionality in my code. Each data submission has a "modify" button right near its "delete" button. when the user presses the "modify" button, the form re-fills with the original data and as the user changes any fields, the submission is updated accordingly(with its index remaining the same). 
### Design/Evaluation Achievements
- **Design Achievement 1**: 
I tested my user interface with Andrew Hariyanto. The only issue that the user had with the design was that he could edit the dropdown answers after putting them in the assignment field. He also mentioned that deleting an entry made the user re-sort by priority which could be a bit annoying. Otherwise, none of the comments were surprising and he thought my design was overall good, just the UX comments from earlier.
Based on his feedback, I would implement those changes. I would have priority re-sorted after an item is deleted and make the assignment field a dropdown-only input. 
