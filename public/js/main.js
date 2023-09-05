// FRONT-END (CLIENT) JAVASCRIPT HERE

window.onload = function() {
  //document.querySelector("#submitButton").onclick = addData;
  document.querySelector("#inputForm").onsubmit = addData;

  fetch( '/data' )
    .then((response) => response.json())
    .then((json) => json.forEach(element => addTableRow(element)))
}

const addData = async function(event) {
  event.preventDefault()

  const data = new FormData(event.target)

  const json = Object.fromEntries(data.entries())
  json['amount'] = Number(json['amount'])
  json['unit_value'] = Number(json['unit_value'])
  const body = JSON.stringify( json )

  const response = await fetch( '/add', {
    method:'POST',
    body 
  })

  const responseJson = await response.json()

  addTableRow(responseJson)
  document.querySelector('#inputForm').reset()
}

const addTableRow = function(data) {
  const table = document.querySelector("table")
  const newRow = document.createElement('tr')
  newRow.id = data['uuid']
  table.appendChild(newRow)


  const itemData = document.createElement('td')
  itemData.textContent = data['item']
  newRow.appendChild(itemData)

  const amountData = document.createElement('td')
  amountData.textContent = data['amount'].toLocaleString()
  newRow.appendChild(amountData)

  const unitValueData = document.createElement('td')
  unitValueData.textContent = data['unit_value'].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
  newRow.appendChild(unitValueData)

  const totalValueData = document.createElement('td')
  totalValueData.textContent = data['total_value'].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
  newRow.appendChild(totalValueData)

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
  const uuid = tableRow.id

  const json = {
    uuid
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
