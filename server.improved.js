const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const tasks = [];


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handlePost = function (request, response) {
  let dataString = '';

  request.on('data', function (data) {
    dataString += data;
  });

  request.on('end', function () {
    const newTask = JSON.parse(dataString);
    newTask.timestamp = new Date(); // Add a timestamp to the task
    tasks.push(newTask);

    console.log('New Task:', newTask);

    response.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
    response.end('Task added successfully');
  });
};


const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === '/') {
    sendFile(response, 'public/index.html');
  } else if (request.url === '/tasks') { // New endpoint for tasks
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(tasks));
  } else {
    sendFile(response, filename);
  }
};



const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  if (filename === 'public/index.html') {
    fs.readFile(filename, function (err, content) {
      if (err === null) {
        response.writeHeader(200, { 'Content-Type': type });
        response.end(content);
      } else {
        response.writeHeader(404);
        response.end('404 Error: File Not Found');
      }
    });
  } else {
    // Handle other file types or endpoints as needed
    // You can keep the existing code here
  }
};


server.listen( process.env.PORT || port )
