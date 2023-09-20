// FRONT-END (CLIENT) JAVASCRIPT HERE
let modifyData = false
let modId = null
const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  let input = document.querySelectorAll("#name, #mail, #asnmt, #date, #msg"),
    json = {
      name: input[0].value,
      mail: input[1].value,
      asnmt: input[2].value,
      date: input[3].value,
      msg: input[4].value,
    }
  if (modifyData === true) { 
    json.id = modId
  } 
  const body = JSON.stringify(json);

  fetch((modifyData === false) ? "/submit" : "/modify", {
    method: "POST",
    body: body,
  }).then(async function (response) {
    let data = await response.json();
    data.forEach((entry, index) => (entry.id = index));
    render(data);
  });

  };
const list = document.createElement("ul");

//render the priority field
async function render(data) {
  list.innerHTML = "";
  modifyData = false
  modId = null
  document.getElementById('mainForm').reset()
  const item1 = document.createElement("p");
  const button_sort = document.createElement("button");
  button_sort.innerText = "Sort By Priority";
  button_sort.onclick = function () {
    prioritysort(data);
  };

  item1.appendChild(button_sort);
  list.appendChild(item1);
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const item = document.createElement("li");
    item.innerHTML = `<b>Priority</b> : ${d.priority}  <b>Name</b> : ${d.name}  <b>Email</b> : ${d.mail}  <b>Assignment</b> : ${d.asnmt} <b>Reason</b> : ${d.msg}`;
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.onclick = function () {
      del(d.id);
    };
    const buttonmod = document.createElement("button");
    buttonmod.innerText = "Modify";
    buttonmod.id = 'btn' + d.id
    buttonmod.onclick = function () {
      mod(d);
    };
    
    item.appendChild(button);
    item.appendChild(buttonmod);
    list.appendChild(item);
  }
}

async function prioritysort(data) {
  const sortedArray = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.priority == "High") {
      sortedArray.push(data[i]);
    }
  }
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.priority == "Medium") {
      sortedArray.push(data[i]);
    }
  }
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.priority == "Low") {
      sortedArray.push(data[i]);
    }
  }
  data = sortedArray;
  render(data);
}

async function del(id) {
  fetch("/delete", {
    method: "POST",
    body: JSON.stringify({ id: id }),
  }).then(async function (response) {
    let data = await response.json();
    data.forEach((entry, index) => (entry.id = index));
    render(data);
    console.log(data);
  });
}

async function mod(data) {
  modifyData = true
  modId = data.id
  document.getElementById('name').value = data.name;
  document.getElementById('mail').value = data.mail;
  document.getElementById('asnmt').value = data.asnmt;
  document.getElementById('date').value = data.date;
  document.getElementById('msg').value = data.msg;
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
  document.body.appendChild(list);
};
