const router = require('express').Router()
const Model = require('../models/geographic.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id)
		.populate("partner_object", "name_other_part")
		.populate("owner", ['name', 'surname'])
		.populate("part_of.corporation_name", "name_other_part")
		.populate("part_of.corporation_owner", ['name', 'surname'])
		.populate("part_of.related_person", ['name', 'surname'])
		.populate("part_of.related_subject", "name_other_part")
		.populate("part_of.related_event", "name_other_part")
		.populate("part_of.related_corporation", "name_other_part")
		.populate("superordinate", "name_other_part")
		.populate("subordinate", "name_other_part")
		.populate("country", "name_other_part")
		.populate("region", "name_other_part")
		.populate("district", "name_other_part")
		.populate("municipality", "name_other_part")
		.populate("municipality_part", "name_other_part")
		.populate("founding_person", ['name', 'surname'])
		.populate("founding_corporation", "name_other_part")
		.populate("founding_document", "name_other_part")
		.populate("founding_place", "name_other_part")
		.populate("first_mention_event", "name_other_part")
		.populate("first_mention_subject", "name_other_part")
		.populate("first_mention_place", "name_other_part")
		.populate("cancellation_person", ['name', 'surname'])
		.populate("cancellation_corporation", "name_other_part")
		.populate("cancellation_document", "name_other_part")
		.populate("cancellation_place", "name_other_part")
		.populate("last_mention_event", "name_other_part")
		.populate("last_mention_subject", "name_other_part")
		.populate("last_mention_place", "name_other_part")
		.populate("owner_change", "name_other_part")
		.populate("awards.award", "name_other_part")
		.populate("awards.event_award", "name_other_part")
		.populate("awards.awarder_person", ['name', 'surname'])
		.populate("awards.awarder_corporation", "name_other_part")
		.populate("category", "name_other_part")
		.populate("characteristic", "name_other_part")
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json("something went wrong")
		})
})

router.route('/').post((req, res) => {
	if(Object.keys(req.body).length === 0)
		res.status(400).json({ message: "missing body" })

	// support for regexp search
	for(let key of ["name_main_part"])
	if(
		req.body[key] &&
		typeof req.body[key] === "string" &&
		req.body[key].length > 1 &&
		req.body[key][0] == "/" &&
		req.body[key].slice(-1) == "/"
	)
		req.body[key] = {$regex : req.body[key].substring(1, req.body[key].length - 1), '$options' : 'i'}

	// extract special attributes
	const {_limit, ...body} = req.body

	Model.find(body)
		.limit(_limit | 5)
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json("something went wrong")
		})
})

router.route('/').put((req, res) => {
	const newModel = new Model({
		_id: mongoose.Types.ObjectId(),
		...req.body,
	})

	newModel.save()
		.then(result => {
			res.status(201).json({
				id: newModel._id,
			 })
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({
				message: "something went wrong",
				details: err,
			})
		})
})

router.route('/:id').patch((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findByIdAndUpdate(id,req.body,(err, result)=>{
		if(err){
            res.status(500).json({
				message: err.message,
   				details: err
			})
        }
        else{
            res.status(200).json({})
        }
	})
	.catch(err => {
		console.error(err)
		res.status(500).json("something went wrong")
	})
})

router.route('/:id').delete((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findByIdAndDelete(id,(err, result)=>{
		if(err){
            res.status(500).json({
				message: err.message,
   				details: err
			})
        }
        else{
            res.status(200).json({})
        }
	})
	.catch(err => {
		console.error(err)
		res.status(500).json("something went wrong")
	})
})

module.exports = router