import { HelpOutline } from '@material-ui/icons'
import React from 'react'
import { Button } from '@material-ui/core'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { NavLink } from 'react-router-dom'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

import styles from './mapsScene.module.scss'

class MapsScene extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            path: '',
            loading: false,
        }

        this.defaultPath = 'http://quest.ms.mff.cuni.cz/prak/uploads/maps/'
    }

    componentDidMount() {
        this.setState({
            path: this.defaultPath + this.props.mapID,
            loading: true,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mapID !== this.props.mapID) {
            this.setState({
                path: this.defaultPath + this.props.mapID,
                loading: true,
            })
        }
    }

    imageLoaded = () => {
        this.setState({ loading: false })
    }

    handleChange = (e) => this.setState({ path: e.target.value })

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    <h1>Zobrazení map</h1>
                </div>
                <div className={styles.twoSidedButtons}>
                    <NavLink style={{ textDecoration: 'none' }} to="/prak/maps">
                        <Button>
                            <ArrowBackIos />
                            Vyhledávání map
                        </Button>
                    </NavLink>
                    <div />
                    <a
                        style={{ textDecoration: 'none' }}
                        href={this.defaultPath + this.props.mapID}
                    >
                        <Button>RAW image</Button>
                    </a>
                </div>
                <div className={styles.loadingTitle}>
                    {this.state.loading && 'Loading image, please wait'}
                </div>
                <div className={styles.imgContainer}>
                    <TransformWrapper>
                        <TransformComponent>
                            <img
                                onLoad={this.imageLoaded}
                                src={this.state.path}
                                decoding="async"
                                alt="large map"
                            />
                        </TransformComponent>
                    </TransformWrapper>
                    <div className={styles.helper}>
                        <HelpOutline /> <br />
                        Pro oddálení/přiblížení otáčejte kolečkem. <br />
                        Pro posun mapy klikněte a posuňte myš.
                    </div>
                </div>
            </div>
        )
    }
}

export default MapsScene
