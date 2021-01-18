import React from "react"

import { 
	Paper,
} from '@material-ui/core'

import UploadFile from "../../components/uploadFile"

import styles from './uploadScene.module.scss'

class UploadScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			mimetype: "",
			name: "",
			path: "",
			size: "",
		}
	}

	showResult = (data) => {
		this.setState({
			...data,
			path: `/prak${data.path}`
		})
	}

	render(){
		return(
			<Paper className={styles.root}>
				<UploadFile
					onChange={this.showResult}
				/>
				name: {this.state.name}<br/>
				path: {this.state.path}<br/>
				full path: <a href={this.state.path===""?"":"http://quest.ms.mff.cuni.cz" + this.state.path}>{this.state.path===""?"":"quest.ms.mff.cuni.cz" + this.state.path}</a><br/>
				size: {this.state.size}<br/>
				mimetype: {this.state.mimetype}<br/>
				<img src={this.state.mimetype.substring(0,5) === "image" ? this.state.path : ""} alt=""/>
			</Paper>	
		)
	}
}

export default UploadScene