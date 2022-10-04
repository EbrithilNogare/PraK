import React from 'react'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withSnackbar } from 'notistack'

import { TextField, Button } from '@material-ui/core'

import styles from './login.module.scss'

class Login extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    }

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, type = 'value') {
        this.setState({
            [event.target.name]: event.target[type],
        })
    }

    handleSubmit(event) {
        const { email, password } = this.state
        const url = '/prak/api/auth'
        const data = {
            email,
            password,
        }

        console.info('%cLogin\n', 'background: #222; color: #bada55', data)

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                const user =
                    response.firstName || response.secondName
                        ? (response.firstName || '') +
                          ' ' +
                          (response.secondName || '')
                        : response.email
                const permission =
                    8 * response.role.cms +
                    4 * response.role.read +
                    2 * response.role.write +
                    1 * response.role.execute
                console.info(
                    '%cLogin succesfull\n',
                    'background: #222; color: #bada55',
                    response
                )
                this.props.cookies.set('userID', response._id, {
                    path: '/',
                    expires: new Date(response.sessionExpiration),
                })
                this.props.cookies.set('user', user, {
                    path: '/',
                    expires: new Date(response.sessionExpiration),
                })
                this.props.cookies.set('permission', permission, {
                    path: '/',
                    expires: new Date(response.sessionExpiration),
                })
                this.props.cookies.set('sessionID', response.sessionID, {
                    path: '/',
                    expires: new Date(response.sessionExpiration),
                })
                this.props.enqueueSnackbar('Přihlašování úspěšné', {
                    variant: 'success',
                    autoHideDuration: 6000,
                })
            })
            .catch((error) => {
                console.info(
                    '%cLogin unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
                this.props.enqueueSnackbar('Přihlašování se nezdařilo', {
                    variant: 'error',
                    autoHideDuration: 6000,
                })
                this.setState({ password: '' })
            })

        event.preventDefault()
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <center>
                    <h1>Přihlášení</h1>
                </center>
                <center>
                    <img
                        src="images/logo.png"
                        alt="logo"
                        className={styles.logo}
                    ></img>
                </center>
                <form onSubmit={this.handleSubmit} className={styles.loginForm}>
                    <TextField
                        value={this.state.email}
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <TextField
                        value={this.state.password}
                        name="password"
                        label="Heslo"
                        type="password"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="secondary" type="submit">
                        Přihlásit
                    </Button>
                </form>
            </div>
        )
    }
}

export default withCookies(withSnackbar(Login))
