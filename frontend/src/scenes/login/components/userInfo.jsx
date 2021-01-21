import React from "react"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from "react-cookie";
import { withSnackbar } from 'notistack'

import { 
	Button,
} from '@material-ui/core'

class UserInfo extends React.Component {
	static propTypes = {
	  cookies: instanceOf(Cookies).isRequired
	}

	constructor(props){
		super(props)
		
		this.Logout = this.Logout.bind(this)
	}

	Logout(){
		const sessionID = this.props.cookies.get("sessionID")
		const url = "api/auth/"+sessionID

		console.info("%cLogout\n", "background: #222; color: #bada55", sessionID)
		this.props.enqueueSnackbar("Odhlášení úspěšné", { variant: "success", autoHideDuration: 6000 })

		fetch(url, {
			method: 'DELETE',
		})
		.then(response => {
			if(!response.ok)
				throw response
		})
		.catch((error) => {
			console.error(error)
		})
		.finally(()=>{
			this.props.cookies.remove("userID", { path: "/" }); 
			this.props.cookies.remove("user", { path: "/" }); 
			this.props.cookies.remove("permission", { path: "/" }); 
			this.props.cookies.remove("sessionID", { path: "/" }); 
		})
	}

	render(){ 
		return(
		<div>
			<center><h1>Uživatelské rozhraní</h1></center>
			<p><b>ID:</b> {this.props.cookies.get("userID")}</p>
			<p><b>Přihlášený uživatel:</b> {this.props.cookies.get("user")}</p>
			<p><b>Práva: </b> </p>
			<ul>
				{this.props.cookies.get("permission") & 1 ? <li>Administrace</li> : <div/>}
				{this.props.cookies.get("permission") & 2 ? <li>Práce s rejstříky</li> : <div/>}
				{this.props.cookies.get("permission") & 4 ? <li>Prohlížení záznamů</li> : <div/>}
				{this.props.cookies.get("permission") & 8 ? <li>Redakční systém</li> : <div/>}
			</ul>
			<p><b>SessionID:</b> {this.props.cookies.get("sessionID")}</p>
			<Button 
				variant="contained" 
				color="primary" 
				type="submit"
				onClick={ this.Logout }
				style={ {width: "100%"} }
			>
				Odhlásit
			</Button>
		</div>
	)}
}

export default withCookies(withSnackbar(UserInfo));