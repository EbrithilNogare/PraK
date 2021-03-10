import React from "react"
import { NavLink } from "react-router-dom"

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'

import styles from "./news.module.scss"

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
			console.log(response);
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	render(){
		return(
			<div className={styles.NewsBlock}>
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
        <Paper className={styles.NewsBlockItem}>
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