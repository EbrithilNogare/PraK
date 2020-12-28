import React from "react"
import { withCookies } from "react-cookie";


import {
	StaticOpenComboBox,
} from '../comboBoxes'

class SubmitterComboBox extends React.Component {
	constructor(props){
		super(props)
		this.defaultValue = this.props.cookies.get("user") || ""
	}

	componentDidMount(){
		if(!this.props.defaultValue)
			this.props.onChange({target:{value:this.defaultValue}})
	}
	
	render(){ return(
			<StaticOpenComboBox defaultValue={this.defaultValue} {...this.props}/>
		)}
}

export default withCookies(SubmitterComboBox)