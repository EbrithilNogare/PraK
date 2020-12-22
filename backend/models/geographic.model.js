const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: {
		type: String,
		required: true,
		unique: true,
	},
	name_other_part: [String],
	general_complement: String,
	geographical_complement: String,
	chronological_complement: String,

	other_language_name: [String],
	acronym: [String],
	historical_name: [String],
	other_name_form: [String],

	brief_characteristic: String,
	description: String,
	history: String,
	electronical_location: [String],

	coordinates: [String],

	partner_object: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	owner: [{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	part_of: [{
		corporation_name: [{
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		}],
		corporation_owner: [{
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
		}],
	}],
	related_person: [{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	related_subject: [{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	related_event: [{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	related_corporation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	superordinate: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	subordinate: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	
	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_document: String,
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	first_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	first_mention_subject: String,
	first_mention_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
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
	cancellation_document: String,
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	last_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	last_mention_subject: String,
	last_mention_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	owner_change: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	cancellation_chronological_specification: String,
	historical_milestones: [String],

	
	country: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	region: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	district: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	municipality: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	municipality_part: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},


	category:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	characteristic:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	
	logo:[{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	mark:[{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	flag:[{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	arm:[{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
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

module.exports = mongoose.model('geographicIndex', schema, 'geographicIndex')