import React from 'react'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import Login from './components/login.jsx'
import UserInfo from './components/userInfo.jsx'

import { Paper } from '@material-ui/core'

import styles from './loginScene.module.scss'

class LoginScene extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    }

    render() {
        return (
            <Paper className={styles.loginScene}>
                {this.props.cookies.get('userID') ? <UserInfo /> : <Login />}
            </Paper>
        )
    }
}

export default withCookies(LoginScene)
