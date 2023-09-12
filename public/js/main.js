const list = document.createElement("ul");

/*data.map( d => d.model )
  .map( d => d[0].toUpperCase() + d.slice(1) )
  .forEach( d => {
    const li = document.createElement('li')
    li.innerText = d
    list.appendChild( li )
  })*/ // FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  let evt = event.target
  let json = {}
  if (evt.getAttribute('formaction') === '/submit'){
    json = {
      tasks: document.querySelector("#taskName").value,
      date: document.querySelector("#dueDate").value,
      priority: document.querySelector("#taskPriority").value,
    }
  } else if (evt.getAttribute('formaction') === '/delete') {
    //Add data to delete json = {Data to delete}
    console.log('delete')
  }

  //console.log(json);

  fetch(evt.getAttribute('formaction'), {
    method: "POST",
    body: JSON.stringify(json),
  }).then(async function (response) {
    let data = await response.json();
    let resultListHTML = "";

    const tableparse = document.querySelector("tbody");
    tableparse.innerHTML = "";

    let resultHTML = tableparse.innerHTML;
    /*const del = (index) => {
      console.log("index: ", index);
      // add the fetch request here to delete the item
    };*/
    let i = 0;

    // for loop for each row
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const row = document.createElement("tr");

        // for loop for each cell
        for (const cellKey in data[key]) {
          const cell = document.createElement("td");
          if (cellKey === "daysRemaining") {
            const daysRemainingCell = document.createElement("td");
            daysRemainingCell.innerText = data[key][cellKey];
            row.appendChild(daysRemainingCell);
          } else {
            cell.innerText = data[key][cellKey];
            row.appendChild(cell);
          }
        }

        /* const dueDate = new Date(data[key]["date"]);
        const currentDate = new Date();
        const daysRemaining = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

        const daysRemainingCell = document.createElement("td");
        daysRemainingCell.innerText = daysRemaining > 0 ? `${daysRemaining} days` : "Expired";
        row.appendChild(daysRemainingCell);
    */

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "my-deletebutton";
        deleteButton.formAction = '/delete'
        deleteButton.onclick = submit

        // store current value of i
        /*let _i = i;
        deleteButton.onclick = function () {
          del(_i);
        };*/

        const deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        i++;
        tableparse.appendChild(row);
        //console.log(data)
      }
    }
  });
};

const deletedata = document.createElement("button");

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
