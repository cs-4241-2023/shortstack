// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const form = document.querySelector('form')


  const inputName = form["name"],
        inputEmail = form["email"],
        inputType = form["type"],
        inputDepartment = form["major"]

  console.log(inputName)
  console.log(inputEmail)
  console.log(inputType)
  console.log(inputDepartment)
      
  const json = { 'name': inputName.value, 'email': inputEmail.value, 'type': inputType.value, 'department': inputDepartment.value }, //whatever: "whatever" },
        body = JSON.stringify( json )
        console.log(body)
  
  const response = await fetch( '/newUser', {
    method:'POST',
    body
  })


  const text = await response.text()
  
  console.log( 'text:', text)
  addToTable(json)
}

const getUsersData = async function ( event ){  
  const response = await fetch( '/getUsers' )

  const text = await response.text()
  addJsonToTable(JSON.parse(text))
}

function addJsonToTable(newData){
  for (let i = 0; i < Object.keys(newData).length; i++){
    addToTable(newData[i])
  }
}

function addToTable(newRow){
    const table=document.getElementById("usertable");
    var row = table.insertRow(-1);
    // var x = row.insertCell(0;
    // x.innerHTML = "<p>new cell</p>";
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var nameCell = row.insertCell(0);
    var emailCell = row.insertCell(1);
    var typeCell = row.insertCell(2);
    var majorCell = row.insertCell(3);

    nameCell.innerHTML = newRow["name"]
    emailCell.innerHTML = newRow["email"]
    typeCell.innerHTML = newRow["type"]
    majorCell.innerHTML = newRow["department"]
}

window.onload = function() {
  const button = document.querySelector("button");
  getUsersData()
  button.onclick = submit;
}