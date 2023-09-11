// FRONT-END (CLIENT) JAVASCRIPT HERE
let list = null;
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const name = document.querySelector( '#yourname' ), // get form input element with id=yourname
        color = document.querySelector( '#color' )
        
        json = {}  // create json object
        json.name = name.value // add name
        json.color = color.value // add color

        console.log( 'printing json object:')
        console.log( json) // print json object to console
        clientData = JSON.stringify( json ) // create json string from json object
  
  const response = await fetch( '/submit', { // send client data to server to /submit path??
    method:'POST',
    body: clientData // set body of request to clientData json string
  })

  let data = await response.json() // get json string from server response

  // only create 1 list element the first time submit is clicked
  // then just add list items to the list
  

if (document.getElementById('playerList') == null) {
  list = document.createElement('ul') // create unordered list element in html
  list.id = 'playerList'
  populateList(data)
} else {
  document.getElementById('playerList').innerHTML = ''
  populateList(data)
}

function populateList(data) {
  data.forEach( d => { // for each element in json string, create a list item and append to list
    
  // look through list and if name already exists, don't add new item
  // check if high score is higher than existing high score
  if (list.innerHTML.includes(d.name)) {
    console.log('name already exists')
    return
  }

    const item = document.createElement('li')

    // add edit button
    const editButton = document.createElement('button')
    editButton.innerHTML = 'edit'

    // add delete button
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'delete'
    deleteButton.id = 'deleteButton'

    // Data to be displayed in list item
    item.innerHTML = `<b>Name</b> : ${d.name}, <b>Color</b>: ${d.color}, <b>High Score: </b> ${d.highscore}`
    // add high sch
    item.id = 'player'

    // Add buttons in li item
    item.appendChild(editButton)
    item.appendChild(deleteButton)

    list.appendChild( item )
    // add edit and delete buttons after list item
    // list.appendChild( editButton )
  })
}
  document.body.appendChild( list )

  
}

window.onload = function() {
  const playbutton = document.querySelector('#playbutton');
  playbutton.onclick = submit;



  // if delete button is clicked, delete list item
  document.addEventListener('click', function(e) {
    if (e.target && e.target.id == 'deleteButton') {
      console.log('delete button clicked');
      let listItem = e.target.closest('#player');
      console.log(`listItem: ${listItem}`);

      if (listItem) {
        listItem.remove();
      }

      deletePlayer(listItem.name);
    }
  });

  // if edit button is clicked
  
  
}


function deletePlayer(playerName){
   // delete from server
   console.log(`Request Server to delete player: ${playerName}`)
   const response = fetch( '/delete', {
    method:'DELETE',
    body: playerName
  })
}