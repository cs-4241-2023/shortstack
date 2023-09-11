// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  event.preventDefault()
  
  const json = { model: document.querySelector('#model').value,
                 year: document.querySelector('#year').value,
                 mpg: document.querySelector('#mpg').value},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
  addTableRow(text)
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}


function addTableRow(carinfo) {
  const carObject = JSON.parse(carinfo);
  let table = document.getElementById("cartable");
   
  let row = table.insertRow(-1);
   
  let c1 = row.insertCell(0);
  let c2 = row.insertCell(1);
  let c3 = row.insertCell(2);
  let c4 = row.insertCell(3);
  let c5 = row.insertCell(4); // Cell for buttons
   
  c1.innerText = carObject.model
  c2.innerText = carObject.year
  c3.innerText = carObject.mpg
  c4.innerText = carObject.rating
  
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteRow(row, carinfo);
  });

  let modifyButton = document.createElement('button');
  modifyButton.innerText = 'Modify';
  modifyButton.addEventListener('click', function () {
    modifyData(row, carinfo);
  });

  c5.appendChild(deleteButton);
  c5.appendChild(modifyButton);
}

function deleteRow(row, carinfo) {
  if (typeof carinfo !== 'object') {
    carinfo = JSON.parse(carinfo);
  }
  
  row.remove();
  deleteData(row, carinfo)
}

function modifyData(row, carinfo) {
  if (typeof carinfo !== 'object') {
    carinfo = JSON.parse(carinfo);
  }
  
  // Get new info if there is new data
  let modelInput = document.createElement('input');
  modelInput.type = 'text';
  modelInput.value = row.cells[0].innerText; 

  let yearInput = document.createElement('input');
  yearInput.type = 'text';
  yearInput.value = row.cells[1].innerText; 

  let mpgInput = document.createElement('input');
  mpgInput.type = 'text';
  mpgInput.value = row.cells[2].innerText; 

  // Save button for triggering backend
  let saveButton = document.createElement('button');
  saveButton.type = 'button'; 
  saveButton.innerText = 'Save';

  saveButton.addEventListener('click', function () {
    carinfo.model = modelInput.value;
    carinfo.year = yearInput.value;
    carinfo.mpg = mpgInput.value;

    sendModifiedData(carinfo, row);
  });

  row.cells[0].innerHTML = ''; 
  row.cells[1].innerHTML = ''; 
  row.cells[2].innerHTML = ''; 
  row.cells[3].innerHTML = '';
  row.cells[4].innerHTML = ''; 

  row.cells[0].appendChild(modelInput);
  row.cells[1].appendChild(yearInput);
  row.cells[2].appendChild(mpgInput);
  row.cells[3].appendChild(saveButton);
}

async function sendModifiedData(carinfo, row) {
  const response = await fetch('/submit', {
    method: 'PUT',
    body: JSON.stringify(carinfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const updatedCarInfo = await response.json();
    // When server responds with new data -> update that row
    updateTableRow(row, updatedCarInfo);
  } else {
    console.error('Failed to modify data');
  }
}

async function deleteData(carinfo, row) {
  const response = await fetch('/submit', {
    method: 'DELETE',
    body: JSON.stringify(carinfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updateTableRow(row, updatedData) {
  // Update the table cells with the updated data and rating
  row.cells[0].innerText = updatedData.model;
  row.cells[1].innerText = updatedData.year;
  row.cells[2].innerText = updatedData.mpg;
  row.cells[3].innerText = updatedData.rating;

  // Create new Modify and Delete buttons
  let modifyButton = document.createElement('button');
  modifyButton.innerText = 'Modify';
  modifyButton.addEventListener('click', function () {
    modifyData(row, updatedData);
  });
  
  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function () {
    deleteRow(row, updatedData);
  });

  row.cells[4].innerHTML = '';
  row.cells[4].appendChild(deleteButton);
  row.cells[4].appendChild(modifyButton);
}


