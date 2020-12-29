import React from "react"
import { withCookies } from "react-cookie";


import {
	TextField,
} from '@material-ui/core'

class SubmitterComboBox extends React.Component {
	constructor(props){
		super(props)
		this.defaultValue = this.props.cookies.get("user") || ""
	}

	componentDidMount(){
		if(!this.props.defaultValue)
			this.props.onChange({target:{value:this.defaultValue}})
	}
	
	render(){ 
		// eslint-disable-next-line no-unused-vars
		const {allCookies, childProps} = {...this.props}
		return(
			<TextField defaultValue={this.defaultValue} {...childProps} disabled={!(this.props.cookies.get("permission") & 1)}/>
		)}
}

export default withCookies(SubmitterComboBox)