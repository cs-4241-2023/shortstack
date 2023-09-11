const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  {'phoneNumber': 4011231234, 'brandName':'DBlock', 'designerName': 'Sultan Adedeji', 'brandType': 'streetwear'},
  {'phoneNumber': 4011221222, 'brandName':'Gompei', 'designerName': 'tev Adedeji', 'brandType': 'croc'},
  {'phoneNumber': 4015415411, 'brandName':'Morgan', 'designerName': 'man Adedeji', 'brandType': 'fish'}
]
let recordCount;

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
  else if(request.method === 'DELETE'){
    handleDelete(request, response);
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

//every request will be a post so you have to add paths so you can handle your actions /add /delete /update and change appdata as needed
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let dString = JSON.parse(dataString)
  
    if (request.url == '/delete'){
      let index = appdata.indexOf(dString)
      appdata.slice(index, 1)
    }
    else {
      appdata.push(dString)
    }
  
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify({recordCount: appdata.length , data: JSON.stringify( appdata )}))
  })
}

const handleDelete = function (request, response) {
  let dataString = '';

  request.on('data', function (data) {
    dataString += data;
  });

  request.on('end', function () {
    const designerToDelete = JSON.parse(dataString);

    // Find and remove the designer from the appdata array
    const index = appdata.findIndex((designer) => {
      return (
        designer.phoneNumber === designerToDelete.phoneNumber
      );
    });

    if (index !== -1) {
      appdata.splice(index, 1);
      response.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
      response.end(JSON.stringify({ success: true }));
    } else {
      response.writeHead(404, 'Not Found', { 'Content-Type': 'text/plain' });
      response.end(JSON.stringify({ success: false, error: 'Designer not found' }));
    }
  });
};

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