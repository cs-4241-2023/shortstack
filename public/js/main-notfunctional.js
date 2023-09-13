// FRONT-END (CLIENT) JAVASCRIPT HERE

window.onload = function() {

  document.getElementById("create").onclick = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const name = document.querySelector( '#name').value
    const attack = document.querySelector( '#attack').value
    const defense = document.querySelector( '#defense').value
    const speed = document.querySelector( '#speed').value
          json = { name: name, attack: attack, defense: defense, speed: speed, action: 'create' },
          body = JSON.stringify( json )
          console.log( json )
    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })

    const text = await response.json()
    document.getElementById("Homework2").reset()
    createTableFromJSON(text)
  }

  document.getElementById("delete").onclick = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const radio_elements = document.getElementsByName('type_radio')
    var index = radio_elements.length

    for (let i=0; i < radio_elements.length; i++) {
      if (radio_elements[i].checked) {
        index = i
        break
      }
    }
    json = { index: index, action: 'delete' },
    body = JSON.stringify( json )
    console.log( json )
    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })

    const text = await response.json()
    console.log( 'text:', text )
    createTableFromJSON(text)
  }
  function createTableFromJSON(json) {
    let placeholder = document.querySelector("#data-output");
      let out = "";
      console.log(json.length)
      for(let i = 0; i < json.length; i++) {
        let product = json[i]
        out += `
            <tr>
                <td><input value=i name="type_radio" type="radio"> </td>
                <td>${product.name}</td>
                <td>${product.attack}</td>
                <td>${product.defense}</td>
                <td>${product.speed}</td>
                <td>${product.average}</td>
                <td>${product.recommended}</td>
            </tr>
          `;
      }
      placeholder.innerHTML = out;
      console.log(out)
  }
}

/*
function createTableFromJSON(json) {
  var arr = [];
  arr = JSON.parse(json); // Convert JSON to array.
  console.log(arr)
  var col = [];
  for (var key in arr) {
    if (col.indexOf(key) === -1) {
      col.push(key);
    }
  }

  // Create a dynamic table.
  var table = document.createElement("table") // Create table header.
  var row = table.insertRow(-1); // Table row. (last position)

  for (var i = 0; i < col.length; i++) {
    var header = document.createElement("header"); // Table header.
    header.innerHTML = col[i];
    row.appendChild(header);
  }

  row = table.insertRow(-1); // add new row for the names
  // Add JSON to the table rows.
  for (var i = 0; i < arr.length; i++) {
    var cell1 = row.insertCell(0);
    cell1.innerHTML = arr[i].name;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = arr[i].attack;
    var cell3 = row.insertCell(2);
    cell3.innerHTML = arr[i].defense;
    var cell4 = row.insertCell(3);
    cell4.innerHTML = arr[i].speed;
  }

  // Finally, add the dynamic table to a container.
  var divContainer = document.getElementById("showTable");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
  console.log(table);
};

}

window.onload = function() {
  const button = document.querySelector("button");
 button.onclick = submit;
}
*/