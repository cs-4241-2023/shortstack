//FRONT-END (CLIENT) JAVASCRIPT FOR NEW MUSIC SUBMISSIONS HERE
const submissionInfo = document.getElementById("submissionInfo")
const submissionInfoParagraph = document.createElement('p')
const additionalInfoParagraph = document.createElement('p')

function setSubmissionInfoID() {
  submissionInfoParagraph.setAttribute('id', 'submissionInfoPresent')
}

function setAdditionalInfoID() {
  additionalInfoParagraph.setAttribute('id', 'additionalInfoPresent') 
}

function removeChild(child) {
  submissionInfo.removeChild(child)
}

const additionSubmit = async function(event) { //The async keyword here means that submit always returns a promise. It also means that one or more await keywords are allowed inside the function body.
  
  if(document.getElementById("submissionInfoPresent") !== null) {
    console.log("Child will be removed")
    removeChild(submissionInfoParagraph)
  }
  
  if(document.getElementById("additionalInfoPresent") !== null) {
    console.log("child will be removed")
    removeChild(additionalInfoParagraph)
  }

  //preventDefault cancels an event as long as it is cancelable.
  //stop form submission from trying to load
  //a new .html page for displaying results...
  //this was the original browser behavior and still
  //remains to this day
  event.preventDefault()

  //Take in three different inputs
  //Create object using key-value pairs  
  
  const currentYear = 2023
  const startingYear = 0

  const bandInput = document.querySelector('#bandname') //query the HTML file for the first element that uses id yourname
  const albumInput = document.querySelector('#albumname')
  const releaseYearInput = document.querySelector('#releaseyear')

  //Proper format of JSON when there is a list of objects: [{a1:o1}, {a2:o2}, {a3:o3}]
  //The structure of the object before stringification and parsing should match the structure of an object entry in the destination array.
  let inputObj = {bandname: bandInput.value, albumname: albumInput.value, releaseyear: releaseYearInput.value}
  console.log(inputObj.releaseyear)

  if(inputObj.releaseyear < startingYear) {
    submissionInfoParagraph.innerHTML = `<strong>The music you submitted cannot be sent to the server</strong>: ${inputObj.releaseyear} is not a valid year.`
    submissionInfo.appendChild(submissionInfoParagraph)
    setSubmissionInfoID()
  }
  else if(inputObj.releaseyear > currentYear) {
    submissionInfoParagraph.innerHTML = `<strong>The music you submitted cannot be sent to the server</strong>: ${inputObj.albumname} has not been released yet.`
    submissionInfo.appendChild(submissionInfoParagraph)
    setSubmissionInfoID()
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

    const response = await fetch('/submitForAddition', { //wait until the fetch of the response to the form submit resolves to store the response.
      method:'POST', //pass in the HTTP method (so sending new data to server through POST)
      body //pass in the response body
    })
  
    const data = await response.json() //Here, JSON is parsed to produce a JavaScript object
    const latestDataEntry = data[data.length - 1]

    //Template literals
    submissionInfoParagraph.innerHTML = `<strong>Here is the music saved in the server memory</strong>: Band Name: ${latestDataEntry.bandName}, Album Name: ${latestDataEntry.albumName}, Release Year: ${latestDataEntry.releaseYear}`
    additionalInfoParagraph.innerHTML = `<strong>And here is the age of</strong> ${latestDataEntry.albumName}: ${latestDataEntry.albumAge}`

    submissionInfo.appendChild(submissionInfoParagraph)
    submissionInfo.appendChild(additionalInfoParagraph)
    setSubmissionInfoID()  
    setAdditionalInfoID()
  }
}

window.addEventListener('load', function() { //At the time the window loads, query the HTML document for the first button element. Then, on the left-mouse click of the button submit the form.
  const submitMusicButton = document.getElementById("submitMusic")
  submitMusicButton.onclick = additionSubmit
})


