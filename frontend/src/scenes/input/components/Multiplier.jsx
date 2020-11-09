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

	handleRemove = (keyOfChipToDelete, childs) => {
		const newState = {data: this.state.data.filter((chip) => chip.key !== keyOfChipToDelete)}
		childs.forEach((value, key)=>{
			value.props.onChange({ target: { value:undefined } }, keyOfChipToDelete)
		})

		if(newState.data.length === 0) newState.data = [{ key: this.maxKey++, value: undefined }]
		this.setState(newState)
	}

	handleAdd = () => {
		const newData = this.state.data
		newData.push({ key: this.maxKey++, value: undefined })
		this.setState({data: newData})
	}

	render(){
		const propChildrens = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
		if(propChildrens.every(value=>value===false)) return null
		return(
			<div>
				{this.state.data.map((value, key)=>(
					<Grid container key={value.key} spacing={1}>
						<Grid item xs>
							{propChildrens.map((child, childKey) => {
								if(child === false) return null
								return React.cloneElement(child, { style:{ width:"100%", ...child.props.style }, key: childKey, onChange:(e)=>{child.props.onChange(e,value.key)} })
						})}
						</Grid>
						<Grid item style={{width:"60px"}}>
							<Button
								onClick={()=>this.handleRemove(value.key, propChildrens)}
								style={{height: "100%", width: "60px"}}
							>
								<Remove/>
							</Button>	
						</Grid>
					</Grid>
				))}
				<Button
					onClick={this.handleAdd}
					style={{height: "100%", width: "60px", float: "right"}}
				>
					<Add/>
				</Button>	
				
			</div>
		)
	}
}

export default Multiplier

