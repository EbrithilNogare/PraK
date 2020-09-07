import React from "react"

import { 
	TextField,
	Card,
	CardContent,
	Typography,
} from '@material-ui/core'
import MaterialTable from 'material-table'

import styles from './corporation.module.scss'

class Corporation extends React.Component {
	constructor(props){
		super(props)
		
		this.state = { 
			schema:  {
				acronym: [],
				historical_name: [],
				other_name_form: [],
				following_name: [],
				side_part: [],
				characteristic: [],
				constitutive_standards: [],
				scope_standards: [],
				parent_corporation: [],
				part_of: [],
				precedent_corporation: [],
				related_country: [],
				owner_change: [],
				place_change: [],
				organisation_inclusion: [],
				change_parent_organisation: [],
				categorization: [],
				category: [],
				domain_scope: [],
				geographical_scope: [],
				logo: [],
				mark: [],
				flag: [],
				notes: [],
				record_sources: [],
				other_source: [],
				awards: [],
			}
		}	
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render(){
		return(
			<div className={styles.corporation}>
				<MaterialTable
					title="Jiný zdroj"
					columns={[
						{title:"Název", field:"name"},
						{title:"ID", field:"id"},
						{title:"Identifikátor hesla", field:"identificator"},
					]}
					data={this.state.schema.other_source}
					editable = {{
						onRowAdd: (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve()
									this.setState((prevState) => {
										const newState = prevState
										newState.schema.other_source.push(newData)
										return newState
									})
								}, 600)
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve()
									if (oldData) {
										this.setState((prevState) => {
											const newState = prevState
											newState.schema.other_source[newState.schema.other_source.indexOf(oldData)] = newData
											return newState
										})
									}
								}, 600)
							}),
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									setTimeout(() => {
									resolve()
									this.setState((prevState) => {
										const newState = prevState
										newState.schema.other_source.splice(newState.schema.other_source.indexOf(oldData),1)
										return newState
									})
									}, 600)
								}),
					}}
				/>		
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Název
						</Typography>
						<TextField label="Název"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Variantní označení
						</Typography>
						<TextField label="Akronym/zkratka"/><br/>
						<TextField label="Historická/dřívější forma jména"/><br/>
						<TextField label="Jiné označení"/><br/>
						<TextField label="Následující forma jména"/><br/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Části označení
						</Typography>
						<TextField label="Hlavní část"/>
						<TextField label="Vedlejší část"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Doplňky označení
						</Typography>
						<TextField label="Obecný doplněk"/>
						<TextField label="Geografický doplněk"/>
						<TextField label="Chronologický doplněk"/>
						<TextField label="Stručná charakteristika"/>
						<TextField label="Historie"/>
						<TextField label="Funkce"/>
						<TextField label="Normy konstitutivní"/>
						<TextField label="Normy - působnost původce"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
						Souřadnice
						</Typography>
						<TextField label="Souřadnice"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Vztahy
						</Typography>
						<TextField label="Nadřízená korporace"/>
						<TextField label="Je část"/>
						<TextField label="Zahrnuta v korporaci"/>
						<TextField label="Související země"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Vznik/ počátek existence
						</Typography>
						<TextField label="Zřízení, založení zakladatel"/>
						<TextField label="Ustanovující dokument"/>
						<TextField label="Geografický objekt v roli předchůdce"/>
						<TextField label="Zapsání díla"/>
						<TextField label="Událost"/>
						<TextField label="Odštěpení evidence existence - osoba"/>
						<TextField label="Ustanovující dokument"/>
						<TextField label="Geografický objekt v roli předchůdce"/>
						<TextField label="Chronologické zpřesnění"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Konec existence
						</Typography>
						<TextField label="Zrušení, likvidace, rozpuštění osoba/bytost která se podílela na zániku"/>
						<TextField label="Související dokument"/>
						<TextField label="Geografický objekt jako následník"/>
						<TextField label="Výmaz z evidence dilo/vytvor"/>
						<TextField label="Událost"/>
						<TextField label="Chronologické zpřesnění"/>
					</CardContent>
				</Card>
				
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Událost
						</Typography>
						<TextField label="Změna majitele, držitele"/>
						<TextField label="Přesun na jiné místo"/>
						<TextField label="Organizační začlenění"/>
						<TextField label="Změna nadřazené organizace"/>
						<TextField label="Ocenění"/>
						<TextField label="Udělení ocenění"/>
						<TextField label="Udělovatel"/>
					</CardContent>
				</Card>				
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Zařazení
						</Typography>
						<TextField label="Zařazení"/>
						<TextField label="Obor působnosti"/>
						<TextField label="Geografická působnosti"/>
						<TextField label="Charakteristika"/>
						<TextField label="Logo"/>
						<TextField label="Značka"/>
						<TextField label="Vlajka"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
						Poznámky
						</Typography>
						<TextField label="Poznámky"/>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<Typography variant="h4">
						Zdroje o heslu
						</Typography>
						<TextField label="Zdroje o heslu"/>
					</CardContent>
				</Card>					
			</div>
		)
	}
}

export default Corporation