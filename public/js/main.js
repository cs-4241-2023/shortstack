// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  // mark task as completed when clicking on it
  let taskItems = document.querySelector('ul');
  taskItems.addEventListener('click', function(ev) 
  {
  if (ev.target.tagName === 'LI') 
  {
    ev.target.classList.toggle('done');
  }
  }, false);

//create a delete button next to each list element
  let taskList = document.getElementsByTagName("LI");
  let i =0;
  for(i=0; i<=taskList.length;i++)
  {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "remove";
    span.appendChild(txt);
    taskList[i].appendChild(span);
  }

  //clicking delete button removes task
  let remove = document.getElementsByClassName("remove");
  let j =0;
  for (j = 0; j < remove.length; j++) 
  {
    remove[j].onclick = function() 
    {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
  // add new task to list when clicking on the submit button
  let li = document.createElement("li");
  let inputValue = document.getElementById("taskname").value;
  let t = document.createTextNode(inputValue);
  remove = document.getElementsByClassName("remove");
  li.appendChild(t);
  if (inputValue === '') {
    alert("Task Name field cannot be left empty");
  } else {
    document.getElementById("myTasks").appendChild(li);
  }
  document.getElementById("taskname").value = "";
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "remove";
  span.appendChild(txt);
  li.appendChild(span);

  for (let i = 0; i < remove.length; i++) {
    remove[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })
}

window.onload = function() {

  // mark task as completed when clicking on it
  let taskItems = document.querySelector('ul');
  taskItems.addEventListener('click', function(ev) 
  {
  if (ev.target.tagName === 'LI') 
  {
    ev.target.classList.toggle('done');
  }
  }, false);

//create a delete button next to each list element
  let taskList = document.getElementsByTagName("LI");
  let i =0;
  for(i=0; i<=taskList.length;i++)
  {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "remove";
    span.appendChild(txt);
    taskList[i].appendChild(span);
  }

  //clicking delete button removes task
  let remove = document.getElementsByClassName("remove");
  let j =0;
  for (j = 0; j < remove.length; j++) 
  {
    remove[j].onclick = function() 
    {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }

  const button = document.querySelector("button");
  button.onclick = submit;
}



function loadRemoveTaskFeatures()
{
  //create a delete button next to each list element
  let taskList = document.getElementsByTagName("LI");
  let i =0;
  for(i=0; i<=taskList.length;i++)
  {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "remove";
    span.appendChild(txt);
    taskList[i].appendChild(span);
  }

  //clicking delete button removes task
  let remove = document.getElementsByClassName("remove");
  let j =0;
  for (j = 0; j < remove.length; j++) 
  {
    remove[j].onclick = function() 
    {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}

function loadCompleteTaskFeatures()
{
  // mark task as completed when clicking on it
  let taskItems = document.querySelector('ul');
  taskItems.addEventListener('click', function(ev) 
  {
  if (ev.target.tagName === 'LI') 
  {
    ev.target.classList.toggle('done');
  }
  }, false);

}