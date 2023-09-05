// FRONT-END (CLIENT) JAVASCRIPT HERE
/**
 * Submits assignment to the server as JSON
 * @param event mouse click event
 * @returns {Promise<void>}
 */
const submitAssignment = async function(event) {
  // stop form submission from trying to load a new .html page for displaying results
  event.preventDefault();

  // get information from input text boxes and parse into a JSON
  const inputJSON = JSON.stringify({
    className: document.querySelector("#class-name").value,
    assignmentName: document.querySelector("#assignment-name").value,
    dueDate: document.querySelector("#due-date").value,
    difficulty: document.querySelector("#difficulty").value,
    priority: "" // priority is empty until we derive it in the server
  });

  // post JSON to server
  const response = await fetch( '/submit', {
    method: 'POST',
    body: inputJSON
  });

  // await response from server, the server is sending some example data back
  const dataResponse = await response.json();

  // status message element
  let message = document.querySelector("#submission-message");

  if(dataResponse.result === "success")
  {
    // show success message
    message.style.color = "green";
    message.textContent = "Success!";
    clearTextBoxes();

    // update data table with new data
    await getAllData();
  }
  else
  {
    // show failure message
    message.style.color = "red";
    message.textContent = "Failure! " + dataResponse.message;
  }
  // un-hide element
  message.style.visibility = "visible"
}

/**
 * Clears all text boxes
 */
const clearTextBoxes = function() {
  // array of selectors that specify the text boxes
  let selectors = [
    "#class-name",
    "#assignment-name",
    "#due-date",
    "#difficulty"
  ];

  // set the value of each to the empty string
  selectors.forEach((selector) => {
    document.querySelector(selector).value = "";
  });
}

/**
 * Get all app data from the Node.js server and populate a table with the information
 * @returns {Promise<void>}
 */
const getAllData = async function () {
  // clear table before data fetch
  document.getElementById("show-information").innerHTML = "";

  // get app data from server as JSON
  const appResponse = await fetch('/assignment-data', {method: 'GET'});
  const appDataJSON = await appResponse.json();

  // create table element in HTML
  const table = document.createElement("table");
  table.innerHTML = "<th>Class Name</th> <th>Assignment Name</th> <th>Due Date</th> <th>Difficulty</th> <th>Priority</th>";

  // add assignment information to corresponding row
  appDataJSON.forEach((assignment) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${assignment.className}</td> 
                     <td>${assignment.assignmentName}</td>
                     <td>${assignment.dueDate}</td>
                     <td>${assignment.difficulty} out of 10</td>
                     <td>${assignment.priority} priority</td>`
    table.appendChild(row);
  });
  document.getElementById("show-information").appendChild(table);
}

/**
 * Set up on-click event listeners once the window loads
 */
window.onload = function() {
  getAllData().then(() =>
      document.querySelector("#submit-button").onclick = submitAssignment
  );
}