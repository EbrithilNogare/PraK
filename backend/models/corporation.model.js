const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: {
		type: String,
		required: true,
		unique: true,
	},
	name_other_part: String,

	acronym: [String],
	historical_name: [String],
	other_name_form: [String],
	following_name: [String],

	general_complement: String,
	geographical_complement: String,
	chronological_complement: String,
	brief_characteristic: String,
	history: String,
	function: String,
	constitutive_standards: [String],
	scope_standards: [String],

	coordinates: [String],

	parent_corporation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	part_of: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	precedent_corporation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	related_country: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],

	founder: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_document: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	registration_subject: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	registration_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	cleavage_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cleavage_document: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	cleavage_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	chronological_specification_beginning: String,

	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_document: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	delete_from_evidence_subject: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	delete_from_evidence_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	chronological_specification_cancellation : String,

	category: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	domain_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	geographical_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	characteristic: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	logo: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	mark: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	flag: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],

	notes: [String],

	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	record_sources: {
		type: [String],
	},
	editor_note: [String],
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('corporationIndex', schema, 'corporationIndex')