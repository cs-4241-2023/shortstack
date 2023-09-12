const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let nbaPlayerData = [
  {
    "name": "LeBron James",
    "outside": 88,
    "inside": 90,
    "athleticism": 92,
    "playmaking": 96,
    "defense": 85,
    "rating": 90
  },
  {
    "name": "Stephen Curry",
    "outside": 98,
    "inside": 75,
    "athleticism": 88,
    "playmaking": 92,
    "defense": 70,
    "rating": 85
  },
  {
    "name": "Giannis Antetokounmpo",
    "outside": 78,
    "inside": 95,
    "athleticism": 97,
    "playmaking": 84,
    "defense": 90,
    "rating": 89
  },
  {
    "name": "Kevin Durant",
    "outside": 95,
    "inside": 88,
    "athleticism": 90,
    "playmaking": 85,
    "defense": 82,
    "rating": 88
  },
  {
    "name": "Kawhi Leonard",
    "outside": 88,
    "inside": 80,
    "athleticism": 92,
    "playmaking": 75,
    "defense": 95,
    "rating": 86
  },
  {
    "name": "Luka Dončić",
    "outside": 90,
    "inside": 85,
    "athleticism": 86,
    "playmaking": 94,
    "defense": 78,
    "rating": 86
  },
  {
    "name": "Anthony Davis",
    "outside": 75,
    "inside": 92,
    "athleticism": 89,
    "playmaking": 72,
    "defense": 96,
    "rating": 85
  },
  {
    "name": "James Harden",
    "outside": 96,
    "inside": 85,
    "athleticism": 84,
    "playmaking": 93,
    "defense": 72,
    "rating": 86
  },
  {
    "name": "Joel Embiid",
    "outside": 72,
    "inside": 95,
    "athleticism": 87,
    "playmaking": 70,
    "defense": 89,
    "rating": 83
  },
  {
    "name": "Damian Lillard",
    "outside": 97,
    "inside": 75,
    "athleticism": 86,
    "playmaking": 90,
    "defense": 68,
    "rating": 83
  },
  {
    "name": "Jimmy Butler",
    "outside": 84,
    "inside": 88,
    "athleticism": 86,
    "playmaking": 82,
    "defense": 90,
    "rating": 86
  },
  {
    "name": "Karl-Anthony Towns",
    "outside": 80,
    "inside": 85,
    "athleticism": 84,
    "playmaking": 72,
    "defense": 78,
    "rating": 80
  },
  {
    "name": "Devin Booker",
    "outside": 92,
    "inside": 78,
    "athleticism": 86,
    "playmaking": 80,
    "defense": 70,
    "rating": 81
  },
  {
    "name": "Rudy Gobert",
    "outside": 45,
    "inside": 88,
    "athleticism": 80,
    "playmaking": 55,
    "defense": 96,
    "rating": 73
  },
  {
    "name": "Chris Paul",
    "outside": 87,
    "inside": 70,
    "athleticism": 82,
    "playmaking": 95,
    "defense": 76,
    "rating": 82
  },
 

];

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
    
    //response.playerData = nbaPlayerData;
    //response.end(nbaPlayerData);
    // response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    // response.end(JSON.stringify(nbaPlayerData))
  }
  else if(request.url === '/data'){
    sendJSON(response, nbaPlayerData);
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
  // delete the player
  if(request.url === '/delete'){
    request.on( 'end', function() {
    const requestData = dataString;
    console.log(requestData)
      // ... do something with the data here!!!
        nbaPlayerData = nbaPlayerData.filter(function( obj ) {
          return obj.name !== requestData;
      });
      
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(nbaPlayerData))
    })
}
  // add the player
  else{
  request.on( 'end', function() {
    //console.log('datastring', dataString )
  const requestData = JSON.parse(dataString);
    // ... do something with the data here!!!
    requestData.rating = calculateOverallRating(requestData.outside,requestData.inside,requestData.athleticism,requestData.playmaking,requestData.defense)
    nbaPlayerData.push(requestData);
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(nbaPlayerData))
  })}
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
const sendJSON = function(response, jsonData) {
  // Set the content type to JSON
  response.setHeader('Content-Type', 'application/json');

  // Convert the JSON data to a string
  const jsonStr = JSON.stringify(jsonData);

  // Write the JSON data to the response
  response.writeHeader(200);
  response.end(jsonStr);
};


server.listen( process.env.PORT || port )

function calculateOverallRating(outsideScoring, insideScoring, athleticism, playmaking, defending) {
  // Check if the input ratings are within the valid range (0-99)
  if (
    outsideScoring < 0 || outsideScoring > 99 ||
    insideScoring < 0 || insideScoring > 99 ||
    athleticism < 0 || athleticism > 99 ||
    playmaking < 0 || playmaking > 99 ||
    defending < 0 || defending > 99
  ) {
    throw new Error('All ratings must be between 0 and 99.');
  }

  // Weighted average of the ratings with arbitrary weights
  const overallRating = (
    outsideScoring * 0.2 +
    insideScoring * 0.25 +
    athleticism * 0.15 +
    playmaking * 0.3 +
    defending * 0.1
  );

  // Round the overall rating to the nearest integer
  return Math.round(overallRating);
}