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

  if(dataResponse.result === "success") {
    // show success message
    message.style.color = "green";
    message.textContent = "Success!";
    clearTextBoxes();
  } else {
    // show failure message
    message.style.color = "red";
    message.textContent = "Failure!";
  }
  // un-hide element
  message.style.visibility = "visible"
}

/**
 * Displays all assignments in server memory
 */
const showAllAssignments = async function (event) {
  // stop form submission from trying to load a new .html page for displaying results
  event.preventDefault();


  // // put data response into HTML list
  // const list = document.createElement("ul");
  // dataResponse.forEach(d => {
  //   const item = document.createElement("li");
  //   item.innerHTML = `<b>Model:</b> ${d.model}, <b>MPG: ${d.mpg} </b>`; // format the JSON
  //   list.appendChild(item);
  // });
  //
  // // put list on the body of the page
  // document.body.appendChild(list);
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
 * Set up on-click event listeners once the window loads
 */
window.onload = function() {
  document.querySelector("#submit-button").onclick = submitAssignment;
  document.querySelector("#show-assignments-button").onclick = showAllAssignments;
}