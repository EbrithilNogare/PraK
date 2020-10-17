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

				<div/>

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
						<li> <NavLink to="/prak/input/metadata">metadata</NavLink> </li>
						<li> <NavLink to="/prak/input/corporation">corporation</NavLink> </li>
						<li> <NavLink to="/prak/input/creation">creation</NavLink> </li>
						<li> <NavLink to="/prak/input/geographic">geographic</NavLink> </li>
						<li> <NavLink to="/prak/input/keyword">keyword</NavLink> </li>
						<li> <NavLink to="/prak/input/person">person</NavLink> </li>
						<li> <NavLink to="/prak/input/subject">subject</NavLink> </li>
						<li> <NavLink to="/prak/input/family">family</NavLink> </li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Footer
