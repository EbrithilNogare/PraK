import React from "react"
import { withSnackbar } from 'notistack'
import { withRouter } from "react-router-dom";

import { 
	Button,
	TextField,
} from '@material-ui/core'

import styles from './allPages.module.scss'

class NewPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			pageName: "",
		}
	}

	createNewPage = () => {
		const pageName = this.state.pageName 
		const url = "/prak/api/pages"

		if(!(new RegExp("^[a-zA-Z0-9_]+$")).test(pageName)){
			console.error("pageName is invalid", pageName)
			this.props.enqueueSnackbar("Neplatné jméno stránky, použijte formát ^[a-zA-Z0-9_]+$", { variant: "error", autoHideDuration: 6000 })
			return
		}

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pageName })
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.props.history.push(`/prak/cms/${pageName}`)
		})
		.catch((error) => {
			console.info("%cPage creation failed\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Novou stránku se nepodařilo založit", { variant: "error", autoHideDuration: 6000 })
		})
	}

	handleChange = (e) => {
		if(e.target.type === "checkbox")
			this.setState({ [e.target.name]: e.target.checked })
		else
			this.setState({ [e.target.name]: e.target.value })
	}

	render(){ return(
		<div className={styles.root}>
			<TextField
				label="pageName"
				name="pageName"
				value={this.state.pageName}
				onChange={this.handleChange}
			/>
			<Button
				color="primary"
				variant="contained"
				onClick={this.createNewPage}
			>
				Vytvořit novou stránku
			</Button>
		</div>
	)}
}

export default withSnackbar(withRouter(NewPage))