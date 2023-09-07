const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const avgAges = {"Chameleon": 7, "Gecko": 7,
                 "Frog": 10, "Snake": 15,
                 "Cat": 13, "Dog": 12,
                 "Rat": 2, "Capybara": 6,}
const maxAges = {"Chameleon": 16, "Gecko": 20,
                 "Frog": 20, "Snake": 30,
                 "Cat": 20, "Dog": 15,
                 "Rat": 4, "Capybara": 12,}

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
    const stuff = JSON.parse(dataString)
    // ... do something with the data here!!!
    const json = { name: stuff.name,
                   type: stuff.type,
                   age: stuff.age,
                   status: '',
                   picture: ''}

    if(stuff.age <= avgAges[stuff.type] / 2){
      json.status = "your creature is young!"
    }else if(stuff.age >= maxAges[stuff.type]){
      json.status = "your creature is ancient!!"
    }else{
      json.status = "your creature is middle aged"
    }

    json.picture = 'https://media.discordapp.net/attachments/1019236301423247444/1144700810366816287/20230824_210454.jpg?width=474&height=1026'

    console.log(json)

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end(JSON.stringify( [json] ))
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
