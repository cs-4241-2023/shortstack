// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input1 = document.querySelector( '#name' ),
        input2 = document.querySelector( '#age' ),
        input3 = document.querySelector( '#year' ),
        json = { name: input1.value, age: input2.value, year: input3.value},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()
  
  console.log( 'text:', text )

  var table = makeTable(text)

  results.replaceChild(table, results.childNodes[0])

}

const deleteEntry = async function( event ) {
  event.preventDefault()

  const input = document.querySelector( '#delete' ),
        json = { index: input.value},
        body = JSON.stringify( json )

  const response = await fetch( '/deleteEntry', {
    method:'DELETE',
    body 
  })

  const text = await response.text()
  
  console.log( 'text2:', text )

  var table = makeTable(text)

  results.replaceChild(table, results.childNodes[0])
}

function makeTable(text) {
  var tableData = JSON.parse(text)
  results = document.getElementById("results")
  table = document.createElement("table")
  columns = ['Name', 'Age', 'Current Year', 'Birth Year']

  thead = document.createElement("thead")
  tr = document.createElement("tr")

  columns.forEach((element) => {
    th = document.createElement("th")
    th.innerText = element
    tr.appendChild(th)
  });
  thead.appendChild(tr)
  table.appendChild(tr)

  tableData.forEach((element) => {
    tr = document.createElement("tr")
    values = Object.values(element)

    values.forEach((element) => {
      td = document.createElement("td")
      td.innerText = element
      tr.appendChild(td)
    })
    table.appendChild(tr)
  });

  return table
}

window.onload = function() {
  const button = document.querySelector("#submit");
  button.onclick = submit;
  const button2 = document.querySelector("#deleteButton")
  button2.onclick = deleteEntry;
}