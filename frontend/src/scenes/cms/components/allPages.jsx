import React from 'react'

import { NavLink } from 'react-router-dom'

import { Visibility, Edit } from '@material-ui/icons/'

import styles from './allPages.module.scss'

class AllPages extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pages: {},
        }
    }

    componentDidMount() {
        const url = '/prak/api/pages'
        const body = {}

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body, _limit: 1000 }),
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                this.parsePagers(response)
            })
            .catch((error) => {
                console.info(
                    '%cPages loading unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
            })
    }

    parsePagers = (response) => {
        const pages = {}

        response
            .sort((a, b) =>
                a.pageName.toLowerCase() > b.pageName.toLowerCase()
                    ? 1
                    : a.pageName.toLowerCase() === b.pageName.toLowerCase()
                    ? 0
                    : -1
            )
            .forEach((value, index) => {
                if (!pages[value.category]) pages[value.category] = []

                pages[value.category].push({
                    title: value.title,
                    pageName: value.pageName,
                    language: value.language,
                })
            })

        this.setState({ pages })
    }

    render() {
        return (
            <div className={styles.root}>
                {Object.keys(this.state.pages).map((value, key) => (
                    <div key={key}>
                        <h3>{value.toUpperCase()}</h3>
                        <div style={{ display: 'grid' }}>
                            {this.state.pages[value].map((value, key) => (
                                <div
                                    key={key}
                                    style={{
                                        marginLeft: '30px',
                                        height: '40px',
                                        lineHeight: '40px',
                                        display: 'grid',
                                        gridTemplateColumns:
                                            '1fr auto auto auto',
                                        columnGap: '50px',
                                    }}
                                >
                                    <span>{value.title}</span>
                                    <span>{value.language}</span>
                                    <NavLink
                                        to={`/prak/page/${value.pageName}`}
                                    >
                                        <Visibility
                                            style={{
                                                height: '100%',
                                                color: 'black',
                                            }}
                                        />
                                    </NavLink>
                                    <NavLink to={`/prak/cms/${value.pageName}`}>
                                        <Edit
                                            style={{
                                                height: '100%',
                                                color: 'black',
                                            }}
                                        />
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default AllPages
