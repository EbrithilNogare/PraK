const router = require('express').Router()
const Model = require('../models/person.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)
const auth = require('../auth.js')

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id)
		.populate("born_place", "name_main_part")
		.populate("death_place", "name_main_part")
		.populate("general_complement", "name_main_part")
		.populate("geographical_complement", "name_main_part")
		.populate("other_language_name.general_complement", "name_main_part")
		.populate("other_language_name.geographical_complement", "name_main_part")
		.populate("original_name.general_complement", "name_main_part")
		.populate("original_name.geographical_complement", "name_main_part")
		.populate("acronym.general_complement", "name_main_part")
		.populate("acronym.geographical_complement", "name_main_part")
		.populate("cipher.general_complement", "name_main_part")
		.populate("cipher.geographical_complement", "name_main_part")
		.populate("religious_name.general_complement", "name_main_part")
		.populate("religious_name.geographical_complement", "name_main_part")
		.populate("marriage_name.general_complement", "name_main_part")
		.populate("marriage_name.geographical_complement", "name_main_part")
		.populate("historical_name.general_complement", "name_main_part")
		.populate("historical_name.geographical_complement", "name_main_part")
		.populate("straight_order.general_complement", "name_main_part")
		.populate("straight_order.geographical_complement", "name_main_part")
		.populate("other_name_form.general_complement", "name_main_part")
		.populate("other_name_form.geographical_complement", "name_main_part")
		.populate("pseudonym.general_complement", "name_main_part")
		.populate("pseudonym.geographical_complement", "name_main_part")
		.populate("domain_branch", "name_main_part")
		.populate("related_country", "name_main_part")
		.populate("parents", ['name', 'surname'])
		.populate("siblings", ['name', 'surname'])
		//.populate("family", familyIndex)
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
	let {_limit, _nameAndSurname, ...body} = req.body

		if(_nameAndSurname){
			body = {
				$or: [
				{ 'name': { $regex: _nameAndSurname, '$options' : 'i' } },
				{ 'surname': { $regex: _nameAndSurname, '$options' : 'i' } }
			  ]}
		}

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