const router = require('express').Router()
const Model = require('../models/subject.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id)
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json("something went wrong")
		})
})

router.route('/').get((req, res) => {
	if(Object.keys(req.body).length === 0)
		res.status(400).json({ message: "missing body" })
		
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

router.route('/').post((req, res) => {
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