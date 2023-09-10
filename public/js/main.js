// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  event.preventDefault();

  const form = document.querySelector("#task-form");

  let task = document.getElementById("task").value;
  let desc = document.getElementById("description").value;
  let date = document.getElementById("dueDate").value;
  let priority = document.getElementById("priority").value;

  let json = { task, desc, date, priority };
  let body = JSON.stringify(json);

  console.log("text:", body);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();
  getTasks(data);
};

const createRow = (task, desc, date, priority) => {
  let row = document.createElement("tr");
  row.append(createCell(task));
  row.append(createCell(desc));
  row.append(createCell(date));
  row.append(createCell(priority));

  return row;
};

const createCell = data => {
  const cell = document.createElement("td");
  cell.textContent = data;
  return cell;
};

const getTasks = async function (data) {
  const table = document.querySelector("table");
  table.replaceChildren();

  data.forEach(task => {
    let row = createRow(task.task, task.desc, task.date, task.priority);
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
