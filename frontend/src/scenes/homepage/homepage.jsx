import React from "react"

import { NewsBlock } from "../../components/news"
import LoadPageFromDB from "../../components/loadPageFromDB"

import styles from './homepage.module.scss'

class Homepage extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		return(
			<div className={styles.Homepage}>
				<NewsBlock/>
				<LoadPageFromDB pageName={"homepage"}/>
			</div>
		)
	}
}

export default Homepage