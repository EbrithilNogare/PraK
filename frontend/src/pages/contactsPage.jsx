import React from "react"
import { withTranslation } from 'react-i18next'

import {
	Button,
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
		const { t } = this.props
		return(
			<div
				className={styles.root}
				component="form"
				onSubmit={this.handleSubmit}
			>
				<h1>{t("contactPage.contacts")}</h1>
				<p>{t("contactPage.questions")}</p><br/>
				<TextField required label={t("contactPage.name")} style={{width:"100%"}}/><br/><br/>
				<TextField required label={t("contactPage.mail")} style={{width:"100%"}}/><br/><br/>
				<TextField required variant="outlined" style={{width:"100%"}} label={t("contactPage.message")} multiline rows={8}/><br/><br/>
				<Button color="primary" variant="contained" type="submit" style={{width:"300px", height:"60px"}}>{t("contactPage.send")}</Button><br/><br/><br/><br/>
				{t("contactPage.coordinator")}
			</div>
		)
	}
}

const WithHooks = withTranslation()(ContactsPage)
export default function TranslatedComponent(props) { return (
	<React.Suspense fallback="loading">
		<WithHooks {...props}/>
	</React.Suspense>
)}