// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault() // Prevents default browser behavior
   //add more fields to your json based on your form 
    const showName = document.querySelector( '#showName' )
    const relYear = document.querySelector( '#relYear' )
    const showGenre = document.querySelector( '#showGenre' )

        json = { showName: showName.value, 
                  relYear: relYear.value,
                  showGenre: showGenre.value },
        body = JSON.stringify( json ) // converts json to string 

        
        
  const response = await fetch( '/submit', {
    method:'POST',
    body
  })
    
  let newData = await response.json() //wait until response
  console.log(newData)

  const table = document.querySelector("table") // Will find the FIRST table element in html.

  table.innerHTML = '';
  newData.forEach(item => {
    //debugger;
      const tr = document.createElement('tr')
      const td1 = document.createElement('td')
      const td2 = document.createElement('td')
      const td3 = document.createElement('td')
      td1.innerHTML = item.showName
      td2.innerHTML = item.relYear
      td3.innerHTML = item.showGenre
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      table.appendChild(tr)

  })

}

window.onload = function() {
   const button = document.getElementById("submit");
  button.onclick = submit;
}