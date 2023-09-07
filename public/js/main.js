// FRONT-END (CLIENT) JAVASCRIPT HERE

// Function to fetch tasks from the server
const fetchTasks = async function () {
  try {
    const response = await fetch('/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// Function to display tasks in the todo list
const displayTasks = function (tasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear the existing list

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.task; // Use 'task' instead of 'yourname'
    taskList.appendChild(listItem);
  });
};

// Function to handle form submission
const submit = async function (event) {
  event.preventDefault();

  const input = document.querySelector('#task-input'),
    json = { task: input.value },
    body = JSON.stringify(json);

  const response = await fetch('/submit', { // This is where you specify the endpoint
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // If the task was added successfully, fetch and display the updated list of tasks
    fetchTasks();
  } else {
    console.error('Failed to add task');
  }
};

// Fetch and display tasks when the page loads
window.onload = function () {
  const button = document.querySelector('button');
  button.onclick = submit;

  // Fetch and display tasks from the server
  fetchTasks();
};
