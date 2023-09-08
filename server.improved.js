const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

let characterData =[
  
]

let timelineData = [
  {'era': 'First Age', 'date': 1000, 'description': 'The beginning'}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === '/timelineData' ) {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(timelineData));
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

    let value = JSON.parse( dataString );
    
    if(value.hasOwnProperty('era')){
      timelineData.push(value)
      SortTimeline()

      response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
      response.end(JSON.stringify(timelineData))
    } else{
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('test')
    }

    // ... do something with the data here!!!

  })
}

function SortTimeline(){
  timelineData.sort(function(a, b){
    return a.date - b.date;
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
