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

		// load default values
		let dataWithDefaultValues  = []
		
		const propChildrens = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
		
		const notEmptyChild = propChildrens.find((child=>child.props !== undefined))
		
		if(notEmptyChild && notEmptyChild.props && notEmptyChild.props.defaultValue !== undefined){
			notEmptyChild.props.defaultValue.forEach(child => {
				dataWithDefaultValues.push({key: this.maxKey++})
			})
		}
		else
			if(propChildrens && propChildrens.props && propChildrens.props.defaultValue !== undefined){
				dataWithDefaultValues = [{key: this.maxKey++}]
		}

		this.state = {
			data: dataWithDefaultValues.length !== 0
				? dataWithDefaultValues
				: [{ key: this.maxKey++ }],
		}

	}

	handleRemove = (keyToDelete, childs) => {
		const newState = {data: this.state.data.filter((chip) => chip.key !== keyToDelete)}
		childs.forEach((value, key)=>{
			if(value.props && value.props.onChange)
				value.props.onChange({ target: { value:undefined } }, keyToDelete)
		})

		if(newState.data.length === 0) newState.data = [{ key: this.maxKey++ }]
		this.setState(newState)
	}

	handleAdd = () => {
		const newData = this.state.data
		newData.push({ key: this.maxKey++ })
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
								return React.cloneElement(child, {
									style:{ width:"100%", ...child.props.style },
									key: childKey,
									onChange:(e)=>{child.props.onChange(e,value.key)},
									defaultValue: child.props.defaultValue ? child.props.defaultValue[value.key] || undefined : undefined,
								})
						})}
						</Grid>
						<Grid item style={{width:"60px"}}>
							<Button
								onClick={()=>this.handleRemove(value.key, propChildrens)}
								style={{height: "100%", width: "60px", color: "#949494"}}
							>
								<Remove/>
							</Button>
						</Grid>
					</Grid>
				))}
				<Grid container spacing={1}>
					<Grid item xs></Grid>
					<Grid item style={{width:"60px"}}>
						<Button onClick={this.handleAdd} style={{color: "#949494"}}>
							<Add/>
						</Button>
					</Grid>
				</Grid>

			</div>
		)
	}
}

export default Multiplier

