// FRONT-END (CLIENT) JAVASCRIPT HERE

const addRecipe = async function (event) {
  event.preventDefault();

  const inputName = document.querySelector("#recipe_name");
  const inputIngredients = document.querySelector("#recipe_ingredients");
  const inputDirections = document.querySelector("#recipe_directions");

  const recipeData = {
    recipe_name: inputName.value,
    recipe_ingredients: inputIngredients.value,
    recipe_directions: inputDirections.value,
  };

  const response = await fetch("/add_recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeData),
  });

  const recipes = await response.json();

  const tableRows = recipes
    .map((recipe) => {
      return `<tr>
        <td>${recipe.recipe_name}</td>
        <td>${recipe.recipe_ingredients}</td>
        <td>${recipe.recipe_directions}</td>
     </tr>`;
    })
    .join("");

  document.querySelector("#recipe_table").innerHTML = tableRows;

  inputName.value = "";
  inputIngredients.value = "";
  inputDirections.value = "";
};

const deleteRecipe = async function (event) {
  event.preventDefault();

  const inputToDelete = document.querySelector("#recipe_to_delete");

  const recipeToDelete = {
    recipe_name: inputToDelete.value,
  };

  const response = await fetch("/delete_recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipeToDelete),
  });

  const recipes = await response.json();

  const tableRows = recipes
    .map((recipe) => {
      return `<tr>
        <td>${recipe.recipe_name}</td>
        <td>${recipe.recipe_ingredients}</td>
        <td>${recipe.recipe_directions}</td>
     </tr>`;
    })
    .join("");

  document.querySelector("#recipe_table").innerHTML = tableRows;

  inputToDelete.value = "";
};

window.onload = function () {
  const addRecipeButton = document.getElementById("add_recipe");
  const deleteRecipeButton = document.getElementById("delete_recipe");

  addRecipeButton.onclick = addRecipe;
  deleteRecipeButton.onclick = deleteRecipe;
};
