// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  //id associated w/ input is how you get the value of the input
  //querySelector links to html using ID, tag name or class name; assign html tag an ID, 
  //also getElementByID
  const input = document.querySelector( '#yourname' ), //# is in front of ID name 
        json = { yourname: input.value }, //json is how you want to package data before sending it to front end
        //{attribute : value}
        body = JSON.stringify( json ) 
  
  const response = await fetch( '/submit', {
    method:'POST', 
    body
  })

  const data = await response.json()

  const list = document.createElement('ul')
//map runs through every item you pass through it and performs an operation, creates a new array + populates
//it with all the items from the previous array with some operation applied to it

  
  data.forEach( d => {
    const item = document.createElement('li')
    item.innerHTML = `<b>model</b> : ${d.model}, <b>mpg</b>: ${d.mpg}`
    list.appendChild( item )
  })
  
  document.body.appendChild( list )
  
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}