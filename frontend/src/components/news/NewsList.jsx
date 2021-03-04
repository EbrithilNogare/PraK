import React from "react"

import styles from "./news.module.scss"

class NewsList extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	render(){
		return(
			<div className={styles.NewsList}>
				NewsList
			</div>
		)
	}
}

export default NewsList