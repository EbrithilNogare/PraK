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
				<Paper className={styles.doubledataBlock}>
					<h1>Nový záznam do rejstříku Klíčových slov</h1>
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
					<TextField name="synonyms" label="synonyma"/>
					<TextField name="inverted_wordorder_terms" label="termíny v invertovaném slovosledu"/>
					<TextField name="spelling_variants" label="pravopisné varianty "/>
					<TextField name="foreign_language_descriptors" label="cizojazyčné deskriptory"/>
					<TextField name="form_descriptors" label="tvar deskriptorů v singuláru"/>
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
					<TextField name="clarification" label="zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField name="definition" label="definice"/>
					<TextField name="manual" label="pokyny k použití"/>
					<TextField name="history" label="historie"/>
					<TextField name="electronical_location" label="elektronické umístění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<KeywordComboBox name="superordinate" label="nadřazený"/>
					<KeywordComboBox name="subordinate" label="podřazený"/>
					<KeywordComboBox name="associative" label="asociativní"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<PersonComboBox name="founding_person" label="začátek_person"/>
					<CorporationComboBox name="founding_corporation" label="začátek_corporation"/>
					<CreationComboBox name="founding_subject" label="začátek_subject"/>
					<SubjectComboBox name="founding_event" label="začátek_event"/>
					<KeywordComboBox name="founding_keyword" label="začátek_keyword"/>
					<TextField name="chronological_specification" label="chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox name="cancellation_person" label="konec_person"/>
					<CorporationComboBox name="cancellation_corporation" label="konec_corporation"/>
					<CreationComboBox name="cancellation_subject" label="konec_subject"/>
					<SubjectComboBox name="cancellation_event" label="konec_event"/>
					<KeywordComboBox name="cancellation_keyword" label="konec_keyword"/>
					<TextField name="chronological_specification:" label="chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox name="category" label="kategorie"/>
					<KeywordComboBox name="domain" label="obor"/>
					<TextField name="idc" label="mdt"/>
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

export default withSnackbar(withRouter(Keyword))