const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	other_source: [{
		name: String,
		id: String,
		identificator: String,
	}],

	name:{
		type: String,
		required: true,
		unique: true,
	},

	acronym: [String],
	other_name_form: [String],

	main_part: String,
	other_part: [String],

	general_complement: String,
	geographical_complement: String,
	chronological_complement: String,
	event_order: String,

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
		ref: "peopleIndex",
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
		ref: "peopleIndex",
	}],
	organizator_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	
	founding_person: {
		type: mongoose.Types.ObjectId,
		ref: "peopleIndex",
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


	cancellation_person: {
		type: mongoose.Types.ObjectId,
		ref: "peopleIndex",
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
	
	category:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],
	topic:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
	}],

	notes:[String],

	record_sources:[String],
})

module.exports = mongoose.model('subjectIndex', schema, 'subjectIndex')