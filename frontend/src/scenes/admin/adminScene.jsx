import React from "react"
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from "react-cookie"
import { 
	Paper,
} from '@material-ui/core'

import NewUser from "./components/newUser"

import styles from './adminScene.module.scss'

class AdminScene extends React.Component {
	static propTypes = {
	  cookies: instanceOf(Cookies).isRequired
	}

	render(){ return(
		<Paper className={styles.adminScene}>
			<NewUser/>
			<h2>Users</h2>
		</Paper>
	)}
}

export default withCookies(AdminScene)