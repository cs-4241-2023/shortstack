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
  { 'frags': 24, 'assists': 2, 'deaths': 7, 'kd': 3.43 },
  { 'frags': 12, 'assists': 5, 'deaths': 16, 'kd': 0.75 },
  { 'frags': 15, 'assists': 3, 'deaths': 12, 'kd': 1.25 }
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

  if ( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/getTable') {
    response.writeHeader(200, {'Content-Type': 'text/json'});
    response.end(JSON.stringify(appdata));
  } else {
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {
    const newData = JSON.parse(dataString);
    if (request.url === '/submit') {
      const kd = (parseInt(newData.deaths) === 0) ? newData.frags : (newData.frags / newData.deaths).toFixed(2);
      newData['kd'] = parseFloat(kd);
      appdata.push(newData);
    } else if (request.url === '/deleteData') {
      appdata.splice(appdata.findIndex(element => {
        let frags = element.frags === newData.frags;
        let assists = element.assists === newData.assists;
        let deaths = element.deaths === newData.deaths;
        let kd = element.kd === newData.kd;
        return frags && assists && deaths && kd;
      }), 1);
    } else if (request.url === '/modifyData') {
      let index = appdata.findIndex(element => {
        let frags = element.frags === newData.obj.frags;
        let assists = element.assists === newData.obj.assists;
        let deaths = element.deaths === newData.obj.deaths;
        let kd = element.kd === newData.obj.kd;
        return frags && assists && deaths && kd;
      });

      const kd = (parseInt(newData.newObj.deaths) === 0) ? newData.newObj.frags : (newData.newObj.frags / newData.newObj.deaths).toFixed(2);
      newData.newObj['kd'] = parseFloat(kd);
      appdata[index] = newData.newObj;
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end(JSON.stringify(appdata));
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