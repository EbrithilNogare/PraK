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

	createFieldProps = (name) => {
		const {helper, schema, fields, ...definition} = this.getTypeDefinition(name)
		
		if(definition === undefined)
			throw new Error("createFieldProps: cannot find: [" + name + "]")
		
		if(helper)
			definition.InputProps = this.helperProp(helper)
		
		if(this.props.defaults){
			if(Array.isArray(schema)){
				const mapOfDefaluts = schema.map(value => this.deepValue(this.props.defaults, value))
				if(mapOfDefaluts.every(value=>value!==undefined))
					definition.defaultValue = mapOfDefaluts
			}
			else
				definition.defaultValue = this.deepValue(this.props.defaults, schema)
		}
		
		definition.onChange = (e,multiplierIndex) => { this.handleFormChange(e, schema, multiplierIndex) }
		return definition
	}

	deepValue = (obj, path) => {
		const arrayPath = path.split("[%]")
		for (let i=0, path = arrayPath[0].split('.'), len=path.length; i<len; i++){
			if(obj === undefined) return undefined
			obj = obj[path[i]]
		}
		if(arrayPath.length === 1){
			return obj
		}
		
		const toReturn = []
		obj.forEach((value,key)=>{
			for (let i = 1, path = arrayPath[1].split('.'), len = path.length; i < len; i++){
				value = value[path[i]]
			}
			toReturn.push(value)
		})
		return toReturn[0] // todo remove [0]
	}

	getDataReady = (elements) => {
		const errors = []
		for(let element of elements)
		if(element.value !== "" && (element.getAttribute("aria-invalid")==="true" || element.getAttribute("dbnotsynced")==="true"))
			{errors.push(`"${element.value}" is invalid value`)
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
	
	handleFormChange = (e, a, multiplierIndex=0) => {
		a=a.replace("[%]", `.${multiplierIndex}`);
		a.split('.').reduce((o,p,i) =>
			o[p] = a.split('.').length === ++i ? e.target.value : o[p] || (isNaN(p)?[]:{}), this.formData)
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