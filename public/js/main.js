// FRONT-END (CLIENT) JAVASCRIPT HERE

const playerSubmit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  
  
  const input1 = document.querySelector( '#player1' ),
        input2 = document.querySelector( '#player2' ),
        json = { Player1Guess: input1.value, Player2Guess: input2.value  },
        body = JSON.stringify( json )
  


  const response = await fetch("/submit", {
        method: "POST",
        body
      });


  const compNumber = Math.floor(Math.random() * 11);
  const list = document.createElement('ul')
  const text = await response.json()
   if (input2.value === compNumber && input1.value === compNumber){
    const winnerMessage = document.createElement('li')
    winnerMessage.innerText = 'Congrats, both players got the right guess of ${input1.value}'
    list.appendChild(winnerMessage)
    document.body.appendChild(list)
     console.log(compNumber)
  } else if (input2.value === compNumber){
    const winnerMessage = document.createElement('li')
    winnerMessage.innerText = 'Congrats, Player Two is the winner. Both Player One and the Computer Guessed ${input2.value}'
    list.appendChild(winnerMessage)
    document.body.appendChild(list)
  } else if(input1.value === compNumber){
    const winnerMessage = document.createElement('li')
    winnerMessage.innerText = 'Congrats, Player One is the winner. Both Player One and the Computer Guessed ${input1.value}'
    list.appendChild(winnerMessage)
    document.body.appendChild(list)
  } else {
    const winnerMessage = document.createElement('li')
    winnerMessage.innerText = 'Congrats, both players got the right guess of ${input1.value}'
    list.appendChild(winnerMessage)
    document.body.appendChild(list)
  }
 
  console.log( 'text:', text )
  
  document.getElementById("player1").value = ""
  document.getElementById("player2").value = ""
  

}


window.onload = function() {
  const buttonOne = document.querySelector("#submit");
  buttonOne.onclick = playerSubmit;

}