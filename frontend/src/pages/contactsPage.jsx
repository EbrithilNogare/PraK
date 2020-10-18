import React from "react"

import {
	Button,
	Paper,
	TextField,
} from '@material-ui/core'

import styles from "./contactsPage.module.scss"


class ContactsPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			isLoaded: false,
			data: {}
		}
	}

	componentDidMount(){
		// todo load data from DB
		// fetch() ...

		// ! temp below
		this.setState({
            isLoaded: true,
            data: {}
		})
	}

	render(){
		return(
			<Paper className={styles.root}>
				<h1>Kontakty</h1>
				<p>Máte-li otázku, podnět či připomínku, kontaktujete nás prosím prostřednictvím kontaktního formuláře</p><br/>
				<TextField variant="outlined" label="Jméno" style={{width:"300px"}}/><br/><br/>
				<TextField variant="outlined" label="Email" style={{width:"300px"}}/><br/><br/>
				<TextField variant="outlined" style={{width:"100%"}} label="Zpráva" multiline rows={8}/><br/><br/>
				<Button variant="contained" style={{width:"150px"}}>Odeslat</Button><br/><br/><br/><br/>
				Kontaktovat můžete také koordinátora projektu ({"kohoutek" + String.fromCharCode(64) + "hiu.cas.cz"}) či jednotlivé řešitele.
			</Paper>
		)
	}
}

export default ContactsPage