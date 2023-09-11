const http = require('http');
const fs = require('fs');
const mime = require('mime');
const url = require('url');
const querystring = require('querystring');
const port = process.env.PORT || 3000;

const dir = 'public/';
const appdata = [
  { 'date': '2023-09-04', 'type': 'Cardio', 'distance': 5.0, 'time': 60, 'heartRate': 150 },
  // Add more initial data as needed
];

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  }
});

// Create an endpoint to serve appdata object
server.on('/get-appdata', function (request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(appdata));
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);
  const parsedURL = url.parse(request.url);
  
  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else if (request.url === '/training-data') {
    // Handle GET request for training data
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  } else if (parsedURL.pathname === '/submit-data') {
    // Parse inputs from form submission
    const queryParams = querystring.parse(parsedURL.query);
    const newDict = {'date': queryParams.date, 
                     'type': queryParams.type, 
                     'distance': parseFloat(queryParams.distance), 
                     'time': parseInt(queryParams.time), 
                     'heartRate': parseInt(queryParams.heartRate) };
    appdata.push(newDict);
    console.log("UPDATED ENTRIES: " + appdata);
    sendFile(response, 'public/index.html');
  } else if (parsedURL.pathname === '/update') {
    // Parse inputs from form submission
    const queryParams = querystring.parse(parsedURL.query);
    const index = queryParams.index;
    const newDict = {'date': queryParams.date, 
                     'type': queryParams.type, 
                     'distance': parseFloat(queryParams.distance), 
                     'time': parseInt(queryParams.time), 
                     'heartRate': parseInt(queryParams.heartRate) };
    appdata[index] = newDict;
    console.log("UPDATED ENTRIES: " + appdata);
    sendFile(response, 'public/index.html');
  } else if (parsedURL.pathname === '/delete') {
    // Parse inputs from existing session data
    const queryParams = querystring.parse(parsedURL.query);
    appdata.splice(parseInt(queryParams.index),1);
    console.log("POST-DELETION: " + appdata);
    sendFile(response, 'public/index.html');
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = '';
  console.log(request.body);

  request.on('data', function (data) {
    dataString += data;
  });
  console.log("this is handling a post request");

  request.on('end', function () {
    const newData = JSON.parse(dataString);

    // Check if the data includes an "editIndex" property for modification
    if (newData.hasOwnProperty('editIndex')) {
      // Update an existing training session
      const index = newData.editIndex;
      appdata[index] = newData.data;
    } else {
      // Add the new training session data to the appdata array
      appdata.push(newData);
    }

    // Respond with a success status
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Data added/updated successfully');
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHead(200, { 'Content-Type': type });
      response.end(content);
    } else {
      response.writeHead(404);
      response.end('404 Error: File Not Found');
    }
  });
};

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});