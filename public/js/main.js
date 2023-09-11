const submit = async function (event) {
  event.preventDefault()
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const started = document.querySelector("#started");
  const finished = document.querySelector("#finished");
  const rating = document.querySelector("#rating");

  if (title.value == '' || author.value == '' || started.value == '' || finished.value == '' || rating.value == '') {
    alert('Please fill in all fields');
    return false;
  }


  json = {
    title: title.value,
    author: author.value,
    started: started.value,
    finished: finished.value,
    rating: rating.value,
  },
    body = JSON.stringify(json)

  const response = await fetch('/submit', {
    method: 'POST',
    body
  })
  const data = await response.json()
  updateTable(data);
}
const removeRow = async function (bookTitle) {

  let json = { titleToRemove: bookTitle }
  let body = JSON.stringify(json)
  fetch('/remove', {
    method: 'DELETE',
    body
  }).then(response => response.json())
    .then(json => {
      updateTable(json)
    })
  return false;
}


const updateTable = function (jsonData) {
  const table = document.querySelector("table")
  console.log(table)
  table.innerHTML = "<tr> <th>Title</th> <th>Author</th> <th>Started</th><th>Finished</th><th>Days to Read</th><th>Rating</th><th>Delete</th></tr>"


  jsonData.forEach(entry => {
    table.innerHTML += `<tr> <td>${entry.title}</td> <td>${entry.author}</td> <td>${entry.started}</td> <td>${entry.finished}</td> <td>${entry.days}</td> <td>${entry.rating}</td><td><button onclick="removeRow(\'${entry.title}\')">X</button></td></tr>`
  })
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit
  fetch('/data', {
    method: 'GET',
  }).then(response => response.json())
    .then(json => {
      updateTable(json)
    })
}

