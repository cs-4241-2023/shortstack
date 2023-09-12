const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const json = { 
    playerName: document.getElementById("playerName").value,
    gamesPlayed: document.getElementById("gamesPlayed").value,
    totalPoints: document.getElementById("totalPoints").value,
    totalRebounds: document.getElementById("totalRebounds").value,
    totalAssists: document.getElementById("totalAssists").value
  },
    body = JSON.stringify(json)

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
  const newPlayerData = JSON.parse(text)
  populateTable(newPlayerData)
}

window.onload = async function() {

  const response = await fetch( '/appdata', {
    method:'GET',
  })

  const text = await response.text()

  console.log( 'text:', text )
  const players = JSON.parse(text)
  populateTable(players)
  const playerTable = document.getElementById("playerTable")
  const button = document.querySelector("button");
  button.onclick = submit;
  
}

function populateTable(data) {
  console.log('in populateTable')
  const playerTable = document.getElementById("playerTable")
  data.forEach(object => {
    const row = document.createElement('tr')
    row.innerHTML = '<td>' + object.playerName + '</td>' +
    '<td>' + object.gamesPlayed + '</td>' +
    '<td>' + object.totalPoints + '</td>' +
    '<td>' + object.totalRebounds + '</td>' +
    '<td>' + object.totalAssists + '</td>' +
    '<td>' + object.pointsPerGame + '</td>' +
    '<td>' + object.reboundsPerGame + '</td>' +
    '<td>' + object.assistsPerGame + '</td>';
    playerTable.appendChild(row)

  })
}