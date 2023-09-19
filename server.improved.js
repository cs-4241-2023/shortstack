//backend --> delete function
const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const newData = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});


const calculateDerivedField = function (date, msg){
  if(date < 5 && msg != ''){
    return 'High'
  }
  else if(date >= 5 && date <=10 && msg != ''){
    return 'Medium'
  }
  else if (date > 10 && msg != '')
    return 'Medium'
  else
    return 'Low'
}


const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
    console.log(dataString)
  });

  request.on("end", function () {
    const data = JSON.parse(dataString);
    if(request.url === "/submit"){
      data.priority = calculateDerivedField(data.date, data.msg);
      //add priority to json and push data to appdata
      newData.push(data);
      }
    else if(request.url === "/delete"){
      newData.splice(data.id,1);
    }

    // ... do something with the data here!!! push data into appdata array
    console.log(JSON.parse(dataString));
    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(newData));
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
