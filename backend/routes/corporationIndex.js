const router = require('express').Router()
const Model = require('../models/corporation.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)
const auth = require('../auth.js')

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })
	
	Model.findById(id)
		.populate("general_complement", "name_main_part")
		.populate("geographical_complement", "name_main_part")
		.populate("variant.general_complement", "name_main_part")
		.populate("variant.geographical_complement", "name_main_part")
		.populate("parent_corporation", "name_main_part")
		.populate("part_of", "name_main_part")
		.populate("precedent_corporation", "name_main_part")
		.populate("related_country", "name_main_part")
		.populate("founder", ['name', 'surname'])
		.populate("founding_place", "name_main_part")
		.populate("registration_event", "name_main_part")
		.populate("cleavage_person", ['name', 'surname'])
		.populate("cleavage_place", "name_main_part")
		.populate("cancellation_person", ['name', 'surname'])
		.populate("cancellation_place", "name_main_part")
		.populate("delete_from_evidence_event", "name_main_part")
		.populate("category", "name_main_part")
		.populate("domain_scope", "name_main_part")
		.populate("geographical_scope", "name_main_part")
		.populate("characteristic", "name_main_part")
		.populate("logo", "name")
		.populate("mark", "name")
		.populate("flag", "name")
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
		.limit(_limit || 5)
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json("something went wrong")
		})
})

router.route('/').put(auth("write"), (req, res) => {
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

router.route('/:id').patch(auth("write"), (req, res) => {
	const id = req.params.id
	if(id === undefined){
		res.status(400).json({ message: "missing id" })
		return
	}

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

router.route('/:id').delete(auth("write"), (req, res) => {
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