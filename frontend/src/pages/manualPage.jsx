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
				<h1 dir="ltr" id="docs-internal-guid-31547bd9-7fff-4838-15dd-0e982e090530">
					Manuál k Pramenům Krkonoš
				</h1>
				<br/>
				<h2 dir="ltr">
					Obecné
				</h2>
				<p dir="ltr">
					Popis objektu - záznam - zahrnuje:
				</p>
				<p dir="ltr">
					Údaje vložené zadavatelem,
				</p>
				<p dir="ltr">
					Údaje převzaté z rejstříku - osoby, korporace, rod/rodina, akce, témata,
					klíčová slova, geografická hesla,
				</p>
				<p dir="ltr">
					Údaje převzaté z jiných (našich) záznamů - názvy fondů, názvy periodik,
					názvy elektronických zdrojů, názvy archivních pomůcek, názvy svazků,
				</p>
				<p dir="ltr">
					Údaje převzaté z nabídky (kontrolovaných seznamů) - jazyky, úroveň
					zpracování, forma/žánr, zadavatelé,
				</p>
				<p dir="ltr">
					Údaje převzaté z externího zdroje - URL dokumentu (vlastní repozitář, URL
					dokumentu).
				</p>
				<br/>
				<h2 dir="ltr">
					Typ dokumentu
				</h2>
				<p dir="ltr">
					Archivní dokument/část fondu
				</p>
				<p dir="ltr">
					Archivní nebo muzejní jednotlivina, která je nedílnou součástí celku, ale
					má význam právě tato jeho část. Informace zaznamenaná v libovolné formě
					nebo na libovolném nosiči, vytvořená nebo přijatá a dále spravovaná osobou
					nebo korporací při provádění svých aktivit nebo řízení svých záležitostí.
				</p>
				<br/>
				<p dir="ltr">
					Archivní fond/sbírka
				</p>
				<p dir="ltr">
					Soubor archiválií, které bez ohledu na forma nebo fyzický nosič vznikly
					organickou činností nebo byly shromážděny a používány příslušnou osobou,
					rodinou nebo korporací v rámci vlastní působnosti.
				</p>
				<br/>
				<p dir="ltr">
					Audiovizuální objekt
				</p>
				<p dir="ltr">
					Zvukové nahrávky, filmy, videa, gramofonové desky, audiokazety.
				</p>
				<br/>
				<p dir="ltr">
					Článek
				</p>
				<p dir="ltr">
					Použijte pro články z periodických publikací, časopisů, věstníků, sborníků.
				</p>
				<br/>
				<p dir="ltr">
					Elektronický zdroj
				</p>
				<p dir="ltr">
					Databáze, webové stránky, vše, co má pouze elektronickou podobu.
				</p>
				<br/>
				<p dir="ltr">
					Kapitola
				</p>
				<p dir="ltr">
					Kapitoly/části knih, neperiodických sborníků, kronik, písně ve sborníku.
				</p>
				<br/>
				<p dir="ltr">
					Obrazový dokument
				</p>
				<p dir="ltr">
					Jednotlivé mapy, obrazy, fotografie , pohlednice.
				</p>
				<br/>
				<p dir="ltr">
					Periodikum
				</p>
				<p dir="ltr">
					Časopisy, noviny, věstníky, sborníky, zpravodaje jako titul.
				</p>
				<br/>
				<p dir="ltr">
					Svazek
				</p>
				<p dir="ltr">
					Vše, co má charakter knihy, i když neprošlo publikačním procesem, upřesnění
					v poli FORMA rukopisy, kroniky, monografie, sborníky, jubilejní publikace,
					statistiky, atlasy, archivní pomůcky, brožury.
				</p>
				<br/>
				<p dir="ltr">
					3D
				</p>
				<p dir="ltr">
					Trojrozměrný objekt.
				</p>
				<br/>
				<h2 dir="ltr">
					Poznámky k práci
				</h2>
				<h3 dir="ltr">
					Vysvětlení polí
				</h3>
				<p dir="ltr">
					Hlavní autor nebo původce
				</p>
				<p dir="ltr">
					Původce je fyzická osoba nebo korporativní původce akce, která je primárně
					odpovědná za vytvoření obsahu ZO.
				</p>
				<p dir="ltr">
					Korporace, rodina nebo osoba, která vytvořila, shromáždila nebo spravovala
					dokumenty při provádění svých osobních nebo korporativních aktivit.
				</p>
				<br/>
				<p dir="ltr">
					Výběr hlavního původce:
				</p>
				<p dir="ltr">
					V případě, že není původce uveden v rejstříku, nejdříve vyplňte jeho jméno
					a data narození a úmrtí (pokud jsou známa) v odpovídajícím rejstříku -
					osob, korporací, udalostí/akcí.
				</p>
				<p dir="ltr">
					Popis pod jurisdikcí: Státní instituce, jako je vláda, parlament, magistrát
					atd., se zapisují pod státním/správním celkem, jehož jsou orgánem.
				</p>
				<p dir="ltr">
					Uvádí se konvenční jméno příslušného správního; to by mělo být zapsáno v
					české formě, pokud existuje.
				</p>
				<p dir="ltr">
					Změna jména korporace: Změní-li se jméno korporace, z hlediska katalogizace
					se potom jedná o jinou korporaci.
				</p>
				<p dir="ltr">
					Pro volbu správné podoby jména (pravopis, iniciály, rozepsané iniciály
					apod.) se používá přednostně Soubor národních autorit dostupný na stránkách
					Národní knihovny ČR.
				</p>
				<p dir="ltr">
					Korporace jako původce archiválií
				</p>
				<p dir="ltr">
					administrativně vymezená území
				</p>
				<p dir="ltr">
					orgány veřejné správy
				</p>
				<p dir="ltr">
					podniky, firmy,
				</p>
				<p dir="ltr">
					spolky, zájmová sdružení, náboženské organizace, politické stryn, nadace
				</p>
				<p dir="ltr">
					vojenské a bezpečnostní jednotky
				</p>
				<p dir="ltr">
					sdružení korporací (mikroregiony)
				</p>
				<p dir="ltr">
					jednotlivé fyzické osoby mající charakter korporace
				</p>
				<p dir="ltr">
					Sem zapisujeme jméno a příjmení autora objektu (autora, editora,
					ilustrátora, režiséra apod.) Jméno uvádíme ve tvaru Příjmení, Jméno
					(případně Příjmení, Jméno, rok narození - rok úmrtí). Za jméno uvádíme také
					roli / typ autorství. Tuto informaci uvádíme do kulaté závorky.
				</p>
				<p dir="ltr">
					Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků
					HiÚ - <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a>
				nebo souboru Národních autorit NK ČR -    <a href="https://autority.nkp.cz/">https://autority.nkp.cz/</a> nebo z
					jiných rejstříků, pokud je používá. Tento údaj vkládáme včetně životních
					dat u fondu osoby nebo o časovém rozmezí existence instituce.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Krakonoš, Josef (editor)
				</p>
				<p dir="ltr">
					Sojka, Práskačka, 1974- (režisérka)
				</p>
				<p dir="ltr">
					Hajnej, Pepík, 1954 - 1999 (ilustrátor)
				</p>
				<p dir="ltr">
					Česká komora
				</p>
				<p dir="ltr">
					Hejtmanství německých lén
				</p>
				<p dir="ltr">
					Ministerstvo spravedlnosti Vídeň (Justizministerium Wien)
				</p>
				<p dir="ltr">
					Magistrát hlavního města Prahy
				</p>
				<p dir="ltr">
					Divadlo Semafor
				</p>
				<p dir="ltr">
					Cech nákladníků, sladovníků a pivovarníků
				</p>
				<p dir="ltr">
					Spolek Láska vzájemně se podporujících samostatných obuvníků na Smíchově
				</p>
				<p dir="ltr">
					Köpl Karl (1851–1932)
				</p>
				<p dir="ltr">
					Hendrych Dušan (1927-)
				</p>
				<p dir="ltr">
					Gorbačov Michail Sergejevič (1931-)
				</p>
				<br/>
				<br/>
				<p dir="ltr">
					Další autoři
				</p>
				<p dir="ltr">
					Uvádí se přispěvatelé ke vzniku ZO.
				</p>
				<p dir="ltr">
					Může jít i o kombinaci - osoba i korporativní autor či akce.
				</p>
				<p dir="ltr">
					V případě, že není původce uveden v rejstříku, nejdříve vyplňte jeho jméno
					a data narození a úmrtí (pokud jsou známa) v odpovídajícím rejstříku -
					osob, korporací, udalostí/akcí.
				</p>
				<p dir="ltr">
					Pro volbu správné podoby jména (pravopis, iniciály, rozepsané iniciály
					apod.) se používá přednostně Soubor národních autorit dostupný na stránkách
					Národní knihovny ČR.
				</p>
				<p dir="ltr">
					Sem zapisujeme další autory v pořadí (tj. spoluautory) nebo další osoby,
					které se na tvorbě objektu podíleli (ilustrátoři knih, autoři doprovodných
					textů / fotografií …). Formát zápisu je shodný se zápisem údajů do pole
					Autor.
				</p>
				<p dir="ltr">
					Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků
					HiÚ - <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a>
				nebo souboru Národních autorit NK ČR -    <a href="https://autority.nkp.cz/">https://autority.nkp.cz/</a> nebo z
					jiných rejstříků, pokud je používá. Tento údaj vkládáme včetně životních
					dat u fondu osoby nebo o časovém rozmezí existence instituce
				</p>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Čepický, Pavel, 1951-, autor
				</p>
				<p dir="ltr">
					Katolická církev. Biskupství královéhradecké, pořadatel
				</p>
				<p dir="ltr">
					Středoevropské katolické dny, akce
				</p>
				<br/>
				<p dir="ltr">
					Role
				</p>
				<p dir="ltr">
					Uvádí se role přispěvatelů. Výběr role z nabídkového seznamu rolí, podle
					role, která je uvedena v ZO, např. editor, redaktor, překladatel,
					sestavovatel ap.
				</p>
				<br/>
				<p dir="ltr">
					Název
				</p>
				<p dir="ltr">
					Hlavní název je vždy povinným údajem (byť doplněným) a je-li uveden či
					zjištěn, pak je také prvním údajem o odpovědnosti.
				</p>
				<p dir="ltr">
					Uvádí se formální nebo uměle vytvořený název ve stručné podobě. (ISAD).
				</p>
				<p dir="ltr">
					Název archivního fondu - vychází z posledního úředního nebo jinak běžně
					užívaného názvu svého původce, který nemusí být vždy posledním názvem
					instituce. Nepřihlíží se k tomu, zda písemnosti fondu jsou z období, kdy
					tento název nebyl ještě užíván. Starší nebo jiné názvy původce se uvádějí v
					rejstříku osob/korporací
				</p>
				<p dir="ltr">
					Hlavní název je hlavním pojmenováním ZO a obvykle je typograficky
					zvýrazněn.
				</p>
				<p dir="ltr">
					Je-li uveden název ve více jazycích a/nebo písmech, volí se za hlavní název
					vždy název v jazyce dokumentu (jediného či převažujícího).
				</p>
				<p dir="ltr">
					Ostatní názvy se zapíší jako další názvy..
				</p>
				<p dir="ltr">
					Slova, která uvádějí název, ale nejsou součástí názvu, se nezapisují. Slova
					z názvu se nezkracují.
				</p>
				<p dir="ltr">
					Uvádí se v jednom poli v uvedeném pořadí údajů.
				</p>
				<p dir="ltr">
					Uvedená interpunkce je doporučená, nikoliv povinná.
				</p>
				<p dir="ltr">
					Pro archiválie : Formální název je jasně dán nebo vyplyne v průběhu popisu
					ZO.
				</p>
				<p dir="ltr">
					Sem zapisujeme celý název objektu (včetně případných podnázvů, čísla a
					označení částí). Název od podnázvu oddělujeme dvojtečkou s oboustrannou
					mezerou. (U knih název přebíráme z titulního listu.)
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Krakonoš a lyžníci
				</p>
				<p dir="ltr">
					Jak Krakonoš chytil Sojku : příběh ze smrkového lesa
				</p>
				<p dir="ltr">
					Antologie Krkonoš. I. díl, Krakonoš
				</p>
				<p dir="ltr">
					Protokoly sborů městské správy (část fondu)
				</p>
				<p dir="ltr">
					Městská rada (nižší část fondu)
				</p>
				<p dir="ltr">
					Obecní zastupitelstvo (nižší část fondu)
				</p>
				<p dir="ltr">
					Zápisy o schůzích ústředního zastupitelstva (jednotlivina)
				</p>
				<p dir="ltr">
					Magistrátní komise (nižší část fondu)
				</p>
				<p dir="ltr">
					Itineráře (série)
				</p>
				<p dir="ltr">
					Benešovy dekrety
				</p>
				<p dir="ltr">
					Dějepis pro gymnázia. 4, Nejnovější dějiny
				</p>
				<p dir="ltr">
					Konfesní myšlení českých Němců v 19. a počátkem 20. století
				</p>
				<br/>
				<p dir="ltr">
					Variantní název
				</p>
				<p dir="ltr">
					Další názvy ZO (i v německé verzi vedle překladu především v češtině, aby
					ji bylo možno snadno vyhledat), jež je úzce spojen se jménem či názvem jeho
					původce.
				</p>
				<p dir="ltr">
					Podnázev ZO nebo další informace k hlavnímu názvu.
				</p>
				<p dir="ltr">
					Podnázvů nebo dalších informací k hlavnímu názvu může být více
				</p>
				<p dir="ltr">
					sem zapisujeme jiný (či další) název objektu. Např. cizojazyčný název
					(je-li na objektu uveden), obálkový název apod. U archivních fondů uvádíme
					další názvy fondu (i v německé verzi vedle překladu především v češtině,
					aby ji bylo možno snadno vyhledat), jež je úzce spojen se jménem či názvem
					jeho původce.
				</p>
				<br/>
				<p dir="ltr">
					Jazyk
				</p>
				<p dir="ltr">
					Jazyk(y) nebo písmo (nebo písma) ZO. Zaznamenat užití jakýchkoli
					neobvyklých abeced, písem, znakových systémů.
				</p>
				<p dir="ltr">
					U toho pole vybíráme z přednastavené nabídky. Pokud jazyk v nabídce není,
					je třeba kontaktovat editora, aby jazyk do nabídky zadal.
				</p>
				<br/>
				<p dir="ltr">
					Země vydání
				</p>
				<p dir="ltr">
					Země vzniku jsou geografickým rejstříkovým heslem. Z nejpoužívanějších je
					vytvořen nabídkový seznam.
				</p>
				<br/>
				<p dir="ltr">
					Místo vydání
				</p>
				<p dir="ltr">
					Uvádí se město. Jedná se o místo vzniku objektu, může zůstat nevyplněné.
				</p>
				<p dir="ltr">
					Místo vzniku dokumentu je geografickým rejstříkovým heslem. Z
					nejpoužívanějších je vytvořen nabídkový seznam.
				</p>
				<p dir="ltr">
					Místní jméno se uvádí v současném úředním znění podle posledního platného
					lexikonu obcí vždy v nominativu, u zaniklých lokalit podle posledního
					úředního nebo jinak známého názvu, a to bez ohledu na to, že archiválie
					jsou z období, kdy toto místní jméno ještě nebylo užíváno.
				</p>
				<p dir="ltr">
					Informace o tom, kterého místa se obsahem ZO týká, je uvedena v
					geografickém zpřesnění, iinformace o fyzickém uložení je uvedena v polích
					týkajících se umístění/lokace ZO.
				</p>
				<p dir="ltr">
					- uvádíme město. U archivního fondu do tohoto pole uvedeme údaj o dataci,
					chronologickém rozpětí dochovaných dokumentů a datum vzniku/uložení fondu
					(tyto dva údaje oddělíme dvěma lomítky).
				</p>
				<br/>
				<p dir="ltr">
					Vydavatel
				</p>
				<p dir="ltr">
					Uvádí se název vydavatele/nakladatele/instituce nebo výrobce ZO.
				</p>
				<p dir="ltr">
					Instituce odpovědná za uložení, trvalou archivaci/uložení a nebo
					zpřístupnění v elektronické podobě. Může jít o instituci jako celek nebo o
					její podřízenou jednotku.
				</p>
				<p dir="ltr">
					Jméno instituce se uvádí dvěma způsoby:
				</p>
				<p dir="ltr">
					Celé jméno
				</p>
				<p dir="ltr">
					U podřízené jednotky pak formalizovaným zápisem: Celé jméno. Podřízená
					jednotka
				</p>
				<p dir="ltr">
					Za výrobce netextových děl se považují manufaktury, výrobní závody, které
					vyrobily dílo navržené autorem.
				</p>
				<br/>
				<br/>
				<p dir="ltr">
					Rok vydání
				</p>
				<p dir="ltr">
					Datum zveřejnění/vzniku ZO
				</p>
				<p dir="ltr">
					Datace okamžiku nebo období, v němž ZO vznikl,
				</p>
				<p dir="ltr">
					Časový rozsah vzniku archiválií se nemusí krýt s léty, v nichž původce
					působil, protože ne všechny dokumenty se dodnes zachovaly.
				</p>
				<p dir="ltr">
					U archivního fondu se uvádí údaj o dataci, datum vzniku či uložení fondu.
				</p>
				<p dir="ltr">
					U neznámé nebo nejisté datace s uvádí kvalifikovaný odhad ve formě časového
					intrevalu
				</p>
				<p dir="ltr">
					U archivního fondu uvádíme údaj o dataci, chronologickém rozpětí
					dochovaných dokumentů / datum vzniku či uložení fondu.
				</p>
				<br/>
				<p dir="ltr">
					Poznámka k datu vydání
				</p>
				<p dir="ltr">
					Zpřesnění o datu/datech vzniku dokument. Libovolně dlouhý text.
				</p>
				<p dir="ltr">
					Vysvětlení nejisté datace.
				</p>
				<p dir="ltr">
					Vysvětlení časových hiátů uvnitř intervalu.
				</p>
				<br/>
				<p dir="ltr">
					ISBN
				</p>
				<p dir="ltr">
					10 či 13-místné ISBN
				</p>
				<br/>
				<p dir="ltr">
					Označení vydání
				</p>
				<p dir="ltr">
					Uvádí se ve tvaru uvedeném v knize.
				</p>
				<br/>
				<p dir="ltr">
					Rozsah (počet stran, příloh, obrázky, přiložená média atd.) - fyzický popis
					objektu. U archivních fondů uvádíme údaj o množství dochovaného materiálů v
					běžných metrech.
				</p>
				<p dir="ltr">
					Uvádí se v případě potřeby rozsah, vybavení ZO ilustracemi, fotografiemi
				</p>
				<br/>
				<p dir="ltr">
					Rozsah udává počet a typ jednotek a/nebo podjednotek tvořících zdroj.
					Jednotka rozsahu je fyzická nebo logická složka zdroje, například svazek,
					digitální soubor, atd. Podjednotka rozsahu je fyzické nebo logické členění
					jednotky, například stránka svazku, záznam v digitálním souboru.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					xiii, 120 stran, ilustrace + CD
				</p>
				<p dir="ltr">
					1 svazek (různé stránkování)
				</p>
				<p dir="ltr">
					1 soubor
				</p>
				<p dir="ltr">
					300 stran, ilustrace, portréty
				</p>
				<p dir="ltr">
					58 096 evidenčních jednotek (5 383,48 bm) (fond)
				</p>
				<p dir="ltr">
					110 000 fotografií (z toho 101 754 pozitivů a 8 246 negativů) (sbírka)
				</p>
				<p dir="ltr">
					kartografický materiál je uložen v 12 plánových skříních, počet map a plánů
					se odhaduje na 3 200 kusů (sbírka)
				</p>
				<p dir="ltr">
					formát dokumentů odpovídá prodlouženému formátu A4 (série)
				</p>
				<p dir="ltr">
					fascikl obsahuje 18 dopisů (spis)
				</p>
				<br/>
				<p dir="ltr">
					Rozměr
				</p>
				<p dir="ltr">
					Uvádí se v centimetrech š x v (x h).
				</p>
				<br/>
				<p dir="ltr">
					Měřítko
				</p>
				<p dir="ltr">
					Uvádí se měřítko uvedené na mapě.
				</p>
				<br/>
				<p dir="ltr">
					Násobné umístění
				</p>
				<p dir="ltr">
					Uvádí souborné katalogy, které uvádějí umístění ZO např. Souborný katalog
					Národní knihovny nebo Centrální portál knihoven nebo digitální knihovny,
					kde lze ZO nalézt.
				</p>
				<br/>
				<p dir="ltr">
					Forma / žánr - typ objektu
				</p>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					osobní sbírka
				</p>
				<p dir="ltr">
					monografie
				</p>
				<p dir="ltr">
					konferenční sborník
				</p>
				<p dir="ltr">
					rozhovor
				</p>
				<br/>
				<p dir="ltr">
					Rok
				</p>
				<p dir="ltr">
					Vznik dokumentu (týká se především aktových dokumentů a archivních fondů).
				</p>
				<br/>
				<p dir="ltr">
					Edice
				</p>
				<p dir="ltr">
					Uvádí se ve tvaru uvedeném v knize.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Památné řeči. Číslo 5
				</p>
				<p dir="ltr">
					Jméno korporace
				</p>
				<p dir="ltr">
					Název / jméno instituce, školy, organizace.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Historický ústav Akademie věd ČR
				</p>
				<p dir="ltr">
					Okresní archiv Trutnov
				</p>
				<p dir="ltr">
					Sněžka, s.r.o.
				</p>
				<br/>
				<p dir="ltr">
					Jméno akce pro sborníky
				</p>
				<p dir="ltr">
					Pro konferenční sborníky. Jedná se o název konference nebo jiné akce, ze
					které dokument vzešel. U konference uvádíme v závorce i označení pořadí,
					rok a místo konference.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Krkonoše dnes (1. : 2020 : Vrchlabí, Česká republika)
				</p>
				<br/>
				<p dir="ltr">
					Obsah svazku
				</p>
				<p dir="ltr">
					Uvádí se významné části svazku, které se nezpracovávají samostatně. Užívá
					se pro nedílné části svazků, které se nepopisují samostatně - např. obsah.
				</p>
				<p dir="ltr">
					Konkrétní obsah svazku může být i jako příloha v pdf souboru.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Obsahuje části: Krajina, Lidé, Tance, Písně
				</p>
				<br/>
				<p dir="ltr">
					Roky vycházení
				</p>
				<p dir="ltr">
					Uvádí se roky vycházení včetně nejistých nebo pravděpodobných.
				</p>
				<br/>
				<p dir="ltr">
					Poznámka k letům vycházení
				</p>
				<p dir="ltr">
					Upřesnění roků vycházení.
				</p>
				<br/>
				<p dir="ltr">
					Název zdrojového dokumentu
				</p>
				<p dir="ltr">
					Odkaz na seznam. - Název zdrojového objektu samostatně zadaného v databázi
					jako Archivní fond/Sbírka, Elektronický zdroj, Periodikum, Svazek.
				</p>
				<p dir="ltr">
					V případě, že je vyplněn název zdrojového dokumentu - relevantní pole se
					vyplňují automaticky.
				</p>
				<p dir="ltr">
					Pole je neopakovatelné a musí obsahovat název zdrojového dokumentu.
				</p>
				<p dir="ltr">
					Propojení záznamů
				</p>
				<p dir="ltr">
					Zdrojový dokument/fond/sbírka článku, zvukové skladby, samostatně hodnotné
					části řady nebo kolekce, kapitola knihy
				</p>
				<p dir="ltr">
					Zdrojový dokument = Hostitelská jednotka by měla být také samostatným
					objektem - pokud zde popisujeme článek v časopise, měl by být zapsán i
					titul v časopisech, pokud kapitolu z knihy, měla by zapsána být i kniha,
					pokud archivní dokument, nebo část fondu pak archivní fond, pokud 3D objekt
					pak sbírka, ze které pochází.
				</p>
				<p dir="ltr">
					Ve chvíli, kdy se Archivní fond/Sbírka, Periodiku, Svazek, Elektronický
					zdroj stane Zdrojovým objektem, dostává příznak zdrojový dokument a je
					možné pak vytvořit virtuální sbírku/rejstřík Zdrojových dokumentů. Tedy
					zdrojů, které jsou rozepisovány na archivní jednotliviny, části fondů,
					sbírkové předměty, články, kapitoly nebo podstatné části významné samy o
					sobě.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Krkonošská Pravda
				</p>
				<br/>
				<p dir="ltr">
					Rok
				</p>
				<p dir="ltr">
					Rok vydání periodika. Určeno výhradně pro články z pravých i nepravých
					periodik.
				</p>
				<br/>
				<p dir="ltr">
					Ročník
				</p>
				<p dir="ltr">
					Ročník zdrojového objektu - periodika. Určeno výhradně pro články z pravých
					i nepravých periodik.
				</p>
				<br/>
				<p dir="ltr">
					Volume.
				</p>
				<p dir="ltr">
					Číslo zdrojového objektu - periodika. Určeno výhradně pro články z pravých
					i nepravých periodik.
				</p>
				<br/>
				<p dir="ltr">
					Datum
				</p>
				<p dir="ltr">
					Datum vydání periodika.
				</p>
				<br/>
				<p dir="ltr">
					Název korporace.
				</p>
				<p dir="ltr">
					Místo fyzického uložení objektu - výběr názvu z rejstříku osob nebo
					korporací. Uvádí se místo, kde se ZO nachází
				</p>
				<p dir="ltr">
					Místo uložení ZO.
				</p>
				<p dir="ltr">
					Uvádí se název korporace, preferuje se uložení v regionálních institucích.
				</p>
				<p dir="ltr">
					Ostatní - násobná uložení se uvádějí v poli Násobné uložení.
				</p>
				<p dir="ltr">
					U kapitoly z knihy se vypisuje automaticky ze zdrojového dokumentu.
				</p>
				<br/>
				<p dir="ltr">
					Podmínky přístupu
				</p>
				<p dir="ltr">
					Výběr z nabídky nebo doplnit vlastní
				</p>
				<p dir="ltr">
					Musí být uvedena licence a práva užití. U kapitoly se vypisuje automaticky
					ze zdrojového dokumentu.
				</p>
				<p dir="ltr">
					Uvádí se, jak je ZO dostupný v instituci uvedené v poli Název korporace:
				</p>
				<p dir="ltr">
					online
				</p>
				<p dir="ltr">
					prezenčně
				</p>
				<p dir="ltr">
					přístupné po domluvě - soukromá sbírka
				</p>
				<p dir="ltr">
					přístupné po domluvě- instituce
				</p>
				<p dir="ltr">
					nepřístupné
				</p>
				<p dir="ltr">
					dostupné online s omezením
				</p>
				<p dir="ltr">
					absenčně
				</p>
				<p dir="ltr">
					autorská práva
				</p>
				<p dir="ltr">
					licence zveřejnění
				</p>
				<p dir="ltr">
					vlastní
				</p>
				<br/>
				<p dir="ltr">
					Umístění v instituci
				</p>
				<p dir="ltr">
					Všechny údaje, které vedou v rámci uvedené instituce ke ZO. Včetně
					informace o umístění v jiných budovách instituce. Uvádí se umístění ZO v
					instituci uvedené v poli Název korporace - budova, část instituce, umístění
					v soukromých sbírkách.
				</p>
				<p dir="ltr">
					.
				</p>
				<p dir="ltr">
					Umístění ve fondu / Lokace
				</p>
				<p dir="ltr">
					Údaje určující uložení ZO v uvedené instituci
				</p>
				<p dir="ltr">
					Referenční kódy/inventární čísla/signatury/lokace.Uvádí se údaje, které
					jednoznačně ZO identifikují v instituci uvedené v poli uvedené v poli Název
					korporace
				</p>
				<p dir="ltr">
					Údaj, který určuje fyzické lokace ZO.
				</p>
				<p dir="ltr">
					Signatura, inventární číslo, kód depozitáře, referenční kód....
				</p>
				<p dir="ltr">
					U nezpracovaného fondu se uvádí například číslo přírůstku.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					SG 2346
				</p>
				<p dir="ltr">
					C128/129
				</p>
				<p dir="ltr">
					1.12.138
				</p>
				<br/>
				<p dir="ltr">
					URL digitalizovaného dokumentu
				</p>
				<p dir="ltr">
					URL digitalizátu v našem repozitáři. URL ZO v našem úložišti
				</p>
				<p dir="ltr">
					Odkaz na Plný text v našem úložišti – dokument je přístupný bez omezení,
					přílohy, obrázky, vlastní digitalizované kopie.
				</p>
				<br/>
				<p dir="ltr">
					URL externího umístění
				</p>
				<p dir="ltr">
					Elektronický zdroj musí být před zadáním některého objektu, který obsahuje,
					zadán jako samostatný objekt Elektronický zdroj.
				</p>
				<br/>
				<p dir="ltr">
					URL vedoucí k dokumentu v externím zdroji
				</p>
				<p dir="ltr">
					Externí umístění digitalizátu, URL vedoucí přímo na digitalizát.
				</p>
				<p dir="ltr">
					Kompletní internetová adresa, kde je dokument umístěn. Jedná se o odkaz na
					instituci.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					<a href="https://www.krnap.cz/km-jilemnice/">
						https://www.krnap.cz/km-jilemnice/
					</a>
				</p>
				<br/>
				<br/>
				<p dir="ltr">
					Formát / Jak to vypadá
				</p>
				<p dir="ltr">
					Informovat o jakýchkoli důležitých fyzických vlastnostech a technických
					požadavcích, které mají vliv na využití ZO.
				</p>
				<p dir="ltr">
					Zaznamenat užití jakýchkoliv neobvyklých abeced, písem, znakových systémů
					nebo
				</p>
				<p dir="ltr">
					zkratek.
				</p>
				<p dir="ltr">
					- čitelnost, kvalitu tisku, papíru, neúplnost, vyjímečnost
				</p>
				<p dir="ltr">
					Fyzický materiál nebo nosič, na kterém je informace zaznamenána (papír,
					pergamen)
				</p>
				<p dir="ltr">
					Označení datového formátu digitálního souboru hlavní části zdroje.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					strojopis
				</p>
				<br/>
				<p dir="ltr">
					Archivní pomůcky
				</p>
				<p dir="ltr">
					Podat informaci o jakýchkoli vyhledávacích pomůckách, které vznikly v
					depozitáři (archivu) nebo u původce archiválií a které podávají informaci o
					souvislostech (kontextu) a obsahu jednotky popisu. Jestliže je to vhodné,
					zahrnout informaci, kde je možné získat kopii pomůcky.
				</p>
				<br/>
				<p dir="ltr">
					Abstrakt / Popis
				</p>
				<p dir="ltr">
					Textový popis zachycující detaily vztahující se k obsahu ZO.
				</p>
				<p dir="ltr">
					Abstrakt obsahuje neformalizovanou poznámku týkající se obsahu a rozsahu
					popisované jednotky. Může to být resumé, výtah atd. nebo jen fráze
					popisující obsah. Stručný, výstižný popis obsahu zdroje.
				</p>
				<p dir="ltr">
					Identifikace podstaty, která uživateli umožňuje poznat význam jednotky.
				</p>
				<p dir="ltr">
					Neopakují se informace, které jsou uvedeny v jiných prvcích.
				</p>
				<br/>
				<p dir="ltr">
					Obsah dokumentace: pohledy, řezy, půdorysy
				</p>
				<p dir="ltr">
					Obsah mapy (prvky legendy): vodní toky, vesnice, císařské silnice
				</p>
				<br/>
				<p dir="ltr">
					Název přílohy
				</p>
				<p dir="ltr">
					Převzatý nebo vlastní název. Příloha, která není samostatně zpracovávaná
					(obálka, obsah).
				</p>
				<br/>
				<p dir="ltr">
					Poznámka k přístupu
				</p>
				<p dir="ltr">
					Zpřesnění informace o dostupnosti objektu.
				</p>
				<p dir="ltr">
					V případě komplikovaných nebo kombinovaných podmínek přístupu Uvádí se
					vysvětlení.
				</p>
				<p dir="ltr">
					Zpřesnění informace o dostupnosti objektu
				</p>
				<p dir="ltr">
					Poskytnout informace o právním stavu nebo jiných předpisech, které omezují
					nebo
				</p>
				<p dir="ltr">
					ovlivňují přístupnost jednotky popisu.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Dokument přístupný pouze registrovaným uživatelům
				</p>
				<br/>
				<p dir="ltr">
					Poznámka k umístění
				</p>
				<p dir="ltr">
					Zpřesnění informace o umístění objektu. Dostupnost dokumentu v případě, že
					digitalizát není uložený v PK. Vysvětlující poznámka.
				</p>
				<br/>
				<p dir="ltr">
					URL pro násobné umístění
				</p>
				<p dir="ltr">
					Uvádí se URL ZO v souborných katalozích, které uvádějí umístění ZO - např.
					Souborný katalog Národní knihovny nebo Centrální portál knihoven nebo
					digitální knihovny nebo zdigitalizované fondy/sbírky, kde lze ZO nalézt.
				</p>
				<br/>
				<br/>
				<p dir="ltr">
					Poznámka
				</p>
				<p dir="ltr">
					Sem uvádíme poznámky k objektu. Jednotlivé poznámky odděluje dvěma lomítky
					z obou stran oddělenými mezerami - //
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Na titulním listu uvedeno jméno autora chybně // Vydáno také v němčině
				</p>
				<br/>
				<p dir="ltr">
					Technologická poznámka
				</p>
				<p dir="ltr">
					Poznámka k popisu objektu.
				</p>
				<br/>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Na webu databáze je informace o tom, že se celý obsah bude přesouvat na
					nový web.
				</p>
				<br/>
				<br/>
				<p dir="ltr">
					URL příloh k dokumentu (obrázky)
				</p>
				<p dir="ltr">
					Kompletní internetová adresa, kde jsou umístěny přílohy k dokumentu.
				</p>
				<br/>
				<p dir="ltr">
					URL dokumentu (plnému textu)
				</p>
				<p dir="ltr">
					Kompletní internetová adresa, kde je dokument umístěn. Jde o přímou cestu k
					plnému textu elektronického dokumentu uloženého jinde než u nás
					(elektronický článek, webová adresa)
				</p>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					<a
						href="http://opera.krnap.cz/apex/f?p=103:12:2069950387499::NO::P12_ROCNIK_ID:55"
					>
						http://opera.krnap.cz/apex/f?p=103:12:2069950387499::NO::P12_ROCNIK_ID:55
					</a>
				</p>
				<br/>
				<p dir="ltr">
					Název webu
				</p>
				<p dir="ltr">
					Název www stránky. Toto pole se vztahuje k poli URL dokumentu.
				</p>
				<p dir="ltr">
					Příklad:
				</p>
				<p dir="ltr">
					Databáze národních autorit NK ČR - pro tento odkaz:
					<a
						href="https://aleph.nkp.cz/F/?func=file&amp;file_name=find-b&amp;local_base=aut"
					>
						https://aleph.nkp.cz/F/?func=file&amp;file_name=find-b&amp;local_base=aut
					</a>
				</p>
				<br/>
				<p dir="ltr">
					Digitalizovaná příloha, obrázek, obálka
				</p>
				<p dir="ltr">
					Do tohoto pole vkládáme pouze informaci o tom, zda zadavatel získal
					(zdigitalizoval, naskenoval) nějaký text, obrázek, obálku knihy apod. Do
					tohoto pole pouze zadavatel vloží písmeno velká A - pokud digitalizovaný
					objekt má NEBO písmeno velké N - pokud jej nemá.
				</p>
				<p dir="ltr">
					Tento digitalizovaný objekt zadavatel vloží do souboru na sdíleném disku
					(Drive) nebo jej zašle editorovi.
				</p>
				<br/>
				<p dir="ltr">
					Osoba, korporace jako předmět
				</p>
				<p dir="ltr">
					Jde o jmennou autoritu. Tuto autoritu zadavatel vybírá (pokud daná autorita
				existuje) z rejstříků HiÚ -    <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a> nebo
				souboru Národních autorit NK ČR -    <a href="https://autority.nkp.cz/">https://autority.nkp.cz/</a> . Tento
					údaj vkládáme včetně životních dat u fondu osoby nebo o časovém rozmezí
					existence instituce.
				</p>
				<br/>
				<p dir="ltr">
					Chronologický termín
				</p>
				<p dir="ltr">
					Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků
					HiÚ - <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a>
				</p>
				<br/>
				<p dir="ltr">
					Geografický termín
				</p>
				<p dir="ltr">
					Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků
					HiÚ - <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a>
				</p>
				<br/>
				<p dir="ltr">
					Téma
				</p>
				<p dir="ltr">
					Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků
					HiÚ - <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a>
				</p>
				<br/>
				<p dir="ltr">
					Klíčové slovo
				</p>
				<p dir="ltr">
					Tuto autoritu zadavatel vybírá (pokud daná autorita existuje) z rejstříků
					HiÚ - <a href="https://biblio.hiu.cas.cz/">https://biblio.hiu.cas.cz/</a>
				</p>
				<p dir="ltr">
					Klíčových slov je možno uvádět více. Jednotlivá klíčová slova oddělujeme
					dvěma lomítky s oboustrannou mezerou - //
				</p>
				<br/>
				<p dir="ltr">
					Poznámka pro editora
				</p>
				<p dir="ltr">
					Do tohoto pole je možno napsat poznámku / vzkaz pro editora / čističe.
				</p>
				<br/>
				<br/>

			</Paper>
		)
	}
}

export default ManualPage