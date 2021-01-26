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

	complement_change: [{
		complement_change_type: String,
		complement_change_value: String,	
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
		corporation_name: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		},
		corporation_owner: {
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
		},
	}],
	related_person: [{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	related_creation: [{
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
	superordinate: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	subordinate: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	
	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_person_chrono_spec: String,
	founding_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_corporation_chrono_spec: String,
	founding_document: String,
	founding_document_chrono_spec: String,
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	founding_place_chrono_spec: String,
	founding_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	founding_event_chrono_spec: String,
	first_mention_document: String,
	first_mention_document_chrono_spec: String,
	first_mention_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	first_mention_place_chrono_spec: String,

	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_person_chrono_spec: String,
	cancellation_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	cancellation_corporation_chrono_spec: String,
	cancellation_document: String,
	cancellation_document_chrono_spec: String,
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	cancellation_place_chrono_spec: String,
	last_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	last_mention_event_chrono_spec: String,
	last_mention_document: String,
	last_mention_document_chrono_spec: String,
	last_mention_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	last_mention_place_chrono_spec: String,
	owner_change: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	owner_change_chrono_spec: String,
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
	attachment: [{
		url: String,
		description: String,
	}],
})

module.exports = mongoose.model('geographicIndex', schema, 'geographicIndex')