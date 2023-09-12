class FoodEntry {
  constructor(name, calories, protein) {
      this.id = -1; // not yet assigned by server
      this.name = name;
      this.calories = calories;
      this.protein = protein;
  }
}

class FoodEntryBuilder {
  constructor() {
      this.name = "";
      this.calories = "";
      this.protein = "";
      this.message = "";
      this.valid = false;
  }

  setName(name) {
      this.name = name;
  }

  setCalories(calories) {
      this.calories = calories;
  }

  setProtein(protein) {
      this.protein = protein;
  }

  // build the food entry, or return null if the food entry is invalid
  build() {

      this.valid = false;

      if (this.name === "") {
          this.message = "Name cannot be empty";
          return null;
      }

      let numCalories = parseInt(this.calories);
      if (isNaN(numCalories)) {
          this.message = "Calories must be a number";
          return null;
      }
      if (numCalories <= 0) {
          this.message = "Calories must be positive";
          return null;
      }
      
      let numProtein = parseInt(this.protein);
      if (isNaN(numProtein)) {
          this.message = "Protein must be a number";
          return null;
      }
      if (numProtein <= 0) {
          this.message = "Protein must be positive";
          return null;
      }

      this.message = "Successfully added!";
      this.valid = true;
      return new FoodEntry(this.name, numCalories, numProtein);

  }

  getMessage() {
      return this.message;
  }

}

const setCounter = function(type, amount) {

  if (!(type === "calories" || type === "protein")) {
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
      offsetElement.textContent = "" + offset + " to go!";
    
  } else if (offset < 0) {
      offsetElement.style.color = "red";
      offsetElement.textContent = "" + offset + " over target.";
  } else {
      offsetElement.style.color = "black";
      offsetElement.textContent = "You've met your goal!";
  }

};

const updateCaloriesGoal = function() {
  console.log("updateCaloriesGoal");
  let valueElement = document.getElementById("calories_value");
  let currentCalories = parseInt(valueElement.textContent);
  setCounter("calories", currentCalories);
};

const updateProteinGoal = function() {
  console.log("updateProteinGoal");
  let valueElement = document.getElementById("protein_value");
  let currentProtein = parseInt(valueElement.textContent);
  setCounter("protein", currentProtein);
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
        const json = { mode: "delete", id: entryData.id };
        const body = JSON.stringify( json );

        await getServerResponse(body);
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

  let builder = new FoodEntryBuilder();

  let nameElement = document.getElementById("food_name");
  let caloriesElement = document.getElementById("food_calories");
  let proteinElement = document.getElementById("food_protein");

  builder.setName(nameElement.value.toLowerCase());
  builder.setCalories(caloriesElement.value);
  builder.setProtein(proteinElement.value);

  let message = document.getElementById("food_submit_message");

  let foodEntry = builder.build();
  message.textContent = builder.getMessage();
  console.log("message", builder.getMessage());

  if (builder.valid) message.style.color = "lightgreen";
  else message.style.color = "red";
  console.log("valid", builder.valid);

  // fade message out afte rone second
  message.style.opacity = '1';
    setTimeout(function() {
        message.style.opacity = '0';
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

  console.log("valid");
  
  const json = { mode: "add", entry: foodEntry };
  const body = JSON.stringify( json );

  await getServerResponse(body);
  
}

const getServerResponse = async function(body) {

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text();
  const data = JSON.parse(text);

  console.log( 'data:', data );
  setCounter("calories", data.totalCalories);
  setCounter("protein", data.totalProtein);

  generateFoodEntries(data.entries);

}

window.onload = function() {
   const button = document.querySelector("#food_submit_button");
  button.onclick = submit;

  setCounter("calories", 0);
  setCounter("protein", 0);

}