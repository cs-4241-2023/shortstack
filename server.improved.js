/*const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
 
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
  const clientData = JSON.parse( dataString )
  console.log( clientData )

    // ... do something with the data here!!!
    if (clientData.Player1Guess === clientData.ComputerGuess && clientData.Player2Guess === clientData.ComputerGuess){
     appdata.push({ 'Player': '1', 'PlayerGuess': clientData.Player1Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': true },
                    { 'Player': '2', 'PlayerGuess': clientData.Player2Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': true } )
                    console.log(appdata)
    } else if (clientData.Player1Guess === clientData.ComputerGuess && clientData.Player2Guess !== clientData.ComputerGuess){
      appdata.push({ 'Player': '1', 'PlayerGuess': clientData.Player1Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': true },
                    { 'Player': '2', 'PlayerGuess': clientData.Player2Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': false } )
                    console.log(appdata)
    } else if(clientData.Player1Guess !== clientData.ComputerGuess && clientData.Player2Guess === clientData.ComputerGuess){
      appdata.push({ 'Player': '1', 'PlayerGuess': clientData.Player1Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': false },
                    { 'Player': '2', 'PlayerGuess': clientData.Player2Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': true } )
                    console.log(appdata)
    } else {
      appdata.push({ 'Player': '1', 'PlayerGuess': clientData.Player1Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': false },
                    { 'Player': '2', 'PlayerGuess': clientData.Player2Guess, 
                    'CompGuess': clientData.ComputerGuess, 'isWinner': false } )
                    console.log(appdata)
    }
    console.log(JSON.stringify(appdata))


    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    
    response.end(JSON.stringify(appdata))
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
}*/


const express = require("express"),
      { MongoClient, ServerApiVersion } = require("mongodb"),
      app = express(),
      appData     = [],
      port = 3000
app.use("/", express.static("public"))
app.use( express.json() )

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.urlencoded({extened:true}))

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
app.post( '/submit', (req, res) => {
  appData.push( req.body )
  res.writeHead( 200, { 'Content-Type': 'application/json' })
  res.end( JSON.stringify( appData ) )
})


run().catch(console.dir);
app.listen( 3000 )