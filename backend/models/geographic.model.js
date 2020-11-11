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

	acronym: [String],
	historical_name: [String],
	other_name_form: [String],

	general_complement: String,
	geographical_complement: String,
	chronological_complement: String,

	brief_characteristic: String,
	description: String,
	history: String,
	electronical_location: [String],

	coordinates: String,

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
	related_entity: [{
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
	}],
	superordinate: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	subordinate: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},	
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
	
	

	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_document: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	first_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	first_mention_subject: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	first_mention_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	chronological_specification_beginning: String,

	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	cancellation_document: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	last_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	last_mention_subject: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	last_mention_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	owner_change: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	chronological_specification_cancellation: String,
	historical_milestones: [String],

	awards: [{
		award: {
			type: mongoose.Types.ObjectId,
			ref: "creationIndex",
		},
		event_award: {
			type: mongoose.Types.ObjectId,
			ref: "subjectIndex",
		},
		awarder_person: {
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
		},
		awarder_corporation: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		},
	}],

	category:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
		required: true,
	}],
	characteristic:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	arm:[String],
	logo:[String],
	mark:[String],
	flag:[String],

	notes:[String],

	record_sources:[String],
})

module.exports = mongoose.model('geographicIndex', schema, 'geographicIndex')