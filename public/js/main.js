// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  console.log('passed3');
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const keyInput = document.querySelector('#key-input'),
    startInput = document.querySelector('#start-date-input'),
    endInput = document.querySelector('#end-date-input'),
    json = { key: keyInput.value, startDate: startInput.value, endDate: endInput.value },
    body = JSON.stringify(json);

  console.log('passed2');
  const response = await fetch('/submit', {
    method: 'POST',
    body
  })

  const data = await response.json()

  console.log('text:', data)
  displayResults(data);
}

const firstLoad = async function () {
  const response = await fetch("/getData");

  const data = await response.json();

  displayResults(data);
}

const displayResults = (data) => {
  console.log(data.map(d => d.key));
  document.getElementById('data').innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    let tableRow = document.createElement('tr');
    let keyColumn = document.createElement('td'),
      startDateColumn = document.createElement('td'),
      endDateColumn = document.createElement('td'),
      dueDateColumn = document.createElement('td');

    let textKey = document.createTextNode(data[i].key),
      textStart = document.createTextNode(data[i].startDate),
      textEnd = document.createTextNode(data[i].endDate),
      start = new Date(data[i].startDate),
      end = new Date(data[i].endDate),
      due = end.getTime() - start.getTime(),
      textDiff = document.createTextNode(due / (1000 * 60 * 60 * 24));
    keyColumn.appendChild(textKey);
    startDateColumn.appendChild(textStart);
    endDateColumn.appendChild(textEnd);
    dueDateColumn.appendChild(textDiff);
    tableRow.appendChild(keyColumn);
    tableRow.appendChild(startDateColumn);
    tableRow.appendChild(endDateColumn);
    tableRow.appendChild(dueDateColumn);
    document.querySelector('#data').appendChild(tableRow);
  }
}

window.onload = function () {
  document.querySelector('#taskForm').onsubmit = submit;
  firstLoad();
}