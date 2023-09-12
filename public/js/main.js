// FRONT-END (CLIENT) JAVASCRIPT HERE
let selectedRow = -1;

function updateTable(json) {
  let table = document.getElementById("list");
  let oldBody = table.getElementsByTagName("tbody");
  if (oldBody[0] !== undefined) {
    table.removeChild(oldBody[0]);
  }
  let index = -1;
  let body = document.createElement("tbody");
  json.forEach((item)=>{
    index++;
    item.id = index;
    let tr = document.createElement("tr");
    tr.onclick=function(){
      selectedRow = item.id;
      updateSelected();
    };
    let name = document.createElement("td");
      name.innerText=item.CreatureName;
      tr.appendChild(name);
    let hp = document.createElement("td");
      hp.innerText=item.CurrHP;
      tr.appendChild(hp);
    let condition = document.createElement("td");
      condition.innerText=item.status;
      tr.appendChild(condition);
    let armorClass = document.createElement("td");
      armorClass.innerText=item.AC;
      tr.appendChild(armorClass);
    let desc = document.createElement("td");
      desc.innerText=item.Description;
      tr.appendChild(desc);
    body.appendChild(tr);
  });
  table.appendChild(body);
}

async function loadTable() {
  const response = await fetch('/jsonData.json');
  const data = await response.json();
  updateTable(data);
}

function clearFields(event){
  event.preventDefault();
  let fields = document.querySelectorAll('input[type=text]');
  fields.forEach((field)=>field.value="");
  document.getElementById("CurrHP").value = 0;
  document.getElementById("MaxHP").value = 0;
  document.getElementById("AC").value = 10;
}

async function deleteEntry(event){
  if(selectedRow!==-1) {
    event.preventDefault();
    const body = selectedRow;
    const response = await fetch('/deleteEntry', {
      method: 'DELETE',
      body
    })
    const result = loadTable();
    selectedRow--;
    updateSelected();
  }
}

function updateSelected(){
  if(selectedRow!==-1){
    let select = document.getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[selectedRow]
        .getElementsByTagName("td")[0].innerText;
    document.getElementById("selectedName").value = select;
    //console.log(select);
  }else{
    document.getElementById("selectedName").value = "";
  }
}

function deselect(){
  selectedRow = -1;
  updateSelected();
}

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const nameInput = document.querySelector( '#Name' ),
        hpInput = document.querySelector('#CurrHP'),
        maxHpInput = document.querySelector('#MaxHP'),
        acInput = document.querySelector('#AC'),
        descInput = document.querySelector('#Desc'),
        json = { CreatureName: nameInput.value, MaxHP: maxHpInput.value,
          CurrHP: hpInput.value, AC: acInput.value, Description: descInput.value},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  //console.log( 'text:', text )
  const result = loadTable()
}

window.onload = function() {
  const submitButton = document.getElementById("submit");
  submitButton.onclick = submit;
  const clearButton = document.getElementById("clear");
  clearButton.onclick = clearFields;
  const deleteButton = document.getElementById("selectDelete");
  deleteButton.onclick = deleteEntry;
  const deselectButton = document.getElementById("deselect");
  deselectButton.onclick = deselect;
  const result = loadTable();
}