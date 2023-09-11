// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event, newInput) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  let distCell = document.getElementById("distInput").value;
  let timeCell = document.getElementById("timeInput").value;
  let descCell = document.getElementById("descInput").value;

  let invalidFlag = false;

  if (distCell == "" || distCell < 0) {
    alert("Invalid Distance.");
    invalidFlag = true;
  }
  if (timeCell == "" || timeCell < 0) {
    alert("Invalid Time.");
    invalidFlag = true;
  }

  if (!invalidFlag) {
    const editInput = {
      distance: distCell,
      time: timeCell,
      description: descCell,
    };
    const body = JSON.stringify(editInput);
    console.log(body);
    const response = await fetch("/newInput", {
      method: "POST",
      body,
    });
    const data = await response.json();
    parseReturnData(data);
  }
};

async function getData() {
  try {
    const response = await fetch("/newInput");
    const data = await response.json();
    parseReturnData(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}

function parseReturnData(dataIn) {
  let newTable = document.createElement("table");
  let headerRow = CreateHeaderRow();
  newTable.append(headerRow);
  dataIn.forEach((set) => {
    console.log(set);
    let newRow = createRow(
      set["distance"],
      set["time"],
      Math.round(100 * (set["time"] / set["distance"])) / 100,
      set["description"]
    );
    newTable.append(newRow);
  });
  let indexTable = document.getElementById("outputTable");
  indexTable.replaceChildren();
  indexTable.append(newTable);
}

function CreateHeaderRow() {
  let row = document.createElement("tr");
  row.append(CreateHeader("Distance"));
  row.append(CreateHeader("Time"));
  row.append(CreateHeader("Pace"));
  row.append(CreateHeader("Description"));
  row.append(CreateHeader("Edit/Delete"));
  return row;
}

function CreateHeader(cellText) {
  const cell = document.createElement("th");
  cell.innerHTML = `<p>${cellText}</p>`;
  return cell;
}

function createRow(distance, time, pace, description) {
  let row = document.createElement("tr");
  const distCell = document.createElement("td");
  distCell.innerHTML = `<p>${distance}</p>`;
  const timeCell = document.createElement("td");
  timeCell.innerHTML = `<p>${time}</p>`;
  const paceCell = document.createElement("td");
  paceCell.innerHTML = `<p>${pace}</p>`;
  const descCell = document.createElement("td");
  descCell.innerHTML = `<p>${description}</p>`;
  const actionCell = document.createElement("td");
  actionCell.innerHTML = `<button class="edit-button" onclick="updateRow(this.parentNode.parentNode)">Edit</button><button class="delete-button" onclick="deleteRow(this.parentNode.parentNode)">Delete</button>`;
  row.append(distCell, timeCell, paceCell, descCell, actionCell);
  return row;
}

function deleteRow(obj) {
  const index = obj.rowIndex;
  fetch(`/delete/${index}`, {
    method: "DELETE",
  }).then((response) => response.json());

  getData();
}

function updateRow(obj) {
  let distCell = obj.cells[0];
  let timeCell = obj.cells[1];
  let paceCell = obj.cells[2];
  let descCell = obj.cells[3];

  let rowIndex = obj.rowIndex;

  let distInput = prompt("New Distance:", distCell.innerText);
  let timeInput = prompt("New Time:", timeCell.innerText);
  let descInput = prompt("New Description:", descCell.innerText);

  const updateInfo = {
    distance: distInput,
    time: timeInput,
    description: descInput,
  };

  fetch(`/update/${rowIndex}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateInfo),
  }).then((response) => response.json());

  getData();
}

window.onload = async function () {
  const button = document.querySelector(".add-index");
  button.onclick = submit;

  const response = await fetch("/newInput", {
    method: "GET",
  });
  const data = await response.json();
  parseReturnData(data);
};
