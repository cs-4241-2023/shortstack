// FRONT-END (CLIENT) JAVASCRIPT HERE

function validate() {
  /*
  Validate that all inputs are whole numbers. Anything else sets that input to 0.
  */
  let input_nodes = document.querySelectorAll("input");
  for (let input of input_nodes) {
    let value = input.value;
    let illegal_flag = false;
    if((value[0] < "0" || value[0] > "9") && value[0] != "-") {
      illegal_flag = true;
    }
    for (let i = 1; i < value.length; i++) {
      let c = value[i];
      if (c < "0" || c > "9") {
        illegal_flag = true;
      }
    }
    if (illegal_flag) {
      input.value = "0";
    }
  }
}

function reset() {
  let input_nodes = document.querySelectorAll("input");
  for (let input of input_nodes) {
    input.value = "0";
  }
}

async function submit(event) {
  // Stop displaying results in new page by default.
  event.preventDefault();

  // Get inputs elements.
  let input_nodes = document.querySelectorAll('input');
  
  // Create variable to store input values in JSON format.
  let data = {}
  
  // Fill json with input values.
  for(let input of input_nodes) {
    data[input.id] = parseInt(input.value);
  }

  // Send POST request to server.
  let response = await fetch("/submit", {
    'method': "POST",
    'headers': {
      "Content-Type": "application/json"
    },
    'body': JSON.stringify(data)
  });
  
  // Get response in JSON format.
  let result = await response.json();
  
  // Return the response.
  return result;
}

async function double(event) {
  // Stop displaying results in new page by default.
  event.preventDefault();

  // Send POST request to server.
  let response = await fetch("/double", {
    'method': "POST",
    'headers': {
      "Content-Type": "application/json"
    },
    'body': JSON.stringify({})
  });
  
  // Get response in JSON format.
  let result = await response.json();
  
  // Return the response.
  return result;
}

async function clear(event) {
  // Stop displaying results in new page by default.
  event.preventDefault();

  // Send POST request to server.
  let response = await fetch("/clear", {
    'method': "POST",
    'headers': {
      "Content-Type": "application/json"
    },
    'body': JSON.stringify({})
  });
  
  // Get response in JSON format.
  let result = await response.json();
  
  // Return the response.
  return result;
}

function redraw(data) {
  // Select table and get current row count.
  let table = document.querySelector("table");
  let row_count = table.rows.length;
  
  // Delete all current rows except header row.
  for(let i = row_count - 1; i > 0; i--) {
    table.deleteRow(i)
  }
  
  // Add the response data to the table.
  for(let i = 0; i < data.length; i++) {
    let current_data = data[i]
    let row = table.insertRow(i + 1);
    row.insertCell(0).innerHTML = current_data['number1']
    row.insertCell(1).innerHTML = current_data['number2']
    row.insertCell(2).innerHTML = current_data['number3']
    row.insertCell(3).innerHTML = current_data['sum']
  }
}

window.onload = async function () {
  // Add submit button behavior.  
  let submit_button = document.querySelector("#submit-button");
  submit_button.onclick = async (event) => {
    validate();
    redraw(await submit(event));
    reset();
  };
  
  // Add clear button behavior.  
  let clear_button = document.querySelector("#clear-button");
  clear_button.onclick = async (event) => {
    redraw(await clear(event));
  };
  
  // Add double button behavior.  
  let double_button = document.querySelector("#double-button");
  double_button.onclick = async (event) => {
    redraw(await double(event));
  };
  
  // Fetch the current data from the server and display it.
  validate();
  redraw(await submit(event));
};
