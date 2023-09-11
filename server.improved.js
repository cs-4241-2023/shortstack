const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

// plant data set
const plantData = [
  {
    plantName: "pothos",
    plantType: "Climbing or Vine",
    lastWatered: "2023-09-09",
    nextWater: "2023-09-16",
  },
  {
    plantName: "bird of paradise",
    plantType: "Tropical",
    lastWatered: "2023-09-08",
    nextWater: "2023-09-15",
  },
  {
    plantName: "air plant",
    plantType: "Air Plant",
    lastWatered: "2023-09-06",
    nextWater: "2023-09-13",
  },
];

// create server & pick what to handle: GET, POST, & DELETE
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response); // Route DELETE requests to handleDelete
  }
});

// if GET
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);
  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else {
    sendFile(response, filename);
  }
};

// calculates next watering date
const calculateNextWateringDate = function (plant) {
  
  // formats date correctly: YYYY-MM-DD
  function formatDate(originalDateString) {
    const dateComponents = originalDateString.split("/");
    const dateObject = new Date(
      dateComponents[2],
      dateComponents[0] - 1,
      dateComponents[1]
    );
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Add 1 to the month since it's 0-based
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
  }
  
  const lastWateredDate = new Date(plant.lastWatered);
  let nextWateringDate;
  let nextWateringDateString;

  switch (plant.plantType) {
    case "Succulent or Cactus":
    case "Air Plant":
      nextWateringDate = new Date(lastWateredDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString();
      nextWateringDateString = formatDate(nextWateringDate);
      break;
    case "Tropical":
    case "Aquatic":
      nextWateringDate = new Date(lastWateredDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
      nextWateringDateString = formatDate(nextWateringDate);
      break;
    default:
      nextWateringDate = new Date(lastWateredDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
      nextWateringDateString = formatDate(nextWateringDate);
      break;
  }
  return nextWateringDateString;
};

// if POST
const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const userData = JSON.parse(dataString);
    
    const nextWateringDate = calculateNextWateringDate(userData);
    
    userData.nextWater = nextWateringDate;
    
    userData.index = plantData.length;
    
    plantData.push(userData);

    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(plantData));
  });
};

// if DELETE
const handleDelete = function (request, response) {
  if (request.method === "DELETE") {
    
    const urlParts = request.url.split("/");
    const index = parseInt(urlParts[urlParts.length - 1]);

    if (isNaN(index) || index < 0 || index >= plantData.length) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Invalid index" }));
      return;
    }

    plantData.splice(index, 1);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(plantData));
  }
};

// send file
const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
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

// start server
server.listen(process.env.PORT || port);
