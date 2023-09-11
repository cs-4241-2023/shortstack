// FRONT-END (CLIENT) JAVASCRIPT HERE
let appdata;
let currentlyEditedIndex = null;

const fetchAppData = async () => {
  try {
    const appdataResponse = await fetch('/training-data');
    if (!appdataResponse.ok) {
      throw new Error(`Failed to fetch appdata. Status: ${appdataResponse.status}`);
    }
    appdata = await appdataResponse.json();
  } catch (error) {
    console.error('Error fetching appdata:', error);
  }
};

const updateTrainingDataDisplay = async () => {
  try {
    const response = await fetch('/training-data');
    if (!response.ok) {
      throw new Error(`Failed to fetch training data. Status: ${response.status}`);
    }
    appdata = await response.json();
    const trainingDataContainer = document.querySelector('#training-data');
    trainingDataContainer.innerHTML = '';

    appdata.forEach((session, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${session.date}</td>
        <td>${session.type}</td>
        <td>${session.distance.toFixed(1)}</td>
        <td>${session.time}</td>
        <td>${session.heartRate}</td>
        <td>${calculateAverageSpeed(session.distance, session.time)}</td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </td>
      `;
      trainingDataContainer.appendChild(newRow);

      // Attach event listeners for edit and delete buttons
      const editButton = newRow.querySelector('.edit-button');
      const deleteButton = newRow.querySelector('.delete-button');
      editButton.addEventListener('click', () => editTrainingSession(index));
      deleteButton.addEventListener('click', () => deleteTrainingSession(index));
    });
  } catch (error) {
    console.error('Error updating training data display:', error);
  }
};

const calculateAverageSpeed = (distance, time) => {
  return Math.round((distance*100) / (time / 60))/100; // will round to the nearest hundredth if necessary
};

const editTrainingSession = (index) => {
  if (currentlyEditedIndex !== null) {
    cancelEditSession(currentlyEditedIndex);
  }
  
  disableSubmit();

  currentlyEditedIndex = index;
  const sessionToEdit = appdata[index];

  const dateInput = document.getElementById("date");
  const typeInput = document.getElementById("type");
  const distanceInput = document.getElementById("distance");
  const timeInput = document.getElementById("time");
  const heartRateInput = document.getElementById("heart-rate");

  dateInput.value = sessionToEdit.date;
  typeInput.value = sessionToEdit.type;
  distanceInput.value = sessionToEdit.distance;
  timeInput.value = sessionToEdit.time;
  heartRateInput.value = sessionToEdit.heartRate;

  const row = document.querySelector(`#training-data tr:nth-child(${index + 1})`);
  row.cells[6].innerHTML = `
    <button class="save-button">Save</button>
    <button class="cancel-button">Cancel</button>
  `;

  // Attach event listeners for save and cancel buttons
  const saveButton = row.querySelector('.save-button');
  const cancelButton = row.querySelector('.cancel-button');
  saveButton.addEventListener('click', () => saveTrainingSession(index));
  cancelButton.addEventListener('click', () => cancelEditSession(index));
};

const cancelEditSession = (index) => {
  revertSubmit();
  
  const row = document.querySelector(`#training-data tr:nth-child(${index + 1})`);
  const originalSession = appdata[index];

  // Forces original session content to be visually displayed
  row.cells[0].textContent = originalSession.date;
  row.cells[1].textContent = originalSession.type;
  row.cells[2].textContent = originalSession.distance.toFixed(1);
  row.cells[3].textContent = originalSession.time;
  row.cells[4].textContent = originalSession.heartRate;

  row.cells[6].innerHTML = `
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;
  
  const editButton = row.querySelector('.edit-button');
  const deleteButton = row.querySelector('.delete-button');
  editButton.addEventListener('click', () => editTrainingSession(index));
  deleteButton.addEventListener('click', () => deleteTrainingSession(index));

  currentlyEditedIndex = null;
};

const revertSubmit = () => {
  const buttonSubmit = document.getElementById("submit-button");
  buttonSubmit.style.backgroundColor = "#333333";
}

const disableSubmit = () => {
  const buttonSubmit = document.getElementById("submit-button");
  buttonSubmit.style.backgroundColor = "#999999";
}

const saveTrainingSession = (index) => {
  revertSubmit();
  
  const row = document.querySelector(`#training-data tr:nth-child(${index + 1})`);
  const editedSession = {
    date: document.getElementById("date").value,
    type: document.getElementById("type").value,
    distance: parseFloat(document.getElementById("distance").value),
    time: parseInt(document.getElementById("time").value),
    heartRate: parseInt(document.getElementById("heart-rate").value),
  };
  
  // Visually update the session being edited
  row.cells[0].textContent = editedSession.date;
  row.cells[1].textContent = editedSession.type;
  row.cells[2].textContent = editedSession.distance.toFixed(1);
  row.cells[3].textContent = editedSession.time;
  row.cells[4].textContent = editedSession.heartRate;

  // Update data on the server side with new information
  const urlString = `update?index=${index}&date=${editedSession.date}&type=${editedSession.type}&distance=${editedSession.distance}&time=${editedSession.time}&heartRate=${editedSession.heartRate}`;
  fetch(urlString, { method: 'GET' })
    .then((response) => {
      if (response.status === 200) {
        updateTrainingDataDisplay();
      } else {
        console.error('Error saving edited session:', response.statusText);
      }
    });
  currentlyEditedIndex = null;
  
  // Revert actions back to original state
  row.cells[6].innerHTML = `
    <button class="edit-button">Edit</button>
    <button class="delete-button">Delete</button>
  `;
  
  const editButton = row.querySelector('.edit-button');
  const deleteButton = row.querySelector('.delete-button');
  editButton.addEventListener('click', () => editTrainingSession(index));
  deleteButton.addEventListener('click', () => deleteTrainingSession(index));
};

const deleteTrainingSession = (index) => {
  console.log("Checking delete execution for table index " + index);
  fetch(`/delete?index=${index}`, { method: 'GET' })
    .then((response) => {
      if (response.status === 200) {
        updateTrainingDataDisplay();
      } else {
        console.error('Error deleting session:', response.statusText);
      }
    });
  currentlyEditedIndex = null;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("test");
  
  if (currentlyEditedIndex !== null) {
    return false;
  }

  const dateInput = document.getElementById("date");
  const typeInput = document.getElementById("type");
  const distanceInput = document.getElementById("distance");
  const timeInput = document.getElementById("time");
  const hrInput = document.getElementById("heart-rate");

  const editIndex = parseInt(document.querySelector('#edit-index').value);
  
  const urlString = `submit-data?date=${dateInput.value}&type=${typeInput.value}&distance=${distanceInput.value}&time=${timeInput.value}&heartRate=${hrInput.value}`;
  if(editIndex != -1) {
    return false;
  } 

  fetch(urlString, { method: 'GET' })
    .then((response) => {
      if (response.status === 200) {
        updateTrainingDataDisplay();
      } else {
        console.error('Error saving edited session:', response.statusText);
      }
    });

  return false;
};

window.onload = async () => {
  await fetchAppData();
  updateTrainingDataDisplay();
};
