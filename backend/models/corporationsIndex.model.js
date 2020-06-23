const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
	other_source:[{
		name: String,
		id: String,
		identificator: String,
	}],

	name:{
		type: String,
		required: true,
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
	characteristic: String,
	history: String,
	function: String,
	constitutive_standards: [String],
	scope_standards: [String],

	coordinates: String,

	parent_corporation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
	}],
	part_of: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
	}],
	precedent_corporation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
	}],
	related_country: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],

	founder: {
		type: mongoose.Types.ObjectId,
		ref: "peopleIndex",
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
		ref: "peopleIndex",
	},
	cleavage_document: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	cleavage_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	chronological_specification: String,

	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "peopleIndex",
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
	chronological_specification: String,

	owner_change: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
	}],
	place_change: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	organisation_inclusion: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
	}],
	change_parent_organisation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationsIndex",
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
			ref: "peopleIndex",
		},
		awarder_corporation: {
			type: mongoose.Types.ObjectId,
			ref: "corporationsIndex",
		},		
	}],

	categorization: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
	}],
	category: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
	}],
	domain_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	geographical_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
	}],
	characteristic: [{
		type: mongoose.Types.ObjectId,
		ref: "",
	}],
	logo: [String],
	mark: [String],
	flag: [String],

	notes: [String],

	record_sources:{
		type: [String],
		required: true,
	},
})

module.exports = mongoose.model('corporationsIndex', recordSchema)