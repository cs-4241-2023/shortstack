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



  newData.forEach(item => {
    
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')
    td1.innerHTML = newData.showName
    td2.innerHTML = newData.relYear
    td3.innerHTML = newData.showGenre
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
  })


  // const data = await response.json()
  // console.log(data)
  
  const list = document.createElement('ul')
  
  //display addition
  //add some sort of a delete button 
  data.forEach( d => {
    const item = document.createElement('li')
    item.innerHTML = `<b>model</b>: ${d.model}, <b>mpg</b>: ${d.mpg}`
    list.appendChild( item )
  })
  
  document.body.appendChild( list )
}

window.onload = function() {
   const button = document.getElementById("submit");
  button.onclick = submit;
}