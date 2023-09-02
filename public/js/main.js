// FRONT-END (CLIENT) JAVASCRIPT HERE
//main.js
let editingExpense = null;
let isEditMode = false;

const toggleView = function () {
    const addExpenseSection = document.getElementById('addExpenseSection');
    const updateExpenseSection = document.getElementById('updateExpenseSection');
    const updateButton = document.getElementById('update');


    if (isEditMode) {
        isEditMode = false;
        addExpenseSection.style.display = 'block';
        updateExpenseSection.style.display = 'none';
        updateButton.textContent = 'Add Expense';
    } else {
        isEditMode = true;
        addExpenseSection.style.display = 'none';
        updateExpenseSection.style.display = 'block';
        updateButton.textContent = 'Update Changes';
    }
};

const submit = async function (event) {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    const amountInput = document.querySelector('#amount');
    const categoryInput = document.querySelector('#category');
    
    if (nameInput.value === '' || amountInput.value === '' || categoryInput.value === '') {
        alert('Please fill out all fields');
        return;
    }

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

    if (response.status === 400) {
        const errorResponse = await response.json();
        alert(errorResponse.error);
        return;
    }

    const data = await response.json();

    nameInput.value = '';
    amountInput.value = '';
    categoryInput.value = '';

    if (isEditMode) {
        toggleView();
    }
    
    updateExpenseList(data);
    alert('Expense added');
};

const updateExpense = async function (event) {
    event.preventDefault();

    const nameInput = document.querySelector('#newName');
    const amountInput = document.querySelector('#newAmount');
    const categoryInput = document.querySelector('#newCategory');
    const oldNameInput = document.querySelector('#oldName');

    const json = {
        action: 'update',
        name: nameInput.value,
        amount: parseFloat(amountInput.value),
        category: categoryInput.value,
        oldName: oldNameInput.value
    };

    if (nameInput.value === '' || amountInput.value === '' || categoryInput.value === '') {
        alert('Please fill out all fields');
        return;
    }

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    });

    if (response.status === 400) {
        const errorResponse = await response.json();
        alert(errorResponse.error);
        return;
    }

    const data = await response.json();

    nameInput.value = '';
    amountInput.value = '';
    categoryInput.value = '';
    oldNameInput.value = '';

    if(!isEditMode){
      toggleView();
    }
    updateExpenseList(data);
    alert('Expense updated');
};

const updateExpenseList = function (data) {
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

const deleteExpense = async function (event) {
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
    alert('Expense deleted');
};

const editExpense = async function (event) {
    const expenseName = event.target.dataset.expenseName;

    const response = await fetch('/getExpense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: expenseName }),
    });

    const expenseToEdit = await response.json();
    let edit = null;
    if (expenseToEdit !== null) {
        edit = expenseToEdit.find(expense => expense.name === expenseName);
    }

    if (edit) {
        const nameInput = document.querySelector('#newName');
        const amountInput = document.querySelector('#newAmount');
        const categoryInput = document.querySelector('#newCategory');
        const oldNameInput = document.querySelector('#oldName');

        nameInput.value = edit.name;
        amountInput.value = edit.amount;
        categoryInput.value = edit.category;
        oldNameInput.value = edit.name;

        editingExpense = expenseName;
        if(!isEditMode){
          toggleView();
        }
    }
};

window.onload = async function () {
    const addButton = document.querySelector('#add');
    addButton.onclick = submit;

    const updateButton = document.querySelector('#update');
    updateButton.onclick = updateExpense;

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteExpense);
    });

    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', toggleView);

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