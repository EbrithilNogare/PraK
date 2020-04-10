const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DBUrl, {useNewUrlParser: true, useUnifiedTopology: true})	

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);






app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});