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
			name: "",
			mail: "",
			message: "",
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const adminMail = "d@nogare.cz"
		window.open(`mailto:${encodeURIComponent(adminMail)}?subject=${encodeURIComponent("Message from " + this.state.name)}&body=${encodeURIComponent(this.state.message)}%0A%0AReply%20to:%20${encodeURIComponent(this.state.mail)}`)
	}

	
	handleChange = (event, type = "value") => {
		this.setState({
			[event.target.name]: event.target[type]
		})
	}

	render(){
		const { t } = this.props
		return(
			<form
				className={styles.root}
				component="form"
				onSubmit={this.handleSubmit}
			>
				<h1>{t("contactPage.contacts")}</h1>
				<p>{t("contactPage.questions")}</p><br/>
				<TextField 
					required
					label={t("contactPage.name")}
					style={{width:"100%"}}
					value={ this.state.name }
					name="name"
					onChange={this.handleChange}
					inputRef={input => input && input.focus()}
				/>
				<br/>
				<br/>
				<TextField
					required
					label={t("contactPage.mail")}
					style={{width:"100%"}}
					value={ this.state.mail }
					name="mail"
					onChange={this.handleChange}	
				/>
				<br/>
				<br/>
				<TextField
					required
					variant="outlined"
					style={{width:"100%"}}
					label={t("contactPage.message")}
					multiline
					rows={8}
					value={ this.state.message }
					name="message"
					onChange={this.handleChange}	
				/>
				<br/>
				<br/>
				<Button color="primary" variant="contained" type="submit" style={{width:"300px", height:"60px"}}>{t("contactPage.send")}</Button><br/><br/><br/><br/>
				{t("contactPage.coordinator")}
			</form>
		)
	}
}

const WithHooks = withTranslation()(ContactsPage)
export default function TranslatedComponent(props) { return (
	<React.Suspense fallback="">
		<WithHooks {...props}/>
	</React.Suspense>
)}