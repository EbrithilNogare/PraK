const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DBUrl, {useNewUrlParser: true, useUnifiedTopology: true})	


// routes

app.get('/documentation', function(req, res) {
    res.sendFile(__dirname+'/API documentation.html');
});

const usersRouter = require('./routes/user');
app.use('/user', usersRouter);

const loginRouter = require('./routes/auth');
app.use('/auth', loginRouter);

const libraryRouter = require('./routes/metadata');
app.use('/metadata', libraryRouter);







app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});
