const router = require('express').Router()
const Model = require('../models/user.model')
const randomstring = require("randomstring")
const mongoose = require("mongoose")
const md5 = require('md5')

router.route('/:id').get((req, res) => {
	if(!req.params.id)
		res.status(400).json({ message: "incorrect ID" })

	Model.findById(req.params.id)
		.exec()
		.then(result => {
			result.password = "******";
			result.sessionID = "******";
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json({message: "something went wrong", details:err})
		})
})

router.route('/').post((req, res) => {
	// support for regexp search
	for(let key of ["email", "firstName", "secondnName"])
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
			result.forEach(element => {
				element.password = "******";
				element.sessionID = "******";
			})
			res.status(200).json(result)
		})
		.catch(err => {
			res.status(500).json({message: "something went wrong", details:err})
		})
})

router.route('/').put((req, res) => {
	const email = req.body.email
	if (!email)
		res.status(400).json({ message: "missing email" })

	const password = req.body.password
	if(!password)
		res.status(400).json({ message: "missing password" })

	const role = !req.body.role ? {} : {
		read: req.body.role.read || false,
		write: req.body.role.write || false,
		execute: req.body.role.execute || false,
	}

	const salt = randomstring.generate(16)
	const sessionID = randomstring.generate(32)

	const newModel = new Model({ email,
		password: md5(password + salt),
		salt,
		role,
		sessionID,
		sessionExpiration: Date.now(),
		firstName: req.body.firstName,
		secondName: req.body.secondName,
	})

	newModel.save()
		.then(result => {
			res.status(200).json(result._id)
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
	if(!id)
		res.status(400).json({ message: "incorrect ID" })

	const user = {}
	const isOwner = true; // todo
	const isAdmin = true; // todo

	if(req.body.password){
		if(!(isOwner || isAdmin))
			res.status(401).json({ message: "not permitted - only admin or owner can change password"})

		user.salt = randomstring.generate(16)
		user.password = md5(req.body.password + user.salt)
	}

	if(req.body.email){
		if(!(isOwner || isAdmin))
			res.status(401).json({ message: "not permitted - only admin or owner can change email" })
		
		user.email = req.body.email
	}

	if(req.body.firstName){
		if(!(isOwner || isAdmin))
			res.status(401).json({ message: "not permitted - only admin or owner can change email" })
		
		user.firstName = req.body.firstName
	}

	if(req.body.secondName){
		if(!(isOwner || isAdmin))
			res.status(401).json({ message: "not permitted - only admin or owner can change email" })
		
		user.secondName = req.body.secondName
	}


	if(req.body.role){
		if(!isAdmin){
			res.status(401).json({
				message: "not permitted - only admin or owner can change role",
			})
		}
		user.role = req.body.role
	}

	

	Model.findByIdAndUpdate(id,user)
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

router.route('/:id').delete((req, res) => {
	const id = req.params.id
	if(!id)
		res.status(400).json({ message: "incorrect ID" })

	const isOwner = true; // todo
	const isAdmin = true; // todo

	if(!(isOwner || isAdmin)){
		res.status(401).json({
			message: "not permitted - only admin or owner can remove account",
		})
	}

	Model.findByIdAndRemove(id)
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