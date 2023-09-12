class FoodEntry {
  constructor(name, calories, protein) {
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

  builder.setName(nameElement.value);
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
  
  const json = { mode: "add", entry: foodEntry },
        body = JSON.stringify( json );

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text();
  const data = JSON.parse(text);

  console.log( 'data:', data );
  setCounter("calories", data.totalCalories);
  setCounter("protein", data.totalProtein);
}

window.onload = function() {
   const button = document.querySelector("#food_submit_button");
  button.onclick = submit;

  setCounter("calories", 0);
  setCounter("protein", 0);

}