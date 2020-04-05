const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());


const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
	useNewUrlParser: true
});
client.connect(err => {
	const collection = client.db("test").collection("devices");

	client.close();
});

client.close();

app.listen(PORT, function () {
	console.log("Server is running on Port: " + PORT);
});