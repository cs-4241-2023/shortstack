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
  { model: "toyota", year: 1999, mpg: 23 },
  { model: "honda", year: 2004, mpg: 30 },
  { model: "ford", year: 1987, mpg: 14 },
];

const totalPrice = { totalPrice: 0.0 };
let retObject;

const groceryList = [];

const server = http.createServer(function (request, response) {

  /*switch (request.method){
    case "GET":
      handleGet(request, response);
      break;
    case "POST":
      handlePost(request, response);
      break;
    case "DELETE":
      handleDelete(request, response);
      break;

  }*/
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }else if (request.method === "DELETE") {
    handleDelete(request, response);
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

const calcTotalPrice = function () {
  totalPrice.totalPrice = 0.0;
  if(groceryList.length !== 0){groceryList.forEach((item) => {
    if (!isNaN(parseFloat(item.price))) {
      totalPrice.totalPrice += parseFloat(item.price);
    } else {
      totalPrice.totalPrice += 0.0;
    }
  })};
};
const handlePost = function (request, response) {
    let dataString = "";

    request.on("data", function (data) {
      dataString += data;
    });

    request.on("end", function () {
      const newItem = JSON.parse(dataString).item;
      groceryList.push(newItem);
      calcTotalPrice();
      //console.log(totalPrice);
      retObject = { groceryList, totalPrice };
      console.log(retObject)
      response.writeHead(200, "OK", { "Content-Type": "text/json" });
      response.end(JSON.stringify(retObject));
    });

};

const handleDelete = function (request, response) {

  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    groceryList.splice(0, groceryList.length);
    console.log(groceryList)
    calcTotalPrice();
    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(groceryList)); 
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
