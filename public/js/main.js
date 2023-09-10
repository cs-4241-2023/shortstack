// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}


function initializeTaskRows() {
  const table = document.getElementById("task-table");

  for (let i = 1; i <= 5; i++) {
    const newRow = document.createElement("tr");
    const taskCell = document.createElement("td");

    const leftContainer = document.createElement("div");
    leftContainer.className = "left-container";

    const doneButton = document.createElement("button");
    doneButton.className = "Completion-Button";
    doneButton.title = "Complete The Task";

    const taskText = document.createElement("input");
    taskText.type = "text";
    taskText.value = `Task ${i}`;
    taskText.title = "Click To Rename The Task";

    const rightContainer = document.createElement("div");
    rightContainer.className = "right-container";


    const lowPriority = document.createElement("button");
    lowPriority.className = "LowPriority-Button";
    lowPriority.title = "Low Priority";
    const mediumPriority = document.createElement("button");
    mediumPriority.className = "MediumPriority-Button";
    mediumPriority.title = "Medium Priority";
    const highPriority = document.createElement("button");
    highPriority.className = "HighPriority-Button";
    highPriority.title = "High Priority";

    const myDayButton = document.createElement("button");
    myDayButton.className = "MyDay-Button";
    myDayButton.title = "Remove From My Day";

    leftContainer.appendChild(doneButton);
    leftContainer.appendChild(taskText);

    rightContainer.appendChild(lowPriority);
    rightContainer.appendChild(mediumPriority);
    rightContainer.appendChild(highPriority);
    rightContainer.appendChild(myDayButton);

    taskCell.appendChild(leftContainer);
    taskCell.appendChild(rightContainer);

    newRow.appendChild(taskCell);
    table.appendChild(newRow);
  }
}

window.onload = function (){
  initializeTaskRows();
}