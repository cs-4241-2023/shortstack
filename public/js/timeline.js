
const addTimelineItem = async function (event) {


  event.preventDefault()

  const eraInput = document.querySelector('#era');
  const dateInput = document.querySelector('#date');
  const descriptionInput = document.querySelector('#description');
  const json = { era: eraInput.value, date: dateInput.value, description: descriptionInput.value  }, body = JSON.stringify(json)

  const response = await fetch('/submit', {
    method: 'POST',
    body
  })

  const data = await response.json()

  console.log( 'text:', data )
  CreateTimeline(data);
  
  
}

function CreateTimeline(data){
  const timeline = document.getElementById("myTimeline")

  timeline.innerHTML = "";

  for(let i = 0; i < data.length; i++){
    const timelineItem = document.createElement("div");
    timelineItem.className = "container";
    timelineItem.innerHTML = "<div class=\"content\"><h1>" + data[i].era + "</h1><h2>" + data[i].date + "</h2><p>" + data[i].description  + "</p></div>"

    timeline.appendChild(timelineItem);
  }
}



window.onload = async function () {
  const button = document.getElementById("addTimelineItemButton");
  button.onclick = addTimelineItem;

  const response = await fetch( '/timelineData', {
    method:'GET'
  })

  const data = await response.json();
  CreateTimeline(data);
}