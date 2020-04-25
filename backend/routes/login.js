const router = require('express').Router()
const User = require('../models/user.model')
const randomstring = require("randomstring")
const mongoose = require("mongoose")
const md5 = require('md5')

router.route('/').post((req, res) => {
	const response = {
		
	}

	console.log(req.body.username)
	res.json(response)


	user.save()
		.then(result => {
			console.log(result)
			res.json(response)
		})
		.catch(err => {
			console.log(err)
			response.info.status = "error"
			response.info.message = err
			res.status(500).json(response)
			return
		})
})


module.exports = router