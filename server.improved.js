const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "PUT") {
    handlePut(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/newInput") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handleDelete = function (request, response) {
  let requestSplit = request.url.split("/");
  if (requestSplit[1] === "delete") {
    const index = parseInt(requestSplit[2]);
    if (index !== -1) {
      appdata.splice(index - 1, 1);
      response.writeHead(200, "OK", { "Content-Type": "application/json" });
      response.end(JSON.stringify(appdata));
    } else {
      response.writeHead(400, "Bad Request", { "Content-Type": "text/plain" });
      response.end("Invalid Index");
    }
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let data = JSON.parse(dataString);
    appdata.push(data);
    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(appdata));
  });
};

const handlePut = function (request, response) {
  let dataString = "";
  let requestSplit = request.url.split("/");
  if (requestSplit[1] === "update") {
    const index = parseInt(requestSplit[2]);
    request.on("data", function (data) {
      dataString += data;
    });

    request.on("end", function () {
      let data = JSON.parse(dataString);
      appdata[index - 1] = data;
      response.writeHead(200, "OK", { "Content-Type": "text/json" });
      response.end(JSON.stringify(appdata));
    });
  } else {
    response.writeHead(400, "Bad Request", { "Content-Type": "text/plain" });
    response.end("Invalid Index");
  }
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
