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

const meetings = [
  { 'name' : 'MQP Meeting', 'location' : 'UH520', 'date' : '9/20/2023', 'daysTill': '19'},
  { 'name' : 'Club Meeting', 'location' : 'CCHagg', 'date' : '9/23/2023', 'daysTill': '22'},
  { 'name' : 'Teach-Parent', 'location' : 'Morgan', 'date' : '9/30/2023', 'daysTill': '29'}
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
   // console.log( JSON.parse( dataString ) )
     //for(let x = 3; x < 16; x+=4){
      //let firstPos = dataString.split('\"');
      //console.log(firstPos[x]);
    //}
    
    let firstPos = dataString.split('\"');
    const checker = firstPos[3].localeCompare('Paul Godinez');
    //console.log(checker)
    if(checker == 0){
        const today = new Date()
        const date = firstPos[15].split('/')
        let months = parseInt(date[0]) - today.getMonth() - 1
        let days = parseInt(date[1]) - today.getDate()
        const totalDays = months * 30 + days
        meetings.push({ 'name' : firstPos[7], 'location' : firstPos[11], 'date' : firstPos[15], 'daysTill' : totalDays})
      }
    //meetings.push({ 'name:' : firstPos[7], 'location' : firstPos[11], 'date' : firstPos[15]})
    //console.log(meetings)
    //console.log(JSON.stringify(meetings))
    // ... do something with the data here!!!
    //response.end(JSON.parse(JSON.stringify(meetings)))
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(meetings))
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
