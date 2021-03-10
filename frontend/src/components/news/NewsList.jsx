import React from "react"

import styles from "./news.module.scss"
import { NewsView } from "./"

class NewsList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			news: []
		}
	}

	componentDidMount(){
		this.loadNews()
	}

	loadNews = () => {
		const url = "/prak/api/pages"
		const body = { category: "news", language: "cz" }

		fetch(url, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...body, _limit: 50 })
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({ news: response })
			console.log(response);
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){
		return(
			<div className={styles.NewsList}>
				<h1><center>Aktuality</center></h1>
				{this.state.news.map((value, key) => (<NewsView key={key} data={value}/>))}
			</div>
		)
	}
}

export default NewsList