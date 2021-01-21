const router = require('express').Router()
const Model = require('../models/pages.model')
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)
const auth = require('../auth.js')

router.route('/:pageName').get((req, res) => {
	const pageName = req.params.pageName
	if(pageName === undefined)
		res.status(400).json({ message: "missing pageName" })

	Model.findOne({ pageName })
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

router.route('/cs/:pageName').get((req, res) => {
	const pageName = req.params.pageName
	if(pageName === undefined)
		res.status(400).json({ message: "missing pageName" })

	Model.findOne({pageName}, "cs")
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

router.route('/en/:pageName').get((req, res) => {
	const pageName = req.params.pageName
	if(pageName === undefined)
		res.status(400).json({ message: "missing pageName" })

	Model.findOne({pageName}, "en")
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

	Model.find(body, "pageName lastEdited")
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
	const newModel = new Model({...req.body, lastEdited: new Date()})

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

router.route('/:pageName').patch(auth("cms"), (req, res) => {
	const pageName = req.params.pageName
	if(pageName === undefined)
		res.status(400).json({ message: "missing pageName" })

	Model.findOneAndUpdate({ pageName },{...req.body, lastEdited: new Date()},(err, result)=>{
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

router.route('/:pageName').delete(auth("execute"), (req, res) => {
	const pageName = req.params.pageName
	if(pageName === undefined)
		res.status(400).json({ message: "missing pageName" })

	Model.findOneAndDelete({pageName},(err, result)=>{
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