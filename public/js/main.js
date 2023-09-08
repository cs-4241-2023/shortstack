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
  //# is in front of ID name 
        
  
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const startInput = document.querySelector('#startDate');
const finishInput = document.querySelector('#dateFinished');
const json = { title: titleInput.value,
         author: authorInput.value, 
         startDate: startInput.value,
         dateFinished: finishInput.value
}; //json is how you want to package data before sending it to front end
  //{attribute : value}
const body = JSON.stringify( json ); 

const response = await fetch( '/submit', {
    method:'POST', 
    body
  })

  const data = await response.json()

  const list = document.createElement('ul')

//map runs through every item you pass through it and performs an operation, creates a new array + populates
//it with all the items from the previous array with some operation applied to it
  console.log(data)
  //data.map( d => d.title) 
  //.map(d => d.toUpperCase()+d.slice(1))
  data.forEach(d => {
    const li = document.createElement('li')
    li.innerText = "Title: " + d.title + "\nAuthor: " + d.author + "\nStart Date: " + d.startDate + "\nFinish Date: " + d.dateFinished
    
    list.appendChild(li)
  })
  document.body.appendChild( list )

}



window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
