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
				<NavLink exact={true} to="/prak" className={styles.logo}>
					<img src="/prak/images/logo_prameny_krkonos.svg" alt="logo"/>
				</NavLink>
				<div className={styles.social}>
					<NavLink to="/prak/search">
						<img src="/prak/images/lupa.svg" alt="lupa"/>
					</NavLink>
					<NavLink to="/prak/page/cs/coming_soon">
						<img src="/prak/images/facebook.svg" alt="facebook"/>
					</NavLink>
					<NavLink to="/prak/page/cs/coming_soon">
						<img src="/prak/images/instagram.svg" alt="instagram"/>
					</NavLink>
					<NavLink to="/prak/page/cs/homepage">
						CZ
					</NavLink>
					<NavLink to="/prak/page/d/homepage">
						D
					</NavLink>
					<NavLink to="/prak/page/en/homepage">
						EN
					</NavLink>
				</div>
				<ul className={styles.menu}>
					<li><NavLink to="/prak/page/cs/about">O projektu</NavLink></li>
					<li><NavLink to="/prak/page/cs/team">Řešitelský tým</NavLink></li>
					<li><NavLink to="/prak/page/cs/ourwork">Výstupy</NavLink></li> 
					<li><NavLink to="/prak/page/cs/partners">Partneři</NavLink></li> 
					<li><NavLink to="/prak/contacts">Kontakty</NavLink></li> 
					<li><NavLink to="/prak/login">Administrace</NavLink></li> 
				</ul>
			</nav>
		)
	}
}

export default NavBar
