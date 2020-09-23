import React from "react"

import { 
	TextField,
} from '@material-ui/core'

import {
	Autocomplete
} from '@material-ui/lab';


class AuthorField extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			personName: "",
			personID: "",
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		if(event.target.value.length > 2)
			fetch("/prak/api/peopleindex",{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `/${event.target.value}/`
				})
			})
			.then(response => response.json())
			.then(data => {
				console.log(data)
			})
			.catch((error) => {
				console.error('Error:', error);
			  })


		this.setState({
			value: event.target.value,
		})
	}	

	render(){
		return(
			<div>
				<input
					onChange={this.handleChange}
				></input>

			<TextField
				name="autor"
				label="Autor"
				onChange={this.handleChange}
				error={this.state.error}
				helperText={this.state.error?this.state.message:""}
			/>			
			</div>
		)
	}
}

export default AuthorField