import React from "react"

import styles from "./news.module.scss"

class NewsView extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		return(
			<div className={styles.NewsView}>
				NewsView
			</div>
		)
	}
}

export default NewsView