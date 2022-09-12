import React from "react"

import { 
	Checkbox,
	Grid,
} from '@material-ui/core'

/**
 * Checkbox with label
 */
class LabeledCheckbox extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			checked: this.props.defaultValue || false
		}
	}

	handleChange = e => {
		this.setState({ checked: e.target.checked })
		this.props.onChange({...e, target:{...e.target, value: e.target.checked}})
	}

	render(){
		const {onChange, defaultValue, label, ...config} = this.props
		return(
			<Grid container direction="row" justifyContent="flex-end" alignItems="center">
				<Grid item xs style={{textAlign:"right"}}>{ label }</Grid>
				<Grid item>
					<Checkbox style={{width:"20px"}} color="secondary" {...config} onChange={this.handleChange} checked={this.state.checked}/>
				</Grid>
			</Grid>
		)
	}
}

export default LabeledCheckbox

