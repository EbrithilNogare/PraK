const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	title: {
		cz: String,
		en: String,
		de: String,
	},
	image: String,
	text: {
		cz: String,
		en: String,
		de: String,
	},
	description: {
		cz: String,
		en: String,
		de: String,
	},
	edits:[{
		date: {
			type: Date,
			default: Date.now,
		},
		editor: {
			type: String,
			default: "Unknown",
		},
	}],
})

module.exports = mongoose.model('news', schema, 'news')