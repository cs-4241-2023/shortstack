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
  
  const termGoal = document.createElement('p')
  termGoal.innerText = res.goal
  termGoal.className = res.goal
  displayGoal.appendChild(termGoal)
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

  const table = document.querySelector( '#badmintonDisplay' )

  const newRow = document.createElement('tr')

  for(let d in res){
    const element = document.createElement('td')
    
    //handling having negative time remaining
    if(d === 'remaining' && res[d] <= 0){
      element.innerText = 0
    } else {
      element.innerText = res[d]
    }


    newRow.appendChild(element) 
  }

    table.appendChild(newRow)

}
