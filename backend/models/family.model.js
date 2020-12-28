const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: String,
	name_other_part: [String],

	public_note: [String],
	nonpublic_note: [String],

	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	record_sources: [String],
	editor_note: [String],
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('familyIndex', schema, 'familyIndex')