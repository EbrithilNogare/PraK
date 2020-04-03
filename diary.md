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
