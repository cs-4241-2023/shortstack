// FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event ) {
  event.preventDefault()
  let tournamentName = document.querySelector('#tourname');
  let numberOfPlayers = document.querySelector('#playernum');
  let bracketType = document.querySelector('#btypes');
  
  if(tournamentName.value===''||numberOfPlayers.value===''||bracketType.value==='')
  {
    alert('Please fill in all fields');
    return false;
  }

  json = {
    name: tournamentName.value,
    number: numberOfPlayers.value,
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
  for(let i =1; i<=64; i++)
  {
    if(Math.pow(2,i)!==submit.numberOfPlayers)
    {
      let bTypes = document.getElementById("btypes");
      let options = bTypes.options;
      for(let j =0; i<options.length; j++)
      {
        if(options[j].text == "Single Elimination"||options[i].text == "Double Elimination")
        {
          options[j].disabled = true;
        }
      }
    }
    else 
        {
          options[1].disabled = false;
          options[2].disabled = false;
          options[3].disabled = false;
        }
  }
}
