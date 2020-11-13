import React from 'react'
import {
	withRouter,
} from "react-router-dom"
import { withSnackbar } from 'notistack'
import {
	Paper,
} from '@material-ui/core'
import styles from './searchScene.module.scss'
import {
	MetadataComboBox,
	CorporationComboBox,
	CreationComboBox,
	FamilyComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../../components/comboBoxes'

class ShowScene extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			record: null
		}	
		this.uniqueId = 0
	}

	handleChange = (e, type) => {
		if(e.target.value)
			this.props.history.push(`/prak/show/${type}/${e.target.value}`)
	}

	componentDidMount(){
		this.props.enqueueSnackbar(`Vyberte rejstřík pro vyhledávání a vyplňte minimálně tři znaky`, { variant: "info", autoHideDuration: 6000 })
	}

	render(){
		return(
			<div className={styles.ShowScene}>
				<Paper className={styles.header}>
					<h1>Vyhledavátko</h1>
				</Paper>
				<Paper className={styles.body}>
					<MetadataComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "metadata")}}
					/>
					<CorporationComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "corporation")}}
					/>
					<CreationComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "creation")}}
					/>
					<GeographicComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "geographic")}}
					/>
					<KeywordComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "keyword")}}
					/>
					<PersonComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "person")}}
					/>
					<SubjectComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "subject")}}
					/>
					<FamilyComboBox
						label={" "}
						variant="outlined"
						onChange={e=>{this.handleChange(e, "family")}}
					/>
				</Paper>
			</div>
		)
	}
}

export default withSnackbar(withRouter(ShowScene))