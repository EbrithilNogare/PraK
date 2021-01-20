import React from "react"

import {
	NavLink
} from "react-router-dom";

import { 
	Paper,
} from '@material-ui/core'

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
		<Paper component={"ul"}>
			{this.state.pages.map((value, key) =>
				<li key={key} ><NavLink to={`/prak/cms/${value._id}`}>{value.pageName}</NavLink></li>
			)}
		</Paper>
	)}
}

export default AllPages