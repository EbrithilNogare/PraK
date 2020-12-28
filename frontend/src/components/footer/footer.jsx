import React from "react"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from "react-cookie";
import {
	NavLink
} from "react-router-dom";

import styles from "./footer.module.scss"

class Footer extends React.Component {
	static propTypes = {
	  cookies: instanceOf(Cookies).isRequired
	}
	
	render(){
		return(
			<div className={styles.footer}>
				<div>
					<p>Financování: Projekt je financován Ministerstvem kultury ČR z Programu aplikovaného výzkumu a vývoje národní a kulturní identity (NAKI II)</p>
					<p>Doba realizace: 2020-2022</p>
					<p>Kód: DG20P02OVV010</p>
					<ul><li><NavLink to="/prak/login">
						Přihlášený uživatel: {this.props.cookies.get("user")}
					</NavLink></li></ul>
				</div>

				<div>
					<h3>Statické stránky</h3>
					<hr/>
					<ul>
						<li> <NavLink to="/prak/manual">Manuál</NavLink> </li>
						<li> <NavLink to="/prak/about">O projektu</NavLink> </li>
						<li> <NavLink to="/prak/team">Řesitelský tým</NavLink> </li>
						<li> <NavLink to="/prak/ourwork">Výstupy projektu</NavLink> </li>
						<li> <NavLink to="/prak/partners">Partneři</NavLink> </li>
						<li> <NavLink to="/prak/contacts">Kontakty</NavLink> </li>
					</ul>
				</div>

				<div>
					<h3>Scény</h3>
					<hr/>
					<ul>
						<li> <NavLink to="/prak/search">Vyhledávací rozhraní</NavLink> </li>
						<li> <NavLink to="/prak/edit">Editační rozhraní</NavLink> </li>
					</ul>
				</div>

				<div>
					<h3>Vkládací rozhraní</h3>
					<hr/>
					<ul>
						<li> <NavLink to="/prak/input/metadata">Metadata</NavLink> </li>
						<li> <NavLink to="/prak/input/corporation">Rejstřík korporací</NavLink> </li>
						<li> <NavLink to="/prak/input/creation">Rejstřík dílo/výtvor</NavLink> </li>
						<li> <NavLink to="/prak/input/geographic">Geografický rejstřík </NavLink> </li>
						<li> <NavLink to="/prak/input/keyword">Rejstřík klíčových slov</NavLink> </li>
						<li> <NavLink to="/prak/input/person">Rejstřík osob</NavLink> </li>
						<li> <NavLink to="/prak/input/subject">Rejstřík událostí</NavLink> </li>
						<li> <NavLink to="/prak/input/family">Rejstřík rodů</NavLink> </li>
					</ul>
				</div>
			</div>
		)
	}
}

export default withCookies(Footer)
