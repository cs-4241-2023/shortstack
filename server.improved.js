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
  { 'todo': 'Do CS4241 A2', 'date': '2023-09-11', 'urgency': 'Done', 'done': true },
  { 'todo': 'CS4241 Readings', 'date': '2023-09-07', 'urgency': 'Late', 'done': false },
  { 'todo': 'Attend Office Hours', 'date': 'TBD', 'urgency': 'Not Urgent', 'done': false} 
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
    // ... do something with the data here!!!
    const requestData = JSON.parse(dataString);
    if(requestData.action === "add"){
      if(requestData.date === ""){
        requestData.date = "TBD";
      }
      if(requestData.todo !== ""){
      appdata.push({
                todo: requestData.todo,
                date: requestData.date,
                urgency: requestData.urgency,
                done: requestData.done
            })
      }
    }
    else if(requestData.action === "edit"){
      let objIndex = appdata.findIndex((item => item.todo === requestData.todoOld));
      appdata[objIndex].todo = requestData.todoNew;
    }
    else if(requestData.action === "update"){
      let objIndex = appdata.findIndex((item => item.todo === requestData.todo));
      let boolValue = (requestData.done.toLowerCase() === "true"); 
      appdata[objIndex].done = !boolValue;
      if(!boolValue){
        appdata[objIndex].urgency = "Done";
      }
      else{
        let urgency = "Not Urgent";
        console.log(requestData.date);
        if(requestData.date !== "TBD"){
          const currentDate = new Date();
          const targetDate = new Date(requestData.date);
          const timeDifference = targetDate.getTime() - currentDate.getTime();
          const daysDifference = timeDifference / (1000 * 3600 * 24);
          if(daysDifference < 0){
            urgency = "Late"
          }
          else if(daysDifference <= 7){
            urgency = "Urgent"
          }
        }
        appdata[objIndex].urgency = urgency;
      }
    }
    else if(requestData.action === "delete"){
      appdata = appdata.filter(item => item.todo !== requestData.todo);
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/json' })
    response.end( JSON.stringify( appdata ))
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