Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  


Acheivements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the assignment to your personal interests. These are recommended acheivements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README and why it was challenging. ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM. Remember, the highest grade you can get on any individual assignment is a 100%.

*Technical*
- (5 points) Create a single-page app that both provides a form for users to submit data and always shows the current state of the server-side data. To put it another way, when the user submits data, the server should respond sending back the updated data (including the derived field calculated on the server) and the client should then update its data display.

- (5 points) In addition to a form enabling adding and deleting data on the server, also add the ability to modify existing data.

*Design/UX*
- (5 points per person, with a max of 10 points) Test your user interface with other students in the class. Define a specific task for them to complete (ideally something short that takes <10 minutes), and then use the [think-aloud protocol](https://en.wikipedia.org/wiki/Think_aloud_protocol) to obtain feedback on your design (talk-aloud is also fine). Important considerations when designing your study:

1. Make sure you start the study by clearly stating the task that you expect your user to accomplish.
2. You shouldn't provide any verbal instructions on how to use your interface / accomplish the task you give them. Make sure that your interface is clear enough that users can figure it out without any instruction, or provide text instructions from within the interface itself. 
3. If users get stuck to the point where they give up, you can then provde instruction so that the study can continue, but make sure to discuss this in your README. You won't lose any points for this... all feedback is good feedback!

You'll need to use sometype of collaborative software that will enable you both to see the test subject's screen and listen to their voice as they describe their thoughts, or conduct the studies in person. After completing each study, briefly (one to two sentences for each question) address the following in your README:

1. Provide the last name of each student you conduct the evaluation with.
2. What problems did the user have with your design?
3. What comments did they make that surprised you?
4. What would you change about the interface based on their feedback?

*You do not need to actually make changes based on their feedback*. This acheivement is designed to help gain experience testing user interfaces. If you run two user studies, you should answer two sets of questions. 

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title
I used a CSS Flexbox layout.
For the derived field, I used the days until due and whether or not the user submitted a reason to calculate the priority. If the user did not provide a reason they immediately were a 'Low' priority regardless of days until due. Otherwise, if the due date was <5 days away they were high priority, between 5 and 10 medium priority, and i gave medium priority to people with more than 10 days if they included a reason. 


## Technical Achievements
- **Tech Achievement 1**: I made a "Sort by Priority" button that rerenders the data to show the submissions from 'high' to 'low' priority. This was a bit challenging to me to figure out the rendering aspect and also how to redo the data. I opted to make a new list and just add the values accordingly so as to keep the original log and data intact.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
I tested my user interface with Andrew Hariyanto. The only issue that the user had with the design was that he could edit the dropdown answers after putting them in the assignment field. He also mentioned that deleting an entry made the user re-sort by priority which could be a bit annoying. Otherwise, none of the comments were surprising and he thought my design was overall good, just the UX comments from earlier.
Based on his feedback, I would implement those changes. I would have priority re-sorted after an item is deleted and make the assignment field a dropdown-only input. 
