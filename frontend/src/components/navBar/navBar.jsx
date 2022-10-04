import React, { Suspense, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Person } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import styles from './navBar.module.scss'

function NavBar() {
    const { t, i18n } = useTranslation()
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }
    const [state, setState] = useState({ shards: [] })

    useEffect(() => {
        loadShards()
    }, [])

    /**
     * Loads list of pages with category "shards"
     */
    const loadShards = () => {
        const url = '/prak/api/pages'
        const body = { category: 'ourwork', language: 'cz' }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body, _limit: 50 }),
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                setState({ shards: response })
            })
            .catch((error) => {
                console.info(
                    '%cPages loading unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
            })
    }

    return (
        <nav className={styles.navBar}>
            <NavLink exact={true} to="/prak" className={styles.logo}>
                <img src="/prak/images/logo_prameny_krkonos.svg" alt="logo" />
            </NavLink>
            <div className={styles.social}>
                <NavLink to="/prak/search">
                    <img src="/prak/images/lupa.svg" alt="lupa" />
                </NavLink>
                <a href="https://www.facebook.com/Prameny-Krkono%C5%A1-116257540504030/">
                    <img src="/prak/images/facebook.svg" alt="facebook" />
                </a>
                <a href="https://www.instagram.com/pramenykrkonos/">
                    <img src="/prak/images/instagram.svg" alt="instagram" />
                </a>
                <span
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => changeLanguage('cz')}
                >
                    CZ
                </span>
                <span
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => changeLanguage('de')}
                >
                    DE
                </span>
                <span
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => changeLanguage('en')}
                >
                    EN
                </span>
                <NavLink to="/prak/login">
                    <Person />
                </NavLink>
            </div>
            <div className={styles.menu}>
                <NavLink to="/prak/pageCategory/news">
                    {t('NavBar.news')}
                </NavLink>
                <div className={styles.dropdown}>
                    <NavLink to="/prak/page/about">{t('NavBar.about')}</NavLink>
                    <div className={styles.dropdownContent}>
                        <NavLink to="/prak/page/team">
                            {t('NavBar.team')}
                        </NavLink>
                        <div className={styles.dropdown}>
                            <NavLink to="/prak/pageCategory/ourwork">
                                {t('NavBar.ourwork')}
                            </NavLink>
                            <div className={styles.dropdownContent}>
                                {state.shards.map((value, key) => (
                                    <NavLink
                                        key={key}
                                        to={`/prak/page/${value.pageName}`}
                                    >
                                        {value.title}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <NavLink to="/prak/page/partners">
                    {t('NavBar.partners')}
                </NavLink>
                <NavLink to="/prak/contacts">{t('NavBar.contacts')}</NavLink>
                {i18n.language === 'cz' && (
                    <div className={styles.dropdown}>
                        <span style={{ cursor: 'pointer' }}>
                            {t('NavBar.shards')}
                        </span>
                        <div className={styles.dropdownContent}>
                            <NavLink to="/prak/pageCategory/topography">
                                {t('NavBar.topography')}
                            </NavLink>
                            <NavLink to="/prak/page/from_history">
                                {t('NavBar.from_history')}
                            </NavLink>
                            <NavLink to="/prak/page/attractions">
                                {t('NavBar.attractions')}
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default function TranslatedComponent() {
    return (
        <Suspense fallback="">
            <NavBar />
        </Suspense>
    )
}
