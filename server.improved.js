const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let groceryList = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
  else if (request.method === 'DELETE') {
    handleDelete(request, response)
  }
});
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);
  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/data") {
    console.log(JSON.stringify(groceryList));
    response.writeHeader(200, { "Content-type": "text/json" });
    response.end(JSON.stringify(groceryList));
  } else {
    sendFile(response, filename);
  }
};
const handlePost = function (request, response) {
  console.log("request URL" + request.url);
  let dataString = "";
  request.on("data", function (data) {
    dataString += data;
  });
  request.on("end", function () {
    let item = JSON.parse(dataString);
    let cost = getCost(item.price, item.quantity);
    groceryList.push({
      item: item.item,
      quantity: item.quantity,
      price: item.price,
      cost: cost,
      productType: item.productType,
      productDetails: item.productDetails,
    });
    response.writeHead(200, "OK", { "Content-Type": "text/json" });
    response.end(JSON.stringify(groceryList));
  });
};
const handleDelete = function (request, response) {
  let dataString = ''
  request.on('data', function (data) {
    dataString += data
  })
  request.on('end', function () {
    let removeItem = JSON.parse(dataString).removeItem
    
    let index = -1;
    for(let i = 0; i < groceryList.length; i++){
      if(groceryList[i].item === removeItem){
        index = i;
      }
    }
    if(index != -1){
      groceryList.splice(index, 1);
    }
    
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(groceryList))
  })
}
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

const getCost = function (price, quantity){
  let priceItem = parseFloat(price).toFixed(2);
  return parseFloat(quantity * priceItem).toFixed(2).toString();
}

server.listen(process.env.PORT || port);
