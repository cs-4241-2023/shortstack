// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  event.preventDefault();

  let task = document.getElementById("task").value;
  let desc = document.getElementById("description").value;
  let date = document.getElementById("dueDate").value;
  let priority = document.getElementById("priority").value;

  let json = { task, desc, date, priority };
  let body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();
  getTasks(data);
};

const createHeaderRow = () => {
  let header = document.createElement("thead");
  let headerRow = document.createElement("tr");

  let taskHeader = document.createElement("th");
  taskHeader.textContent = "Task";
  let descHeader = document.createElement("th");
  descHeader.textContent = "Description";
  let dateHeader = document.createElement("th");
  dateHeader.textContent = "Due Date";
  let priorityHeader = document.createElement("th");
  priorityHeader.textContent = "Priority";

  headerRow.append(taskHeader, descHeader, dateHeader, priorityHeader);
  header.append(headerRow);

  return header;
};

const createDeleteButton = task => {
  const cell = document.createElement("td");
  let button = document.createElement("button");
  button.className = "editButton";
  button.textContent = "Edit";
  button.onclick = () => {
    deleteTask(task);
  };

  cell.append(button);
  return cell;
};

const createRow = (task, desc, date, priority, index) => {
  let row = document.createElement("tr");

  row.append(createCell(task));
  row.append(createCell(desc));
  row.append(createCell(date));
  row.append(createCell(priority));
  row.append(createDeleteButton(index));

  return row;
};

const deleteTask = async task => {
  const jsonString = JSON.stringify(task);

  try {
    const deleteResponse = await fetch("/json", {
      method: "DELETE",
      body: jsonString,
    });

    if (deleteResponse.status === 200) {
      const fetchResponse = await fetch("/tasks", { method: "GET" });
      const data = await fetchResponse.json();
      getTasks(data);
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const createCell = data => {
  const cell = document.createElement("td");
  cell.textContent = data;
  return cell;
};

const getTasks = data => {
  const table = document.querySelector("table");
  table.replaceChildren();
  table.append(createHeaderRow());
  data.forEach(task => {
    let row = createRow(task.task, task.desc, task.date, task.priority, task);
    table.append(row);
  });
};

window.onload = async function () {
  const button = document.querySelector("button");
  button.onclick = submit;

  const response = await fetch("/tasks", {
    method: "GET",
  });

  const data = await response.json();
  getTasks(data);
};
