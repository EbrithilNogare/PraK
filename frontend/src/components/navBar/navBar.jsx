import React from "react"
import {
	NavLink
} from "react-router-dom";
import {
	Search
} from '@material-ui/icons';

import styles from "./navBar.module.scss"

class NavBar extends React.Component {
	render(){
		return(
			<nav className={styles.navBar}>
				<NavLink exact={true} to="/prak" className={styles.title}>PRAMENY KRKONOŠ</NavLink>
				<ul className={styles.userNavigation}>
					<li><NavLink to="/prak/about">O projektu</NavLink></li>
					<li><NavLink to="/prak/team">Řešitelský tým</NavLink></li>
					<li><NavLink to="/prak/ourwork">Výstupy</NavLink></li> 
					<li><NavLink to="/prak/partners">Partneři</NavLink></li> 
					<li><NavLink to="/prak/contacts">Kontakty</NavLink></li> 
				</ul>
				<Search className={styles.searchBar}/>
			</nav>
		)
	}
}

export default NavBar
