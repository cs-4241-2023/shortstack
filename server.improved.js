class ServerResponse {
  constructor(entries) {
    this.entries = entries;

    this.totalCalories = 0;
    this.totalProtein = 0;

    for (let i = 0; i < entries.length; i++) {
      this.totalCalories += entries[i].calories;
      this.totalProtein += entries[i].protein;
    }
  }
}
const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime');
const fs = require('fs');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const entries = [];
let idCounter = 0;

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

app.post('/submit', (req, res) => {
  const json = req.body;
  console.log("post", req.body);

  if (json.mode === "add") {
    json.entry.id = idCounter++;
    let proteinCalories = json.entry.protein * 4;
    json.entry.percentProtein = Math.round((proteinCalories / json.entry.calories) * 100);
    entries.push(json.entry);
  } else if (json.mode === "delete") {
    const index = entries.findIndex(e => e.id === json.id);
    if (index !== -1) entries.splice(index, 1);
  } else if (json.mode === "clear") {
    entries.length = 0;
  }

  const responseObj = new ServerResponse(entries);
  res.json(responseObj);
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
