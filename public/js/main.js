// FRONT-END (CLIENT) JAVASCRIPT HERE
let taskData = []

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const form = document.querySelector("form")
  const body = parseForm(form)

  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(body),
  })

  const text = await response.text();

  taskData = JSON.parse(text)
  console.log(typeof(taskData))
  console.log("taskData:", taskData)
};

window.onload = function () {
  const button = document.querySelector("#save");
  button.onclick = submit;
};

// collect form data and create an object that will be passed to the server
function parseForm(formData) {
  let body = {};
  Object.keys(formData).forEach(key => {
    let element = formData.elements[key];
    if(element.type !== "submit" && element.type !== "button" && element.type !== "select") {
      // console.log(element)
      body[element.name] = element.value;
    } else if (element.type === "select") {
      console.log(element)
    }
  })
  return body;
}

function newTask() {
  const testButton = document.createElement('button')
  testButton.textContent = "test"
  document.querySelector("form").appendChild(testButton)
}
