// FRONT-END (CLIENT) JAVASCRIPT HERE

let form, taskInput, dateInput, submitButton;

function checkValidity() {
  if (taskInput.validity.valid && dateInput.validity.valid) {
    submitButton.removeAttribute('disabled');
  }
  else {
    submitButton.setAttribute('disabled', 'true');
  }
}

function loadTasks(taskList) {
  let currentTasks = document.querySelectorAll('.task-item');
  let previousList = Array.from(currentTasks);

  previousList.forEach(t => t.remove());

  let list = document.querySelector('ul');

  taskList.forEach(t => {
    let item = document.createElement('li');
    item.className = 'task-item'

    let taskLabel = document.createElement('label');
    taskLabel.innerHTML = t.taskName;
    taskLabel.className = 'list-label';

    let dateLabel = document.createElement('label');
    dateLabel.innerHTML = t.dueDate;
    dateLabel.className = 'list-label';

    let priorityLabel = document.createElement('label');
    priorityLabel.innerHTML = t.priority;
    priorityLabel.className = 'list-label';

    item.appendChild(taskLabel);
    item.appendChild(dateLabel);
    item.appendChild(priorityLabel);
    list.appendChild(item);
  });
}

const submit = async function( event ) {
  event.preventDefault()

  const taskInput = document.querySelector('#taskName').value,
        dateInput = document.querySelector('#dueDate').value,
        priorityInput = document.querySelector('#priorityFlag').value;

  const json = { taskName: taskInput, dueDate: dateInput, priority: priorityInput};
  const body = JSON.stringify(json);

  const postResponse = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const getResponse = await fetch('/tasks', {
    method: 'GET',
  })

  const text = await getResponse.text();
  const tasks = JSON.parse(text);

  loadTasks(tasks);

  console.log( 'text:', text )
}

window.onload = function() {
  const button = document.querySelector("#addTaskButton");
  button.onclick = submit;

  form = document.querySelector('.inputs');
  taskInput = document.querySelector('#taskName');
  dateInput = document.querySelector('#dueDate');
  submitButton = document.querySelector('#addTaskButton');

  taskInput.addEventListener('input', checkValidity);
  dateInput.addEventListener('input', checkValidity);
}