const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {type: String, required: true, unique: true},
	password: {
		hashed: {type: String, required: true},
		salt: {type: String},
	},
	role: {type: String, required: true},
	session: {
		id: String,
		expiration: { type: Date, default: Date.now },
	},
	firstName: String,
	secondName: String,
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('users', userSchema)