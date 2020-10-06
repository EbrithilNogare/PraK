import React from "react"

class IndexParent extends React.Component {
	constructor(props){
		super(props)
		
		this.indexURL = null	// abstract
	}
	
	handleSubmit = event => {		
		event.preventDefault()
		
		const {data, errors} = this.getDataReady(event.target.elements)

		if(errors.length > 0){
			for (let i = 0; i < errors.length; i++) {
				console.warn(errors[i]);
				this.props.enqueueSnackbar(errors[i], { variant: "warning" })
			}

			console.error(`Cannot send data, because of ${errors.length} errors`);
			this.props.enqueueSnackbar(`Cannot send data, because of ${errors.length} errors`, { variant: "error" })
			
			return
		}

		console.log("Sending data:\n", data)
				
		fetch(`/prak/api/${this.indexURL}index`,{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if(response.status === 500)
				throw response
			return response.json()
		})
		.then(response => {
			console.log(response)
			this.props.enqueueSnackbar(`Sending succesfull\nID: ${response.id}`, { variant: "success" })
			this.props.history.push(`/prak/show/${this.indexURL}/`+response.id)
		})
		.catch((error) => {
			console.error('Sending unsuccesfull:', error)

			if(error.status && error.status === 500) error.json().then(errorMessage =>{
				console.error("errorMessage from server:", errorMessage)
				if(errorMessage.details.message)
					this.props.enqueueSnackbar(errorMessage.details.message, { variant: "error" })
				if(errorMessage.details.code && (errorMessage.details.code === 11000 || errorMessage.details.code === 11001))
					this.props.enqueueSnackbar(`duplicite error at: ${JSON.stringify(errorMessage.details.keyValue)}`, { variant: "error" })
			})
			else
				this.props.enqueueSnackbar(`Sending unsuccesfull: ${error}`, { variant: "error" })
		})

	}

	getDataReady = (elements) => {	// abstract
		throw new Error("Calling abstract function") 
	}
}

export default IndexParent