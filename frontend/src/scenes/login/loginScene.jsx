import React from "react"
import {
	NavLink
} from "react-router-dom";
import {withRouter} from 'react-router';

import { 
	Paper,
} from '@material-ui/core'

import Login from './components/login'
import Registration from './components/registration'

import styles from './loginScene.module.scss'

class LoginScene extends React.Component {
	render(){
		const renderVariants = {
			login:{render:(<Login/>), text: "Not registered? ", link:"/prak/registration", linkText:"Create an account"},
			registration:{render:(<Registration/>), text: "Already registered? ", link:"/prak/login", linkText:"Login"},
		}
		return(
		<div className={styles.loginScene}>
			<Paper className={styles.loginForm}>
				<center><h1>{this.props.variant.toUpperCase()}</h1></center>
				<center><img src="images/logo.png" alt="logo" className={ styles.logo }></img></center>
				{ renderVariants[this.props.variant].render }
				<center>
					{ renderVariants[this.props.variant].text }
					<NavLink to={ renderVariants[this.props.variant].link }>
					{ renderVariants[this.props.variant].linkText }
					</NavLink>
				</center>
			</Paper>
		</div>
	)}
}

export default withRouter(LoginScene)