// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function(event) { //The async keyword here means that submit always returns a promise. It also means that one or more await keywords are allowed inside the function body.
  
  //preventDefault cancels an event as long as it is cancelable.
  //stop form submission from trying to load
  //a new .html page for displaying results...
  //this was the original browser behavior and still
  //remains to this day
  event.preventDefault()

  //Take in three different inputs
  //Create object using key-value pairs  
  
  const bandInput = document.querySelector('#bandname') //query the HTML file for the first element that uses id yourname
  const albumInput = document.querySelector('#albumname')
  const releaseYearInput = document.querySelector('#releaseyear')

  //Proper format of JSON when there is a list of objects: [{a1:o1}, {a2:o2}, {a3:o3}]
  let inputObj = {bandname: bandInput.value, albumname: albumInput.value, releaseyear: releaseYearInput.value}
  const body = JSON.stringify(inputObj)

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
  const latestSubmission = data[data.length - 1]
  const paragraph = document.createElement('p')

  //Template literal
  paragraph.innerHTML = `<strong>Here is the music you submitted</strong>: Band Name: ${latestSubmission.bandName}, Album Name: ${latestSubmission.albumName}, Release Year: ${latestSubmission.releaseYear}`

  document.body.appendChild(paragraph)
}

window.onload = function() { //At the time the window loads, query the HTML document for the first button element. Then, on the left-mouse click of the button submit the form.
   const button = document.querySelector("button");
   button.onclick = submit;
}