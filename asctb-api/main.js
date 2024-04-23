/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app = void 0;
const tslib_1 = __webpack_require__(1);
const cors_1 = tslib_1.__importDefault(__webpack_require__(2));
const express_1 = tslib_1.__importDefault(__webpack_require__(3));
const express_fileupload_1 = tslib_1.__importDefault(__webpack_require__(4));
const path_1 = tslib_1.__importDefault(__webpack_require__(5));
const csv_1 = __webpack_require__(6);
const google_sheet_1 = __webpack_require__(23);
const ontology_lookup_1 = __webpack_require__(25);
const open_api_spec_1 = __webpack_require__(26);
const playground_1 = __webpack_require__(27);
const static_pages_1 = __webpack_require__(28);
const route_caching_1 = __webpack_require__(29);
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, 'assets')));
exports.app.use((0, express_fileupload_1.default)());
exports.app.use((0, route_caching_1.routeCache)(12000));
(0, csv_1.setupCSVRoutes)(exports.app);
(0, playground_1.setupPlaygroundRoutes)(exports.app);
(0, ontology_lookup_1.setupOntologyLookupRoutes)(exports.app);
(0, google_sheet_1.setupGoogleSheetRoutes)(exports.app);
(0, open_api_spec_1.setupOpenApiSpecRoutes)(exports.app);
(0, static_pages_1.setupStaticPageRoutes)(exports.app);
const port = process.env.PORT || 5000;
const server = exports.app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("express-fileupload");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupCSVRoutes = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = tslib_1.__importDefault(__webpack_require__(7));
const jsonld_1 = __webpack_require__(8);
const papaparse_1 = tslib_1.__importDefault(__webpack_require__(9));
const api_functions_1 = __webpack_require__(10);
const graph_jsonld_functions_1 = __webpack_require__(16);
const graph_owl_functions_1 = __webpack_require__(18);
const graph_functions_1 = __webpack_require__(21);
const validation_report_function_1 = __webpack_require__(22);
function setupCSVRoutes(app) {
    /**
     * Fetch a CSV given a link and parse it into json or graph output
     */
    app.get('/v2/csv', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        // query parameters
        const csvUrls = req.query.csvUrl;
        const expanded = req.query.expanded !== 'false';
        const withSubclasses = req.query.subclasses !== 'false';
        const output = req.query.output;
        try {
            const asctbDataResponses = yield Promise.all(csvUrls.split('|').map((csvUrl) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const parsedUrl = (0, api_functions_1.normalizeCsvUrl)(csvUrl.trim());
                const response = yield axios_1.default.get(parsedUrl);
                const { data } = papaparse_1.default.parse(response.data, {
                    skipEmptyLines: 'greedy',
                });
                const asctbData = (0, api_functions_1.makeASCTBData)(data);
                return {
                    data: asctbData.data,
                    metadata: asctbData.metadata,
                    csv: response.data,
                    parsed: data,
                    warnings: asctbData.warnings,
                    isOmap: asctbData.isOmap,
                };
            })));
            const asctbData = asctbDataResponses
                .map((response) => response.data)
                .reduce((result, data) => {
                result = result.concat(data);
                return result;
            }, []);
            const asctbDataResponse = asctbDataResponses[0];
            if (output === 'owl') {
                const graphData = yield (0, graph_owl_functions_1.makeOwlData)((0, graph_jsonld_functions_1.makeJsonLdData)((0, graph_functions_1.makeGraphData)(asctbData), withSubclasses));
                res.type('application/rdf+xml');
                return res.send(graphData);
            }
            else if (output === 'jsonld') {
                let graphData = (0, graph_jsonld_functions_1.makeJsonLdData)((0, graph_functions_1.makeGraphData)(asctbData), withSubclasses);
                if (expanded) {
                    graphData = yield (0, jsonld_1.expand)(graphData);
                }
                return res.send(graphData);
            }
            else if (output === 'graph') {
                const graphData = (0, graph_functions_1.makeGraphData)(asctbData);
                return res.send({
                    data: graphData,
                });
            }
            else if (output === 'validate') {
                const reports = asctbDataResponses.map(validation_report_function_1.makeValidationReport);
                res.type('text/plain');
                return res.send(reports[0]);
            }
            else {
                // The default is returning the json
                return res.send({
                    data: asctbData,
                    metadata: asctbDataResponse.metadata,
                    csv: asctbDataResponse.csv,
                    parsed: asctbDataResponse.parsed,
                    warnings: asctbDataResponse.warnings,
                    isOmap: (_a = asctbDataResponse.isOmap) !== null && _a !== void 0 ? _a : false,
                });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                msg: 'Please provide a either a valid csv url or a valid public google sheet url. If you are uploading either of these methods, please check the CSV format',
                code: 500,
            });
        }
    }));
    /**
     * Parse a CSV into JSON format given the raw file formData
     */
    app.post('/v2/csv', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        if (!req.files || !req.files.csvFile) {
            return res.status(400).send({
                msg: 'This route only accepts CSVs POSTed and called csvFile',
                code: 400,
            });
        }
        const file = req.files.csvFile;
        if (file.mimetype !== 'text/csv' || file.size > 10000000) {
            return res.status(400).send({
                msg: 'File must be a CSV less than 10 MB.',
                code: 400,
            });
        }
        const dataString = file.data.toString();
        console.log('File uploaded: ', file.name);
        try {
            const { data } = papaparse_1.default.parse(dataString, {
                skipEmptyLines: 'greedy',
            });
            const asctbData = (0, api_functions_1.makeASCTBData)(data);
            return res.send({
                data: asctbData.data,
                metadata: asctbData.metadata,
                csv: dataString,
                parsed: data,
                warnings: asctbData.warnings,
                isOmap: asctbData.isOmap,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                msg: 'Please check the CSV format',
                code: 500,
            });
        }
    }));
    app.get('/v2/csv/validate', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log();
    }));
}
exports.setupCSVRoutes = setupCSVRoutes;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("jsonld");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("papaparse");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeASCTBDataWork = exports.makeASCTBData = exports.getHeaderRow = exports.findHeaderIndex = exports.buildMetadata = exports.normalizeCsvUrl = void 0;
const api_model_1 = __webpack_require__(11);
const warnings_1 = __webpack_require__(12);
const lookup_functions_1 = __webpack_require__(13);
const omap_functions_1 = __webpack_require__(15);
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
exports.normalizeCsvUrl = normalizeCsvUrl;
function setData(column, _columnNumber, row, value, warnings) {
    if (column.length > 1) {
        const arrayName = api_model_1.arrayNameMap[column[0]];
        const originalArrayName = column[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const objectArray = row[arrayName] || [];
        if (!arrayName) {
            warnings.add(`WARNING: unmapped array found ${originalArrayName} (Code ${warnings_1.WarningCode.UnmappedData})`);
        }
        if (column.length === 2) {
            if (objectArray.length === 0 && arrayName) {
                row[arrayName] = objectArray;
            }
            objectArray.push((0, api_model_1.createObject)(value, originalArrayName));
        }
        else if (column.length === 3 && arrayName) {
            let arrayIndex = parseInt(column[1], 10) - 1;
            const fieldName = api_model_1.objectFieldMap[column[2]]; // || (column[2]?.toLowerCase() ?? '').trim();
            if (arrayIndex >= 0 && fieldName) {
                if (arrayIndex >= objectArray.length) {
                    warnings.add(`WARNING: blank cells likely found in column: ${column.join('/')}, row: ${row.rowNumber}`);
                }
                // FIXME: Temporarily deal with blank columns since so many tables are non-conformant
                arrayIndex = objectArray.length - 1;
                if (arrayIndex < objectArray.length) {
                    if (fieldName === 'id') {
                        value = (0, lookup_functions_1.fixOntologyId)(value);
                    }
                    if (objectArray[arrayIndex]) {
                        objectArray[arrayIndex][fieldName] = value;
                    }
                    else {
                        warnings.add(`WARNING: bad column: ${column.join('/')} (Code ${warnings_1.WarningCode.BadColumn})`);
                    }
                }
            }
        }
    }
}
const invalidCharacterRegex = /_/gi;
const isLinkRegex = /^http/gi;
const codepointUppercaseA = 65;
const alphabetLength = 26;
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
function validateDataCell(value, rowIndex, columnIndex, warnings) {
    if (!isLinkRegex.test(value) && invalidCharacterRegex.test(value)) {
        const colName = columnIndexToName(columnIndex);
        warnings.add(`WARNING: Invalid characters in data cell at column: ${colName} row: ${rowIndex + 1} where data cell: ${value} (Code ${warnings_1.WarningCode.InvalidCharacter})`);
    }
}
/*
 * buildMetadata - build metadata key value store
 * @param metadataRows = rows from metadata to be extracted
 * @param warnings = warnings generated during the process are pushed to this set
 * @returns = returns key value pairs of metadata
 */
const buildMetadata = (metadataRows, warnings) => {
    const [titleRow] = metadataRows.splice(api_model_1.TITLE_ROW_INDEX, 1);
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
            warnings.add(`WARNING: Metadata Key missing found at Row: ${rowNumber + 3} (Code ${warnings_1.WarningCode.UnmappedMetadata})`);
            return metadata;
        }
        else if (!metadataValue) {
            warnings.add(`WARNING: Metadata Value missing found at Row: ${rowNumber + 3} (Code ${warnings_1.WarningCode.UnmappedMetadata})`);
        }
        let metadataKey = api_model_1.metadataNameMap[metadataIdentifier];
        if (!metadataKey) {
            metadataKey = metadataIdentifier.toLowerCase();
            warnings.add(`WARNING: unmapped metadata found ${metadataIdentifier} at Row: ${rowNumber + 3} (Code ${warnings_1.WarningCode.UnmappedMetadata})`);
        }
        if (api_model_1.metadataArrayFields.includes(metadataKey)) {
            metadata[metadataKey] = metadataValue.split(api_model_1.DELIMETER).map((item) => item.trim());
        }
        else {
            metadata[metadataKey] = metadataValue.trim();
        }
        return metadata;
    }, result);
};
exports.buildMetadata = buildMetadata;
function findHeaderIndex(headerRow, data, firstColumnName) {
    for (let i = headerRow; i < data.length; i++) {
        if (data[i][0] === firstColumnName) {
            return i;
        }
    }
    return headerRow;
}
exports.findHeaderIndex = findHeaderIndex;
function validateHeaderRow(headerData, rowIndex, warnings) {
    let columnIndex = 0;
    headerData.forEach((value) => {
        /**
         * Validate the Header of length 3: i.e after splitting header with ("/")
         */
        if (value.length === 3) {
            const colName = columnIndexToName(columnIndex);
            const invalidHeader = `WARNING: Invalid Header found at column: ${colName}, row: ${rowIndex} where Header Value: ${value.join('/')} (Code ${warnings_1.WarningCode.InvalidHeader})`;
            const columnBlank = value.join('').trim().length === 0;
            const col0Warnings = value[0].trim().length === 0 || !api_model_1.arrayNameMap[value[0].toUpperCase()];
            const col1Warnings = value[1].trim().length === 0 || Number.isNaN(parseInt(value[1]));
            const col2Warnings = value[2].trim().length === 0 || !api_model_1.objectFieldMap[value[2]];
            const showWarnings = col0Warnings || col1Warnings || col2Warnings;
            if (columnBlank) {
                warnings.add(`WARNING: Blank Header found at column: ${colName}, row: ${rowIndex} (Code ${warnings_1.WarningCode.MissingHeader})`);
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
            const invalidHeader = `WARNING: Invalid Header found at column: ${colName}, row: ${rowIndex} where Header Value: ${value.join('/')} (Code ${warnings_1.WarningCode.InvalidHeader})`;
            const columnBlank = value.join('').trim().length === 0;
            const col0Warnings = value[0].trim().length === 0 || !api_model_1.arrayNameMap[value[0].toUpperCase()];
            const col1Warnings = value[1].trim().length === 0 || Number.isNaN(parseInt(value[1]));
            const showWarnings = col0Warnings || col1Warnings;
            if (columnBlank) {
                warnings.add(`WARNING: Blank Header found at column: ${colName}, row: ${rowIndex} (Code ${warnings_1.WarningCode.MissingHeader})`);
            }
            else if (showWarnings) {
                warnings.add(invalidHeader);
            }
        }
        columnIndex = columnIndex + 1;
    });
}
function checkMissingIds(column, index, row, value, rowData, warnings) {
    var _a, _b, _c, _d;
    /**
     * check for missing Uberon/CL IDs:
     */
    const lastElement = column[column.length - 1];
    const isId = lastElement.toLowerCase() === api_model_1.objectFieldMap.ID;
    if (isId) {
        const nameValue = (_b = (_a = rowData[index - 2]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
        const idValue = value.trim();
        const labelValue = (_d = (_c = rowData[index - 1]) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '';
        if (nameValue) {
            if (!idValue) {
                const colName = columnIndexToName(index);
                warnings.add(`WARNING: Missing Uberon/CL ID at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${warnings_1.WarningCode.MissingCTorAnatomy})`);
            }
            else if (!labelValue) {
                const colName = columnIndexToName(index - 1);
                warnings.add(`WARNING: Missing RDFS Label for ID ${idValue} at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${warnings_1.WarningCode.MissingCTorAnatomy})`);
            }
            if (column.join('/') === 'CT/1/ID' && (!idValue || !idValue.startsWith('CL:'))) {
                const colName = columnIndexToName(index);
                warnings.add(`WARNING: CT/1/ID is not a CL ID (required) at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${warnings_1.WarningCode.NoIdInCT1})`);
            }
        }
    }
}
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
exports.getHeaderRow = getHeaderRow;
function makeASCTBData(data) {
    const header = getHeaderRow(data, api_model_1.OMAP_HEADER_FIRST_COLUMN, api_model_1.ASCT_HEADER_FIRST_COLUMN, api_model_1.LEGACY_OMAP_HEADER_FIRST_COLUMN);
    if (header[0] === api_model_1.LEGACY_OMAP_HEADER_FIRST_COLUMN) {
        const omapTransformer = new omap_functions_1.OmapDataTransformer(data, true);
        const omapWarnings = omapTransformer.warnings;
        const asctbData = makeASCTBDataWork(omapTransformer.transformedData);
        return Object.assign(Object.assign({}, asctbData), { warnings: [...asctbData.warnings, ...omapWarnings], isOmap: true });
    }
    else if (header[0] === api_model_1.OMAP_HEADER_FIRST_COLUMN) {
        const omapTransformer = new omap_functions_1.OmapDataTransformer(data, false);
        const omapWarnings = omapTransformer.warnings;
        const asctbData = makeASCTBDataWork(omapTransformer.transformedData);
        return Object.assign(Object.assign({}, asctbData), { warnings: [...asctbData.warnings, ...omapWarnings], isOmap: true });
    }
    else if (header[0] === api_model_1.ASCT_HEADER_FIRST_COLUMN) {
        const asctbData = makeASCTBDataWork(data);
        return Object.assign(Object.assign({}, asctbData), { isOmap: false });
    }
    else {
        throw new Error(`Header row, first column should be : ${api_model_1.ASCT_HEADER_FIRST_COLUMN} or ${api_model_1.OMAP_HEADER_FIRST_COLUMN}`);
    }
}
exports.makeASCTBData = makeASCTBData;
function makeASCTBDataWork(data) {
    const headerRow = findHeaderIndex(0, data, api_model_1.ASCT_HEADER_FIRST_COLUMN);
    const columns = data[headerRow].map((col) => col
        .toUpperCase()
        .split('/')
        .map((s) => s.trim()));
    const warnings = new Set();
    validateHeaderRow(columns, headerRow + 2, warnings);
    const results = data.slice(headerRow + 1).map((rowData, rowNumber) => {
        const row = new api_model_1.Row(headerRow + rowNumber + 2);
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
    const metadata = (0, exports.buildMetadata)(metadataRows, warnings);
    return {
        data: results,
        metadata: metadata,
        warnings: [...warnings],
    };
}
exports.makeASCTBDataWork = makeASCTBDataWork;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Row = exports.Structure = exports.Reference = exports.createObject = exports.objectFieldMap = exports.arrayNameMap = exports.OMAP_HEADER_FIRST_COLUMN = exports.LEGACY_OMAP_HEADER_FIRST_COLUMN = exports.ASCT_HEADER_FIRST_COLUMN = exports.PROTEIN_PRESENCE = exports.OMAP_ORGAN = exports.BM_TYPE = exports.metadataNameMap = exports.metadataArrayFields = exports.TITLE_ROW_INDEX = exports.DELIMETER = void 0;
/* tslint:disable:variable-name */
exports.DELIMETER = ';';
exports.TITLE_ROW_INDEX = 0;
exports.metadataArrayFields = [
    'author_names',
    'author_orcids',
    'reviewer_names',
    'reviewer_orcids',
    'general_publications',
];
exports.metadataNameMap = {
    'Author Name(s):': 'author_names',
    'Author ORCID(s):': 'author_orcids',
    'Reviewer(s):': 'reviewer_names',
    'Reviewer ORCID(s):': 'reviewer_orcids',
    'General Publication(s):': 'general_publications',
    'Data DOI:': 'data_doi',
    'Date:': 'date',
    'Version Number:': 'version',
};
var BM_TYPE;
(function (BM_TYPE) {
    BM_TYPE["G"] = "gene";
    BM_TYPE["P"] = "protein";
    BM_TYPE["BL"] = "lipids";
    BM_TYPE["BM"] = "metabolites";
    BM_TYPE["BF"] = "proteoforms";
})(BM_TYPE || (exports.BM_TYPE = BM_TYPE = {}));
exports.OMAP_ORGAN = {
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
var PROTEIN_PRESENCE;
(function (PROTEIN_PRESENCE) {
    PROTEIN_PRESENCE["POS"] = "Positive";
    PROTEIN_PRESENCE["NEG"] = "Negative";
    PROTEIN_PRESENCE["UNKNOWN"] = "Unknown";
    PROTEIN_PRESENCE["INTERMEDIATE"] = "Intermediate";
})(PROTEIN_PRESENCE || (exports.PROTEIN_PRESENCE = PROTEIN_PRESENCE = {}));
exports.ASCT_HEADER_FIRST_COLUMN = 'AS/1';
exports.LEGACY_OMAP_HEADER_FIRST_COLUMN = 'uniprot_accession_number';
exports.OMAP_HEADER_FIRST_COLUMN = 'omap_id';
exports.arrayNameMap = {
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
exports.objectFieldMap = {
    ID: 'id',
    LABEL: 'rdfs_label',
    DOI: 'doi',
    NOTES: 'notes',
    NOTE: 'notes',
};
function createObject(name, structureType) {
    switch (structureType) {
        case 'REF':
            return new Reference(name);
        case 'AS':
        default:
            return new Structure(name, structureType);
    }
}
exports.createObject = createObject;
class Reference {
    constructor(id) {
        this.id = id;
    }
    isValid() {
        return !!this.id || !!this.doi || !!this.notes;
    }
}
exports.Reference = Reference;
class Structure {
    constructor(name, structureType) {
        this.id = '';
        this.rdfs_label = '';
        this.name = name;
        this.setBiomarkerProperties(structureType, name);
    }
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
    isValid() {
        return !!this.id || !!this.name || !!this.rdfs_label;
    }
}
exports.Structure = Structure;
class Row {
    constructor(rowNumber) {
        this.rowNumber = rowNumber;
        this.anatomical_structures = [];
        this.cell_types = [];
        this.biomarkers = [];
        this.biomarkers_protein = [];
        this.biomarkers_gene = [];
        this.biomarkers_lipids = [];
        this.biomarkers_meta = [];
        this.biomarkers_prot = [];
        this.ftu_types = [];
        this.references = [];
    }
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
exports.Row = Row;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WarningLabels = exports.WarningCode = void 0;
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
})(WarningCode || (exports.WarningCode = WarningCode = {}));
exports.WarningLabels = {
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


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guessIri = exports.fixOntologyId = exports.buildHGNCLink = exports.buildEntrezLink = exports.buildUniprotLink = exports.buildHGNCApiUrl = exports.buildASCTApiUrl = void 0;
const lookup_model_1 = __webpack_require__(14);
function buildASCTApiUrl(id) {
    return `http://www.ebi.ac.uk/ols/api/terms/findByIdAndIsDefiningOntology?obo_id=${id}`;
}
exports.buildASCTApiUrl = buildASCTApiUrl;
function buildHGNCApiUrl(id) {
    return `https://rest.genenames.org/fetch/hgnc_id/${id}`;
}
exports.buildHGNCApiUrl = buildHGNCApiUrl;
function buildUniprotLink(id) {
    return `https://www.uniprot.org/uniprot/${id}`;
}
exports.buildUniprotLink = buildUniprotLink;
function buildEntrezLink(id) {
    return `https://www.ncbi.nlm.nih.gov/gene/?term=${id}`;
}
exports.buildEntrezLink = buildEntrezLink;
function buildHGNCLink(id) {
    return `http://identifiers.org/hgnc/${id}`;
}
exports.buildHGNCLink = buildHGNCLink;
function fixOntologyId(id) {
    if ((id === null || id === void 0 ? void 0 : id.toLowerCase()) === 'n/a' || (id === null || id === void 0 ? void 0 : id.toLowerCase()) === 'not found') {
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
exports.fixOntologyId = fixOntologyId;
function guessIri(id) {
    const [code, idNumber] = id.split(':');
    if (idNumber) {
        switch (code) {
            case lookup_model_1.OntologyCode.CL:
                return `http://purl.obolibrary.org/obo/CL_${idNumber}`;
            case lookup_model_1.OntologyCode.FMA:
                return `http://purl.org/sig/ont/fma/fma${idNumber}`;
            case lookup_model_1.OntologyCode.HGNC:
                return `http://identifiers.org/hgnc/${idNumber}`;
            case lookup_model_1.OntologyCode.LMHA:
                return `http://purl.obolibrary.org/obo/LMHA_${idNumber}`;
            case lookup_model_1.OntologyCode.UBERON:
                return `http://purl.obolibrary.org/obo/UBERON_${idNumber}`;
            default:
                return undefined;
        }
    }
    else {
        return undefined;
    }
}
exports.guessIri = guessIri;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OntologyCode = void 0;
var OntologyCode;
(function (OntologyCode) {
    OntologyCode["UBERON"] = "UBERON";
    OntologyCode["CL"] = "CL";
    OntologyCode["FMA"] = "FMA";
    OntologyCode["HGNC"] = "HGNC";
    OntologyCode["LMHA"] = "LMHA";
})(OntologyCode || (exports.OntologyCode = OntologyCode = {}));


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OmapDataTransformer = void 0;
const api_model_1 = __webpack_require__(11);
const api_functions_1 = __webpack_require__(10);
class OmapDataTransformer {
    constructor(data, legacy = false) {
        this.isLegacyOmap = legacy;
        this.data = data;
        this.headerRow = legacy
            ? (0, api_functions_1.findHeaderIndex)(0, this.data, api_model_1.LEGACY_OMAP_HEADER_FIRST_COLUMN)
            : (0, api_functions_1.findHeaderIndex)(0, this.data, api_model_1.OMAP_HEADER_FIRST_COLUMN);
        this.metaData = this.getMetaData();
        this._warnings = new Set();
        this._transformedData = this.transformOmapData();
    }
    transformOmapData() {
        // Initializing with the MetaData
        const asctbConverted = [];
        // Add metadata and new header row and the actual data
        asctbConverted.push(...this.data.slice(0, this.headerRow), this.createNewHeaderRow(), ...this.createData());
        return asctbConverted;
    }
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
    createData() {
        var _a;
        const dataObject = this.createMapOfOldColumnsAndValues();
        // Decides whether to take organs from table or constants
        const organColumnsPresent = ['organ', 'organ_uberon'].every((column) => this.columns.includes(column));
        const organ = (_a = api_model_1.OMAP_ORGAN[this.metaData.data_doi]) !== null && _a !== void 0 ? _a : api_model_1.OMAP_ORGAN.default;
        if (!(this.isLegacyOmap || organColumnsPresent)) {
            this._warnings.add('WARNING: Organ Columns Missing. Adding default Organ Columns');
        }
        if (this.isLegacyOmap && !api_model_1.OMAP_ORGAN[this.metaData.data_doi]) {
            this._warnings.add('WARNING: DOI mapping not present; Adding default Organ Columns.');
        }
        const transformedData = [];
        const title = this.metaData.title;
        const alternateOrgan = 'missing organ label';
        const alternateOrganUberon = 'missing organ UBERON id';
        let organLabelMissingWarningAdded = false;
        let organUberonMissingWarningAdded = false;
        dataObject.forEach((data) => {
            var _a, _b, _c;
            const uniprots = data.uniprot_accession_number.split(', ');
            const hgncIds = data.HGNC_ID.split(', ');
            const targetNames = data.target_name.split(', ');
            if (!(uniprots.length === hgncIds.length && hgncIds.length === targetNames.length)) {
                this.warnings.add('WARNING: Number of entires in column uniprot_accession_number, HGNC_ID,' +
                    `target_name are not equal in row ${data.rowNo}. uniprot_accession_number: ${uniprots.length};` +
                    `HGNC_ID: ${hgncIds.length}; target_name: ${targetNames.length}`);
            }
            let notes = `Extra information in "${title}", Row ${data.rowNo} \n`;
            notes += data.notes;
            if (!this.isLegacyOmap && !data.organ) {
                data.organ = alternateOrgan;
                if (!organLabelMissingWarningAdded) {
                    this._warnings.add('WARNING: Organ Label Missing.');
                    organLabelMissingWarningAdded = true;
                }
            }
            if (!this.isLegacyOmap && !data.organ_uberon) {
                data.organ_uberon = alternateOrganUberon;
                if (!organUberonMissingWarningAdded) {
                    this._warnings.add('WARNING: Organ Uberon ID Missing.');
                    organUberonMissingWarningAdded = true;
                }
            }
            if (data.uniprot_accession_number !== '' && data.HGNC_ID !== '' && data.target_name !== '') {
                const newrow = this.isLegacyOmap
                    ? [organ.name, organ.rdfs_label, organ.id]
                    : [data.organ, data.organ, data.organ_uberon];
                const maxBPs = Math.max(uniprots.length, hgncIds.length, targetNames.length);
                for (let i = 0; i < maxBPs; i++) {
                    newrow.push((_a = targetNames[i]) !== null && _a !== void 0 ? _a : '', (_b = uniprots[i]) !== null && _b !== void 0 ? _b : '', (_c = hgncIds[i]) !== null && _c !== void 0 ? _c : '', notes !== null && notes !== void 0 ? notes : '');
                }
                transformedData.push(newrow);
            }
            else {
                transformedData.push(this.isLegacyOmap ? [organ.name, organ.rdfs_label, organ.id] : [data.organ, data.organ, data.organ_uberon]);
            }
        });
        return transformedData;
    }
    /** Helper functions for createData */
    getMetaData() {
        const warnings = new Set();
        const metadataRows = this.data.slice(0, this.headerRow);
        return (0, api_functions_1.buildMetadata)(metadataRows, warnings);
    }
    createMapOfOldColumnsAndValues() {
        let dataObject = [];
        this.columns = this.data[this.headerRow].map((col) => col);
        this.data.slice(this.headerRow + 1).forEach((subArr, index) => {
            const keyValuePairs = this.columns.reduce((acc, key, i) => {
                acc[key] = subArr[i];
                return acc;
            }, {});
            // 4 = Two blank rows + 1 for 0 indexing of headerrow + 1 for 0 indexing for subArr
            keyValuePairs.rowNo = (index + this.headerRow + 4).toString();
            dataObject.push(keyValuePairs);
        });
        dataObject = this.createNotes(dataObject);
        return dataObject;
    }
    createNotes(dataObject) {
        const excludedKeys = ['uniprot_accession_number', 'HGNC_ID', 'target_name', 'rowNo'];
        dataObject.forEach((obj) => {
            const entries = Object.entries(obj);
            const formattedEntries = entries
                .filter(([key, value]) => value !== undefined && value !== null && value !== '' && !excludedKeys.includes(key))
                .map(([key, value]) => `**${key}:** ${value}`);
            const result = `- ${formattedEntries.join('\n- ')}`;
            obj.notes = result;
        });
        return dataObject;
    }
    /** Getters */
    get transformedData() {
        return this._transformedData;
    }
    get warnings() {
        return this._warnings;
    }
}
exports.OmapDataTransformer = OmapDataTransformer;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeJsonLdData = void 0;
const graph_model_1 = __webpack_require__(17);
const lookup_functions_1 = __webpack_require__(13);
var OwlType;
(function (OwlType) {
    OwlType["CLASS"] = "owl:Class";
    OwlType["RESTRICTION"] = "owl:Restriction";
})(OwlType || (OwlType = {}));
var OwlProperty;
(function (OwlProperty) {
    OwlProperty["ANNOTATION"] = "owl:AnnotationProperty";
    OwlProperty["OBJECT"] = "owl:ObjectProperty";
})(OwlProperty || (OwlProperty = {}));
var CcfProperty;
(function (CcfProperty) {
    CcfProperty["PART_OF"] = "ccf:ccf_part_of";
    CcfProperty["LOCATED_IN"] = "ccf:located_in";
    CcfProperty["CT_IS_A"] = "ccf:ct_is_a";
    CcfProperty["CHARACTERIZES"] = "ccf:characterizes";
    CcfProperty["OCCURS_IN"] = "ccf:occurs_in";
})(CcfProperty || (CcfProperty = {}));
function makeJsonLdData(data, withSubclasses = true) {
    var _a;
    const { nodes, edges } = data;
    const iriLookup = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeMap = new Map();
    nodes.forEach((node, index) => {
        var _a, _b;
        let ontologyId = node.metadata.ontologyId;
        let iri;
        if ((_a = (ontologyId === null || ontologyId === void 0 ? void 0 : ontologyId.trim().length) > 0) !== null && _a !== void 0 ? _a : false) {
            ontologyId = (0, lookup_functions_1.fixOntologyId)(ontologyId);
            iri = (0, lookup_functions_1.guessIri)(ontologyId);
        }
        if (!iri) {
            const suffix = (_b = node.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().trim().replace(/\W+/g, '-').replace(/[^a-z0-9-]+/g, '');
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
        var _a, _b, _c, _d, _e;
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
                case graph_model_1.Edge_type.AS_AS:
                    target.node.part_of = ((_a = target.node.part_of) !== null && _a !== void 0 ? _a : new Set()).add(source.iri);
                    break;
                case graph_model_1.Edge_type.AS_CT:
                    target.node.located_in = ((_b = target.node.located_in) !== null && _b !== void 0 ? _b : new Set()).add(source.iri);
                    break;
                case graph_model_1.Edge_type.CT_CT:
                    target.node.is_a = ((_c = target.node.is_a) !== null && _c !== void 0 ? _c : new Set()).add(source.iri);
                    break;
                case graph_model_1.Edge_type.CT_G:
                case graph_model_1.Edge_type.CT_P:
                case graph_model_1.Edge_type.CT_BL:
                case graph_model_1.Edge_type.CT_BM:
                case graph_model_1.Edge_type.CT_BF:
                    target.node.characterizes = ((_d = target.node.characterizes) !== null && _d !== void 0 ? _d : new Set()).add(source.iri);
                    break;
                case graph_model_1.Edge_type.AS_G:
                case graph_model_1.Edge_type.AS_P:
                    target.node.occurs_in = ((_e = source.node.occurs_in) !== null && _e !== void 0 ? _e : new Set()).add(source.iri);
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
            let subclasses = (_a = node['rdfs:subClassOf']) !== null && _a !== void 0 ? _a : [];
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
exports.makeJsonLdData = makeJsonLdData;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Metadata = exports.GNode = exports.Edge_type = exports.Node_type = void 0;
/* tslint:disable:variable-name */
var Node_type;
(function (Node_type) {
    Node_type["AS"] = "AS";
    Node_type["CT"] = "CT";
    Node_type["BM"] = "BM";
    Node_type["R"] = "root";
})(Node_type || (exports.Node_type = Node_type = {}));
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
})(Edge_type || (exports.Edge_type = Edge_type = {}));
class GNode {
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
exports.GNode = GNode;
class Metadata {
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
exports.Metadata = Metadata;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeOwlData = void 0;
const tslib_1 = __webpack_require__(1);
const stream_1 = __webpack_require__(19);
function makeOwlData(data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const inputReadable = new stream_1.Readable({
            read: () => {
                inputReadable.push(JSON.stringify(data));
                inputReadable.push(null);
            },
        });
        // This package has some kind of incompatibility with how nx transpiles/executes modules
        // If imported top level the serve command fails with `require() of ES Module [...] not supported`
        // Dynamically importing the module works fine though!
        const { default: formats } = yield Promise.resolve().then(() => tslib_1.__importStar(__webpack_require__(20)));
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
    });
}
exports.makeOwlData = makeOwlData;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("stream");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@rdfjs-elements/formats-pretty");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeGraphData = exports.buildgraphBM = exports.buildgraphCT = exports.buildgraphAS = void 0;
const graph_model_1 = __webpack_require__(17);
function buildgraphAS(data, graphData) {
    let id = -1;
    let parent;
    const root = new graph_model_1.GNode(id, data[0].anatomical_structures[0].name, 0, data[0].anatomical_structures[0].id, data[0].anatomical_structures[0].rdfs_label, graph_model_1.Node_type.R, []);
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
                const newNode = new graph_model_1.GNode(id, structure.id && idNameSet[structure.id] ? idNameSet[structure.id] : structure.name, parent.id, structure.id, structure.rdfs_label, graph_model_1.Node_type.AS, row.references);
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
exports.buildgraphAS = buildgraphAS;
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
                    const newNode = new graph_model_1.GNode(id, structure.name, parent.id, structure.id, structure.rdfs_label, graph_model_1.Node_type.CT, row.references);
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
exports.buildgraphCT = buildgraphCT;
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
                        const newNode = new graph_model_1.GNode(id, biomarker.name, parent.id, biomarker.id, biomarker.rdfs_label, graph_model_1.Node_type.BM, row.references, biomarker.b_type);
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
exports.buildgraphBM = buildgraphBM;
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
exports.makeGraphData = makeGraphData;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeValidationReport = void 0;
const warnings_1 = __webpack_require__(12);
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
    for (const [codeString, label] of Object.entries(warnings_1.WarningLabels)) {
        const code = parseInt(codeString);
        lines.push(`Validation ${label} ${codeByWarnings[code] ? 'failed' : 'passed'}`);
    }
    // Adding extra lines for space
    lines.push('', '');
    for (const [codeString, label] of Object.entries(warnings_1.WarningLabels)) {
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
exports.makeValidationReport = makeValidationReport;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupGoogleSheetRoutes = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = tslib_1.__importDefault(__webpack_require__(7));
const papaparse_1 = tslib_1.__importDefault(__webpack_require__(9));
const const_1 = __webpack_require__(24);
const api_functions_1 = __webpack_require__(10);
const graph_functions_1 = __webpack_require__(21);
function setupGoogleSheetRoutes(app) {
    /**
     * Fetch a Google Sheet given the sheet id and gid. Parses the data and returns JSON format.
     */
    app.get('/v2/:sheetid/:gid', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        const f1 = req.params.sheetid;
        const f2 = req.params.gid;
        try {
            let response;
            if (f1 === '0' && f2 === '0') {
                response = { data: const_1.PLAYGROUND_CSV };
            }
            else {
                response = yield axios_1.default.get(`https://docs.google.com/spreadsheets/d/${f1}/export?format=csv&gid=${f2}`);
            }
            const { data } = papaparse_1.default.parse(response.data);
            const asctbData = (0, api_functions_1.makeASCTBData)(data);
            return res.send({
                data: asctbData.data,
                metadata: asctbData.metadata,
                warnings: asctbData.warnings,
                csv: response.data,
                parsed: data,
                isOmap: asctbData.isOmap,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                msg: 'Please check the table format or the sheet access',
                code: 500,
            });
        }
    }));
    /**
     * Fetch a Google Sheet given the sheet id and gid. Parses the data and returns Graph format.
     */
    app.get('/v2/:sheetid/:gid/graph', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        const sheetID = req.params.sheetid;
        const gID = req.params.gid;
        try {
            let resp;
            if (sheetID === '0' && gID === '0') {
                resp = { data: const_1.PLAYGROUND_CSV };
            }
            else {
                resp = yield axios_1.default.get(`https://docs.google.com/spreadsheets/d/${sheetID}/export?format=csv&gid=${gID}`);
            }
            const { data } = papaparse_1.default.parse(resp.data);
            const asctbData = (0, api_functions_1.makeASCTBData)(data);
            const graphData = (0, graph_functions_1.makeGraphData)(asctbData.data);
            return res.send({
                data: graphData,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                msg: 'Please check the table format or the sheet access',
                code: 500,
            });
        }
    }));
}
exports.setupGoogleSheetRoutes = setupGoogleSheetRoutes;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PLAYGROUND_CSV = void 0;
/* tslint:disable:max-line-length */
exports.PLAYGROUND_CSV = `"Anatomical Strucures, Cell Types and Biomarkers Table  for *Organ Name*",,,,,,,,,,,,,,,,,,,,,,,,,,,
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


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupOntologyLookupRoutes = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = tslib_1.__importDefault(__webpack_require__(7));
const lookup_functions_1 = __webpack_require__(13);
const lookup_model_1 = __webpack_require__(14);
function setupOntologyLookupRoutes(app) {
    /**
     * Given an ontology code (UBERON, FMA, CL, or HGNC), and a numerical ID of a term,
     * call the corresponding external ontology API to fetch data about that term, including
     * label and description.
     */
    app.get('/lookup/:ontology/:id', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const ontologyCode = req.params.ontology.toUpperCase();
        const termId = req.params.id;
        const output = req.query.output;
        switch (ontologyCode) {
            case lookup_model_1.OntologyCode.HGNC: {
                const response = yield axios_1.default.get((0, lookup_functions_1.buildHGNCApiUrl)(termId), {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.status === 200 && response.data) {
                    const firstResult = response.data.response.docs[0];
                    const details = {
                        extraLinks: {
                            'Uniprot Link': (0, lookup_functions_1.buildUniprotLink)(firstResult.uniprot_ids[0]),
                            'Entrez Link': (0, lookup_functions_1.buildEntrezLink)(firstResult.entrez_id),
                        },
                        label: firstResult.symbol,
                        link: (0, lookup_functions_1.buildHGNCLink)(firstResult.hgnc_id),
                        description: firstResult.name ? firstResult.name : '',
                    };
                    res.send(Object.assign(Object.assign({}, (output === 'graph' && { additionalInfo: firstResult })), details));
                }
                else {
                    res.status(response.status).end();
                }
                break;
            }
            case lookup_model_1.OntologyCode.UBERON:
            case lookup_model_1.OntologyCode.CL:
            case lookup_model_1.OntologyCode.LMHA:
            case lookup_model_1.OntologyCode.FMA: {
                const response = yield axios_1.default.get((0, lookup_functions_1.buildASCTApiUrl)(`${ontologyCode}:${termId}`));
                if (response.status === 200 && ((_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a._embedded) === null || _b === void 0 ? void 0 : _b.terms) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                    const firstResult = response.data._embedded.terms[0];
                    const details = {
                        label: firstResult.label,
                        link: firstResult.iri,
                        description: firstResult.annotation.definition ? firstResult.annotation.definition[0] : '',
                    };
                    res.send(Object.assign(Object.assign({}, (output === 'graph' && { additionalInfo: firstResult })), details));
                }
                else {
                    res.status(response.status).end();
                }
            }
        }
    }));
}
exports.setupOntologyLookupRoutes = setupOntologyLookupRoutes;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupOpenApiSpecRoutes = exports.openApiRoute = exports.browserRoute = void 0;
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
exports.browserRoute = browserRoute;
const openApiRoute = (_req, res, _next) => {
    res.sendFile('assets/asctb-api-spec.yaml', {
        root: __dirname,
    });
};
exports.openApiRoute = openApiRoute;
function setupOpenApiSpecRoutes(app) {
    app.get('/', exports.browserRoute);
    app.get('/index.html', exports.browserRoute);
    app.get('/asctb-api-spec.yaml', exports.openApiRoute);
}
exports.setupOpenApiSpecRoutes = setupOpenApiSpecRoutes;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupPlaygroundRoutes = void 0;
const tslib_1 = __webpack_require__(1);
const papaparse_1 = tslib_1.__importDefault(__webpack_require__(9));
const const_1 = __webpack_require__(24);
const api_functions_1 = __webpack_require__(10);
function setupPlaygroundRoutes(app) {
    /**
     * Get the toy CSV data set for the default playground view
     */
    app.get('/v2/playground', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log(`${req.protocol}://${req.headers.host}${req.originalUrl}`);
        try {
            const parsed = papaparse_1.default.parse(const_1.PLAYGROUND_CSV).data;
            const asctbData = (0, api_functions_1.makeASCTBData)(parsed);
            return res.send({
                data: asctbData.data,
                metadata: asctbData.metadata,
                csv: const_1.PLAYGROUND_CSV,
                parsed: parsed,
                warnings: asctbData.warnings,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                msg: JSON.stringify(err),
                code: 500,
            });
        }
    }));
    /**
     * Send updated data to render on the playground after editing the table
     */
    app.post('/v2/playground', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const csv = papaparse_1.default.unparse(req.body);
        try {
            const asctbData = (0, api_functions_1.makeASCTBData)(req.body.data);
            return res.send({
                data: asctbData.data,
                metadata: asctbData.metadata,
                parsed: req.body,
                csv: csv,
                warnings: asctbData.warnings,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                msg: JSON.stringify(err),
                code: 500,
            });
        }
    }));
}
exports.setupPlaygroundRoutes = setupPlaygroundRoutes;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupStaticPageRoutes = void 0;
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
exports.setupStaticPageRoutes = setupStaticPageRoutes;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.routeCache = void 0;
const tslib_1 = __webpack_require__(1);
const memory_cache_1 = tslib_1.__importDefault(__webpack_require__(30));
function routeCache(duration) {
    return (req, res, next) => {
        // query parameters
        const cache = req.query.cache;
        if (cache !== 'true') {
            next();
        }
        else {
            res.set('Content-Type', 'application/json');
            res.set('Cache-control', `public, max-age=${duration}`);
            const key = '__express__' + req.originalUrl || 0;
            const cachedBody = memory_cache_1.default.get(key);
            if (cachedBody) {
                res.send(cachedBody);
            }
            else {
                const sendResponse = res.send;
                res.send = (body) => {
                    memory_cache_1.default.put(key, body, duration * 1000);
                    sendResponse.call(res, body);
                    return body;
                };
                next();
            }
        }
    };
}
exports.routeCache = routeCache;


/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = require("memory-cache");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;