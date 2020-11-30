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
	publish_country: String,
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
			type: String,
			required: true,
		},
		notAccurate: Boolean,
		note: String,
	}],
	isbn: String,
	edition_order: String,
	edition: String,
	action_name: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	volume_content: String,
	publishing_year: [{
		from: Number,
		to: Number,
		note: String,
		periodicity: String,
	}],
	issn: String,
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
	corporation_name: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	location: [{
		access_conditions: String,
		acess_note: String,
		institution: String,
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
	described_object_citation: [String],
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
	format: String,
	processing_level: String,
	archival_aids: [{
		type: mongoose.Types.ObjectId,
		ref: "metadata",
	}],
	source_citation: String,
	multiple_placement: String,
	multiple_placement_url: String,
	topic: {
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
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
		ref: "keywordIndex",
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