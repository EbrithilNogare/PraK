const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());


const usersRouter = require('./routes/users');
app.use('/users', usersRouter);






app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});