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

	other_name_form: [String],
		
	main_part:String,
	other_part:[String],
	numeric_tag:String,
	cast:[String],
	tone:String,
	arrangement:[String],
	name_part:[String],
	
	general_complement:String,
	geographical_complement:String,
	chronological_complement:String,
	author:[String],
	language:[String],
	source:[String],
			
	brief_characteristic: String,
	description:{
		type: String,
		required: true,
	},
	geographical_description:String,
	
	history:String,
	purpose:[String],

	coordinates:String,
	
	hierarchical_relations:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	associative_relations:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	locality:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	related_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	related_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	related_event:[{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	}],
	related_location:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	owner_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	owner_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	related_document:[{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	}],
	
	founding_person:{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	founding_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	first_mention_place:{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	first_mention_subject:{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	first_realization_event:{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	first_realization_subject:{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	chronological_specification_beginning:String,
	
	cancellation_person:{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	},
	cancellation_corporation:{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	},
	last_mention_place:{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	},
	last_mention_subject:{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},
	last_realization_event:{
		type: mongoose.Types.ObjectId,
		ref: "subjectIndex",
	},
	last_realization_subject:{
		type: mongoose.Types.ObjectId,
		ref: "creationIndex",
	},	
	chronological_specification_end:String,
	
	document_change_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	document_change_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	ownership_change_person:[{
		type: mongoose.Types.ObjectId,
		ref: "personIndex",
	}],
	ownership_change_corporation:[{
		type: mongoose.Types.ObjectId,
		ref: "corporationIndex",
	}],
	location_change:[{
		type: mongoose.Types.ObjectId,
		ref: "geographicIndex",
	}],
	
	category:[{
		type: mongoose.Types.ObjectId,
		ref: "KeywordIndex",
		required: true,
	}],
	
	notes:[String],

	record_sources:[String],
})

module.exports = mongoose.model('creationIndex', schema, 'creationIndex')