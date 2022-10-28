import React from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import {
    Paper,
    TextField,
    Button,
    Typography,
    Chip,
    Slider,
} from '@material-ui/core'
import {
    KeyboardArrowRight as KeyboardArrowRightIcon,
    KeyboardArrowLeft as KeyboardArrowLeftIcon,
} from '@material-ui/icons'
import {
    PersonComboBox,
    KeywordComboBox,
    StaticComboBox,
} from '../../components/comboBoxes'
import ChatBot from '../../components/chatBot'

import typeDefinitionFile from '../../components/indices/metadataTypes.json'
import styles from './searchScene.module.scss'

class SearchScene extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            indexer: 'metadata',
            page: 0,
            itemsOnPage: 5,
            records: [],
            filteredRecords: [],
            searchParams: this.createSearchParams([]),
            publishingDateFilter: this.getCornerYears().map(
                (item) => item.value
            ),
        }

        this.description = {}
        this.request_v = 0
        this.newestRequest_v = 0
    }

    handleChange = (e, type) => {
        if (e.target.value)
            this.props.history.push(`/prak/show/${type}/${e.target.value}`)
    }

    handleSliderChange = (event, newValue) => {
        this.setState((prevState) => ({
            publishingDateFilter: newValue,
            filteredRecords: this.filterRecords(
                prevState.records,
                prevState.searchParams,
                prevState.publishingDateFilter
            ),
        }))
    }

    getCornerYears = () => {
        const minMax = [
            new Date().getFullYear() - 200,
            new Date().getFullYear(),
        ]
        return [
            { value: minMax[0], label: minMax[0] },
            { value: minMax[1], label: minMax[1] },
        ]
    }

    componentDidMount() {
        this.props.enqueueSnackbar(
            `Vyberte rejstřík, vyplňte požadovaná pole, zmáčkněte vyhledat a poté klikněte na požadovaný záznam`,
            { variant: 'info', autoHideDuration: 6000 }
        )
    }

    search = (fast = false) => {
        const thisRequestVesion = this.request_v++
        const url =
            window.location.hostname === 'localhost'
                ? 'http://localhost:50080/prak/api/metadata'
                : 'api/metadata'

        this.setState({ loading: true })
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _limit: fast ? 5 : 10000,
                ...this.description,
            }),
        })
            .then((response) => {
                if (thisRequestVesion < this.newestRequest_v)
                    Promise.reject(`Old request version: ${thisRequestVesion}`)
                this.newestRequest_v = thisRequestVesion
                return response.json()
            })
            .then((data) => {
                const records = data.map((a) => {
                    const toReturn = { ...a }
                    toReturn.born_year =
                        toReturn.author =
                        toReturn.publishing_date =
                            ''
                    toReturn.id = a._id
                    if (a.born_year) toReturn.born_year = a.born_year.year
                    if (a.author && a.author.id)
                        toReturn.author =
                            a.author.id.name + ' ' + a.author.id.surname
                    if (
                        a.publishing_date &&
                        a.publishing_date[0] &&
                        a.publishing_date[0].date
                    )
                        toReturn.publishing_date = a.publishing_date[0].date
                    return toReturn
                })
                console.info(
                    '%cFound: ',
                    'background: #222; color: #bada55',
                    records
                )
                const searchParams = this.createSearchParams(records)
                this.setState((prevState) => ({
                    records,
                    loading: false,
                    searchParams,
                    filteredRecords: this.filterRecords(
                        records,
                        searchParams,
                        prevState.publishingDateFilter
                    ),
                }))
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    createSearchParams = (records) => {
        let searchParams = {}

        let properties = [
            'documentType',
            'language',
            'author',
            'publish_country',
        ]

        for (let property of properties) {
            searchParams[property] = { _other: { count: 0, checked: true } }
            records.forEach((item) => {
                let itemProperty = item[property]
                if (Array.isArray(itemProperty))
                    itemProperty = itemProperty.join(', ')

                if (
                    itemProperty !== undefined &&
                    itemProperty !== null &&
                    itemProperty !== ''
                ) {
                    if (searchParams[property][itemProperty])
                        searchParams[property][itemProperty].count++
                    else
                        searchParams[property][itemProperty] = {
                            count: 1,
                            checked: true,
                        }
                } else {
                    searchParams[property]['_other'].count++
                }
            })
        }

        return searchParams
    }

    setPage(increment = 0) {
        this.setState((prevState) => ({
            page: Math.max(
                Math.min(
                    Math.ceil(
                        this.state.filteredRecords.length /
                            this.state.itemsOnPage -
                            1
                    ),
                    prevState.page + increment
                ),
                0
            ),
        }))
    }

    filterRecords = (records, searchParams, dateFilter) => {
        return records.filter((record) => {
            let passing = true
            Object.entries(searchParams).forEach(([key, value]) => {
                let recordKey = record[key]
                if (Array.isArray(record[key]))
                    recordKey = record[key].join(', ')

                if (
                    recordKey === undefined ||
                    recordKey === null ||
                    recordKey.length === 0
                ) {
                    if (!value['_other'].checked) passing = false
                    return
                }

                if (!value[recordKey] || !value[recordKey].checked)
                    passing = false
            })

            if (
                record.publishing_date !== undefined &&
                record.publishing_date !== '' &&
                !record.publishing_date.includes('-')
            ) {
                const recordDate = record.publishing_date.split('.').at(-1)
                if (
                    recordDate < dateFilter[0] ||
                    recordDate > this.state.publishingDateFilter[1]
                ) {
                    passing = false
                }
            }

            return passing
        })
    }

    setDescription(where, what, regexp = false, search = true) {
        if (what !== '') {
            if (regexp) {
                this.description[where] = `/${what}/`
            } else {
                this.description[where] = what
            }
        } else {
            this.description[where] = undefined
        }
        if (what !== undefined && search) {
            this.search(true)
        }
    }

    render() {
        return (
            <div className={styles.SearchScene}>
                <ChatBot />
                <Paper className={styles.header}>
                    <h1>Vyhledávátko</h1>
                </Paper>
                <div className={styles.phasesBlock}>
                    <Paper className={styles.body}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.search()}
                        >
                            Vyhledat
                        </Button>

                        <TextField
                            label={'Vyhledávání přes všechna pole'}
                            onChange={(e) => {
                                this.setDescription(
                                    '$**',
                                    e.target.value,
                                    false,
                                    true
                                )
                            }}
                        />

                        <Typography variant="h5">Autor - Název</Typography>
                        <PersonComboBox
                            label={
                                typeDefinitionFile.properties['author'].label
                            }
                            onChange={(e) => {
                                this.setDescription(
                                    'author',
                                    e.target.value,
                                    false,
                                    true
                                )
                            }}
                        />
                        <TextField
                            label={typeDefinitionFile.properties['name'].label}
                            onChange={(e) => {
                                this.setDescription(
                                    'name',
                                    e.target.value,
                                    true,
                                    true
                                )
                            }}
                            fullWidth
                        />

                        <Typography variant="h5">Klíčová slova</Typography>
                        <KeywordComboBox
                            label={
                                typeDefinitionFile.properties['keywords'].label
                            }
                            onChange={(e) => {
                                this.setDescription(
                                    'keywords',
                                    e.target.value,
                                    false,
                                    true
                                )
                            }}
                            fullWidth
                        />

                        <Typography variant="h5">Místo vydání</Typography>
                        <TextField
                            label={
                                typeDefinitionFile.properties['publish_country']
                                    .label
                            }
                            onChange={(e) => {
                                this.setDescription(
                                    'publish_country',
                                    e.target.value,
                                    true,
                                    true
                                )
                            }}
                            fullWidth
                        />

                        <Typography variant="h5">Jazyk</Typography>
                        <StaticComboBox
                            label={
                                typeDefinitionFile.properties['language'].label
                            }
                            onChange={(e) => {
                                this.setDescription(
                                    'language',
                                    e.target.value,
                                    false,
                                    true
                                )
                            }}
                            options={
                                typeDefinitionFile.properties['language']
                                    .options
                            }
                            fullWidth
                        />

                        <Typography variant="h5">Typ dokumentu</Typography>
                        <StaticComboBox
                            label="Typ dokumentu"
                            onChange={(e) => {
                                const index = typeDefinitionFile.types.indexOf(
                                    e.target.value
                                )
                                this.setDescription(
                                    'documentType',
                                    index === -1 ? '' : index,
                                    false,
                                    true
                                )
                            }}
                            options={['', ...typeDefinitionFile['types']]}
                            fullWidth
                        />

                        <Typography variant="h5">Standardní číslo</Typography>
                        <TextField
                            label={typeDefinitionFile.properties['isbn'].label}
                            onChange={(e) => {
                                this.setDescription(
                                    'isbn',
                                    e.target.value,
                                    true,
                                    true
                                )
                            }}
                            fullWidth
                        />
                        <TextField
                            label={typeDefinitionFile.properties['issn'].label}
                            onChange={(e) => {
                                this.setDescription(
                                    'issn',
                                    e.target.value,
                                    true,
                                    true
                                )
                            }}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.search()}
                        >
                            Vyhledat
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => window.location.reload(false)}
                        >
                            Smazat vše
                        </Button>
                    </Paper>

                    <div className={styles.resultsBlock}>
                        <div className={styles.resultBlockControls}>
                            <Button disabled>
                                {` (celkem ${this.state.filteredRecords.length} záznamů)`}
                            </Button>
                            <Button
                                onClick={() => {
                                    this.setPage(1)
                                }}
                            >
                                <KeyboardArrowRightIcon />
                            </Button>
                            <Button disabled>
                                {this.state.page + 1}
                                {' / '}
                                {Math.ceil(
                                    this.state.filteredRecords.length /
                                        this.state.itemsOnPage
                                )}
                            </Button>
                            <Button
                                onClick={() => {
                                    this.setPage(-1)
                                }}
                            >
                                <KeyboardArrowLeftIcon />
                            </Button>
                        </div>

                        {this.state.filteredRecords
                            .slice(
                                this.state.page * this.state.itemsOnPage,
                                (this.state.page + 1) * this.state.itemsOnPage
                            )
                            .map((value, key) => (
                                <Paper
                                    className={styles.resultBlockItem}
                                    key={key}
                                    onClick={() => {
                                        console.info(
                                            '%cShow: ',
                                            'background: #222; color: #bada55',
                                            value.id
                                        )
                                        this.props.history.push(
                                            `/prak/show/metadata/${value.id}`
                                        )
                                    }}
                                >
                                    <Typography variant="h5">
                                        {value.name}
                                    </Typography>
                                    <p>
                                        {value.author &&
                                            'Autor: ' + value.author}
                                    </p>
                                    <p>
                                        {value.publishing_date &&
                                            'Datum vydání: ' +
                                                value.publishing_date}
                                    </p>
                                    <p>
                                        {value.language.length > 0 &&
                                            'Jazyk: ' +
                                                value.language.join(', ')}
                                    </p>
                                </Paper>
                            ))}
                    </div>

                    <div
                        className={[
                            styles.resultTagSelector,
                            styles.minimalisticScrollbar,
                        ].join(' ')}
                    >
                        <Paper
                            className={styles.resultTagSelectorItem}
                            style={{ padding: '0 20px' }}
                        >
                            <h3>Rok vydání</h3>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={this.state.publishingDateFilter}
                                onChange={(e, newValue) =>
                                    this.setState({
                                        publishingDateFilter: newValue,
                                    })
                                }
                                onChangeCommitted={this.handleSliderChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={(value) => value}
                                min={
                                    this.getCornerYears().map(
                                        (item) => item.value
                                    )[0]
                                }
                                max={
                                    this.getCornerYears().map(
                                        (item) => item.value
                                    )[1]
                                }
                                marks={this.getCornerYears()}
                            />
                        </Paper>

                        {Object.entries(this.state.searchParams).map(
                            ([searchParamsKey, value]) => {
                                if (Object.entries(value).length === 0)
                                    return null

                                return (
                                    <Paper
                                        key={searchParamsKey}
                                        className={styles.resultTagSelectorItem}
                                    >
                                        <h3>
                                            {typeDefinitionFile.properties[
                                                searchParamsKey
                                            ]?.label ?? searchParamsKey}
                                            <Button
                                                onClick={() => {
                                                    this.setState(
                                                        (prevState) => {
                                                            Object.entries(
                                                                prevState
                                                                    .searchParams[
                                                                    searchParamsKey
                                                                ]
                                                            ).forEach(
                                                                (
                                                                    [
                                                                        key,
                                                                        value,
                                                                    ],
                                                                    index
                                                                ) =>
                                                                    (value.checked =
                                                                        !value.checked)
                                                            )
                                                            return {
                                                                filteredRecords:
                                                                    this.filterRecords(
                                                                        prevState.records,
                                                                        prevState.searchParams,
                                                                        prevState.publishingDateFilter
                                                                    ),
                                                            }
                                                        },
                                                        this.setPage
                                                    )
                                                }}
                                            >
                                                Reverse
                                            </Button>
                                        </h3>
                                        <div className={styles.resultTag}>
                                            {Object.entries(value)
                                                .sort(
                                                    (
                                                        [itemAName, itemA],
                                                        [itemBName, itemB]
                                                    ) =>
                                                        itemA.count ===
                                                        itemB.count
                                                            ? 0
                                                            : itemA.count <
                                                              itemB.count
                                                            ? 1
                                                            : -1
                                                )
                                                //.slice(0, 20)
                                                .map(
                                                    ([
                                                        name,
                                                        { count, checked },
                                                    ]) => (
                                                        <Chip
                                                            color={
                                                                checked
                                                                    ? 'secondary'
                                                                    : 'default'
                                                            }
                                                            label={
                                                                <div
                                                                    style={{
                                                                        textDecoration:
                                                                            checked
                                                                                ? 'none'
                                                                                : 'line-through',
                                                                    }}
                                                                >
                                                                    {name ===
                                                                    '_other'
                                                                        ? 'Ostatní'
                                                                        : searchParamsKey ===
                                                                          'documentType'
                                                                        ? typeDefinitionFile
                                                                              .types[
                                                                              name
                                                                          ]
                                                                        : name}
                                                                    <span
                                                                        className={
                                                                            styles.tagCount
                                                                        }
                                                                    >
                                                                        {` (${count}x)`}
                                                                    </span>
                                                                </div>
                                                            }
                                                            key={name}
                                                            className={
                                                                styles.chip
                                                            }
                                                            onClick={() => {
                                                                this.setState(
                                                                    (
                                                                        prevState
                                                                    ) => {
                                                                        prevState.searchParams[
                                                                            searchParamsKey
                                                                        ][
                                                                            name
                                                                        ].checked =
                                                                            !prevState
                                                                                .searchParams[
                                                                                searchParamsKey
                                                                            ][
                                                                                name
                                                                            ]
                                                                                .checked
                                                                        return {
                                                                            ...prevState,
                                                                            filteredRecords:
                                                                                this.filterRecords(
                                                                                    prevState.records,
                                                                                    prevState.searchParams,
                                                                                    prevState.publishingDateFilter
                                                                                ),
                                                                        }
                                                                    }
                                                                )
                                                            }}
                                                        ></Chip>
                                                    )
                                                )}
                                        </div>
                                    </Paper>
                                )
                            }
                        )}
                    </div>
                </div>

                <Paper className={styles.helperBlock}>
                    <h3>Nápověda</h3>
                    <b>Vyhledání všech záznamů:</b> nechte všechna pole prázdná
                    a klikněte na Vyhledat <br /> <br />
                    <b>Interaktivní režim:</b> už během zadávání se ukáže 5
                    nejlepších shod
                    <br /> <br />
                    <b>Zobrazení záznamu:</b> klikněte kamkoliv na příslušný
                    záznam v tabulce níže
                    <br /> <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            window.location.href =
                                'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'
                        }}
                    >
                        Přejít do vyhledávání KOHA
                    </Button>
                </Paper>

                <Paper className={styles.helperBlock}>
                    <h3>Dotaz</h3>
                    <pre>
                        URL: https://quest.ms.mff.cuni.cz/prak/api/metadata
                    </pre>
                    <pre>Method: POST</pre>
                    <pre>{JSON.stringify(this.description, null, 2)}</pre>
                </Paper>
            </div>
        )
    }
}

export default withSnackbar(withRouter(SearchScene))
