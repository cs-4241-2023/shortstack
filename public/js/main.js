// FRONT-END (CLIENT) JAVASCRIPT HERE
let taskData = [];
let currentNote = 0;

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const form = document.querySelector("form");
  const body = parseForm(form);

  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const text = await response.text();
  taskData = JSON.parse(text);

  form.reset();
  loadTasks();
};

window.onload = async function () {
  const button = document.querySelector("#save");
  button.onclick = submit;

  const response = await fetch("/init", {
    method: "POST",
    body: JSON.stringify("test"),
  });

  const text = await response.text();
  taskData = JSON.parse(text);
  loadTasks();
};

// collect form data and create an object that will be passed to the server
function parseForm(formData) {
  let body = {};
  Object.keys(formData).forEach((key) => {
    let element = formData.elements[key];
    if (
      element.type !== "submit" &&
      element.type !== "button" &&
      element.type !== "select"
    ) {
      body[element.name] = element.value;
    } else if (element.type === "select") {
      console.log(element);
    }
  });
  return body;
}

function loadTasks() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";
  const title = document.getElementById("task-title");
  const date = document.getElementById("task-date");
  const dueDate = document.getElementById("due-date");
  const priority = document.getElementById("task-priority");
  const description = document.getElementById("task-body");

  taskData.forEach((task) => {
    let newTask = document.createElement("div");

    if (currentNote === 0) {
      newTask.className = "tasks-list--task selected";
      currentNote = task.id;
      title.value = task.title;
      date.value = task.date;
      dueDate.value = task.dueDate;
      priority.value = task.priority;
      description.value = task.description;
    } else {
      newTask.className = "tasks-list--task";
    }
    newTask.innerText = task.title;
    newTask.id = task.id;
    newTask.addEventListener("click", async (event) => {
      document.getElementById(currentNote).className = "tasks-list--task";
      currentNote = event.target.id;
      event.target.className = "tasks-list--task selected";
      const taskID = await findTask(currentNote);
      title.value = taskID.title;
      date.value = taskID.date;
      dueDate.value = taskID.dueDate;
      priority.value = taskID.priority;
      description.value = taskID.description;
    });
    sidebar.appendChild(newTask);
  });
}

async function findTask(id) {
  let returnTask = {};
  taskData.forEach((task) => {
    if (task.id === parseInt(id)) {
      returnTask = task;
    }
  });
  return returnTask;
}

function deleteNote() {}
