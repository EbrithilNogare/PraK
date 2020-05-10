const router = require('express').Router()
const Record = require('../models/record.model')
const mongoose = require("mongoose")


router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Record.find({_id:id})
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json("something went wrong")
		})
})

router.route('/').put((req, res) => {
	if(req.body.name === undefined)
		res.status(400).json({ message: "missing Name" })

	const newRecord = new Record({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		submitter: req.body.submitter,
	})

	const unrequiredProps = [
		"author",
		"other_authors",
		"other_names",
		"language",
		"publish_country",
		"publish_place",
		"publisher",
		"publishing_date",
		"isbn",
		"edition_order",
		"edition",
		"action_name",
		"volume_content",
		"publishing_year",
		"issn",
		"source_document_name",
		"year",
		"volume",
		"number",
		"date",
		"corporation_name",
		"location",
		"digitized_document_url",
		"external_source",
		"attachment",
		"source_citation",
		"previous_name",
		"following_name",
		"form",
		"range",
		"dimension",
		"map_scale",
		"format",
		"processing_level",
		"archival_aids",
		"topic",
		"corporation_content_specification",
		"chronological_content_specification",
		"geographical_content_specification",
		"keywords",
		"description",
		"general_note",
		"editor_note",
	]
	
	for(const prop of unrequiredProps)
		if(req.body[prop] !== undefined) 
			newRecord[prop] = req.body[prop]


	newRecord.save()
		.then(result => {
			res.status(200).json({
				id: newRecord._id,
			 })
		})
		.catch(err => {
			res.status(500).json({
				message: "something went wrong",
				details: err,
			})
		})
})



module.exports = router