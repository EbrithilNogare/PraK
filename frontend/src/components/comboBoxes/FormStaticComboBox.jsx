import React from "react"

import { 
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core'

import formSpecificData from "./FormStaticComboBoxData.json" 

class FormStaticComboBox extends React.Component {
	constructor(props){
		super(props)

		let defaultValue = this.props.defaultValue
		if(!Array.isArray(defaultValue) || defaultValue.length !== 3)
			defaultValue = ["","",""]

		this.state = {
			value: defaultValue
		}
	}

	handleChangeFirst = event => {
		const newValue = [event.target.value,"",""]
		this.setState({value: newValue})
		if(this.props.onChange) this.props.onChange({ target: { value: newValue } })
	}
	handleChangeSecond = event => {
		const newValue = [this.state.value[0], event.target.value,""]
		this.setState({value: newValue})
		if(this.props.onChange) this.props.onChange({ target: { value: newValue } })
	}
	handleChangeThird = event => {
		const newValue = [this.state.value[0], this.state.value[1], event.target.value]
		this.setState({value: newValue})
		if(this.props.onChange) this.props.onChange({ target: { value: newValue } })
	}

	render(){
		return(<div>
			<FormControl style={{width: "100%"}}>
				<InputLabel id="select-label1">{this.props.label[0].toUpperCase() + this.props.label.slice(1)}</InputLabel>
				<Select
					name={this.props.name}
					labelId="select-label1"
					onChange={this.handleChangeFirst}
					value={this.state.value[0]}
					required={this.props.required}
					style={{width: "100%"}}
					inputProps={{
						realvalue:this.state.ID,
					}}
					endAdornment={this.props.InputProps && this.props.InputProps.endAdornment ? this.props.InputProps.endAdornment : undefined}
					>
					{Object.keys(formSpecificData).map((value, key)=>(
						<MenuItem key={key} value={value}>{value}</MenuItem>
					))}
				</Select>
			</FormControl>
			{ this.state.value[0] !== "" && Array.isArray(formSpecificData[this.state.value[0]])===false && <FormControl style={{width: "100%"}}>
				<InputLabel id="select-label2">{this.props.label[0].toUpperCase() + this.props.label.slice(1) + ": " + this.state.value[0]}</InputLabel>
				<Select
					name={this.props.name}
					labelId="select-label2"
					onChange={this.handleChangeSecond}
					value={this.state.value[1]}
					required={this.props.required}
					style={{width: "100%"}}
					inputProps={{
						realvalue:this.state.ID,
					}}
					endAdornment={this.props.InputProps && this.props.InputProps.endAdornment ? this.props.InputProps.endAdornment : undefined}
					>
					{Object.keys(formSpecificData[this.state.value[0]]).map((value, key)=>(
						<MenuItem key={key} value={value}>{value}</MenuItem>
					))}
				</Select> 
			</FormControl>}
			{ this.state.value[1] !== "" && Array.isArray(formSpecificData[this.state.value[0]][this.state.value[1]])===false && <FormControl style={{width: "100%"}}>
				<InputLabel id="select-label3">{this.props.label[0].toUpperCase() + this.props.label.slice(1) + ": " + this.state.value[1]}</InputLabel>
				<Select
					name={this.props.name}
					labelId="select-label3"
					onChange={this.handleChangeThird}
					value={this.state.value[2]}
					required={this.props.required}
					style={{width: "100%"}}
					inputProps={{
						realvalue:this.state.ID,
					}}
					endAdornment={this.props.InputProps && this.props.InputProps.endAdornment ? this.props.InputProps.endAdornment : undefined}
					>
					{Object.keys(formSpecificData[this.state.value[0]][this.state.value[1]]).map((value, key)=>(
						<MenuItem key={key} value={value}>{value}</MenuItem>
					))}
				</Select> 
			</FormControl>}
		</div>)
	}
}




export default FormStaticComboBox