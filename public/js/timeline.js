
const addTimelineItem = async function (event) {


  event.preventDefault()

  const eraInput = document.querySelector('#era');
  const dateInput = document.querySelector('#date');
  const descriptionInput = document.querySelector('#description');
  console.log(dateInput.value);
  if (isNaN(dateInput.value)) {
    document.getElementById("timelineErrorMessage").style.display = "block";
  } else {

    document.getElementById("timelineErrorMessage").style.display = "none";

    const json = { era: eraInput.value, date: dateInput.value, description: descriptionInput.value }, body = JSON.stringify(json)

    const response = await fetch('/submit', {
      method: 'POST',
      body
    })

    const data = await response.json()

    console.log('text:', data)
    CreateTimeline(data);
  }




}

function CreateTimeline(data) {
  const timeline = document.getElementById("myTimeline")

  timeline.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const timelineItem = document.createElement("div");
    timelineItem.id= "timelineItem" + i; 
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "X";
    
    //edit button appearance
    deleteButton.onclick= () => {
      let text = "timelineItem" + i;
      const tempButton = document.getElementById(text).outerHTML="";
      //account for in backend
      console.log(tempButton.id);
    }
    timelineItem.appendChild(deleteButton);

    timelineItem.className = "container";
    const innerItemText = document.createElement("div");
    innerItemText.className = "content";
    innerItemText.innerHTML = "<h1>" + data[i].era + "</h1><h2>" + data[i].date + "</h2><p>" + data[i].description + "</p>"
    timelineItem.appendChild(innerItemText);
    

    timeline.appendChild(timelineItem);
  }
}



window.onload = async function () {
  const button = document.getElementById("addTimelineItemButton");
  button.onclick = addTimelineItem;

  const response = await fetch('/timelineData', {
    method: 'GET'
  })

  const data = await response.json();
  CreateTimeline(data);
}