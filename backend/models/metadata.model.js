const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	documentType: Number,
	author: {
		id: {
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
			},
		role: String,
	},
	other_authors: [{
		id: {
			type: mongoose.Types.ObjectId,
			ref: "personIndex",
			},
		role: String,
	}],
	name: {
		type: String,
		unique: true,
		required: true,
	},
	author_responsibility: [String],
	other_names: [String],
	language: [String],
	publish_country: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	publish_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	publisher: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	publishing_date: [{
		date: {
			type: Date,
			required: true,
		},
		note: String,
	}],
	isbn: String,
	edition_order: String,
	edition: String,
	action_name: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	volume_content: {
		type: mongoose.Types.ObjectId,
		refPath: "volume_contentModel"
	},
	volume_contentModel:{
		type: String,
		enum: ["corporationIndex", "geographicIndex"]
	},
	publishing_year: [{
		from: Number,
		to: Number,
		note: String,
		periodicity: String,
	}],
	issn: String,
	source_document_name: String,
	copies:{
		year: Number,
		volume: Number,
		number: Number,
		date: Date,
	},
	corporation_name: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	location: [{
		access_conditions: String,
		acess_note: String,
		institution: {
			type: mongoose.Types.ObjectId,
			ref: "geographicIndex",
		},
		fund: String,
		note: String,
	}],
	digitized_document_url: String,
	external_source: [{
		name: String,
		url: String,
		url_leading_to_document: String,
	}],
	attachment: [{
		name: String,
		url: String,
	}],
	source_object_citation: [String],
	previous_name: {
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	},
	following_name: {
		type: mongoose.Types.ObjectId,
		ref: "metadata"
	},
	form: String,
	range: String,
	dimension: String,
	map_scale: String,
	format: {
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	},
	processing_level: String,
	archival_aids: String,
	source_document_citation: String,
	multiple_placement: String,
	multiple_placement_url: String,
	topic: {
		type: mongoose.Types.ObjectId,
		ref: "topicModel",
	},
	topicModel: {
	  type: String,
	  enum: ['subjectIndex', 'creationIndex']
	},
	corporation_content_specification: {
		type: mongoose.Types.ObjectId,
		refPath: "corporation_content_specificationModel",
	},
	corporation_content_specificationModel: {
	  type: String,
	  enum: ['personIndex', 'corporationIndex']
	},
	chronological_content_specification: {
		begin: Number,
		end: Number,
	},
	geographical_content_specification: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	keywords: [{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	description: String,
	general_note: String,
	editor_note: String,
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model("metadata", schema, "metadata")