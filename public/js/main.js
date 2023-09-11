// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  event.preventDefault()
  let tournamentName = document.querySelector('#tourname');
  let numberOfPlayers = document.querySelector('#playernum');
  let bracketType = document.querySelector('#btypes');
  
  if(tournamentName.value===''||numberOfPlayers.value==='')
  {
    console.error('Please fill in all fields');
    return false;
  }

  json = {
    name: tournamentName.value,
    number: parseInt(numberOfPlayers.value),
    type: bracketType.value,
  },

  body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  });

  if (!response.ok) {
    console.error("Failed");
    return;
  }

  const form = document.querySelector("form");
  form.reset();

  const data = await response.json()
  console.log( 'json:', json )
  
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}

function editOptions() {
  let bTypes = document.getElementById("btypes");
  let options = bTypes.options;
  for(let i =1; i<=7; i++)
  {
    let bTypes = document.getElementById("btypes");
    let options = bTypes.options;
    if(Math.pow(2,i)!==parseInt(document.querySelector('#playernum').value))
    {
      for(let j =0; i<options.length; j++)
      {
        let bTypes = document.getElementById("btypes");
        let options = bTypes.options;
        if(bTypes.options[j].value == "Single Elimination"||options[j].text == "Double Elimination")
        {
          options[j].disabled = true;
        }
      }
    }
    else 
        {
          let bTypes = document.getElementById("btypes");
          let options = bTypes.options;
          options[0].disabled = false;
          options[1].disabled = false;
          options[2].disabled = false;
        }
  }
}

function updatePlayerForm() {
  const numPlayers = document.getElementById("playernum").value;
  const playerNamesContainer = document.getElementById("playerNames");

  // Remove any existing player name inputs
  while (playerNamesContainer.firstChild) {
    playerNamesContainer.removeChild(playerNamesContainer.firstChild);
  }

  // Add new player name inputs based on the selected number of players
  for (let i = 1; i <= numPlayers; i++) {
    const playerNameInput = document.createElement("input");
    playerNameInput.type = "text";


    playerNamesContainer.appendChild(playerNameInput);
  }
}
