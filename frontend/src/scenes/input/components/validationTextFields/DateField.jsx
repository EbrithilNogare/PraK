import React from "react"

import { 
	TextField,
} from '@material-ui/core'


class DateField extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: undefined,
			error: false,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const value = event.target.value
		const regex = /^(?:\d{1,2}\.){0,2}\d{4}$/
		let state = {}
		let newDate = undefined
		
		if(!regex.test(value)){
			this.setState({value, error: true})
			return;
		}

		if(value.length === 0){
			this.setState({value:undefined, error: false})
			if(this.props.onChange) this.props.onChange(event)
			return;
		}
		
		const sd = value.split('.')
		switch(sd.length){
			case 1: newDate = new Date(value); break;
			case 2: newDate = new Date(`${sd[0]}-1-${sd[1]}`); break;
			case 3: newDate = new Date(`${sd[1]}-${sd[0]}-${sd[2]}`); break;
		}
		
		if(newDate instanceof Date && !isNaN(newDate))
			state = {value, error: false}
		else
			state = {value, error: true}

		this.setState(state)

		if(this.props.onChange) this.props.onChange({...event, target: {...event.target, value: newDate}})
	}	

	render(){
		return(
			<TextField {...this.props}
				name={ this.props.name }
				label={ this.props.label }
				required={ this.props.required }
				onChange={ this.handleChange }
				error={ this.state.error }
				helperText={ this.state.error ? this.props.errorMessage || "Invalid Date, use format dd.mm.yyyy or yyyy" : "" }
			/>			
		)
	}
}

export default DateField