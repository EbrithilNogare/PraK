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
			<div className={styles.root}>
				<div className={styles.title}>
					<h1>Nahrávnání souborů</h1>
				</div>

				<UploadFile onChange={this.handleChange}/>
				{this.state.path != "" && <a href={this.state.path}>Show saved file</a>}
				<img src={this.state.path} alt=""/>
			</div>	
		)
	}
}

export default UploadScene