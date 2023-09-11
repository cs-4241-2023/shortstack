

window.onload = function () {
  //const button = document.querySelector("button");
  //button.onclick = submit;

  const submitInfo = document.querySelector("#enter");
  submitInfo.onclick = addHours

  const setGoalGrade = document.querySelector("#setGoal");
  setGoalGrade.onclick = setGoal

}

const getResponse = async function (event) {
  event.preventDefault()

  const response = await fetch('/getTable', {
    method: 'GET',
  })

  const res = await response.json()
  return res
}

const drawTable = function (res) {
  const table = document.querySelector('tbody')

  table.innerHTML = ''

  let idx = 0;

  res.forEach(d => {

    const newRow = document.createElement('tr')

    for (let r in d) {
      const element = document.createElement('td')

      console.log(d)
      if(d[r] <= 0){
        element.innerText = 0
      } else {
        element.innerText = d[r]    
      }
      newRow.appendChild(element)
    }

    const buttonBox = document.createElement('td')

    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    let currIdx = idx
    deleteButton.onclick = function (event) { deleteEntry(event, currIdx) }
    buttonBox.appendChild(deleteButton)
    newRow.appendChild(buttonBox)

    table.appendChild(newRow)
    idx += 1
  })
}

const setGoal = async function (event) {
  event.preventDefault()

  const goal = document.querySelector('#desiredGoal'),
    json = { goal: goal.value }
  body = JSON.stringify(json)

  const response = await fetch('/setGoal', {
    method: 'POST',
    body
  })

  const res = await response.json()

  const displayGoal = document.querySelector('#termGradeGoal')

  displayGoal.innerText = res.goal
  displayGoal.className = res.goal

  const editGoalButton = document.createElement('button')
  editGoalButton.onclick = editGoal
  editGoalButton.innerText = "Change Goal"

  goal.style.visibility = "hidden"
  document.querySelector('#setGoal').style.visibility = "hidden"

  const editGoalForm = document.querySelector('#editGoalForm')
  editGoalForm.style.visibility = "visible"
  editGoalForm.appendChild(editGoalButton)

}

const editGoal = async function (event) {
  event.preventDefault()

  const goal = document.querySelector('#newDesiredGoal'),
    json = { goal: goal.value }
  body = JSON.stringify(json)

  const response = await fetch('/editGoal', {
    method: 'POST',
    body
  })

  const res = await response.json()

  const displayGoal = document.querySelector('#termGradeGoal')

  displayGoal.innerText = res.newGoal.goal
  displayGoal.className = res.newGoal.goal

  drawTable(res.appdata)
}


const addHours = async function (event) {

  event.preventDefault()

  const input_date = document.querySelector('#date'),
    input_hours = document.querySelector('#hours'),
    json = { date: input_date.value, hours: input_hours.value },
    body = JSON.stringify(json)

  const response = await fetch('/addHours', {
    method: 'POST',
    body
  })

  const res = await response.json()

  drawTable(res)

}

const deleteEntry = async function (event, index) {
  event.preventDefault()

  const json = { idx: index },
    body = JSON.stringify(json)

  const response = await fetch('/deleteEntry', {
    method: 'POST',
    body
  })

  const res = await response.json()

  drawTable(res)

}
