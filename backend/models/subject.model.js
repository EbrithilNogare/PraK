const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name_main_part: {
		type: String,
		required: true,
		unique: true,
	},
	name_other_part: String,

	acronym: [String],
	other_name_form: [String],

	general_complement: String,
	geographical_complement: String,
	chronological_complement: String,
	event_order: String,

	description:{
		type: String,
	},

	aggregate_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	sub_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],

	related_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	related_subject:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	related_place:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	venue:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	organizator_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	organizator_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],

	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	founding_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	first_mention: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	founding_chronological_specification: String,


	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	last_mention_event: {
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	cancellation_place: {
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	last_mention: {
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	cancellation_chronological_specification: String,

	category:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],
	topic:[{
		type: mongoose.Types.ObjectId,
		ref: "keywordIndex",
	}],

	notes:[String],

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

module.exports = mongoose.model('subjectIndex', schema, 'subjectIndex')