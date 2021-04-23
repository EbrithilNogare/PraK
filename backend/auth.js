const Model = require('./models/user.model')

function auth (permission) {
    return function (req, res, next) {
		const sessionID = req.cookies.sessionID;
		if(!sessionID){
			res.status(500).json({
				message: "permission denied",
			})
			return
		}
		
		Model.findOne({ sessionID })
			.exec()
			.then(result => {
				if(result === null){
					res.status(401).json({
						message: "sessionID not found",
					})
					resolve()
				}
				
				if(result.sessionExpiration < new Date()){
					res.status(401).json({
						message: "session expirated",
					})
					resolve()
				}

				if(result.role[permission])
					next()
				else{
					res.status(401).json({
						message: "permission denied",
					})
					resolve()
				}
			})
			.catch(err => {{
				if(res.statusCode < 400)
					res.status(500).json({
						message: err.message,
						details: err
					})
			}
		})
	}
}

module.exports = auth