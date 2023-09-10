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


function updateTaskRows() {
  const table = document.getElementById("task-table");

  for (let i = 1; i <= 5; i++) {
    const newRow = document.createElement("tr");
    const taskCell = document.createElement("td");

    const leftContainer = document.createElement("div");
    leftContainer.className = "left-container";

    const doneButton = document.createElement("button");
    doneButton.className = "Completion-Button";

    const taskText = document.createTextNode(`Task ${i}`);

    const rightContainer = document.createElement("div");
    rightContainer.className = "right-container";

    const myDayButton = document.createElement("button");
    myDayButton.className = "MyDay-Button";

    leftContainer.appendChild(doneButton);
    leftContainer.appendChild(taskText);
    rightContainer.appendChild(myDayButton);

    taskCell.appendChild(leftContainer);
    taskCell.appendChild(rightContainer);

    newRow.appendChild(taskCell);
    table.appendChild(newRow);
  }
}

window.onload = function (){
  updateTaskRows();
}