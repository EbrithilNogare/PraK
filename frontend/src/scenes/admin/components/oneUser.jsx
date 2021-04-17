import React from "react"
import { withTranslation } from 'react-i18next'
import { withSnackbar } from 'notistack'

import { 
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core'

class OneUser extends React.Component {
	constructor(props){
		super(props)

		this.defaultState = {
			firstName: props.user.firstName,
			secondName: props.user.secondName,
			email: props.user.email,
			password: props.user.password,
			roleRead: props.user.role.read,
			roleWrite: props.user.role.write,
			roleExecute: props.user.role.execute,
			roleCms: props.user.role.cms,
		}

		this.state = {
			...this.defaultState,
			changed: false,
			removed: false,
		}
	}

	diff = () => {
		const d = {}
		if(this.state.firstName !== this.defaultState.firstName) d.firstName = this.state.firstName
		if(this.state.secondName !== this.defaultState.secondName) d.secondName = this.state.secondName
		if(this.state.email !== this.defaultState.email) d.email = this.state.email
		if(this.state.password !== this.defaultState.password) d.password = this.state.password
		
		if(this.state.roleRead !== this.defaultState.roleRead
			|| this.state.roleWrite !== this.defaultState.roleWrite
			|| this.state.roleExecute !== this.defaultState.roleExecute
			|| this.state.roleCms !== this.defaultState.roleCms
		)
		d.role = {
			read: this.state.roleRead,
			write: this.state.roleWrite,
			execute: this.state.roleExecute,
			cms: this.state.roleCms,
		}

		return d
	}

	handleChange = (e) => {
		if(e.target.type === "checkbox")
			this.setState({ [e.target.name]: e.target.checked })
		else
			this.setState({ [e.target.name]: e.target.value })

		this.setState({changed: true})
	}

	saveUser = () => {
		const diff = this.diff()
		const url = `/prak/api/user/${this.props.user._id}`

		console.info(`%cSaving user with id ${this.props.user._id}\n`, "background: #222; color: #bada55", diff)

		if(Object.keys(diff).length === 0 && diff.constructor === Object){
			console.error("nothing to save")
			this.props.enqueueSnackbar("Nic nebylo změněno", { variant: "error", autoHideDuration: 6000 })
			this.setState({changed:false})
			return
		}

		fetch(url, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(diff)
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			console.info("%cUser saved succesfuly\n", "background: #222; color: #bada55")
			this.props.enqueueSnackbar("Změny uloženy", { variant: "success", autoHideDuration: 6000 })
			this.setState({changed:false})
			let { changed, removed, ...defaultState } = this.state
			this.defaultState = defaultState
		})
		.catch((error) => {
			console.info("%cUser was not saved\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Ukládání neúspěšné", { variant: "error", autoHideDuration: 6000 })
		})
	}

	removeUser = () => {
		if(!window.confirm("Opravdu chcete uživatele smazat?")){
			console.info("%cRemove canceled", "background: #222; color: #bada55")
			return
		}

		const url = `/prak/api/user/${this.props.user._id}`

		console.info(`%cremove user ${this.props.user._id}`, "background: #222; color: #bada55")

		fetch(url, {
			method: 'DELETE',
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			console.info("%cUser removed succesful", "background: #222; color: #bada55")
			this.props.enqueueSnackbar("Uživatel odstraněn", { variant: "success", autoHideDuration: 6000 })
			this.setState({ removed: true })
		})
		.catch((error) => {
			console.info("%cUser removed unsuccesful\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Odstranění neúspěšné", { variant: "error", autoHideDuration: 6000 })
		})
	}

	render(){ 
		const { t } = this.props
		if(this.state.removed)
			return (<div/>)
		
		return(
		<div style={{margin:"5px", display: "flex", columnGap: "10px"}}>
			<TextField
				label={t("admin.firstName")}
				name="firstName"
				value={this.state.firstName}
				onChange={this.handleChange}
			/>
			<TextField
				label={t("admin.secondName")}
				name="secondName"
				value={this.state.secondName}
				onChange={this.handleChange}
			/>
			<TextField
				label={t("admin.email")}
				name="email"
				value={this.state.email}
				onChange={this.handleChange}
				style={{width:"300px"}}
			/>
			<TextField
				label={t("admin.password")}
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
			/>
			<FormControlLabel
				control={
				<Checkbox
					checked={this.state.roleRead}
					onChange={this.handleChange}
					name="roleRead"
					color="primary"
				/>
				}
				label={t("admin.read")}
			/>
			<FormControlLabel
				control={
				<Checkbox
					checked={this.state.roleWrite}
					onChange={this.handleChange}
					name="roleWrite"
					color="primary"
				/>
				}
				label={t("admin.write")}
			/>
			<FormControlLabel
				control={
				<Checkbox
					checked={this.state.roleExecute}
					onChange={this.handleChange}
					name="roleExecute"
					color="primary"
				/>
				}
				label={t("admin.execute")}
			/>
			<FormControlLabel
				control={
				<Checkbox
					checked={this.state.roleCms}
					onChange={this.handleChange}
					name="roleCms"
					color="primary"
				/>
				}
				label={t("admin.cms")}
			/>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				disabled={!this.state.changed}
				onClick={this.saveUser}
			>{t("admin.save")}</Button>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				onClick={this.removeUser}
			>{t("admin.remove")}</Button>
		</div>
	)}
}

const WithHooks = withTranslation()(withSnackbar(OneUser))
export default function TranslatedComponent(props) { return (
	<React.Suspense fallback="">
		<WithHooks {...props}/>
	</React.Suspense>
)}