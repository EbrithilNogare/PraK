import React from "react"
import { withSnackbar } from 'notistack'

import { 
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core'

import styles from './newUser.module.scss'

class NewUser extends React.Component {
	constructor(props){
		super(props)

		this.emptyUser = {
			email: "",
			password: "",
			roleRead: true,
			roleWrite: false,
			roleExecute: false,
			roleCms: false,
			firstName: "",
			secondName: "",
		}

		this.state = {...this.emptyUser}
	}

	handleChange = (e) => {
		if(e.target.type === "checkbox")
			this.setState({ [e.target.name]: e.target.checked })
		else
			this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = (e) => {
		const url = "/prak/api/user"
		const newUser = {
			email: this.state.email,
			password: this.state.password,
			role: {
				read: this.state.roleRead,
				write: this.state.roleWrite,
				execute: this.state.roleExecute,
				cms: this.state.roleCms,
			},
			firstName: this.state.firstName === "" ? undefined : this.state.firstName,
			secondName: this.state.secondName === "" ? undefined : this.state.secondName,
		}

		console.info("%cCreate user\n", "background: #222; color: #bada55", newUser)

		fetch(url, {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState(this.emptyUser)
			this.props.enqueueSnackbar("Účet úspěšně založen", { variant: "success", autoHideDuration: 6000 })
		})
		.catch((error) => {
			console.info("%cUser creation unsuccesful\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Chyba při zakládání účtu", { variant: "error", autoHideDuration: 6000 })
			this.setState({ password: "" })
		})

		e.preventDefault()
	}

	render(){ return(
		<form onSubmit={this.handleSubmit} className={styles.root}>
			<h2>Add new User</h2>
			<div>
				<TextField
					label="Email"
					name="email"
					value={this.state.email}
					onChange={this.handleChange}
					required
				/>
				<br/>
				<TextField
					label="Password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
					required
				/>
			</div>
			<Button
				variant="contained"
				color="primary"
				onClick={()=>{
					this.setState({password: Math.random().toString(36).substring(2)})
				}}
			>Generate secure password</Button>
			<div>
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
				<br/>
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
				<br/>
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
				<br/>
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
			</div>
			<div>
				<TextField
					label="FirstName"
					name="firstName"
					value={this.state.firstName}
					onChange={this.handleChange}
				/>
				<br/>
				<TextField
					label="SecondName"
					name="secondName"
					value={this.state.secondName}
					onChange={this.handleChange}
				/>
			</div>
			<Button
				variant="contained"
				color="primary"
				type="submit"
			>Create new user</Button>
		</form>
	)}
}

export default withSnackbar(NewUser);