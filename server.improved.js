const http = require('http');
const fs = require('fs');
const mime = require('mime');
const dir = 'public/';
const port = 3000;

let appdata = [
    { 'name': 'Groceries', 'amount': 50, 'category': 'Food' },
    { 'name': 'Utilities', 'amount': 100, 'category': 'Bills' },
    { 'name': 'House Tax', 'amount': 2500, 'category': 'Bills' },
];

const calculateRemainingBudget = (expenses, initialBudget) => {
    const totalExpenseAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    return initialBudget - totalExpenseAmount;
};

const initialBudget = 500; // Define your initial budget here

const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        handleGet(request, response);
    } else if (request.method === 'POST') {
        handlePost(request, response);
    }
});

const handleGet = function(request, response) {
    const filename = dir + request.url.slice(1);

    if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else {
        sendFile(response, filename);
    }
};

const handlePost = function(request, response) {
  let dataString = '';

  request.on('data', function(data) {
      dataString += data;
  });

  request.on('end', function() {
      const requestData = JSON.parse(dataString);

      if (requestData.action === 'delete') {
          console.log('Deleting expense: ', requestData.name);
          appdata = appdata.filter(expense => expense.name !== requestData.name);
      } else if (requestData.action === 'add') {
          console.log('Adding expense: ', requestData.name)
          appdata.push({
              name: requestData.name,
              amount: requestData.amount,
              category: requestData.category
          });
      } else if (requestData.action === 'getExpense') {
        console.log(requestData.name) 
        const expenseToEdit = appdata.find(expense => expense.name === requestData.name);
    
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(expenseToEdit));
      }
      

      const remainingBudget = calculateRemainingBudget(appdata, initialBudget);

      const updatedData = appdata.map(expense => ({
          ...expense,
          remainingBudget
      }));

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(updatedData));
  });
};

const sendFile = function(response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function(err, content) {
        if (err === null) {
            response.writeHeader(200, { 'Content-Type': type });
            response.end(content);
        } else {
            response.writeHeader(404);
            response.end('404 Error: File Not Found');
        }
    });
};

server.listen(process.env.PORT || port);