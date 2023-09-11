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
  { 
    'playerName': 'LeBron James', 
    'games': 55, 
    'totalPoints': 1590,
    'totalRebounds': 457,
    'totalAssists': 375,
    'pointsPerGame': 28.9,
    'reboundsPerGame': 8.3,
    'assistsPerGame': 6.8
  },
  { 
    'playerName': 'Jayson Tatum', 
    'games': 74, 
    'totalPoints': 2225,
    'totalRebounds': 649,
    'totalAssists': 342,
    'pointsPerGame': 30.1,
    'reboundsPerGame': 8.8,
    'assistsPerGame': 4.6
  },
  { 
    'playerName': 'Nikola Jokic', 
    'games': 69, 
    'totalPoints': 1690,
    'totalRebounds': 817,
    'totalAssists': 678,
    'pointsPerGame': 24.5,
    'reboundsPerGame': 11.8,
    'assistsPerGame': 9.8
  }
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
    console.log(JSON.parse(dataString))

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

server.listen( process.env.PORT || port )
