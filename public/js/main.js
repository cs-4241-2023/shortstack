// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load a new .html page for displaying results
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  // post JSON to server
  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  // await response from server, the server is sending some example data back
  const dataResponse = await response.json()

  // put data response into HTML list
  const list = document.createElement("ul");
  dataResponse.forEach(d => {
    const item = document.createElement("li");
    item.innerHTML = `<b>Model:</b> ${d.model}, <b>MPG: ${d.mpg} </b>`; // format the JSON
    list.appendChild(item);
  });

  // put list on the body of the page
  document.body.appendChild(list);

}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}