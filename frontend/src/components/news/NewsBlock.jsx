import React from "react"
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
		this.loadPage(this.props.pageName)
	}

	loadPage = (pageName) => {
		this.setState({news:[
			{
				title: {
					cz: "Title 1 cz",
					en: "Title 1 en",
					de: "Title 1 de",
				},
				image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_660/https://ventsmagazine.com/wp-content/uploads/2021/02/naews-660x330.jpg",
				text: {
					cz: "Text 1 cz",
					en: "Text 1 en",
					de: "Text 1 de",
				},
				description: {
					cz: "Description 1 cz",
					en: "Description 1 en",
					de: "Description 1 de",
				},
				edits:[{
					date: Date.now(),
					editor: "Unknown 1",
				}],
			},
			{
				title: {
					cz: "Title 2 cz",
					en: "Title 2 en",
					de: "Title 2 de",
				},
				image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_660/https://ventsmagazine.com/wp-content/uploads/2021/02/naews-660x330.jpg",
				text: {
					cz: "Text 2 cz",
					en: "Text 2 en",
					de: "Text 2 de",
				},
				description: {
					cz: "Description 2 cz",
					en: "Description 2 en",
					de: "Description 2 de",
				},
				edits:[{
					date: Date.now(),
					editor: "Unknown 2",
				}],
			},
		]})
		
		/*
		const url = `/prak/api/pages/cz/${pageName}`

		fetch(url, {
			method: 'GET',
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({html: response.cz || "--- Empty Page ---"})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
			this.setState({html: "Unable to load page"})
		})
		*/
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
			<img src={props.item.image} alt=""/>
			<div>
    	        <h2>{props.item.title.cz}</h2>
	            <p>{props.item.text.cz}</p>
			</div>
        </Paper>
    )
}

export default NewsBlock