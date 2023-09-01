// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function(event) {
  event.preventDefault();

  const nameInput = document.querySelector('#name');
  const amountInput = document.querySelector('#amount');
  const categoryInput = document.querySelector('#category');

  const json = {
      action: 'add',
      name: nameInput.value,
      amount: parseFloat(amountInput.value),
      category: categoryInput.value
  };

  const response = await fetch('/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
  });

  const data = await response.json();

  /*
  if (response.ok) {
      nameInput.value = '';
      amountInput.value = '';
      categoryInput.value = '';
  }
  */

  updateExpenseList(data);
};

let editingExpense = null;


const deleteExpense = async function(event) {
  const expenseName = event.target.dataset.expenseName;

  if (editingExpense === expenseName) {
      editingExpense = null;
  }

  const response = await fetch('/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'delete', name: expenseName })
  });

  const data = await response.json();
  updateExpenseList(data);
};

const updateExpenseList = function(data) {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';

  data.forEach(expense => {
      const item = document.createElement('li');
      item.innerHTML = `
          Expense: ${expense.name},
          Amount: ${expense.amount},
          Category: ${expense.category},
          Remaining Budget: ${expense.remainingBudget}
          <button class="delete-btn" data-expense-name="${expense.name}">Delete</button>
          <button class="edit-btn" data-expense-name="${expense.name}">Edit</button>
      `;
      list.appendChild(item);
  });

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
      button.addEventListener('click', deleteExpense);
  });

  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(button => {
      button.addEventListener('click', editExpense);
  });
};

const editExpense = async function(event) {
  const expenseName = event.target.dataset.expenseName;

  // Fetch the specific expense data from the server
  const response = await fetch('/getExpense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: expenseName }),
  });

  const expenseToEdit = await response.json();
  let edit = null;
  if(expenseToEdit !== null) {
      edit = expenseToEdit.find(expense => expense.name === expenseName);
  }

  if (edit) {
    const nameInput = document.querySelector('#name');
    const amountInput = document.querySelector('#amount');
    const categoryInput = document.querySelector('#category');

    nameInput.value = edit.name;
    amountInput.value = edit.amount;
    categoryInput.value = edit.category;

    editingExpense = expenseName;
  }
};

window.onload = async function() {
  const button = document.querySelector('button');
  button.onclick = submit;

  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
      button.addEventListener('click', deleteExpense);
  });

  // Fetch current data
  const response = await fetch('/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'fetch' })
  });

  const data = await response.json();
  updateExpenseList(data);
};

