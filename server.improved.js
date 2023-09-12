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

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if( request.method === 'DELETE'){
    handleDelete( request, response)
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
    //console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    let dataPoint = JSON.parse(dataString)
    dataPoint.status = status(dataPoint.CurrHP, dataPoint.MaxHP)
    dataPoint.id = 0
    fs.readFile(__dirname+'/public/jsonData.json', function(err, content) {
      if(err===null) {
        let dataTable = [JSON.parse(content)]
        dataPoint.id=dataTable[0].length
        dataTable[0].push(dataPoint)
        fs.writeFile(__dirname+'/public/jsonData.json', JSON.stringify(dataTable[0]), 'utf8', (err)=>{
          if(err) console.log("File found\n"+err);
          else console.log("File found, Written")})
      }else{
        let dataTable = [dataPoint]
        fs.writeFile(__dirname+'/public/jsonData.json', JSON.stringify(dataTable), 'utf8', (err)=>{
          if(err) console.log("No file found\n"+err);
          else console.log("No file, Created")})
      }
    })

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('test')
  })
}

const handleDelete = function( request, response ) {
  let index = -1
  request.on('data', function (data) {
    index = data
    //console.log("Deleting: "+temp)
  })

  request.on('end', function() {
    if (index >= 0) {
      fs.readFile(__dirname + '/public/jsonData.json', function (err, content) {
        if (err === null) {
          let dataTable = [JSON.parse(content)]
          dataTable[0].splice(index, 1)
          fs.writeFile(__dirname + '/public/jsonData.json', JSON.stringify(dataTable[0]), 'utf8', (err) => {
            if (err) console.log(err)
          })
        } else {
          console.log("Delete index " + index + " error\n" + err);
        }
      })
    }
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end('Deleted')
  })
}

const status = function(currHP, maxHP){
  let percent = currHP/maxHP;
  if(percent>0.50){
    return "Normal";
  }else if(percent>0.25){
    return "Bloodied";
  }else if(percent>0){
    return "Very Bloodied";
  }else{
    return "Dead";
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
