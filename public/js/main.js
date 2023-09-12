'use strict'


// FRONT-END (CLIENT) JAVASCRIPT HERE
let list = undefined;
const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const name = document.querySelector('#yourname'), // get form input element with id=yourname
    color = document.querySelector('#color')

  let json = {}  // create json object
  json.name = name.value // add name
  json.color = color.value // add color
  let min = Math.ceil(0);
  let max = Math.floor(100);
  json.score = Math.floor(Math.random() * (max - min) + min); // add random score for now

  console.log('printing client json object:')
  console.log(json) // print json object to console
  let clientData = JSON.stringify(json) // create json string from json object

  const response = await fetch('/submit', { // send client data to server 
    method: 'POST',
    body: clientData // set body of request to clientData json string
  })

  let serverData = await response.json() // get json string from server response
  console.log('printing server json object:')
  console.log(serverData) // print json string to console

   // create a new list element
  //  list = document.createElement('ol'); // create ordered list element in html
  //  list.id = 'playerList';
 
  //  if (document.getElementById('playerList') == null) {
  //    // Append the new list to the body of the HTML
  //    document.body.appendChild(list);
  //  }

  clearList();
   populateList(serverData);

   // old version
  // if (document.getElementById('playerList') == null) {
  //   list = document.createElement('ol') // create ordered list element in html
  //   list.id = 'playerList'
  //   populateList(serverData)
  // } else {
  //   document.getElementById('playerList').innerHTML = '';
  //   populateList(serverData)
  // }
  // document.body.appendChild(list) // append list to body of html
}

function populateList(serverData) {

  list = document.createElement('ol'); // create ordered list element 
  list.id = 'playerList';
  document.body.appendChild(list); // append list to body of html

  serverData.forEach(d => { // for each element in json string, create a list item and append to list

    // look through list and if name already exists, don't add new item
    // check if high score is higher than existing high score
    // if (list.innerHTML.includes(d.name)) {
    //   console.log('name already exists')
    //   alert(`Player name ${d.name} already exists. Please enter a different name.`);
    //   return; 
    // }  

    const item = document.createElement('li')

    // add edit button
    const editButton = document.createElement('button')
    editButton.innerHTML = 'edit'

    // add delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'delete'
    deleteButton.id = 'deleteButton'

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


  // if delete button is clicked, delete list item
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'deleteButton') {
      console.log('delete button clicked');
      let player = e.target.closest('.player');

        // Call the deletePlayer function with the player name
        deletePlayer(player.id);
    }

  });

  // if edit button is clicked
  document.addEventListener('click', function (e) {
    if (e.target && e.target.innerHTML == 'edit') {
      console.log('edit button clicked');
      let player = e.target.closest('.player');

      // Call the editPlayer function with the player name
      editPlayer(player.id);
    }

  });
}


async function editPlayer(playerName) {
  // edit player name
  console.log(`Request Server to edit player: ${playerName}`)
  let newName = prompt("Please enter new name:", "New Name");
  if (newName == null || newName == "") {
    alert("Player name not changed");
  } else {
    console.log(`New name: ${newName}`);
    let json = {}  // create json object
    json.name = playerName // add name
    json.newName = newName // add new name

    const response = await fetch('/edit', {
      method: 'PUT',
      body: JSON.stringify(json)
    })

    let serverData = await response.json() // get json string from server response
    console.log('printing NEW server json object:');
    console.log(serverData); // print json string to console
    clearList();
    populateList(serverData);
  }
}



async function deletePlayer(playerName) {
  // delete from server
  console.log(`Request Server to delete player: ${playerName}`)

  let json = {}  // create json object
  json.name = playerName // add name

  // let playerNameJSON = JSON.stringify(playerName) // create json string 
  const response = await fetch('/delete', {
    method: 'DELETE',
    body: JSON.stringify(json)
  })

  let serverData = await response.json() // get json string from server response
  console.log('printing NEW server json object:');
  console.log(serverData); // print json string to console
  clearList();
  populateList(serverData);
}

function clearList() {
  // clear the old list, removes all list items
  list = document.getElementById('playerList');
  if (list) {
    list.remove();
  }
}