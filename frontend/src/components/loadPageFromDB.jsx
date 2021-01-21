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

	componentDidUpdate(prevProps, prevState){
		if(prevProps.pageName !== this.props.pageName){
			this.loadPage(this.props.pageName)
		}
	}

	componentDidMount(){
		this.loadPage(this.props.pageName)
	}

	loadPage = (pageName) => {
		const url = `/prak/api/pages/cs/${pageName}`

		fetch(url, {
			method: 'GET',
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({html: response.cs || "--- Empty Page ---"})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
			this.setState({html: "Unable to load page"})
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