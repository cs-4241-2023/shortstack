'use strict'

// CLIENT CODE

let list = undefined;
const submit = async function (event) {  
  event.preventDefault(); // stop page from reloading when form is submitted

  const name = document.querySelector('#yourname'), // get form input element with id=yourname
    color = document.querySelector('#color')

  let json = {}  // create json object
  json.name = name.value // add name
  json.color = color.value // add color
  let min = Math.ceil(0);
  let max = Math.floor(100);
  json.score = Math.floor(Math.random() * (max - min) + min); // add random score for now

  let clientData = JSON.stringify(json) // create json string from json object

  const response = await fetch('/submit', { // send client data to server 
    method: 'POST',
    body: clientData // set body of request to clientData json string
  })

  let serverData = await response.json() // get json string from server response
  console.log('SERVER DATA (after add player):')
  console.log(serverData) // print json string to console
   populateList(serverData);
}

function populateList(serverData) {

  // Remove list from body of html
  list = document.getElementById('playerList');
  if (list) {
    list.remove();
  }

  list = document.createElement('ol'); // create ordered list element 
  list.id = 'playerList';
  document.body.appendChild(list); // append list to body of html

  serverData.forEach(d => { // for each element in json string, create a list item and append to list

    const item = document.createElement('li')

    // add edit button
    const editButton = document.createElement('button')
    editButton.innerHTML = 'edit'
    editButton.class = 'editButton'


    // add delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'delete'
    deleteButton.class = 'deleteButton'

    // Server Data to be displayed in list item
    item.innerHTML = `Name: ${d.name}, Color: ${d.color}, Score: ${d.score}, Rank: ${d.rank}`
    item.className = 'player'
    item.id = `${d.name}`; // set id of list item to name of player

    // Add buttons in li item
    item.appendChild(editButton)
    item.appendChild(deleteButton)

    list.appendChild(item)
  })
}

window.onload = function () {
  const playbutton = document.querySelector('#playbutton');
  playbutton.onclick = submit;

  // Delete button clicked
  document.addEventListener('click', function (e) {
    if (e.target && e.target.class == 'deleteButton') {
      let player = e.target.closest('.player');
      // Call the deletePlayer function with the player name
      deletePlayer(player.id);
    }
  });

  // Edit button clicked
  document.addEventListener('click', function (e) {
    if (e.target && e.target.class == 'editButton') {
      let player = e.target.closest('.player');
      // Call the editPlayer function with the player name
      editPlayer(player.id);
    }
  });
}

async function editPlayer(playerName) {
  let newName = prompt("Please enter new name:", "New Name");
  if (newName == null || newName == "") {
    alert("Player name not changed");
  } else {
    let json = {}  // create json object
    json.name = playerName // add name
    json.newName = newName // add new name

    const response = await fetch('/edit', {
      method: 'PUT',
      body: JSON.stringify(json)
    })

    let serverData = await response.json() // get json string from server response
    console.log('SERVER DATA (after edit):');
    console.log(serverData); // print json string to console
    populateList(serverData);
  }
}



async function deletePlayer(playerName) {
  let json = {}  // create json object
  json.name = playerName // add name

  // let playerNameJSON = JSON.stringify(playerName) // create json string 
  const response = await fetch('/delete', {
    method: 'DELETE',
    body: JSON.stringify(json)
  })

  let serverData = await response.json() // get json string from server response
  console.log('SERVER DATA (after delete):');
  console.log(serverData); // print json string to console
  populateList(serverData);
}
