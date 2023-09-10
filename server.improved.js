const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
     
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000
//store all data here 
let appdata = [
]




const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
   else if (request.method === 'DELETE') { 
  handleDeleteRequest(request, response);
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
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    //console.log( JSON.parse( dataString ).title )

    // ... do something with the data here!!!
    appdata.push(JSON.parse(dataString))
    //console.log(appdata.stringify)
    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end( JSON.stringify( appdata ) )
    console.log(JSON.stringify( appdata ) )

  })
}

const handleDeleteRequest = function(request, response){

  console.log("handleDeleteRequest called....")
  if (request.url.startsWith('/delete/')){
    const itemIdentifier  = request.url.replace('/delete/','')
    console.log("Received DELETE request for itemID:", itemIdentifier)

    const i = appdata.findIndex(item => item.identifier === itemIdentifier);
    console.log("Current appdata:", appdata);

    if (i !== -1){
      appdata.splice(i,1)
      response.writeHead(200, {'Content-Type': 'text/json'})
      response.end(JSON.stringify({message: 'Item deleted successfully'}))
    }
    else{

      response.writeHead(404, { 'Content-Type': 'text/json' });
      response.end(JSON.stringify({ message: 'Item not found' }));

    }
  }
  else {
    console.log("Invalid DELETE request:", request.url)

    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Invalid DELETE request' }));
  }
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
