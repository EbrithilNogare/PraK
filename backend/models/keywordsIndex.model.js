const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],
	name: {
		type: String,
		required: true,
	},

	synonyms:[String],
	inverted_wordorder_terms:[String],
	spelling_variants:[String],
	foreign_language_descriptors:[String],
	form_descriptors:[String],

	main_part:String,
	other_part:[String],

	general_complement:String,
	clarification:String,

	definition:String,
	manual:String,
	history:String,

	hierarchical_relations:[String],
	associative_relations:[String],

	founding_person:{
		type: mongoose.Types.ObjectId,
		ref: "peopleIndex",
	},
	founding_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
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
		ref: "keywordsIndex",
	}],
	chronological_specification:String,


	cancellation_person:{
		type: mongoose.Types.ObjectId,
		ref: "peopleIndex",
	},
	cancellation_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
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
		ref: "keywordsIndex",
	},
	cancellation_specification:String,

	category:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
		required: true,
	}],
	domain:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
	}],
	idc:[String],

	notes:[String],

	record_sources:[String],
})

module.exports = mongoose.model('keywordsIndex', recordSchema)