const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],
	
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
		ref: "KeywordIndex",
	}],
	subordinate:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	associative:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
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
		ref: "KeywordIndex",
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
		ref: "KeywordIndex",
	},
	chronological_specification_cancellation: String,

	category:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	domain:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	idc:[String],

	notes:[String],

	record_sources:[String],
})

module.exports = mongoose.model('KeywordIndex', schema, 'KeywordIndex')