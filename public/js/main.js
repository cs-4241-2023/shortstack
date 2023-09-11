const appdata = [];

function addTask() {
  const taskInput = document.getElementById('new-task-name');
  const taskDateInput = document.getElementById('new-task-date'); 
  const taskPriorityInput = document.getElementById('new-task-priority'); 
  const taskText = taskInput.value.trim();
  const taskDate = taskDateInput.value; 
  const taskPriority = taskPriorityInput.value; 

  if (taskText !== '' && taskDate !== '') {
    const task = { text: taskText, completed: false, creation_date: taskDate, priority: taskPriority };
    fetch('/appdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
      loadTasks();
    });
  } else {
    alert('Please enter a task and a creation date.');
  }
}

function addTaskToDOM(task, index) {
  const taskList = document.getElementById('task-list');

  const newTaskItem = document.createElement('div');
  newTaskItem.classList.add('task-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
  });

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = `${task.text} (Created on: ${task.creation_date}, Priority: ${task.priority})`;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
      task.text = newTaskText.trim();
      taskText.textContent = `${task.text} (Created on: ${task.creation_date}, Priority: ${task.priority})`;
    }
  });

  newTaskItem.appendChild(checkbox);
  newTaskItem.appendChild(taskText);
  newTaskItem.appendChild(editButton);
  taskList.appendChild(newTaskItem);
}

function loadTasks() {
  fetch('/appdata')
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      data.forEach((task, index) => {
        addTaskToDOM(task, index);
      });
    });
}

window.onload = loadTasks; 
