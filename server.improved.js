const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to mongodb
require('dotenv').config();
const uri = "mongodb+srv://anselychang:" + process.env.MONGODB_PASSWORD + "@ansel.musopg0.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  (result) => {
    console.log("connected to db");

    // start listening to requests only after we've successfully connected to the database
    app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

  }
).catch(
  (err) => console.log(err)
);

app.use(express.json());
app.use(express.static('public'));


app.get('*', (req, res) => {
  console.log("get", req.url)
  const filename = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const type = mime.getType(filename);

  fs.readFile(filename, (err, content) => {
    if (err === null) {
      res.set('Content-Type', type);
      res.send(content);
    } else {
      res.status(404).send('404 Error: File Not Found');
    }
  });
});

const getState = function() {
  return {message: "hello world"};
};

// Set calories/protein goal
// Format: {type: ["protein"/"calories"], value: [number]}
app.post('/setgoal', (req, res) => {
  const json = req.body;
  console.log("set goal", json);
  res.json(getState());
});

// Add entry
// Format: {name: [string], calories: [number], protein: [number]}
app.post('/add', (req, res) => {
  const json = req.body;
  console.log("add", json);
  res.json(getState());
});

// Delete entry
// Format: {id: [number]}
app.post('/delete', (req, res) => {
  const json = req.body;
  console.log("delete", json);
  res.json(getState());
});

// Clear all entries
// Format: {}
app.post('/clear', (req, res) => {
  const json = req.body;
  console.log("clear", json);
  res.json(getState());
});



// app.post('/submit', (req, res) => {
//   const json = req.body;
//   console.log("post", req.body);

//   if (json.mode === "add") {
//     json.entry.id = idCounter++;
//     let proteinCalories = json.entry.protein * 4;
//     json.entry.percentProtein = Math.round((proteinCalories / json.entry.calories) * 100);
//     entries.push(json.entry);
//   } else if (json.mode === "delete") {
//     const index = entries.findIndex(e => e.id === json.id);
//     if (index !== -1) entries.splice(index, 1);
//   } else if (json.mode === "clear") {
//     entries.length = 0;
//   }

//   const responseObj = new ServerResponse(entries);
//   res.json(responseObj);
// });
