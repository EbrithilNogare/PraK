const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	pageName: {
		type: String,
		required: true,
	},
	cs: String,
	en: String,
	lastEdited: Date,
})

module.exports = mongoose.model('pages', schema, 'pages')