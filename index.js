const smurfsData = require('./smurfs');
const process = require('process');
const express = require('express');
let mongodb = require('mongodb');
const path = require('path');

const app = express();

const port = 'SMURFINDER_PORT' in process.env ? process.env.SMURFINDER_PORT : 3008

const mongoHost = 'MONGO_HOST' in process.env ? process.env.MONGO_HOST : "localhost"
const mongoPort = 'MONGO_PORT' in process.env ? process.env.MONGO_PORT : 27017
const mongoUser = 'MONGO_USER' in process.env ? process.env.MONGO_USER : "admin"
const mongoPassword = 'MONGO_PASSWORD' in process.env ? process.env.MONGO_PASSWORD : "pass123"
const mongoConnection = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;

const mongClient = new mongodb.MongoClient(mongoConnection);

async function addSmurfs(req, res) {
	// Connection to the mongodb service
	await mongClient.connect()
	// Creation of a "smurfinder_db" database
	let database = mongClient.db("smurfinder_db")
	// Creation of a "hits" collection
	let smurfs = database.collection('smurfs')
	let smurfsCount = await smurfs.countDocuments()
	if (smurfsCount === 0){
		await smurfs.insertMany(smurfsData.list)

	}
	
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/Smurf', async (req, res) => {

	res.sendFile(path.join(__dirname, 'public', 'main.html'));	
})

app.get('/', async (req, res) => {

	addSmurfs(req,res)

	res.sendFile(path.join(__dirname, 'public', 'home.html'));

})

app.get('/SmurfList', async (req, res) => {
    // Connection to the mongodb service
    await mongClient.connect()
    // Access the "smurfinder_db" database
    let database = mongClient.db("smurfinder_db")
    // Access the "smurfs" collection
    let smurfs = database.collection('smurfs')

    // Retrieve the list of smurfs from MongoDB
    const smurfList = await smurfs.find().toArray();
    res.json(smurfList);
})


app.listen(port, () => {
	console.log(`HitCounter app listening on port ${port}`)
    console.log(`MongoDB connection string: ${mongoConnection}`)
}) 
