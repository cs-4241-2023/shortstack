const list = document.createElement('ul')
  
/*data.map( d => d.model )
  .map( d => d[0].toUpperCase() + d.slice(1) )
  .forEach( d => {
    const li = document.createElement('li')
    li.innerText = d
    list.appendChild( li )
  })*/// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const taskName= document.querySelector( '#taskName' ),
        dueDate= document.querySelector('#dueDate'),
        taskPriority= document.querySelector('#taskPriority')
  
        const json = { tasks: taskName.value , date: dueDate.value , priority: taskPriority.value };

        //console.log(json);

  fetch( '/submit', {
    method:'POST',
    body: JSON.stringify(json)

  }).then(async function (response){ //console.log(response)
    let data= await response.json()
    //console.log(data)


    //const list = document.createElement('ul')
    let resultListHTML = '';



const tableparse=document.querySelector('tbody')
tableparse.innerHTML = '';

let resultHTML = tableparse.innerHTML
const del = index => {
  console.log( 'index: ', index )
  // add the fetch request here to delete the item
}
let i = 0

// for loop for each row
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    const row = document.createElement('tr')
    
    // for loop for each cell
    for( const cellKey in data[key] ) {
      const cell = document.createElement('td')
      cell.innerText = data[key][cellKey]
      row.appendChild( cell )
    }
    
    
    
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete Item';
    deleteButton.className = 'my-deletebutton';
    // store current value of i 
    let _i = i
    deleteButton.onclick = function() { del( _i ) }
    
    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);


    i++
    tableparse.appendChild( row )
    //console.log(data)
  }
}
      })
      
  }
  

const deletedata = document.createElement('button')

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}