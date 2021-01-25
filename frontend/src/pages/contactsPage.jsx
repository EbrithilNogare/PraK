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

	handleSubmit(event){
		/*eslint-disable */
		event.preventDefault()
		return
		
		const url = "/prak/api/mail"
		const data = {}

		console.info("%cMail sending\n", "background: #222; color: #bada55", data)

		fetch(url, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			console.info("%cMail sent succesfull\n", "background: #222; color: #bada55", response)
			this.props.enqueueSnackbar("Přihlašování úspěšné", { variant: "success", autoHideDuration: 6000 })
		})
		.catch((error) => {
			console.info("%cMail sent unsuccesful\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Přihlašování se nezdařilo", { variant: "error", autoHideDuration: 6000 })
		})

		event.preventDefault()
		/*eslint-enable */
	}

	render(){
		return(
			<Paper
				className={styles.root}
				component="form"
				onSubmit={this.handleSubmit}
			>
				<h1>Kontakty</h1>
				<p>Máte-li otázku, podnět či připomínku, kontaktujete nás prosím prostřednictvím kontaktního formuláře</p><br/>
				<TextField required variant="outlined" label="Jméno" style={{width:"300px"}}/><br/><br/>
				<TextField required variant="outlined" label="Email" style={{width:"300px"}}/><br/><br/>
				<TextField required variant="outlined" style={{width:"100%"}} label="Zpráva" multiline rows={8}/><br/><br/>
				<Button color="primary" variant="contained" type="submit" style={{width:"150px"}}>Odeslat</Button><br/><br/><br/><br/>
				Kontaktovat můžete také koordinátora projektu ({"kohoutek" + String.fromCharCode(64) + "hiu.cas.cz"}) či jednotlivé řešitele.
			</Paper>
		)
	}
}

export default ContactsPage