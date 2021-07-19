import React from "react"
import { NavLink } from "react-router-dom"

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'

/**
 * Show block with News, downloaded from API
 */
class NewsBlock extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			news: [],
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
			body: JSON.stringify({ ...body, _limit: 3 })
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({ news: response })
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){
		return(
			<div style={{ width: "100%", padding: "20px 10%", background: "#eee" }}>
				<Carousel
					autoPlay={false}
					interval={7000}
					animation={"fade"/*slide*/}
					navButtonsAlwaysVisible={false}
				>
					{ this.state.news.map( (item, i) => <Item key={i} item={item} /> ) }
				</Carousel>
			</div>
		)
	}
}

function Item(props)
{
    return (
        <Paper style={{ width: "calc(100% - 150px)", margin: "auto", padding: "0 20px", background: "#fff"}}> 
			<NavLink
				to={`/prak/page/${props.item.pageName}`}
				style={{ color: "black", textDecoration: "none", margin: "0 30px" }}>
    	        <h2>{props.item.title}</h2>
	            <p>{props.item.description}</p>
			</NavLink>
        </Paper>
    )
}

export default NewsBlock