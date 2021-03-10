import React from "react"

import styles from "./shards.module.scss"
import { ShardsView } from "."

class ShardsList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			shards: []
		}
	}

	componentDidMount(){
		this.loadShards()
	}

	loadShards = () => {
		const url = "/prak/api/pages"
		const body = { category: "shards", language: "cz" }

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
			this.setState({ shards: response })
			console.log(response);
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){
		return(
			<div className={styles.ShardsList}>
				<h1><center>Střípky z Krkonoš</center></h1>
				{this.state.shards.map((value, key) => (<ShardsView key={key} data={value}/>))}
			</div>
		)
	}
}

export default ShardsList