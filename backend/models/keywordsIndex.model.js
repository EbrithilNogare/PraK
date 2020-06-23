const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
	author: {
		type: mongoose.Types.ObjectId,
		ref: "nameIndexPersons",
	},
	other_authors: [{
		type: mongoose.Types.ObjectId,
		ref: "nameIndexPersons",
	}],
	name: {
		type: String,
		unique: true,
		required: true,
	},
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
		ref: "?????",
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
		ref: "?????",
	},
	volume_content: {
		type: mongoose.Types.ObjectId,
		ref: "?????",
	},
	publishing_year: [{
		from: Number,
		to: Number,
		note: String,
		periodicity: String,
	}],
	issn: String,
	source_document_name: String,
	year: Number,
	volume: Number,
	number: Number,
	date: Date,
	corporation_name: {
		type: mongoose.Types.ObjectId,
		ref: "nameIndexCorporations",
	},
	location: [{
		institution: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
		fund: String,
		access_conditions: String,
		acess_note: String,
		location_note: String,
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
	source_citation: [String],
	previous_name: {
		type: mongoose.Types.ObjectId,
		ref: "?????",
	},
	following_name: {
		type: mongoose.Types.ObjectId,
		ref: "?????",
	},
	form: String,
	range: String,
	dimension: String,
	map_scale: String,
	format: {
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
	},
	processing_level: String,
	archival_aids: String,
	multiple_placement: String,
	multiple_placement_url: String,
	topic: {
		type: mongoose.Types.ObjectId,
		ref: "?????",
	},
	corporation_content_specification: {
		type: mongoose.Types.ObjectId,
		ref: "nameIndexCorporations",
	},
	chronological_content_specification: String,
	geographical_content_specification: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	keywords: [{
		type: mongoose.Types.ObjectId,
		ref: "keywordsIndex",
	}],
	description: String,
	general_note: String,
	editor_note: String,
	submitter: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('metadata', recordSchema)