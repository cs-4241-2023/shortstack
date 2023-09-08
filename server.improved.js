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
  {'name': 'Aragorn', 'start': 1065, 'end' : 1403, 'era':""}
]

let timelineData = [
  {'era': 'First Age', 'date': 1000, 'description': 'The beginning'},
  {'era': 'Second Age', 'date': 1567, 'description': 'The defeat of the witch-king of Angmar'},
  {'era': 'The Space Age', 'date': 2552, 'description': 'The Fall of Reach'}
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

      //TODO: redo all characters with timeline

      response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
      response.end(JSON.stringify(timelineData))
    } else if(value.hasOwnProperty('name')){

      let character = AssignEra(value)
      characterData.push(character);



      response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
      response.end(JSON.stringify(characterData))
    }  else{
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('test')
    }

    // ... do something with the data here!!!

  })
}

//passed a json object with date and era, assigns era based on given timeline info, returns new json object
function AssignEra(value){
  let era = "";
  if(timelineData.isEmpty()){
    value.era = "unknown"
    return value;
  }
  for(let i = 0; i < timelineData.length;  i++){
    if(timelineData[i].date < value.start || timelineData[i].date < value.end){
      if(era === ""){
        value.era += timelineData[i].era;
      } else{
        value.era += ", " + timelineData[i].era;
      }
    }
  }
  return value;
}

//sorts timeline by date
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
