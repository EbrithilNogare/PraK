const router = require('express').Router()
const Model = require('../models/user.model')
const randomstring = require("randomstring")
const md5 = require('md5')

router.route('/:sessionID').get((req, res) => {
	const sessionID = req.params.sessionID
	if(sessionID === undefined)
		res.status(400).json({ message: "missing sessionID" })

	Model.findOne({sessionID: sessionID})
		.exec()
		.then(result => {
			if(result === null)
				res.status(400).json({ message: "sessionID not found" })
			
			if(result.sessionExpiration < new Date())
				res.status(400).json({ message: "sessionID expired" })
			
			result.password = "******";
			result.sessionID = "******";
			res.status(200).json(result)
		})
		.catch(err => {
			if(res.statusCode < 400)
				res.status(500).json({message: "something went wrong", details: err})
	})
})

//login
router.route('/').patch((req, res) => {
	const email = req.body.email
	if (!email)
		res.status(400).json({ message: "missing email" })

	const password = req.body.password
	if(!password)
		res.status(400).json({ message: "missing password" })

	const newSessionID = randomstring.generate(32)

	Model.findOne({ email: email })
		.exec()
		.then(result => {
			if(result === null){
				res.status(400).json({ message: "email not found" })
				return
			}

			if(md5(password + result.salt) !== result.password){
				res.status(400).json({ message: "wrong password" })
				return
			}

			const newSessionExpiration = new Date(new Date().getTime() + 365*24*60*60*1000)  // now + year
			const filter = { email: email }
			const update = { 
				sessionID: newSessionID,
				sessionExpiration: newSessionExpiration,
			}
			
			Model.findOneAndUpdate(filter, update, { new: true }).then(result => {
				res.status(200).json({
					_id: result._id,
					email: result.email,
					role: result.role,
					firstName: result.firstName,
					secondName: result.secondName,
					sessionID: result.sessionID,
					sessionExpiration: result.sessionExpiration,
				})
			})
		})
		.catch(err => {
			if(res.statusCode < 400)
				res.status(500).json({ message: "something went wrong", details: err })
		})
})

// logout
router.route('/:sessionID').delete((req, res) => {
	const sessionID = req.params.sessionID
	if(sessionID === undefined)
		res.status(400).json({ message: "missing sessionID" })

	const filter = { sessionID }
	const newSessionExpiration = new Date(new Date().getTime() - 365*24*60*60*1000)  // now - year
	const update = { sessionExpiration: newSessionExpiration }
	Model.findOneAndUpdate(filter, update, { new: true })
		.exec()
		.then(result => {
			if(result === null){
				res.status(400).json({ message: "wrong sessionID" })
			}

			res.status(200).json({})
		})
		.catch(err => {
			if(res.statusCode < 400)
				res.status(500).json({message: "something went wrong", details: err})
		})
})

module.exports = router