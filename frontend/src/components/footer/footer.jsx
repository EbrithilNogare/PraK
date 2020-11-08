import React from "react"
import {
	NavLink
} from "react-router-dom";

import styles from "./footer.module.scss"

class Footer extends React.Component {
	render(){
		return(
			<div className={styles.footer}>
				<div>
					<p>Financování: Projekt je fnancován Ministerstvem kultury ČR z Programu aplikovaného výzkumu a vývoje národní a kulturní identity (NAKI II)</p>
					<p>Doba realizace: 2020-2022</p>
					<p>Kód: DG20P02OVV010</p>
				</div>

				<div>
					<h3>Staticke stranky</h3>
					<hr/>
					<ul>
						<li> <NavLink to="/prak/manual">Manual</NavLink> </li>
						<li> <NavLink to="/prak/about">About</NavLink> </li>
						<li> <NavLink to="/prak/team">Team</NavLink> </li>
						<li> <NavLink to="/prak/ourwork">Ourwork</NavLink> </li>
						<li> <NavLink to="/prak/partners">Partners</NavLink> </li>
						<li> <NavLink to="/prak/contacts">Contacts</NavLink> </li>
					</ul>
				</div>

				<div>
					<h3>Scenes</h3>
					<hr/>
					<ul>
						<li>
							<NavLink to="/prak/edit">EditScene</NavLink>
						</li>
					</ul>
				</div>

				<div>
					<h3>Input</h3>
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

export default Footer
