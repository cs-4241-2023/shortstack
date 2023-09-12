'use strict'
const { randomInt } = require('crypto')

const http = require('http'), // http server core module
  fs = require('fs'), // needed for loading static files
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require('mime'), // mime to determine file type from file name extension
  dir = 'public/', // directory where static files are stored
  port = 3000 // 3000 is the port where the server is listening

// serverPlayerLog is the test data that is stored on server
let serverPlayerLog = [
  { name: 'defaultplayer', color: 'red', score: 0, rank: 0 }
]

// Create http server
const server = http.createServer(function (request, response) {
  if (request.method === 'GET') { // client requests a resource
    handleGet(request, response)
  } else if (request.method === 'POST') { // client is adding data to server
    handlePost(request, response)
  } else if (request.method === 'DELETE') { // client is deleting data
    handleDelete(request, response)
  } else if (request.method === 'PUT') { // client is updating data
    handlePut(request, response)
  }
})

// Client requests a resource
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)  // remove leading '/' from URL

  if (request.url === '/') {
    sendFile(response, 'public/index.html') // send index.html to client
  } else {
    sendFile(response, filename) // send requested file to client
  }
}

// Client is adding data to server
const handlePost = function (request, response) {
  let clientDataString = ''

  request.on('data', function (data) { // add data to clientDataString as it comes in
    clientDataString += data
  })

  request.on('end', function () { // end when client is done sending data
    let clientData = {}
    clientData = JSON.parse(clientDataString) // parse clientDataString into JSON object


    let serverData = {}
    serverData.name = clientData.name;
    serverData.color = clientData.color;
    serverData.score = clientData.score;
    serverData.rank = 0; // default rank is 0


    console.log('Client Data:' + JSON.stringify(clientData))
    console.log('Server Data (Client Data with rank):' + JSON.stringify(serverData))


    serverPlayerLog.push(serverData) // add new object to serverPlayerLog array
    // ... do something with the data here!!!

    // sort serverPlayerLog by score
    serverPlayerLog.sort((a, b) => (a.score < b.score) ? 1 : -1)
    serverPlayerLog.forEach((player, index) => {
      player.rank = index + 1;
    })

    // print full serverPlayerLog to console
    console.log('Server Player Log: ' + JSON.stringify(serverPlayerLog))

    response.writeHead(200, "OK", { 'Content-Type': 'text/json' }) // send response to client
    response.end(JSON.stringify(serverPlayerLog))
  })
}

// Client is deleting data from server
const handleDelete = function (request, response) {
  // request is playerName string from client to delete
  // delete that player from serverPlayerLog

  let clientDataString = ''

  request.on('data', function (data) { // add data to clientDataString as it comes in
    clientDataString += data
  })

  request.on('end', function () { // end when client is done sending data
    console.log('Server received complete DELETE request')

    let clientData = {}
    clientData = JSON.parse(clientDataString) // parse clientDataString into JSON object
    let playerToDelete = clientData;

    // print playerToDelete to console
    console.log('Player to delete: ' + JSON.stringify(playerToDelete))

    console.log('BEFORE delete: ' + JSON.stringify(serverPlayerLog))

    //loop through serverPlayerLog and delete player with matching name
    serverPlayerLog.forEach(player => {
      if (playerToDelete.name === player.name) {
        console.log('INSIDE DELETE PORTION BEFORE SLICE')
        // delete playerToDelete entry in serverPlayerLog with slice
        serverPlayerLog.splice(serverPlayerLog.indexOf(player), 1)
      }
    })

    // sort serverPlayerLog by score
    serverPlayerLog.sort((a, b) => (a.score < b.score) ? 1 : -1)
    serverPlayerLog.forEach((player, index) => {
      player.rank = index + 1;
    })

    console.log('AFTER delete: ' + JSON.stringify(serverPlayerLog))
    response.writeHead(200, "OK", { 'Content-Type': 'text/json' }) // send response to client
    response.end(JSON.stringify(serverPlayerLog))
  })
}








// Send file to client (called by handleGet when client requests a resource)
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

server.listen(process.env.PORT || port)
