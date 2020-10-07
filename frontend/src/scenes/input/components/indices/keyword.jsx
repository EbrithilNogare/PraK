import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { 
	TextField,
	Button,
	Paper,
} from '@material-ui/core'

import {
	CorporationComboBox,
	CreationComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../comboBoxes'

import IndexParent from "./indexParent"

import styles from './parent.module.scss'

class Keyword extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}	
		this.indexURL = "keyword"
	}

	
	getDataReady = (elements) => {
		const data = {}
		const errors = []
		
		for(let element of elements)
			if(element.name && element.value !== ""){
				if(element.getAttribute("aria-invalid")==="true")
					errors.push(`Incorrect format of: ${element.name}`)
				data[element.name] = element.hasAttribute("realvalue") ? element.getAttribute("realvalue") : element.value
			}
		return {data, errors}
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					<h1>Nový záznam do rejstříku Klíčových slov</h1>
				</Paper>
				<div className={styles.body}>			
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
					<TextField name="synonyms" label="Synonyma"/>
					<TextField name="inverted_wordorder_terms" label="Termíny v invertovaném slovosledu"/>
					<TextField name="spelling_variants" label="Pravopisné varianty "/>
					<TextField name="foreign_language_descriptors" label="Cizojazyčné deskriptory"/>
					<TextField name="form_descriptors" label="Tvar deskriptorů v singuláru"/>
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
					<TextField name="clarification" label="Zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField name="definition" label="Definice"/>
					<TextField name="manual" label="Pokyny k použití"/>
					<TextField name="history" label="Historie"/>
					<TextField name="electronical_location" label="Elektronické umístění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<KeywordComboBox name="superordinate" label="Nadřazený"/>
					<KeywordComboBox name="subordinate" label="Podřazený"/>
					<KeywordComboBox name="associative" label="Asociativní"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<PersonComboBox name="founding_person" label="Začátek_person"/>
					<CorporationComboBox name="founding_corporation" label="Začátek_corporation"/>
					<CreationComboBox name="founding_subject" label="Začátek_subject"/>
					<SubjectComboBox name="founding_event" label="Začátek_event"/>
					<KeywordComboBox name="founding_keyword" label="Začátek_keyword"/>
					<TextField name="chronological_specification" label="Chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox name="cancellation_person" label="Konec_person"/>
					<CorporationComboBox name="cancellation_corporation" label="Konec_corporation"/>
					<CreationComboBox name="cancellation_subject" label="Konec_subject"/>
					<SubjectComboBox name="cancellation_event" label="Konec_event"/>
					<KeywordComboBox name="cancellation_keyword" label="Konec_keyword"/>
					<TextField name="chronological_specification:" label="Chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox name="category" label="Kategorie"/>
					<KeywordComboBox name="domain" label="Obor"/>
					<TextField name="idc" label="Mdt"/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField name="notes" multiline/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField name="record_sources" multiline/>
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Keyword))