

require('dotenv').config()

const express = require("express"),
      { MongoClient, ObjectId } = require("mongodb"),
      app = express()
const fs = require('fs');
const mime = require('mime');
const bodyParser = require('body-parser');

process.env.PASS
//const app = express();
const port = 3000;
const appdata = [];

app.use(express.static("public") ) //might need to change
app.use(express.json() )


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@clusteraj.9ts6s0b.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient( uri )

let collection = null

async function run() {
  await client.connect()
  //collection = await client.db("Mydata").collection("Mydata")
  collection = await client.db("sample_weatherdata").collection("data")
  // route to get all docs

}
run()

app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
})

app.get("/docs", async (req, res) => {
    const docs = await collection.find({}).toArray()
    res.json( docs )
})

app.post( '/add', async (req,res) => {
    const result = await collection.insertOne( req.body )
    res.json( result )
  })

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', async (req,res) => {
    const result = await collection.deleteOne({ 
      _id:new ObjectId( req.body._id ) 
    })
    
    res.json( result )
  })


// Serve static files
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use("/", express.static('public'));

// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     console.log('Body:', req.body);
//     next();
// });

app.get('/get-list', (req, res) => {
    appdata.forEach((row) => {
        const date = new Date(row.date);
        const today = new Date();
        const diff = date - today;
        console.log(diff)
        if (diff < 50000000) {
            row.priority = 'high';
        } else if (diff < 1004800000) {
            row.priority = 'medium';
        } else {
            row.priority = `low`;
        }
    });
    //console.log(res.json(appdata))
    //res.json(appdata);
    console.log(JSON.stringify(appdata))
    res.writeHead(200,{'Content-Type': 'application/json' })
    res.end(JSON.stringify(appdata))
    
});

app.post('/submit', (req, res) => {
    appdata.push(req.body);
    res.send('posted');
});

app.delete('/delete-row/:id', (req, res) => {
    const id = req.params.id;
    const index = appdata.findIndex(row => row.id === id);

    if (index !== -1) {
        appdata.splice(index, 1);
        res.send('deleted');
    } else {
        res.status(404).send('ID not found');
    }
});

app.put('/edit-row/:id', (req, res) => {
    const id = req.params.id;
    const index = appdata.findIndex(row => row.id === id);

    if (index !== -1) {
        appdata[index] = req.body;
        res.send('updated');
    } else {
        res.status(404).send('ID not found');
    }
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening at ${port}`);
});

