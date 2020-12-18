const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{
		type: [String],
		required: true,
	},
	surname:{
		type: [String],
		required: true,
	},
	born_year: {
		year: Number,
		notKnown: Boolean,
	},
	death_year: {
		year: Number,
		notKnown: Boolean,
	},
	initials: [String],
	general_complement: [String],
	roman_numerals: [String],
	geographical_complement: [String],

	original_name: [String],
	acronym: [String],
	cipher: [String],
	religious_name: [String],
	marriage_name: [String],
	historical_name: [String],
	straight_order: String,
	other_name_form: String,
	pseudonym: String,

	titles:[{
		title: String,
		date: String,
	}],

	bibliographical_note:{
		type: String,
	},
	cv: String,
	domain_branch:{
		type: [String],
	},
	gender:{
		type: String,
	},

	country_membership: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	born_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	death_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	related_country: {
		type: [mongoose.Types.ObjectId],
		ref: "geographicIndex",
	},

	language_country:{
		type: [String],
	},

	parents: [{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	siblings: [{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	family: [{
		type: mongoose.Types.ObjectId,
		ref: "familyIndex",
	}],
	membreship: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	employment: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	affiliation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	important_subject: [{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	important_event: [{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	marriage_start: [String],
	marriage_end: [String],
	study: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],

	arm: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	photo: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],

	notes: [String],
	
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	record_sources:{
		type: [String],
	},

	editor_note: [String],
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('personIndex', schema, 'personIndex')