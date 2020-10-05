import React from "react"

import { 
	TextField,
	Button,
	Paper,
} from '@material-ui/core'
import {
	withSnackbar,
} from 'notistack';

import {
	CorporationComboBox,
	CreationComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../comboBoxes'

import styles from './geographic.module.scss'

class Geographic extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {}	
	
		this.handleChange = this.handleChange.bind(this)
	}
	

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = event => {		
		event.preventDefault()
		const data = {}
		let errors = 0
		
		for(let element of event.target.elements)
			if(element.name && element.value !== ""){
				if(element.getAttribute("aria-invalid")==="true")
					{
						errors++
						console.warning(`Incorrect format of: ${element.name}`);
						this.props.enqueueSnackbar(`Incorrect format of: ${element.name}`, { variant: "warning" })
					}
				data[element.name] = element.hasAttribute("realvalue") ? element.getAttribute("realvalue") : element.value
			}

		if(errors>0){
			console.error(`Cannot send data, there is ${errors} errors`);
			this.props.enqueueSnackbar(`Cannot send data, there is ${errors} errors`, { variant: "error" })
			return
		}

		console.log(data)
		

		fetch("/prak/api/GeographicIndex",{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if(response.status === 500)
				throw response
			return response.json()
		})
		.then(response => {
			console.log(response)
			this.props.enqueueSnackbar(`Sending succesfull\nID: ${response.id}`, { variant: "success" })
		})
		.catch((error) => {
			console.error('Sending unsuccesfull:', error);
			if(error.status && error.status === 500) error.json().then(errorMessage =>{
				console.error("errorMessage from server:", errorMessage);
				this.props.enqueueSnackbar(errorMessage.details.message, { variant: "error" })
			})
			else
				this.props.enqueueSnackbar(`Sending unsuccesfull: ${error}`, { variant: "error" })
		})

	}


	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.doubledataBlock}>
					<h1>Nový záznam do Geografického rejstříku</h1>
				</Paper>			
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField name="other_source-name" label="Název"/>
					<TextField name="other_source-id" label="ID"/>
					<TextField name="other_source-identificator" label="Identifikátor hesla"/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Název</h2>
					<TextField required name="name" label="Název"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField name="acronym" label="Akronym/zkratka"/>
					<TextField name="historical_name" label="Historická/dřívější forma jména"/>
					<TextField name="other_name_form" label="Jiný tvar jména/označení"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField name="main_part" label="Hlavní část"/>
					<TextField name="other_part" label="Další část"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField name="general_complement" label="Obecný doplněk"/>
					<TextField name="geographical_complement" label="Geografický doplněk"/>
					<TextField name="chronological_complement" label="Chronologický doplněk"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<KeywordComboBox name="characteristic" label="Stručná charakteristika"/>
					<TextField name="description" label="Popis"/>
					<TextField name="history" label="Historie"/>
					<TextField name="" label="Elektronické umístění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<TextField name="coordinates" label="Souřadnice"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<GeographicComboBox name="partner_object" label="Partnerský geografický objekt"/>
					<PersonComboBox name="owner" label="Majitelé"/>
					<h2>Zahrnuta v korporaci</h2>
					<CorporationComboBox name="corporation_name" label="Název"/>
					<PersonComboBox name="corporation_owner" label="Majitel"/>
					<h2>Spojená entita</h2>
					<PersonComboBox name="related_person" label="Spojená entita"/>
					<CreationComboBox name="related_subject" label="Spojená entita"/>
					<SubjectComboBox name="related_event" label="Spojená entita"/>
					<CorporationComboBox name="related_corporation" label="Spojená entita"/>
					<GeographicComboBox name="superordinate" label="Nadřazený"/>
					<GeographicComboBox name="subordinate" label="Podřazený"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<PersonComboBox name="founding_person" label="Vznik_person"/>
					<CorporationComboBox name="founding_corporation" label="Vznik_corporation"/>
					<CreationComboBox name="founding_document" label="Vznik_document"/>
					<GeographicComboBox name="founding_place" label="Vznik_place"/>
					<SubjectComboBox name="first_mention_event" label="První písemná zmínka_event"/>
					<CreationComboBox name="first_mention_subject" label="První písemná zmínka_subject"/>
					<GeographicComboBox name="first_mention_place" label="První písemná zmínka_place"/>
					<TextField name="chronological_specification" label="Chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox name="cancellation_person" label="Zánik_person"/>
					<CorporationComboBox name="cancellation_corporation" label="Zánik_corporation"/>
					<CreationComboBox name="cancellation_document" label="Zánik_document"/>
					<GeographicComboBox name="cancellation_place" label="Zánik_place"/>
					<SubjectComboBox name="last_mention_event" label="Poslední písemná zmínka_event"/>
					<CreationComboBox name="last_mention_subject" label="Poslední písemná zmínka_subject"/>
					<GeographicComboBox name="last_mention_place" label="Poslední písemná zmínka_place"/>
					<GeographicComboBox name="owner_change" label="Změna majitele, držitele"/>
					<TextField name="chronological_specification" label="Chronologické zpřesnění"/>
					<TextField name="historical_milestones" label="Historické milníky"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Událost</h2>
					<CreationComboBox name="award" label="Ocenění"/>
					<SubjectComboBox name="event_award" label="Udělení ocenění"/>
					<PersonComboBox name="awarder_person" label="Udělovatel_person"/>
					<CorporationComboBox name="awarder_corporation" label="Udělovatel_corporation"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox name="category" label="Kategorie"/>
					<TextField name="characteristic" label="Charakteristika"/>
					<TextField name="arm" label="Erb"/>
					<TextField name="logo" label="Logo"/>
					<TextField name="mark" label="Značka"/>
					<TextField name="flag" label="Vlajka"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField name="notes" multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField name="record_sources" multiline/>
				</Paper>
				<Button type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(Geographic)