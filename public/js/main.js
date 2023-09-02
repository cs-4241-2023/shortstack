// FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()


  const form = document.querySelector('form')

  let task=form["Task"];
  let priority=form["Priority"];
  let creationDate=form["CreationDate"];

  let taskValid=task!=="" && task!==undefined;
  let dateValid=creationDate.value !== "";
  if(!taskValid){

    alert("Task is invalid");
  }
  if(!dateValid){
    console.log(task);
    alert("Date is invalid");
  }

  if(taskValid && dateValid){
    let deadline=CreateDeadline(creationDate,priority);
    json = { row: {task,priority,creationDate,deadline} };
    body = JSON.stringify( json );

    const response = await fetch( '/submit', {
          method:'POST',
          body
        })
    await LoadData(response);
  }


}

function onInvalidDate(){
  alert("Date is invalid");
  dateValid=false;
}

function CreateDeleteButton(index){
  const cell = document.createElement('td');
  cell.className="delete";
  cell.innerHTML='<button id="delete-button" class="delete-button" onclick="DeleteRow('+index+')"><i class="fa-solid fa-trash"></i></button>';
  return cell;
}

async function DeleteRow(index){
  const body = JSON.stringify({index});

  const response=await fetch( "/submit", {
    method:"GET",
    body
  }).then(response => response.json())
  data = await response.json()
}

function ValidateDate(dateString) {
  let date=new Date(dateString);
  if (isNaN(date)) {
    return false;
  }
}

function ClearForm(){
  const form = document.querySelector( '.add-button' );
  form.Task="Task";
  form.Priority="High Priority";
  form.CreationDate="Creation Date: MM/DD/YYYY";
}

function DeleteContents(){
  let table=document.getElementById('task-table');
  table.innerHTML="<th></th><th>Task</th><th>Creation Date</th><th>Deadline</th><th>Priority</th>";
}

function CreateCell(cellInfo){
  const cell = document.createElement('td');
  cell.innerHTML = `<p>${cellInfo}</p>`;
  return cell;
}

function CreateDeadline(creationDate, priority){
  //let creationDate=creation_date;
  let todaysDate=new Date();
  let dateDifference=todaysDate-creationDate;

  let deadline=new Date(todaysDate.getFullYear(),todaysDate.getMonth());


  if(dateDifference===0){
    deadline=creationDate;
  }else if(priority==="High"){
    deadline.day=todaysDate.getDate()+1;
  }else if(priority==="Medium"){
    deadline.day=todaysDate.getDate()+2;
  }else if(priority==="Low"){
    deadline.day=todaysDate.getDate()+3;
  }
  return CreateCell(deadline.toLocaleDateString());
}

const LoadDataFromServer=() => {
  fetch( "/json", {
    method:"GET",
  })
      .then(response => response.json())
      .then(response => {
        response.forEach((item, index) => {
          addTableRow(entryCount);
          setEntry(index, item);
          entryCount++;
        });
      })
}

async function LoadData(response){
  DeleteContents();

  const data = await response.json();

  LoadTable(data);
}

function LoadTable(data){
  let table=document.getElementById('task-table');

  data.forEach( d => {
    const row = document.createElement('tr')
    row.appendChild( CreateDeleteButton(data.indexOf(d)) );
    row.appendChild( CreateCell(d.task) );
    row.appendChild( CreateCell(d.creation_date) );
    row.appendChild( CreateDeadline(d.creation_date,d.priority));
    row.appendChild( CreateCell(d.priority) );
    table.appendChild(row);
  })
}

window.onload = async function() {
  LoadDataFromServer();

  //Load server data

  const addButton = document.querySelector(".add-button");
  addButton.onclick = submit;

  const deleteButton = document.querySelector(".delete-button");
}