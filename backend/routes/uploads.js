const router = require('express').Router()
const auth = require('../auth.js')
const fs = require('fs')

router.route('/').put(auth("write"), (req, res) => {
	try {
		if(!req.files) {
			res.send({
				status: false,
				message: 'No file uploaded'
			})
		} else {
			const file = req.files.file
			const random = Math.random().toString(36).substring(2)
			file.mv(`../uploads/${random}-${file.name}`)

			res.send({
				status: true,
				message: 'File is uploaded',
				data: {
					name: file.name,
					path: `/prak/uploads/${random}-${file.name}`,
					mimetype: file.mimetype,
					size: file.size
				}
			})
		}
	} catch (err) {
		res.status(500).json({ message: "something went wrong", details: err })
	}
})

router.route('/').post((req, res) => {
	fs.readdir("../uploads/", (err, files) => {
		if (err) {
			res.status(500).json({ message: "something went wrong", details: err })
			return
		}
		// remove hidden files
		res.status(200).json(files.filter(item=>!(/(^|\/)\.[^\/\.]/g).test(item)))
	})
})

router.route('/:path').delete(auth("write"), (req, res) => {
	if(!req.params.path)
		res.status(400).json({ message: "missing file name" })

	fs.unlink("../uploads/" + req.params.path, (err) => {
		if (err) {
			res.status(500).json({ message: "something went wrong", details: err })
			return
		}
		else
			res.status(200).json({})
	})
})

module.exports = router