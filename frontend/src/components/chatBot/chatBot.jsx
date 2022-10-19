import { Button, Paper, TextField, Typography, Fab } from '@material-ui/core'
import { Close, ChatRounded, SendRounded } from '@material-ui/icons'
import React from 'react'

import styles from './chatBot.module.scss'

export default class ChatBot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: true,
            value: '',
            messages: [
                {
                    text: 'Ahoj, jak ti můžu pomoci?',
                    rec: 'L',
                    time: new Date().toLocaleTimeString(),
                },
            ],
        }
    }

    toSimpleText = (r) => {
        return r
            .toLowerCase()
            .replace(new RegExp(/[á]/g), 'a')
            .replace(new RegExp(/[č]/g), 'c')
            .replace(new RegExp(/[ď]/g), 'd')
            .replace(new RegExp(/[éě]/g), 'e')
            .replace(new RegExp(/[í]/g), 'i')
            .replace(new RegExp(/[ň]/g), 'n')
            .replace(new RegExp(/[ó]/g), 'o')
            .replace(new RegExp(/[ř]/g), 'r')
            .replace(new RegExp(/[š]/g), 's')
            .replace(new RegExp(/[ť]/g), 't')
            .replace(new RegExp(/[ú]/g), 'u')
            .replace(new RegExp(/[ů]/g), 'u')
            .replace(new RegExp(/[ý]/g), 'y')
            .replace(new RegExp(/[ž]/g), 'z')
    }

    dataSet = [
        { in: 'vyhledávátko', out: 'vyhledávátko naleznete zde: XXX' },
        { in: 'vyhledávátka', out: 'vyhledávátko naleznete zde: XXX' },
        { in: 'vyhledavani', out: '' },
        { in: 'hledat', out: '' },
        { in: 'metadata', out: '' },
        { in: 'vystava', out: '' },
        { in: 'informace o projektu', out: '' },
        { in: 'virtualni katalog', out: '' },
        { in: 'katalog', out: '' },
        { in: 'prameny', out: '' },
        { in: 'knihy', out: '' },
        { in: 'casopisy', out: '' },
        { in: 'informace', out: '' },
        { in: 'najit', out: '' },
        { in: 'resitelsky tym', out: '' },
        { in: 'zdravím', out: 'ahoj' },
        { in: '', out: '' },
        { in: '', out: '' },
        { in: '', out: '' },
    ].map((item) => ({ ...item, in: this.toSimpleText(item.in) }))

    send = () => {
        const input = this.toSimpleText(this.state.value)

        if (input.length === 0) return

        let botMessage = ''
        const filtered = this.dataSet.filter((item) => {
            return input.includes(item.in)
        })

        if (filtered.length > 0) botMessage = filtered[0].out

        this.setState({
            value: '',
            messages: [
                ...this.state.messages,
                {
                    text: this.state.value,
                    rec: 'R',
                    time: new Date().toLocaleTimeString(),
                },
                {
                    text: botMessage,
                    rec: 'L',
                    time: new Date().toLocaleTimeString(),
                },
            ],
        })
    }

    render() {
        if (!this.state.opened)
            return (
                <div className={styles.openButton}>
                    <Fab
                        color="primary"
                        onClick={() => {
                            this.setState({ opened: true })
                        }}
                    >
                        <ChatRounded />
                    </Fab>
                </div>
            )
        return (
            <Paper className={styles.chatBot}>
                <div className={styles.header}>
                    Chat s Krakonošem
                    <Button
                        color="primary"
                        onClick={() => {
                            this.setState({ opened: false })
                        }}
                    >
                        <Close />
                    </Button>
                </div>
                <div className={styles.messages}>
                    {this.state.messages.map((item, key) =>
                        item.rec === 'R' ? (
                            <div key={key} className={styles.rightMessage}>
                                <Paper className={styles.messageBlock}>
                                    {item.text}
                                </Paper>
                                <Typography
                                    variant="caption"
                                    className={styles.messageAuthor}
                                >
                                    Vy {item.time}
                                </Typography>
                            </div>
                        ) : (
                            <div key={key} className={styles.leftMessage}>
                                <Paper className={styles.messageBlock}>
                                    {item.text}
                                </Paper>
                                <Typography
                                    variant="caption"
                                    className={styles.messageAuthor}
                                >
                                    Krakonoš {item.time}
                                </Typography>
                            </div>
                        )
                    )}
                </div>
                <div className={styles.inputBlock}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Aa"
                        value={this.state.value}
                        onChange={(e) => {
                            this.setState({ value: e.target.value })
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') this.send()
                        }}
                    />
                    <Button
                        onClick={() => {
                            this.send()
                        }}
                    >
                        <SendRounded />
                    </Button>
                </div>
            </Paper>
        )
    }
}
