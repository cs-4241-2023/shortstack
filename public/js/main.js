// FRONT-END (CLIENT) JAVASCRIPT HERE

const fetchTasks = async () => {
  try {
    const fetchResponse = await fetch("/tasks", { method: "GET" });
    const data = await fetchResponse.json();
    getTasks(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const submit = async event => {
  event.preventDefault();

  const task = document.getElementById("task").value;
  const desc = document.getElementById("description").value;
  let inputDate = new Date(document.getElementById("dueDate").value);
  let dueDate =
    inputDate.getMonth() +
    "-" +
    (inputDate.getDate() + 1) +
    "-" +
    inputDate.getFullYear();

  const json = { task, desc, dueDate };
  const body = JSON.stringify(json);

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body,
    });

    if (response.status === 200) {
      fetchTasks();
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

const createDeleteButton = task => {
  const cell = document.createElement("td");
  const button = document.createElement("button");
  button.className = "editButton";
  button.textContent = "Delete";
  button.onclick = () => {
    deleteTask(task);
  };

  cell.appendChild(button);
  return cell;
};

const createRow = (task, desc, dueDate, priority, index) => {
  let row = document.createElement("tr");

  row.append(createCell(task));
  row.append(createCell(desc));
  row.append(createCell(dueDate));
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
      fetchTasks();
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
