// checks if the entry values are valid
// returns {valid: [boolean], message: [string]}
const validateEntry = function(name, calories, protein) {

  if (name === "") {
    return {valid: false, message: "Name cannot be empty"};
  }

  let numCalories = parseInt(calories);
  if (isNaN(numCalories)) {
    return {valid: false, message: "Calories must be a number"};
  }
  if (numCalories <= 0) {
    return {valid: false, message: "Calories must be positive"};
  }
  
  let numProtein = parseInt(protein);
  if (isNaN(numProtein)) {
    return {valid: false, message: "Protein must be a number"};
  }
  if (numProtein <= 0) {
    return {valid: false, message: "Protein must be positive"};
  }

  return {valid: true, message: "Successfully added!"};
};

const setCounter = function(type, amount) {

  let suffix;
  if (type === "calories") {
    suffix = " kcal";
  } else if (type === "protein") {
    suffix = " g";
  } else {
      console.log("invalid type");
      return;
  }

  let valueElement = document.getElementById(type + "_value");
  let offsetElement = document.getElementById(type + "_offset");
  let goalElement = document.getElementById(type + "_goal");

  valueElement.textContent = amount;
  let goal = parseInt(goalElement.value);
  let offset = goal - amount;

  if (offset > 0) {
      offsetElement.style.color = "green";
      offsetElement.textContent = "" + offset + suffix + " to go!";
    
  } else if (offset < 0) {
      offsetElement.style.color = "red";
      offsetElement.textContent = "" + offset + suffix + " over target.";
  } else {
      offsetElement.style.color = "black";
      offsetElement.textContent = "You've met your goal!";
  }

};

/*
Generate the HTML for the food entries. Format:

<div class="entry">
  <h2 class="name">Food Name</h2>
  <div class="info">
    <p class="calories">Calories: 100</p>
    <p class="protein">Protein: 10</p>
    <p class="percent_protein">Percent Protein: 40%</p>
  </div>
  <div class ="delete">
    <p class="delete_x">x</p>
  </div>
</div>
*/
const generateFoodEntries = function(entries) {

  const html = document.getElementById("food_list");

  // clear the existing entries first
  html.innerHTML = "";

  // generate the new entries
  for (let i = 0; i < entries.length; i++) {

      let entryData = entries[i];

      let entryHTML = document.createElement("div");
      entryHTML.classList.add("entry");

      let nameHTML = document.createElement("h2");
      nameHTML.textContent = entryData.name;
      nameHTML.classList.add("name");
      entryHTML.appendChild(nameHTML);

      let infoHTML = document.createElement("div");
      infoHTML.classList.add("info");

      let caloriesHTML = document.createElement("p");
      caloriesHTML.textContent = "Calories: " + entryData.calories + " kcal";
      caloriesHTML.classList.add("calories");
      infoHTML.appendChild(caloriesHTML);

      let proteinHTML = document.createElement("p");
      proteinHTML.textContent = "Protein: " + entryData.protein + " g";
      proteinHTML.classList.add("protein");
      infoHTML.appendChild(proteinHTML);

      let percentProteinHTML = document.createElement("p");
      percentProteinHTML.textContent = "Percent Protein: " + entryData.percentProtein + "%";
      percentProteinHTML.classList.add("percent_protein");
      infoHTML.appendChild(percentProteinHTML);

      entryHTML.appendChild(infoHTML);

      let deleteHTML = document.createElement("div");
      deleteHTML.classList.add("delete");
      deleteHTML.onclick = async function() {
        const data = { id: entryData.id };
        await getServerResponse("/delete", data);
      };

      let deleteXHTML = document.createElement("h1");
      deleteXHTML.textContent = "x";
      deleteXHTML.classList.add("delete_x");
      deleteHTML.appendChild(deleteXHTML);
      
      entryHTML.appendChild(deleteHTML);

      html.appendChild(entryHTML);

  }

};

// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  console.log("submitting");

  let messageElement = document.getElementById("food_submit_message");
  let nameElement = document.getElementById("food_name");
  let caloriesElement = document.getElementById("food_calories");
  let proteinElement = document.getElementById("food_protein");

  let name = nameElement.value;
  let calories = caloriesElement.value;
  let protein = proteinElement.value;

  const result = validateEntry(name, calories, protein);
  messageElement.textContent = result.message;

  if (result.valid) messageElement.style.color = "lightgreen";
  else messageElement.style.color = "red";

  // fade message out after one second
  messageElement.style.opacity = '1';
    setTimeout(function() {
        messageElement.style.opacity = '0';
    }, 2000);

  // invalid food entry
  if (foodEntry === null) {
    return;
  } else {
    // valid, clear form
    nameElement.value = "";
    caloriesElement.value = "";
    proteinElement.value = "";
  }

  await getServerResponse("/add", {
    name: name,
    calories: calories,
    protein: protein
  });
  
}

const clear = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  console.log("clear");
  await getServerResponse("/clear");

}

const getServerResponse = async function(command, jsonText = {}) {

  json = JSON.stringify(jsonText);

  const response = await fetch( command, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
  },
    body: json 
  })

  const data = await response.json();

  console.log( 'data:', data );
  // setCounter("calories", data.totalCalories);
  // setCounter("protein", data.totalProtein);

  // generateFoodEntries(data.entries);

}

window.onload = function() {
  const submitButton = document.querySelector("#food_submit_button");
  submitButton.onclick = submit;

  const clearButton = document.querySelector("#food_clear_button");
  clearButton.onclick = clear;

  const caloriesGoalButton = document.querySelector("#calories_goal_button");
  caloriesGoalButton.onclick = async function() {
    let caloriesGoal = prompt("Enter new calories goal", "3000");
    console.log(caloriesGoal);
    await getServerResponse("/setgoal", {type: "calories", value: caloriesGoal});
  };

  const proteinGoalButton = document.querySelector("#protein_goal_button");
  proteinGoalButton.onclick = async function() {
    let proteinGoal = prompt("Enter new protein goal", "150");
    console.log(proteinGoal);
    await getServerResponse("/setgoal", {type: "protein", value: proteinGoal});
  };


  const json = { mode: "read"};
  const body = JSON.stringify( json );

  (async function() { await getServerResponse(body); })();

}