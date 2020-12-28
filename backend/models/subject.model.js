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
	event_order: String,

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

	brief_characteristic: [String],
	history: [String],

	sup_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	sub_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	related_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	related_subject:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	related_place:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	venue:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	organizator_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	organizator_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],

	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	founding_document: String,
	founding_chronological_specification: String,
	first_mention_subject: String,

	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	last_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	cancellation_document: String,
	cancellation_chronological_specification: String,
	last_mention_subject: String,

	category:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	characteristic:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	public_note: [String],
	nonpublic_note: [String],

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

module.exports = mongoose.model('subjectIndex', schema, 'subjectIndex')