const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

var appdata = [];

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
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let todo_entry = JSON.parse(dataString);

    // Processing the data to add a new field that combines priority and the creation date
    // The new string should be a due date which is:
    // The current date + 1 week per priority
    if (request.url === "/submit") {
      let date = new Date(todo_entry["datetime"]);

      let due_date = new Date(
        date.setDate(date.getDate() + todo_entry["priority"] * 7)
      );

      todo_entry["due_date"] = due_date;

      appdata.push(todo_entry);
    } else {
      let temp_array = appdata;
      appdata = temp_array.filter(
        (index) => index["todo_list_item"] != todo_entry["item_to_delete"]
      );
    }

    console.log(appdata);
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
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
