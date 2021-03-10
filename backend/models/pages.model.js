const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	pageName: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		default: "cz",
	},
	description: String,
	content: {
		type: String,
		default: "",
	},
	category: {
		type: String,
		default: "",
	},
	edits: [{
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

module.exports = mongoose.model('pages', schema, 'pages')