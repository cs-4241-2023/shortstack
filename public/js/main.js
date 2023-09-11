const { v4: uuidv4 } = require("uuid");

// Helper function to fetch tasks from server and display them in a table
const fetchTasks = async () => {
  try {
    const fetchResponse = await fetch("/tasks", { method: "GET" });
    const data = await fetchResponse.json();
    getTasks(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Collects the data in form inputs and sends it to the server to create a new task
const submit = async event => {
  event.preventDefault();

  let taskInput = document.getElementById("task");
  const task = taskInput.value;
  taskInput.value = "";

  let descInput = document.getElementById("description");
  const desc = descInput.value;
  descInput.value = "";

  let dueDate = new Date(
    document.getElementById("dueDate").value
  ).toLocaleDateString("en-US");
  let id = uuidv4();

  const json = { id, task, desc, dueDate };
  const body = JSON.stringify(json);

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body,
    });

    if (response.status === 200) {
      fetchTasks();
      taskInput.value = "";
      descInput.value = "";
    } else {
      throw new Error("Failed to submit task");
    }
  } catch (error) {
    console.error("Error submitting task:", error);
  }
};

const createHeaderRow = () => {
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["Task", "Description", "Due Date", "Priority"];
  headers.forEach(text => {
    const headerCell = document.createElement("th");
    headerCell.textContent = text;
    headerRow.appendChild(headerCell);
  });

  header.appendChild(headerRow);
  return header;
};

const createButtons = task => {
  const cell = document.createElement("td");
  cell.style.width = "200px";

  const editButton = document.createElement("button");
  editButton.className = "taskButton";
  editButton.textContent = "Edit";
  editButton.onclick = () => {
    editTask(task);
  };

  const deleteButton = document.createElement("button");
  deleteButton.className = "taskButton";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    deleteTask(task);
  };

  cell.append(editButton, deleteButton);
  return cell;
};

const createRow = (task, desc, dueDate, priority, index) => {
  let row = document.createElement("tr");

  row.append(createCell(task));
  row.append(createCell(desc));
  row.append(createCell(dueDate));
  row.append(createCell(priority));
  row.append(createButtons(index));

  return row;
};

// Uses fetch to delete a task instance from server, returns error if task deletion goes wrong
const deleteTask = async task => {
  const jsonString = JSON.stringify(task);

  try {
    const deleteResponse = await fetch("/json", {
      method: "DELETE",
      body: jsonString,
    });

    if (deleteResponse.status === 200) {
      fetchTasks();
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const updateForm = task => {
  const taskInput = document.getElementById("task");
  const descInput = document.getElementById("description");
  const dateInput = document.getElementById("dueDate");
  taskInput.value = task.task;
  descInput.value = task.desc;
  dateInput.value = task.date;
};

const editTask = async task => {
  let updatedTask = task;
  updateForm(updatedTask);
  deleteTask(task);
};

const createCell = data => {
  const cell = document.createElement("td");
  cell.textContent = data;
  return cell;
};

// Manages creation of table elements using data from server
const getTasks = data => {
  const table = document.querySelector("table");
  table.replaceChildren();
  table.append(createHeaderRow());
  data.forEach((task, index) => {
    let row = createRow(
      task.task,
      task.desc,
      task.dueDate,
      `P${index + 1}`,
      task
    );
    table.append(row);
  });
};

window.onload = async function () {
  const button = document.querySelector("button");
  button.onclick = submit;

  fetchTasks();
};
