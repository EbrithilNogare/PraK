import React from "react"
import { withTranslation } from 'react-i18next'

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

	render(){ 
		const { t } = this.props
		return(
		<div>
			<h2>{t("admin.allUsers")}</h2>
			{this.state.users
				.sort((a, b)=> (a.email > b.email) ? 1 : (a.email === b.email) ? 0 : -1 )
				.map((value, key) =>
				<OneUser
					key={key}
					user={value}
				/>
			)}
		</div>
	)}
}

const WithHooks = withTranslation()(AllUsers)
export default function TranslatedComponent(props) { return (
	<React.Suspense fallback="loading">
		<WithHooks {...props}/>
	</React.Suspense>
)}