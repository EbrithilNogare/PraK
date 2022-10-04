import React from 'react'
import { withSnackbar } from 'notistack'
import { Button, TextField } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'

/**
 * File input
 */
class UploadFile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            path: '',
            value: this.props.defaultValue || '',
        }

        this.maxSize = 32 * 1024 * 1024 // 32MB
    }

    spawnUploadWindow = () => {}

    handleChange = (e) => {
        if (e.target.type === 'checkbox')
            this.setState({ value: e.target.checked })
        else this.setState({ value: e.target.value })

        if (this.props.onChange) this.props.onChange(e)
    }

    handleUpload = (e) => {
        if (!e.target.files[0]) return

        if (e.target.files[0].size > this.maxSize) {
            console.info(
                '%cUpload unsuccesful due to file size',
                'background: #222; color: #bada55',
                e.target.files[0].size,
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
        formData.append('file', e.target.files[0])

        fetch('/prak/api/uploads', {
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
                this.handleChange({
                    target: {
                        value: response.data.path,
                        type: 'file',
                        name: this.props.name,
                    },
                })
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

    render() {
        const {
            enqueueSnackbar,
            closeSnackbar,
            onChange,
            defaultValue,
            ...props
        } = { ...this.props }
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                <TextField
                    {...props}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <Button component="label">
                    <PublishIcon />
                    <input type="file" hidden onChange={this.handleUpload} />
                </Button>
            </div>
        )
    }
}

export default withSnackbar(UploadFile)
