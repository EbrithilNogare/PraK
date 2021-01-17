import React from "react"

import OneUser from "./oneUser"

class AllUsers extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			users: []
		}
	}

	componentDidMount(){
		const url = "/prak/api/user"
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
			this.setState({users: response})
		})
		.catch((error) => {
			console.info("%cUsers loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){ return(
		<div>
			<h2>All users</h2>
			{this.state.users.map((value, key) =>
				<OneUser
					key={key}
					user={value}
				/>
			)}
		</div>
	)}
}

export default AllUsers;