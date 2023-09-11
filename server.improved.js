const http = require( 'http' ), // http server core module
      fs   = require( 'fs' ), // needed for loading static files
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ), // mime to determine file type from file name extension
      dir  = 'public/', // directory where static files are stored
      port = 3000 // 3000 is the port where the server is listening

// appdata is the test data that will be sent to the client
let appdata = [
 {name: 'defaultplayer', color: 'red', score: 0, rank: 0}
]

// Create http server
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) { // client requests a resource
    handleGet( request, response )    
  }else if( request.method === 'POST' ){ // client is adding data to server
    handlePost( request, response ) 
  }else if( request.method === 'DELETE' ){ // client is deleting data
    handleDelete( request, response )
  }else if( request.method === 'PUT' ){ // client is updating data
    handlePut( request, response )
  }
})

// Client requests a resource
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )  // remove leading '/' from URL

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' ) // send index.html to client
  }else{
    sendFile( response, filename ) // send requested file to client
  }
}

// Client is adding data to server
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) { // add data to dataString as it comes in
      dataString += data 
  })

  request.on( 'end', function() { // end when client is done sending data
    let clientData = JSON.parse( dataString ) // parse dataString into JSON object
    console.log( clientData)

    clientData.highscore

    let finalData = { }// create new object with data from client
    appdata.push(JSON.parse(dataString))
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' }) // send response to client
    response.end( JSON.stringify( appdata ) )
  })
}

// Client is deleting data from server
const handleDelete = function( request, response ){
  // request is playerName string from client to delete
  // delete that player from appdata
  // send appdata back to client
  let playerName = request
  if (appdata.name === playerName) {
    // delete player entry in appdata
    delete appdata.name
    
  }
}



// Send file to client (called by handleGet when client requests a resource)
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
