import React from "react"

import {
	Paper,
} from '@material-ui/core'

import styles from "./manualPage.module.scss"


class ManualPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {}
	}

	render(){
		return(
			<Paper className={styles.root}>
				<h1>Manuál k vyplňování tabulky pro sběr dat</h1>
				<h2>Obecné </h2>
				<p>
					Každý zadavatel má vlastní tabulku pro vkládání dat (tato tabulka je vždy označena jménem zadavatele). K této tabulce má každý zadavatel práva pro
					vkládání. Do tabulek ostatních zadavatelů mohou zadavateli nahlížet. Všechny tabulky jsou uloženy v jednom adresáři nazvaném Sběr dat.
				</p>
				<h2>Poznámky k práci</h2>
				<p>
					Pro každý typ objektu máme pro usnadnění práce předdefinovaná pole, která je třeba vyplnit. Tato pole se pro každý typ objektu, vždy označí zeleně.
					Neznamená to však, že všechna “navrhovaná” pole, tj. zelená pole je nutné vyplnit. (Například pole Další autoři, Variantní název apod. nelze vyplnit u
					všech objektů.)
					Zároveň to také neznamená, že zadavatel nemůže doplnit údaje i do ostatních polí, která nejsou “zelená”.
					Při práci se souborem je třeba nejprve v prvním sloupečku Typ dokumentu vybrat z rolovacího menu typ daného objektu. Po vybrání příslušného typu objektu
					se zeleně označí požadovaná pole. zadavatel pak prioritně vyplní tato zelená pole.
				</p>
				<h2>Vysvětlení polí</h2>
				<p><b>Autor</b> - sem zapisuje jméno a příjmení autora objektu (autora, editora, ilustrátora, režiséra apod.) Jméno uvádíme ve tvaru Příjmení, Jméno
					(případně Příjmení, Jméno, rok narození - rok úmrtí). Za jméno uvádíme také roli / typ autorství. Tuto informaci uvádíme do kulaté závorky.
					<br /><i>Příklad:</i>
					<br />Krakonoš, Josef (editor)
					<br />Sojka, Práskačka, 1974- (režisérka)
					<br />Hajnej, Pepík, 1954 - 1999 (ilustrátor)
				</p>
				<p><b>Další autoři</b> - sem zapisujeme další autory v pořadí (tj. spoluautory) nebo další osoby, které se na tvorbě objektu podíleli (ilustrátoři knih,
					autoři doprovodných textů / fotografií …). Formát zápisu je shodný se zápisem údajů do pole Autor.</p>
				<p><b>Název</b> - sem zapisujeme celý název objektu (včetně případných podnázvů, čísla a označení částí). Název od podnázvu oddělujeme dvojtečkou s
					oboustrannou mezerou. (U knih název přebíráme z titulního listu.)
					<br /><i>Příklad:</i>
					<br />Krakonoš a lyžníci
					<br />Jak Krakonoš chytil Sojku : příběh ze smrkového lesa
					<br />Antologie Krkonoš. I. díl, Krakonoš </p>
				<p><b>Variantní název</b> - sem zapisujeme jiný název objektu. Např. cizojazyčný název (je-li na objektu uveden), obálkový název apod.</p>
				<p><b>Místo vydání</b> - uvádíme město</p>
				<p><b>Počet stran, příloh, obrázky, přiložená média</b> - fyzický popis objektu
					<br /><i>Příklad:</i>
					<br />xiii, 120 stran, ilustrace + CD
					<br />1 svazek (různé stránkování)
					<br />1 soubor</p>
				<p><b>Poznámka</b> - sem uvádíme poznámky k objektu. Jednotlivé poznámky odděluje dvěma lomítky z obou stran oddělenými mezerami - //
					<br /><i>Příklad:</i>
					<br />Na titulním listu uvedeno jméno autora chybně // Vydáno také v němčině</p>
				<p><b>Technologická poznámka</b> - poznámka k popisu objektu. </p>
				<p><b>Abstrakt / popis</b> - sem uvádíme abstrakt (anotaci) obsahu objektu formou volného textu. </p>
				<p><b>Název muzea, archivu nebo jiné instituce, kde je pramen uložen</b></p>
				<p><b>Číslo archivu, signatura, místo v archivu</b> - přesné označení místa uložení v daném archivu (zdroji) </p>
				<p><b>Rozsah elektronického zdroje</b> - velikost, počet stran apod. </p>
				<p><b>Přístup / práva</b> - přesná specifikace formy a oprávnění k přístupu k danému objektu.
					<br /><i>Příklad:</i>
					<br />Dokument přístupný pouze registrovaným uživatelům</p>
				<p><b>URL dokumentu</b> - kompletní adresa, kde je dokument umístěn
					<br /><i>Příklad:</i>
					<br />https://biblio.hiu.cas.cz/ </p>
				<p><b>Název webu</b> - název www stránky</p>
				<p><b>Digitalizovaná příloha, obrázek, obálka</b> - do tohoto pole vkládáme pouze informaci o tom, zda zadavatel získal (zdigitalizoval, naskenoval) nějaký
					text, obrázek, obálku knihy apod. Do tohoto pole pouze zadavatel vloží písmeno velká A - pokud digitalizovaný objekt má NEBO písmeno velké N - pokud jej
					nemá.
					<br />Tento digitalizovaný objekt zadavatel vloží do souboru na sdíleném disku (Drive) nebo jej zašle editorovi. </p>
				<p><b>Koho se týká</b> - jde o jmennou autoritu. Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků HiÚ - https://biblio.hiu.cas.cz/
					nebo souboru Národních autorit NK ČR - https://autority.nkp.cz/ </p>
				<p><b>Chronologický termín</b> - tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků HiÚ - https://biblio.hiu.cas.cz/ </p>
				<p><b>Geografický termín</b> - tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků HiÚ - https://biblio.hiu.cas.cz/ </p>
				<p><b>Téma</b> - tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků HiÚ - https://biblio.hiu.cas.cz/ </p>
				<p><b>Klíčové slovo</b> - tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků HiÚ - https://biblio.hiu.cas.cz/
					<br />Klíčových slov je možno uvádět více. Jednotlivá klíčová slova oddělujeme dvěma lomítky s oboustrannou mezerou - // </p>
				<p><b>Poznámka pro editora</b> - do tohoto pole je možno napsat poznámku / vzkaz pro editora / čističe.</p>
			</Paper>
		)
	}
}

export default ManualPage