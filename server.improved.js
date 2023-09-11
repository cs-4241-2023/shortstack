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
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/tasks") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
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
    console.log(appdata);
    SortData();
    response.writeHead(200, "OK", { "Content-Type": "text/submit" });
    response.end(JSON.stringify(appdata));
  });
};

const SortData = () => {
  appdata.sort(function (a, b) {
    let dateA = new Date(a.dueDate);
    let dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
};

const handleDelete = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let data = JSON.parse(dataString);
    const index = appdata.findIndex(task => task.task === data.task);
    if (index > -1) {
      appdata.splice(index, 1);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(appdata));
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Task not found");
    }
  });
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
