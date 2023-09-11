const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let cardata = [];
let nextId = 1; // Initialize ID counter

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
  else if( request.method === 'PUT' ){
    handlePut( request, response ) 
  }
  else if( request.method === 'DELETE' ){
    handleDelete( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
      const requestData = JSON.parse(dataString);

      if (requestData.hasOwnProperty('year') && requestData.hasOwnProperty('mpg')) {
        const year = Number(requestData.year); 
        const mpg = Number(requestData.mpg);   
        const currentYear = new Date().getFullYear();
        const rating = currentYear - year + mpg;

        // Create rating field in backend
        requestData.rating = rating;
        
        requestData.id = nextId++;
        
        cardata.push(requestData);
    }

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(JSON.stringify(requestData));
  });
};


const handlePut = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    const updatedData = JSON.parse(dataString);

    if (updatedData.hasOwnProperty('id')) {
      const idToUpdate = updatedData.id;
      const indexToUpdate = cardata.findIndex((car) => car.id === idToUpdate);

      if (indexToUpdate !== -1) {
        cardata[indexToUpdate] = updatedData;

        // Recalculate the rating based on the updated MPG value and year
        const year = Number(updatedData.year);
        const mpg = Number(updatedData.mpg);
        const currentYear = new Date().getFullYear();
        const rating = currentYear - year + mpg;

        // Update the rating field in the updated data
        updatedData.rating = rating;

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(JSON.stringify(updatedData));
      } 
    } 
  });
};

const handleDelete = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
    dataString += data;
  });

  request.on('end', function() {
    const requestData = JSON.parse(dataString);
    if (requestData.hasOwnProperty('id')) {
      const idToDelete = requestData.id;

      const indexToDelete = cardata.findIndex((car) => car.id === idToDelete);

      if (indexToDelete !== -1) {
        // Remove the entry from the cardata array
        const deletedData = cardata.splice(indexToDelete, 1)[0];

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(JSON.stringify(deletedData));
      } 
    }
  });
};

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
