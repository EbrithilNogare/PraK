import React from "react"

import {
	Switch as RouterSwitch,
	Route,
} from "react-router-dom"

import { 
	Paper,
} from '@material-ui/core'

import AllPages from "./components/allPages"
import EditPage from "./components/editPage"

import styles from './cmsScene.module.scss'

class CmsScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			editorState:"",
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({editorState})
	}

	uploadContent = () => {
		console.log("A");
	}

	render(){
		return(
			<div className={styles.root}>
				<Paper className={styles.title}>
					<h1>Redakční systém</h1>
				</Paper>
				<RouterSwitch>
					<Route path="/prak/cms/:pageId" render={({match}) => <EditPage pageId={match.params.pageId}/>}/>
					<Route path="/prak/cms/"><AllPages/></Route>
				</RouterSwitch>
			</div>	
		)
	}
}

export default CmsScene