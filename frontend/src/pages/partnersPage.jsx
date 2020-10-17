import React from "react"

import {
	Paper,
} from '@material-ui/core'

import styles from "./partners.module.scss"


class PartnersPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			isLoaded: false,
			data: {
				main: [],
				more: [],
			},
		}
	}

	componentDidMount(){
		// todo load data from DB
		// fetch() ...

		// ! temp below
		this.setState({
            isLoaded: true,
            data: {
				main:[
					{name: "Historický ústav Akademie věd ČR", img: "imgUrl", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Et harum quidem rerum facilis est et expedita distinctio. Maecenas lorem. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui ofcia deserunt mollit anim id est laborum. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Aliquam in lorem sit amet leo accumsan lacinia. Donec quis nibh at felis congue commodo. Fusce tellus. Nulla est. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."},
					{name: "Matematicko-fyzikální fakulta Univezity Karlovy v Praze", img: "imgUrl", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Et harum quidem rerum facilis est et expedita distinctio. Maecenas lorem. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui ofcia deserunt mollit anim id est laborum. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Aliquam in lorem sit amet leo accumsan lacinia. Donec quis nibh at felis congue commodo. Fusce tellus. Nulla est. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."},
				],
				more:[
					{img: "imgURL", name: "Jméno organizace"},
					{img: "imgURL", name: "Jméno organizace"},
					{img: "imgURL", name: "Jméno organizace"},
					{img: "imgURL", name: "Jméno organizace"},
					{img: "imgURL", name: "Jméno organizace"},
					{img: "imgURL", name: "Jméno organizace"},
				]
			}
		})
	}

	render(){
		return(
			<Paper className={styles.root}>
				<h1>Partneři</h1>
				<p>Na realizaci projektu se podílí Historický ústav AV ČR, v.v.i. jako řešitel projektu a Matematicko-fyzikální fakulta UK v Praze jako další účastník projektu. Na projektu dále spolupracuje řada regionálních i centrálních institucí.</p>
				<div className={styles.main}>
					{this.state.data.main.map((value, key) => MainCard({value, key}))}
				</div>
				<h1>Další partneři spolupracující na projektu</h1>
				<div className={styles.more}>
					{this.state.data.more.map((value, key) => MoreCard({value, key}))}
				</div>
			</Paper>
		)
	}
}


function MainCard(props){
	return <div key={props.key} className={styles.mainCard}>
		<Paper className={styles.picture} style={{height:"100px"}}>{props.value.img}</Paper>
		<div className={styles.name}>{props.value.name}</div>
		<div className={styles.description}>{props.value.description}</div>
	</div>
}

function MoreCard(props){
	return <div key={props.key} className={styles.moreCard}>
		<Paper className={styles.picture} style={{height:"100px"}}>{props.value.img}</Paper>
		<div className={styles.name}>{props.value.name} {props.value.surname}</div>
	</div>
}
export default PartnersPage