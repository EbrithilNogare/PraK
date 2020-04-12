const router = require('express').Router()
const User = require('../models/user.model')
const randomstring = require("randomstring")
const mongoose = require("mongoose")
const md5 = require('md5')

router.route('/').get((req, res) => {
	const response = {
		action: "get"
	}

	User.find()
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json("something wrong")
		})
})

router.route('/').post((req, res) => {
	const response = {
		info: {
			action: "post",
			status: "success",
		}
	}

	const passwordSalt = randomstring.generate(16)

	const user = new User({
		_id: mongoose.Types.ObjectId(),
		username: req.body.username,
		password: {
			hashed: md5(req.body.password + passwordSalt),
			salt: passwordSalt,
		},
		role: req.body.role,
		session: {
			id: randomstring.generate(16),
		}
	})

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

router.route('/').patch((req, res) => {
	const response = {
		action: "patch"
	}



	res.json(response)
})

router.route('/').delete((req, res) => {
	const response = {
		action: "delete"
	}



	res.json(response)
})


module.exports = router