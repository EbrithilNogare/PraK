import React from "react"

import { 
	TextField,
	MenuList,
	MenuItem,
} from '@material-ui/core'

class GenderComboBox extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value: "",
			menuList: [],
		}	
		this.menu = [
			"Muž",
			"Žena",
			"Transsexuál",
			"Cis",
			"Hermafrodit",
			"Intersexuální muž",
			"Intersexuální žena",
			"Asexuál",
			"Jiné",
		]

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({value: event.target.value})
	}

	handleMenuItemClick(value){
		this.setState({
			value: value,
			menuList: [],
		})
	}

	render(){
		return(
			<div>
				<TextField
					name={this.props.name}
					label={this.props.label}
					required={this.props.required}
					onChange={this.handleChange}
					value={this.state.value}
					style={{width: "100%"}}
					inputProps={{realvalue:this.state.ID}}
					onClick={()=>{this.setState({menuList:this.menu})}}
				/>
				<MenuList>
					{this.state.menuList.map((value, key)=>(
						<MenuItem
							key={key}
							onClick={() => this.handleMenuItemClick(value)}
						>
							{value}
						</MenuItem>
					))}
				</MenuList>
			</div>
		)
	}
}

export default GenderComboBox