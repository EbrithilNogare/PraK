import React, { Suspense } from "react"
import {
	NavLink
} from "react-router-dom";
import {
	Person
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n';

import styles from "./navBar.module.scss"

function NavBar() {
	const { t } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
	}
	return(
		<nav className={styles.navBar}>
			<NavLink exact={true} to="/prak" className={styles.logo}>
				<img src="/prak/images/logo_prameny_krkonos.svg" alt="logo"/>
			</NavLink>
			<div className={styles.social}>
				<NavLink to="/prak/search">
					<img src="/prak/images/lupa.svg" alt="lupa"/>
				</NavLink>
				<a href="https://www.facebook.com/Prameny-Krkono%C5%A1-116257540504030/">
					<img src="/prak/images/facebook.svg" alt="facebook"/>
				</a>
				<a href="https://www.instagram.com/pramenykrkonos/">
					<img src="/prak/images/instagram.svg" alt="instagram"/>
				</a>
				<span style={{cursor: "pointer"}} onClick={() => changeLanguage('cz')}>
					CZ
				</span>
				<span style={{cursor: "pointer"}} onClick={() => changeLanguage('de')}>
					DE
				</span>
				<span style={{cursor: "pointer"}} onClick={() => changeLanguage('en')}>
					EN
				</span>
				<NavLink to="/prak/login"><Person/></NavLink>
			</div>
			<div className={styles.menu}>
				<NavLink to="/prak/page/cz/news">{t("NavBar.news")}</NavLink>
				<div className={styles.dropdown}>
					<NavLink to="/prak/page/cz/about">{t("NavBar.about")}</NavLink>
					<div className={styles.dropdownContent}>
						<NavLink to="/prak/page/cz/team">{t("NavBar.team")}</NavLink>
						<NavLink to="/prak/page/cz/ourwork">{t("NavBar.ourwork")}</NavLink>
					</div>
				</div>
				<NavLink to="/prak/page/cz/partners">{t("NavBar.partners")}</NavLink>
				<NavLink to="/prak/contacts">{t("NavBar.contacts")}</NavLink>
				<div className={styles.dropdown}>
					<NavLink to="/prak/page/cz/shards">{t("NavBar.shards")}</NavLink>
					<div className={styles.dropdownContent}>
						<NavLink to="/prak/page/cz/topography">{t("NavBar.topography")}</NavLink>
						<NavLink to="/prak/page/cz/scientific_conference">Vědecká konference</NavLink>
						<NavLink to="/prak/page/cz/exhibition_of_the_giant_mountains_in_1938">Výstava Krkonoše v roce 1938</NavLink>
						<NavLink to="/prak/page/cz/collective_monographs">Kolektivní monografie</NavLink>
						<NavLink to="/prak/page/cz/expert_articles">Odborné články</NavLink>
						<NavLink to="/prak/page/cz/maps_with_professional_content">Mapy s odborným obsahem</NavLink>
						<NavLink to="/prak/page/cz/public_database_springs_of_the_giant_mountains">Veřejná databáze Prameny Krkonoš</NavLink>
						<NavLink to="/prak/page/cz/software">Software</NavLink>
					</div>
				</div>
			</div>
		</nav>
	)
}

// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function TranslatedComponent() {
	return (
	  <Suspense fallback="loading">
		<NavBar />
	  </Suspense>
	)
}