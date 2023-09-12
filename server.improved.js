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
  { 'game': 'Tetris', 'highscore': 17776, 'maxscore': 999999, 'initials': 'EXA', 'goal': 66887},
  { 'game': '2048', 'highscore': 71108, 'maxscore': '', 'initials': 'MPL', 'goal': 78218 }
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response );    
  }else if( request.method === 'POST' ){
    handlePost( request, response );
  }else if(request.method === 'DELETE') {
    handleDelete(request, response);
  }else if(request.method === 'PUT') {
    handlePut(request, response);
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/json'){
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(appdata));
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data;
  })

  request.on( 'end', function() {

    const newGame = JSON.parse( dataString );
    
    newGame.goal = calcGoal(newGame.maxscore, newGame.highscore);

    appdata.push(newGame);

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end(JSON.stringify(appdata));
  })
}

//calculate goal (derived field)
function calcGoal(max, high){
  let goal = 0;
  if (max === high) {
    return max;
  }
  if (max !== '') {
    goal = Math.floor((max - high) / 20);
    if (goal === 0) {
      goal = 1;
    }
    goal += parseInt(high);
  }
  else {
    goal = Math.floor(high * 1.1);
    if (goal <= 10) {
      goal += 1;
    }
  }
  return goal;
}

const handleDelete = function (request, response) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  })

  request.on( 'end', function() {
    const delRow = JSON.parse( dataString );
    
    appdata.splice(delRow, 1);

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end(JSON.stringify(appdata));
  })


}

const handlePut = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  })

  request.on( 'end', function() {
    const modRow = JSON.parse( dataString );
    const modRowInd = modRow.goal;
    modRow.goal = calcGoal(modRow.maxscore, modRow.highscore);
    
    appdata.splice(modRowInd, 1, modRow);

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
