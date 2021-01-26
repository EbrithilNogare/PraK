import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import {
	TextField,
	Button,
	Paper,
	Tooltip,
} from '@material-ui/core'
import {
	HelpOutline
} from '@material-ui/icons'

import {
	CorporationComboBox,
//	CreationComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
	SubmitterComboBox,
//	GeographicComboBox,
	StaticComboBox,
} from '../comboBoxes'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './keywordTypes.json'
import Multiplier from '../Multiplier'
import FoldablePaper from "../../components/FoldablePaper"
import UniqueTextField from "../../components/UniqueTextField"
import UploadFile from "../../components/UploadFile"

class Keyword extends IndexParent {
	constructor(props){
		super(props)

		this.state = {
			helpersVisible: false,
		}

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
					<Tooltip title={"Zobrazit / Schovat nápovědy"}>
						<HelpOutline className={styles.allHelpers} onClick={()=>this.setState({helpersVisible: !this.state.helpersVisible}) }/>
					</Tooltip>
				</Paper>
				<div className={styles.body}>
					<FoldablePaper className={styles.dataBlock}> <h2>Preferované označení</h2>
							<UniqueTextField {...this.createFieldProps("name_main_part")} uniqueSource="KeywordIndex" uniqueField="name_main_part"/>
						<Multiplier><TextField {...this.createFieldProps("name_other_part")}/></Multiplier>
						<KeywordComboBox {...this.createFieldProps("general_complement")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Variantní označení</h2>
						<Multiplier>
							<StaticComboBox {...this.createFieldProps("variant_type")}/>
							<TextField {...this.createFieldProps("variant_value")}/>
							<TextField {...this.createFieldProps("variant_chronological_complement")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Popis</h2>
						<TextField {...this.createFieldProps("definition")}/>
						<TextField {...this.createFieldProps("manual")}/>
						<TextField {...this.createFieldProps("history")}/>
						<TextField {...this.createFieldProps("electronical_location")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vztahy</h2>
						<Multiplier><KeywordComboBox {...this.createFieldProps("superordinate")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("subordinate")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("associative")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Počátek existence</h2>
						<PersonComboBox {...this.createFieldProps("founding_person")}/>
						<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
						<TextField {...this.createFieldProps("founding_subject")}/>
						<SubjectComboBox {...this.createFieldProps("founding_event")}/>
						<KeywordComboBox {...this.createFieldProps("founding_keyword")}/>
						<TextField {...this.createFieldProps("founding_chronological_specification")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Konec existence</h2>
						<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
						<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
						<TextField {...this.createFieldProps("cancellation_subject")}/>
						<SubjectComboBox {...this.createFieldProps("cancellation_event")}/>
						<KeywordComboBox {...this.createFieldProps("cancellation_keyword")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Zařazení</h2>
						<Multiplier><KeywordComboBox {...this.createFieldProps("category")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("domain")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("idc")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Poznámky</h2>
						<Multiplier><TextField {...this.createFieldProps("public_note")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("nonpublic_note")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
						<Multiplier>
							<TextField {...this.createFieldProps("other_source_name")}/>
							<TextField {...this.createFieldProps("other_source_id")}/>
							<TextField {...this.createFieldProps("other_source_identificator")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
						<Multiplier><TextField {...this.createFieldProps("record_sources")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("editor_note")}/></Multiplier>
						<SubmitterComboBox  {...this.createFieldProps("submitter")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Přílohy</h2>
						<Multiplier>
							<UploadFile {...this.createFieldProps("attachment_url")}/>
							<TextField {...this.createFieldProps("attachment_description")}/>
						</Multiplier>
					</FoldablePaper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Keyword))