import React from "react"

import { 
	Select,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Typography,
	CardContent,
} from '@material-ui/core'

import { Pair } from '../../../../components/layout'
import Paper from '../../../../components/paper'

import styles from './person.module.scss'

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
					<h2>jiny zdroj</h2>
					<TextField label="nazev"/>
					<TextField label="id"/>
					<TextField label="Identifikátor"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>biograficka data</h2>
					<TextField label="jmeno"/>
					<TextField label="prijmeni"/>
					<TextField label="Rok narození"/>
					<TextField label="Rok úmrtí"/>
					<TextField label="rozpis iniciál"/>
					<TextField label="obecný doplněk "/>
					<TextField label="římské číslice"/>
					<TextField label="geografický doplněk"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField label="původní jméno"/>
					<TextField label="akronym/zkratka"/>
					<TextField label="autorská šifra/novinářská značka"/>
					<TextField label="církevní jméno"/>
					<TextField label="jméno získané sňatkem"/>
					<TextField label="historická podoba jména"/>
					<TextField label="přímé pořadí"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Tituly</h2>
					<TextField label="Tituly"/>
					<TextField label="datum"/>
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
					<TextField label="místo narození"/>
					<TextField label="místo skonu"/>
					<TextField label="související země"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vyobrazení</h2>
					<TextField label="rodiče"/>
					<TextField label="sourozenci"/>
					<TextField label="člen rodu/rodiny"/>
					<TextField label="členství"/>
					<TextField label="zaměstnání"/>
					<TextField label="affiliace"/>
					<TextField label="významná díla"/>
					<TextField label="významné události"/>
					<TextField label="uzavření manželství"/>
					<TextField label="ukončení manželství"/>
					<TextField label="studium"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField label="erby"/>
					<TextField label="fotografie"/>
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

export default Author