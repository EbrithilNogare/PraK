import React from "react"

import { 
	Grid,
	Button,
} from '@material-ui/core'

import {
	Add, 
	Remove, 
} from '@material-ui/icons';

//import styles from './multiplier.module.scss'

class Multiplier extends React.Component {
	constructor(props){
		super(props)
		
		this.maxKey = 0

		this.state = {
			value: undefined,
			data: [{ key: this.maxKey++, value: undefined }],
		}

	}

	handleRemove = (keyOfChipToDelete) => {
		this.setState({data: this.state.data.filter((chip) => chip.key !== keyOfChipToDelete)})
	}

	handleAdd = (chipToDelete) => {
		const newData = this.state.data
		newData.push({ key: this.maxKey++, value: undefined })
		this.setState({data: newData})
	}

	render(){
		return(
			<div>
				{this.state.data.map((value, key)=>(
					<Grid container key={value.key}>
						<Grid item xs>
							{this.props.children}
						</Grid>
						<Grid item>
							<Button
								onClick={()=>this.handleRemove(value.key)}
								style={{height: "100%", width: "100%"}}
							>
								<Remove/>
							</Button>	
						</Grid>
					</Grid>
				))}
				<Button
					onClick={this.handleAdd}
					style={{height: "100%", width: "100%"}}
				>
					<Add/>
				</Button>	
				
			</div>
		)
	}
}

export default Multiplier

