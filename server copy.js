require('dotenv').config()

const express = require("express"),
      { MongoClient, ObjectId } = require("mongodb"),
      cookie  = require( 'cookie-session' ),
      app = express()

const port = 3000;
const appdata = [];
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public") ) //might need to change
app.use(express.json() )

//cookie stuff
///*
app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
  if( req.body.password === 'test' ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    console.log('login succesful')
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    //window.location.replace('http://localhost:3000/login.html')
    res.redirect( '/login.html' )
    console.log('login succesful')
  }else{
    console.log('incorrect password')
    // password incorrect, redirect back to login page
    res.sendFile( __dirname + '/public/index.html' )
  }
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.sendFile( __dirname + '/public/index.html' )
})

//*/
//cookie stuff end


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@clusteraj.9ts6s0b.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient( uri )
let collection = null

async function run() {
  await client.connect()
  collection = await client.db("Mydata").collection("Mydata")


}
run()


app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
})

const path = require('path');

app.post('/submit', async (req, res) => {
    const result = await collection.insertOne( req.body )
    res.json( result )
});

app.get("/get-list", async (req, res) => {
    const docs = await collection.find({}).toArray()
    res.json( docs )    
})

app.post( '/delete-row/:id', async (req,res) => {
    const result = await collection.deleteOne({ 
    id: req.params.id
    })
    const id = req.params.id;
    res.json( result )
})

app.post( '/edit-row/:id', async (req,res) => {
    console.log(req.body.task)
    console.log(req.body.date)
    const result = await collection.updateOne(
    {id: req.params.id},
    { $set: 
        {
            task: req.body.task,
            date: req.body.date
     }},
    )
    res.json( result )
  })

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening at ${port}`);
});

