// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const taskName= document.querySelector( '#taskName' ),
        dueDate= document.querySelector('#dueDate'),
        taskPriority= document.querySelector('#taskPriority')
        json = { tasks: taskName.value , date: dueDate.value , priority: taskPriority.value },
        body = JSON.stringify( json )
  fetch( '/submit', {
    method:'POST',
    body 
  }).then(async function (response){ //console.log(response)
    console.log("hello world")
    let data= await response.json()
    console.log(data)
  })
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}