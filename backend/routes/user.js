const router = require('express').Router()
const User = require('../models/user.model')
const randomstring = require("randomstring")
const mongoose = require("mongoose")
const md5 = require('md5')

router.route('/:id').get((req, res) => {
	if(!req.params.id)
		res.status(400).json({ message: "incorrect ID" })

	User.find({_id: req.params.id})
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json({message: "something went wrong", details:err})
		})
})

router.route('/').post((req, res) => {
	if(!req.body._id)
		res.status(400).json({ message: "incorrect ID" })

	const id = req.body._id
	const user = {}
	const isOwner = true; // todo
	const isAdmin = true; // todo

	const unrequiredProps = [
		"firstName",
		"secondName",
	]

	for(const prop of unrequiredProps)
		if(req.body.user[prop] !== undefined) 
			user[prop] = req.body[prop]

	if(req.body.user.password){
		if(!(isOwner || isAdmin)){
			res.status(401).json({
				message: "not permitted - only admin or owner can change password",
			})
		}

		const passwordSalt = randomstring.generate(16)
		user.password = {
			hashed: md5(req.body.user.password + passwordSalt),
			salt: passwordSalt,
		}
	}

	if(req.body.user.email){
		if(!(isOwner || isAdmin)){
			res.status(401).json({
				message: "not permitted - only admin or owner can change email",
			})
		}
		user.email = req.body.user.email
	}


	if(req.body.user.role){
		if(!isAdmin){
			res.status(401).json({
				message: "not permitted - only admin or owner can change role",
			})
		}
		user.role = req.body.user.role
	}



	User.findByIdAndUpdate(id,user)
	.then(() => {
		res.status(200).json({})
	})
	.catch(err => {
		res.status(500).json({
			message: "something went wrong",
			details: err,
		})
	})
})

router.route('/').put((req, res) => {
	const passwordSalt = randomstring.generate(16)

	const newUser = new User({
		_id: mongoose.Types.ObjectId(),
		email: req.body.email,
		password: {
			hashed: md5(req.body.password + passwordSalt),
			salt: passwordSalt,
		},
		role: "User",
		session: {
			id: randomstring.generate(32),
			expiration: Date.now(), 
		},
	})

	const unrequiredProps = [
		"firstName",
		"secondName",
	]

	for(const prop of unrequiredProps)
		if(req.body[prop] !== undefined) 
			newUser[prop] = req.body[prop]

	newUser.save()
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

router.route('/:id').delete((req, res) => {
	if(!req.params.id)
		res.status(400).json({ message: "incorrect ID" })

	const id = req.params.id
	const isOwner = true; // todo
	const isAdmin = true; // todo

	if(!(isOwner || isAdmin)){
		res.status(401).json({
			message: "not permitted - only admin or owner can remove account",
		})
	}

	User.findByIdAndRemove(id)
	.then(() => {
		res.status(200).json({})
	})
	.catch(err => {
		res.status(500).json({
			message: "something went wrong",
			details: err,
		})
	})

})


module.exports = router