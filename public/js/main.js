// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelectorAll("#name, #mail, #asnmt, #date, #msg"),
    //add the date to the json and send to the server
    json = {
      name: input[0].value,
      mail: input[1].value,
      asnmt: input[2].value,
      date: input[3].value,
      msg: input[4].value,
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  }).then(async function (response) {
    let data = await response.json();
    data.forEach((entry, index) => (entry.id = index));
    render(data);
    console.log(data);
  });

  //when doing assignment- don't send text to server--> do json instead
  //create new file in the row with assignment, due date, calculate priority --> by date due
};
const list = document.createElement("ul");

//render the priority field
async function render(data) {
  list.innerHTML = "";
  const item1 = document.createElement("p");
  const button_sort = document.createElement("button");
    button_sort.innerText = "Sort By Priority";
    button_sort.onclick = function() {
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
    item.appendChild(button);
    list.appendChild(item);
  }
}

async function prioritysort(data) {
  const sortedArray = [];
  console.log(data);
  for(let i = 0; i < data.length; i++){
    const d = data[i];
    if(d.priority == 'High'){
      sortedArray.push(data[i]);
    }
  }
  for(let i = 0; i < data.length; i++){
    const d = data[i];
    if(d.priority == 'Medium'){
      sortedArray.push(data[i]);
    }
  }
  for(let i = 0; i < data.length; i++){
    const d = data[i];
    if(d.priority == 'Low'){
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

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
  document.body.appendChild(list);
};
