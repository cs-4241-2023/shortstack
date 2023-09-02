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
  document.querySelector("#submitButton").onclick = addData;
  //document.querySelector("#deleteButton").onclick = deleteData
  //addTableRow({'model': 'Toyota', 'year': 1999, 'mpg': 23})
}

const addTableRow = function(data) {
  const table = document.querySelector("table")
  const newRow = document.createElement('tr')
  table.appendChild(newRow)


  const modelData = document.createElement('td')
  modelData.textContent = data['model']
  newRow.appendChild(modelData)

  const yearData = document.createElement('td')
  yearData.textContent = data['year']
  newRow.appendChild(yearData)

  const mpgData = document.createElement('td')
  mpgData.textContent = data['mpg']
  newRow.appendChild(mpgData)

  const deleteButtonData = document.createElement('td')
  deleteButtonData.className = 'tableDelete'
  const deleteForm = document.createElement('form')
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.onclick = deleteData
  deleteForm.appendChild(deleteButton)
  deleteButtonData.appendChild(deleteForm)
  newRow.appendChild(deleteButtonData)
}

const deleteData = async function(event) {
  event.preventDefault()
  
  const tableRow = this.parentElement.parentElement.parentElement
  const rowData = tableRow.children

  const model = rowData[0].textContent
  const year = Number(rowData[1].textContent)
  const mpg = Number(rowData[2].textContent)

  const json = {
    model,
    year,
    mpg
  }
  const body = JSON.stringify(json)

  const response = await fetch( '/delete', {
    method:'POST',
    body
  })

  if(response.ok) {
    tableRow.remove()
  } else {
    alert('Failed to delete data')
  }
}

const addData = async function(event) {
  event.preventDefault()

  const modelInput = document.querySelector('#modelInput')
  const yearInput = document.querySelector('#yearInput')
  const mpgInput = document.querySelector('#mpgInput')

  const model = modelInput.value
  const year = Number(yearInput.value)
  const mpg = Number(mpgInput.value)

  const json = {
    model,
    year,
    mpg
  }
  const body = JSON.stringify( json )

  const response = await fetch( '/add', {
    method:'POST',
    body 
  })

  if(response.ok) {
    addTableRow(json)
  } else {
    alert('Failed to send data')
  }
}