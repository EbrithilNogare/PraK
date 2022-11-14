import csv
import sys

import docx2txt
from PyQt5 import QtCore, QtGui, QtWidgets, QtWebEngineWidgets
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap
from PyQt5.QtWidgets import QFileDialog, QTableWidgetItem
import requests
import pytesseract
from PIL import Image
import pandas as pd
from folium import Popup
from geopy.geocoders import Nominatim
import io
import re
import folium



class NoneType:
    pass


class Ui_HA_APP(object):






    def setupUi(self, HA_APP):
        HA_APP.setObjectName("Prameny Krkonoš - Opevněná Krajina 1938")
        HA_APP.resize(1920, 1080)
        palette = QtGui.QPalette()
        brush = QtGui.QBrush(QtGui.QColor(243, 234, 191))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(255, 249, 240))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Base, brush)
        brush = QtGui.QBrush(QtGui.QColor(240, 229, 188))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Window, brush)
        brush = QtGui.QBrush(QtGui.QColor(243, 234, 191))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(255, 249, 240))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Base, brush)
        brush = QtGui.QBrush(QtGui.QColor(240, 229, 188))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Window, brush)
        brush = QtGui.QBrush(QtGui.QColor(243, 234, 191))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(240, 229, 188))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Base, brush)
        brush = QtGui.QBrush(QtGui.QColor(240, 229, 188))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Window, brush)
        HA_APP.setPalette(palette)
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(14)
        HA_APP.setFont(font)
        HA_APP.setToolButtonStyle(QtCore.Qt.ToolButtonFollowStyle)
        HA_APP.setDockNestingEnabled(True)
        palette = QtGui.QPalette()
        brush = QtGui.QBrush(QtGui.QColor(243, 242, 194))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Active, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(243, 242, 194))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Inactive, QtGui.QPalette.Button, brush)
        brush = QtGui.QBrush(QtGui.QColor(243, 242, 194))
        brush.setStyle(QtCore.Qt.SolidPattern)
        palette.setBrush(QtGui.QPalette.Disabled, QtGui.QPalette.Button, brush)
        self.centralwidget = QtWidgets.QWidget(HA_APP)
        self.centralwidget.setObjectName("centralwidget")
        # setup glocals
        self.text = ()
        self.all_data = ()


        self.master_label = QtWidgets.QLabel(self.centralwidget)
        self.master_label.setGeometry(QtCore.QRect(10, 10, 800, 80))
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(26)
        font.setBold(True)
        font.setWeight(75)
        self.master_label.setFont(font)
        self.master_label.setObjectName("master_label")
        self.project_logo = QtWidgets.QLabel(self.centralwidget)
        # logo = QPixmap.('RG_logo.png')
        # self.project_logo.setPixmap(logo)
        # self.info_field.setGeometry(40, 1740, 100, 100)

        # inputs section

        self.inputs_label = QtWidgets.QLabel(self.centralwidget)
        self.inputs_label.setGeometry(QtCore.QRect(50, 135, 400, 40))
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.inputs_label.setFont(font)
        self.inputs_label.setObjectName("inputs_label")

        self.text_file_label = QtWidgets.QLabel(self.centralwidget)
        self.text_file_label.setGeometry(QtCore.QRect(50, 180, 161, 20))
        self.text_file_label.setObjectName("text_file_label")
        self.text_file_name = QtWidgets.QLineEdit(self.centralwidget)
        self.text_file_name.setGeometry(QtCore.QRect(40, 208, 320, 31))
        self.text_file_name.setObjectName("text_file_name")

        self.audio_file_label = QtWidgets.QLabel(self.centralwidget)
        self.audio_file_label.setGeometry(QtCore.QRect(50, 260, 161, 20))
        self.audio_file_label.setObjectName("audio_file_label")
        self.audio_file_name = QtWidgets.QLineEdit(self.centralwidget)
        self.audio_file_name.setGeometry(QtCore.QRect(40, 285, 320, 31))
        self.audio_file_name.setObjectName("audio_file_name")


        self.ocr_file_label = QtWidgets.QLabel(self.centralwidget)
        self.ocr_file_label.setGeometry(QtCore.QRect(50, 334, 310, 20))
        self.ocr_file_label.setObjectName("ocr_file_label")
        self.ocr_file_name = QtWidgets.QLineEdit(self.centralwidget)
        self.ocr_file_name.setGeometry(QtCore.QRect(40, 360, 320, 31))
        self.ocr_file_name.setObjectName("ocr_file_name")

        # file browser buttons + analyze
        self.text_file_browse = QtWidgets.QPushButton(self.centralwidget)
        self.text_file_browse.setGeometry(QtCore.QRect(360, 190, 90, 60))
        self.text_file_browse.setObjectName("text_file_browse")
        self.text_file_browse.clicked.connect(self.text_file_browser)
        self.text_file_browse.clicked.connect(self.text_file_analyzer)

        self.audio_file_browse = QtWidgets.QPushButton(self.centralwidget)
        self.audio_file_browse.setGeometry(QtCore.QRect(360, 269, 90, 60))
        self.audio_file_browse.setObjectName("audio_file_browse")
        self.audio_file_browse.clicked.connect(self.audio_file_browser)
        self.audio_file_browse.clicked.connect(self.audio_file_analyzer)

        self.ocr_file_browse = QtWidgets.QPushButton(self.centralwidget)
        self.ocr_file_browse.setGeometry(QtCore.QRect(360, 345, 90, 60))
        self.ocr_file_browse.setObjectName("ocr_file_browse")
        self.ocr_file_browse.clicked.connect(self.ocr_file_browser)
        self.ocr_file_browse.clicked.connect(self.ocr_file_analyzer)

        self.info_field = QtWidgets.QLabel(self.centralwidget)
        self.info_field.setGeometry(40, 640, 420, 500)
        self.info_field.setWordWrap(True)
        self.info_field.setAlignment(Qt.AlignJustify)
        self.info_field.setText('Strojové učení je dnes již běžnou, i když neviditelnou součástí každodenního života. '
                                'Vyzkoušejte si v čem může pomoci i v historickém bádání, všechny zde '
                                'prezentované nástroje jsou komukoliv k dispozici zadarmo a k dosažení online. Vyberte si '
                                'pomocí vyhledavačů nahoře některý ze zdrojů a můžete se pustit do transkripce.')

        # input text box
        self.text_box = QtWidgets.QPlainTextEdit(self.centralwidget)
        self.text_box.setGeometry(QtCore.QRect(600, 175, 500, 400))
        self.text_box.setPalette(palette)
        self.text_box.setObjectName("text_box")
        self.text_box_label = QtWidgets.QLabel(self.centralwidget)
        self.text_box_label.setGeometry(QtCore.QRect(600, 135, 300, 40))
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.text_box_label.setFont(font)
        self.text_box.setObjectName("text_box_label")

        # translate box
        self.translate_box = QtWidgets.QPlainTextEdit(self.centralwidget)
        self.translate_box.setGeometry(QtCore.QRect(600, 640, 500, 400))
        self.translate_box.setObjectName("translate_box")
        self.translate_label = QtWidgets.QLabel(self.centralwidget)
        self.translate_label.setGeometry(QtCore.QRect(600, 600, 300, 40))
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.translate_label.setFont(font)
        self.translate_label.setObjectName("translate_label")

        # analyze entitites button
        self.analyze_entities_button = QtWidgets.QPushButton(self.centralwidget)
        self.analyze_entities_button.setGeometry(QtCore.QRect(125, 430, 190, 60))
        self.analyze_entities_button.setObjectName("analyze_entities_button")
        self.connect = self.analyze_entities_button.clicked.connect(self.translator_de)
        self.connect = self.analyze_entities_button.clicked.connect(self.entities_analyzer)
        self.connect = self.analyze_entities_button.clicked.connect(self.convert_entities)
        self.connect = self.analyze_entities_button.clicked.connect(self.fill_entities)
        self.connect = self.analyze_entities_button.clicked.connect(self.filter_locations)
        self.connect = self.analyze_entities_button.clicked.connect(self.coordinates_finder)
        self.connect = self.analyze_entities_button.clicked.connect(self.display_locations)


        # analyze entities box
        self.Entities_box = QtWidgets.QTableWidget(self.centralwidget)
        self.Entities_box.setGeometry(QtCore.QRect(1200, 175, 500, 400))
        self.Entities_box.setObjectName("Entities_box")
        self.Entities_box.setColumnCount(3)
        self.Entities_box.setHorizontalHeaderLabels(['Pořadí slov', 'Kategorie', 'Výraz'])
        self.Entities_box.setRowCount(0)
        self.entities_label = QtWidgets.QLabel(self.centralwidget)
        self.entities_label.setGeometry(QtCore.QRect(1200, 135, 300, 40))
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.entities_label.setFont(font)
        self.entities_label.setObjectName("entities_label")


        # maps frame
        # self.maps_frame = QtWidgets.QFrame(self.centralwidget)
        # self.maps_frame.setGeometry(QtCore.QRect(1150, 40, 391, 331))
        # self.maps_frame.setFrameShape(QtWidgets.QFrame.StyledPanel)
        # self.maps_frame.setFrameShadow(QtWidgets.QFrame.Raised)
        # self.maps_frame.setLineWidth(2)
        # self.maps_frame.setObjectName("maps_frame")
        # name cloud frame

        HA_APP.setCentralWidget(self.centralwidget)

        #map
        self.map_krkonose = folium.Map(location=[50.627145, 15.609578], zoom_start=11)
        data = io.BytesIO()
        folium.Marker(location=[50.627145, 15.609578], popup="střed světa", parse_html=True).add_to(self.map_krkonose)
        #folium.Marker(location=[50.6, 15.6], popup="kousek od středu světa", parse_html=True).add_to(self.map_krkonose)
        self.map_krkonose.save(data, close_file=False)
        self.plot_map = QtWebEngineWidgets.QWebEngineView(self.centralwidget)
        self.plot_map.setGeometry(QtCore.QRect(1200, 640, 500, 400))
        self.plot_map.setHtml(data.getvalue().decode())

        folium.Marker(location=[50.6, 15.6], popup="kousek od středu světa", parse_html=True).add_to(self.map_krkonose)
        self.map_krkonose.save(data, close_file=False)
        self.plot_map.destroy()
        self.plot_map = QtWebEngineWidgets.QWebEngineView(self.centralwidget)
        self.plot_map.setGeometry(QtCore.QRect(1200, 640, 500, 400))
        self.plot_map.setHtml(data.getvalue().decode())

        # status bar
        self.statusBar = QtWidgets.QStatusBar(HA_APP)
        self.statusBar.setObjectName("statusBar")
        HA_APP.setStatusBar(self.statusBar)

        self.statusBar.showMessage("Připraven")

        self.retranslateUi(HA_APP)
        QtCore.QMetaObject.connectSlotsByName(HA_APP)

    # text_placeholders_labels
    def retranslateUi(self, HA_APP):
        _translate = QtCore.QCoreApplication.translate
        HA_APP.setWindowTitle(_translate("HA_APP", "Prameny Krkonoš - HA_APP"))
        self.text_file_label.setText(_translate("HA_APP", "Textový soubor"))
        self.text_file_name.setText(_translate("HA_APP", ".docx"))
        self.audio_file_label.setText(_translate("HA_APP", "Audionahrávka"))
        self.audio_file_name.setText(_translate("HA_APP", ".wav, .mp3..."))
        self.ocr_file_name.setText(_translate("HA_APP", ".jpg, .tiff..."))
        self.ocr_file_label.setText(_translate("HA_APP", "Naskenovaný dokument"))
        self.text_file_browse.setText(_translate("HA_APP", "[...]"))
        self.audio_file_browse.setText(_translate("HA_APP", "[...]"))
        self.ocr_file_browse.setText(_translate("HA_APP", "[...]"))
        self.text_box.setPlainText(_translate("HA_APP", "Jaký text se skrývá v souboru?"))
        self.translate_box.setPlainText(_translate("HA_APP", "Jak vypadá text v němčině?"))
        self.translate_label.setText(_translate("HA_APP", "Překlad"))
        self.analyze_entities_button.setText(_translate("HA_APP", "Analyzovat"))
        font = QtGui.QFont()
        font.setFamily("Optima")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.analyze_entities_button.setFont(font)
        self.entities_label.setText(_translate("HA_APP", "Klíčová slova"))
        self.text_box_label.setText(_translate("HA_APP","Transkript"))
        self.inputs_label.setText(_translate("HA_APP", "Vyberte typ dokumentu"))
        self.master_label.setText(_translate("HA_APP", "Historické prameny a strojové učení"))


    # browsers
    def text_file_browser(self):
        fname = QFileDialog.getOpenFileName(None, 'Vyberte textový soubor', '', 'Text (*.docx)')
        self.text_file_name.setText(fname[0])

    def audio_file_browser(self):
        self.text_box.setPlainText('Zpracování audionahrávek trvá delší dobu, prosíme o trpělivost:)')
        self.info_field.setText('Jedním z nejrozšířenějších využití strojového učení je rozpoznávání lidské řeči '
                                '(Automatic Speech Recognition, ASR). Daný software se učí rozpoznávat řečové signály a '
                                'nacházet v nich odpovídající úseky přirozeného jazyka za pomoci tzv. jazykového modelu.'
                                'Zde byl využit český model UWebASR Západočeské Univerzity v Plzni, který využívá '
                                'například i Česká Televize pro automatické titulkování. Pomalu  můžete přistoupit k '
                                'analýze transkriptu')
        fname = QFileDialog.getOpenFileName(None, 'Vyberte audionahrávku', '', 'Audio (*.wav *.mp3 *.m4a)')
        self.audio_file_name.setText(fname[0])


    def ocr_file_browser(self):
        fname = QFileDialog.getOpenFileName(None, 'Vyberte Sken', '', 'Sken (*.png *.tiff *.jpeg *.jpg)')
        self.ocr_file_name.setText(fname[0])

    # analyzers - WRITE UP DEDICATIONS!
    def audio_file_analyzer(self):
        try:
            url = 'https://lindat.cz/services/uwebasr/api/v1/CLARIN_ASR/CZ'
            file: str = self.audio_file_name.text()
            payload = open(file, 'rb')
            headers = {'content-type': 'text/plain', 'charset': 'UTF-8'}
            res_audio = requests.post(url, data=payload, headers=headers)
            text_audio = res_audio.text
            self.text = text_audio
            self.text_box.setPlainText(text_audio)
            self.statusBar.showMessage('Hotovo!', 4000)
        except Exception:
            self.statusBar.showMessage('Zkotrolujte připojení k internetu, vyberte soubor a zkuste znovu!')
            self.text_box.setPlainText('Nelze přepisovat:(')
            pass

    def text_file_analyzer(self):
        self.info_field.setText('Základem jakékoliv práce je převod pramenů do podobz strojově čitelného textu a tedy digitálně'
                                'zpracované informace. To se týká všech různých druhů dokumentů. Nyní můžete přistoupit'
                                ' k analýze transkriptu.')
        try:
            doc = docx2txt.process(self.text_file_name.text(), '')
            self.text_box.setPlainText(doc)
            self.statusBar.showMessage('Hotovo!', 4000)
            self.text = doc
        except Exception:
            self.statusBar.showMessage('Vyberte soubor a zkuste znovu!')
            self.text_box.setPlainText('Nelze přepisovat:(')
            pass


    def ocr_file_analyzer(self):
        self.info_field.setText('Rozpoznávání optických znaků (Optical Character Recognition, OCR), pracuje s modely'
                                ' rozpoznávání vizuálních vzorců, které následně srovnává s tištěným '
                                'písmem. Hodí se tak i k přepisování naskenovaných archiválií. Zde je využit jazykový '
                                'model pro češtinu open source nástroje Tesseract, který s příspěvkem UB Mannheim '
                                'opečovává komunita dobrovolníků v online prostoru. Nyní můžete přistoupit'
                                ' k analýze transkriptu.')
        try:
            im = Image.open(self.ocr_file_name.text())
            pic = pytesseract.image_to_string(im, lang="ces")
            self.text: str = pic
            self.text_box.setPlainText(pic)
            self.statusBar.showMessage('Hotovo!', 4000)
        except Exception:
            self.statusBar.showMessage('Vyberte soubor a zkuste znovu!')
            self.text_box.setPlainText('Nelze přepisovat:(')
            pass

    # translators
    def translator_de(self):
        self.info_field.setText('Ve stále výraznější míře bývaji umělá inteligence a strojové učení uplatňovány '
                                'při práci s jazykem na vyšší úrovni. Typicky se jedná o překlady a identifikaci '
                                'některých zajímavých elementů. V pravé části obrazovky je představeno '
                                'kvalitativní rozpoynávání jmenných entit, zde využité pro identifikaci '
                                'potenciálních klíčových slov, která daný software umí rozpoznat a kategorizovat. '
                                'Využity jsou zde modely pro češtinu vyvinuté Ústavem formální a aplikované lingvistiky '
                                'MFF UK a nástroj NameTag2 taktéž z jeho produkce.')
        try:
            input_text = self.text
            params_trans = (
                ("input_text", input_text), ("accept", "text/plain"), ("Content-Type",
                                                                       "application/x-www-form-urlencoded"))
            res = requests.post(
                "https://lindat.mff.cuni.cz/services/translation/api/v2/models/cs-en?src=cs&tgt=en", params_trans)
            res.encoding = 'utf8'
            en_trans = res.text
            params_trans_de = (
            ("input_text", en_trans), ("accept", "text/plain"), ("Content-Type", "application/x-www-form"
                                                                                  "-urlencoded"))
            res = requests.post(
                "https://lindat.mff.cuni.cz/services/translation/api/v2/models/en-de?src=en&tgt=de", params_trans_de)
            res.encoding = 'utf8'
            self.de_trans = res.text
        except Exception:
            self.statusBar.showMessage("Zkotrolujte připojení k internetu a zkuste znovu!")
            self.de_trans = 'Server unerreichbar:('
            pass
        self.translate_box.setPlainText(self.de_trans)


    # entities analyzer
    def entities_analyzer(self):
        fulltext = self.text
        params = (('data', fulltext), ('output', 'vertical'))
        try:
            res = requests.get(
                "http://lindat.mff.cuni.cz/services/nametag/api/recognize", params)
            res.encoding = 'utf8'
            output_data = res.json()
            entities = output_data['result']
            output_entities = open('entities.tsv', 'w+')
            output_entities.write(entities)
        except Exception:
            entities = 'N/A'
            output_entities = open('entities.tsv', 'w+')
            output_entities.write(entities)
            self.statusBar.showMessage("Zkotrolujte připojení k internetu, vyberte soubor a zkuste znovu!")
            pass


    def convert_entities(self):
        tsv = open('entities.tsv', 'r')
        fileContentA = tsv.read()
        fileContentB = re.sub(',', '-', fileContentA)
        fileContentC = re.sub('\t', ',', fileContentB)
        csv_file = open('entities.csv', 'w', encoding='utf-8')
        csv_file.write(fileContentC)

    # displayers
    def fill_entities(self):
        self.all_data = pd.read_csv('entities.csv')
        numRows = len(self.all_data.index)
        self.Entities_box.setRowCount(numRows)
        for i in range(0, 3):
            try:
                for j in range(numRows):
                    self.Entities_box.setItem(j,i,QTableWidgetItem(str(self.all_data.iat[j,i])))
            except Exception:
                pass
        self.Entities_box.resizeColumnsToContents()

    def filter_locations(self):
        numRows = len(self.all_data.index)
        locations_list = open('locations.csv', 'w+', newline='', encoding='utf-8')
        geocodes = ['gc', 'gu', 'gq', 'gs', 'gr']
        data = []
        for i in range(numRows):
            for j in geocodes:
                if self.all_data.iat[i, 1] == j:
                    data.append(self.all_data.iat[i, 2])
        write = csv.writer(locations_list)
        for a in data:
            write.writerow([a])

    def coordinates_finder(self):
        Nom = Nominatim(user_agent='Ui_HA_APP')
        locations_list = pd.read_csv('locations.csv', names=['Name', 'Latitude', 'Longitude'])
        numRows = (len(locations_list.index))
        print(locations_list)
        for i in range(numRows):
            try:
                loc_name = locations_list.at[i, 'Name']
                n = Nom.geocode(query=loc_name, language='cz', namedetails=True)
                locations_list.at[i,'Latitude']=(n.latitude)
                locations_list.at[i,'Longitude']=(n.longitude)
            except Exception:
                pass
        print(locations_list)
        locations_list.to_csv('coordinates.csv')
        self.display_locations()


    def display_locations(self):

        locations = pd.read_csv('coordinates.csv')
        numRows = (len(locations.index))
        map_krkonose = folium.Map(location=[50.627145, 15.609578], zoom_start=11)
        data_b = io.BytesIO()
        for i in range(numRows):
            try:
                name = locations.at[i, 'Name']
                location = [locations.at[i,'Latitude'], locations.at[i,'Longitude']]
                folium.Marker(location=location, popup=name, parse_html=True).add_to(map_krkonose)
                print(location)

            except Exception:
                pass
        map_krkonose.save(data_b, close_file=False)


        # self.plot_map = QtWebEngineWidgets.QWebEngineView(self.centralwidget)
        # self.plot_map.setGeometry(QtCore.QRect(1200, 640, 700, 480))
        # self.plot_map.setHtml(data_b.getvalue().decode())
        # print(data_b)




if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    HA_APP = QtWidgets.QMainWindow()
    ui = Ui_HA_APP()
    ui.setupUi(HA_APP)
    HA_APP.showFullScreen()
    sys.exit(app.exec_())
