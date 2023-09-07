// FRONT-END (CLIENT) JAVASCRIPT HERE

const playerOneSubmit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#player1' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
}

const playerTwoSubmit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#player2' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.text()

  const list = document.createElement('ul')

  let count = 0
  data.forEach( d => {
    count = count + 1
    if(count === 1) {
      const item = document.createElement('li')
      item.innerText = ( )
      list.appendChild(item)
    } else {
      
    }
  })

  console.log( 'text:', text )
}

window.onload = function() {
  const buttonOne = document.querySelector("p1submit");
  buttonOne.onclick = playerOneSubmit;

  const buttonTwo = document.querySelector("p2submit");
  buttonTwo.onclick = playerTwoSubmit;
}