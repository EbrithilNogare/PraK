import React from "react"

import { 
	InputAdornment,
	Tooltip,
} from '@material-ui/core'

import {
	HelpOutline
} from '@material-ui/icons'

class IndexParent extends React.Component {
	constructor(props){
		super(props)
		
		window.debug = ()=>{return this.formData} // todo remove this line

		this.formData = null	// abstract
		this.indexURL = null	// abstract
	}

	getDataReady = (elements) => {
		const errors = []
		for(let element of elements)
		if(element.value !== "" && (element.getAttribute("aria-invalid")==="true" || element.getAttribute("dbnotsynced")==="true"))
			errors.push(`"${element.value}" is invalid value`)

		console.log(errors)
		return {data:this.formData, errors}
	}
	
	handleSubmit = event => {
		event.preventDefault()
		
		const {data, errors} = this.getDataReady(event.target.elements)

		if(errors.length > 0){
			errors.forEach( value => {
				console.warn(value)
				this.props.enqueueSnackbar(value, { variant: "warning" })
			})

			console.error(`Cannot send data, because of ${errors.length} errors`);
			this.props.enqueueSnackbar(`Cannot send data, because of ${errors.length} errors`, { variant: "error" })
			
			return
		}

		console.log("Sending data:\n", data)
				
		fetch(`/prak/api/${this.indexURL}${this.indexURL==="metadata"?"":"index"}`,{
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
			console.log("Response:\n",response)
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
	
	handleFormChange = (e, a) => {
		a.split('.').reduce((o,p,i) =>
			o[p] = a.split('.').length === ++i ? e.target.value : o[p] || {}, this.formData)
	}

	helperProp = (text) => {return{
		endAdornment: (
			<InputAdornment position="end">
				<Tooltip title={text}>
					<HelpOutline style={{fontSize: 12, color: "#c5c5c5", cursor: "help"}} />
				</Tooltip>
			</InputAdornment>
	)}}
}

export default IndexParent