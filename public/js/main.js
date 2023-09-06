// Create function to get expenses
function getExpenses() {
  fetch("/expenses")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      populateExpenseList(data);
    });
}

// Attach to the render function
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("expenseForm");
  const fetchExpensesBtn = document.getElementById("fetchExpensesBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const item = document.getElementById("expense").value;
    let cost = document.getElementById("cost").value;
    cost = parseFloat(cost).toFixed(2);

    fetch("/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Item: item, Cost: cost }),
    }).then(response => response.json());

    // Re-fetch all data
    getExpenses();
  });

  // Add delete event
  window.deleteExpense = function (expense) {
    fetch(`/deleteExpense/${expense.Id}`, {
      method: "DELETE"
    }).then(response => response.json());

    getExpenses();
  };

  // Add refresh button click event
  fetchExpensesBtn.addEventListener("click", getExpenses);

  // On load populate the list
  getExpenses();
});