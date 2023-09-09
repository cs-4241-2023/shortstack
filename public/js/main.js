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
  table.innerHTML = "<tr> <th>Title</th> <th>Author</th> <th>Started</th><th>Finished</th><th>Days taken to Read</th><th>Rating</th><th>Delete</th></tr>"


  jsonData.forEach(entry => {
    table.innerHTML += `<tr> <th>${entry.title}</th> <th>${entry.author}</th> <th>${entry.started}</th> <th>${entry.finished}</th> <th>${entry.days}</th> <th>${entry.rating}</th><th><button onclick="removeRow(\'${entry.title}\')">delete</button></th></tr>`
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

