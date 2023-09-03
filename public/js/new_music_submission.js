//FRONT-END (CLIENT) JAVASCRIPT FOR NEW MUSIC SUBMISSIONS HERE

const additionSubmit = async function(event) { //The async keyword here means that submit always returns a promise. It also means that one or more await keywords are allowed inside the function body.
  
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

  const submissionInfo = document.getElementById("submissionInfo")
  const submissionInfoParagraph = document.createElement('p')
  const additionalInfoParagraph = document.createElement('p')

  //Proper format of JSON when there is a list of objects: [{a1:o1}, {a2:o2}, {a3:o3}]
  //The structure of the object before stringification and parsing should match the structure of an object entry in the destination array.
  let inputObj = {bandname: bandInput.value, albumname: albumInput.value, releaseyear: releaseYearInput.value}
  console.log(inputObj.releaseyear)

  if(inputObj.releaseyear < 0) {
    submissionInfoParagraph.innerHTML = `<strong>The music you submitted cannot not be sent to the server</strong>: ${inputObj.releaseyear} is not a valid year.`
    submissionInfo.appendChild(submissionInfoParagraph)
  }
  else if(inputObj.releaseyear > 2023) {
    submissionInfoParagraph.innerHTML = `<strong>The music you submitted cannot be sent to the server</strong>: ${inputObj.albumname} has not been released yet.`
    submissionInfo.appendChild(submissionInfoParagraph)
  }
  else {
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
    const latestDataEntry = data[data.length - 1]

    //Template literals
    submissionInfoParagraph.innerHTML = `<strong>Here is the music you submitted</strong>: Band Name: ${latestDataEntry.bandName}, Album Name: ${latestDataEntry.albumName}, Release Year: ${latestDataEntry.releaseYear}`
    additionalInfoParagraph.innerHTML = `<strong>And here is the age of</strong> ${latestDataEntry.albumName}: ${latestDataEntry.albumAge}`

    submissionInfo.appendChild(submissionInfoParagraph)
    submissionInfo.appendChild(additionalInfoParagraph)   
  }
}

window.addEventListener('load',function() { //At the time the window loads, query the HTML document for the first button element. Then, on the left-mouse click of the button submit the form.
   const submitMusicButton = document.getElementById("submitMusic");
   submitMusicButton.onclick = additionSubmit;
})