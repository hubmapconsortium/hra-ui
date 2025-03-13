/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@rdfjs-elements/formats-pretty");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  app: () => (/* binding */ app)
});

;// external "cors"
const external_cors_namespaceObject = require("cors");
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_namespaceObject);
;// external "express"
const external_express_namespaceObject = require("express");
var external_express_default = /*#__PURE__*/__webpack_require__.n(external_express_namespaceObject);
;// external "express-fileupload"
const external_express_fileupload_namespaceObject = require("express-fileupload");
var external_express_fileupload_default = /*#__PURE__*/__webpack_require__.n(external_express_fileupload_namespaceObject);
;// external "path"
const external_path_namespaceObject = require("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
;// external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// external "jsonld"
const external_jsonld_namespaceObject = require("jsonld");
;// external "papaparse"
const external_papaparse_namespaceObject = require("papaparse");
var external_papaparse_default = /*#__PURE__*/__webpack_require__.n(external_papaparse_namespaceObject);
;// ./src/models/api.model.ts
/** Metadata delimiter */
const DELIMETER = ';';
/** Metadata title row index */
const TITLE_ROW_INDEX = 0;
/** Metadta fields */
const metadataArrayFields = [
    'author_names',
    'author_orcids',
    'reviewer_names',
    'reviewer_orcids',
    'general_publications',
];
/** Metadata name map */
const metadataNameMap = {
    'Author Name(s):': 'author_names',
    'Author ORCID(s):': 'author_orcids',
    'Reviewer(s):': 'reviewer_names',
    'Reviewer ORCID(s):': 'reviewer_orcids',
    'General Publication(s):': 'general_publications',
    'Data DOI:': 'data_doi',
    'Date:': 'date',
    'Version Number:': 'version',
};
/** Biomarker types */
var BM_TYPE;
(function (BM_TYPE) {
    BM_TYPE["G"] = "gene";
    BM_TYPE["P"] = "protein";
    BM_TYPE["BL"] = "lipids";
    BM_TYPE["BM"] = "metabolites";
    BM_TYPE["BF"] = "proteoforms";
})(BM_TYPE || (BM_TYPE = {}));
/** Omap organ mapping */
const OMAP_ORGAN = {
    'https://doi.org/10.48539/HBM467.LRKZ.884': {
        name: 'skin',
        rdfs_label: 'skin of body',
        id: 'UBERON:0002097',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM577.SBHH.454': {
        name: 'skin',
        rdfs_label: 'skin of body',
        id: 'UBERON:0002097',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM674.DJKV.876': {
        name: 'lymph node',
        rdfs_label: 'lymph node',
        id: 'UBERON: 0000029',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM794.CSBJ.358': {
        name: 'intestine',
        rdfs_label: 'intestine',
        id: 'UBERON:0000160',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM568.RMZB.377': {
        name: 'kidney',
        rdfs_label: 'kidney',
        id: 'UBERON:0002113',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM495.QBSV.777': {
        name: 'liver',
        rdfs_label: 'liver',
        id: 'UBERON:0002107',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM868.XLTM.922': {
        name: 'Pancreas',
        rdfs_label: 'Pancreas',
        id: 'UBERON:0001264',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    'https://doi.org/10.48539/HBM972.WHPW.455': {
        name: 'Lung',
        rdfs_label: 'Lung',
        id: 'UBERON:0002048',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
    default: {
        name: 'unknown',
        rdfs_label: 'unknown',
        id: 'unknown',
        setBiomarkerProperties: undefined,
        isValid: undefined,
    },
};
/** Protein presence options */
var PROTEIN_PRESENCE;
(function (PROTEIN_PRESENCE) {
    PROTEIN_PRESENCE["POS"] = "Positive";
    PROTEIN_PRESENCE["NEG"] = "Negative";
    PROTEIN_PRESENCE["UNKNOWN"] = "Unknown";
    PROTEIN_PRESENCE["INTERMEDIATE"] = "Intermediate";
})(PROTEIN_PRESENCE || (PROTEIN_PRESENCE = {}));
/** Asct header first column */
const ASCT_HEADER_FIRST_COLUMN = 'AS/1';
/** Legacy omap header first column */
const LEGACY_OMAP_HEADER_FIRST_COLUMN = 'uniprot_accession_number';
/** Omap header first columnc */
const OMAP_HEADER_FIRST_COLUMN = 'omap_id';
/** Array name mapping */
const arrayNameMap = {
    AS: 'anatomical_structures',
    CT: 'cell_types',
    FTU: 'ftu_types',
    BG: 'biomarkers_gene',
    BP: 'biomarkers_protein',
    BGENE: 'biomarkers_gene',
    BPROTEIN: 'biomarkers_protein',
    REF: 'references',
    BLIPID: 'biomarkers_lipids',
    BMETABOLITES: 'biomarkers_meta',
    BPROTEOFORM: 'biomarkers_prot',
    BL: 'biomarkers_lipids',
    BM: 'biomarkers_meta',
    BF: 'biomarkers_prot',
};
/** Object field mapping */
const objectFieldMap = {
    ID: 'id',
    LABEL: 'rdfs_label',
    DOI: 'doi',
    NOTES: 'notes',
    NOTE: 'notes',
};
/**
 * Creates a named object
 *
 * @param name Name
 * @param structureType Structure type
 * @returns A `Reference` or `Structure`
 */
function createObject(name, structureType) {
    switch (structureType) {
        case 'REF':
            return new Reference(name);
        case 'AS':
        default:
            return new Structure(name, structureType);
    }
}
/** Reference object */
class Reference {
    /** Id */
    id;
    /** Doi */
    doi;
    /** Additional notes */
    notes;
    /** Initializes the class */
    constructor(id) {
        this.id = id;
    }
    /**
     * Checks whether the state of this object is valid
     *
     * @returns true if this is valid, false otherwise
     */
    isValid() {
        return !!this.id || !!this.doi || !!this.notes;
    }
}
/** Structure */
class Structure {
    /** Name */
    name;
    /** Id */
    id = '';
    /** Rdfs label */
    rdfs_label = '';
    /** Biomarker type */
    b_type;
    /** Protein presence */
    proteinPresence;
    /** Additional notes */
    notes;
    /** Initializes the class */
    constructor(name, structureType) {
        this.name = name;
        this.setBiomarkerProperties(structureType, name);
    }
    /**
     * Updates this with a new name and biomarker type
     *
     * @param structureType Biomarker type
     * @param name Name
     */
    setBiomarkerProperties(structureType, name) {
        if (structureType === 'BGENE' || structureType === 'BG') {
            this.b_type = BM_TYPE.G;
        }
        if (structureType === 'BPROTEIN' || structureType === 'BP') {
            name = this.name = name.replace('Protein', '').trim();
            const hasPos = name.endsWith('+');
            const hasNeg = name.endsWith('-');
            const hasInt = name.endsWith('+/-');
            if (hasPos) {
                this.name = name.slice(0, -1);
                this.proteinPresence = PROTEIN_PRESENCE.POS;
            }
            else if (hasInt) {
                this.name = name.slice(0, -3).trim();
                this.proteinPresence = PROTEIN_PRESENCE.INTERMEDIATE;
            }
            else if (hasNeg) {
                this.name = name.slice(0, -1);
                this.proteinPresence = PROTEIN_PRESENCE.NEG;
            }
            else {
                this.proteinPresence = PROTEIN_PRESENCE.UNKNOWN;
            }
            this.b_type = BM_TYPE.P;
        }
        if (structureType === 'BLIPID' || structureType === 'BL') {
            this.b_type = BM_TYPE.BL;
        }
        if (structureType === 'BMETABOLITES' || structureType === 'BM') {
            this.b_type = BM_TYPE.BM;
        }
        if (structureType === 'BPROTEOFORM' || structureType === 'BF') {
            this.b_type = BM_TYPE.BF;
        }
    }
    /**
     * Checks if this object is in a valid state
     *
     * @returns true if this is valid, false otherwise
     */
    isValid() {
        return !!this.id || !!this.name || !!this.rdfs_label;
    }
}
/** Row */
class Row {
    rowNumber;
    /** Anatomical structures */
    anatomical_structures = [];
    /** Cell types */
    cell_types = [];
    /** All biomarkers */
    biomarkers = [];
    /** Protein biomarkers */
    biomarkers_protein = [];
    /** Gene biomarkers */
    biomarkers_gene = [];
    /** Lipid biomarkers */
    biomarkers_lipids = [];
    /** Meta biomarkers */
    biomarkers_meta = [];
    /** Prot biomarkers */
    biomarkers_prot = [];
    /** Ftu types */
    ftu_types = [];
    /** References */
    references = [];
    /**
     * Initializes the row
     *
     * @param rowNumber Row number
     */
    constructor(rowNumber) {
        this.rowNumber = rowNumber;
    }
    /** Removes all invalid structures and combines all biomarkers */
    finalize() {
        this.anatomical_structures = this.anatomical_structures.filter((s) => s.isValid());
        this.cell_types = this.cell_types.filter((s) => s.isValid());
        this.ftu_types = this.ftu_types.filter((s) => s.isValid());
        this.references = this.references.filter((s) => s.isValid());
        this.biomarkers_gene = this.biomarkers_gene.filter((s) => s.isValid());
        this.biomarkers_protein = this.biomarkers_protein.filter((s) => s.isValid());
        this.biomarkers_lipids = this.biomarkers_lipids.filter((s) => s.isValid());
        this.biomarkers_meta = this.biomarkers_meta.filter((s) => s.isValid());
        this.biomarkers_prot = this.biomarkers_prot.filter((s) => s.isValid());
        this.biomarkers = [
            ...this.biomarkers_gene,
            ...this.biomarkers_protein,
            ...this.biomarkers_lipids,
            ...this.biomarkers_meta,
            ...this.biomarkers_prot,
        ];
    }
}

;// ./src/utils/warnings.ts
/** Warning codes */
var WarningCode;
(function (WarningCode) {
    WarningCode[WarningCode["InvalidCsvFile"] = 1] = "InvalidCsvFile";
    WarningCode[WarningCode["UnmappedMetadata"] = 2] = "UnmappedMetadata";
    WarningCode[WarningCode["InvalidHeader"] = 3] = "InvalidHeader";
    WarningCode[WarningCode["MissingHeader"] = 4] = "MissingHeader";
    WarningCode[WarningCode["InvalidCharacter"] = 5] = "InvalidCharacter";
    WarningCode[WarningCode["MissingCTorAnatomy"] = 6] = "MissingCTorAnatomy";
    WarningCode[WarningCode["UnmappedData"] = 7] = "UnmappedData";
    WarningCode[WarningCode["BadColumn"] = 8] = "BadColumn";
    WarningCode[WarningCode["NoIdInCT1"] = 9] = "NoIdInCT1";
})(WarningCode || (WarningCode = {}));
/** Labels for each warning code */
const WarningLabels = {
    [WarningCode.InvalidCsvFile]: 'Invalid CSV file?',
    [WarningCode.UnmappedMetadata]: 'Unmapped Metadata found?',
    [WarningCode.InvalidHeader]: 'Invalid Header found?',
    [WarningCode.MissingHeader]: 'Missing Header Value found?',
    [WarningCode.InvalidCharacter]: 'Invalid Character found?',
    [WarningCode.MissingCTorAnatomy]: 'Missing Uberon or CL IDs?',
    [WarningCode.UnmappedData]: 'Unmapped Data found?',
    [WarningCode.BadColumn]: 'Bad Column found?',
    [WarningCode.NoIdInCT1]: 'CT/1 has CL ID?',
};

;// ./src/models/lookup.model.ts
/** Ontology codes */
var OntologyCode;
(function (OntologyCode) {
    OntologyCode["UBERON"] = "UBERON";
    OntologyCode["CL"] = "CL";
    OntologyCode["FMA"] = "FMA";
    OntologyCode["HGNC"] = "HGNC";
    OntologyCode["LMHA"] = "LMHA";
})(OntologyCode || (OntologyCode = {}));

;// ./src/functions/lookup.functions.ts

/** Creates an asct api url */
function buildASCTApiUrl(id) {
    return `http://www.ebi.ac.uk/ols/api/terms/findByIdAndIsDefiningOntology?obo_id=${id}`;
}
/** Creates an hgnc api url */
function buildHGNCApiUrl(id) {
    return `https://rest.genenames.org/fetch/hgnc_id/${id}`;
}
/** Creates an uniprot link */
function buildUniprotLink(id) {
    return `https://www.uniprot.org/uniprot/${id}`;
}
/** Creates an entrez link */
function buildEntrezLink(id) {
    return `https://www.ncbi.nlm.nih.gov/gene/?term=${id}`;
}
/** Creates an hgnc link */
function buildHGNCLink(id) {
    return `http://identifiers.org/hgnc/${id}`;
}
/**
 * Fix a poorly constructed ontology id
 *
 * @param id Original id
 * @returns A proper id
 */
function fixOntologyId(id) {
    if (id?.toLowerCase() === 'n/a' || id?.toLowerCase() === 'not found') {
        return '';
    }
    // Fix IDs from ASCT+B Tables. Ideally, these changes are made up stream for next release and no transformation is necessary
    if (id.startsWith('fma') && /[0-9]/.test(id[3])) {
        id = 'fma:' + id.slice(3);
    }
    id = id.replace('_', ':').replace('::', ':').replace(': ', ':').replace('fmaid:', 'FMA:').split(' ')[0].toUpperCase();
    id = id
        .split(':')
        .map((s) => s.trim())
        .join(':');
    id = id.replace(/[^A-Z0-9_:]+/g, '');
    return id;
}
/**
 * Attepmts to guess the iri corresponding to an id
 *
 * @param id Id to guess iri for
 * @returns An iri if possible
 */
function guessIri(id) {
    const [code, idNumber] = id.split(':');
    if (idNumber) {
        switch (code) {
            case OntologyCode.CL:
                return `http://purl.obolibrary.org/obo/CL_${idNumber}`;
            case OntologyCode.FMA:
                return `http://purl.org/sig/ont/fma/fma${idNumber}`;
            case OntologyCode.HGNC:
                return `http://identifiers.org/hgnc/${idNumber}`;
            case OntologyCode.LMHA:
                return `http://purl.obolibrary.org/obo/LMHA_${idNumber}`;
            case OntologyCode.UBERON:
                return `http://purl.obolibrary.org/obo/UBERON_${idNumber}`;
            default:
                return undefined;
        }
    }
    else {
        return undefined;
    }
}

;// ./src/functions/omap.functions.ts


/** Omap data transformer */
class OmapDataTransformer {
    /** Data */
    data;
    /** Header row index */
    headerRow;
    /** All warnings */
    _warnings;
    /** Additional metadata */
    metaData;
    /** Transformed data */
    _transformedData;
    /** Whether this contains legacy omap data */
    isLegacyOmap;
    /** List of columns */
    columns = [];
    /**
     * Initializes the transformer
     *
     * @param data Data to transform
     * @param legacy Whether the data is in legacy format
     */
    constructor(data, legacy = false) {
        this.isLegacyOmap = legacy;
        this.data = data;
        this.headerRow = legacy
            ? findHeaderIndex(0, this.data, LEGACY_OMAP_HEADER_FIRST_COLUMN)
            : findHeaderIndex(0, this.data, OMAP_HEADER_FIRST_COLUMN);
        this.metaData = this.getMetaData();
        this._warnings = new Set();
        this._transformedData = this.transformOmapData();
    }
    /**
     * Transforms the data
     *
     * @returns The transformed data
     */
    transformOmapData() {
        // Initializing with the MetaData
        const asctbConverted = [];
        // Add metadata and new header row and the actual data
        asctbConverted.push(...this.data.slice(0, this.headerRow), this.createNewHeaderRow(), ...this.createData());
        return asctbConverted;
    }
    /**
     * Derives a new header row for the transformed data
     *
     * @returns The new header row
     */
    createNewHeaderRow() {
        const maxProteins = this.data.slice(this.headerRow + 1).map((subArr) => subArr[0].split(',').length);
        const newHeaderRow = ['AS/1', 'AS/1/LABEL', 'AS/1/ID'];
        for (let i = 1; i <= Math.max(...maxProteins); i++) {
            newHeaderRow.push(`BP/${i}`);
            newHeaderRow.push(`BP/${i}/LABEL`);
            newHeaderRow.push(`BP/${i}/ID`);
            newHeaderRow.push(`BP/${i}/NOTES`);
        }
        return newHeaderRow;
    }
    /**
     * Transforms the data
     *
     * @returns The transformed data rows
     */
    createData() {
        const dataObject = this.createMapOfOldColumnsAndValues();
        // Decides whether to take organs from table or constants
        const organColumnsPresent = ['organ', 'organ_uberon'].every((column) => this.columns.includes(column));
        const organ = OMAP_ORGAN[this.metaData['data_doi']] ?? OMAP_ORGAN['default'];
        if (!(this.isLegacyOmap || organColumnsPresent)) {
            this._warnings.add('WARNING: Organ Columns Missing. Adding default Organ Columns');
        }
        if (this.isLegacyOmap && !OMAP_ORGAN[this.metaData['data_doi']]) {
            this._warnings.add('WARNING: DOI mapping not present; Adding default Organ Columns.');
        }
        const transformedData = [];
        const title = this.metaData['title'];
        const alternateOrgan = 'missing organ label';
        const alternateOrganUberon = 'missing organ UBERON id';
        let organLabelMissingWarningAdded = false;
        let organUberonMissingWarningAdded = false;
        dataObject.forEach((data) => {
            const uniprots = data['uniprot_accession_number'].split(', ');
            const hgncIds = data['HGNC_ID'].split(', ');
            const targetNames = data['target_symbol']?.split(', ') ?? [];
            if (!(uniprots.length === hgncIds.length && hgncIds.length === targetNames.length)) {
                this.warnings.add('WARNING: Number of entires in column uniprot_accession_number, HGNC_ID,' +
                    `target_symbol are not equal in row ${data['rowNo']}. uniprot_accession_number: ${uniprots.length};` +
                    `HGNC_ID: ${hgncIds.length}; target_symbol: ${targetNames.length}`);
            }
            let notes = `Extra information in "${title}", Row ${data['rowNo']} \n`;
            notes += data['notes'];
            if (!this.isLegacyOmap && !data['organ']) {
                data['organ'] = alternateOrgan;
                if (!organLabelMissingWarningAdded) {
                    this._warnings.add('WARNING: Organ Label Missing.');
                    organLabelMissingWarningAdded = true;
                }
            }
            if (!this.isLegacyOmap && !data['organ_uberon']) {
                data['organ_uberon'] = alternateOrganUberon;
                if (!organUberonMissingWarningAdded) {
                    this._warnings.add('WARNING: Organ Uberon ID Missing.');
                    organUberonMissingWarningAdded = true;
                }
            }
            if (data['uniprot_accession_number'] !== '' &&
                data['HGNC_ID'] !== '' &&
                data['target_symbol'] !== '' &&
                data['target_symbol'] !== undefined) {
                const newrow = this.isLegacyOmap
                    ? [organ.name, organ.rdfs_label, organ.id]
                    : [data['organ'], data['organ'], data['organ_uberon']];
                const maxBPs = Math.max(uniprots.length, hgncIds.length, targetNames.length);
                for (let i = 0; i < maxBPs; i++) {
                    newrow.push(targetNames[i] ?? '', uniprots[i] ?? '', hgncIds[i] ?? '', notes ?? '');
                }
                transformedData.push(newrow);
            }
            else {
                transformedData.push((this.isLegacyOmap
                    ? [organ.name, organ.rdfs_label, organ.id]
                    : [data['organ'], data['organ'], data['organ_uberon']]));
            }
        });
        return transformedData;
    }
    /** Get the metadata */
    getMetaData() {
        const warnings = new Set();
        const metadataRows = this.data.slice(0, this.headerRow);
        return buildMetadata(metadataRows, warnings);
    }
    /** Create a map from non-transformed columns and values */
    createMapOfOldColumnsAndValues() {
        let dataObject = [];
        this.columns = this.data[this.headerRow].map((col) => col);
        this.data.slice(this.headerRow + 1).forEach((subArr, index) => {
            const keyValuePairs = this.columns.reduce((acc, key, i) => {
                acc[key] = subArr[i];
                return acc;
            }, {});
            // 4 = Two blank rows + 1 for 0 indexing of headerrow + 1 for 0 indexing for subArr
            keyValuePairs['rowNo'] = (index + this.headerRow + 4).toString();
            dataObject.push(keyValuePairs);
        });
        dataObject = this.createNotes(dataObject);
        return dataObject;
    }
    /** Creates additional notes */
    createNotes(dataObject) {
        const excludedKeys = ['uniprot_accession_number', 'HGNC_ID', 'target_symbol', 'rowNo'];
        dataObject.forEach((obj) => {
            const entries = Object.entries(obj);
            const formattedEntries = entries
                .filter(([key, value]) => value !== undefined && value !== null && value !== '' && !excludedKeys.includes(key))
                .map(([key, value]) => `**${key}:** ${value}`);
            const result = `- ${formattedEntries.join('\n- ')}`;
            obj['notes'] = result;
        });
        return dataObject;
    }
    /** Get the transformed data */
    get transformedData() {
        return this._transformedData;
    }
    /** Get all warnings */
    get warnings() {
        return this._warnings;
    }
}

;// ./src/functions/api.functions.ts




/**
 * Normalizes the url to a google sheet
 *
 * @param url Sheets url
 * @returns A normalized url
 */
function normalizeCsvUrl(url) {
    if (url.startsWith('https://docs.google.com/spreadsheets/d/') && url.indexOf('export?format=csv') === -1) {
        const splitUrl = url.split('/');
        if (splitUrl.length === 7) {
            const sheetId = splitUrl[5];
            const gid = splitUrl[6].split('=')[1];
            return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        }
    }
    return url;
}
/**
 * Set a value in a data row
 *
 * @param column Column names
 * @param _columnNumber Column index
 * @param row Row data
 * @param value Value
 * @param warnings Set to add warnings to
 */
function setData(column, _columnNumber, row, value, warnings) {
    if (column.length > 1) {
        const arrayName = arrayNameMap[column[0]];
        const originalArrayName = column[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const objectArray = row[arrayName] || [];
        if (!arrayName) {
            warnings.add(`WARNING: unmapped array found ${originalArrayName} (Code ${WarningCode.UnmappedData})`);
        }
        if (column.length === 2) {
            if (objectArray.length === 0 && arrayName) {
                row[arrayName] = objectArray;
            }
            objectArray.push(createObject(value, originalArrayName));
        }
        else if (column.length === 3 && arrayName) {
            let arrayIndex = parseInt(column[1], 10) - 1;
            const fieldName = objectFieldMap[column[2]]; // || (column[2]?.toLowerCase() ?? '').trim();
            if (arrayIndex >= 0 && fieldName) {
                if (arrayIndex >= objectArray.length) {
                    warnings.add(`WARNING: blank cells likely found in column: ${column.join('/')}, row: ${row.rowNumber}`);
                }
                // FIXME: Temporarily deal with blank columns since so many tables are non-conformant
                arrayIndex = objectArray.length - 1;
                if (arrayIndex < objectArray.length) {
                    if (fieldName === 'id') {
                        value = fixOntologyId(value);
                    }
                    if (objectArray[arrayIndex]) {
                        objectArray[arrayIndex][fieldName] = value;
                    }
                    else {
                        warnings.add(`WARNING: bad column: ${column.join('/')} (Code ${WarningCode.BadColumn})`);
                    }
                }
            }
        }
    }
}
/** Regex matching invalid characters */
const invalidCharacterRegex = /_/gi;
/** Regex matching urls */
const isLinkRegex = /^http/gi;
/** Code point for 'A' */
const codepointUppercaseA = 65;
/** Length of the alhpabet */
const alphabetLength = 26;
/**
 * Get the column name for a column index.
 * Column names: A B C ... Z AA AB AC ... AZ ... ZA ... ZZ
 *
 * @param index Column index
 * @returns Column name
 */
function columnIndexToName(index) {
    index = index + 1;
    const name = [];
    while (index) {
        const mod = (index - 1) % alphabetLength;
        index = Math.floor(Number((index - mod) / alphabetLength));
        name.unshift(String.fromCharCode(codepointUppercaseA + Number(mod)));
    }
    return name.join('');
}
/**
 * Checks that a cell's value is valid
 *
 * @param value Value to check
 * @param rowIndex Row index of value
 * @param columnIndex Column index of value
 * @param warnings Set to add warning to
 */
function validateDataCell(value, rowIndex, columnIndex, warnings) {
    if (!isLinkRegex.test(value) && invalidCharacterRegex.test(value)) {
        const colName = columnIndexToName(columnIndex);
        warnings.add(`WARNING: Invalid characters in data cell at column: ${colName} row: ${rowIndex + 1} where data cell: ${value} (Code ${WarningCode.InvalidCharacter})`);
    }
}
/**
 * buildMetadata - build metadata key value store
 * @param metadataRows = rows from metadata to be extracted
 * @param warnings = warnings generated during the process are pushed to this set
 * @returns = returns key value pairs of metadata
 */
const buildMetadata = (metadataRows, warnings) => {
    const [titleRow] = metadataRows.splice(TITLE_ROW_INDEX, 1);
    const [title] = titleRow.slice(0, 1);
    const result = {
        title,
    };
    return metadataRows.reduce((metadata, rowData, rowNumber) => {
        const [metadataIdentifier, metadataValue, ..._] = rowData;
        /**
         * Raise Warnings:
         *    Case 1: IF the Metadata Key/Value is filled or empty
         *    Case 2: IF the metadata key is not mapping with metadataNameMap
         */
        if (!metadataIdentifier) {
            warnings.add(`WARNING: Metadata Key missing found at Row: ${rowNumber + 3} (Code ${WarningCode.UnmappedMetadata})`);
            return metadata;
        }
        else if (!metadataValue) {
            warnings.add(`WARNING: Metadata Value missing found at Row: ${rowNumber + 3} (Code ${WarningCode.UnmappedMetadata})`);
        }
        let metadataKey = metadataNameMap[metadataIdentifier];
        if (!metadataKey) {
            metadataKey = metadataIdentifier.toLowerCase();
            warnings.add(`WARNING: unmapped metadata found ${metadataIdentifier} at Row: ${rowNumber + 3} (Code ${WarningCode.UnmappedMetadata})`);
        }
        if (metadataArrayFields.includes(metadataKey)) {
            metadata[metadataKey] = metadataValue.split(DELIMETER).map((item) => item.trim());
        }
        else {
            metadata[metadataKey] = metadataValue.trim();
        }
        return metadata;
    }, result);
};
/**
 * Finds the header row
 *
 * @param headerRow Start index
 * @param data Data rows
 * @param firstColumnName First column
 * @returns Index of the header row
 */
function findHeaderIndex(headerRow, data, firstColumnName) {
    for (let i = headerRow; i < data.length; i++) {
        if (data[i][0] === firstColumnName) {
            return i;
        }
    }
    return headerRow;
}
/**
 * Validates the header row
 *
 * @param headerData Data rows
 * @param rowIndex Header index
 * @param warnings Set to add warnings to
 */
function validateHeaderRow(headerData, rowIndex, warnings) {
    let columnIndex = 0;
    headerData.forEach((value) => {
        /**
         * Validate the Header of length 3: i.e after splitting header with ("/")
         */
        if (value.length === 3) {
            const colName = columnIndexToName(columnIndex);
            const invalidHeader = `WARNING: Invalid Header found at column: ${colName}, row: ${rowIndex} where Header Value: ${value.join('/')} (Code ${WarningCode.InvalidHeader})`;
            const columnBlank = value.join('').trim().length === 0;
            const col0Warnings = value[0].trim().length === 0 || !arrayNameMap[value[0].toUpperCase()];
            const col1Warnings = value[1].trim().length === 0 || Number.isNaN(parseInt(value[1]));
            const col2Warnings = value[2].trim().length === 0 || !objectFieldMap[value[2]];
            const showWarnings = col0Warnings || col1Warnings || col2Warnings;
            if (columnBlank) {
                warnings.add(`WARNING: Blank Header found at column: ${colName}, row: ${rowIndex} (Code ${WarningCode.MissingHeader})`);
            }
            else if (showWarnings) {
                warnings.add(invalidHeader);
            }
        }
        /**
         * Validate the Header of length 2: i.e after splitting header with ("/")
         */
        if (value.length === 2) {
            const colName = columnIndexToName(columnIndex);
            const invalidHeader = `WARNING: Invalid Header found at column: ${colName}, row: ${rowIndex} where Header Value: ${value.join('/')} (Code ${WarningCode.InvalidHeader})`;
            const columnBlank = value.join('').trim().length === 0;
            const col0Warnings = value[0].trim().length === 0 || !arrayNameMap[value[0].toUpperCase()];
            const col1Warnings = value[1].trim().length === 0 || Number.isNaN(parseInt(value[1]));
            const showWarnings = col0Warnings || col1Warnings;
            if (columnBlank) {
                warnings.add(`WARNING: Blank Header found at column: ${colName}, row: ${rowIndex} (Code ${WarningCode.MissingHeader})`);
            }
            else if (showWarnings) {
                warnings.add(invalidHeader);
            }
        }
        columnIndex = columnIndex + 1;
    });
}
/**
 * Checks the data for missing ids
 *
 * @param column Column names
 * @param index Data index
 * @param row Row data
 * @param value Data value
 * @param rowData Raw row
 * @param warnings Set to add warnings to
 */
function checkMissingIds(column, index, row, value, rowData, warnings) {
    /**
     * check for missing Uberon/CL IDs:
     */
    const lastElement = column[column.length - 1];
    const isId = lastElement.toLowerCase() === objectFieldMap['ID'];
    if (isId) {
        const nameValue = rowData[index - 2]?.trim() ?? '';
        const idValue = value.trim();
        const labelValue = rowData[index - 1]?.trim() ?? '';
        if (nameValue) {
            if (!idValue) {
                const colName = columnIndexToName(index);
                warnings.add(`WARNING: Missing Uberon/CL ID at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${WarningCode.MissingCTorAnatomy})`);
            }
            else if (!labelValue) {
                const colName = columnIndexToName(index - 1);
                warnings.add(`WARNING: Missing RDFS Label for ID ${idValue} at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${WarningCode.MissingCTorAnatomy})`);
            }
            if (column.join('/') === 'CT/1/ID' && (!idValue || !idValue.startsWith('CL:'))) {
                const colName = columnIndexToName(index);
                warnings.add(`WARNING: CT/1/ID is not a CL ID (required) at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${WarningCode.NoIdInCT1})`);
            }
        }
    }
}
/** Get the header row */
function getHeaderRow(data, omapHeader, asctbHeader, legacyOmapHeader) {
    for (const item of data) {
        if (item[0] === omapHeader) {
            return item;
        }
        if (item[0] === asctbHeader) {
            return item;
        }
        if (item[0] === legacyOmapHeader) {
            return item;
        }
    }
    return undefined;
}
/**
 * Processes data into asctb format
 *
 * @param data Raw data
 * @returns Processed data
 */
function makeASCTBData(data) {
    const header = getHeaderRow(data, OMAP_HEADER_FIRST_COLUMN, ASCT_HEADER_FIRST_COLUMN, LEGACY_OMAP_HEADER_FIRST_COLUMN) ?? [];
    if (header[0] === LEGACY_OMAP_HEADER_FIRST_COLUMN) {
        const omapTransformer = new OmapDataTransformer(data, true);
        const omapWarnings = omapTransformer.warnings;
        const asctbData = makeASCTBDataWork(omapTransformer.transformedData);
        return {
            ...asctbData,
            warnings: [...asctbData.warnings, ...omapWarnings],
            isOmap: true,
        };
    }
    else if (header[0] === OMAP_HEADER_FIRST_COLUMN) {
        const omapTransformer = new OmapDataTransformer(data, false);
        const omapWarnings = omapTransformer.warnings;
        const asctbData = makeASCTBDataWork(omapTransformer.transformedData);
        return {
            ...asctbData,
            warnings: [...asctbData.warnings, ...omapWarnings],
            isOmap: true,
        };
    }
    else if (header[0] === ASCT_HEADER_FIRST_COLUMN) {
        const asctbData = makeASCTBDataWork(data);
        return { ...asctbData, isOmap: false };
    }
    else {
        throw new Error(`Header row, first column should be : ${ASCT_HEADER_FIRST_COLUMN} or ${OMAP_HEADER_FIRST_COLUMN}`);
    }
}
/**
 * Processes data into asctb format
 *
 * @param data Raw data
 * @returns Processed data
 */
function makeASCTBDataWork(data) {
    const headerRow = findHeaderIndex(0, data, ASCT_HEADER_FIRST_COLUMN);
    const columns = data[headerRow].map((col) => col
        .toUpperCase()
        .split('/')
        .map((s) => s.trim()));
    const warnings = new Set();
    validateHeaderRow(columns, headerRow + 2, warnings);
    const results = data.slice(headerRow + 1).map((rowData, rowNumber) => {
        const row = new Row(headerRow + rowNumber + 2);
        rowData.forEach((value, index) => {
            if (index < columns.length && columns[index].length > 1) {
                validateDataCell(value, row.rowNumber, index, warnings);
                setData(columns[index], index, row, value, warnings);
                checkMissingIds(columns[index], index, row, value, rowData, warnings);
            }
        });
        row.finalize();
        return row;
    });
    // build metadata key value store.
    const metadataRows = data.slice(0, headerRow);
    const metadata = buildMetadata(metadataRows, warnings);
    return {
        data: results,
        metadata: metadata,
        warnings: [...warnings],
    };
}

;// ./src/models/graph.model.ts
/** Node types */
var Node_type;
(function (Node_type) {
    Node_type["AS"] = "AS";
    Node_type["CT"] = "CT";
    Node_type["BM"] = "BM";
    Node_type["R"] = "root";
})(Node_type || (Node_type = {}));
/** Edge types */
var Edge_type;
(function (Edge_type) {
    Edge_type["AS_AS"] = "ASAS";
    Edge_type["AS_CT"] = "ASCT";
    Edge_type["CT_CT"] = "CTCT";
    Edge_type["CT_G"] = "CTgene";
    Edge_type["CT_P"] = "CTprotein";
    Edge_type["CT_BL"] = "CTlipids";
    Edge_type["CT_BM"] = "CTmetabolites";
    Edge_type["CT_BF"] = "CTproteoforms";
    Edge_type["AS_G"] = "ASgene";
    Edge_type["AS_P"] = "ASprotein";
})(Edge_type || (Edge_type = {}));
/** Graph node */
class GNode {
    /** Node id */
    id;
    /** Parent id */
    parent;
    /** Node type */
    type;
    /** Node name */
    name;
    /** Node comparator */
    comparator;
    /** Comparator name */
    comparatorName;
    /** Comparator id */
    comparatorId;
    /** Node metadata */
    metadata;
    /** Initialize the node */
    constructor(id, name, parent, ontologyId, label, type, references, bType) {
        this.id = id;
        this.parent = parent;
        this.type = type;
        this.comparator = '';
        this.comparatorId = '';
        this.comparatorName = '';
        this.name = name;
        this.metadata = new Metadata(name, ontologyId, label, references, bType);
    }
}
/** Node metadata */
class Metadata {
    /** Ontology type id */
    ontologyTypeId;
    /** Ontology type name */
    ontologyType;
    /** Label */
    label;
    /** Name */
    name;
    /** Ontology id */
    ontologyId;
    /** Biomarker type */
    bmType;
    /** References */
    references;
    /** Initialize the metadata */
    constructor(name, ontologyId, label, references, bmType) {
        this.name = name;
        this.ontologyId = ontologyId;
        if (ontologyId.toLowerCase().startsWith('fma')) {
            ontologyId = ontologyId.substring(3);
            if (ontologyId.includes(':')) {
                ontologyId = ontologyId.split(':')[1];
            }
            ontologyId = 'FMA:' + ontologyId;
        }
        else if (ontologyId.toLowerCase().startsWith('uberon')) {
            ontologyId = ontologyId.substring('uberon'.length);
            if (ontologyId.includes(':')) {
                ontologyId = ontologyId.split(':')[1];
            }
            ontologyId = 'UBERON:' + ontologyId;
        }
        [this.ontologyType, this.ontologyTypeId] = ontologyId.split(':');
        this.name = name;
        this.label = label;
        this.bmType = bmType;
        this.references = references;
    }
}

;// ./src/functions/graph-jsonld.functions.ts


/** Owl type */
var OwlType;
(function (OwlType) {
    OwlType["CLASS"] = "owl:Class";
    OwlType["RESTRICTION"] = "owl:Restriction";
})(OwlType || (OwlType = {}));
/** Owl property */
var OwlProperty;
(function (OwlProperty) {
    OwlProperty["ANNOTATION"] = "owl:AnnotationProperty";
    OwlProperty["OBJECT"] = "owl:ObjectProperty";
})(OwlProperty || (OwlProperty = {}));
/** Ccf property */
var CcfProperty;
(function (CcfProperty) {
    CcfProperty["PART_OF"] = "ccf:ccf_part_of";
    CcfProperty["LOCATED_IN"] = "ccf:located_in";
    CcfProperty["CT_IS_A"] = "ccf:ct_is_a";
    CcfProperty["CHARACTERIZES"] = "ccf:characterizes";
    CcfProperty["OCCURS_IN"] = "ccf:occurs_in";
})(CcfProperty || (CcfProperty = {}));
/**
 * Turns a graph into owl jsonld
 *
 * @param data Graph
 * @param withSubclasses
 * @returns An owl jsonld
 */
function makeJsonLdData(data, withSubclasses = true) {
    const { nodes, edges } = data;
    const iriLookup = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeMap = new Map();
    nodes.forEach((node, index) => {
        let ontologyId = node.metadata.ontologyId;
        let iri = '';
        if (ontologyId?.trim().length > 0) {
            ontologyId = fixOntologyId(ontologyId);
            iri = guessIri(ontologyId) ?? '';
        }
        if (!iri) {
            const suffix = node.name
                ?.toLowerCase()
                .trim()
                .replace(/\W+/g, '-')
                .replace(/[^a-z0-9-]+/g, '');
            ontologyId = `ASCTB-TEMP:${suffix}`;
            iri = `https://purl.org/ccf/ASCTB-TEMP_${suffix}`;
        }
        iriLookup[index] = iri;
        if (!nodeMap.has(iri)) {
            nodeMap.set(iri, {
                '@id': iri,
                '@type': OwlType.CLASS,
                id: ontologyId,
                asctb_type: node.type,
                label: node.metadata.label || node.metadata.name,
                preferred_label: node.name || node.metadata.label,
                references: node.metadata.references,
            });
        }
    });
    edges.forEach((edge) => {
        const source = {
            iri: iriLookup[edge.source],
            type: nodes[edge.source].type,
            node: nodeMap.get(iriLookup[edge.source]),
        };
        const target = {
            iri: iriLookup[edge.target],
            type: nodes[edge.target].type,
            node: nodeMap.get(iriLookup[edge.target]),
        };
        if (source.iri !== target.iri) {
            switch (source.type + target.type) {
                case Edge_type.AS_AS:
                    target.node.part_of = (target.node.part_of ?? new Set()).add(source.iri);
                    break;
                case Edge_type.AS_CT:
                    target.node.located_in = (target.node.located_in ?? new Set()).add(source.iri);
                    break;
                case Edge_type.CT_CT:
                    target.node.is_a = (target.node.is_a ?? new Set()).add(source.iri);
                    break;
                case Edge_type.CT_G:
                case Edge_type.CT_P:
                case Edge_type.CT_BL:
                case Edge_type.CT_BM:
                case Edge_type.CT_BF:
                    target.node.characterizes = (target.node.characterizes ?? new Set()).add(source.iri);
                    break;
                case Edge_type.AS_G:
                case Edge_type.AS_P:
                    target.node.occurs_in = (source.node.occurs_in ?? new Set()).add(source.iri);
                    break;
                default:
                    console.log(source.type + target.type);
            }
        }
    });
    for (const node of nodeMap.values()) {
        Object.assign(node, {
            part_of: node.part_of ? [...node.part_of] : undefined,
            located_in: node.located_in ? [...node.located_in] : undefined,
            is_a: node.is_a ? [...node.is_a] : undefined,
            characterizes: node.characterizes ? [...node.characterizes] : undefined,
            occurs_in: node.occurs_in ? [...node.occurs_in] : undefined,
        });
        if (withSubclasses) {
            let subclasses = node['rdfs:subClassOf'] ?? [];
            if (node.part_of) {
                subclasses = subclasses.concat(node.part_of.map((iri, index) => ({
                    '@id': `_:n${node.id.replace(':', '')}_ASAS${index}`,
                    '@type': OwlType.RESTRICTION,
                    onProperty: CcfProperty.PART_OF,
                    // onProperty: 'http://purl.obolibrary.org/obo/RO_0001025',
                    someValuesFrom: iri,
                })));
            }
            if (node.located_in) {
                subclasses = subclasses.concat(node.located_in.map((iri, index) => ({
                    '@id': `_:n${node.id.replace(':', '')}_ASCT${index}`,
                    '@type': OwlType.RESTRICTION,
                    onProperty: CcfProperty.LOCATED_IN,
                    someValuesFrom: iri,
                })));
            }
            if (node.is_a) {
                subclasses = subclasses.concat(node.is_a.map((iri, index) => ({
                    '@id': `_:n${node.id.replace(':', '')}_CTCT${index}`,
                    '@type': OwlType.RESTRICTION,
                    onProperty: CcfProperty.CT_IS_A,
                    someValuesFrom: iri,
                })));
            }
            if (node.characterizes) {
                subclasses = subclasses.concat(node.characterizes.map((iri, index) => ({
                    '@id': `_:n${node.id.replace(':', '')}_CTBM${index}`,
                    '@type': OwlType.RESTRICTION,
                    onProperty: CcfProperty.CHARACTERIZES,
                    someValuesFrom: iri,
                })));
            }
            if (node.occurs_in) {
                subclasses = subclasses.concat(node.occurs_in.map((iri, index) => ({
                    '@id': `_:n${node.id.replace(':', '')}_ASBM${index}`,
                    '@type': OwlType.RESTRICTION,
                    onProperty: CcfProperty.OCCURS_IN,
                    someValuesFrom: iri,
                })));
            }
            if (subclasses.length > 0) {
                node['rdfs:subClassOf'] = subclasses;
            }
        }
    }
    const propertyType = withSubclasses ? OwlProperty.OBJECT : OwlProperty.ANNOTATION;
    return {
        '@context': Object.assign({
            ccf: 'http://purl.org/ccf/latest/ccf.owl#',
            rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
            oboInOwl: 'http://www.geneontology.org/formats/oboInOwl#',
            owl: 'http://www.w3.org/2002/07/owl#',
            id: 'oboInOwl:id',
            label: 'rdfs:label',
            preferred_label: 'ccf:ccf_preferred_label',
            asctb_type: 'ccf:asctb_type',
            references: 'ccf:ccf_references',
            defines: {
                '@reverse': 'rdfs:isDefinedBy',
            },
            onProperty: {
                '@id': 'owl:onProperty',
                '@type': '@id',
            },
            someValuesFrom: {
                '@id': 'owl:someValuesFrom',
                '@type': '@id',
            },
        }, withSubclasses
            ? {}
            : {
                part_of: {
                    '@id': CcfProperty.PART_OF,
                    // '@id': 'http://purl.obolibrary.org/obo/RO_0001025',
                    '@type': '@id',
                },
                located_in: {
                    '@id': CcfProperty.LOCATED_IN,
                    '@type': '@id',
                },
                is_a: {
                    '@id': CcfProperty.CT_IS_A,
                    '@type': '@id',
                },
                characterizes: {
                    '@id': CcfProperty.CHARACTERIZES,
                    '@type': '@id',
                },
                occurs_in: {
                    '@id': CcfProperty.OCCURS_IN,
                    '@type': '@id',
                },
            }),
        '@graph': [
            ...[
                {
                    '@id': 'http://purl.org/ccf/latest/ccf.owl#',
                    '@type': 'owl:Ontology',
                    label: 'CCF ASCT+B Tables',
                    defines: [
                        {
                            '@id': CcfProperty.PART_OF,
                            '@type': propertyType,
                            label: 'ccf part of',
                        },
                        {
                            '@id': CcfProperty.CHARACTERIZES,
                            '@type': propertyType,
                            label: 'characterizes',
                        },
                        {
                            '@id': CcfProperty.CT_IS_A,
                            '@type': propertyType,
                            label: 'cell type is a',
                        },
                        {
                            '@id': CcfProperty.LOCATED_IN,
                            '@type': propertyType,
                            label: 'located in',
                        },
                        {
                            '@id': CcfProperty.OCCURS_IN,
                            '@type': propertyType,
                            label: 'occurs in',
                        },
                    ],
                },
                {
                    '@id': 'oboInOwl:id',
                    '@type': OwlProperty.ANNOTATION,
                    label: 'ID',
                },
                {
                    '@id': 'ccf:asctb_type',
                    '@type': OwlProperty.ANNOTATION,
                    label: 'ASCT+B type',
                },
                {
                    '@id': 'ccf:ccf_preferred_label',
                    '@type': OwlProperty.ANNOTATION,
                    label: 'CCF preferred label',
                },
            ],
            ...nodeMap.values(),
        ],
    };
}

;// external "stream-browserify"
const external_stream_browserify_namespaceObject = require("stream-browserify");
;// ./src/functions/graph-owl.functions.ts
// @ts-expect-error No declarations

/**
 * Turn owl jsonld data into xml
 *
 * @param data Jsonld data
 * @returns An xml string
 */
async function makeOwlData(data) {
    const inputReadable = new external_stream_browserify_namespaceObject.Readable({
        read: () => {
            inputReadable.push(JSON.stringify(data));
            inputReadable.push(null);
        },
    });
    // This package has some kind of incompatibility with how nx transpiles/executes modules
    // If imported top level the serve command fails with `require() of ES Module [...] not supported`
    // Dynamically importing the module works fine though!
    const { default: formats } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 1, 23));
    const input = formats.parsers.import('application/ld+json', inputReadable);
    const output = formats.serializers.import('application/rdf+xml', input);
    return new Promise((resolve) => {
        let xmlString = '';
        output.on('data', (xmlData) => {
            xmlString += xmlData;
        });
        output.on('end', () => {
            resolve(xmlString);
        });
    });
}

;// ./src/functions/graph.functions.ts

/**
 * Turns data into a proper tree
 *
 * @param data Rows
 * @param graphData Graph
 * @returns The root id
 */
function buildgraphAS(data, graphData) {
    let id = -1;
    let parent;
    const root = new GNode(id, data[0].anatomical_structures[0].name, 0, data[0].anatomical_structures[0].id, data[0].anatomical_structures[0].rdfs_label, Node_type.R, []);
    const idNameSet = {};
    root.comparator = root.metadata.name;
    root.comparatorName = root.metadata.name;
    root.comparatorId = root.metadata.ontologyId;
    delete root.parent;
    graphData.nodes.push(root);
    data.forEach((row) => {
        parent = root;
        row.anatomical_structures.forEach((structure) => {
            let s;
            if (structure.id) {
                s = graphData.nodes.findIndex((i) => i.type !== 'root' && i.comparatorId === parent.comparatorId + structure.id);
            }
            else {
                s = graphData.nodes.findIndex((i) => i.type !== 'root' && i.comparatorName === parent.comparatorName + structure.name);
            }
            if (s === -1) {
                id += 1;
                const newNode = new GNode(id, structure.id && idNameSet[structure.id] ? idNameSet[structure.id] : structure.name, parent.id, structure.id, structure.rdfs_label, Node_type.AS, row.references);
                newNode.comparatorName = parent.comparatorName + newNode.metadata.name;
                newNode.comparatorId = parent.comparatorId + newNode.metadata.ontologyId;
                if (idNameSet[newNode.metadata.ontologyId] === undefined) {
                    idNameSet[newNode.metadata.ontologyId] = newNode.name;
                }
                graphData.nodes.push(newNode);
                graphData.edges.push({ source: parent.id, target: id });
                parent = newNode;
            }
            else {
                const node = graphData.nodes[s];
                parent = node;
            }
        });
    });
    graphData.nodes.shift();
    delete graphData.nodes[0].parent;
    return id;
}
/**
 * Turns data into a proper tree
 *
 * @param data Rows
 * @param graphData Graph
 * @param id Root id
 * @returns The root id
 */
function buildgraphCT(data, graphData, id) {
    data.forEach((row) => {
        const parentIndex = graphData.nodes.findIndex((i) => i.metadata.name === row.anatomical_structures[row.anatomical_structures.length - 1].name);
        if (parentIndex !== -1) {
            const parent = graphData.nodes[parentIndex];
            row.cell_types.forEach((structure) => {
                let s;
                if (structure.id) {
                    s = graphData.nodes.findIndex((i) => i.comparatorId === structure.id);
                }
                else {
                    s = graphData.nodes.findIndex((i) => i.comparatorName === structure.name);
                }
                if (s === -1) {
                    id += 1;
                    const newNode = new GNode(id, structure.name, parent.id, structure.id, structure.rdfs_label, Node_type.CT, row.references);
                    newNode.comparatorName = newNode.metadata.name;
                    newNode.comparatorId = newNode.metadata.ontologyId;
                    graphData.nodes.push(newNode);
                    graphData.edges.push({ source: parent.id, target: id });
                }
                else {
                    graphData.edges.push({
                        source: parent.id,
                        target: graphData.nodes[s].id,
                    });
                }
            });
        }
    });
    return id;
}
/**
 * Turns data into a proper tree
 *
 * @param data Rows
 * @param graphData Graph
 * @param id Root id
 * @returns The root id
 */
function buildgraphBM(data, graphData, id) {
    data.forEach((row) => {
        row.cell_types.forEach((structure) => {
            const parentIndex = graphData.nodes.findIndex((i) => i.metadata.name === structure.name);
            if (parentIndex !== -1) {
                const parent = graphData.nodes[parentIndex];
                row.biomarkers.forEach((biomarker) => {
                    let s;
                    if (biomarker.id) {
                        s = graphData.nodes.findIndex((i) => i.comparatorId === biomarker.id);
                    }
                    else {
                        s = graphData.nodes.findIndex((i) => i.comparatorName === biomarker.name);
                    }
                    if (s === -1) {
                        id += 1;
                        const newNode = new GNode(id, biomarker.name, parent.id, biomarker.id, biomarker.rdfs_label, Node_type.BM, row.references, biomarker.b_type);
                        newNode.comparatorName = newNode.metadata.name;
                        newNode.comparatorId = newNode.metadata.ontologyId;
                        graphData.nodes.push(newNode);
                        graphData.edges.push({ source: parent.id, target: id });
                    }
                    else {
                        graphData.edges.push({
                            source: parent.id,
                            target: graphData.nodes[s].id,
                        });
                    }
                });
            }
        });
    });
    return id;
}
/**
 * Turns rows into a graph
 *
 * @param data Data to turn into a graph
 * @returns A graph
 */
function makeGraphData(data) {
    const graphData = { nodes: [], edges: [] };
    for (const row of data) {
        const organ = {
            name: 'Body',
            id: 'UBERON:0013702',
            rdfs_label: 'body proper',
        };
        row.anatomical_structures.unshift(organ);
    }
    let id = buildgraphAS(data, graphData);
    id = buildgraphCT(data, graphData, id);
    buildgraphBM(data, graphData, id);
    graphData.edges.shift();
    graphData.nodes.forEach((node) => {
        delete node.parent;
        delete node.comparatorName;
        delete node.comparatorId;
        delete node.comparator;
    });
    return graphData;
}

;// ./src/functions/validation-report.function.ts

/**
 * Makes a validation report
 *
 * @param data Data to convert
 * @returns A csv string
 */
function makeValidationReport(data) {
    // Output lines/data will be added here
    const lines = [];
    // Grouping all the warnings by its code
    const codeByWarnings = {};
    for (const warning of data.warnings) {
        // match will be having two values [<matched string>, <digit part of the code in the string>]
        const match = warning.match(/\(Code ([0-9]+)\)$/);
        if (match) {
            const code = parseInt(match[1]);
            if (codeByWarnings[code]) {
                codeByWarnings[code].push(warning);
            }
            else {
                codeByWarnings[code] = [warning];
            }
        }
    }
    // Loop for checking the group of errors, and if length of the group errors is more then 0 then it has failed the validation and vise versa
    for (const [codeString, label] of Object.entries(WarningLabels)) {
        const code = parseInt(codeString);
        lines.push(`Validation ${label} ${codeByWarnings[code] ? 'failed' : 'passed'}`);
    }
    // Adding extra lines for space
    lines.push('', '');
    for (const [codeString, label] of Object.entries(WarningLabels)) {
        const code = parseInt(codeString);
        const groupOfWarnings = codeByWarnings[code];
        if (groupOfWarnings) {
            lines.push(`Validation feedback for ${label}`);
            groupOfWarnings.forEach((warning) => {
                lines.push(warning);
            });
        }
    }
    return lines.join('\n');
}

;// ./src/routes/csv.ts








/** Adds csv routes */
function setupCSVRoutes(app) {
    /**
     * Fetch a CSV given a link and parse it into json or graph output
     */
    app.get('/v2/csv', async (req, res) => {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        // query parameters
        const csvUrls = req.query['csvUrl'];
        const expanded = req.query['expanded'] !== 'false';
        const withSubclasses = req.query['subclasses'] !== 'false';
        const output = req.query['output'];
        try {
            const asctbDataResponses = await Promise.all(csvUrls.split('|').map(async (csvUrl) => {
                const parsedUrl = normalizeCsvUrl(csvUrl.trim());
                const response = await external_axios_default().get(parsedUrl);
                const { data } = external_papaparse_default().parse(response.data, {
                    skipEmptyLines: 'greedy',
                });
                const asctbData = makeASCTBData(data);
                return {
                    data: asctbData?.data ?? [],
                    metadata: asctbData?.metadata ?? {},
                    csv: response.data,
                    parsed: data,
                    warnings: asctbData?.warnings ?? [],
                    isOmap: asctbData?.isOmap ?? false,
                };
            }));
            const asctbData = asctbDataResponses
                .map((response) => response.data)
                .reduce((result, data) => {
                result = result.concat(data);
                return result;
            }, []);
            const asctbDataResponse = asctbDataResponses[0];
            if (output === 'owl') {
                const graphData = await makeOwlData(makeJsonLdData(makeGraphData(asctbData), withSubclasses));
                res.type('application/rdf+xml');
                res.send(graphData);
            }
            else if (output === 'jsonld') {
                let graphData = makeJsonLdData(makeGraphData(asctbData), withSubclasses);
                if (expanded) {
                    graphData = await (0,external_jsonld_namespaceObject.expand)(graphData);
                }
                res.send(graphData);
            }
            else if (output === 'graph') {
                const graphData = makeGraphData(asctbData);
                res.send({
                    data: graphData,
                });
            }
            else if (output === 'validate') {
                const reports = asctbDataResponses.map(makeValidationReport);
                res.type('text/plain');
                res.send(reports[0]);
            }
            else {
                // The default is returning the json
                res.send({
                    data: asctbData,
                    metadata: asctbDataResponse.metadata,
                    csv: asctbDataResponse.csv,
                    parsed: asctbDataResponse.parsed,
                    warnings: asctbDataResponse.warnings,
                    isOmap: asctbDataResponse.isOmap ?? false,
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                msg: 'Please provide a either a valid csv url or a valid public google sheet url. If you are uploading either of these methods, please check the CSV format',
                code: 500,
            });
        }
    });
    /**
     * Parse a CSV into JSON format given the raw file formData
     */
    app.post('/v2/csv', async (req, res) => {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        if (!req.files || !req.files['csvFile']) {
            res.status(400).send({
                msg: 'This route only accepts CSVs POSTed and called csvFile',
                code: 400,
            });
            return;
        }
        const file = req.files['csvFile'];
        if (file.mimetype !== 'text/csv' || file.size > 10000000) {
            res.status(400).send({
                msg: 'File must be a CSV less than 10 MB.',
                code: 400,
            });
            return;
        }
        const dataString = file.data.toString();
        console.log('File uploaded: ', file.name);
        try {
            const { data } = external_papaparse_default().parse(dataString, {
                skipEmptyLines: 'greedy',
            });
            const asctbData = makeASCTBData(data);
            res.send({
                data: asctbData?.data ?? [],
                metadata: asctbData?.metadata ?? {},
                csv: dataString,
                parsed: data,
                warnings: asctbData?.warnings ?? [],
                isOmap: asctbData?.isOmap ?? false,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                msg: 'Please check the CSV format',
                code: 500,
            });
        }
    });
    app.get('/v2/csv/validate', async () => {
        console.log();
    });
}

;// ./const.ts
/* tslint:disable:max-line-length */
const PLAYGROUND_CSV = `"Anatomical Strucures, Cell Types and Biomarkers Table  for *Organ Name*",,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,
Author: Joe Doe (add up to 3 authors with ORCID IDs),,,,,,,,,,,,,,,,,,,,,,,,,,,
"Reviewer: Jane Doe (no limit, will be listed in Acknowledgements)",,,,,,,,,,,,,,,,,,,,,,,,,,,
Date Started: MM/DD/YYYY,,,Last Modified: MM/DD/YYYY,,,,,,,,,,,,,,,,,,,,,,,,
Version Number: v 0.0.1,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,
Major Publications: Authors (Year) Title. Venue.,,,,,,,,,,,,,,,,,,,,,,,,,,,
"It was estimated that roughly, this table covers about 95% of known AS, 50% of known CT, and 30% of known B. [revise as needed]",,,,,,,,,,,,,,,,,,,,,,,,,,,
"Partonomy (some are 17 levels deep, provide RDFS LABEL, Uberon ID)",,,,,,,,,Typology (1 level CL for NCB),,,"Gene Biomarkers (many, HGNC IDs)",,,"Protein Biomarkers (many, need HGNC IDs)",,,,,,FTU (1 if FTU or blank),"References for AS, CT, and B but also for AS-CT and CT-B Links",,,,,
AS/1,AS/1/LABEL,AS/1/ID,AS/2,AS/2/LABEL,AS/2/ID,AS/3,AS/3/LABEL,AS/3/ID,CT/1,CT/1/LABEL,CT/1/ID,BG/1,BG/1/LABEL,BG/1/ID,BP/1,BP/1/LABEL,BP/1/ID,BP/2,BP/2/LABEL,BP/2/ID,FTU,REF/1,REF/1/DOI,REF/1/NOTES,REF/2,REF/2/DOI,REF/2/NOTES
AS/1,AS/1/LABEL,AS/1/ID,AS/2,AS/2/LABEL,AS/2/ID,AS/3,AS/3/LABEL,AS/3/ID,CT/1,CT/1/LABEL,CT/1/ID,BG/1,BG/1/LABEL,BG/1/ID,,,,,,,,,,,,,
AS/1,AS/1/LABEL,AS/1/ID,AS/2,AS/2/LABEL,AS/2/ID,AS/3,AS/3/LABEL,AS/3/ID,CT/2,CT/2/LABEL,CT/2/ID,BG/2,BG/2/LABEL,BG/2/ID,,,,,,,,,,,,,
AS/1,AS/1/LABEL,AS/1/ID,AS/2,AS/2/LABEL,AS/2/ID,AS/3.1,AS/3.1/LABEL,AS/3.1/ID,CT/3,CT/3/LABEL,CT/3/ID,BG/3,BG/3/LABEL,BG/3/ID,,,,,,,,,,,,,
AS/1,AS/1/LABEL,AS/1/ID,AS/2.1,AS/2/.1LABEL,AS/2/ID,AS/3.1,AS/3.1/LABEL,AS/3.1/ID,CT/4,CT/4/LABEL,CT/4/ID,BG/3,BG/3/LABEL,BG/3/ID,,,,,,,,,,,,,
AS/1,AS/1/LABEL,AS/1/ID,AS/2.1,AS/2.1/LABEL,AS/2/ID,AS/3.2,AS/3.2/LABEL,AS/3.2/ID,CT/2,CT/2/LABEL,CT/2/ID,BG/4,BG/4/LABEL,BG/4/ID,,,,,,,,,,,,,
AS/1,AS/1/LABEL,AS/1/ID,AS/2.1,AS/2.1/LABEL,AS/2/ID,AS/3.2,AS/3.2/LABEL,AS/3.2/ID,CT/3,CT/3/LABEL,CT/3/ID,BG/5,BG/5/LABEL,BG/5/ID,,,,,,,,,,,,,`;

;// ./src/routes/google-sheet.ts





/** Adds google sheet routes */
function setupGoogleSheetRoutes(app) {
    /**
     * Fetch a Google Sheet given the sheet id and gid. Parses the data and returns JSON format.
     */
    app.get('/v2/:sheetid/:gid', async (req, res) => {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        const f1 = req.params['sheetid'];
        const f2 = req.params['gid'];
        try {
            let response;
            if (f1 === '0' && f2 === '0') {
                response = { data: PLAYGROUND_CSV };
            }
            else {
                response = await external_axios_default().get(`https://docs.google.com/spreadsheets/d/${f1}/export?format=csv&gid=${f2}`);
            }
            const { data } = external_papaparse_default().parse(response.data);
            const asctbData = makeASCTBData(data);
            res.send({
                data: asctbData?.data ?? [],
                metadata: asctbData?.metadata ?? {},
                warnings: asctbData?.warnings ?? [],
                csv: response.data,
                parsed: data,
                isOmap: asctbData?.isOmap ?? false,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                msg: 'Please check the table format or the sheet access',
                code: 500,
            });
        }
    });
    /**
     * Fetch a Google Sheet given the sheet id and gid. Parses the data and returns Graph format.
     */
    app.get('/v2/:sheetid/:gid/graph', async (req, res) => {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        const sheetID = req.params['sheetid'];
        const gID = req.params['gid'];
        try {
            let resp;
            if (sheetID === '0' && gID === '0') {
                resp = { data: PLAYGROUND_CSV };
            }
            else {
                resp = await external_axios_default().get(`https://docs.google.com/spreadsheets/d/${sheetID}/export?format=csv&gid=${gID}`);
            }
            const { data } = external_papaparse_default().parse(resp.data);
            const asctbData = makeASCTBData(data);
            const graphData = makeGraphData(asctbData?.data ?? []);
            res.send({
                data: graphData,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                msg: 'Please check the table format or the sheet access',
                code: 500,
            });
        }
    });
}

;// ./src/routes/ontology-lookup.ts



/** Adds ontology lookup routes */
function setupOntologyLookupRoutes(app) {
    /**
     * Given an ontology code (UBERON, FMA, CL, or HGNC), and a numerical ID of a term,
     * call the corresponding external ontology API to fetch data about that term, including
     * label and description.
     */
    app.get('/lookup/:ontology/:id', async (req, res) => {
        const ontologyCode = req.params['ontology'].toUpperCase();
        const termId = req.params['id'];
        const output = req.query['output'];
        switch (ontologyCode) {
            case OntologyCode.HGNC: {
                const response = await external_axios_default().get(buildHGNCApiUrl(termId), {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.status === 200 && response.data) {
                    const firstResult = response.data.response.docs[0];
                    const details = {
                        extraLinks: {
                            'Uniprot Link': buildUniprotLink(firstResult.uniprot_ids[0]),
                            'Entrez Link': buildEntrezLink(firstResult.entrez_id),
                        },
                        label: firstResult.symbol,
                        link: buildHGNCLink(firstResult.hgnc_id),
                        description: firstResult.name ? firstResult.name : '',
                    };
                    res.send({
                        ...(output === 'graph' && { additionalInfo: firstResult }),
                        ...details,
                    });
                }
                else {
                    res.status(response.status).end();
                }
                break;
            }
            case OntologyCode.UBERON:
            case OntologyCode.CL:
            case OntologyCode.LMHA:
            case OntologyCode.FMA: {
                const response = await external_axios_default().get(buildASCTApiUrl(`${ontologyCode}:${termId}`));
                if (response.status === 200 && response.data?._embedded?.terms?.length > 0) {
                    const firstResult = response.data._embedded.terms[0];
                    const details = {
                        label: firstResult.label,
                        link: firstResult.iri,
                        description: firstResult.annotation.definition ? firstResult.annotation.definition[0] : '',
                    };
                    res.send({
                        ...(output === 'graph' && { additionalInfo: firstResult }),
                        ...details,
                    });
                }
                else {
                    res.status(response.status).end();
                }
            }
        }
    });
}

;// ./src/routes/open-api-spec.ts
const browserRoute = (_req, res, _next) => {
    res.send(`<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>ASCT+B-API Open API Spec</title>
        <script src="https://cdn.jsdelivr.net/npm/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@stoplight/elements/styles.min.css">
    </head>
    <body>
        <elements-api apiDescriptionUrl="asctb-api-spec.yaml" router="hash" />
    </body>
    </html>`);
};
const openApiRoute = (_req, res, _next) => {
    res.sendFile('assets/asctb-api-spec.yaml', {
        root: __dirname,
    });
};
function setupOpenApiSpecRoutes(app) {
    app.get('/', browserRoute);
    app.get('/index.html', browserRoute);
    app.get('/asctb-api-spec.yaml', openApiRoute);
}

;// ./src/routes/playground.ts



/** Adds playground routes */
function setupPlaygroundRoutes(app) {
    /**
     * Get the toy CSV data set for the default playground view
     */
    app.get('/v2/playground', async (req, res) => {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        try {
            const parsed = external_papaparse_default().parse(PLAYGROUND_CSV).data;
            const asctbData = makeASCTBData(parsed);
            res.send({
                data: asctbData?.data ?? [],
                metadata: asctbData?.metadata ?? {},
                csv: PLAYGROUND_CSV,
                parsed: parsed,
                warnings: asctbData?.warnings ?? [],
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                msg: JSON.stringify(err),
                code: 500,
            });
        }
    });
    /**
     * Send updated data to render on the playground after editing the table
     */
    app.post('/v2/playground', async (req, res) => {
        const csv = external_papaparse_default().unparse(req.body);
        try {
            const asctbData = makeASCTBData(req.body.data);
            res.send({
                data: asctbData?.data ?? [],
                metadata: asctbData?.metadata ?? {},
                parsed: req.body,
                csv: csv,
                warnings: asctbData?.warnings ?? [],
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                msg: JSON.stringify(err),
                code: 500,
            });
        }
    });
}

;// ./src/routes/static-pages.ts
/** Adds static page routes */
function setupStaticPageRoutes(app) {
    app.get('/graph', (_req, res) => {
        res.sendFile('assets/graph-vis/index.html', {
            root: __dirname,
        });
    });
    app.get('/home.html', (_req, res) => {
        res.sendFile('assets/views/home.html', {
            root: __dirname,
        });
    });
}

;// external "memory-cache"
const external_memory_cache_namespaceObject = require("memory-cache");
var external_memory_cache_default = /*#__PURE__*/__webpack_require__.n(external_memory_cache_namespaceObject);
;// ./src/utils/route-caching.ts

/**
 * Creates a handler that caches responses for a specific duration
 *
 * @param duration Duration to keep the cached response
 * @returns A request handler
 */
function routeCache(duration) {
    return (req, res, next) => {
        // query parameters
        const cache = req.query['cache'];
        if (cache !== 'true') {
            next();
        }
        else {
            res.set('Content-Type', 'application/json');
            res.set('Cache-control', `public, max-age=${duration}`);
            const key = '__express__' + req.originalUrl || 0;
            const cachedBody = external_memory_cache_default().get(key);
            if (cachedBody) {
                res.send(cachedBody);
            }
            else {
                const sendResponse = res.send;
                res.send = (body) => {
                    external_memory_cache_default().put(key, body, duration * 1000);
                    sendResponse.call(res, body);
                    return body;
                };
                next();
            }
        }
    };
}

;// ./src/main.ts











/** Main express application */
const app = external_express_default()();
app.use(external_cors_default()());
app.use(external_express_default().urlencoded({ extended: true }));
app.use(external_express_default().json());
app.use(external_express_default()["static"](external_path_default().join(__dirname, 'assets')));
app.use(external_express_fileupload_default()());
app.use(routeCache(12000));
setupCSVRoutes(app);
setupPlaygroundRoutes(app);
setupOntologyLookupRoutes(app);
setupGoogleSheetRoutes(app);
setupOpenApiSpecRoutes(app);
setupStaticPageRoutes(app);
/** Port to listen on (default: 5000) */
const port = process.env['PORT'] || 5000;
/** Application server */
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;