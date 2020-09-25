import React from "react"

import { 
	TextField,
	MenuList,
	MenuItem,
	LinearProgress,
} from '@material-ui/core'


class PersonComboBox extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			name: "",
			ID: "",
			menuList: [],
			loading: false,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({value: event.target.value})

		if(event.target.value.length > 2){
			this.setState({loading: true})
			fetch("/prak/api/peopleindex",{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					surname: `/${event.target.value}/`
				})
			})
			.then(response => response.json())
			.then(data => {
				const tempList = []
				data.forEach(element => {
					tempList.push({
						key: element._id,
						text: `${element.surname.join(" ")} ${element.name.join(" ")}`,
					})
				})
				this.setState({menuList: tempList})
			})
			.catch((error) => {
				console.error('Error:', error);
			})
			.finally(() => {
				this.setState({loading: false})
			})
		}

	}

	handleMenuItemClick(value){
		this.setState({
			value: value.text,
			name: value.text,
			ID: value.key,
			menuList: [],
		})
	}

	render(){
		return(
			<div>
				<TextField
					name={this.props.name}
					label={this.props.label}
					onChange={this.handleChange}
					value={this.state.value}
					style={{width: "100%"}}
				/>
				{this.state.loading && <LinearProgress />}
				<MenuList>
					{this.state.menuList.map(value=>(
						<MenuItem
							key={value.key}
							onClick={() => this.handleMenuItemClick(value)}
						>
							{value.text}
						</MenuItem>
					))}
				</MenuList>
			</div>
		)
	}
}

export default PersonComboBox