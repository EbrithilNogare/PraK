import "./input.js";
import * as fs from "fs";

const metadata = [];
const corporation = [];
const creation = [];
const family = [];
const geographic = [];
const keyword = [];
const person = [];
const subject = [];

function generateID() {
  const id = [...Array(24)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return { $oid: id };
}

function cleanEmpty(input) {
  return Object.fromEntries(
    Object.entries(input).filter(([key, val]) => {
      switch (typeof val) {
        case "string":
          return val !== "";
        case "undefined":
          return false;
        case "number":
          return val !== NaN;
        case "object":
          if (Array.isArray(val))
            return val.length !== 0 && val[0] !== "" && val[0] != null;
          else return Object.keys(val).length === 0;
      }
      return true;
    })
  );
}

function getDocumentType(type) {
  // 0 = Archivní dokument
  // 1 = Archivní sbírka
  // 2 = Audiovizuální dokument
  // 3 = Články
  // 4 = Elektronické zdroje
  // 5 = Formulář pro kapitoly
  // 6 = Obrazový dokument
  // 7 = Periodika
  // 8 = Svazek
  // 9 = 3D objek
  // 10 = casopisy
  // 11 = mapy
  // 12 = nezaraditelny dokument

  switch (type) {
    case "AD":
    case "ADR":
      return 0;
    case "AF":
    case "AFR":
      return 1;
    case "AV":
      return 2;
    case "CL":
    case "CLR":
      return 3;
    case "EZ":
    case "EZR":
      return 4;
    case "KA":
    case "KAR":
      return 5;
    case "OD":
      return 6;
    case "PE":
    case "PER":
      return 7;
    case "SV":
    case "SVR":
      return 8;
    case "3D":
      return 9;
    case "CAR":
    case "CAS":
      return 10;
    case "MAPY":
      return 11;
    case "MIS": // nezaraditelny dokument
    case "ROC":
    case "IFI":
    case "PRM":
    default:
      return 12;
  }
}

function createMetadata(item) {
  const newItem = {
    _id: generateID(),
    documentType: getDocumentType(item.typJednotka942c),
    author: {
      author_person: getPerson(item.autor100a),
      author_corporation: getCorporation(item.autorKorp110a),
      author_role: item.typOdpovednosti100e,
    },
    other_authors_person: [{ id: getPerson(item.autor700a) }],
    other_authors_corporation: [{ id: getCorporation(item.korporace710a) }],
    name: item.nazev245a, // ! todo unique
    author_responsibility: item.odpovednost245c,
    other_names: [item.podnazev245b, item.nazevCasti245n],
    language: [item.jazyk041a],
    publish: [
      {
        publish_country: item.zemeVydani270d,
        publish_place: getGeographic(item.mistoVydani260a),
      },
    ],
    publishing_date: [
      {
        date:
          item.rokVydani260c === "" ? item.rokVydani264c : item.rokVydani260c,
        note: item.poznODatu518a,
      },
    ],
    isbn: [item.ISBN020a, item.ISSN022a],
    edition_order: [item.vydani250a],
    edition: [item.edice490a],
    edition_number: [item.vydani250a],
    action_name: [item.konference111a],
    volume_content: [item.poznOObsahu505t],
    publishing_year: [
      {
        note: item.rokyVychazeni362a,
        periodicity: item.periodicita310a,
      },
    ],
    issn: [item.ISSN785x],
    source_document_name: item.zdrojovyDokument773t,
    corporation: [
      {
        corporation_name: getCorporation(item.korporace710a),
        access_conditions: item.podminkyPristupu355a,
        acces_note: item.poznKPristupu852z,
      },
    ],
    location: [
      {
        institution: item["852b"],
        fund: item.signatura852c,
        note: item.neverejnaPoznamka852x,
      },
    ],
    digitized_document_url: [item.url852u],
    external_source: [
      {
        url: item.propojeniElekZdroj787t,
        url_leading_to_document: item.propojeniElekZdroj787t,
      },
    ],
    submitter: "Export",
  };

  return newItem;
}

function getCorporation(name_main_part) {
  if (name_main_part === "") return undefined;
  const foundItems = corporation.filter((item) => {
    item.name_main_part === name_main_part;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name_main_part };
    corporation.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

function getCreation(name_main_part) {
  if (name_main_part === "") return undefined;
  const foundItems = creation.filter((item) => {
    item.name_main_part === name_main_part;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name_main_part };
    creation.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

function getFamily(name_main_part) {
  if (name_main_part === "") return undefined;
  const foundItems = family.filter((item) => {
    item.name_main_part === name_main_part;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name_main_part };
    family.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

function getGeographic(name_main_part) {
  if (name_main_part === "") return undefined;
  const foundItems = geographic.filter((item) => {
    item.name_main_part === name_main_part;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name_main_part };
    geographic.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

function getKeyword(name_main_part) {
  if (name_main_part === "") return undefined;
  const foundItems = keyword.filter((item) => {
    item.name_main_part === name_main_part;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name_main_part };
    keyword.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

function getPerson(name) {
  if (name === "") return undefined;
  const foundItems = person.filter((item) => {
    item.name === name;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name };
    person.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

function getSubject(name_main_part) {
  if (name_main_part === "") return undefined;
  const foundItems = subject.filter((item) => {
    item.name_main_part === name_main_part;
  });
  if (foundItems.length === 0) {
    const newItem = { _id: generateID(), name_main_part };
    subject.push(newItem);
    return newItem._id;
  } else {
    return foundItems._id;
  }
}

data.forEach((dato) => {
  metadata.push(cleanEmpty(createMetadata(dato)));
});

function toFile(data, fileName) {
  fs.writeFile(`./outDB/${fileName}.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

toFile(metadata, "metadata");
toFile(corporation, "corporation");
toFile(creation, "creation");
toFile(family, "family");
toFile(geographic, "geographic");
toFile(keyword, "keyword");
toFile(person, "person");
toFile(subject, "subject");
