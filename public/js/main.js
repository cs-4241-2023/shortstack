// FRONT-END (CLIENT) JAVASCRIPT HERE

let form, taskInput, dateInput, submitButton;

function checkValidity() {
  if (taskInput.validity.valid && dateInput.validity.valid) {
    submitButton.removeAttribute('disabled');
  }
  else {
    submitButton.setAttribute('disabled', 'true');
  }
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  form = document.querySelector('.inputs');
  taskInput = document.querySelector('#taskName');
  dateInput = document.querySelector('#dueDate');
  submitButton = document.querySelector('#addTaskButton');

  taskInput.addEventListener('input', checkValidity);
  dateInput.addEventListener('input', checkValidity);
}