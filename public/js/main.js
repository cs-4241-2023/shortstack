// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()


  let isValid = true;
  
  const newGame = document.querySelector( '#game' );
  const newHigh = document.querySelector( '#highscore');
  const newMax = document.querySelector( '#maxscore' );
  const newInitials = document.querySelector( '#initials' );

  //check that form was filled in correctly
  isValid = validate(newGame.value, newHigh.value, newMax.value, newInitials.value);

  if (isValid === true) {
    
    const json = { 
      game: newGame.value,
      highscore: newHigh.value,
      maxscore: newMax.value,
      initials: newInitials.value
    };
    const body = JSON.stringify( json )

    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })
    const newData = await response.json()

    setGrid(newData);

    //reset form
    const form = document.querySelector( '#gameForm' );
    form.reset()
  }
  else {
    //show form error popup
    const popup = document.querySelector( '#errorPop' );
    popup.style.visibility = "visible";
  }

  

}

//check that form was filled in correctly
function validate(game, high, max, init) {
  const t = document.querySelector("#errorText");
  if (parseInt(high) > parseInt(max)) {
    t.textContent = "The Max Score must be greater than the High Score!";
    return false;
  }
  else if ((game === '') || (high === '') || (init === '')) {
    t.textContent = "Game, High Score, and Initials are required fields!";
    return false;
  }
  else {
    return true;
  }
}

//close form error popup
function exitPopup() {
  const popup = document.querySelector( '#errorPop' );
  popup.style.visibility = "hidden";
}

//reset the data display
function setGrid(newData) {
  const rows = document.querySelector("#data");
  rows.innerHTML = '';

  for (let i = 0; i < newData.length; i++) {

    const initText = document.createElement("p");
    let lowerI = newData[i].initials;
    let upperI = lowerI.toUpperCase();
    initText.innerText = upperI;
    initText.className = "griditem";
    initText.id = 'init' + i;
    rows.appendChild(initText);

    const gameText = document.createElement("p");
    gameText.className = "griditem";
    gameText.innerText = newData[i].game;
    gameText.id = 'game' + i;
    rows.appendChild(gameText);

    const highText = document.createElement("p");
    highText.className = "griditem";
    highText.innerText = newData[i].highscore;
    highText.id = 'high' + i;
    rows.appendChild(highText);

    const maxText = document.createElement("p");
    maxText.className = "griditem";
    if (newData[i].maxscore !== '') {
      maxText.innerText = newData[i].maxscore;
    }
    else {
      maxText.innerText = "???";
    }
    maxText.id = 'max' + i;
    rows.appendChild(maxText);

    const goalText = document.createElement("p");
    goalText.className = "griditem";
    goalText.innerText = newData[i].goal;
    rows.appendChild(goalText);

    const delButton = document.createElement("button");
    delButton.innerText = 'x';
    delButton.id = 'x' + i;
    delButton.onclick = () => {
      deleteRow(i);
    };

    const modButton = document.createElement("button");
    modButton.innerText = 'EDIT';
    modButton.id = 'mod' + i;
    modButton.onclick = () => {
      modify(i);
    };

    const rowButtons = document.createElement("div");
    rowButtons.className = "griditem";
    rowButtons.appendChild(delButton);
    rowButtons.appendChild(modButton);
    rows.appendChild(rowButtons);
  }
}

async function deleteRow(row) {
  const body = JSON.stringify(row);
  const response = await fetch('/json', {
    method: 'DELETE',
    body
  })

  const newGrid = await response.json();
  setGrid(newGrid);
}

//show edit form, set input values to current data
function modify(row) {
  let newVal = document.querySelector( '#game'+row ).textContent;
  document.querySelector( '#gameEdit' ).value = newVal;

  newVal = document.querySelector( '#max'+row ).textContent;
  document.querySelector( '#maxscoreEdit' ).value = newVal;

  newVal = document.querySelector( '#high'+row ).textContent;
  document.querySelector( '#highscoreEdit' ).value = newVal;

  newVal = document.querySelector( '#init'+row ).textContent;
  document.querySelector( '#initialsEdit' ).value = newVal;

  const popup = document.querySelector( '#editwindow' );
  popup.style.visibility = "visible";

  const btn = document.querySelector( '#submitEdit' );
  btn.onclick = (event) => {
    event.preventDefault();
    editRow(row);
  };
}

async function editRow(row) {

  let isValid = true;
  
  const newGame = document.querySelector( '#gameEdit' );
  const newHigh = document.querySelector( '#highscoreEdit');
  const newMax = document.querySelector( '#maxscoreEdit' );
  const newInitials = document.querySelector( '#initialsEdit' );

  //check that form was filled in correctly
  isValid = validate(newGame.value, newHigh.value, newMax.value, newInitials.value);

  if (isValid === true) {
    
    const json = { 
      game: newGame.value,
      highscore: newHigh.value,
      maxscore: newMax.value,
      initials: newInitials.value,
      goal: row
    };
    const body = JSON.stringify(json);
    const response = await fetch('/json', {
      method: 'PUT',
      body
    })

    const newGrid = await response.json();
    setGrid(newGrid);
  }
  else {
    const popupE = document.querySelector( '#errorPop' );
    popupE.style.visibility = "visible";
  }
  const popup = document.querySelector( '#editwindow' );
  popup.style.visibility = "hidden";
}

//set up grid when page first loads
async function startGrid() {
  const response = await fetch('/json', {
    method: 'GET'
  })
  const newGrid = await response.json();
  setGrid(newGrid);
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;

  startGrid();
}

