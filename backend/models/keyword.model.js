const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: {
		type: String,
		required: true,
		unique: true,
	},
	name_other_part: String,

	synonyms:[String],
	inverted_wordorder_terms:[String],
	spelling_variants:[String],
	foreign_language_descriptors:[String],
	form_descriptors:[String],
	other_name_form:[String],

	general_complement: String,
	clarification: String,

	definition: String,
	manual: String,
	history: String,
	electronical_location:[String],

	superordinate:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	subordinate:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	associative:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	founding_person:{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_subject:{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	founding_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	founding_keyword:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	chronological_specification_beginning: String,


	cancellation_person:{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	cancellation_subject:{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	cancellation_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	cancellation_keyword:{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	},
	chronological_specification_cancellation: String,

	category:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	domain:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	idc:[String],

	notes:[String],

	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	record_sources:[String],

	editor_note: [String],
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('keywordIndex', schema, 'keywordIndex')