const router = require('express').Router()
const Model = require('../models/metadata.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id)
		.populate("author.id", ['name', 'surname'])
		.populate("other_authors.id", ['name', 'surname'])
		.populate("publish_place", "name_other_part")
		.populate("publisher", "name_other_part")
		.populate("action_name", "name_other_part")
		.populate("volume_content", "name_other_part")
		.populate("source_document_name", "name_other_part")
		.populate("corporation_name", "name_other_part")
		.populate("location.institution", "name_other_part")
		.populate("previous_name", "name_other_part")
		.populate("following_name", "name_other_part")
		.populate("format", "name_other_part")
		//.populate("topic", "name_other_part") // todo fix dynamic ref populate
		.populate("corporation_content_specification", "name_other_part")
		.populate("geographical_content_specification", "name_other_part")
		.populate("keywords", "name_other_part")
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json("something went wrong")
		})
})

router.route('/').post((req, res) => {
	if(Object.keys(req.body).length === 0)
		res.status(400).json({ message: "missing body" })
		
	// support for regexp search
	for(let key of ["name"])
	if(
		req.body[key] &&
		typeof req.body[key] === "string" &&
		req.body[key].length > 1 &&
		req.body[key][0] == "/" &&
		req.body[key].slice(-1) == "/"
	)
		req.body[key] = {$regex : req.body[key].substring(1, req.body[key].length - 1), '$options' : 'i'}
	
	Model.find(req.body)
		.limit(5)
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
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
})

module.exports = router