import React from "react"

import { 
	Paper,
} from '@material-ui/core'

import UploadFile from "../../components/UploadFile"

import styles from './uploadScene.module.scss'

class UploadScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			path: "",
		}
	}
	
	handleChange = (e) => this.setState({ path: e.target.value })

	render(){
		return(
			<Paper className={styles.root}>
				<UploadFile onChange={this.handleChange}/>
				<img src={this.state.path} alt=""/>
			</Paper>	
		)
	}
}

export default UploadScene