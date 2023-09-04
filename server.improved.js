// import node.js, mime, and other dependencies
const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// this is the data contained by the server
const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

// server variable that handles requests
const server = http.createServer( function( request,response ) {
  if(request.method === 'GET') {
    handleGet(request, response)
  } else if(request.method === 'POST'){
    handlePost(request, response)
  }
})

// handle GET request
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if(request.url === '/') {
    sendFile(response, 'public/index.html')
  }else{
    sendFile(response, filename)
  }
}

// handle post request
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end(JSON.stringify(appdata))
  })
}

// sends a file to the server
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

// set up server to listen on port 3000
server.listen( process.env.PORT || port )
