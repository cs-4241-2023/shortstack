const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;
//inital bank account
let appdata = [{ username: "Admin", income: 10000, expenses: 2000, balance: 8000 }];

const server = http.createServer(function (request, response) {
  ////check print called
  if ((request.method === "GET") & (request.url === "/print")) handlePrint(response);
  
  else if (request.method === "POST") {//check whether a createUser, deposit, or withdrawal call
    
    if (request.url === "/createUser") handlePost(request, response);
    else if (request.url === "/deposit") handleDeposit(request, response);
   else if (request.url === "/withdraw") handleWithdraw(request, response);
    
  } 
  //check get and Delete 
  else if (request.method === "GET") handleGet(request, response);
  else if (request.method === "DELETE") handleRemove(request, response);
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
    const userData = JSON.parse(dataString);

    // Check if the username already exists
    const exists = appdata.some((item) => item.username === userData.username);

    if (!exists) {
      // calculate dervied balance variable 
      const balance = userData.income - userData.expenses;

      // If the username doesn't exist add a create a new user 
      const newUser = {
        username: userData.username,
        income: userData.income,
        expenses: userData.expenses,
        balance: balance,
      };
      //add the new data to the array
      appdata.push(newUser);

      response.writeHead(201, "OK", { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({ // send username
          username: newUser.username,
        })
      );
    } else {
      // username already exists

      response.writeHead(400, "Bad Request", {
        "Content-Type": "application/json",
      });
      // send username 
      response.end(
        JSON.stringify({
          username: userData.username,
        })
      );
    }
  });
  //toggle print 
  displayed = false;
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

let displayed = false;

const handlePrint = function (response) {
  let dataString = "";
  
//if page is not displaying accounts, go through each item in the string and create new data string with the inputted values
  if (displayed === false) {
    appdata.forEach((d) => {
      dataString +=
        "Username: " +
        d.username +
        " Income: " +
        d.income +
        " Expenses: " +
        d.expenses +
        " Balance: " +
        d.balance +
        "\n";
    });
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify(dataString)); 
   
  }  else{
       response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify("")); 
    }
  //toggle print 
  displayed = !displayed;
};

const handleRemove = function (request, response) {
  let dataString = "";
  
  request.on("data", function (data) {
    dataString += data;
  });
  
  request.on("end", function () {
    const data = JSON.parse(dataString);
//prevents admin from being removed
    if (data.yourname !== "Admin") {
      //find the index where username matches the input value
      const index = appdata.findIndex((item) => item.username === data.yourname);
      //Found data
      if (index !== -1) {
        //remove data from array
        appdata.splice(index, 1);
        
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            yourname: data.yourname,
          })
        );
      } else {//could not find data
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Data not found" }));
      }
    } else {//admin was attempted to be deleted
      response.writeHead(403, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({ message: "Permission denied: Cannot remove admin" })
      );
    }
  });
  //toggle print 
  displayed = false;
};
const handleDeposit = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const data = JSON.parse(dataString);

    //search data for matching username
    const user = appdata.find((item) => item.username === data.username);

    if (user) {
      //balance = input + balance
      user.balance += data.amount;

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          message: "Deposit successful",
          username: user.username,
          balance: user.balance,
        })
      );
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "User not found" }));
    }
  });
  //toggle print 
  displayed = false;
};

const handleWithdraw = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const data = JSON.parse(dataString);

    ////search data for matching username
    const user = appdata.find((item) => item.username === data.username);

    if (user) {
   
      if (user.balance >= data.amount) {
        //balance = balance - input
        user.balance -= data.amount;

        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            username: user.username,
            balance: user.balance,
          })
        );
      } else { //Balance < input value (i.e Insufficent Funds)
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            username: user.username,
            balance: user.balance,
          })
        );
      }
    } else { // User could not be found
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "User not found" }));
    }
  });
  //toggle print 
  displayed = false;
};
server.listen(process.env.PORT || port);
