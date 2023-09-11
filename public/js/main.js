// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelectorAll(".todo_add"),
    json = {
      todo_list_item: input[0].value,
      datetime: input[1].value,
      priority: input[2].value,
    },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();

  console.log("text:", text);

  // create table rows
  const table = JSON.parse(text)
    .map((entry) => {
      return `<tr>
        <td>${entry.todo_list_item}</td>
        <td>${entry.datetime}</td>
        <td>${entry.priority}</td>
        <td>${entry.due_date}</td>
     </tr>`;
    })
    .join("");

  document.querySelector("#todo_table").innerHTML = table;

  console.log("text:", text);
  console.log("(Body) Request Resulted in: ", body);
};

const delete_todo = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelector("#delete_item"),
    json = {
      item_to_delete: input.value
    },
    body = JSON.stringify(json);
  

  const response = await fetch("/delete", {
    method: "POST",
    body,
  });

  const text = await response.text();
  
    // create table rows
  const table = JSON.parse(text)
    .map((entry) => {
      return `<tr>
        <td>${entry.todo_list_item}</td>
        <td>${entry.datetime}</td>
        <td>${entry.priority}</td>
        <td>${entry.due_date}</td>
     </tr>`;
    })
    .join("");

  document.querySelector("#todo_table").innerHTML = table;

  console.log("text:", text);
  console.log("(Body) Request Resulted in: ", body);

  console.log("[Deletion] text:", text);
  console.log("[Deletion] (Body) Request Resulted in: ", body);
};

window.onload = function () {
  const submit_button = document.getElementById("submit_to_todo");
  const delete_button = document.getElementById("delete_from_todo");

  submit_button.onclick = submit;
  delete_button.onclick = delete_todo;
  
};