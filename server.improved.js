const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [];

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    console.log(request.url);
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/artists') {
    response.writeHead(400, "OK", {'Content-Type': 'text/plain'});
    response.end(JSON.stringify(appdata));
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
    if(request.url === '/remove'){
      let removed;
      for(let i = 0; i < appdata.length; i++){
        if(dataString.toLowerCase() === appdata[i].Artist.toLowerCase()){
          removed = appdata[i];
          appdata.splice(i, 1);
        }
      }
      if(removed === undefined){
        response.writeHead(400, "OK", {'Content-Type': 'text/plain'})
        response.end(JSON.stringify(appdata));
      }
      else{
        updateRankings();
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata));
      }
     
    }
  else if(request.url === '/submit'){
    console.log("Parsed data input: " + JSON.parse( dataString ) )

    const jsonData = JSON.parse( dataString ); // JSON output from client
    //appdata.push(jsonData); // adding data to list
    addRanking(jsonData);
    //TODO Look at the ratings of all artists when a new one is pushed to the database, and make a "Leaderboard" field to show which artists the person likes the best
    //TODO also maybe make a button that displays the artists based on rating or by genre
    //TODO also maybe make a form to input favorite songs from artists that are on the database
    for(let i = 0; i < appdata.length; i++){
      console.log("appdata: " + JSON.stringify(appdata[i]));
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata));
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

function addRanking(artist) {
  let artistRating = Number(artist.Rating);
  //let newRanking = fixRatings(artistRating);
  let newRanking = appdata.length
  newArtist = {
    Artist: artist.Artist,
    Genre: artist.Genre,
    Rating: artist.Rating,
    Ranking: newRanking,
    id: artist.id
  };
  let flag = false;
  for(let i = 0; i < appdata.length; i++){
    if(newArtist.Artist === appdata[i].Artist && newArtist.Genre === appdata[i].Genre){
      appdata[i] = newArtist;
      flag = true;
    }
  }
  if(!flag){
    appdata.push(newArtist);
  }
  updateRankings();
}


function updateRankings(){
  appdata.sort((a,b) => b.Rating - a.Rating);
  for(let i = 0; i < appdata.length; i++){
    appdata[i].Ranking = i+1;
  }
}
server.listen( process.env.PORT || port )
