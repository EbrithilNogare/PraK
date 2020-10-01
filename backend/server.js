const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DBUrl)	


// routes

app.get('/documentation', function(req, res) {
    res.sendFile(__dirname+'/API documentation.html')
})


app.use('/user', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

app.use('/metadata', require('./routes/metadata'))

app.use('/corporationIndex', require('./routes/corporationIndex'))
app.use('/creationIndex', require('./routes/creationIndex'))
app.use('/familyIndex', require('./routes/familyIndex'))
app.use('/geographicIndex', require('./routes/geographicIndex'))
app.use('/keywordIndex', require('./routes/keywordIndex'))
app.use('/peopleIndex', require('./routes/peopleIndex'))
app.use('/subjectIndex', require('./routes/subjectIndex'))


app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`)
})
