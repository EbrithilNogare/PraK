import React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

/**
 * Makes route unaccesible without right permissions
 */
function PrivateRoute({ children, ...rest }) {
    const [cookies] = useCookies(['permission'])
    const { privacyLevel, ...restProps } = { ...rest }

    return (
        <Route
            {...restProps}
            render={() => {
                return (cookies.permission & privacyLevel) > 0 ? (
                    children
                ) : (
                    <Redirect to="/prak/login" />
                )
            }}
        />
    )
}

export default withRouter(PrivateRoute)
