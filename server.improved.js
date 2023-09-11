const http = require('http'),
      fs = require('fs'),
      mime = require('mime'),
      dir = 'public/',
      port = 3000;


const appdata = [
  { text: 'Sample Task 1', completed: false, creation_date: '2023-09-01', priority: 'high', deadline: '2023-09-02' },
  { text: 'Sample Task 2', completed: false, creation_date: '2023-09-05', priority: 'medium', deadline: '2023-09-08' },
  { text: 'Sample Task 3', completed: false, creation_date: '2023-09-10', priority: 'low', deadline: '2023-09-17' }
];


const server = http.createServer(function(request, response) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST') {
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else if (request.url === '/appdata') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    const data = JSON.parse(dataString);

   
    const priorityDays = data.priority === 'high' ? 1 : data.priority === 'medium' ? 3 : 7;
    const creationDate = new Date(data.creation_date);
    const deadline = new Date(creationDate.setDate(creationDate.getDate() + priorityDays));

    data.deadline = deadline.toISOString().split('T')[0]; 

    appdata.push(data); 

    response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  });
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    if (err === null) {
      response.writeHeader(200, { 'Content-Type': type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end('404 Error: File Not Found');
    }
  });
};

server.listen(process.env.PORT || port);
