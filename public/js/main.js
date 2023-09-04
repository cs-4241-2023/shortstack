// FRONT-END (CLIENT) JAVASCRIPT HERE

const list = document.createElement('ul')

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#addfact' ),
        json = { addfact: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const jsonData = await response.json()

  jsonData.forEach(e => {
    const item = document.createElement('li')
    item.innerText = `Fact : ${e.addfact}`
    list.appendChild(item)

    const delItem = document.createElement('span');
    delItem.innerText = 'x'
    item.appendChild(delItem)
  });

  document.body.appendChild(list)
  
  const itemToDelete = document.querySelectorAll('span')
  itemToDelete.forEach(e => {
    e.addEventListener('click', ()=>{
      e.parentElement.remove()
    })
  });

}



window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}