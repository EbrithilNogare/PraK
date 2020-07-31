const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],
})

module.exports = mongoose.model('familyIndex', recordSchema)