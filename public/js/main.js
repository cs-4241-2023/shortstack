
const print = async function (event) {
  event.preventDefault();
  const response = await fetch("/print", {
    method: "GET",
  });
//fetch string to print and wait for it to return
  const appData = await response.json();

  const appDataDisplay = document.querySelector("#nameDisplay");
  appDataDisplay.innerHTML = `${appData.replace(/\n/g, "<br>")}`;
};

const remove = async function (event) {
  event.preventDefault();

  const input = document.querySelector("#username");
  const json = { yourname: input.value };
  const body = JSON.stringify(json);

  const response = await fetch("/remove", {
    method: "DELETE",
    body,
  });
//fetch new array and wait for it
  const appData = await response.json();

  const deleteStatus = document.querySelector("#nameDisplay");
  if (response.status === 200) {//success
    deleteStatus.textContent = `${appData.yourname} Found and Removed Successfully`;
  } else if (response.status === 403) {//admin was attempted to be removed
    deleteStatus.textContent = "Permission denied: Cannot Remove Admin";
  } else {//could not find matching usernames
    deleteStatus.textContent = "Data Not Found";
  }

  const appDataDisplay = document.querySelector("#nameDisplay");
  appDataDisplay.innerHTML = `${appData.replace(/\n/g, "<br>")}`;
};

const createUser = async function (event) {
  event.preventDefault();
 
//get inputs
  const usernameInput = document.querySelector("#username");
  const incomeInput = document.querySelector("#income");
  const expensesInput = document.querySelector("#expenses");
//parse as strings and floats
  const income = parseFloat(incomeInput.value);
  const expenses = parseFloat(expensesInput.value);
  const username = usernameInput.value;
  
  //calculate balance
  const balance = income - expenses;

  //create new array with data
  const userData = {
    username: username,
    income: income,
    expenses: expenses,
    balance: balance,
  };

  //pass newuser to server and wait for response
  const response = await fetch("/createUser", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  const nameDisplay = document.querySelector("#nameDisplay");
  if (response.status === 201) nameDisplay.textContent = `New User Created: ${data.username}!`; //success
  else if (response.status === 400) nameDisplay.textContent = `User "${data.username}" Already Exists.`;//already exists in server
};

const deposit = async function (event) {
  event.preventDefault();
//define income and username values from input
  const usernameInput = document.querySelector("#username");
  const incomeInput = document.querySelector("#income");
  const username = usernameInput.value;
  const income = parseFloat(incomeInput.value);
  
    // create new deposit variable
    const depositData = {
      username: username,
      amount: income
    };
//pass new deposit data to server and wait for response
    const response = await fetch("/deposit", {
      method: "POST",
      body: JSON.stringify(depositData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const depositStatus = document.querySelector("#nameDisplay");
    if (response.status === 200) {// success
      depositStatus.textContent = `Deposit Successful For ${data.username}. New Balance: ${data.balance}`;
    } else if (response.status === 404) depositStatus.textContent = `User '${data.username}' Not Found.`; // not found
    
  }


const withdraw = async function (event) {
  event.preventDefault();
// define username and expenses data
  const usernameInput = document.querySelector("#username");
  const username = usernameInput.value;
  const expensesInput = document.querySelector("#expenses");
  const expenses = parseFloat(expensesInput.value);


    // create new withdraw array
    const withdrawData = {
      username: username,
      amount: expenses, // Use the non-empty amount
    };

  //pass the new array to the server and wait for a response
    const response = await fetch("/withdraw", {
      method: "POST",
      body: JSON.stringify(withdrawData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const withdrawStatus = document.querySelector("#nameDisplay");
    if (response.status === 200) {//success
      withdrawStatus.textContent = `Withdrawal Successful For ${data.username}. New Balance: ${data.balance}`;
    } else if (response.status === 400) {//balance < input
      withdrawStatus.textContent = `Insufficient Balance For ${data.username}. Current Balance: ${data.balance}`;
    } else if (response.status === 404) { //user not found
      withdrawStatus.textContent = `User '${data.username}' Not Found.`;
    }
  }


window.onload = function () {
  //get input values if they are submitted
  const createButton = document.querySelector("#createUser");
  const resultButton = document.querySelector("#results");
  const removeButton = document.querySelector("#remove");
  const depositButton = document.querySelector("#deposit");
  const withdrawButton = document.querySelector("#withdraw");

  //onclick, do something
  createButton.onclick = createUser;
  resultButton.onclick = print;
  removeButton.onclick = remove;
  depositButton.onclick = deposit;
  withdrawButton.onclick = withdraw;
  
  
};
