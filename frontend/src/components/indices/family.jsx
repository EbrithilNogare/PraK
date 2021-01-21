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
//	CorporationComboBox,
//	CreationComboBox,
//	GeographicComboBox,
//	KeywordComboBox,
//	PersonComboBox,
//	SubjectComboBox,
	SubmitterComboBox,
} from '../comboBoxes'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './subjectTypes.json'
import Multiplier from '../Multiplier'
import FoldablePaper from "../../components/FoldablePaper"

class Family extends IndexParent {
	constructor(props){
		super(props)

		this.state = {
			helpersVisible: false,
		}

		this.indexURL = "family"
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
						? <h1>Editace záznamu v Rejstříku rodů</h1>
						: <h1>Nový záznam do Rejstříku rodů</h1>
					}
					<Tooltip title={"Schovat nápovědy"}>
						<HelpOutline className={styles.allHelpers} onClick={()=>this.setState({helpersVisible: !this.state.helpersVisible}) }/>
					</Tooltip>
				</Paper>
				<div className={styles.body}>
				<FoldablePaper className={styles.dataBlock}> <h2>Preferované označení</h2>
					<TextField {...this.createFieldProps("name_main_part")}/>
					<Multiplier><TextField {...this.createFieldProps("name_other_part")}/></Multiplier>
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
				<FoldablePaper className={styles.dataBlock}>
					<Multiplier><TextField {...this.createFieldProps("record_sources")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("editor_note")}/></Multiplier>
					<SubmitterComboBox  {...this.createFieldProps("submitter")}/>
				</FoldablePaper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Family))