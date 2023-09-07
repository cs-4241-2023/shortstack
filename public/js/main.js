// FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()


  const form = document.querySelector('form')

  let task=form["Task"].value;
  let deadline=form["Deadline"].value;
  let creationDate=form["CreationDate"].value;

  let taskValid=task!=="" && task!==undefined;
  let dateValid=creationDate.value !== "";
  let deadlineValid=deadline.value !== "";

  if(!taskValid){
    alert("Task is invalid");
  }
  if(!dateValid){
    console.log(task);
    alert("Date is invalid");
  }

  if(taskValid && dateValid){
    let priority=JudgePriority(deadline);

    let json = { row: {task,creationDate,deadline,priority,} };
    let body = JSON.stringify( json );
    console.log(body);
    const response = await fetch( '/json', {
          method:'POST',
          body
        })
    const data = await response.json();
    const table=document.createElement("table");
    let firstRow=CreateFirstRow();

    table.append(firstRow);
    data.forEach(item => {
            let row=CreateRow(item["task"],item["creation_date"],item["deadline"],JudgePriority(item["deadline"]));
            table.append(row);
          });
    document.getElementById("task-table").append(table);
    ClearForm();
  }


}

function JudgePriority(deadline){
  let today=new Date();
  let dateDiff=deadline-today;
  let priority="High Priority"
  if(dateDiff>3){
    priority="Low Priority";
  }else if(dateDiff>1){
    priority="Medium Priority";
  }
  return priority;
}

function CreateFirstRow(){
  let row=document.createElement("tr");
  row.append(CreateHeaderCell("Task"));
  row.append(CreateHeaderCell("Creation Date"));
  row.append(CreateHeaderCell("Deadline"));
  row.append(CreateHeaderCell("Priority"));
  return row;
}

function CreateHeaderCell(cellInfo){
  const cell = document.createElement('th');
  cell.innerHTML = `<p>${cellInfo}</p>`;
  return cell;
}

function CreateRow(task,creationDate,deadline,priority){
  let row=document.createElement("tr");
  row.append(CreateCell(task));
  row.append(CreateCell(creationDate));
  row.append(CreateCell(deadline));
  row.append(CreateCell(priority));
  return row;
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

function ClearForm(){
  const form = document.querySelector( '#addItemContainer' );
  form.Task.value="";
  form.Deadline.value="";
  form.CreationDate.value="";
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

  return deadline.toLocaleDateString();
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
  console.log("Load Data");
  DeleteContents();

  const data = await response.json();

  LoadTable(data);
}

function LoadTable(data){
  let table=document.getElementById('task-table');

  data.forEach( d => {
    const row = document.createElement('tr')
    let deadline=CreateDeadline(d.creation_date,d.priority);
    row.appendChild( CreateDeleteButton(data.indexOf(d)) );
    row.appendChild( CreateCell(d.task) );
    row.appendChild( CreateCell(d.creation_date) );
    row.appendChild( CreateCell(deadline));
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