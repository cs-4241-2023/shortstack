const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

/*const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]*/

const appdata = [
  
]

const hoursTilGrade = [ {'A': 28} , {'B': 24}, {'C': 21}]

let hoursTilGoal = 0
let currentGoal = ''

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
  
  if( request.url === '/setGoal'){
    request.on( 'end', function() {
      const currGoal = JSON.parse( dataString )
      console.log(currGoal)

      hoursTilGrade.forEach( d => {
        for(let g in d){
          if(g === currGoal.goal){
            hoursTilGoal = d[g]
          }
        }
      })
        currentGoal = hoursTilGoal

      response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
      response.end( JSON.stringify( currGoal ) )
  })
 }

 else if( request.url === '/editGoal' ){
  request.on( 'end', function() {
    const newGoal = JSON.parse( dataString )
    console.log(newGoal)

    let newGoalNum = 0

    let differenceToChange = 0
    
    hoursTilGrade.forEach( d => {
      for(let g in d){
        if(g === newGoal.goal){
          newGoalNum = d[g]
          differenceToChange = newGoalNum - currentGoal 
          console.log(d[g], differenceToChange, currentGoal)
        }
      }
    })

    console.log(newGoalNum, differenceToChange)
    
    hoursTilGoal += differenceToChange
    currentGoal = newGoalNum

    //go thru and edit all of the remianings
    appdata.forEach( d => {
      d.remaining += differenceToChange
    })

    console.log(appdata)

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end( JSON.stringify( newGoal ) )
})
 }

  else if ( request.url === '/addHours' ){
    request.on( 'end', function() {
      const currentData = JSON.parse( dataString ) 

      hoursTilGoal -= currentData.hours
      currentData.remaining = hoursTilGoal
  
      console.log(currentData)

      appdata.push(currentData)
      
  
      response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
      response.end( JSON.stringify(appdata) )

      //response.end( JSON.stringify(currentData) )
    })
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
