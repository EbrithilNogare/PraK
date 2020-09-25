import React from "react"

import { 
	TextField,
	MenuList,
	MenuItem,
	LinearProgress,
} from '@material-ui/core'


class FetchComboBox extends React.Component {
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

	getFetchURL = () => {throw new Error("Calling abstract function")}

	generateObjectForMongooseFind = (value) => {throw new Error("Calling abstract function")}
	
	parseReturnedObjectFromMongooseFind = (element) => {throw new Error("Calling abstract function")}

	handleChange(event){
		this.setState({value: event.target.value})

		if(event.target.value.length > 2){
			this.setState({loading: true})
			fetch(this.getFetchURL(),{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.generateObjectForMongooseFind(event.target.value))
			})
			.then(response => response.json())
			.then(data => {
				const tempList = []
				data.forEach(element => {
					tempList.push({
						key: element._id,
						text: this.parseReturnedObjectFromMongooseFind(element),
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

export default FetchComboBox