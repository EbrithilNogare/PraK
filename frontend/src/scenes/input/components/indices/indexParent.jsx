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

		this.formData = undefined	// abstract
		this.indexURL = undefined	// abstract
	}
	
	getTypeDefinition = () => {throw new Error("Calling abstract function")}

	createFieldProps(name){
		const definition = this.getTypeDefinition(name)

		if(definition === undefined)
			throw "createFieldProps: cannot find: [" + name + "]"

		const toReturn = {
			label:definition.label,
			onChange:e=>{this.handleFormChange(e, definition.schema)},
		}
		if(definition.helper)
			toReturn.InputProps = this.helperProp(definition.helper)
	
		if(definition.options)
			toReturn.data = definition.options

		if(definition.required)
			toReturn.required = true
			
		if(definition.multiline)
			toReturn.multiline = true
			
		if(definition.type)
			toReturn.type = definition.type

		return toReturn
	}

	getDataReady = (elements) => {
		const errors = []
		for(let element of elements)
		if(element.value !== "" && (element.getAttribute("aria-invalid")==="true" || element.getAttribute("dbnotsynced")==="true"))
			{errors.push(`"${element.value}" is invalid value`)
		console.log("here");
		}
		console.log(errors)
		return {data:this.formData, errors}
	}
	
	handleSubmit = event => {
		event.preventDefault()
		
		const {data, errors} = this.getDataReady(event.target.elements)

		if(errors.length > 0){
			errors.forEach( value => {
				console.warn(value)
				this.props.enqueueSnackbar(value, { variant: "warning", autoHideDuration: 6000 })
			})

			console.error(`Cannot send data, because of ${errors.length} errors`);
			this.props.enqueueSnackbar(`Cannot send data, because of ${errors.length} errors`, { variant: "error", autoHideDuration: 6000 })
			
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
			this.props.enqueueSnackbar(`Sending succesfull\nID: ${response.id}`, { variant: "success", autoHideDuration: 6000 })
			this.props.history.push(`/prak/show/${this.indexURL}/`+response.id)
		})
		.catch((error) => {
			console.error('Sending unsuccesfull:', error)

			if(error.status && error.status === 500) error.json().then(errorMessage =>{
				console.error("errorMessage from server:", errorMessage)
				if(errorMessage.details.message)
					this.props.enqueueSnackbar(errorMessage.details.message, { variant: "error", autoHideDuration: 6000 })
				if(errorMessage.details.code && (errorMessage.details.code === 11000 || errorMessage.details.code === 11001))
					this.props.enqueueSnackbar(`duplicite error at: ${JSON.stringify(errorMessage.details.keyValue)}`, { variant: "error", autoHideDuration: 6000 })
			})
			else
				this.props.enqueueSnackbar(`Sending unsuccesfull: ${error}`, { variant: "error", autoHideDuration: 6000 })
		})

	}
	
	handleFormChange = (e, a) => {
		a.split('.').reduce((o,p,i) =>
			o[p] = a.split('.').length === ++i ? e.target.value : o[p] || {}, this.formData)
	}

	handleCheckboxChange = (e, a) => {
		a.split('.').reduce((o,p,i) =>
			o[p] = a.split('.').length === ++i ? e.target.checked : o[p] || {}, this.formData)
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