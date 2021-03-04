const router = require('express').Router()
const Model = require('../models/pages.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)
const auth = require('../auth.js')

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
			res.status(500).json({
				message: "something went wrong",
				details: err,
			})
		})
})

router.route('/:id/:language').get((req, res) => {
	const id = req.params.id
	const language = req.params.language

	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findById(id, language)
		.exec()
		.then(result => {
			res.set('Cache-control', 'public, max-age=3600')
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json({
				message: "something went wrong",
				details: err,
			})
		})
})

router.route('/').post((req, res) => {
	const {_limit, ...body} = req.body

	Model.find(body)
		.limit(_limit || 5)
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json({
				message: "something went wrong",
				details: err,
			})
		})
})

router.route('/').put(auth("cms"), (req, res) => {
	const lastAuthor = req.cookies.user
	const newModel = new Model({...req.body, lastAuthor, lastEdited: new Date()})

	newModel.save()
		.then(result => {
			res.status(201).json({})
		})
		.catch(err => {
			res.status(500).json({
				message: "something went wrong",
				details: err,
			})
		})
})

router.route('/:id').patch(auth("cms"), (req, res) => {
	const lastAuthor = req.cookies.user
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	Model.findByIdAndUpdate(id,{...req.body, lastAuthor, lastEdited: new Date()},(err, result)=>{
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

router.route('/:id').delete(auth("cms"), (req, res) => {
	const pageName = req.params.pageName
	if(pageName === undefined){
		res.status(400).json({ message: "missing pageName" })
		return	
	}

	Model.findByIdAndDelete({pageName},(err, result)=>{
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