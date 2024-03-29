const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
	},
	surname:{
		type: String,
		required: true,
	},
	born_year: {
		year: Number,
		notKnown: Boolean,
	},
	born_date:  {
		date: String,
		notKnown: Boolean,
	},
	born_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	death_year: {
		year: Number,
		notKnown: Boolean,
	},
	death_date: {
		date: String,
		notKnown: Boolean,
	},
	death_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	initials: String,
	roman_numerals: String,
	general_complement: {
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	},
	geographical_complement: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	chronological_complement: String,


	variant: [{
		variant_type: String,
		variant_value: String,	
		general_complement: {
			type: mongoose.Types.ObjectId,
			ref: "keywordIndex",
		},
		geographical_complement: {
			type: mongoose.Types.ObjectId,
			ref: "geographicIndex",
		},
		chronological_complement: String,
	}],

	titles:[{
		title: String,
		date: String,
	}],
	
	gender: String,

	bibliographical_note: String,

	cv: String,
	
	domain_branch: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	related_country: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],

	language_country: [String],


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
	important_creation: [{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	important_event: [{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	marriage: [{
		marriage_start: String,
		marriage_end: String,
	}],
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
	attachment: [{
		url: String,
		description: String,
	}],
})

module.exports = mongoose.model('personIndex', schema, 'personIndex')