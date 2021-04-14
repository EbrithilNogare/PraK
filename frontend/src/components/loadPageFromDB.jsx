import React from "react"
import parse from 'html-react-parser'
import { NavLink } from "react-router-dom"
import { withCookies } from "react-cookie"

import CircularProgress from '@material-ui/core/CircularProgress'
import { Edit } from '@material-ui/icons/';

import styles from './loadPageFromDB.module.scss'

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
		const url = `/prak/api/pages/${pageName}`

		fetch(url, {
			method: 'GET',
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({html: response.content || "--- Empty Page ---"})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
			this.setState({html: "Unable to load page"})
		})
	}
    
	render(){
		return(
			<div className={styles.main}>
				{(this.props.cookies.get("permission") & 8) > 0 &&
					<NavLink
						style={{ position: "absolute", right: 0, top: 0, color: "#555" }}
						to={`/prak/cms/${this.props.pageName}`}
					>
						<Edit/>
					</NavLink>
				}
				{ this.state.html === "" 
					? <CircularProgress color="primary"/>
					: parse(this.state.html)
				}
			</div>
		)
	}
}

export default withCookies(LoadPageFromDB)