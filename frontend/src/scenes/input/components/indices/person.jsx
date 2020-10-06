import React from "react"

import { 
	TextField,
	Button,
} from '@material-ui/core'

import { Pair } from '../../../../components/layout'
import Paper from '../../../../components/paper'

import styles from './parent.module.scss'

class Author extends React.Component {
	constructor(props){
		super(props)
		
		this.state = { 
			documentType: 0,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	render(){
		return(
			<div className={styles.person}>
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField label="Název"/>
					<TextField label="ID"/>
					<TextField label="Identifikátor hesla"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Biografická data</h2>
					<TextField label="Jméno"/>
					<TextField label="Příjmení"/>
					<TextField label="Rok narození"/>
					<TextField label="Rok úmrtí"/>
					<TextField label="Rozpis iniciál"/>
					<TextField label="Obecný doplněk "/>
					<TextField label="Římské číslice"/>
					<TextField label="Geografický doplněk"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField label="Původní jméno"/>
					<TextField label="Akronym/zkratka"/>
					<TextField label="Autorská šifra/novinářská značka"/>
					<TextField label="Církevní jméno"/>
					<TextField label="Jméno získané sňatkem"/>
					<TextField label="Historická podoba jména"/>
					<TextField label="Přímé pořadí"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Tituly</h2>
					<TextField label="Tituly"/>
					<TextField label="Datum"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Biografická poznámka</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Životopis</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Obor působnosti</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Pohlaví</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Příslušnost k zemi</h2>
					<TextField label="Místo narození"/>
					<TextField label="Místo skonu"/>
					<TextField label="Související země"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vyobrazení</h2>
					<TextField label="Rodiče"/>
					<TextField label="Sourozenci"/>
					<TextField label="Člen rodu/rodiny"/>
					<TextField label="Členství"/>
					<TextField label="Zaměstnání"/>
					<TextField label="Afiliace"/>
					<TextField label="Významná díla"/>
					<TextField label="Významné události"/>
					<TextField label="Uzavření manželství"/>
					<TextField label="Ukončení manželství"/>
					<TextField label="Studium"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField label="Erby"/>
					<TextField label="Fotografie"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField multiline/>
				</Paper>
				<Pair variant="text" color="primary" aria-label="Text primary button group">
					<Button variant="contained" color="primary">Uložit</Button>
					<Button variant="contained" color="primary">Nahrát</Button>
				</Pair>
			</div>
		)
	}
}

export default Author