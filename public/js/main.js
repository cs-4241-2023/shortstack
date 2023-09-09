// FRONT-END (CLIENT) JAVASCRIPT HERE
let idCounter = 0
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  // add fields to JSON before the POST request
  
  const input = document.querySelector( '#newTodoInput' ), 
        //surname = document.querySelector( '#surname' ),
       // json = { name: name.value, surname: surname.value },
       //const todo = { id: idCounter++, text: req.body.text };
       json = {id: idCounter++, todoinput: input.value}
      //body = JSON.stringify( json )



  // {yourname: input1.value, yoursurname: input2.value}
  const response = await fetch( '/submit', {
    method:'POST',
    body: JSON.stringify(json)
  })

  // const text = await response.text()

  // console.log( 'text:', text )
  const data = await response.json()
  
  //check whether an unordered list exists
  //const list = document.createElement('ul')
  
  //change display variables
  //console.log(data)
  data.forEach( d => {
    //const item = document.createElement('li')
    //item.innerHTML = `<b>Name</b> : ${d.name}, <b>Surname</b>: ${d.surname}` // surname and name are defined in the index
    //list.appendChild( item )
    addTodo(d.todoinput)
  })
  
  //document.body.appendChild( list )
}

window.onload = function() {
   const button = document.getElementById("submitForm");
  button.onclick = submit;
}

function addTodo(todoinput){
  //const input = document.getElementById('newTodoInput');
  const todoList = document.getElementById('todoList');

  //if (input.value.trim() === '') {
  //    alert('Please enter a task!');
  //    return;
  //}

  let li = document.createElement('li');
  li.textContent = todoinput;
  //li.appendChild(removeBtn);

  
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = function() {
    todoList.removeChild(li);
  };
  li.appendChild(removeBtn);

  todoList.appendChild(li);
  document.getElementById('newTodoInput').value = ''; // Clear the input
}

function removeTodo(buttonID){

}
//find a way to send your server list on window load