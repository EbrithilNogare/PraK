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
//	CreationComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
	SubmitterComboBox,
} from '../comboBoxes'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './keywordTypes.json'
import Multiplier from '../Multiplier'

class Keyword extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}

		this.indexURL = "keyword"
	}

	getTypeDefinition = fieldName => typeDefinitionFile.properties[fieldName]

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku klíčových slov</h1>
						: <h1>Nový záznam do Rejstříku klíčových slov</h1>
					}
				</Paper>
				<div className={styles.body}>
				<Paper className={styles.dataBlock}> <h2>Preferované označení</h2>
					<TextField {...this.createFieldProps("name_main_part")}/>
					<Multiplier><TextField {...this.createFieldProps("name_other_part")}/></Multiplier>
					<KeywordComboBox {...this.createFieldProps("general_complement")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
					<Multiplier>
						<TextField {...this.createFieldProps("other_language_name")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_other")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("synonyms")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_synonyms")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("inverted_wordorder_terms")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_inverted")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("spelling_variants")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_variants")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("foreign_language_descriptors")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_foreign_descriptors")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("form_descriptors")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_form_descriptors")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("other_name_form")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement_other")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Popis</h2>
					<TextField {...this.createFieldProps("definition")}/>
					<TextField {...this.createFieldProps("manual")}/>
					<TextField {...this.createFieldProps("history")}/>
					<TextField {...this.createFieldProps("electronical_location")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
					<Multiplier><KeywordComboBox {...this.createFieldProps("superordinate")}/></Multiplier>
					<Multiplier><KeywordComboBox {...this.createFieldProps("subordinate")}/></Multiplier>
					<Multiplier><KeywordComboBox {...this.createFieldProps("associative")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Počátek existence</h2>
					<PersonComboBox {...this.createFieldProps("founding_person")}/>
					<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
					<TextField {...this.createFieldProps("founding_subject")}/>
					<SubjectComboBox {...this.createFieldProps("founding_event")}/>
					<KeywordComboBox {...this.createFieldProps("founding_keyword")}/>
					<TextField {...this.createFieldProps("founding_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Konec existence</h2>
					<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
					<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
					<TextField {...this.createFieldProps("cancellation_subject")}/>
					<SubjectComboBox {...this.createFieldProps("cancellation_event")}/>
					<KeywordComboBox {...this.createFieldProps("cancellation_keyword")}/>
					<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Zařazení</h2>
					<Multiplier><KeywordComboBox {...this.createFieldProps("category")}/></Multiplier>
					<Multiplier><KeywordComboBox {...this.createFieldProps("domain")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("idc")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Poznámky</h2>
					<Multiplier><TextField {...this.createFieldProps("public_note")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("nonpublic_note")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
					<Multiplier>
						<TextField {...this.createFieldProps("other_source_name")}/>
						<TextField {...this.createFieldProps("other_source_id")}/>
						<TextField {...this.createFieldProps("other_source_identificator")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
					<Multiplier><TextField {...this.createFieldProps("record_sources")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("editor_note")}/></Multiplier>
					<SubmitterComboBox  {...this.createFieldProps("submitter")}/>
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Keyword))