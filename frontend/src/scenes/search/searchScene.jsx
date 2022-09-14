import React from "react"
import {
	withRouter,
} from "react-router-dom"
import { withSnackbar } from 'notistack'
import {
	Paper,
	TextField,
	Button,
	Typography,
	IconButton,
	Chip,
} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import { DataGrid } from '@material-ui/data-grid';
import {
	PersonComboBox,
	KeywordComboBox,
	StaticComboBox,
} from '../../components/comboBoxes'
import typeDefinitionFile from '../../components/indices/metadataTypes.json'
import DateField from '../../components/validationTextFields/DateField'
import styles from './searchScene.module.scss'

class ShowScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			indexer: "metadata",
			records: [],
			template: [
				{field: "author", headerName: "Hlavní autor", flex: 400},
				{field: "name", headerName: "Hlavní název", flex: 400},
				{field: "publishing_date", headerName: "Datum vydání nebo vzniku", flex: 200, type: 'date'},
			],
			searchParams: this.createSearchParams([]),
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
		const url = `/api/metadata`

		this.setState({loading: true})
		fetch(url,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({_limit: fast?5:10000, ...this.description})
		})
		.then(response => {
			if(thisRequestVesion < this.newestRequest_v)
				Promise.reject(`Old request version: ${thisRequestVesion}`)
			this.newestRequest_v = thisRequestVesion
			return response.json()
		})
		.then(data => {
			const records = data.map(a => {
				const toReturn = {...a}
				toReturn.born_year = toReturn.author = toReturn.publishing_date = ""
				toReturn.id = a._id
				if(a.born_year) toReturn.born_year = a.born_year.year
				if(a.author && a.author.id) toReturn.author = a.author.id.name + " " + a.author.id.surname
				if(a.publishing_date && a.publishing_date[0] && a.publishing_date[0].date) toReturn.publishing_date = a.publishing_date[0].date
				return toReturn
			})
			console.info("%cFound: ", "background: #222; color: #bada55", records);
			this.setState({
				records,
				loading: false,
				searchParams: this.createSearchParams(records),
			})
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	}

	createSearchParams = (records) => {
		let searchParams = {};

		let properties = ["documentType", "language", "author", "publishing_date", "publish_country"];

		for(let property of properties){
			searchParams[property] = { _other: {count: 0, checked: true}};
			records.forEach((item)=>{
				let itemProperty = item[property]
				if(Array.isArray(itemProperty))
					itemProperty = itemProperty.join(", ")

				if(itemProperty !== undefined && itemProperty !== null && itemProperty !== ""){
					if(searchParams[property][itemProperty])
						searchParams[property][itemProperty].count++
					else
						searchParams[property][itemProperty] = { count:1, checked:true }
				} else {
					searchParams[property]["_other"].count++
				}
			})
		}

		console.log(searchParams);
		return(searchParams)
	}

	filterRecords = records => {
		return records.filter(record => {
			let passing = true;
			Object.entries(this.state.searchParams).forEach(([key, value]) => {
				let recordKey = record[key];
				if(Array.isArray(record[key]))
					recordKey = record[key].join(", ")
				
				if(recordKey === undefined || recordKey === null || recordKey.length === 0){
					if(!value["_other"].checked)
						passing = false;
					return;
				}

				if(!value[recordKey] || !value[recordKey].checked)
					passing = false;
			})
			return passing;
		})
	}

	render(){
		return(
			<div className={styles.ShowScene}>
				<Paper className={styles.header}>
					<h1>Vyhledavátko</h1>
				</Paper>
				<div className={styles.phasesBlock}>
					<Paper className={styles.body}>
						
					<Button
						variant="contained"
						color="secondary"
						onClick = { ()=>this.search() }
					>
						Vyhledat
					</Button>

						<Typography variant="h5">Autor - Název</Typography>
						<PersonComboBox
							label = { typeDefinitionFile.properties["author"].label }
							onChange = { e => {(this.description["author"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} }
						/>
						<TextField
							label = { typeDefinitionFile.properties["name"].label }
							onChange = { e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Klíčová slova</Typography>
						<KeywordComboBox
							label = { typeDefinitionFile.properties["keywords"].label }
							onChange = { e => {(this.description["keywords"] = e.target.value); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Rok vydání</Typography>
						<DateField
							label = { typeDefinitionFile.properties["publishing_date"].label }
							onChange = { e => {(this.description["publishing_date"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Místo vydání</Typography>
						<StaticComboBox
							label = { typeDefinitionFile.properties["publish_country"].label }
							onChange = { e => {(this.description["publish_country"] = e.target.value); this.search(true)} }
							options = { typeDefinitionFile.properties["publish_country"].options }
							fullWidth
						/>

						<Typography variant="h5">Jazyk</Typography>
						<StaticComboBox
							label = { typeDefinitionFile.properties["language"].label }
							onChange = { e => {(this.description["language"] = e.target.value); this.search(true)} }
							options = { typeDefinitionFile.properties["language"].options }
							fullWidth
						/>

						<Typography variant="h5">Typ dokumentu</Typography>
						<StaticComboBox
							label = "Typ dokumentu"
							onChange = { e => {(this.description["documentType"] = e.target.value); this.search(true)} }
							options = { typeDefinitionFile["types"] }
							fullWidth
						/>

						<Typography variant="h5">Standardní číslo</Typography>
						<TextField
							label = { typeDefinitionFile.properties["isbn"].label }
							onChange = { e => {(this.description["isbn"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<TextField
							label = { typeDefinitionFile.properties["issn"].label }
							onChange = { e => {(this.description["issn"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<Button
							variant="contained"
							color="secondary"
							onClick = { ()=>this.search() }
						>
							Vyhledat
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick = { () => window.location.reload(false) }
						>
							Smazat vše
						</Button>
					</Paper>
					

					<Paper className={styles.resultsBlock}>
						{false && JSON.stringify(this.filterRecords(this.state.records))}
						{true &&
						<DataGrid
							className={styles.cursorPoiter}
							rows={this.filterRecords(this.state.records)}
							columns={this.state.template}
							pageSize={5}
							onRowClick = { e => {
								console.info("%cShow: ", "background: #222; color: #bada55", e.id)
								this.props.history.push(`/prak/show/metadata/${e.id}`)
							} }
						/>}
					</Paper>

					
					<Paper className={styles.resultTagSelector}>
						{
							Object.entries(this.state.searchParams).map(([searchParamsKey, value])=> {
								if(Object.entries(value).length === 0)
									return null;

								return(
									<div key={searchParamsKey}>
										<h3>
											{typeDefinitionFile.properties[searchParamsKey]?.label ?? searchParamsKey}
											<Button
												onClick = {() => {
													this.setState(prevState => {
														Object.entries(prevState.searchParams[searchParamsKey]).forEach(([key, value], index) => value.checked = !value.checked) 
														return prevState
													})
												}}
											>Reverse</Button>
										</h3>
										<div className={styles.resultTag}>
											{ Object.entries(value)
												.sort(([itemAName,itemA], [itemBName,itemB]) => 
													itemA.count === itemB.count
														? 0
														: itemA.count < itemB.count
															? 1
															: -1)
												//.slice(0, 20)
												.map(([name, {count, checked}])=>(
													<Chip
														color={checked ? "secondary" : "default"}
														label={(<div style={{textDecoration: checked ? "none" : "line-through"}}> {name === "_other" ? "Ostatní" : name} <span className={styles.tagCount}>({count}x)</span></div>)} 
														key={name}
														className={styles.chip}
														onClick={()=>{this.setState((prevState)=>{
															prevState.searchParams[searchParamsKey][name].checked = !prevState.searchParams[searchParamsKey][name].checked; 
															return prevState;
														})}}>
													</Chip>
												))
											}
										</div>
									</div>
								)
							})
						}
					</Paper>
				</div>

				<Paper className={styles.helperBlock}>
					<h3>Nápověda</h3>
					<b>Vyhledání všech záznamů:</b> nechte všechna pole prázdná a klikněte na Vyhledat <br/> <br/>
					<b>Interaktivní režim:</b> už během zadávání se ukáže 5 nejlepších shod<br/> <br/>
					<b>Zobrazení záznamu:</b> klikněte kamkoliv na příslušný záznam v tabulce níže
				</Paper>

				<Paper className={styles.helperBlock}>
					<h3>Dotaz</h3>
					<pre>
						{JSON.stringify(this.description, null, 2)}
					</pre>
				</Paper>
			</div>
		)
	}
}

export default withSnackbar(withRouter(ShowScene))