// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const index = document.querySelector('#id').value,
        name = document.querySelector('#yourname').value,
        username = document.querySelector('#username').value,
        email = document.querySelector('#email').value,
        position = document.querySelector('#position').value,
        json = {id: index, yourname: name, username: username, email: email, position: position},
        body = JSON.stringify( json )

  
  const response = await fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  });


if (response.ok) {
  // Data was successfully submitted
  const text = await response.text();
  console.log('Server response:', text);

  // Clear form fields after submission
  document.querySelector('#yourname').value = 'Your real name here.';
  document.querySelector('#username').value = 'Your gamertag here.';
  document.querySelector('#email').value = 'Your email here.';
  document.querySelector('#position').value = 'What\'s your position?';

  // Refresh the table to display updated data
  updateTable();
} else {
  console.error('Error submitting data to the server');
}
};


// Function to update the table with data from the server
const updateTable = async function() {
  const response = await fetch('/get');

  if (response.ok) {
    const data = await response.json();
    console.log('Table data:', data);
    const id = document.querySelector('#id');
    id.value = data.length + 1;
    console.log('Next ID:', id.value);
    // Call a function to populate/update the table with the received data
    populateTable(data);
  } else {
    console.error('Error fetching data from the server');
  }
};

// Function to populate/update the table with received data
const populateTable = function(data) {
  const tableBody = document.querySelector('#table-body');
  tableBody.innerHTML = ''; // Clear existing table rows [May delete this line]



  data.forEach(function(player) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td> <input type="radio" id="html_${player.index}" name="delete" value="${player.index}"></td>
      <td>${player.yourname}</td>
      <td>${player.username}</td>
      <td>${player.email}</td>
      <td>${player.position}</td>
    `;
    tableBody.appendChild(row);
  });
};

// Function to delete a player from the table
const deletePlayer = async function() {
  const index = document.querySelector('input[name="delete"]:checked').value;
  console.log('Deleting player with index:', index);
  const response = await fetch('/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index: index })
  })
  updateTable();
};

// Function to edit a player in the table.
// const editPlayer = async function() {
//   const index = document.querySelector('input[name="delete"]:checked').value;
//   console.log('Editing player with index:', index);
//   const response = await fetch('/edit', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ index: index })
//   })
//   updateTable();
// };


window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
  updateTable();
}