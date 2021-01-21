const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	pageName: {
		type: String,
		required: true,
	},
	cs: {
		type: String,
		default: "",
	},
	en: {
		type: String,
		default: "",
	},
	lastEdited: {
		type: Date,
		default: Date.now,
	},
	removable: {
		type: Boolean,
		default: true,
	},
})

module.exports = mongoose.model('pages', schema, 'pages')