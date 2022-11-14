Stažení a instalace software
============================
Desktopová aplikace je distribuována ve verzích pro Windows 11 a pro MacOS/Linux
jako zdrojový kód v .py formátu (soubor programovacího jazyka Python, konkrétně
Python Interpreter 3.9).

Po stažení je třeba zajistit instalaci všech potřebných knihoven a packages, které
aplikace implementuje. Doporučuje se použít některý z široce využívaných volně
dostupný Python IDE, například PyCharm, které umožňují jejich automatickou a
jednoduchou instalaci a správu. Pro manuální správu je zde přiložen kompletní
seznam packages a modulů v python syntaxi:

```
import sys
import io
import re
from PyQt5 import QtCore, QtGui, QtWidgets,
QtWebEngineWidgets
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QFileDialog, QTableWidgetItem
import csv
import pandas as pd
import requests
import docx2txt
import pytesseract
from PIL import Image
import folium
from folium import Popup
from geopy.geocoders import Nominatim
```

Pro Tesseract OCR je třeba nainstalovat příslušnou knihovnu s českými trénovacími daty, která se nachází zde:
https://github.com/tesseract-ocr/tessdata/blob/main/ces.traineddata.
Dokumentace k instalaci se nachází zde:
https://github.com/tesseract-ocr/tessdoc/blob/main/Installation.md

Ke správnému provozu aplikace je nezbytné stabilní internetové připojení.