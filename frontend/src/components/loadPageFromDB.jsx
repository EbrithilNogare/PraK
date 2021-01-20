import React from "react"
import parse from 'html-react-parser'

import {
	Paper,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'


class LoadPageFromDB extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			html: "",
		}
	}

	componentDidMount(){
		const url = `/prak/api/pages/cs/${this.props.pageID}`

		fetch(url, {
			method: 'GET',
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({html: response.cs})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){
		return(
			<Paper style={{ margin:"50px", padding:"20px" }}>
				{ this.state.html === "" 
					? <CircularProgress color="primary"/>
					: parse(this.state.html)
				}
			</Paper>
		)
	}
}

export default LoadPageFromDB