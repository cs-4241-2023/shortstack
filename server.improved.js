// IMPORTANT: you must run `npm install` in the directory for this assignment
// to install the mime library if you're testing this on your local machine.
// However, Glitch will install it automatically by looking in your package.json
// file.

const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

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

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = (request, response) => {
  const filename = dir + request.url.slice(1);
  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

// DON'T TOUCH ANYTHING ABOVE THIS.

let app_data = [{ number1: 1, number2: 2, number3: 3, sum: 6 }];

const handlePost = (request, response) => {
  // Get data from POST request.
  let data_string = "";
  request.on("data", (data) => {
    data_string += data;
  });

  // Do something with that data.
  request.on("end", () => {
    // Parse the request data.
    let json = JSON.parse(data_string);
    
    // Handle different functions separately.
    switch(request.url) {
      case "/submit": 
        // Add new data.
        app_data.push({
          number1: json.number1,
          number2: json.number2,
          number3: json.number3,
          sum: json.number1 + json.number2 + json.number3,
        });
        break;
      case "/clear": 
        // Clear all app_data.
        app_data = [];
        break;
      case "/double": 
        // Double all app_data.
        for(let i = 0; i < app_data.length; i++) {
          let row = app_data[i];
          app_data[i] = {
            "number1": row["number1"] * 2,
            "number2": row["number2"] * 2,
            "number3": row["number3"] * 2,
            "sum": row["sum"] * 2
          };
        }
        break;
      default:
        console.log("ERROR: Unknown request function type.");
    }

    // Send back response with app_data.
    response.writeHead(200, "OK", { "Content-Type": "application/json" });
    response.end(JSON.stringify(app_data));
  });
};

server.listen(process.env.PORT || port);
