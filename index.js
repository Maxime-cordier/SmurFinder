const process = require('process');
const express = require('express');
let mongodb = require('mongodb');
const path = require('path');

const app = express();
// Importation of hit counter environment parameters
const port = 'HIT_COUNTER_PORT' in process.env ? process.env.HIT_COUNTER_PORT : 3000
const hostname = 'HOSTNAME' in process.env ? process.env.HOSTNAME : 'localhost'
// Random number and ID generation 
const randNumber = Math.floor(Math.random() * 1000)
const serverID = `${randNumber}@${hostname}:${port}`

// Importation of mongodb environment parameters
const mongoHost = 'MONGO_HOST' in process.env ? process.env.MONGO_HOST : "localhost"
const mongoPort = 'MONGO_PORT' in process.env ? process.env.MONGO_PORT : 27017
const mongoUser = 'MONGO_USER' in process.env ? process.env.MONGO_USER : "admin"
const mongoPassword = 'MONGO_PASSWORD' in process.env ? process.env.MONGO_PASSWORD : "pass123"
const mongoConnection = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;
// mongodb connection init
const mongClient = new mongodb.MongoClient(mongoConnection);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/Home', async (req, res) => {
    /*// Connection to the mongodb service
	await mongClient.connect()
	// Creation of a "hitcounter_db" database
    let database = mongClient.db("hitcounter_db")
	// Creation of a "hits" collection
    let hits = database.collection('hits')
	// At each request we inset a new value to the hits collection
    await hits.insertOne({hit: "hello"})
    let truc = await hits.countDocuments() 
    console.log(truc)*/
	res.sendFile(path.join(__dirname, 'public', 'main.html'));
})

app.listen(port, () => {
	console.log(`HitCounter app listening on port ${port}`)
    console.log(`MongoDB connection string: ${mongoConnection}`)
}) 
