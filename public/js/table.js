const submit = async function (event) {
  event.preventDefault();

  const input = document.querySelector("#task"),
    json = { task: input.value },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();

  console.log("text:", text);
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
