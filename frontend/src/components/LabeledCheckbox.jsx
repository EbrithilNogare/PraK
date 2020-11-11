import React from "react"

import { 
	Checkbox,
	Grid,
} from '@material-ui/core'

class LabeledCheckbox extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {}
	}
	
	handleChange = e => {this.props.onChange({...e, target:{...e.target, value: e.target.checked}})}

	render(){
		const {onChange, label, ...config} = this.props
		return(
			<Grid container direction="row" justify="flex-end" alignItems="center">
				<Grid item xs style={{textAlign:"right"}}>{ label }</Grid>
				<Grid item>
					<Checkbox style={{width:"20px"}} color="primary" {...config} onChange={this.handleChange}/>
				</Grid>
			</Grid>
		)
	}
}

export default LabeledCheckbox

