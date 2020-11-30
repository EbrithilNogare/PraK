const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('familyIndex', schema, 'familyIndex')