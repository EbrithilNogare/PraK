import React from "react"

import { 
	TextField,
	Button,
} from '@material-ui/core'

import { Pair } from '../../../../components/layout'
import Paper from '../../../../components/paper'

import styles from './geographic.module.scss'

class Geographic extends React.Component {
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
			<div className={styles.geographic}>
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField name="other_source-name" label="Název"/>
					<TextField name="other_source-id" label="ID"/>
					<TextField name="other_source-identificator" label="Identifikátor hesla"/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Název</h2>
					<TextField name="name" label="Název"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField name="acronym" label="akronym/zkratka"/>
					<TextField name="historical_name" label="historická/dřívější forma jména"/>
					<TextField name="other_name_form" label="jiný tvar jména/označení"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField name="main_part" label="hlavní část"/>
					<TextField name="other_part" label="další část"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField name="general_complement" label="obecný doplněk"/>
					<TextField name="geographical_complement" label="geografický doplněk"/>
					<TextField name="chronological_complement" label="chronologický doplněk"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField name="characteristic" label="stručná charakteristika"/>
					<TextField name="description" label="popis"/>
					<TextField name="history" label="historie"/>
					<TextField name="" label="elektronické umístění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<TextField name="coordinates" label="Souřadnice"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<TextField name="partner_object" label="partnerský geografický objekt"/>
					<TextField name="owner" label="majitelé"/>
					<h2>zahrnuta v korporaci</h2>
					<TextField name="corporation_name" label="název"/>
					<TextField name="corporation_owner" label="majitel"/>
					<h2>spojená entita</h2>
					<TextField name="related_person" label="spojená entita"/>
					<TextField name="related_subject" label="spojená entita"/>
					<TextField name="related_event" label="spojená entita"/>
					<TextField name="related_corporation" label="spojená entita"/>
					<TextField name="superordinate" label="nadřazený"/>
					<TextField name="subordinate" label="podřazený"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<TextField name="founding_person" label="vznik_person"/>
					<TextField name="founding_corporation" label="vznik_corporation"/>
					<TextField name="founding_document" label="vznik_document"/>
					<TextField name="founding_place" label="vznik_place"/>
					<TextField name="first_mention_event" label="první písemná zmínka_event"/>
					<TextField name="first_mention_subject" label="první písemná zmínka_subject"/>
					<TextField name="first_mention_place" label="první písemná zmínka_place"/>
					<TextField name="chronological_specification" label="chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<TextField name="cancellation_person" label="zánik_person"/>
					<TextField name="cancellation_corporation" label="zánik_corporation"/>
					<TextField name="cancellation_document" label="zánik_document"/>
					<TextField name="cancellation_place" label="zánik_place"/>
					<TextField name="last_mention_event" label="poslední písemná zmínka_event"/>
					<TextField name="last_mention_subject" label="poslední písemná zmínka_subject"/>
					<TextField name="last_mention_place" label="poslední písemná zmínka_place"/>
					<TextField name="owner_change" label="změna majitele, držitele"/>
					<TextField name="chronological_specification" label="chronologické zpřesnění"/>
					<TextField name="historical_milestones" label="historické milníky"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Událost</h2>
					<TextField name="award" label="ocenění"/>
					<TextField name="event_award" label="udělení ocenění"/>
					<TextField name="awarder_person" label="udělovatel_person"/>
					<TextField name="awarder_corporation" label="udělovatel_corporation"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<TextField name="category" label="kategorie"/>
					<TextField name="characteristic" label="charakteristika"/>
					<TextField name="arm" label="erb"/>
					<TextField name="logo" label="logo"/>
					<TextField name="mark" label="značka"/>
					<TextField name="flag" label="vlajka"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField name="notes" multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField name="record_sources" multiline/>
				</Paper>
				<Pair variant="text" color="primary" aria-name="" label="Text primary button group">
					<Button variant="contained" color="primary">Uložit</Button>
					<Button variant="contained" color="primary">Nahrát</Button>
				</Pair>
			</div>
		)
	}
}

export default Geographic