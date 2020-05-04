const router = require('express').Router()
const User = require('../models/user.model')
const randomstring = require("randomstring")
const mongoose = require("mongoose")
const md5 = require('md5')

router.route('/:id').get((req, res) => {
	const id = req.params.id
	if(id === undefined)
		res.status(400).json({ message: "missing id" })

	User.findOne({"session.id": id})
		.exec()
		.then(result => {
			if(result === null)
				res.status(200).json({
					status: "NOT_LOGGED_IN",
				})


			if(result.session.expiration > new Date())
				res.status(200).json({
					status: "LOGGED_IN",
					userID: result._id,
				})
			else
				res.status(200).json({
					status: "SESSION_EXPIRED",
				})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "something wrong", details: err})
		})
})

router.route('/').post((req, res) => {	
	const email = req.body.email
	if (email === undefined)
		res.status(400).json({ message: "missing email" })
		
	const password = req.body.password
	if(password === undefined)
		res.status(400).json({ message: "missing password" })

	const newSessionID = randomstring.generate(32)

	User.findOne({email: email})
		.exec()
		.then(result => {
			if(result === null)
				res.status(200).json({
					status: "NOT_LOGGED_IN",
					message: "email not found",
				})

			if(md5(password + result.password.salt) !== result.password.hashed)
				res.status(200).json({
					status: "NOT_LOGGED_IN",
					message: "wrong password",
				})
			
			let newSessionExpiration = new Date()
			newSessionExpiration.setTime(newSessionExpiration.getTime() + 12*60*60*1000)

			const filter = { email: email }
			const update = { 
				"session.id": newSessionID,
				"session.expiration": newSessionExpiration,
			}
			return User.findOneAndUpdate(filter, update)				
		})
		.then(result => {
			res.status(200).json({
				status: "LOGGED_IN",
				sessionID: newSessionID,
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({message: "something wrong", details: err})
		})
})


module.exports = router