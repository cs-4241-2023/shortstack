class ServerResponse {
  constructor(entries) {
    this.entries = entries;

    this.totalCalories = 0;
    this.totalProtein = 0;

    for (let i = 0; i < entries.length; i++) {
      this.totalCalories += entries[i].calories;
      this.totalProtein += entries[i].protein;
    }
  }
}

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const entries = [];
let idCounter = 0;

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  console.log("handleGet", request.url);
  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  console.log("handlePost", request.url);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log("server:", JSON.parse( dataString ) )

    // ... do something with the data here!!!
    const json = JSON.parse( dataString );
    if (json.mode === "add") {
      json.entry.id = idCounter++;

      // derived field
      // there are 4 calories per gram of protein
      let proteinCalories = json.entry.protein * 4;
      json.entry.percentProtein = Math.round((proteinCalories / json.entry.calories) * 100);

      entries.push(json.entry);
    } else if (json.mode === "delete") {
      console.log("delete", json.id);
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].id === json.id) {
          console.log("found", entries[i]);
          entries.splice(i, 1);
          break;
        }
      }
    } else if (json.mode === "clear") {
      entries.length = 0; // clear array
    }

    const responseObj = new ServerResponse(entries);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(responseObj));
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

    console.log("filename:", filename);
    console.log("err:", err);

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
