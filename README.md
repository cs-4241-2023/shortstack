## TO-DO App

https://a2-nathanwong.glitch.me/

This project showcases a simple TO-DO app that allows the user to create tasks that they want to complete. This project primarily used flexboxes to help with positioning (line 22 in main.css is an example). To use this app, all the user needs to do is fill out the input fields at the top of the webpage to add a task. The task will then appear in the table below, and each task can be deleted by clicking the 'x' that appears to the right of each task in the table.

## Baseline Requirements

All baseline requirements for this project have been fulfilled
- A `server` holds a tabular dataset of three or more fields
- A `results` area on the webpage (the task list) shows all the data from the server and will be fully displayed whenever a task is added or deleted
- A `form` is used and encapsulates all the input fields found in the top of webpage and these help with adding data to the server
- A `derived field` is computed in the server. This derived field is the days remaining section of the task list. The field is calculated by taking the difference in days between the current date and entered due date of the task.

All other requirements for the application pertaining to JS, CSS, HTML, and Node.js have been fulfilled

## Technical Achievements
- **Tech Achievement 1**: The app is a single-page app. Whenever a user adds a task, a POST call updates the dataset on the server. After updating, the dataset is then returned to the frontend to load all the data into the task list (see lines 98-110 in main.js and look at lines 18-40 to in index.html to see the single form). 

## Design/Evaluation Achievements

+ **Design Achievement 1**: Conducted a usability test.
    1. Hariyanto
    2. The user wanted me to move my title to somewhere more visible on the screen. Currently the title of the application exists on the upper right hand side, and they wanted me to move it into the middle since I had a lot of free space there.
    3. While testing the webpage, they discovered a small error with deleting certain tasks where they could reappear again. This bug surprised me, and I was able to fix an unseen error thanks to this test.
    4. Based on their feedback, I would move the title to the center of the screen just above the task list.

+ **Design Achievement 2**: Conducted a usability test.
    1. Garbaczonek
    2. The user wanted me to have a feature where I could strikethrough tasks rather than delete them for indicating completion. They also wanted a feature where I could look at previous tasks.
    3. I was surprised when the user mentioned that my input fields were far away from each other as I had not noticed that initially.
    4. Based on their feedback, I would move my input fields closer to each other and add additional features to view completed tasks.
