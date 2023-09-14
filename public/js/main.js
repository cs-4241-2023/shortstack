// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const date = document.querySelector('#date'),
        exercise = document.querySelector('#exercise'),
        sets = document.querySelector('#sets'),
        reps = document.querySelector('#reps'),
        weight = document.querySelector('#weight')
        
  const jsonData = {
    date: date.value,
    exercise: exercise.value,
    sets: sets.value,
    reps: reps.value,
    weight: weight.value,
  }
  
  let body = JSON.stringify(jsonData)
  console.log(body)

 fetch( '/submit', {
    method:'POST',
    body 
  })

  //const data = await response.json()
  
  //addToTable(data)
}

window.onload = function() {
  const button = document.querySelector("#submit");
  button.onclick = submit;

  /*const response = await fetch( '/start' )
  const data = await response.json()

  for(let i=0; i < data.length; i++){
    addToTable(data[i])
  }*/
}

/*
const deleteLog = async function(log){
    const parent = event.target.parentElement.parentElement
  const data = parent.children

  let jsonData = { date: data[0].textContent,
                  exercise: data[1].textContent,
                  sets: data[2].textContent,
                  reps: data[3].textContent,
                  weight: data[4].textContent
                 }
  let body = JSON.stringify(jsonData) 

  const response = await fetch( '/delete', {
    method:'POST',
    body 
  })
        
  parent.remove()
}

const addToTable = function(data) {
  const table = document.querySelector("table")
  const row = document.createElement('tr')

  const date = document.createElement('td')
  row.appendChild(date)
  date.textContent = data.date

  const exercise = document.createElement('td')
  row.appendChild(exercise)
  exercise.textContent = data.exercise

  const sets = document.createElement('td')
  row.appendChild(sets)
  sets.textContent = data.sets

  const reps = document.createElement('td')
  row.appendChild(reps)
  reps.textContent = data.reps

  const weight = document.createElement('td')
  row.appendChild(weight)
  weight.textContent = data.weight

  const button = document.createElement('button')
  const deleteColumn = document.createElement('td')
  deleteColumn.appendChild(button)
  row.appendChild(deleteColumn)
  button.textContent = "Delete"
  button.onclick = deleteLog
}*/