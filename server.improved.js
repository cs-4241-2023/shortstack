const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const Entry = require('./models/Entry.js');
const Global = require('./models/Globals.js');

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

// return all the data for the logged in user
const sendUserState = async function(res) {

  let state = {
    caloriesGoal: 3000, // default calories goal
    proteinGoal: 150, // default protein gaol
    totalCalories: 0,
    totalProtein: 0,
    entries: []
  }

  let globals = await Global.find();
  for (let i = 0; i < globals.length; i++) {
    if (globals[i].name === "caloriesGoal") {
      state.caloriesGoal = parseInt(globals[i].value);
    } else if (globals[i].name === "proteinGoal") {
      state.proteinGoal = parseInt(globals[i].value);
    }
  }

  let entries = await Entry.find();
      
  for (let i = 0; i < entries.length; i++) {
    state.entries.push({
      id: entries[i]._id,
      name: entries[i].name,
      calories: entries[i].calories,
      protein: entries[i].protein,
      percentProtein: entries[i].percentProtein
    });

    state.totalCalories += parseInt(entries[i].calories);
    state.totalProtein += parseInt(entries[i].protein);

  }

  res.json({status: 200, message: "Successfully added entry", data: state},);

}

// Do nothing but just return data
app.post('/null', (req, res) => {
  console.log("null", req.body);
  sendUserState(res);
});

// Set calories/protein goal
// Format: {type: ["proteinGoal"/"caloriesGoal"], value: [number]}
app.post('/setgoal', (req, res) => {
  const json = req.body;
  console.log("set goal", json);

  const filter = { name: json.type };
  const update = { value: json.value };
  const options = { new: true, upsert: true }; // 'upsert' will create the document if it doesn't exist
  
  Global.findOneAndUpdate(filter, update, options).then(
    (result) => {
      sendUserState(res);
    }
  ).catch(
    (err) => {
      console.log(err)
      res.json({status: 400, message: "Error setting goal"});
    }
  );
});

// Add entry
// Format: {name: [string], calories: [number], protein: [number]}
app.post('/add', (req, res) => {
  const json = req.body;
  console.log("add", json);

  // calculate percent protein from calories and protein
  const proteinCalories = json.protein * 4;
  const percentProtein = Math.round((proteinCalories / json.calories) * 100);

  const entryData = {
    name: json.name,
    calories: json.calories,
    protein: json.protein,
    percentProtein: percentProtein
  };

  const entry = new Entry(entryData);

  entry.save().then(
    (result) => {
      console.log("Entry saved", entryData);

      sendUserState(res);
    }
  ).catch(
    (err) => {
      console.log(err)
      res.json({status: 400, message: "Error saving entry"});
    }
  );

});

// Delete entry
// Format: {id: [number]}
app.post('/delete', (req, res) => {
  const json = req.body;
  console.log("delete", json);

  sendUserState(res);
});

// Clear all entries
// Format: {}
app.post('/clear', (req, res) => {
  const json = req.body;
  console.log("clear", json);

  sendUserState(res);
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
