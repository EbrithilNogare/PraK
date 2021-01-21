import React from "react"

import {
	NavLink
} from "react-router-dom";

import { 
	Paper,
	Button,
} from '@material-ui/core'

import styles from './allPages.module.scss'

class AllPages extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			pages: []
		}
	}

	componentDidMount(){
		const url = "/prak/api/pages"
		const body = {}

		fetch(url, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({...body, _limit:1000})
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({pages: response})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){ return(
		<Paper className={styles.root}>
			<div className={styles.flex}>
			{this.state.pages
				.sort((a, b)=> (a.pageName > b.pageName) ? 1 : (a.pageName === b.pageName) ? 0 : -1 )
				.map((value, key) =>
				<NavLink 
				key={key}
				style={{ textDecoration: 'none' }}
				to={`/prak/cms/${value.pageName}`}
				>
					<Button color="primary" variant="contained">{value.pageName}</Button>
				</NavLink>
			)}
			</div>
		</Paper>
	)}
}

export default AllPages