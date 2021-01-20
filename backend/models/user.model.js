const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	salt: { type: String, required: true },
	role: { 
		read: { type: Boolean, default: false },
		write: { type: Boolean, default: false },
		execute: { type: Boolean, default: false },
		cms: { type: Boolean, default: false },
	 },
	sessionID: String,
	sessionExpiration: { type: Date, default: Date.now },
	firstName: String,
	secondName: String,
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('users', schema, 'users')