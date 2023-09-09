const http = require('http'),
  fs = require('fs'),
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let appdata = [
  {
    'title': 'bookTitle',
    'author': 'bookAuthor',
    'started': '2023-01-01',
    'finished': '2023-02-01',
    'days': '31',
    'rating': 10,
  },
]

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
  else if (request.method === 'DELETE') {
    handleDelete(request, response)
  }
})
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)
  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  }
  else if (request.url === '/data') {
    console.log(JSON.stringify(appdata))
    response.writeHeader(200, { "Content-type": "text/json" });
    response.end(JSON.stringify(appdata));
  }
  else {
    sendFile(response, filename)
  }
}
const handlePost = function (request, response) {
  console.log("request URL" + request.url);
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })
  request.on('end', function () {
    let postResponse = JSON.parse(dataString);

    let days = daysTaken(postResponse.started, postResponse.finished)

    appdata.push({ title: postResponse.title, author: postResponse.author, started: postResponse.started, finished: postResponse.finished, days: days, rating: postResponse.rating })
    response.writeHead(200, "OK", { 'Content-Type': 'text/json' })
    response.end(JSON.stringify(appdata))
  })
}

const handleDelete = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })
  request.on('end', function () {
    let titleToRemove = JSON.parse(dataString).titleToRemove
    appdata = appdata.filter(function (n, i) {
      return n.title !== titleToRemove;
    })
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

const daysTaken = (startDate, endDate) => {
  console.log(startDate + endDate)
  let start = getDate(startDate);
  let end = getDate(endDate);

  if (start.getDate() && end.getDate()) {
    if (start.getTime() > end.getTime()) {
      console.log("Error, start must be before end.")
      return -1;
    }
    let timeDifference = start.getTime() - end.getTime();
    let dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24));
    console.log(dayDifference)
    return dayDifference;
  }
}

function getDate(stringDate) {
  var yearMonthDate = stringDate.split('-');
  return new Date(yearMonthDate[0], yearMonthDate[1], yearMonthDate[2]);
}

server.listen(process.env.PORT || port)
