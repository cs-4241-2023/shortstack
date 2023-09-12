const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [
  { mTitle: "Whiplash", mLength: "107", mYear: "2014" },
  { mTitle: "Blood Diamond", mLength: "143", mYear: "2006" },
];

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
    const movieData = JSON.parse(dataString);

    switch (request.url) {
      case "/submit":
        const newMovie = {
          mTitle: movieData.mTitle,
          mLength: movieData.mLength,
          mYear: movieData.mYear,
        };

        appdata.push(newMovie);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end(JSON.stringify(appdata));
        break;

      case "/delete":
        for (let i = 0; i < appdata.length; i++) {
          if (
            movieData.mTitle === appdata[i].mTitle &&
            movieData.mYear === appdata[i].mYear
          ) {
            appdata.splice(i, 1);
            break;
          }
        }

        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end(JSON.stringify(appdata));
        break;

      case "/modify":
        for (let i = 0; i < appdata.length; i++) {
          if (movieData.mTitle === appdata[i].mTitle) {
            appdata.splice(i, 1);
            break;
          }
        }

          const modifiedMovie = {
              mTitle: movieData.mTitle,
              mLength: movieData.mLength,
              mYear: movieData.mYear,
              mAge: (2023 - parseInt(movieData.mYear)).toString(),
          }
          
        appdata.push(modifiedMovie);
        response.writeHead(200, "OK", { "Content-Type": "text/plain" });
        response.end(JSON.stringify(appdata));
        break;
    }
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
