import React from 'react'

import styles from './pageCategory.module.scss'
import { NavLink } from 'react-router-dom'

class PageCategoryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <NavLink
                to={`/prak/page/${this.props.data.pageName}`}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <div className={styles.PageCategoryView}>
                    <h3>{this.props.data.title}</h3>
                    <p style={{ fontSize: 'small' }}>
                        {new Date(
                            this.props.data.edits[0].date
                        ).toLocaleDateString()}
                    </p>
                    {this.props.data.description}
                </div>
            </NavLink>
        )
    }
}

export default PageCategoryView
