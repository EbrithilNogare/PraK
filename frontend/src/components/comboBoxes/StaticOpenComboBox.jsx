import React from "react"

import { 
	TextField,
	MenuList,
	MenuItem,
} from '@material-ui/core'

/**
 * Combo box with option other.
 * So user can choose one from menu, or type his own
 */
class StaticOpenComboBox extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			value: this.props.defaultValue ? this.props.defaultValue : this.props.options ? this.props.options[0] || "" : "",
			menuList: [],
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		this.setState({value: e.target.value, menuList: e.target.value === "" ? this.props.options : []})

		if(this.props.onChange) this.props.onChange(e)
	}

	handleClick = (e) => {
		this.setState({menuList:this.props.options})
	}

	handleKeyUp = (e) => {
		if(e.key === "Escape"){
			this.setState({menuList:[]})
		}
	}

	handleMenuItemClick(value){
		this.setState({
			value: value,
			menuList: [],
		})
		if(this.props.onChange) this.props.onChange({target:{value:value}})
	}

	render(){
		return(
			<div style={{width: "100%"}}>
				<TextField
					name={this.props.name}
					label={this.props.label[0].toUpperCase() + this.props.label.slice(1)}
					required={this.props.required}
					disabled={this.props.disabled}
					onChange={this.handleChange}
					value={this.state.value}
					style={{width: "100%"}}
					inputProps={{
						realvalue: this.state.ID
					}}
					InputProps={{
						...this.props.InputProps
					}}
					onClick={(e) => {if(!this.props.disabled) this.handleClick(e)}}
					onKeyUp={this.handleKeyUp}
				/>
				<MenuList style={{
						paddingTop: 0,
						paddingBottom: 0,
						boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 3px 0px",
						maxHeight: "500px",
						overflowY: "auto"
					}}>
					{this.state.menuList.map((value, key)=>(
						<MenuItem
							key={key}
							onClick={() => {this.handleMenuItemClick(value)}}
						>
							{value}
						</MenuItem>
					))}
				</MenuList>
			</div>
		)
	}
}

export default StaticOpenComboBox