const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: {
		type: String,
		required: true,
		unique: true,
	},
	name_other_part: [String],
	general_complement: {
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	},
	
	variant: [{
		variant_type: String,
		variant_value: String,	
		chronological_complement: String,
	}],

	definition: String,
	manual: String,
	history: String,
	electronical_location: String,

	superordinate: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	subordinate: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	associative: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_subject: String,
	founding_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	founding_keyword: {
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	},
	founding_chronological_specification: String,


	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	cancellation_subject: String,
	cancellation_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	cancellation_keyword: {
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	},
	cancellation_chronological_specification: String,

	category: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	domain: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	idc: [String],

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

module.exports = mongoose.model('keywordIndex', schema, 'keywordIndex')