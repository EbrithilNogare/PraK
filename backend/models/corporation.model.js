const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: {
		type: String,
		required: true,
		unique: true,
	},
	name_other_part: [String],
	jurisdiction: String,
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
	historical_name: [{
		historical_name: String,	
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
	following_name: [{
		following_name: String,	
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
	founding_document: String,
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	founding_chronological_specification: String,
	registration_subject: String,
	registration_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	registration_chronological_specification: String,
	cleavage_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cleavage_document: String,
	cleavage_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	cleavage_chronological_specification: String,

	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_document: String,
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	cancellation_chronological_specification: String,
	delete_from_evidence_subject: String,
	delete_from_evidence_event: {
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	cancellation_chronological_specification : String,

	category: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	domain_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	geographical_scope: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
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

	public_note: [String],
	nonpublic_note: [String],

	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	record_sources: [String],
	editor_note: [String],
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('corporationIndex', schema, 'corporationIndex')