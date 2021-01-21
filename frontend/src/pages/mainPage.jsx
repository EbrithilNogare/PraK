import React from "react"
import {
	NavLink
} from "react-router-dom";
import {
	Button,
	Paper,
} from '@material-ui/core'

import styles from "./mainPage.module.scss"


class MainPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			isLoaded: false,
			data: {
				mainText: "",
				secondText: "",
				goals: [],
				output: [],
				news: [],
			}
		}
	}

	componentDidMount(){
		// todo load data from DB
		// fetch() ...

		// ! temp below
		this.setState({
            isLoaded: true,
            data: {
				mainText: "Prameny Krkonoš. Vývoj systému evidence, zpracování a prezentace pramenů k historii a kultuře Krkonoš a jeho využití ve výzkumu a edukaci",
				secondText: "Krkonoše jsou oblast poznamenaná ztrátou historické a kulturní paměti v důsledku poválečné radikální politické a sociální transformace společnosti. Snahy o poznání a analýzu jejich historické a kulturní i",
				goals: [
					"prostřednictvím veřejné specializované databáze (tj. báze analytických metadat) zpřístupnit informační prameny o historii a kulturní paměti Krkonoš (tzv. corcontica) bez ohledu na jejich fyzické umístění",
					"přispět ke specifckému metodologickému nahlížení na regionální dějiny z perspektivy informačních pramenů",
					"analyzovat v daném čase aktuální stav výzkumu",
					"Specializovaná databáze díky svému softwarovému řešení evidence, zpracování a prezentace na jednom místě shromáždí a analyticky popíše vybraná corcontica (včetně anotací akcentujících regionální specifka), uvede odkaz na místo jejich fyzického uložení, případně jejich dostupnost v digitální podobě.",
				],
				output: [
					"specializovaný software, umožňující efektivní vyhledávání corcontic vědcům i veřejnosti",
					"Výstava s kritickým katalogem seznamující veřejnost s problematikou řešenou projektem a možnostmi jeho využití",
					"Tři specializované mapy zobrazující jednak proměny Krkonoš v období let 1918-1992, jednak uložení corcontic a jejich typologii.",
					"Mezi vedlejší výsledky bude patřit zmiňovaná specializovaná databáze (S), uspořádání interdisciplinární vědecké konference s následnou kolektivní monografí",
				],
				news: [
					{img: "imgUrl", url:"", title: "Nadpis novinky", text: "Text novinky Text novinky Text novinky Text novinky Text Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky "},
					{img: "imgUrl", url:"", title: "Nadpis novinky", text: "Text novinky Text novinky Text novinky Text novinky Text Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky "},
					{img: "imgUrl", url:"", title: "Nadpis novinky", text: "Text novinky Text novinky Text novinky Text novinky Text Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky "},
					{img: "imgUrl", url:"", title: "Nadpis novinky", text: "Text novinky Text novinky Text novinky Text novinky Text Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky Text novinky "},
				],
			}
		})

	}

	render(){
		return(
			<Paper className={styles.root}>
				<div>
					<h1>O projektu</h1>
					{this.state.data.mainText}
					<Paper style={{width:"100%", height:"200px"}}/>
					{this.state.data.secondText}
					<h2>Záměry projektu</h2>
					<ul>
						{this.state.data.goals.map((value, key)=><li key={key}>{value}</li>)}
					</ul>
					<h2>Hlavní výstupy projektu</h2>
					<ul>
						{this.state.data.output.map((value, key)=><li key={key}>{value}</li>)}
					</ul>
					<Button color="primary"><NavLink to="/prak/page/cs/about">O projektu</NavLink></Button>
				</div>
				<div className={styles.grid}>
					{this.state.data.news.map((value, key)=>NewsCard({key, value}))}
					<Button color="primary">Více aktualit</Button>
				</div>
			</Paper>
		)
	}
}

function NewsCard(props){
	return <div key={props.key} className={styles.newsCard}>
		<Paper className={styles.picture}>{props.value.img}</Paper>
		<div className={styles.title}>{props.value.title}</div>
		<div className={styles.text}>{props.value.text}</div>
	</div>
}

export default MainPage