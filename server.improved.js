const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
  else if( request.method === 'DELETE' ){
    handleDelete( request, response )
  }
  else if( request.method === 'PUT' ){
    handlePut( request, response )
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if( request.url === '/get-list' ) {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    // add priority field to appdata based on due date of task
    appdata.forEach( (row) => {
      const date = new Date( row.date )
      const today = new Date()
      const diff = date - today
      if (diff < 0) {
        row.priority = 'high'
      } 
      else if (diff < 604800000) {
        row.priority = 'medium'
      }
      else {
        row.priority = `don't worry bout it`
      }
    })
    response.end( JSON.stringify( appdata ) )
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log( JSON.parse( dataString ) )

    // append to appdata
    appdata.push( JSON.parse( dataString ) )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('posted')
  })
}

const handleDelete = function( request, response ) {
  // get id from url
  const id = request.url.slice(12)
  // find index of row with that id
  const index = appdata.findIndex( (row) => row.id === id )
  // remove row from appdata
  appdata.splice(index, 1)
  // send response
  response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
  response.end('deleted')
}

const handlePut = function( request, response ) {
  // get id from url
  const id = request.url.slice(10)
  // find index of row with that id
  const index = appdata.findIndex( (row) => row.id === id )
  // get data from request
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data
  })
  request.on( 'end', function() {
    const data = JSON.parse( dataString )
    // update row in appdata
    appdata[index] = data
    // send response
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('updated')
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
