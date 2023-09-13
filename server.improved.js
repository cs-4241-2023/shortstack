const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require('mime'),
    dir = 'public/',
    port = 3000

const appdata = [
    { 'name': 'Pumpkin Patch', 'primary_color': '#606C38', 'secondary_color': '#283618', 'teritary_color': '#FEFAE0', 'accent_1': '#DDA15E', 'accent_2': '#BC6C25', 'contrast': 2.26 },
    { 'name': 'Drywall', 'primary_color': '#FBFBF2', 'secondary_color': '#E5E6E4', 'teritary_color': '#CFD2CD', 'accent_1': '#A6A2A2', 'accent_2': '#847577', 'contrast': 1.2 },
    { 'name': 'Crime Scene', 'primary_color': '#FF2E00', 'secondary_color': '#7C7C7C', 'teritary_color': '#EEE5E9', 'accent_1': '#FDE12D', 'accent_2': '#2D2327', 'contrast': 1.12 },
]

const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    } else if (request.method === 'DELETE') {
        handleDelete(request, response);
    }
})

const handleGet = function(request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else if (request.url === '/json') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(appdata));
    } else {
        sendFile(response, filename)
    }
}
const handleDelete = function(request, response) {
    let dataString = ''

    request.on('data', function(data) {
        dataString += data
    })

    request.on('end', function() {
        let data = JSON.parse(dataString);
        const index = appdata.findIndex(item => item.name === data["name"]);
        if (index !== -1) {
            appdata.splice(index, 1);
        }
        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata));
    })
}

const handlePost = function(request, response) {
    let dataString = ''

    request.on('data', function(data) {
        dataString += data
    })

    request.on('end', function() {
        let data = JSON.parse(dataString);
        const index = appdata.findIndex(item => item.name === data["name"]);
        if (index === -1) {
            appdata.push(data);
            sortByContrast();
            response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
            response.end(JSON.stringify(appdata))
        } else {
            response.writeHead(400, "Bad Request", { 'Content-Type': 'text/plain' });
            response.end("Name already exists");
        }

    })
}

const sendFile = function(response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function(err, content) {

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

function sortByContrast() {
    appdata.sort(function(a, b) {
        return b.contrast - a.contrast;
    })
}

server.listen(process.env.PORT || port)