// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const form = document.querySelector("#addTaskForm");
  const formData = new FormData(form);
  // get all fields in variables
  const taskName = formData.get("taskName");
  const taskDescription = formData.get("taskDescription");
  const taskDeadline = formData.get("taskDeadline");
  const taskPriority = formData.get("taskPriority");

  const json = {
    taskName,
    taskDescription,
    taskDeadline,
    taskPriority,
  };
  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();

  tasks = JSON.parse(text);
  console.log("new tasks list: ", tasks);

  // const input = document.querySelector("#yourname"),
  //   json = { yourname: input.value },
  //   body = JSON.stringify(json);

  // const response = await fetch("/submit", {
  //   method: "POST",
  //   body,
  // });

  // const text = await response.text();

  // console.log("text:", text);
};

window.onload = function () {
  const button = document.getElementById("addTaskFormSubmitBtn");
  button.onclick = submit;
};
