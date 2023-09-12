let editIndex = null; 

const fetchAndDisplayRecipes = async () => {
    const response = await fetch('/get-recipes');
    const recipes = await response.json();
    const tableBody = document.querySelector('#recipe-table-body');
    tableBody.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.recipeName}</td>
            <td>${recipe.ingredients.replace(/\n/g, ', ')}</td>
            <td>
                <button onclick="deleteRecipe(${index})">Delete</button>
                <button onclick="editRecipe(${index})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

const deleteRecipe = async (index) => {
    const response = await fetch('/delete-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
    });
    const result = await response.json();
    if (result.status === 'success') {
        fetchAndDisplayRecipes();
    } else {
        alert('Failed to delete recipe: ' + result.message);
    }
};

const editRecipe = async (index) => {
    const response = await fetch('/get-recipes');
    const recipes = await response.json();
    const recipe = recipes[index];
    if (recipe) {
        document.querySelector('#recipe-name').value = recipe.recipeName;
        document.querySelector('#ingredients').value = recipe.ingredients;
        document.querySelector('#instructions').value = recipe.instructions;
        editIndex = index;
    } else {
        console.error('Recipe not found');
    }
};

const submitRecipe = async function (event) {
    event.preventDefault();

    const recipeName = document.querySelector('#recipe-name').value;
    const ingredients = document.querySelector('#ingredients').value;
    const instructions = document.querySelector('#instructions').value;

    if (recipeName === "" || ingredients === "" || instructions === "") {
        alert("All fields are required.");
        return;
    }

    const recipeData = {
        recipeName,
        ingredients,
        instructions,
    };

    const body = JSON.stringify(recipeData);

    let url = '/add-recipe';
    if (editIndex !== null) {
        url = '/update-recipe';
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    const result = await response.json();

    if (result.status === 'success') {
        document.querySelector('#recipe-name').value = '';
        document.querySelector('#ingredients').value = '';
        document.querySelector('#instructions').value = '';
        editIndex = null;
        fetchAndDisplayRecipes();
    } else {
        alert('Failed to add/update recipe: ' + result.message);
    }
};

window.onload = function () {
    const addButton = document.querySelector('#add-recipe-form button');
    addButton.addEventListener('click', submitRecipe);
    fetchAndDisplayRecipes();
};
