document.addEventListener("DOMContentLoaded", function () {
  // FRONT-END (CLIENT) JAVASCRIPT HERE


  // Submit Button Functionality
  // TODO:
  // Make POST request based on input data
  // Add to appdata const in sever js
  const submit = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    let body = user_form_data();

    if (body !== "") {
      const response = await fetch('/submit', {
        method: 'POST',
        body
      })

      const text = await response.text()

      console.log('Post Request Status:', text)
    }
  }

  window.onload = function () {
    const submitButton = document.getElementById("submit");
    submitButton.onclick = submit;

    const refreshButton = document.getElementById("refresh");
    refreshButton.onclick = build_table;
  }

  const year_input = document.getElementById("year");
  const make_input = document.getElementById("car_make");
  const model_input = document.getElementById("model");
  const service_type_input = document.getElementById("service-type");
  const appointment_data_input = document.getElementById("appointment-date");

  function user_form_data() {
    if (validate_form_input) {
      user_vehicle_json_data = {
        year: year_input.value,
        car_make: make_input.value,
        model: model_input.value,
        service_type: service_type_input.value,
        appointment_date: appointment_data_input.value,
      }
      let body = JSON.stringify(user_vehicle_json_data)
      return body;
    } else {
      alert("Please fill out all fields");
      return "";
    }
  }

  function validate_form_input() {
    if (year_input.value === "" || make_input.value === ""
      || model_input.value === "" || service_type_input.value === ""
      || appointment_data_input.value === "") {

      // Add additional validation checks here
      // for the different input fields

      return false;
    } else {
      return true;
    }
  }

  // Makes a 'GET' request to server data and adds elements to client table
  const build_table = async function (event) {
    event.preventDefault();
    try {
      fetch('/req-server-data', {
        method: 'GET',
      }).then((response) => response.json())
        .then((server_data) => {
          // check if there is available data on the server
          if (server_data.length === 0) {
            console.log("No table data available to display");
          } else {
            console.log(server_data);
            var vehicle_data_table = document.getElementById("myTable");
            vehicle_data_table.getElementsByTagName("tbody")[0].innerHTML = vehicle_data_table.rows[0].innerHTML; // clear current table elements

            // TRAVERSE THROUGH JSON OBJECTS STORED ON SERVER
            for (var i = 0; i < Object.entries(server_data).length; i++) {
              var data_row = vehicle_data_table.insertRow(-1);
              var prop_index = 0;
              for (var prop_name in server_data[i]) {
                // build rows
                var cell = data_row.insertCell(prop_index);
                cell.innerHTML = server_data[i][prop_name];
                prop_index++;
                console.log(server_data[i][prop_name]);
              }
            }

          }
        });
    } catch (error) {
      alert('An error occurred while fetching server data!');
    }
  }
});