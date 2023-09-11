// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const frags = document.querySelector( '#frag-input' ),
        assists = document.querySelector( '#assist-input' ),
        deaths = document.querySelector( '#death-input' ),
        json = { frags: frags.value, assists: assists.value, deaths: deaths.value },
        body = JSON.stringify( json )

  if (!frags.value || !deaths.value || !deaths.value) {
    alert("Please fill out all input boxes before submitting.")
  } else {
    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })

    const data = await response.json();
    const button = document.querySelector('#toggle-table');
    if (button.innerText === "Hide Table") {
      showData(data);
    }
    frags.value = '';
    assists.value = '';
    deaths.value = '';
  }
}

const getTable = async function(event) {
  event.preventDefault();

  const response = await fetch('/getTable', {
    method: 'GET'
  });

  const data = await response.json();
  const table = document.querySelector('#stat-table');
  const button = document.querySelector('#toggle-table');
  if (button.innerText === "Show Table") {
    showData(data);
    table.removeAttribute("hidden");
    button.innerText = "Hide Table";
  } else {
    table.setAttribute("hidden", "hidden");
    button.innerText = "Show Table";
  }
}

const showData = data => {
  const tbody = document.querySelector('#tbody');
  tbody.innerHTML = '';
  let rowNum = 0;
  data.forEach(d => {
    const row = document.createElement('tr');
    row.id = rowNum;
    for (const key in d) {
      const cell = document.createElement('td');
      cell.innerText = d[key];
      row.appendChild(cell);
    }

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function(event) {deleteData(event, d)};
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // const modifyCell = document.createElement('td');
    // const modifyButton = document.createElement('button');
    // modifyButton.innerText = "Modify";
    // modifyButton.onclick = function(event) {modifyData(event, rowNum)};
    // modifyCell.appendChild(modifyButton);
    // row.appendChild(modifyCell);
    tbody.appendChild(row);
    rowNum++;
  });
}

const deleteData = async function(event, obj) {
  event.preventDefault();
  const body = JSON.stringify(obj);

  const response = await fetch('/deleteData', {
    method: 'POST',
    body
  });

  const data = await response.json();
  showData(data);
}

const modifyData = function(event, rowNum) {
  const tbody = document.querySelector('#tbody');
  const rows = tbody.children;
  for (let row in rows) {
    if (row.id === rowNum) {

    }
  }
}

window.onload = function() {
  const submitButton = document.querySelector("#submit-button");
  submitButton.onclick = submit;
  const tableButton = document.querySelector('#toggle-table');
  tableButton.onclick = getTable;
}