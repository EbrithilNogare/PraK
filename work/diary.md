**This file will contains progress of development this app.**
**For easier and faster work, I will write it in Czech language.**
**For lost souls looking for documentation, this is NOT oficial documentation.**

**Kapitanuv denik hvezdny datum 3.4.2020**
... nazveme to pocatek epochy

Denik zakladam v rane fazi,
tak snad tu bude vse a ze ho budu pouzivat az do dokonceni projektu,
pokud neco takoveho existuje.

Za tri dny jsem udelal zakladni prostredi v Reactu, 
tudiz mame alespon nejaky skelet toho jak to ma vypadat.

Pote jsem dostal pristupy na server.
Pres ssh na questa na mff a pote dalsim ssh na nas server.
Pry tam jde udelat tunel, ale tim se nehodlam zdrzovat,
az tak casto tam snad nebudu.

Naistaloval par potrebnych veci jako vim atd.
Nahral jsem react k sobe na home a spustil,
dobra zprava je ze to fungovalo a ja videl spravny *title*
spatna, ze se nenacetly js a css soubory, takze 
nebylo videt nic dalsiho, ale to je problem s webpackem.
Stacilo by zajit do modulu reactu a prekonfigurovat webpack tam,
ale to mi neprijde hezke. Tak to zatim necham takhle.

Kacka sehnala nejakeho capka, co mi poradil, ze
bude potreba udelat backend v expressu.
A ohledne databaze to taky nebde jednoduche.

Zacinam se tedy ucit Express a zkusim po Kacce napad na DB.
Aktualni stav je tedy basic react app a basic api od expressu.
nejsou propojene, ale alespon neco uz konecne funguje.

Budu potrebovat forward na dalsi port od ufalu, protoze pres 80
nechci tahat uplne vsechno (API).

databaze bude interni, takze tu forwardovat nebudu muset.



Dnes jsem pokrocil v instalaci MongoDB.
Zatim ji mam u sebe a az si budu jisty ze ji rozumim,
zkusim ji nainstalovat i na nas server.

Zatim to tedy vypada ze mam 3 funkcni casti na nejvic basic urovni.
Zbyva je jen propojit mezi sebou.
Na serveru by to pry melo jit pres nginx, tak uvidime, jak to bude intuitivni.



Jelikoz bych musel pro testovani udrzovat lokalni verzi databaze,
tak nove prechazim na MongoDB Atlas, coz je free databaze na webu.
Tim mi i docasne odpada nutnost konfigurovat mongoDB na serveru i na lokalu.

Ted budu pokracovat na konfiguraci api, aby bylo pristupne pro frontend.



Jelikoz mi nebyly poskytnuty dalsi porty, pres ktere bych tahnul api,
byl jsem donucen vyresit to pres proxy.
Nakonec to neni ani tak spatne.
Bylo nutne spravne nakonfigurovat nginx, pres config soubor v
/etc/nginx/sites-available/default

Po par hodinach kdy mi to nefungovalo, jsem si vzpomel, ze jsem upravil 
ip tabulku routu a port 80 smeroval na 8080, proto mi to nginx nebral.

po smazani zaznamu se nginx chytil a fungoval

Pro snazsi praci jsem doplnil i PM2, ktery mi pomuze
monitorovat server vzdalene (po spusteni pm2 monitor)
na adrese app.pm2.io/


Dneska se ma vybirat grafik, co mi bude kecat do prace.
Takze konec svobody a vitej hromado nesplnitelnych pozadavku.
Snad to nebude nikdo kdo webovky jen kresli v malovani.

Radeji jsem pokrocil na designu input sceny vcetne navBaru,
at mam alespon nejakou ukazku co chceme.

Kdyz jsem chtel input scenu poslat, zjistil jsem ze nginx je
spatne nastaven a snazi se dostat do slozky i kdyz
to neni odkaz na slozku ... /prak/input

Tudiz jsem ho prenastavil, snad bude staci redirect na static slozku stacit

Rovnou jsem tam prihodil 404 error page,
at se mam cim kochat, az to zase nebude fungovat
