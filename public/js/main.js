// FRONT-END (CLIENT) JAVASCRIPT HERE
document.addEventListener('DOMContentLoaded', function () {


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
const submitButton = document.querySelector('button');

if (!titleInput.value.trim() || !authorInput.value.trim() || !startInput.value.trim() || !finishInput.value.trim()) {
  submitButton.disabled = true;

  console.log('Please fill in all fields');
}
submitButton.disabled = false;


const itemIdentifier = titleInput.value + authorInput.value + startInput.value + finishInput.value;

const startDate = new Date(startInput.value);
const finishDate = new Date(finishInput.value);

const timeDif = finishDate - startDate;
const msDay = 24 * 60 * 60 * 1000;
const msMonth = 30.44 * msDay;
const msYear = 365.25 * msDay;

const years = Math.floor(timeDif / msYear);
const remainingTimeAfterYears = timeDif % msYear;

const months = Math.floor(remainingTimeAfterYears / msMonth);
const remainingTimeAfterMonths = remainingTimeAfterYears % msMonth;
const days = Math.floor(remainingTimeAfterMonths / msDay);

const formattedTime = `${years} Year(s), ${months} Month(s), ${days} Day(s)`;
const json = { title: titleInput.value,
         author: authorInput.value, 
         startDate: startInput.value,
         dateFinished: finishInput.value,
         timeToFinish: formattedTime,
         identifier: itemIdentifier
}; //json is how you want to package data before sending it to front end
  //{attribute : value}
const body = JSON.stringify( json ); 


const response = await fetch( '/submit', {
    method:'POST', 
    body
  })

let data = ""; 
  if (response.status === 200){
     data = await response.json()


  }

  const list = document.createElement('ul')
  const existingList = document.querySelector('ul');
  if (existingList) {
    existingList.parentNode.removeChild(existingList);
  }
  
  console.log(data)

  
const addedItems = []


  data.forEach(d => {

   const itemIdentifier = d.title + d.author + d.startDate + d.dateFinished
    if (!addedItems.includes(itemIdentifier)){
      const li = document.createElement('li')
      li.className = "userLibrary"
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
      
      li.innerText = "Title: " + d.title + "\nAuthor: " + d.author + "\nStart Date: " + d.startDate + "\nFinish Date: " + d.dateFinished +"\nTime to Finish: " + d.timeToFinish
      
      
      list.appendChild(li)
      list.appendChild(deleteButton)
      addedItems.push(itemIdentifier)
      deleteButton.onclick = () => deleteBook(itemIdentifier, li, deleteButton);

   

   }
    
  })

  document.body.appendChild( list )

}


async function deleteBook(itemID, listItemElem, delButton) {
  console.log("Delete book...")
  console.log(itemID)

  
    const response = await fetch(`/delete/${itemID}`, {
      method: 'DELETE', 

    }); 
    console.log(`/delete/${itemID}`)
    console.log("Response status:", response.status); 

  //sucessful
  if (response.status  === 200){
      let ul = listItemElem.parentNode;

    ul.removeChild(listItemElem)
    ul.removeChild(delButton)
    console.log("Success")

  }
  else {
    console.error("Error deleting item on server")
  }
  

}

document.querySelector('#title').addEventListener('input', checkForm);
document.querySelector('#author').addEventListener('input', checkForm);
document.querySelector('#startDate').addEventListener('input', checkForm);
document.querySelector('#dateFinished').addEventListener('input', checkForm);


async function checkForm() {
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const startInput = document.querySelector('#startDate');
  const finishInput = document.querySelector('#dateFinished');
  const submitButton = document.querySelector('button');

  if (titleInput.value.trim() && authorInput.value.trim() && startInput.value.trim() && finishInput.value.trim()) {
    submitButton.disabled = false;
  } 
  else {
    submitButton.disabled = true;
  }
}



window.onload = function() {
  
  const submitButton = document.querySelector("#submit");
  submitButton.disabled = true;
  submitButton.onclick = submit;
}
})