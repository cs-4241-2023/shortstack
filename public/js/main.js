// FRONT-END (CLIENT) JAVASCRIPT HERE
//For form functionality - so posting new data to the server - we want to use async and await

const submit = async function(event) { //The async keyword here means that submit always returns a promise. It also means that one or more await keywords are allowed inside the function body.
  
  //preventDefault cancels an event as long as it is cancelable.
  //stop form submission from trying to load
  //a new .html page for displaying results...
  //this was the original browser behavior and still
  //remains to this day
  event.preventDefault()
  
  const input = document.querySelector('#yourname'), //query the HTML file for the first element that uses id yourname
        json = {yourname: input.value}, //declare a json constant using a key value pair with the key being yourname and the value being the value of the input HTML element queried in the document.
        body = JSON.stringify(json) //stringify converts a value to a JSON string. Assign the body to this JSON string.

  //Take in three different inputs
  //Append strings from JSON to assign body - all form inputs  
  //git ignore node modules

  //await works only inside async functions. 
  //await keyword makes JavaScript wait until the promise resolves.
  //fetch method goes as follows: let promise = fetch(url, [options])
    //URL
    //Optional parameters include method, headers, and more.
  
  //We have two promises here:
    //The response to the form submit
    //The text of the response body

  const response = await fetch('/submit', { //wait until the fetch of the response to the form submit resolves to store the response.
    method:'POST', //pass in the HTTP method (so sending new data to server through POST)
    body //pass in the response body
  })
  
  const data = await response.json()

  const list = document.createElement('ul')
  
  data.forEach(d => {
    const item = document.createElement('li')
    item.innerHTML = `<strong>Band Name</strong>: ${d.bandName}, <strong>Album Name</strong>: ${d.albumName}, <strong>Release Year</strong>: ${d.releaseYear}` //Template literal example
    list.appendChild(item)
  })
  
  document.body.appendChild(list)
}

window.onload = function() { //At the time the window loads, query the HTML document for the first button element. Then, on the left-mouse click of the button submit the form.
   const button = document.querySelector("button");
   button.onclick = submit;
}