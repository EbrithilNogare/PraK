const router = require('express').Router()
const Model = require('../models/keyword.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)
const auth = require('../auth.js')

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id)
		.populate("general_complement", "name_main_part")
		.populate("other_language_name.general_complement", "name_main_part")
		.populate("synonyms.general_complement", "name_main_part")
		.populate("inverted_wordorder_terms.general_complement", "name_main_part")
		.populate("spelling_variants.general_complement", "name_main_part")
		.populate("foreign_language_descriptors.general_complement", "name_main_part")
		.populate("form_descriptors.general_complement", "name_main_part")
		.populate("other_name_form.general_complement", "name_main_part")
		.populate("superordinate", "name_main_part")
		.populate("subordinate", "name_main_part")
		.populate("associative", "name_main_part")
		.populate("founding_person", ['name', 'surname'])
		.populate("founding_corporation", "name_main_part")
		.populate("founding_event", "name_main_part")
		.populate("founding_keyword", "name_main_part")
		.populate("cancellation_person", ['name', 'surname'])
		.populate("cancellation_corporation", "name_main_part")
		.populate("cancellation_event", "name_main_part")
		.populate("cancellation_keyword", "name_main_part")
		.populate("category", "name_main_part")
		.populate("domain", "name_main_part")
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