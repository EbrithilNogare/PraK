import React from 'react'

import { Switch as RouterSwitch, Route } from 'react-router-dom'

import EditPage from './components/editPage'
import AllPages from './components/allPages'
import NewPage from './components/newPage'

import styles from './cmsScene.module.scss'

class CmsScene extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    <h1>Redakční systém</h1>
                </div>
                <RouterSwitch>
                    <Route
                        path="/prak/cms/:pageName"
                        render={({ match }) => (
                            <EditPage pageName={match.params.pageName} />
                        )}
                    />
                    <Route path="/prak/cms/">
                        <AllPages />
                        <NewPage />
                    </Route>
                </RouterSwitch>
            </div>
        )
    }
}

export default CmsScene
