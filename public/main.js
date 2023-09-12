// FRONT-END (CLIENT) JAVASCRIPT HERE

function createTable(tableData){
  //Container
  const displayTable = document.createElement('div')
  displayTable.classList.add("container")

  //Header Row
  const headers = document.createElement('div')
  headers.classList.add("row")

  const header1 = document.createElement('div')
  header1.classList.add("hcell")
  header1.innerText = 'Player'
  headers.appendChild(header1)

  const header2 = document.createElement('div')
  header2.classList.add("hcell")
  header2.innerText = 'Player Guess'
  headers.appendChild(header2)
  
  const header3 = document.createElement('div')
  header3.classList.add("hcell")
  header3.innerText = 'Player Win?'
  headers.appendChild(header3)

  const header4 = document.createElement('div')
  header4.classList.add("hcell")
  header4.innerText = 'Computer Guess'
  headers.appendChild(header4)

  displayTable.appendChild(headers)
  //Player Rows
  tableData.forEach(e => {
    console.log(e.Player)
    if(e.Player === '1'){
      const player1 = document.createElement('div')
      player1.classList.add('row')

      const p1Name = document.createElement('div')
      p1Name.classList.add("cellName")
      p1Name.innerText = '1'
      player1.appendChild(p1Name)

      const p1Number = document.createElement('div')
      p1Number.classList.add("cellGuess")
      p1Number.innerText = `${e.PlayerGuess}`
      player1.appendChild(p1Number)

      const p1Winner = document.createElement('div')
      p1Winner.classList.add("cellResult")
      p1Winner.innerText = `${e.isWinner}`
      player1.appendChild(p1Winner)

      const answer = document.createElement('div')
      answer.classList.add("cellGuess")
      answer.innerText = `${e.isWinner}`
      player1.appendChild(answer)

      displayTable.appendChild(player1)
    } else {
      const player2 = document.createElement('div')
      player2.classList.add('row')

      const p2Name = document.createElement('div')
      p2Name.classList.add("cellName")
      p2Name.innerText = '2'
      player2.appendChild(p2Name)

      const p2Number = document.createElement('div')
      p2Number.classList.add("cellGuess")
      p2Number.innerText = `${e.PlayerGuess}`
      player2.appendChild(p2Number)

      const p2Winner = document.createElement('div')
      p2Winner.classList.add("cellResult")
      p2Winner.innerText = `${e.isWinner}`
      player2.appendChild(p2Winner)

      const answer = document.createElement('div')
      answer.classList.add("cellGuess")
      answer.innerText = `${e.CompGuess}`
      player2.appendChild(answer)
      
      displayTable.appendChild(player2)
    }
  });
  document.body.appendChild(displayTable)
}

const playerSubmit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  
  
  const input1 = document.querySelector( '#player1' ),
        input2 = document.querySelector( '#player2' ),
        compNumber = Math.floor(Math.random() * 11),
        json = { Player1Guess: input1.value, Player2Guess: input2.value, ComputerGuess:compNumber  },
        body = JSON.stringify( json )
  


  const response = await fetch("/submit", {
        method: "POST",
        body
      })
      const update = await response.json();
      createTable(update)
      
      console.log(update)


  
  document.getElementById("player1").value = ""
  document.getElementById("player2").value = ""
  

}



window.onload = function() {
  const buttonOne = document.querySelector("#submit");
  buttonOne.onclick = playerSubmit;

}