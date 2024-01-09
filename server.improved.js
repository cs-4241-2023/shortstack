
const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


/*
const express = require('express'),
      app = express(),
      port = 3000

app.listen(port, (error) =>{
  if(!error){
    console.log("Server is Successfully Running, and App is listening on port" + PORT);
  }else{
    console.log("Error occurred, server can't start", error);
  }
});

app.use('GET', (req, res, next) => {
  handleGet(request, response)
  next();
})




const server = app.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})
*/



const appdata = [
  { 'id': 0, 'yourName': 'Bright', 'yourKills': 10, 'yourDeaths': 5, 'yourAssists': 1, 'KDA': 2.2},
  { 'id': 1, 'yourName': 'Nelson', 'yourKills': 20, 'yourDeaths': 50, 'yourAssists': 3, 'KDA': .46 }
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
  }else if( request.url === '/start'){
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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
    const data = JSON.parse( dataString );
    
    if( request.url === '/delete' ) {
      let fail = true;
      for(let i=0; i < appdata.length; i++){
        if(data.id === appdata[i].id){
          fail = false

          appdata.splice(i, 1) 

          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.end('')
          break
        }
      }
      if(fail){
        response.writeHead( 404, "Not Found", {'Content-Type': 'text/plain' })
        response.end('')
      }

    }else if(request.url === '/modify'){
      let fail = true;
      for(let i=0; i < appdata.length; i++){
        if(data.id === appdata[i].id){
          fail = false

          data.KDA = (data.yourKills + data.yourAssists) / data.yourDeaths

          appdata[i] = data

          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.end(JSON.stringify(data))
          break
        }
      }
      if(fail){
        response.writeHead( 404, "Not Found", {'Content-Type': 'text/plain' })
        response.end('')
      }

    }else if(request.url === '/submit'){

      // KDA = (kills + assists)/ deaths 
      kills = data.yourKills
      deaths = data.yourDeaths
      assists =  data.yourAssists
      kda = (kills + assists) / deaths
      
      data.KDA = kda

      appdata.push(data)

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(data))
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
