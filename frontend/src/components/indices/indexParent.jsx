import React from "react"

import lodashSet from "lodash.set"

import { 
	InputAdornment,
	Tooltip,
} from '@material-ui/core'
import DeepValue from '../DeepValue.js'
import {
	HelpOutline
} from '@material-ui/icons'

class IndexParent extends React.Component {
	constructor(props){
		super(props)

		window.debug = ()=>{return this.formData} // todo remove this line

		this.indexURL = undefined	// abstract
		
		this.formData = {}
		if(this.props.defaults){
			Object.keys(this.props.defaults).forEach( key => {
				const value = this.props.defaults[key]
				if(Array.isArray(value) && value.length !== 0)
					this.formData[key] = value
			})
		}
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
				const mapOfDefaluts = schema.map(value => DeepValue(this.props.defaults, value))
				// if(mapOfDefaluts.every(value=>value!==undefined))
				definition.defaultValue = mapOfDefaluts
			}
			else
				definition.defaultValue = DeepValue(this.props.defaults, schema)
		}

		definition.onChange = (e,multiplierIndex) => { this.handleFormChange(e, schema, multiplierIndex) }
		return definition
	}

	getDataReady = (elements) => {
		const errors = []
		for(let element of elements)
		if(element.value !== "" && (element.getAttribute("aria-invalid")==="true" || element.getAttribute("dbnotsynced")==="true"))
			{errors.push(`"${element.value}" is invalid value`)
		}
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


		const method = this.props.defaults ? "PATCH" : "PUT" 

		console.info(`%cSending data as ${method}:\n`, "background: #222; color: #bada55", data)

		fetch(`/prak/api/${this.indexURL}${this.indexURL==="metadata"?"":"index"}${method==="PATCH"?"/"+this.props.defaults._id:""}`,{
			method,
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
			console.info("%cResponse:\n", "background: #222; color: #bada55", response)
			this.props.enqueueSnackbar(`Sending succesful\nID: ${(response.id || this.props.defaults._id)}`, { variant: "success", autoHideDuration: 6000 })
			this.props.history.push(`/prak/show/${this.indexURL}/`+(response.id || this.props.defaults._id))
		})
		.catch((error) => {
			console.error('Sending unsuccesful:', error)

			if(error.status && error.status === 500) error.json().then(errorMessage =>{
				console.error("errorMessage from server:", errorMessage)
				if(errorMessage.details && errorMessage.details.message)
					this.props.enqueueSnackbar(errorMessage.details.message, { variant: "error", autoHideDuration: 6000 })
				if(errorMessage.details && errorMessage.details.code && (errorMessage.details.code === 11000 || errorMessage.details.code === 11001))
					this.props.enqueueSnackbar(`duplicite error at: ${JSON.stringify(errorMessage.details.keyValue)}`, { variant: "error", autoHideDuration: 6000 })
			})
			else
				this.props.enqueueSnackbar(`Sending unsuccesful: ${error}`, { variant: "error", autoHideDuration: 6000 })
		})

	}

	handleFormChange = (value, path, multiplierIndex = 0) => {
		path = path.replace("[%]", `[${multiplierIndex}]`)
		lodashSet(this.formData, path, value.target.value)
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