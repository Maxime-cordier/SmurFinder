const process = require('process');
const express = require('express');
let mongodb = require('mongodb');
const path = require('path');

const app = express();
// Importation of hit counter environment parameters
const port = 'SMURFINDER_PORT' in process.env ? process.env.SMURFINDER_PORT : 3000

// Importation of mongodb environment parameters
const mongoHost = 'MONGO_HOST' in process.env ? process.env.MONGO_HOST : "192.168.1.3"
const mongoPort = 'MONGO_PORT' in process.env ? process.env.MONGO_PORT : 27017
const mongoUser = 'MONGO_USER' in process.env ? process.env.MONGO_USER : "admin"
const mongoPasswordport = 'MONGO_PASSWORD' in process.env ? process.env.MONGO_PASSWORD : "pass123"
const mongoConnection = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;
// mongodb connection init
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
		await smurfs.insertMany([
			{	id : 1,
				name : "Papa Smurf",
				age : 542,
				role : "Village leader",
				quote : "I'm the village leader, I'm always right.",
				image : "./images/papa_smurf.png"
			},
			{	id : 2,
				name : "Smurfette",
				age : 326,
				role : "Village lady",
				quote : "I'm the village lady, I'm always right.",
				image : "./images/smurfette.png"
			},
			{	id : 3,
				name : "Brainy Smurf",
				age : 326,
				role : "Scientist",
				quote : "I have a big brain !",
				image : "./images/brainy_smurf.png"
			},
			{	id : 4,
				name : "Grouchy Smurf",
				age : 326,
				role : "Grumpy",
				quote : "I'm always grumpy.",
				image : "./images/Grouchy Smurf.png"
			},
			{	id : 5,
				name : "Jokey Smurf",
				age : 326,
				role : "Joker",
				quote : "I'm always joker.",
				image : "./images/Jokey Smurf.png"
			}
			]
	)

	}
	
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/Smurf', async (req, res) => {

	addSmurfs(req,res)

	res.sendFile(path.join(__dirname, 'public', 'main.html'));	
})

app.get('/Home', async (req, res) => {
	// Connection to the mongodb service
	await mongClient.connect()
	// Creation of a "smurfinder_db" database
	let database = mongClient.db("smurfinder_db")
	// Creation of a "hits" collection
	let smurfs = database.collection('smurfs')

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
