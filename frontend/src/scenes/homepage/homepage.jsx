import React from 'react'

import NewsBlock from '../../components/NewsBlock'
import LoadPageFromDB from '../../components/loadPageFromDB'

import ChatBot from '../../components/chatBot'

import styles from './homepage.module.scss'

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={styles.Homepage}>
                <NewsBlock />
                <ChatBot></ChatBot>
                <LoadPageFromDB pageName={'homepage'} />
            </div>
        )
    }
}

export default Homepage
