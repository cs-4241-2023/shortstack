// FRONT-END (CLIENT) JAVASCRIPT HERE

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

  const text = await response.text()

  console.log( 'text:', text )

  const timeline = document.getElementById("myTimeline")

  const timelineItem = document.createElement("div");
  timelineItem.className = "container";
  timelineItem.innerHTML = "<div class=\"content\"><h1>" + eraInput.value + "</h1><h2>" + dateInput.value + "</h2><p>" + descriptionInput.value  + "</p></div>"

  timeline.appendChild(timelineItem);
}



window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = addTimelineItem;

}