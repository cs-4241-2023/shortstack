const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 8080;

let appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
  console.log(filename);
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let data = JSON.parse(dataString);

    if (data.mode === "clear") {
      appdata = [];
    }
    if (data.mode === "read") {
      let text = JSON.stringify(appdata);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(text);
      return;
    }
    if (data.mode === "delete") {
      const target = data.id;
      console.log("Target:", target);
      for (i = 0; i < appdata.length; i++) {
        if (appdata[i].id === target) {
          console.log("Deleting the element: ", appdata[i]);
          let temp = appdata.slice(i, 1);
          console.log("Removed: ", JSON.stringify(temp));
          console.log("New appdata", JSON.stringify(appdata));
          return;
        }
      }

      return;
    }
    console.log(data);
    const entry = {
      date: data.entry.date,
      numHours: parseInt(data.entry.numHours),
      reason: data.entry.reason,
      id: data.entry.id,
    };
    appdata.push(entry);

    let text = JSON.stringify(appdata);
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(text);
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
