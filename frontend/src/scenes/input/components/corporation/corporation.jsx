import React from "react"

import { 
	TextField,
	Button,
} from '@material-ui/core'

import { Pair } from '../../../../components/layout'
import Paper from '../../../../components/paper'

import styles from './corporation.module.scss'

class Corporation extends React.Component {
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
			<div className={styles.corporation}>
				<Paper className={styles.dataBlock}>
					<h2>jiny zdroj</h2>
					<TextField label="nazev"/>
					<TextField label="id"/>
					<TextField label="Identifikátor"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Název</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField label="akronym/zkratka"/>
					<TextField label="historická/dřívější forma jména"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField label="hlavní část"/>
					<TextField label="vedlejší část"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField label="obecný doplněk"/>
					<TextField label="geografický doplněk"/>
					<TextField label="chronologický doplněk"/>
					<TextField label="stručná charakteristika"/>
					<TextField label="historie"/>
					<TextField label="funkce"/>
					<TextField label="normy konstitutivní"/>
					<TextField label="normy - působnost původce"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<TextField label="nadřízená korporace"/>
					<TextField label="je část"/>
					<TextField label="zahrnuta v korporaci"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vznik/ počátek existence</h2>
					<TextField label="zřízení, založení"/>
					<TextField label="zapsání"/>
					<TextField label="odštěpení"/>
					<TextField label="chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<TextField label="zrušení, likvidace, rozpuštění"/>
					<TextField label="výmaz z evidence"/>
					<TextField label="chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Událost</h2>
					<TextField label="změna majitele, držitele"/>
					<TextField label="přesun na jiné místo"/>
					<TextField label="organizační začlenění"/>
					<TextField label="změna nadřazené organizace"/>
					<TextField label="ocenění"/>
					<TextField label="udělení ocenění"/>
					<TextField label="udělovatel"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<TextField label="zařazení"/>
					<TextField label="obor působnosti"/>
					<TextField label="geografická působnosti"/>
					<TextField label="charakteristika"/>
					<TextField label="logo"/>
					<TextField label="značka"/>
					<TextField label="vlajka"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField multiline/>
				</Paper>
				<Pair variant="text" color="primary" aria-label="text primary button group">
					<Button variant="contained" color="primary">Save</Button>
					<Button variant="contained" color="primary">Upload</Button>
				</Pair>
			</div>
		)
	}
}

export default Corporation