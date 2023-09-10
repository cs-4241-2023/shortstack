// FRONT-END (CLIENT) JAVASCRIPT HERE

/*const submit = async function( event ) {
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

  const res = await response.json()
  

  console.log( res )

  const list = document.createElement('ul')

  res.forEach( d => {
    const item = document.createElement('ul');
    item.innerHTML = `<b>Model</b> : ${d.model}`
    console.log(d.model)
    list.appendChild(item)
  })

  document.body.appendChild(list)

}*/

window.onload = function() {
  //const button = document.querySelector("button");
  //button.onclick = submit;

  const submitInfo = document.querySelector( "#enter" );
  submitInfo.onclick = addHours

  const setGoalGrade = document.querySelector( "#setGoal" );
  setGoalGrade.onclick = setGoal


}

const setGoal = async function( event ) {
  event.preventDefault()

  const goal = document.querySelector( '#desiredGoal' ),
        json = { goal: goal.value }
        body = JSON.stringify( json )
  
  const response = await fetch( '/setGoal' , {
    method:'POST',
    body
  })

  const res = await response.json()
  console.log("res", res, res.goal)

  const displayGoal = document.querySelector( '#termGradeGoal' )
  
  displayGoal.innerText = res.goal
  displayGoal.className = res.goal
  /*
  const termGoal = document.createElement('p')
  termGoal.innerText = res.goal
  termGoal.className = res.goal
  displayGoal.appendChild(termGoal)
  */
  const editGoalButton = document.createElement('button')
  editGoalButton.onclick = editGoal
  editGoalButton.innerText = "Change Goal"

  goal.style.visibility = "hidden"
  document.querySelector( '#setGoal' ).style.visibility = "hidden"
  
  const editGoalForm = document.querySelector( '#editGoalForm' )
  editGoalForm.style.visibility = "visible"
  editGoalForm.appendChild(editGoalButton)

}

const editGoal = async function( event ) {
  event.preventDefault()

  const goal = document.querySelector( '#newDesiredGoal' ),
        json = { goal: goal.value }
        body = JSON.stringify( json )
  
  const response = await fetch( '/editGoal' , {
    method:'POST',
    body
  })

  const res = await response.json()
  console.log("res", res, res.goal)

  const displayGoal = document.querySelector( '#termGradeGoal' )
  
  displayGoal.innerText = res.goal
  displayGoal.className = res.goal
}


const addHours = async function( event ) {

  event.preventDefault()

  const input_date = document.querySelector( '#date' ),
        input_hours = document.querySelector( '#hours' ),
        json = { date: input_date.value, hours: input_hours.value },
        body = JSON.stringify( json )

  const response = await fetch( '/addHours', {
    method:'POST',
    body 
  })

  const res = await response.json()
  console.log("res: ", res)
  console.log("lOL")

  const table = document.querySelector( '#badmintonDisplay' )

  document.querySelector("#badmintonDisplay tr").remove
  //table.innerHTML = ''

  res.forEach( d => {

    const newRow = document.createElement('tr')

    for(let r in d){
      const element = document.createElement('td')
      
      //handling having negative time remaining
      if(d === 'remaining' && d[r] <= 0){
        element.innerText = 0
      } else {
        element.innerText = d[r]
      }
  
  
      newRow.appendChild(element) 
    }

    table.appendChild(newRow)
  })



}
