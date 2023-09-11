const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const playlists = [
  { season: "fall", title: "1901", artist: "Phoenix", length: "2:00" },
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
    const res = JSON.parse(dataString);

    const season = res.season;

    const title = res.title;

    const artist = res.artist;

    const length = res.length;

    if (request.url === "/submit") {
      const minutes = Math.floor(length / 60).toString();

      const seconds = (length % 60).toString();

      let finalTime = "";

      if (seconds < 10) {
        finalTime = minutes + ":0" + seconds;
      } else {
        finalTime = minutes + ":" + seconds;
      }

      const obj = {
        season: season,
        title: title,
        artist: artist,
        length: finalTime,
      };

      playlists.push(obj);
    } else if(request.url === "/remove") {
      const obj = {
        season: season,
        title: title,
        artist: artist,
        length: length,
      };

      for (let i = 0; i < playlists.length; i++) {
        if (
          playlists[i].title === obj.title &&
          playlists[i].artist === obj.artist &&
          playlists[i].length === obj.length &&
          playlists[i].season === obj.season
        ) 
        
        {

          playlists.splice(i, 1);
          console.log(playlists);
        }
      }
    }
    else{
      //does nothing!
    }

    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(playlists));
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
      response.end("Help! file not found");
      console.log(err);
    }
  });
};

server.listen(process.env.PORT || port);
