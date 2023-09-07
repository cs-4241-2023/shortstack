// FRONT-END (CLIENT) JAVASCRIPT HERE

const list = document.createElement('ul')


const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( 'form' ),
        json = { name: input.querySelector('#name').value,
                 type: input.querySelector('#type').value,
                 age: input.querySelector('#age').value },
        body = JSON.stringify( json )
  if(json.name === '' || json.age === '' || json.age < 0){
    alert('ERROR! one or more invalid input')
  }else{
    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })
  
    const jsonData = await response.json()
  
    jsonData.forEach(e => {
      const item = document.createElement('li')
      item.innerText = `${e.name} the ${e.type} is age ${e.age}
                        ${e.status}`
      list.appendChild(item)
  
      const delItem = document.createElement('span');
      delItem.innerText = 'X'
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
}



window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}