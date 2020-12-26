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
	geographical_complement: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	chronological_complement: String,

	other_language_name: [{
		other_language_name: String,	
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
	other_name_form: [{
		other_name_form: String,	
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
	official_name: [{
		official_name: String,	
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
	former_name_form: [{
		former_name_form: String,	
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
	acronym: [{
		acronym: String,	
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

	brief_characteristic: String,
	description: String,
	geographical_description: String,
	history: String,
	purpose: String,

	coordinates: [String],

	superordinate_relations:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	subordinate_relations:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	associative_relations:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	locality:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	related_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	related_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	related_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	related_location:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	owner_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	owner_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	related_document:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],

	founding_person:{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	first_mention_place:{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	first_mention_subject: String,
	founding_chronological_specification: String,
	first_realization_event:{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	first_realization_subject: String,
	first_realization_chronological_specification: String,

	cancellation_person:{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	last_mention_place:{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	last_mention_subject: String,
	cancellation_chronological_specification: String,
	last_realization_event:{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	last_realization_subject: String,
	last_realization_chronological_specification: String,

	document_change_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	document_change_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	ownership_change_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	ownership_change_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	location_change:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	change_chronological_specification: [String],
	
	category:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	topic:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	characteristic:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	public_note:[String],
	nonpublic_note:[String],

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

module.exports = mongoose.model('creationIndex', schema, 'creationIndex')