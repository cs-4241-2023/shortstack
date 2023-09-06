"use strict"; // Use strict mode for better practices

// Import necessary modules
const http = require( 'http' ), // to create an http server
      fs   = require( 'fs' ), // work with files and directories on the server's file system
      mime = require( 'mime' ), // determine the MIME type of a file, it is a library not included in node.js which required npm install on local machine
      dir  = 'public/', // directory where server files are located
      port = 3000 // port number the server will listen for requests on

// Data which is hard-coded into the server (no database yet)
// Client can access this data from the server with GET request
// Or they can add to this data on the server with a POST request      
const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

// Create HTTP Server which handles both GET and POST requests
// Every time a request is made to the server, this callback function is called
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) { // GET - ask for content from server
    handleGet( request, response )    
  }else if( request.method === 'POST' ){ // POST - send content to server
    handlePost( request, response ) 
  }
})

// GET request handler
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

// POST request handler
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('test')
  })
}

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

// Tell server Listen for requests on HTTP port 3000
server.listen( process.env.PORT || port )
