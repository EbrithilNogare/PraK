const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	documentType: {
		type: Number,
		required: true,
	},
	author: {
		author_person: {
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
		},
		author_corporation: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		},
		author_role: String,
	},
	other_authors_person: [{
		id: {
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
			},
		role: String,
	}],
	other_authors_corporation: [{
		id: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
			},
		role: String,
	}],
	name: {
		type: String,
		unique: true,
		required: true,
	},
	author_responsibility: String,
	other_names: [String],
	language: [String],
	publish: [{	
		publish_country: String,
		publish_place: {
			type: mongoose.Types.ObjectId,
			ref: "geographicIndex",
		},
		publisher: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		}
	}],
	publishing_date: [{
		date: {
			type: String,
			required: true,
		},
		notAccurate: Boolean,
		note: String,
	}],
	isbn: [String],
	edition_order: [String],
	edition: [String],
	edition_number: [String],
	action_name: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	volume_content: [String],
	publishing_year: [{
		from: Number,
		to: Number,
		note: String,
		periodicity: String,
	}],
	issn: [String],
	source_document_name: {
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	},
	copies:{
		year: Number,
		volume: Number,
		number: Number,
		date: Date,
	},
	corporation: [{
		corporation_name: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		},
		access_conditions: String,
		acces_note: String,
	}],
	location: [{
		institution: String,
		fund: String,
		note: String,
	}],
	digitized_document_url: [String],
	external_source: [{
		name: {
			type: mongoose.Types.ObjectId,
			ref: "metadata",
		},
		url: String,
		url_leading_to_document: String,
	}],
	attachment: [{
		name: String,
		url: String,
	}],
	described_object_citation: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata"
	}],
	previous_name: {
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	},
	following_name: {
		type: mongoose.Types.ObjectId,
		ref: "metadata"
	},
	form: [[String]],
	range: String,
	dimension: String,
	map_scale: [String],
	format: String,
	processing_level: String,
	description_level: String,
	archival_aids: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	source_citation: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	multiple_placement_category: [{
		multiple_placement: {
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		},
		multiple_placement_url: String,
	}],
	topic: {
		topic_person:[{
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
		}],
		topic_corporation:[{
			type: mongoose.Types.ObjectId,
			ref: "corporationIndex",
		}],
		topic_place:[{
			type: mongoose.Types.ObjectId,
			ref: "geographicIndex",
		}],
		topic_event:[{
			type: mongoose.Types.ObjectId,
			ref: "subjectIndex",
		}],
		topic_creation:[{
			type: mongoose.Types.ObjectId,
			ref: "creationIndex",
		}],
		topic_keyword:[{
			type: mongoose.Types.ObjectId,
			ref: "keywordIndex",
		}],
		topic_family:[{
			type: mongoose.Types.ObjectId,
			ref: "familyIndex",
		}],
	},
	corporation_content_specification_person: [{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	corporation_content_specification_corporation: [{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	chronological_content_specification: [{
		begin: Number,
		end: Number,
		active: Boolean,
	}],
	geographical_content_specification: [{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	keywords: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	description: [String],
	general_note: [String],
	editor_note: [String],
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model("metadata", schema, "metadata")