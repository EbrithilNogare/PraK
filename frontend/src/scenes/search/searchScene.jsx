import React from 'react'
import {
	withRouter,
} from "react-router-dom"
import { withSnackbar } from 'notistack'
import {
	Paper,
	Select,
	MenuItem,
	TextField,
	Button,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import {
	PersonComboBox,
} from '../../components/comboBoxes'
import DateField from '../../components/validationTextFields/DateField'
import styles from './searchScene.module.scss'

class ShowScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			indexer: "metadata",
			records: null,
			template: [
				{field: "author", headerName: "Hlavní autor", flex: 400},
				{field: "name", headerName: "Hlavní název", flex: 400},
				{field: "publishing_date", headerName: "Datum vydání nebo vzniku", flex: 200, type: 'date'},
			],
		}
		
		this.description = {}

		this.request_v = 0
		this.newestRequest_v = 0
	}

	handleChange = (e, type) => {
		if(e.target.value)
			this.props.history.push(`/prak/show/${type}/${e.target.value}`)
	}

	componentDidMount(){
		this.props.enqueueSnackbar(`Vyberte rejstřík pro vyhledávání a vyplňte minimálně tři znaky`, { variant: "info", autoHideDuration: 6000 })
	}

	search = () => {
		const thisRequestVesion = this.request_v++
		this.setState({loading: true})
		fetch("api/" + this.state.indexer,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({_limit: 100, ...this.description})
		})
		.then(response => {
			if(thisRequestVesion < this.newestRequest_v)
				Promise.reject(`Old request version: ${thisRequestVesion}`)
			this.newestRequest_v = thisRequestVesion
			return response.json()
		})
		.then(data => {
			console.info("Found: ", data);
			this.setState({
				records: data.map(a=>{return {id:a._id, ...a}}),
				loading: false,
			})
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	}

	render(){
		return(
			<div className={styles.ShowScene}>
				<Paper className={styles.header}>
					<h1>Vyhledavátko</h1>
				</Paper>
				<Paper className={styles.body}>
					<Select
						labelId="simple-select-label"
						value = { this.state.indexer }
						variant = "outlined"
						onChange = { e => {
							let template = []
							switch(e.target.value){
								case "metadata": 
									template = [
										{field: "name", headerName: "Hlavní název", flex: 400},
									]
									break
								case "corporationIndex":
								case "creationIndex":
								case "geographicIndex":
								case "keywordIndex":
								case "subjectIndex":
								case "familyIndex": 
									template = [
										{field: "name_main_part", headerName: "Název", flex: 400},
									]
									break
								case "personIndex":
									template = [
										{field: "name", headerName: "Název", flex: 400},
										{field: "surname", headerName: "Příjmení", flex: 400},
										{field: "born_year", headerName: "Rok narození", flex: 200, type: 'number'},
									]
									break
							}
							this.setState({ indexer: e.target.value, template, records: null})
							this.description = {}
						} }
					>
						<MenuItem value={"metadata"}>Metadata</MenuItem>
						<MenuItem value={"corporationIndex"}>Rejstřík korporací</MenuItem>
						<MenuItem value={"creationIndex"}>Rejstřík dílo/výtvor</MenuItem>
						<MenuItem value={"geographicIndex"}>Geografický rejstřík</MenuItem>
						<MenuItem value={"keywordIndex"}>Rejstřík klíčových slov</MenuItem>
						<MenuItem value={"personIndex"}>Rejstřík osob</MenuItem>
						<MenuItem value={"subjectIndex"}>Rejstřík událostí</MenuItem>
						<MenuItem value={"familyIndex"}>Rejstřík rodů</MenuItem>
					</Select>
					<Button
						variant="contained"
						color="primary"
						onClick = { this.search }
					>
						Vyhledat
					</Button>
					{this.state.indexer === "metadata" && <div>
						<PersonComboBox
							label = "Hlavní autor"
							variant = "outlined"
							onChange = { e => (this.description["author"] = e.target.value) }
						/>
						<TextField
							label = "Hlavní název"
							variant = "outlined"
							onChange = { e => (this.description["name"] = `/${e.target.value}/`) }
							fullWidth
						/>
						<DateField
							label = "Datum vydání nebo vzniku"
							variant = "outlined"
							onChange = { e => (this.description["publishing_date"] = e.target.value) }
							fullWidth
						/>
					</div>}
					
					{(
						this.state.indexer === "corporationIndex"
						|| this.state.indexer === "creationIndex"
						|| this.state.indexer === "geographicIndex"
						|| this.state.indexer === "keywordIndex"
						|| this.state.indexer === "subjectIndex"
						|| this.state.indexer === "familyIndex"						
						) && <div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => (this.description["name_main_part"] = `/${e.target.value}/`) }
							fullWidth
							/>
					</div>}
					
					{this.state.indexer === "personIndex" && <div>
						<TextField
							label = "Jméno"
							variant = "outlined"
							onChange = { e => (this.description["name"] = `/${e.target.value}/`) }
							fullWidth
						/>
						<TextField
							label = "Příjmení"
							variant = "outlined"
							onChange = { e => (this.description["surname"] = `/${e.target.value}/`) }
							fullWidth
						/>
						<TextField
							label = "Rok narození"
							variant = "outlined"
							onChange = { e => (this.description["born_year"] = e.target.value) }
							type="number"
							fullWidth
						/>
					</div>}
				</Paper>
				{ this.state.records !== null && <Paper style={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={this.state.records}
						columns={this.state.template}
						pageSize={5}
					/>
				</Paper> }
			</div>
		)
	}
}

export default withSnackbar(withRouter(ShowScene))