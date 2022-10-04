import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { withSnackbar } from 'notistack'

import {
    Paper,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import styles from './editPage.module.scss'

class EditPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            pageName: '',
            title: '',
            language: '',
            description: '',
            content: '',
            category: '',
            editorState: EditorState.createEmpty(),
        }
    }

    componentDidMount() {
        const url = `/prak/api/pages/${this.props.pageName}`

        fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
            },
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                const contentBlock = htmlToDraft(response.content || '')
                const contentState = ContentState.createFromBlockArray(
                    contentBlock.contentBlocks
                )
                const editorState = EditorState.createWithContent(contentState)
                this.setState({ ...response, editorState })
            })
            .catch((error) => {
                console.info(
                    '%cPages loading unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
            })
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }

    uploadContent = () => {
        const content = draftToHtml(
            convertToRaw(this.state.editorState.getCurrentContent())
        )
        const url = `/prak/api/pages/${this.props.pageName}`

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                language: this.state.language,
                description:
                    this.state.description === ''
                        ? undefined
                        : this.state.description,
                content,
                category: this.state.category,
            }),
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                console.info(
                    '%cPages saving succesful\n',
                    'background: #222; color: #bada55',
                    response
                )
                this.props.enqueueSnackbar('Změny uloženy úspěšně', {
                    variant: 'success',
                    autoHideDuration: 6000,
                })
            })
            .catch((error) => {
                console.info(
                    '%cPages saving unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
                this.props.enqueueSnackbar('Ukládání se nezdařilo', {
                    variant: 'error',
                    autoHideDuration: 6000,
                })
            })
    }

    deleteContent = () => {
        const url = `/prak/api/pages/${this.props.pageName}`

        if (!window.confirm('Opravdu chcete stránku smazat?')) {
            console.info(
                '%cRemove canceled',
                'background: #222; color: #bada55'
            )
            return
        }

        fetch(url, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                console.info(
                    '%cPage removed succesfuly\n',
                    'background: #222; color: #bada55',
                    response
                )
                this.props.enqueueSnackbar('Stránka smazána', {
                    variant: 'success',
                    autoHideDuration: 6000,
                })
                this.props.history.push(`/prak/cms`)
            })
            .catch((error) => {
                console.info(
                    '%cPage remove unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
                this.props.enqueueSnackbar('Smazání stránky se nezdařilo', {
                    variant: 'error',
                    autoHideDuration: 6000,
                })
            })
    }

    uploadCallback = (file) => {
        if (!file) return

        if (file.size > this.maxSize) {
            console.info(
                '%cUpload unsuccesful due to file size',
                'background: #222; color: #bada55',
                file.size,
                '>',
                this.maxSize
            )
            this.props.enqueueSnackbar('Soubor je příliš veliký', {
                variant: 'error',
                autoHideDuration: 6000,
            })
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        return fetch('/prak/api/uploads', {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) throw response
                return response.json()
            })
            .then((response) => {
                console.info(
                    '%cUpload succesful\n',
                    'background: #222; color: #bada55',
                    response
                )
                this.props.enqueueSnackbar('Nahrávání úspěšné', {
                    variant: 'success',
                    autoHideDuration: 6000,
                })

                return { data: { link: response.data.path } }
            })
            .catch((error) => {
                console.info(
                    '%cUpload unsuccesful\n',
                    'background: #222; color: #bada55',
                    error
                )
                this.props.enqueueSnackbar('Nahrávání se nezdařilo', {
                    variant: 'error',
                    autoHideDuration: 6000,
                })
            })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div className={styles.root}>
                <Paper className={styles.content}>
                    <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        uploadCallback={this.uploadCallback}
                        previewImage={true}
                        editorStyle={{ padding: '20px' }}
                    />
                </Paper>
                <div className={styles.rightPanel}>
                    <TextField
                        label={'Titulek'}
                        variant="outlined"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.title}
                    />
                    <FormControl>
                        <InputLabel id="languageLabel">Jazyk</InputLabel>
                        <Select
                            labelId="languageLabel"
                            variant="outlined"
                            name="language"
                            onChange={this.handleChange}
                            value={this.state.language}
                        >
                            <MenuItem value={'cz'}>Čeština</MenuItem>
                            <MenuItem value={'en'}>Angličtina</MenuItem>
                            <MenuItem value={'de'}>Němčina</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label={'Popis'}
                        variant="outlined"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                        multiline
                    />
                    <FormControl>
                        <InputLabel id="categoryLabel">Kategorie</InputLabel>
                        <Select
                            labelId="categoryLabel"
                            variant="outlined"
                            name="category"
                            onChange={this.handleChange}
                            value={this.state.category}
                            label="Kategorie"
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={'page'}>Stránka</MenuItem>
                            <MenuItem value={'main page'}>
                                Nesmazatelná stránka
                            </MenuItem>
                            <MenuItem value={'news'}>Aktualita</MenuItem>
                            <MenuItem value={'post'}>Článek</MenuItem>
                            <MenuItem value={'ourwork'}>Výstupy</MenuItem>
                            <MenuItem value={'topography'}>
                                Místopis Krkonoš
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <strong>Aktuální stránka:</strong>
                    <NavLink
                        to={`/prak/page/${this.state.pageName}`}
                    >{`/prak/page/${this.state.pageName}`}</NavLink>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.uploadContent}
                    >
                        Uložit změny
                    </Button>
                    {this.state.category !== 'main page' && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.deleteContent}
                        >
                            Smazat záznam
                        </Button>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(withSnackbar(EditPage))
