import React from "react"
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

		this.state = {
			firstName: props.user.firstName,
			secondName: props.user.secondName,
			email: props.user.email,
			password: props.user.password,
			roleRead: props.user.role.read,
			roleWrite: props.user.role.write,
			roleExecute: props.user.role.execute,
			roleCms: props.user.role.cms,
			changed: false,
			removed: false,
		}
	}

	diff = () => {
		const d = {}
		if(this.state.firstName !== this.props.user.firstName) d.firstName = this.state.firstName
		if(this.state.secondName !== this.props.user.secondName) d.secondName = this.state.secondName
		if(this.state.email !== this.props.user.email) d.email = this.state.email
		if(this.state.password !== this.props.user.password) d.password = this.state.password
		
		if(this.state.roleRead !== this.props.user.role.read
			|| this.state.roleWrite !== this.props.user.role.write
			|| this.state.roleExecute !== this.props.user.role.execute
			|| this.state.roleCms !== this.props.user.role.cms
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
			console.info("%cUser saving succesful\n", "background: #222; color: #bada55")
			this.props.enqueueSnackbar("Změny uloženy", { variant: "success", autoHideDuration: 6000 })
			this.setState({changed:false})
		})
		.catch((error) => {
			console.info("%cUser saving unsuccesful\n", "background: #222; color: #bada55", error)
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
		if(this.state.removed)
			return (<div/>)
		
		return(
		<div style={{margin:"5px", display: "flex", columnGap: "10px"}}>
			<TextField
				label={"firstName"}
				name="firstName"
				value={this.state.firstName}
				onChange={this.handleChange}
			/>
			<TextField
				label={"secondName"}
				name="secondName"
				value={this.state.secondName}
				onChange={this.handleChange}
			/>
			<TextField
				label={"email"}
				name="email"
				value={this.state.email}
				onChange={this.handleChange}
				style={{width:"300px"}}
			/>
			<TextField
				label={"password"}
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
				label="Read"
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
				label="Write"
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
				label="Execute (admin)"
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
				label="CMS"
			/>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				disabled={!this.state.changed}
				onClick={this.saveUser}
			>Save changes</Button>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				onClick={this.removeUser}
			>Remove user</Button>
		</div>
	)}
}

export default withSnackbar(OneUser);