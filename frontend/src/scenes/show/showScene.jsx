import React from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { withCookies } from 'react-cookie'
import {
    BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
} from 'react-router-dom'
import {
    Paper,
    Grid,
    Button,
    Switch,
    FormControlLabel,
} from '@material-ui/core'
import { TreeView } from '@material-ui/lab'
import { ExpandMore, ChevronRight } from '@material-ui/icons'
import styles from './showScene.module.scss'

import corporationTypes from '../../components/indices/corporationTypes.json'
import creationTypes from '../../components/indices/creationTypes.json'
import familyTypes from '../../components/indices/familyTypes.json'
import geographicTypes from '../../components/indices/geographicTypes.json'
import keywordTypes from '../../components/indices/keywordTypes.json'
import metadataTypes from '../../components/indices/metadataTypes.json'
import personTypes from '../../components/indices/personTypes.json'
import subjectTypes from '../../components/indices/subjectTypes.json'
import sortingPriority from './sortingPriority.json'

class ShowScene extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            record: undefined,
            translatedRecord: undefined,
            translated: true,
            expanded: [],
        }
        this.uniqueId = 0
        this.initExpanded = []
    }

    getRecord = (type, id) => {
        if (this.state.record !== undefined) return
        const url =
            window.location.hostname === 'localhost'
                ? 'http://localhost:50080/prak/api/'
                : '/prak/api/'

        fetch(`${url}${type}${type === 'metadata' ? '' : 'index'}/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.info(
                    `%cReceived data:\n`,
                    'background: #222; color: #bada55',
                    data
                )
                const tmp = this.translateRecord(data, type)
                this.setState({
                    record: data,
                    translatedRecord: tmp,
                    treeViewItems: this.recursiveTreeItem(tmp, 0),
                    expanded: this.initExpanded,
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    sortingFunction = (a, b) => {
        let aVal = sortingPriority.indexOf(a)
        if (aVal === -1) aVal = 1000
        let bVal = sortingPriority.indexOf(b)
        if (bVal === -1) bVal = 1000
        return a - b
    }

    translateRecord = (record, type) => {
        if (!this.state.translated) return record

        let types
        switch (type) {
            case 'corporation':
                types = corporationTypes
                break
            case 'creation':
                types = creationTypes
                break
            case 'family':
                types = familyTypes
                break
            case 'geographic':
                types = geographicTypes
                break
            case 'keyword':
                types = keywordTypes
                break
            case 'metadata':
                types = metadataTypes
                break
            case 'person':
                types = personTypes
                break
            case 'subject':
                types = subjectTypes
                break
            default:
                console.error('incompatible type: ', type)
        }

        if (record.documentType != null)
            record.documentType = types.types[record.documentType]

        return this.translateSubRecord(record, types.properties, '')
    }

    translateSubRecord = (record, types, path) => {
        if (record instanceof Array)
            return record.map((value) =>
                this.translateSubRecord(value, types, path + '[%]')
            )

        if (!(record instanceof Object)) return record

        path = path[0] === '.' ? path.substring(1) : path
        const translatedRecord = {}
        Object.entries(record).forEach((entry) => {
            const [key, value] = entry
            const newKey = this.findBySchema(
                (path === '' ? path : path + '.') +
                    key +
                    (value instanceof Array ? '[%]' : ''),
                types
            )
            if (newKey) {
                if (translatedRecord[newKey.label]) newKey.label += ' '
                translatedRecord[newKey.label] = this.translateSubRecord(
                    value,
                    types,
                    path + '.' + key
                )
            } else {
                key !== '_id' &&
                    console.error('translation was not found for: ', {
                        key,
                        path:
                            (path === '' ? path : path + '.') +
                            key +
                            (value instanceof Array ? '[%]' : ''),
                    })
                translatedRecord[key] = value
            }
        })
        return translatedRecord
    }

    findBySchema = (schema, types) => {
        return Object.values(types).find((element) => element.schema === schema)
    }

    componentDidMount() {
        const splitedHref = window.location.href.split('/')
        if (splitedHref[splitedHref.length - 3] !== 'show') return
        this.getRecord(
            splitedHref[splitedHref.length - 2],
            splitedHref[splitedHref.length - 1]
        )
    }

    recursiveTreeItem = (nodes) => {
        if (Array.isArray(nodes)) {
            const childs = nodes
                .map((value, key) => {
                    if (value == null || value === '') return null
                    if (typeof value === 'object') {
                        const childs = this.recursiveTreeItem(value)
                        return childs != null ? (
                            <li key={key}>{childs}</li>
                        ) : null
                    } else return <li key={key}>{value}</li>
                })
                .filter((child) => child != null && child !== '')
            if (childs.length === 0) return null
            return <ul>{childs}</ul>
        } else if (typeof nodes === 'object' && nodes !== null) {
            const childs = Object.keys(nodes)
                .map((value, key) => {
                    if (
                        nodes[value] == null ||
                        nodes[value].length === 0 ||
                        nodes[value] === ''
                    ) {
                        return null
                    }
                    if (
                        typeof nodes[value] === 'object' &&
                        nodes[value] != null
                    ) {
                        const child = this.recursiveTreeItem(nodes[value])
                        return child ? (
                            <div key={key}>
                                <b>{value}</b>
                                <div className={styles.leftOffset}>{child}</div>
                            </div>
                        ) : null
                    } else {
                        if (value[0] === '_') return null
                        return (
                            <div key={key}>
                                <b>{value + ': '}</b>
                                {nodes[value]}{' '}
                            </div>
                        )
                    }
                })
                .filter((item) => item != null)
            return childs.length === 0 ? null : childs
        } else {
            return nodes !== '' && nodes != null ? (
                <div key={nodes}>{nodes}</div>
            ) : null
        }
    }

    handleEdit = (e, type, id) => {
        this.props.history.push(`/prak/edit/${type}/${id}`)
    }

    handleRemove = (e, type, id) => {
        console.info(
            `%cRemove record "${id}" from ${type} collection`,
            'background: #222; color: #bada55'
        )

        if (!window.confirm('Opravdu chcete záznam smazat?')) {
            console.info(
                '%cRemove canceled',
                'background: #222; color: #bada55'
            )
            return
        }

        fetch(`/prak/api/${type}${type === 'metadata' ? '' : 'index'}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 500) throw response
                return response.json()
            })
            .then((response) => {
                console.info(
                    '%cResponse:\n',
                    'background: #222; color: #bada55',
                    response
                )
                this.props.enqueueSnackbar(`Removed succesfully\n`, {
                    variant: 'success',
                    autoHideDuration: 6000,
                })
                this.setState({ record: null, translatedRecord: null })
            })
            .catch((error) => {
                console.error('Removing unsuccesful:', error)

                if (error.status && error.status === 500)
                    error.json().then((errorMessage) => {
                        console.error('errorMessage from server:', errorMessage)
                        if (errorMessage.details.message)
                            this.props.enqueueSnackbar(
                                errorMessage.details.message,
                                {
                                    variant: 'error',
                                    autoHideDuration: 6000,
                                }
                            )
                        if (
                            errorMessage.details.code &&
                            (errorMessage.details.code === 11000 ||
                                errorMessage.details.code === 11001)
                        )
                            this.props.enqueueSnackbar(
                                `duplicite error at: ${JSON.stringify(
                                    errorMessage.details.keyValue
                                )}`,
                                { variant: 'error', autoHideDuration: 6000 }
                            )
                    })
                else
                    this.props.enqueueSnackbar(
                        `Removing unsuccesful: ${error}`,
                        {
                            variant: 'error',
                            autoHideDuration: 6000,
                        }
                    )
            })
    }

    translate(en) {
        switch (en) {
            case 'metadata':
                return 'Záznam z rejstříku metadat'
            case 'corporation':
                return 'Záznam z rejstříku korporací'
            case 'creation':
                return 'Záznam z rejstříku dílo/výtvor'
            case 'geographic':
                return 'Záznam z reografického rejstříku'
            case 'keyword':
                return 'Záznam z rejstříku klíčových slov'
            case 'person':
                return 'Záznam z rejstříku osob'
            case 'subject':
                return 'Záznam z rejstříku událostí'
            case 'family':
                return 'Záznam z rejstříku rodů'
            default:
                return en
        }
    }

    render() {
        return (
            <div className={styles.ShowScene}>
                <Router>
                    <RouterSwitch>
                        <Route
                            path="/prak/show/:type/:id"
                            render={({ match }) => (
                                <div>
                                    <Paper className={styles.header}>
                                        <h1>
                                            {this.translate(match.params.type)}
                                        </h1>
                                    </Paper>
                                    <Paper className={styles.body}>
                                        {this.state.record === null &&
                                            'Záznam nenalezen, nebo smazán'}
                                        <TreeView
                                            defaultCollapseIcon={<ExpandMore />}
                                            defaultExpandIcon={<ChevronRight />}
                                            expanded={this.state.expanded}
                                            onNodeToggle={(event, expanded) =>
                                                this.setState({ expanded })
                                            }
                                        >
                                            {this.state.treeViewItems}
                                        </TreeView>
                                    </Paper>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={this.state.translated}
                                                onChange={(e) =>
                                                    this.setState({
                                                        translated:
                                                            e.target.checked,
                                                        treeViewItems:
                                                            this.recursiveTreeItem(
                                                                e.target.checked
                                                                    ? this.state
                                                                          .translatedRecord
                                                                    : this.state
                                                                          .record,
                                                                0
                                                            ),
                                                    })
                                                }
                                            />
                                        }
                                        label="Překládat databázové názvy"
                                    />

                                    <Grid
                                        container
                                        spacing={10}
                                        justifyContent="flex-end"
                                    >
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                href={
                                                    'https://katalog.koha.pramenykrkonos.cz/cgi-bin/koha/opac-detail.pl?biblionumber=' +
                                                    this.state.record
                                                        ?.biblionumber
                                                }
                                                disabled={
                                                    !(
                                                        this.state.record
                                                            ?.biblionumber !=
                                                        null
                                                    )
                                                }
                                            >
                                                Zobrazit záznam v KOHA
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={(e) =>
                                                    this.handleRemove(
                                                        e,
                                                        match.params.type,
                                                        match.params.id
                                                    )
                                                }
                                                disabled={
                                                    this.state.record ===
                                                        null ||
                                                    !(
                                                        this.props.cookies.get(
                                                            'permission'
                                                        ) & 2
                                                    )
                                                }
                                            >
                                                Smazat záznam
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={(e) =>
                                                    this.handleEdit(
                                                        e,
                                                        match.params.type,
                                                        match.params.id
                                                    )
                                                }
                                                disabled={
                                                    this.state.record ===
                                                        null ||
                                                    !(
                                                        this.props.cookies.get(
                                                            'permission'
                                                        ) & 2
                                                    )
                                                }
                                            >
                                                Editovat záznam
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                        />
                    </RouterSwitch>
                </Router>
            </div>
        )
    }
}

export default withSnackbar(withRouter(withCookies(ShowScene)))
