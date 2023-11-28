const process = require('process')
const express = require('express')
let mongodb = require('mongodb');

const app = express()
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

app.get('/', async (req, res) => {
	// Connection to the mongodb service
	await mongClient.connect()
	// Creation of a "hitcounter_db" database
    let database = mongClient.db("hitcounter_db")
	// Creation of a "hits" collection
    let hits = database.collection('hits')
	// At each request we inset a new value to the hits collection
    await hits.insertOne({hit: serverID})
	// Return the current amount of requests
    let counter = await hits.countDocuments()

	res.send(`<h1>Welcome to HitCounter</h1><p>Random number : ${randNumber}</p><p>Hit Counter : ${counter}</p>`)
})

app.listen(port, () => {
	console.log(`HitCounter app listening on port ${port}`)
}) 
