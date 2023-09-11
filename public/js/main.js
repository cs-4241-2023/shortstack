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
    
    const dueDate = new Date(data[key]["date"]);
        const currentDate = new Date();
        const daysRemaining = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

        const daysRemainingCell = document.createElement("td");
        daysRemainingCell.innerText = daysRemaining > 0 ? `${daysRemaining} days` : "Expired";
        row.appendChild(daysRemainingCell);
    
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'my-deletebutton';
    // store current value of i 
    let _i = i
    deleteButton.onclick = function() { del( _i ) }
    
    const deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    /*resultListHTML += '<tr>';
    resultListHTML += `<td>${data[key]['tasks']}</td>`;
    resultListHTML += `<td>${data[key]['date']}</td>`;
    resultListHTML += `<td>${data[key]['priority']}</td>`;
    resultListHTML += `<td> <button class="my-deletebutton" onclick="window.delete(${i})" type="button" >Delete Item</button></td>`;
    resultListHTML += '</tr>';*/
    
    i++
    tableparse.appendChild( row )
    //console.log(data)
  }
}
//tableparse.innerHTML= resultListHTML;

  /*const resultContainer = document.querySelector('#result');
  resultContainer.innerHTML = resultListHTML;
  resultContainer.appendChild(list);*/
      })
      
  }
  

const deletedata = document.createElement('button')

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}