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
		this.props.enqueueSnackbar(`Vyberte rejstřík, vyplňte požadovaná pole, zmáčkněte vyhledat a poté klikněte na požadovaný záznam`, { variant: "info", autoHideDuration: 6000 })
	}

	search = (fast = false) => {
		const thisRequestVesion = this.request_v++
		this.setState({loading: true})
		fetch("api/" + this.state.indexer + (this.state.indexer === "metadata" ? "" : "Index"),{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({_limit: fast?5:100, ...this.description})
		})
		.then(response => {
			if(thisRequestVesion < this.newestRequest_v)
				Promise.reject(`Old request version: ${thisRequestVesion}`)
			this.newestRequest_v = thisRequestVesion
			return response.json()
		})
		.then(data => {
			console.info("%cFound: ", "background: #222; color: #bada55", data);
			this.setState({
				records: data.map(a => {
					const toReturn = {...a}
					toReturn.born_year = toReturn.author = toReturn.publishing_date = ""
					toReturn.id = a._id
					if(a.born_year) toReturn.born_year = a.born_year.year
					if(a.author && a.author.id) toReturn.author = a.author.id.name + " " + a.author.id.surname
					if(a.publishing_date && a.publishing_date[0] && a.publishing_date[0].date) toReturn.publishing_date = a.publishing_date[0].date
					return toReturn
				}),
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
								case "corporation":
								case "creation":
								case "geographic":
								case "keyword":
								case "subject":
								case "family": 
									template = [
										{field: "name_main_part", headerName: "Název", flex: 400},
									]
									break
								case "person":
									template = [
										{field: "name", headerName: "Název", flex: 400},
										{field: "surname", headerName: "Příjmení", flex: 400},
										{field: "born_year", headerName: "Rok narození", flex: 200},
									]
									break
								default:
							}
							this.setState({ indexer: e.target.value, template, records: null})
							this.description = {}
						} }
					>
						<MenuItem value={"metadata"}>Metadata</MenuItem>
						<MenuItem value={"corporation"}>Rejstřík korporací</MenuItem>
						<MenuItem value={"creation"}>Rejstřík dílo/výtvor</MenuItem>
						<MenuItem value={"geographic"}>Geografický rejstřík</MenuItem>
						<MenuItem value={"keyword"}>Rejstřík klíčových slov</MenuItem>
						<MenuItem value={"person"}>Rejstřík osob</MenuItem>
						<MenuItem value={"subject"}>Rejstřík událostí</MenuItem>
						<MenuItem value={"family"}>Rejstřík rodů</MenuItem>
					</Select>
					<Button
						variant="contained"
						color="primary"
						onClick = { ()=>this.search() }
					>
						Vyhledat
					</Button>
					{this.state.indexer === "metadata" && <div>
						<PersonComboBox
							label = "Hlavní autor"
							variant = "outlined"
							onChange = { e => {(this.description["author"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} }
						/>
						<TextField
							label = "Hlavní název"
							variant = "outlined"
							onChange = { e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<DateField
							label = "Datum vydání nebo vzniku"
							variant = "outlined"
							onChange = { e => {(this.description["publishing_date"] = e.target.value); this.search(true)} }
							fullWidth
						/>
					</div>}
					
					{(
						this.state.indexer === "corporation"
						|| this.state.indexer === "creation"
						|| this.state.indexer === "geographic"
						|| this.state.indexer === "keyword"
						|| this.state.indexer === "subject"
						|| this.state.indexer === "family"						
						) && <div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
							/>
					</div>}
					
					{this.state.indexer === "person" && <div>
						<TextField
							label = "Jméno"
							variant = "outlined"
							onChange = { e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<TextField
							label = "Příjmení"
							variant = "outlined"
							onChange = { e => {(this.description["surname"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<TextField
							label = "Rok narození"
							variant = "outlined"
							onChange = { e => {(this.description["born_year"] = e.target.value); this.search(true)} }
							type="number"
							fullWidth
						/>
					</div>}
					<div>
						<h3>Nápověda</h3>
						<b>Vyhledání všech záznamů:</b> nechte všechna pole prázdná a klikněte na Vyhledat <br/> <br/>
						<b>Interaktivní režim:</b> už během zadávání se ukáže 5 nejlepšich shod<br/> <br/>
						<b>Zobrazení záznamu:</b> klikněte kamkoliv na příslušný záznam v tabulce níže
					</div>
				</Paper>
				{ this.state.records !== null && <Paper style={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={this.state.records}
						columns={this.state.template}
						pageSize={5}
						onRowClick = { e => {
							console.info("%cShow: ", "background: #222; color: #bada55", e.data.id);
							this.props.history.push(`/prak/show/${this.state.indexer}/${e.data.id}`)
						} }
					/>
				</Paper> }
			</div>
		)
	}
}

export default withSnackbar(withRouter(ShowScene))