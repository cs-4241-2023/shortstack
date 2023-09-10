// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const todoInput = document.querySelector("#todo");
  const dateInput = document.querySelector("#date");
  
  const currentDate = new Date();
  const targetDate = new Date(dateInput.value);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  let urgency = "Not Urgent";
  if(daysDifference < 0){
    urgency = "Late"
  }
  else if(daysDifference <= 7){
    urgency = "Urgent"
  }
  
  
  const json = {
      action: "add",
      todo: todoInput.value,
      date: dateInput.value,
      urgency: urgency,
      done: false,
    },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();

  updateList(data);
};

const deleteItem = async function (event) {
  const todoItem = event.target.dataset.todo;
  const json = {
    action: "delete", 
    todo: todoItem
  }
  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(json),
  });

  const data = await response.json();

  updateList(data);
};

const updateCheckbox = async function (event) {
      const doneItem = event.target.dataset.done;
      const todoItem = event.target.dataset.todo;
      const dateItem = event.target.dataset.date
      
      const json = { 
        action: "update", 
        todo: todoItem, 
        date: dateItem, 
        done: doneItem 
      };
      
      const response = await fetch("/submit", {
        method: "POST",
        body: JSON.stringify(json),
      });

      const data = await response.json();

      updateList(data);
    }

const updateList = function (data) {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  data.forEach((todo) => {
    const item = document.createElement("li");
    let shouldCheck = todo.done;

    item.innerHTML = `
            <div class="listItem">
            <input type="checkbox" class="check" data-todo="${todo.todo}" data-date="${todo.date}" data-done="${todo.done}">
            <p
              ondblclick="makeEditable(this)"
              onblur="saveEditable(this)"
              contenteditable="false"
              class="todo"
            >${todo.todo}</p>
            <p class="date">Due Date: ${todo.date}</p>
            <p class="urgency">${todo.urgency}</p>
            <button class="delete" data-todo="${todo.todo}">Delete</button>
            </div>
        `;
    list.appendChild(item);

    const p = document.querySelectorAll('.urgency');

    p.forEach(p => {
      let color = 'black'
      if (p.textContent === 'Done') {
        color = '#b5d6a7';
      }
      else if (p.textContent === 'Urgent') {
        color= '#f55d1e';
      }
      else if (p.textContent === 'Not Urgent') {
        color= '#fef99b';
      }
      else if (p.textContent === 'Late') {
        color= '#fd9800';
      }
      p.style.backgroundColor = color;
    });
    
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.checked = shouldCheck;
  });
  
  const checkboxes = document.querySelectorAll(".check");
  checkboxes.forEach((box) => {
    box.addEventListener("click", updateCheckbox);
  });

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
};

function makeEditable(element) {
  element.dataset.originalText = element.textContent;
  element.contentEditable = true;
  element.classList.add('inEdit');
}

async function saveEditable(element) {
  element.contentEditable = false;
  element.classList.remove('inEdit');

  // Get the edited text content
  const editedText = element.textContent;
  const originalText = element.dataset.originalText;

  // You can save the edited text here or perform any other actions with it
  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify({ action: "edit", todoNew: element.textContent, todoOld: originalText}),
  });

    const data = await response.json();
  
  console.log(originalText, element.textContent)
    updateList(data);
}


window.onload = async function () {
  const addButton = document.querySelector("#add");
  addButton.onclick = submit;

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
  
  const checkboxes = document.querySelectorAll('.check');
  checkboxes.forEach((box) => {
    box.addEventListener("click", updateCheckbox);
  });
  
   const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify({ action: "load"}),
  });

    const data = await response.json();
    updateList(data);
};
