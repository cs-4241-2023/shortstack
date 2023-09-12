// FRONT-END (CLIENT) JAVASCRIPT HERE


const submit = async function( event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()


  const form = document.querySelector('form')

  let task=form["Task"].value;
  let deadlineDate=new Date(form["Deadline"].value);
  let creationDate=new Date(form["CreationDate"].value);


  let taskValid=task!=="" && task!==undefined;
  let dateValid=creationDate.value !== "";
  let deadlineValid=deadlineDate.value !== "";

  if(!taskValid){
    alert("Task is invalid");
  }
  if(!dateValid){
    alert("Date is invalid");
  }
  if(!deadlineValid){
    alert("Deadline is invalid");
  }

  if(taskValid && dateValid && deadlineValid){

    creationDate.setDate(creationDate.getDate()+1);
    let creation=creationDate.toLocaleDateString();

    deadlineDate.setDate(deadlineDate.getDate()+1);
    let deadline=deadlineDate.toLocaleDateString();

    let json = { task, creation, deadline};
    let body = JSON.stringify( json );
    console.log("Body: " +body);
    const response = await fetch( '/json', {
          method:'POST',
          body
        })
    const data = await response.json();
    LoadFromServer(data);
    ClearForm();
  }
}

function JudgePriority(deadline){
  let today=new Date();
  let dateDiff=DateDifference(today,new Date(deadline));
  let priority="High Priority"
  if(dateDiff>2){
    priority="Low Priority";
  }else if(dateDiff>1){
    priority="Medium Priority";
  }else if(isNaN(dateDiff)){
    priority="NaN";
  }
  return priority;
}

function DateDifference(day1,day2){
  let date1=Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
  let date2= Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());

  return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
}

function CreateFirstRow(){
  let row=document.createElement("tr");
  row.append(CreateHeaderCell(""));
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

function CreateRow(task,creation,deadline,priority,index){
  let row=document.createElement("tr");
  row.append(CreateDeleteButton(index));
  row.append(CreateCell(task));
  row.append(CreateCell(creation));
  row.append(CreateCell(deadline));
  row.append(CreateCell(priority));
  return row;
}

const deleteData = (dataIndex) => {
  const body = dataIndex;

  fetch( "/json", {
    method:"DELETE",
    body
  }).then(() =>{
    window.location.reload();
  })
}

function ClearForm(){
  const form = document.querySelector( '#addItemContainer' );
  form.Task.value="";
  form.Deadline.value="";
  form.CreationDate.value="";
}

function CreateDeleteButton(index){
  let json = { index};
  let dataIndex = JSON.stringify( json );
  const cell = document.createElement('td');
  cell.className="delete";

  const button=document.createElement('button');
  button.className="delete-button";
  button.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  button.onclick= (e) => {
    deleteData(dataIndex);
  }
  cell.append(button);
  return cell;
}

function CreateCell(cellInfo){
  const cell = document.createElement('td');
  cell.innerHTML = `<p>${cellInfo}</p>`;
  return cell;
}

function LoadFromServer(data){
  const table=document.createElement("table");
  let firstRow=CreateFirstRow();

  table.append(firstRow);
  data.forEach((item,index) => {
    console.log(index);
    let row=CreateRow(item["task"],
                                          item["creation"],
                                          item["deadline"],
                                          JudgePriority(item["deadline"]),
                                          index);
    table.append(row);
  });

  let htmlTable=document.getElementById("task-table");
  htmlTable.replaceChildren();
  htmlTable.append(table);
}

window.onload = async function() {
  const addButton = document.querySelector(".add-button");
  addButton.onclick = submit;

  const response = await fetch( '/json', {
    method:'GET'
  })
  const data = await response.json();
  LoadFromServer(data);
}