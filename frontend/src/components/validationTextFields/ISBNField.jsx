import React from "react"

import { 
	TextField,
} from '@material-ui/core'


class ISBNField extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			error: false,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const regex = /^(97(8|9))?\d{9}(\d|X)$/

		this.setState({
			value: event.target.value,
			error: event.target.value.length !== 0 && !regex.test(event.target.value)
		})

		if(this.props.onChange) this.props.onChange(event)
	}	

	render(){
		const {errorMessage, ...config} = this.props 
		return(
			<TextField {...config}
				onChange={this.handleChange}
				error={this.state.error}
				helperText={this.state.error ? errorMessage || "invalid ISBN" : ""}
			/>			
		)
	}
}

export default ISBNField