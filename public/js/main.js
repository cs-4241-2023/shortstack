// FRONT-END (CLIENT) JAVASCRIPT HERE

function addListItem() {
  event.preventDefault();
  var list = document.getElementById("list");
  var itemInput = document.getElementById("addItemInput").value;
  var dateInput = document.getElementById("addDateInput").value;
  var timeInput = document.getElementById("addTimeInput").value;
  var newLi = document.createElement("li");

  var txt = document.createTextNode(itemInput + " due " + dateInput + " at " + timeInput);
  
  if (itemInput=="" | dateInput=="" | timeInput=="") {
    alert("Please fill in the required fields");
  } else {
    newLi.appendChild(txt); // add text to new li element
    list.appendChild(newLi); // add new li element to ul
  }
}

//document.getElementById("addItemButton").addEventListener("click", addListItem);

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
