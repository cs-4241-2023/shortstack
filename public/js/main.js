// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const form = document.querySelector("#addTaskForm");
  const formData = new FormData(form);
  // get all fields in variables
  const taskName = formData.get("taskName");
  const taskDescription = formData.get("taskDescription");
  const taskDeadline = formData.get("taskDeadline");
  const taskPriority = formData.get("taskPriority");
  const taskCreated = new Date().toISOString().slice(0, 10);
  console.log("taskCreated: ", taskCreated);

  const json = {
    taskName,
    taskDescription,
    taskDeadline,
    taskPriority,
    taskCreated,
  };
  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();

  tasks = JSON.parse(text);
  updateTaskTable(tasks);
  console.log("new tasks list: ", tasks);

  // const input = document.querySelector("#yourname"),
  //   json = { yourname: input.value },
  //   body = JSON.stringify(json);

  // const response = await fetch("/submit", {
  //   method: "POST",
  //   body,
  // });

  // const text = await response.text();

  // console.log("text:", text);
};

const updateTaskTable = function (tasks) {
  const table = document.getElementById("tasksTable");
  const tasksTableRowsContainer = document.getElementsByClassName(
    "tasks-table-rows-container"
  );
  for (let i = 0; i < tasks.length; i++) {
    const currentTask = tasks[i];
    // create a new cell for each field
    const taskNameCell = document.createElement("td");
    const taskDescriptionCell = document.createElement("td");
    const taskCreatedCell = document.createElement("td");
    const taskDeadlineCell = document.createElement("td");
    const taskPriorityCell = document.createElement("td");
    const taskTotalTimeCell = document.createElement("td");
    const taskTimeRemainingCell = document.createElement("td");
    // add the text to each cell
    taskNameCell.innerText = currentTask.taskName;
    taskDescriptionCell.innerText = currentTask.taskDescription;
    taskCreatedCell.innerText = currentTask.taskCreated;
    taskDeadlineCell.innerText = currentTask.taskDeadline;
    taskPriorityCell.innerText = currentTask.taskPriority;
    taskTotalTimeCell.innerText = currentTask.totalTime;
    if (currentTask.timeRemaining < 0) {
      taskTimeRemainingCell.innerText = "OVERDUE";
    } else {
      taskTimeRemainingCell.innerText = currentTask.timeRemaining;
    }
    // append each cell to the row
    const currentRow = document.createElement("tr");
    currentRow.appendChild(taskNameCell);
    currentRow.appendChild(taskDescriptionCell);
    currentRow.appendChild(taskCreatedCell);
    currentRow.appendChild(taskDeadlineCell);
    currentRow.appendChild(taskPriorityCell);
    currentRow.appendChild(taskTotalTimeCell);
    currentRow.appendChild(taskTimeRemainingCell);
    // append the row to the table
    table.appendChild(currentRow);
  }
};

window.onload = function () {
  const button = document.getElementById("addTaskFormSubmitBtn");
  button.onclick = submit;
};
