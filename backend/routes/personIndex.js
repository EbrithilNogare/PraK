const router = require('express').Router()
const Model = require('../models/person.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id)
		.populate("born_place", "name_main_part")
		.populate("death_place", "name_main_part")
		.populate("	general_complement", "name_main_part")
		.populate("	geographical_complement", "name_main_part")
		.populate("related_country", "name_main_part")
		.populate("parents", ['name', 'surname'])
		.populate("siblings", ['name', 'surname'])
		//.populate("family", "familyIndex")
		.populate("membreship", "name_main_part")
		.populate("employment", "name_main_part")
		.populate("affiliation", "name_main_part")
		.populate("important_subject", "name_main_part")
		.populate("important_event", "name_main_part")
		.populate("study", "name_main_part")
		.populate("arm", "name")
		.populate("photo", "name")
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json("something went wrong")
		})
})

router.route('/').post((req, res) => {
	// support for regexp search
	for(let key of ["name", "surname"])
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
		.limit(_limit || 5)
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