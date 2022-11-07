import { Button, Paper, TextField, Typography, Fab } from '@material-ui/core'
import { Close, ChatRounded, SendRounded } from '@material-ui/icons'
import React from 'react'

import styles from './chatBot.module.scss'

export default class ChatBot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: false,
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

    sendAsLog = (data) => {
        const url =
            window.location.hostname === 'localhost'
                ? 'http://localhost:50080/prak/api/log'
                : '/prak/api/log'

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                //console.log('log: ', data)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
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
  { in: "vyhledavatko", out: "Vyhledávátko naleznete zde." },
  {
    in: "vyhledavani",
    out: "Zadejte hledaný výraz do levého panelu. Můžete vyplnit více jak jedno pole. Pro zpřesnění dotazu můžete využít filtry v pravém panelu.",
  },
  {
    in: "hledat",
    out: "Zadejte hledaný výraz či typ dokumentu do pravého panelu. Nezapomeňte zmáčknout tlačítko Vyhledat.",
  },
  {
    in: "nejde vyhledat",
    out: "Ujistěte se, že nemáte vyplněné některé pole z původního vyhledávání.",
  },
  {
    in: "nove vyhledavani",
    out: "Pro vymazání předchozího dotazu můžete využít tlačítko Smazat vše.",
  },
  {
    in: "filtry",
    out: "Panel s filtry slouží ke zpřesnění výsledků vyhledávání.",
  },
  { in: "ikonka", out: "Provede inverzní výběr." },
  { in: "knihu", out: "V pole Druh dokumentu zvolte variantu Svazek." },
  {
    in: "casopisy",
    out: "Pro hledání článků z časopisu zvolte v poli Druh dokumentu Články, pro hledání celých ročníků časopisu zvolte možnost Periodika.",
  },
  { in: "informace", out: "" },
  { in: "najit", out: "" },
  {
    in: "operator",
    out: "Logické operátory AND / OR nejsou implementovány. Pro kombinaci vyhledávání z několika polí, použijte filtry.",
  },
  {
    in: "logické",
    out: "Logické operátory AND / OR nejsou implementovány. Pro kombinaci vyhledávání z několika polí, použijte filtry.",
  },
  {
    in: "spojky",
    out: "Logické operátory AND / OR nejsou implementovány. Pro kombinaci vyhledávání z několika polí, použijte filtry.",
  },
  { in: "autor", out: "Autorem je myšlenka osoba či korporace." },
  {
    in: "nazev",
    out: "Pro nalezení dokumentu můžete využít jakékoliv slovo z názvu.",
  },
  {
    in: "klicova slova",
    out: "Klíčová slova jsou slova z řízeného slovníku PraK.",
  },
  { in: "misto vydani", out: "Je město vydání." },
  {
    in: "jazyk",
    out: "Je jazyk dokumentu. V případě, že je jazyk vícejazyčný, můžete jazyk dofiltrovat v pravém panelu.",
  },
  {
    in: "typ dokumentu",
    out: "Hledáte-li konkrétní typ dokumentu vyberte konkrétní typ dokument v levém panelu.",
  },
  {
    in: "standardni cislo",
    out: "Standardní číslo je ISBN pro knihy nebo ISSN pro časopisy.",
  },
  {
    in: "rok vydani",
    out: "Zvolte konkrétní rok či rozmezí let na posuvníku v pravém panelu.",
  },
  { in: "zdravim", out: "ahoj" },
  { in: "nemuzu najit", out: "Zkuste modifikovat svůj dotaz." },
  {
    in: "moc výsledku",
    out: "Pokud vám systém našel příliš mnoho výsledků, zkuste zúžit svůj dotaz pomocí filtrů na pravé straně obrazovky.",
  },
  {
    in: "prilis mnoho vysledku",
    out: "Pokud vám systém našel příliš mnoho výsledků, zkuste zúžit svůj dotaz pomocí filtrů na pravé straně obrazovky.",
  },
  {
    in: "chyba",
    out: "Pokud jste narazili na chybu nahlašte ji prosím na e-mailovou adresu…",
  },
  {
    in: "chybu",
    out: "Pokud jste narazili na chybu nahlašte ji prosím na e-mailovou adresu",
  },
].map((item) => ({ ...item, in: this.toSimpleText(item.in) }))

    send = () => {
        this.sendAsLog(this.state.value)
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
