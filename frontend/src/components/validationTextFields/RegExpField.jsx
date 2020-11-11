import React from "react"

import { 
	TextField,
} from '@material-ui/core'


class RegExpField extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			error: false,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({
			value: event.target.value,
			error: event.target.value.length !== 0 && !(new RegExp(this.props.regexp)).test(event.target.value)
		})

		if(this.props.onChange) this.props.onChange(event)
	}	

	render(){
		const {errorMessage, regexp, ...config} = this.props 
		return(
			<TextField {...config}
				onChange={ this.handleChange }
				error={ this.state.error }
				helperText={ this.state.error ? errorMessage || "Not matching RegExp" : "" }
			/>			
		)
	}
}

export default RegExpField