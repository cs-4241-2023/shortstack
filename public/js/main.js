// FRONT-END (CLIENT) JAVASCRIPT HERE


let idNum = 1;

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
                  showGenre: showGenre.value,
                  id: idNum},
        idNum++;
        body = JSON.stringify( json ) // converts json to string 
        
        
        
  const response = await fetch( '/submit', {
    method:'POST',
    body
  })
    
  let newData = await response.json() //wait until response
  console.log(newData)

  const table = document.querySelector("table") // Will find the FIRST table element in html.
  
  // table.innerHTML = '';
  
  i = 0;
  newData.forEach(item => {
    
      const editBtn =  document.createElement("BUTTON")
      editBtn.innerHTML = "Edit";

      const deleteBtn =  document.createElement("BUTTON")
      deleteBtn.innerHTML = "Delete";
      deleteBtn.className = 'delete'

      const tr = document.createElement('tr')
      console.log(item.id)
      const td1 = document.createElement('td')
      const td2 = document.createElement('td')
      const td3 = document.createElement('td')
      const td4 = document.createElement('td')
      td1.innerHTML = item.showName
      td2.innerHTML = item.relYear
      td3.innerHTML = item.showGenre
      td4.appendChild(editBtn)
      td4.appendChild(deleteBtn)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      table.appendChild(tr)
    i++
//add a button to delete or modify your data
//each button should have its own action listener
//keep track of each entry by using an id
// you might need that id to edit or delete an entry
  })

}

const deleteRow = async function( event ) {


  
}

window.onload = function() {
   const button = document.getElementById("submit");
  button.onclick = submit;
}

window.onload = function() {
  const button = document.getElementsByClassName("delete");
 button.onclick = deleteRow;
}

