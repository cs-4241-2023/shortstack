const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require('mime'),
  crypto = require('crypto'),
  dir = 'public/',
  port = 3000

const inventory = [
  { 'uuid': '47ffd1bf-4bc4-4028-b1d0-4bb1f7212b0b', 'item': 'Baseball', 'amount': 25, 'unit_value': 2.10, 'total_value': 52.50 },
  { 'uuid': '76fba967-baec-46f1-9fa2-2383b6c4f7d7', 'item': 'Shoes', 'amount': 20, 'unit_value': 150.00, 'total_value': 3000.00 },
  { 'uuid': '46d67fca-9211-4fda-84a8-ac41a12cafc3', 'item': 'Table', 'amount': 1, 'unit_value': 25.03, 'total_value': 25.03 },
]

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } 
  else if (request.url === '/data') {
    response.writeHeader(200, { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(inventory))
    //console.log('data sent')
  }
  else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    const data = JSON.parse(dataString)

    // ... do something with the data here!!!
    switch (request.url) {
      case '/add':
        data['uuid'] = crypto.randomUUID()
        data['total_value'] = data['amount'] * data['unit_value']
        console.log('ADD:', data)

        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        response.end(JSON.stringify(data))
        break

      case '/delete':
        console.log('DELETE:', data)
        break

      default:
        console.log(`Unknown Post (${request.url}):`, data)
    }
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

server.listen(process.env.PORT || port)
