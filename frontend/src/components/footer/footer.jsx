import React from 'react'
import { withTranslation } from 'react-i18next'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { NavLink } from 'react-router-dom'

import styles from './footer.module.scss'

class Footer extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    }

    render() {
        const { t } = this.props
        return (
            <div className={styles.footer}>
                <div>
                    <p>{t('footer.finance')}</p>
                    <p>{t('footer.realization')}</p>
                    <p>{t('footer.code')}</p>
                    <ul>
                        <li>
                            <NavLink to="/prak/login">
                                {t('footer.loggedUser')}{' '}
                                {this.props.cookies.get('user')}
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <img src="/prak/images/logo-mkcr.jpg" alt="logo" />
                    <img src="/prak/images/logo-hu.png" alt="logo" />
                    <img src="/prak/images/logo-mff.png" alt="logo" />
                </div>

                <div>
                    <ul>
                        <b>{t('footer.titleTools')}</b>
                        <hr />
                        <li>
                            {' '}
                            <NavLink to="/prak/search">
                                {t('footer.search')}
                            </NavLink>{' '}
                        </li>
                        {(this.props.cookies.get('permission') & 2) > 0 && (
                            <li>
                                {' '}
                                <NavLink to="/prak/upload">
                                    {t('footer.upload')}
                                </NavLink>{' '}
                            </li>
                        )}
                        {(this.props.cookies.get('permission') & 8) > 0 && (
                            <li>
                                {' '}
                                <NavLink to="/prak/cms">
                                    {t('footer.cms')}
                                </NavLink>{' '}
                            </li>
                        )}
                        {(this.props.cookies.get('permission') & 1) > 0 && (
                            <li>
                                {' '}
                                <NavLink to="/prak/admin">
                                    {t('footer.admin')}
                                </NavLink>{' '}
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    {(this.props.cookies.get('permission') & 2) > 0 && (
                        <ul>
                            <b>{t('footer.titleCreate')}</b>
                            <hr />
                            <li>
                                {' '}
                                <NavLink to="/prak/input/metadata">
                                    {t('footer.metadata')}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/corporation">
                                    {t('footer.corporation')}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/creation">
                                    {t('footer.creation')}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/geographic">
                                    {t('footer.geographic')}{' '}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/keyword">
                                    {t('footer.keyword')}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/person">
                                    {t('footer.person')}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/subject">
                                    {t('footer.subject')}
                                </NavLink>{' '}
                            </li>
                            <li>
                                {' '}
                                <NavLink to="/prak/input/family">
                                    {t('footer.family')}
                                </NavLink>{' '}
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

const WithHooks = withCookies(withTranslation()(Footer))
export default function TranslatedComponent() {
    return (
        <React.Suspense fallback="">
            <WithHooks />
        </React.Suspense>
    )
}
