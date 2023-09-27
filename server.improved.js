const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // To run, use node server.improved.js
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {  // retrieve info from server data
    handleGet( request, response )    
  }else if( request.method === 'POST' ) {  // add info to server data 
    handlePost( request, response ) 
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

const handlePost = function( request, response ) {
  //handle /delete /submit requests here
  //calculate the derived field
  //add data to app data 

  //Note that "request" is an object. You have to use "request.url" to get the url string.

  debugger;
  
  let dataString = ''

      request.on( 'data', function( data ) {
        dataString += data // stuff from frontend
    })

    request.on( 'end', function() {
    console.log( JSON.parse( dataString ) ) // This is logging the object containing the row.

    json = JSON.parse( dataString ); // This is the object containing the row.
      
    if(request.url == '/submit'){
      // ... do something with the data here!!!
      appdata.push(JSON.parse(dataString))

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end( JSON.stringify( appdata) ) 
    }

    else if(request.url == '/delete'){
      appdata.splice(json.row, 1);
      console.log("Row " + json.row + " was deleted.")
    }
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

server.listen( process.env.PORT || port )
