// FRONT-END (CLIENT) JAVASCRIPT HERE

// Delete a plant row
const deletePlant = async (button) => {
  const row = button.closest("tr");
  if (row) {
    const index = Array.from(row.parentNode.children).indexOf(row);
    if (index !== -1) {
      const response = await fetch(`/delete/${index}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const tableBody = document.querySelector("#plantTableBody");
        tableBody.removeChild(row);
      } else {
        console.error("Failed to delete plant data.");
      }
    }
  }
};

// Handle form submission
const submit = async function (event) {
  event.preventDefault();

  const inputName = document.querySelector("#plantName");
  const inputType = document.querySelector("#plantType");
  const inputDate = document.querySelector("#lastWatered");

  const json = {
    plantName: inputName.value,
    plantType: inputType.value,
    lastWatered: inputDate.value,
  };

  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    console.error("Failed to submit plant data.");
    return;
  }

  const form = document.querySelector("form");
  form.reset();

  const data = await response.json();

  const tableBody = document.querySelector("#plantTableBody");
  tableBody.innerHTML = "";
  
  for (let index = 0; index < data.length; index++) {
    const d = data[index];
    const row = document.createElement("tr");
    
    const indexCell = document.createElement("td");
    indexCell.innerText = index + 1;

    const nameCell = document.createElement("td");
    nameCell.innerText = d.plantName[0].toUpperCase() + d.plantName.slice(1);

    const typeCell = document.createElement("td");
    typeCell.innerText = d.plantType;

    const lastWateredCell = document.createElement("td");
    lastWateredCell.innerText = d.lastWatered;

    const nextWaterCell = document.createElement("td");
    nextWaterCell.innerText = d.nextWater;

    //const editCell = document.createElement("td");
    //editCell.innerHTML = '<button class="edit-button">Edit</button>';

    const deleteCell = document.createElement("td");
    deleteCell.innerHTML = '<button class="delete-button">Delete</button>';

    row.appendChild(indexCell);
    row.appendChild(nameCell);
    row.appendChild(typeCell);
    row.appendChild(lastWateredCell);
    row.appendChild(nextWaterCell);
    //row.appendChild(editCell);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  }

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deletePlant(button);
    });
  });
};

// Initialize the page
window.onload = function () {
  const submitButton = document.querySelector("#submitButton");
  submitButton.onclick = submit;
};
