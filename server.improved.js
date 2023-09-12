const http = require('http');
const fs = require('fs');
const mime = require('mime');
const dir = 'public/';
const port = 3000;

const appdata = [
    {
        'recipeName': 'Chocolate Chip Cookies',
        'ingredients': '1 cup flour\n1/2 cup sugar\n1/2 cup chocolate chips\n1/4 cup butter\n1 egg',
        'instructions': '1. Preheat oven to 350°F.\n2. Mix flour, sugar, and chocolate chips in a bowl.\n3. Melt butter and add it to the mixture.\n4. Add egg and mix well.\n5. Drop spoonfuls of dough onto a baking sheet.\n6. Bake for 12-15 minutes.'
    },
    {
        'recipeName': 'Vegetable Stir-Fry',
        'ingredients': '2 cups mixed vegetables\n1/4 cup soy sauce\n2 tablespoons vegetable oil\n1 clove garlic, minced\n1 teaspoon ginger, grated',
        'instructions': '1. Heat oil in a pan over medium-high heat.\n2. Add garlic and ginger, sauté for 1 minute.\n3. Add mixed vegetables and stir-fry for 5-7 minutes.\n4. Add soy sauce and cook for an additional 2 minutes.\n5. Serve hot.'
    },
    {
        'recipeName': 'Pasta Carbonara',
        'ingredients': '8 oz spaghetti\n2 eggs\n1/2 cup grated Parmesan cheese\n4 slices bacon, chopped\n2 cloves garlic, minced\nSalt and pepper to taste',
        'instructions': '1. Cook spaghetti according to package instructions.\n2. While pasta cooks, fry bacon until crispy in a pan.\n3. In a bowl, whisk eggs and Parmesan cheese.\n4. Drain cooked pasta and immediately toss with egg mixture.\n5. Add bacon, garlic, salt, and pepper.\n6. Serve immediately.'
    }
];

module.exports = appdata;

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response);
    } else if (request.method === 'POST') {
        handlePost(request, response);
    } else {
        response.writeHead(405, { 'Content-Type': 'text/plain' });
        response.end('Method not allowed');
    }
});

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1);

    if (request.url === '/get-recipes') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(appdata));
        return; 
    }

    if (request.url.endsWith('.css')) {
        sendFile(response, filename, 'text/css');
    } else if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else {
        sendFile(response, filename);
    }
};

const handlePost = function (request, response) {
    if (request.headers['content-type'] !== 'application/json') {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end('Bad Request: Invalid Content-Type');
        return;
    }

    let dataString = '';

    request.on('data', function (data) {
        dataString += data;
    });

    request.on('end', function () {
        try {
            const jsonData = JSON.parse(dataString);

            if (request.url === '/update-recipe') {
                const { index, updatedRecipe } = jsonData;
                if (index >= 0 && index < appdata.length) {
                    appdata[index] = updatedRecipe;
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ status: 'success' }));
                    return;
                } else {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ status: 'error', message: 'Invalid index' }));
                    return;
                }
            }

            if (request.url === '/delete-recipe') {
                const index = jsonData.index;
                if (index >= 0 && index < appdata.length) {
                    appdata.splice(index, 1);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ status: 'success' }));
                    return;
                } else {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ status: 'error', message: 'Invalid index' }));
                    return;
                }
            }

            // Validate the JSON data before adding to appdata
            if (!jsonData.recipeName || !jsonData.ingredients || !jsonData.instructions) {
                response.writeHead(400, { 'Content-Type': 'text/plain' });
                response.end('Bad Request: Invalid JSON data');
                return;
            }

            // Add the received recipe to the appdata array
            appdata.push({
                'recipeName': jsonData.recipeName,
                'ingredients': jsonData.ingredients,
                'instructions': jsonData.instructions,
            });

            // Calculate a derived field (e.g., total ingredients count)
            const totalIngredientsCount = jsonData.ingredients.split('\n').length;

            // Send a response back to the client with the added recipe and derived field
            const responseData = {
                'recipeAdded': jsonData,
                'totalIngredientsCount': totalIngredientsCount,
            };

            console.log('Received Data:', jsonData);
            console.log('Total Ingredients Count:', totalIngredientsCount);

            // Send the responseData back to the client
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(responseData));

        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
            console.error('Error:', error);
        }
    });
};
const sendFile = function (response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function (err, content) {
        if (err === null) {
            response.writeHead(200, { 'Content-Type': type });
            response.end(content);
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404 Error: File Not Found');
        }
    });
};

server.listen(process.env.PORT || port);
