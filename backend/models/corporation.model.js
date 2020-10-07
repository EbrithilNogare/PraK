const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	name: {
		type: String,
		required: true,
		unique: true,
	},

	acronym: [String],
	historical_name: [String],
	other_name_form: [String],
	following_name: [String],

	main_part: String,
	side_part: [String],

	general_complement: String,
	geographical_complement: String,
	chronological_complement: String,
	brief_characteristic: String,
	history: String,
	function: String,
	constitutive_standards: [String],
	scope_standards: [String],

	coordinates: String,

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
	founding_chronological_specification: String,

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
	cancellation_chronological_specification: String,

	owner_change: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	place_change: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	organisation_inclusion: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	change_parent_organisation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
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

	categorization: [{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	category: [{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	domain_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	geographical_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	characteristic: [{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	logo: [String],
	mark: [String],
	flag: [String],

	notes: [String],

	record_sources: {
		type: [String],
		required: true,
	},
})

module.exports = mongoose.model('corporationIndex', schema, 'corporationIndex')