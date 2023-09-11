// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault() // Prevents default browser behavior
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.json()
  
  const list = document.createElement('ul')
  
  data.forEach( d => {
    const item = document.createElement('li')
    item.innerHTML = `<b>model</b>: ${d.model}, <b>mpg</b>: ${d.mpg}`
    list.appendChild( item )
  })
  
  document.body.appendChild( list )
}

window.onload = function() {
   const button = document.getElementsByClassName("submit");
  button.onclick = submit();
}