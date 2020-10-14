import React from "react"

import { 
	TextField,
} from '@material-ui/core'


class GPSField extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: 0,
			error: false,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const regex = /^([SNsn][\s]*)?((?:[+-]?[0-9]*[.,][0-9]+)|(?:[+-]?[0-9]+))(?:(?:[^ms'′"″,.\dNEWnew]?)|(?:[^ms'′"″,.\dNEWnew]+((?:[+-]?[0-9]*[.,][0-9]+)|(?:[+-]?[0-9]+))(?:(?:[^ds°"″,.\dNEWnew]?)|(?:[^ds°"″,.\dNEWnew]+((?:[+-]?[0-9]*[.,][0-9]+)|(?:[+-]?[0-9]+))[^dm°'′,.\dNEWnew]*))))([SNsn]?)[^\dSNsnEWew]+([EWew][\s]*)?((?:[+-]?[0-9]*[.,][0-9]+)|(?:[+-]?[0-9]+))(?:(?:[^ms'′"″,.\dNEWnew]?)|(?:[^ms'′"″,.\dNEWnew]+((?:[+-]?[0-9]*[.,][0-9]+)|(?:[+-]?[0-9]+))(?:(?:[^ds°"″,.\dNEWnew]?)|(?:[^ds°"″,.\dNEWnew]+((?:[+-]?[0-9]*[.,][0-9]+)|(?:[+-]?[0-9]+))[^dm°'′,.\dNEWnew]*))))([EWew]?)$/

		this.setState({
			value: event.target.value,
			error: event.target.value.length !== 0 && !regex.test(event.target.value)
		})

		if(this.props.onChange) this.props.onChange(event)
	}	

	render(){
		return(
			<TextField
				name={ this.props.name }
				label={ this.props.label }
				required={ this.props.required }
				onChange={ this.handleChange }
				error={ this.state.error }
				helperText={ this.state.error ? this.props.errorMessage || "Invalid Coordinates" : "" }
			/>			
		)
	}
}

export default GPSField