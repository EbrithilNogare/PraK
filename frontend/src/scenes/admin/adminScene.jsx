import React from 'react'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { Paper } from '@material-ui/core'

import NewUser from './components/newUser'
import AllUsers from './components/allUsers'

import styles from './adminScene.module.scss'

class AdminScene extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    }

    render() {
        return (
            <div className={styles.adminScene}>
                <Paper className={styles.paper}>
                    <NewUser />
                </Paper>

                <Paper className={styles.paper}>
                    <AllUsers />
                </Paper>
            </div>
        )
    }
}

export default withCookies(AdminScene)
