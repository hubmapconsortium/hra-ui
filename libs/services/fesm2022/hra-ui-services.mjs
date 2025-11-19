import { createLinkId } from '@hra-ui/cdk/state';
import * as z from 'zod';
import { HttpClient } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Injectable, InjectionToken, inject, NgModule } from '@angular/core';
import { map, withLatestFrom, switchMap, of, firstValueFrom, from, take, shareReplay, ReplaySubject } from 'rxjs';

/** Any url */
const URL$1 = z.string().url().brand('URL');
/** Same as an URL */
const IRI = URL$1.brand('IRI');
/**
 * Returns url with base href value
 * @param url url
 * @param baseHref base href
 * @returns updated url
 */
function setUrl(url, baseHref) {
    if (url.startsWith('http')) {
        return url;
    }
    else if (baseHref !== '' && !baseHref.endsWith('/')) {
        return `${baseHref}/${url}`;
    }
    return `${baseHref}${url}`;
}

// ---------------------------------------
// Error messages
// ---------------------------------------
/** Error message for non integer counts */
const COUNT_INTEGER_ERROR = 'Count must be an integer';
/** Error message for negative counts */
const COUNT_RANGE_ERROR = 'Count must be greater than or equal to 0';
/** Error message for negative counts */
const PERCENTAGE_RANGE_ERROR = 'Percentage must be between 0 and 1 (inclusive)';
// ---------------------------------------
// Utility schemas
// ---------------------------------------
/** A integer greater than or equal to zero */
const COUNT = z.number().int(COUNT_INTEGER_ERROR).nonnegative(COUNT_RANGE_ERROR);
/** A number between 0 and 1 inclusive */
const PERCENTAGE = z.number().gte(0, PERCENTAGE_RANGE_ERROR).lte(1, PERCENTAGE_RANGE_ERROR);
// ---------------------------------------
// Model schemas
// ---------------------------------------
/** Zod Schema for a tissue object */
const TISSUE = z.object({
    id: IRI,
    label: z.string(),
    parent: IRI,
    children: IRI.array().default([]),
    link: z.string().transform(createLinkId).optional(),
});
/** Zod Schema for a tissue library object */
const TISSUE_LIBRARY = z.object({
    root: IRI,
    nodes: z.record(IRI, TISSUE),
});
/** Zod Schema for a cell object */
const CELL = z.object({
    id: IRI,
    label: z.string(),
});
/** Zod Schema for a BIOMARKER */
const BIOMARKER = z.object({
    id: z.string(),
    label: z.string(),
});
/** Zod Schema for a CELL_SUMMARY_ROW */
const CELL_SUMMARY_ROW = z.object({
    cell: IRI,
    biomarker: z.string(),
    count: COUNT,
    percentage: PERCENTAGE,
    meanExpression: PERCENTAGE,
    dataset_count: COUNT.optional(),
});
/** Zod Schema for a CELL_SUMMARY */
const CELL_SUMMARY = z.object({
    cell_source: IRI,
    biomarker_type: z.string(),
    summary: z
        .object({
        cell_id: IRI,
        cell_label: z.string(),
        genes: z
            .object({
            gene_id: z.string(),
            gene_label: z.string(),
            ensemble_id: z.string(),
            mean_expression: z.number(),
        })
            .array(),
        count: z.number(),
        percentage: z.number(),
        dataset_count: z.number().optional(),
    })
        .array(),
});
/** Zod Schema for a DATA_FILE_REFERENCE */
const DATA_FILE_REFERENCE = z.object({
    format: z.string(),
    url: z.string(),
});
/** Zod Schema for a SOURCE_REFERENCE */
const SOURCE_REFERENCE = z.object({
    id: IRI,
    title: z.string(),
    label: z.string(),
    authors: z.string().array(),
    year: z.number(),
    doi: z.string(),
    link: z.string().url(),
});
/** Zod Schema for a ILLUSTRATION_MAPPING_ITEM */
const ILLUSTRATION_MAPPING_ITEM = z.object({
    id: z.string(),
    groupId: z.string(),
    label: z.string(),
    ontologyId: z.string(),
    source: z.any().transform((value) => value),
});
/** Cell entry zod validator */
const RAW_CELL_ENTRY = z
    .object({
    label: z.string(),
    svg_id: z.string(),
    svg_group_id: z.string(),
    representation_of: z.string(),
})
    .passthrough();
/** Illustration file zod validator */
const RAW_ILLUSTRATION_FILE = z.object({
    file: z.string(),
    file_format: z.string(),
});
/** Illustration zod validator */
const RAW_ILLUSTRATION = z.object({
    '@id': IRI,
    label: z.string(),
    organ_id: z.string(),
    organ_label: z.string(),
    representation_of: z.string(),
    mapping: RAW_CELL_ENTRY.array(),
    illustration_files: RAW_ILLUSTRATION_FILE.array(),
});
/** Illustration graph jsonld zod validator */
const RAW_ILLUSTRATIONS_JSONLD = z.object({
    '@graph': RAW_ILLUSTRATION.array(),
});
/** DATASETS Object reflecting the format in the file*/
const RAW_DATASETS = z.object({
    '@graph': z
        .object({
        '@id': IRI,
        data_sources: z
            .object({
            '@id': IRI,
            label: z.string(),
            description: z.string(),
            authors: z.string().array().optional(),
            year: z.number().optional(),
            doi: z.string().optional(),
            link: z.string(),
        })
            .array(),
    })
        .array(),
});
/** CELL_SUMMARIES zod object reflecting the format in the file*/
const RAW_CELL_SUMMARIES = z.object({
    '@graph': CELL_SUMMARY.array(),
});

var ftuData_model = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BIOMARKER: BIOMARKER,
    CELL: CELL,
    CELL_SUMMARY: CELL_SUMMARY,
    CELL_SUMMARY_ROW: CELL_SUMMARY_ROW,
    DATA_FILE_REFERENCE: DATA_FILE_REFERENCE,
    ILLUSTRATION_MAPPING_ITEM: ILLUSTRATION_MAPPING_ITEM,
    RAW_CELL_ENTRY: RAW_CELL_ENTRY,
    RAW_CELL_SUMMARIES: RAW_CELL_SUMMARIES,
    RAW_DATASETS: RAW_DATASETS,
    RAW_ILLUSTRATION: RAW_ILLUSTRATION,
    RAW_ILLUSTRATIONS_JSONLD: RAW_ILLUSTRATIONS_JSONLD,
    RAW_ILLUSTRATION_FILE: RAW_ILLUSTRATION_FILE,
    SOURCE_REFERENCE: SOURCE_REFERENCE,
    TISSUE: TISSUE,
    TISSUE_LIBRARY: TISSUE_LIBRARY
});

/** Service for loading all data related to a single ftu */
class FtuDataService {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FtuDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FtuDataService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FtuDataService, decorators: [{
            type: Injectable
        }] });

/** Constant  to read the endpoints */
const FTU_DATA_IMPL_ENDPOINTS = new InjectionToken('Endpoints');
/** Input to different file formats supported */
const FTU_DATA_IMPL_FILE_FORMAT_MAPPING = new InjectionToken('Mapping of file formats', {
    providedIn: 'root',
    factory: () => ({
        'image/svg+xml': 'svg',
        'image/png': 'png',
        'application/pdf': 'ai',
    }),
});
/** Creates clickable link for the tissue tree element */
const TISSUE_LINK = createLinkId('FTU');
/** Provides Base/root url for the tissue tree */
const BASE_IRI = 'https://purl.humanatlas.io/2d-ftu/';
/** Default empty tissue library object */
const EMPTY_TISSUE_LIBRARY = {
    root: '',
    nodes: {},
};
/** Converts case to title case for organ name */
function titleCase(name) {
    return name
        .split(' ')
        .map((l) => l[0].toUpperCase() + l.slice(1))
        .join(' ');
}
/**
 * FtuDataImplService - Angular service for handling FTU (Functional Tissue Unit) data operations.
 */
class FtuDataImplService extends FtuDataService {
    /** Setup cache invalidation triggers */
    constructor() {
        super();
        /** http client to read files */
        this.http = inject(HttpClient);
        /** Endpoints injector to the service */
        this.endpoints = inject(FTU_DATA_IMPL_ENDPOINTS);
        /** Endpoint injection for file formats */
        this.fileFormatMapping = inject(FTU_DATA_IMPL_FILE_FORMAT_MAPPING);
        /** Stores the last retrived data for tissue */
        this.cache = new Map();
        this.endpoints.subscribe(() => this.cache.clear());
    }
    /**
    Overrides the getTissueLibrary method to return a data for the tissue Library tree.
    @returns An Observable that emits the tissue Tree data.
    */
    getTissueLibrary() {
        return this.fetchData(undefined, 'illustrations', RAW_ILLUSTRATIONS_JSONLD).pipe(map((data) => (data ? this.constructTissueLibrary(data['@graph']) : EMPTY_TISSUE_LIBRARY)));
    }
    /**
    Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
    @param iri The Iri of the illustration.
    @returns An Observable that emits the mock URL.
    */
    getIllustrationUrl(iri) {
        return this.getDataFileReferences(iri)
            .pipe(map((data) => this.findIllustrationUrl(data)))
            .pipe(withLatestFrom(this.endpoints), map(([url, { baseHref }]) => url && setUrl(url, baseHref)));
    }
    /**
    Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an IllustrationMappingItem array.
    */
    getIllustrationMapping(iri) {
        return this.fetchData(iri, 'illustrations', RAW_ILLUSTRATIONS_JSONLD).pipe(map((data) => data && this.findGraphItem(data, iri).mapping), map((data) => (data ? this.toIllustrationMapping(data) : [])));
    }
    /**
    Overrides the getCellSummaries method to return an CellSummary array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an CellSummary array.
    */
    getCellSummaries(iri) {
        return this.fetchData(iri, 'summaries', RAW_CELL_SUMMARIES).pipe(map((data) => data?.['@graph'] ?? []));
    }
    /**
    Overrides the getDataFileReferences method to return an DataFileReference array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an DataFileReference array.
    */
    getDataFileReferences(iri) {
        return this.fetchData(iri, 'illustrations', RAW_ILLUSTRATIONS_JSONLD).pipe(map((data) => data && this.findGraphItem(data, iri).illustration_files), map((data) => (data ? this.toDataFileReferences(data) : [])));
    }
    /**
    Overrides the getSourceReferences method to return an empty array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an empty array.
    */
    getSourceReferences(iri) {
        return this.fetchData(iri, 'datasets', RAW_DATASETS).pipe(map((data) => data && this.findGraphItem(data, iri).data_sources), map((data) => (data ? this.toSourceReferences(data) : [])));
    }
    /**
     * Fetchs data after reading the file and parses with the requested schema
     * @template T : Schema to be formated
     * @param iri : Tissue iri
     * @param endpoint : Endpoint name
     * @param schema :  Format needed to be extracted
     * @returns data
     */
    fetchData(iri, endpoint, schema) {
        return this.endpoints.pipe(switchMap((endpoints) => {
            const source = endpoints[endpoint];
            if (typeof source === 'object') {
                return of(schema.parse(source));
            }
            else if (source === '') {
                return of(undefined);
            }
            const url = setUrl(source, endpoints.baseHref);
            const { http, cachedIri, cache } = this;
            if (iri !== undefined && iri !== cachedIri) {
                this.cachedIri = iri;
                this.cache.clear();
            }
            if (!cache.has(url)) {
                const opts = { params: { id: iri ?? '' }, responseType: 'json' };
                const resp = http.get(url, opts).pipe(map((data) => schema.parse(data)));
                cache.set(url, firstValueFrom(resp));
            }
            return from(cache.get(url));
        }), take(1), shareReplay(1));
    }
    /**
     * Finds object inside the @graph tag for the requested id element
     * @template T
     * @param data
     * @param iri
     * @returns graph item
     */
    findGraphItem(data, iri) {
        const item = data['@graph'].find(({ '@id': id }) => id === iri);
        if (item === undefined) {
            return {};
        }
        return item;
    }
    /**
     * Finds illustration url and formates it to Url
     * @param files
     * @returns illustration url
     */
    findIllustrationUrl(files) {
        const { fileFormatMapping } = this;
        const svgFormat = fileFormatMapping['image/svg+xml'];
        const ref = files.find(({ format }) => format === svgFormat);
        return ref?.url;
    }
    /**
     * To illustration mapping for each tissue open
     * @param mappings
     * @returns illustration mapping
     */
    toIllustrationMapping(mappings) {
        const results = [];
        for (const source of mappings) {
            const { label, svg_id, svg_group_id, representation_of } = source;
            results.push({
                label,
                id: svg_id,
                groupId: svg_group_id,
                ontologyId: representation_of,
                source,
            });
        }
        return results;
    }
    /**
     * Formates data to array of DataFileReference format
     * @param data
     * @returns data file references
     */
    toDataFileReferences(data) {
        const { fileFormatMapping: formats } = this;
        const results = [];
        for (const { file, file_format } of data) {
            if (file_format in formats) {
                results.push({ format: formats[file_format], url: file });
            }
        }
        return results;
    }
    /**
     * Formats data from 'dataSources' to 'SourceReferences'[] format
     * @param data
     * @returns source references
     */
    toSourceReferences(data) {
        const results = [];
        for (const { '@id': id, label, link, description, authors = [], year = -1, doi = '' } of data) {
            results.push({ id, label, link, title: description, authors, year, doi });
        }
        return results;
    }
    /**
     * Constructs tissue library ,forming parent and child nodes
     * @param items
     * @returns
     */
    constructTissueLibrary(items) {
        const nodes = {};
        for (const { '@id': id, label, organ_id, organ_label } of items) {
            const parentId = (BASE_IRI + organ_id);
            nodes[parentId] ??= { id: parentId, label: titleCase(organ_label), parent: BASE_IRI, children: [] };
            nodes[id] = { id, label: label, parent: parentId, children: [], link: TISSUE_LINK };
            nodes[parentId]?.children.push(id);
        }
        return { root: BASE_IRI, nodes };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FtuDataImplService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FtuDataImplService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FtuDataImplService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/** Create a new id from a label */
function createNodeId(label, parent) {
    return `${parent}${label.replace(/ /g, '_')}/`;
}
/** Create a new node */
function defineNode(label, parent, url, ...children) {
    const id = createNodeId(label, parent);
    const childNodes = children.reduce((acc, [childLabel, childUrl]) => ({
        ...acc,
        ...defineNode(childLabel, id, childUrl),
    }), {});
    const node = {
        '@type': '',
        '@id': id,
        id,
        parent,
        label,
        synonymLabels: [],
        link: url && createLinkId('FTU'),
        representation_of: id,
        object: {
            file: url,
        },
        children: Object.keys(childNodes),
    };
    return { [id]: node, ...childNodes };
}
/** Base node id */
const BASE_ID = 'https://purl.humanatlas.io/2d-ftu/';
/** Mock tissue data */
const MOCK_TISSUE_DATA = {
    root: BASE_ID,
    nodes: Object.assign({}, defineNode('Kidney', BASE_ID, undefined, [
        'Descending Thin Loop of Henle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-descending-thin-loop-of-henle.svg',
    ], [
        'Renal Corpuscle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-renal-corpuscle.svg',
    ], [
        'Ascending Thin Loop of Henle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg',
    ], [
        'Cortical Collecting Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-cortical-collecting-duct.svg',
    ], [
        'Inner Medullary Collecting Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-inner-medullary-collecting-duct.svg',
    ], ['Nephron', 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-nephron.svg'], [
        'Outer Medullary Collectiong Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-outer-medullary-collecting-duct.svg',
    ], [
        'Thick Ascending Loop of Henle',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-thick-ascending-loop-of-henle.svg',
    ]), defineNode('Lung', BASE_ID, undefined, [
        'Pulmonary Alveolus',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-pulmonary-alveolus.svg',
    ], [
        'Bronchial Submucosal Gland',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-lung-bronchial-submucosal-gland.svg',
    ]), defineNode('Large Intestine', BASE_ID, undefined, [
        'Crypt Lieberkuhn',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-large-intestine-crypt-lieberkuhn.svg',
    ]), defineNode('Pancreas', BASE_ID, undefined, [
        'Islates Langerhans',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-islets-langerhans.svg',
    ], [
        'Intercalated Duct',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-intercalated-duct.svg',
    ], [
        'Pancreatic Acinus',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-pancreas-pancreatic-acinus.svg',
    ]), defineNode('Skin', BASE_ID, undefined, ['Dermal Papilla', 'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-dermal-papilla.svg'], [
        'Epidermal Ridge',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-skin-epidermal-ridge.svg',
    ]), defineNode('Liver', BASE_ID, undefined, [
        'Liver Lobule',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-liver-liver-lobule.svg',
    ]), defineNode('Prostate', BASE_ID, undefined, [
        'Prostate Glandular Acinus',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-prostate-prostate-glandular-acinus.svg',
    ]), defineNode('Thymus', BASE_ID, undefined, [
        'Thymus Lobule',
        'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-thymus-thymus-lobule.svg',
    ])),
};
/** Helper for creating summary data */
function createCell(cid, clabel, bid, blabel, count, percentage, meanExpression, metadata = []) {
    return {
        cell: {
            id: cid,
            label: clabel,
        },
        biomarker: {
            id: bid,
            label: blabel,
        },
        count,
        percentage,
        meanExpression,
        metadata,
    };
}
/** Mock summary data */
const MOCK_SUMMARIES = {
    summary1: {
        label: 'Summary 1',
        cellSource: '',
        entries: [
            createCell('cell1', 'Cell 1', 'biomarker1', 'Biomarker 1', 10, 1.0, 1.0, [
                [
                    { label: 'metadata 1', value: 'value of data' },
                    { label: 'metadata 2', value: 'value of data' },
                ],
                [{ label: 'metadata 3', value: 'value of data' }],
            ]),
            createCell('cell2', 'Cell 2', 'biomarker1', 'Biomarker 1', 5, 0.2, 0.3),
            createCell('cell2', 'Cell 2', 'biomarker2', 'Biomarker 2', 5, 0.2, 0.3),
            createCell('cell1', 'Cell 1', 'biomarker3', 'Biomarker 3', 15, 0.2, 0.3),
            createCell('cell3', 'Cell 3', 'biomarker1', 'Biomarker 1', 11, 0.3, 0.5),
            createCell('cell3', 'Cell 3', 'biomarker3', 'Biomarker 3', 11, 0.1, 0.3),
            createCell('cell4', 'Cell 4', 'biomarker1', 'Biomarker 1', 2000, 0.1, 1.0),
            createCell('cell5', 'Cell 5', 'biomarker1', 'Biomarker 1', 332, 0.4, 0.3),
            createCell('cell6', 'Cell 6', 'biomarker3', 'Biomarker 3', 101, 0.2, 0.1),
            createCell('cell7', 'Cell 7', 'biomarker1', 'Biomarker 1', 2, 0.5, 0.3),
            createCell('cell7', 'Cell 7', 'biomarker2', 'Biomarker 2', 230, 0.4, 0.3),
            createCell('cell7', 'Cell 7', 'biomarker3', 'Biomarker 3', 601, 0.7, 0.3),
            createCell('cell8', 'Cell 8', 'biomarker1', 'Biomarker 1', 124, 0.5, 0.5),
            createCell('cell8', 'Cell 8', 'biomarker2', 'Biomarker 2', 244, 0.3, 0.3),
            createCell('cell9', 'Cell 9', 'biomarker1', 'Biomarker 1', 21, 0.4, 0.3),
            createCell('cell10', 'Cell 10', 'biomarker2', 'Biomarker 2', 675, 0.5, 0.3),
            createCell('cell11', 'Cell 11', 'biomarker3', 'Biomarker 3', 57, 0.3, 0.3),
            createCell('cell12', 'Cell 12', 'biomarker2', 'Biomarker 2', 45, 0.1, 0.7),
            createCell('cell13', 'Cell 13', 'biomarker4', 'Biomarker 4', 45, 0.1, 0.3),
            createCell('cell13', 'Cell 13', 'biomarker5', 'Biomarker 5', 45, 0.1, 0.3),
            createCell('cell13', 'Cell 13', 'biomarker6', 'Biomarker 6', 45, 0.1, 0.4),
            createCell('cell13', 'Cell 13', 'biomarker7', 'Biomarker 7', 45, 0.1, 0.3),
            createCell('cell13', 'Cell 13', 'biomarker8', 'Biomarker 8', 45, 0.1, 0.9),
        ],
    },
    summary2: {
        label: 'Summary 2',
        cellSource: '',
        entries: [createCell('cell1', 'Cell 1', 'biomarker2', 'Biomarker 2', 20, 1, 0.9)],
    },
    summary3: {
        label: 'Summary 3',
        cellSource: '',
        entries: [],
    },
};
/**
 * Dummy data for Source References
 */
const sourceReferences = [
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: 'Kidney Precision Medicine Project',
        label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: '[Dataset Owner Title]',
        label: '<Dataset Title + Link to Dataset>',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: '[Dataset Owner Title]',
        label: '<Dataset Title + Link to Dataset>',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
        label: '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: 'Kidney Precision Medicine Project',
        label: 'Ancillary Study Data, Clinical Data, HRT Codebook',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: '[Dataset Owner Title]',
        label: '<Dataset Title + Link to Dataset>',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: '[Dataset Owner Title]',
        label: '<Dataset Title + Link to Dataset>',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
    {
        id: 'https://cns-iu.github.io/hra-cell-type-populations-supporting-information/data/enriched_rui_locations.jsonld#36e76662-60b8-4193-8a70-1bfd4f6938d0_D088_Lung',
        title: '[Dataset Owner Title but extremely long and wraps around to the next line as you can see here in this example]',
        label: '<Extremely long dataset title that wraps around to the next line as you can see in this example + link to dataset>',
        link: 'google.com',
        authors: [],
        year: -1,
        doi: '',
    },
];
/**
 * Dummy data extract om Mock Data of tissue mock
 */
const CELL_SUMMARY_DATA = [];
/**
This class represents a mock implementation of the FtuDataService class.
It overrides the methods from the parent class to provide mock data for testing purposes.
*/
class MockFtuDataService extends FtuDataService {
    /**
     * Overrides the getTissueLibrary method to return a mock data for the tissue tree
     * @returns tissue library
     */
    getTissueLibrary() {
        return of();
    }
    /**
    Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
    @param iri The Iri of the illustration.
    @returns An Observable that emits the mock URL.
    */
    getIllustrationUrl(iri) {
        return of(MOCK_TISSUE_DATA.nodes[iri].object.file);
    }
    /**
    Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an IllustrationMappingItem array.
    */
    getIllustrationMapping() {
        return of([]);
    }
    /**
    Overrides the getCellSummaries method to return an CellSummary array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an CellSummary array.
    */
    getCellSummaries() {
        return of(CELL_SUMMARY_DATA);
    }
    /**
    Overrides the getDataFileReferences method to return an DataFileReference array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an DataFileReference array.
    */
    getDataFileReferences(iri) {
        return of([
            {
                format: 'svg',
                url: MOCK_TISSUE_DATA.nodes[iri].object.file,
            },
        ]);
    }
    /**
    Overrides the getSourceReferences method to return an empty array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an empty array.
    */
    getSourceReferences() {
        return of(sourceReferences);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MockFtuDataService, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MockFtuDataService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: MockFtuDataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class HraServiceModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HraServiceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.12", ngImport: i0, type: HraServiceModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HraServiceModule, providers: [
            {
                provide: FtuDataService,
                useExisting: FtuDataImplService,
            },
            {
                provide: FTU_DATA_IMPL_ENDPOINTS,
                useValue: new ReplaySubject(1),
            },
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HraServiceModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: FtuDataService,
                            useExisting: FtuDataImplService,
                        },
                        {
                            provide: FTU_DATA_IMPL_ENDPOINTS,
                            useValue: new ReplaySubject(1),
                        },
                    ],
                }]
        }] });

/**
 * Tries to parse a value as json. Returns the original value if it could not be parsed.
 *
 * @param value Value to parse
 * @returns Parsed json value or the original value
 */
function tryParseJson(value) {
    try {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
    }
    catch {
        // Ignore errors
    }
    return value;
}
/**
 * Tests whether a value is path like
 *
 * @param value Value to test
 * @returns True if the value is path like
 */
function isPath(value) {
    try {
        if (typeof value === 'string') {
            new URL(value, 'https://base.url/');
            return true;
        }
    }
    catch {
        // Ignore errors
    }
    return false;
}
/**
 * Creates a zod schema for validating input values that accepts either an url,
 * a path, javascript object, or a json encoded string of such an object.
 *
 * @param schema Input object schema
 * @returns A zod type for validating input values
 */
function createInputValidation(schema) {
    return z.preprocess(tryParseJson, z.union([
        z.string().url().optional(),
        z.literal(''),
        z.custom((value) => (isPath(value) ? value : false), 'Invalid path'),
        schema,
    ]));
}
/**
 * Parses a value using the provided schema. Throws an error on parsing failure.
 *
 * @param schema Schema to use for parsing
 * @param value Value to parse
 * @returns The parsed value
 */
function parseInput(schema, value) {
    const result = schema.safeParse(value);
    if (result.success) {
        return result.data;
    }
    throw new TypeError(`Invalid input. Expected an url, a path, or a json encoded ${schema.description} object. Received: ${value}`);
}
/** Selected illustration input schema */
const SELECTED_ILLUSTRATION_INPUT = createInputValidation(RAW_ILLUSTRATION).describe('illustration');
/**
 * Parses selected illustration input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
function selectedIllustrationInput(value) {
    return parseInput(SELECTED_ILLUSTRATION_INPUT, value);
}
/** Illustrations input schema */
const ILLUSTRATIONS_INPUT = createInputValidation(RAW_ILLUSTRATIONS_JSONLD).describe('illustrations');
/**
 * Parses illustrations input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
function illustrationsInput(value) {
    return parseInput(ILLUSTRATIONS_INPUT, value);
}
/** Cell summaries input schema */
const RAW_CELL_SUMMARIES_INPUT = createInputValidation(RAW_CELL_SUMMARIES).describe('cell summaries');
/**
 * Parses cell summaries input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
function rawCellSummariesInput(value) {
    return parseInput(RAW_CELL_SUMMARIES_INPUT, value);
}
/** Datasets input schema */
const RAW_DATASETS_INPUT = createInputValidation(RAW_DATASETS).describe('datasets');
/**
 * Parses datasets input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
function rawDatasetsInput(value) {
    return parseInput(RAW_DATASETS_INPUT, value);
}

/**
 * Generated bundle index. Do not edit.
 */

export { BIOMARKER, CELL, CELL_SUMMARY, CELL_SUMMARY_ROW, DATA_FILE_REFERENCE, FTU_DATA_IMPL_ENDPOINTS, FTU_DATA_IMPL_FILE_FORMAT_MAPPING, FtuDataImplService, ftuData_model as FtuDataSchemas, FtuDataService, HraServiceModule, ILLUSTRATIONS_INPUT, ILLUSTRATION_MAPPING_ITEM, IRI, MOCK_SUMMARIES, MOCK_TISSUE_DATA, MockFtuDataService, RAW_CELL_ENTRY, RAW_CELL_SUMMARIES, RAW_CELL_SUMMARIES_INPUT, RAW_DATASETS, RAW_DATASETS_INPUT, RAW_ILLUSTRATION, RAW_ILLUSTRATIONS_JSONLD, RAW_ILLUSTRATION_FILE, SELECTED_ILLUSTRATION_INPUT, SOURCE_REFERENCE, TISSUE, TISSUE_LIBRARY, URL$1 as URL, illustrationsInput, rawCellSummariesInput, rawDatasetsInput, selectedIllustrationInput, setUrl, tryParseJson };
//# sourceMappingURL=hra-ui-services.mjs.map
