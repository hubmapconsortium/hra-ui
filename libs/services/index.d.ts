import * as z from 'zod';
import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/** Zod Schema for a tissue object */
declare const TISSUE: z.ZodObject<{
    id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    label: z.ZodString;
    parent: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    children: z.ZodDefault<z.ZodArray<z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">>>;
    link: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string & z.core.$brand<"LinkId">, string>>>;
}, z.core.$strip>;
/** Zod Schema for a tissue library object */
declare const TISSUE_LIBRARY: z.ZodObject<{
    root: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    nodes: z.ZodRecord<z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">, z.ZodObject<{
        id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        label: z.ZodString;
        parent: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        children: z.ZodDefault<z.ZodArray<z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">>>;
        link: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string & z.core.$brand<"LinkId">, string>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Zod Schema for a cell object */
declare const CELL: z.ZodObject<{
    id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    label: z.ZodString;
}, z.core.$strip>;
/** Zod Schema for a BIOMARKER */
declare const BIOMARKER: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
}, z.core.$strip>;
/** Zod Schema for a CELL_SUMMARY_ROW */
declare const CELL_SUMMARY_ROW: z.ZodObject<{
    cell: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    biomarker: z.ZodString;
    count: z.ZodNumber;
    percentage: z.ZodNumber;
    meanExpression: z.ZodNumber;
    dataset_count: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/** Zod Schema for a CELL_SUMMARY */
declare const CELL_SUMMARY: z.ZodObject<{
    cell_source: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    biomarker_type: z.ZodString;
    summary: z.ZodArray<z.ZodObject<{
        cell_id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        cell_label: z.ZodString;
        genes: z.ZodArray<z.ZodObject<{
            gene_id: z.ZodString;
            gene_label: z.ZodString;
            ensemble_id: z.ZodString;
            mean_expression: z.ZodNumber;
        }, z.core.$strip>>;
        count: z.ZodNumber;
        percentage: z.ZodNumber;
        dataset_count: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Zod Schema for a DATA_FILE_REFERENCE */
declare const DATA_FILE_REFERENCE: z.ZodObject<{
    format: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
/** Zod Schema for a SOURCE_REFERENCE */
declare const SOURCE_REFERENCE: z.ZodObject<{
    id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    title: z.ZodString;
    label: z.ZodString;
    authors: z.ZodArray<z.ZodString>;
    year: z.ZodNumber;
    doi: z.ZodString;
    link: z.ZodString;
}, z.core.$strip>;
/** Zod Schema for a ILLUSTRATION_MAPPING_ITEM */
declare const ILLUSTRATION_MAPPING_ITEM: z.ZodObject<{
    id: z.ZodString;
    groupId: z.ZodString;
    label: z.ZodString;
    ontologyId: z.ZodString;
    source: z.ZodPipe<z.ZodAny, z.ZodTransform<{
        [x: string]: unknown;
        label: string;
        svg_id: string;
        svg_group_id: string;
        representation_of: string;
    }, any>>;
}, z.core.$strip>;
/** Cell entry zod validator */
declare const RAW_CELL_ENTRY: z.ZodObject<{
    label: z.ZodString;
    svg_id: z.ZodString;
    svg_group_id: z.ZodString;
    representation_of: z.ZodString;
}, z.core.$loose>;
/** Illustration file zod validator */
declare const RAW_ILLUSTRATION_FILE: z.ZodObject<{
    file: z.ZodString;
    file_format: z.ZodString;
}, z.core.$strip>;
/** Illustration zod validator */
declare const RAW_ILLUSTRATION: z.ZodObject<{
    '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    label: z.ZodString;
    organ_id: z.ZodString;
    organ_label: z.ZodString;
    representation_of: z.ZodString;
    mapping: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        svg_id: z.ZodString;
        svg_group_id: z.ZodString;
        representation_of: z.ZodString;
    }, z.core.$loose>>;
    illustration_files: z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        file_format: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Illustration graph jsonld zod validator */
declare const RAW_ILLUSTRATIONS_JSONLD: z.ZodObject<{
    '@graph': z.ZodArray<z.ZodObject<{
        '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        label: z.ZodString;
        organ_id: z.ZodString;
        organ_label: z.ZodString;
        representation_of: z.ZodString;
        mapping: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            svg_id: z.ZodString;
            svg_group_id: z.ZodString;
            representation_of: z.ZodString;
        }, z.core.$loose>>;
        illustration_files: z.ZodArray<z.ZodObject<{
            file: z.ZodString;
            file_format: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** DATASETS Object reflecting the format in the file*/
declare const RAW_DATASETS: z.ZodObject<{
    '@graph': z.ZodArray<z.ZodObject<{
        '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        data_sources: z.ZodArray<z.ZodObject<{
            '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
            label: z.ZodString;
            description: z.ZodString;
            authors: z.ZodOptional<z.ZodArray<z.ZodString>>;
            year: z.ZodOptional<z.ZodNumber>;
            doi: z.ZodOptional<z.ZodString>;
            link: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** CELL_SUMMARIES zod object reflecting the format in the file*/
declare const RAW_CELL_SUMMARIES: z.ZodObject<{
    '@graph': z.ZodArray<z.ZodObject<{
        cell_source: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        biomarker_type: z.ZodString;
        summary: z.ZodArray<z.ZodObject<{
            cell_id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
            cell_label: z.ZodString;
            genes: z.ZodArray<z.ZodObject<{
                gene_id: z.ZodString;
                gene_label: z.ZodString;
                ensemble_id: z.ZodString;
                mean_expression: z.ZodNumber;
            }, z.core.$strip>>;
            count: z.ZodNumber;
            percentage: z.ZodNumber;
            dataset_count: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** Type for Tissue */
type Tissue = z.infer<typeof TISSUE>;
/** Type for Tissue */
type TissueLibrary = z.infer<typeof TISSUE_LIBRARY>;
/** Type for a cell */
type Cell = z.infer<typeof CELL>;
/** Type for a Biomarker */
type Biomarker = z.infer<typeof BIOMARKER>;
/** Type for a CellSummaryRow */
type CellSummaryRow = z.infer<typeof CELL_SUMMARY_ROW>;
/** Type for a CellSummary */
type CellSummary = z.infer<typeof CELL_SUMMARY>;
/** Type for a DataFileReference */
type DataFileReference = z.infer<typeof DATA_FILE_REFERENCE>;
/** Type for a SourceReference */
type SourceReference = z.infer<typeof SOURCE_REFERENCE>;
/** Type for a IllustrationMappingItem */
type IllustrationMappingItem = z.infer<typeof ILLUSTRATION_MAPPING_ITEM>;
/** Single cell entry in an illustration */
type RawCellEntry = z.infer<typeof RAW_CELL_ENTRY>;
/** Illustration file information */
type RawIllustrationFile = z.infer<typeof RAW_ILLUSTRATION_FILE>;
/** Illustration data object */
type RawIllustration = z.infer<typeof RAW_ILLUSTRATION>;
/** Collection of illustrations as jsonld */
type RawIllustrationsJsonld = z.infer<typeof RAW_ILLUSTRATIONS_JSONLD>;
/** Collection of datasets */
type RawDatasets = z.infer<typeof RAW_DATASETS>;
/** Raw cell summary */
type RawCellSummary = z.infer<typeof RAW_CELL_SUMMARIES>;

declare const ftuData_model_d_BIOMARKER: typeof BIOMARKER;
type ftuData_model_d_Biomarker = Biomarker;
declare const ftuData_model_d_CELL: typeof CELL;
declare const ftuData_model_d_CELL_SUMMARY: typeof CELL_SUMMARY;
declare const ftuData_model_d_CELL_SUMMARY_ROW: typeof CELL_SUMMARY_ROW;
type ftuData_model_d_Cell = Cell;
type ftuData_model_d_CellSummary = CellSummary;
type ftuData_model_d_CellSummaryRow = CellSummaryRow;
declare const ftuData_model_d_DATA_FILE_REFERENCE: typeof DATA_FILE_REFERENCE;
type ftuData_model_d_DataFileReference = DataFileReference;
declare const ftuData_model_d_ILLUSTRATION_MAPPING_ITEM: typeof ILLUSTRATION_MAPPING_ITEM;
type ftuData_model_d_IllustrationMappingItem = IllustrationMappingItem;
declare const ftuData_model_d_RAW_CELL_ENTRY: typeof RAW_CELL_ENTRY;
declare const ftuData_model_d_RAW_CELL_SUMMARIES: typeof RAW_CELL_SUMMARIES;
declare const ftuData_model_d_RAW_DATASETS: typeof RAW_DATASETS;
declare const ftuData_model_d_RAW_ILLUSTRATION: typeof RAW_ILLUSTRATION;
declare const ftuData_model_d_RAW_ILLUSTRATIONS_JSONLD: typeof RAW_ILLUSTRATIONS_JSONLD;
declare const ftuData_model_d_RAW_ILLUSTRATION_FILE: typeof RAW_ILLUSTRATION_FILE;
type ftuData_model_d_RawCellEntry = RawCellEntry;
type ftuData_model_d_RawCellSummary = RawCellSummary;
type ftuData_model_d_RawDatasets = RawDatasets;
type ftuData_model_d_RawIllustration = RawIllustration;
type ftuData_model_d_RawIllustrationFile = RawIllustrationFile;
type ftuData_model_d_RawIllustrationsJsonld = RawIllustrationsJsonld;
declare const ftuData_model_d_SOURCE_REFERENCE: typeof SOURCE_REFERENCE;
type ftuData_model_d_SourceReference = SourceReference;
declare const ftuData_model_d_TISSUE: typeof TISSUE;
declare const ftuData_model_d_TISSUE_LIBRARY: typeof TISSUE_LIBRARY;
type ftuData_model_d_Tissue = Tissue;
type ftuData_model_d_TissueLibrary = TissueLibrary;
declare namespace ftuData_model_d {
  export { ftuData_model_d_BIOMARKER as BIOMARKER, ftuData_model_d_CELL as CELL, ftuData_model_d_CELL_SUMMARY as CELL_SUMMARY, ftuData_model_d_CELL_SUMMARY_ROW as CELL_SUMMARY_ROW, ftuData_model_d_DATA_FILE_REFERENCE as DATA_FILE_REFERENCE, ftuData_model_d_ILLUSTRATION_MAPPING_ITEM as ILLUSTRATION_MAPPING_ITEM, ftuData_model_d_RAW_CELL_ENTRY as RAW_CELL_ENTRY, ftuData_model_d_RAW_CELL_SUMMARIES as RAW_CELL_SUMMARIES, ftuData_model_d_RAW_DATASETS as RAW_DATASETS, ftuData_model_d_RAW_ILLUSTRATION as RAW_ILLUSTRATION, ftuData_model_d_RAW_ILLUSTRATIONS_JSONLD as RAW_ILLUSTRATIONS_JSONLD, ftuData_model_d_RAW_ILLUSTRATION_FILE as RAW_ILLUSTRATION_FILE, ftuData_model_d_SOURCE_REFERENCE as SOURCE_REFERENCE, ftuData_model_d_TISSUE as TISSUE, ftuData_model_d_TISSUE_LIBRARY as TISSUE_LIBRARY };
  export type { ftuData_model_d_Biomarker as Biomarker, ftuData_model_d_Cell as Cell, ftuData_model_d_CellSummary as CellSummary, ftuData_model_d_CellSummaryRow as CellSummaryRow, ftuData_model_d_DataFileReference as DataFileReference, ftuData_model_d_IllustrationMappingItem as IllustrationMappingItem, ftuData_model_d_RawCellEntry as RawCellEntry, ftuData_model_d_RawCellSummary as RawCellSummary, ftuData_model_d_RawDatasets as RawDatasets, ftuData_model_d_RawIllustration as RawIllustration, ftuData_model_d_RawIllustrationFile as RawIllustrationFile, ftuData_model_d_RawIllustrationsJsonld as RawIllustrationsJsonld, ftuData_model_d_SourceReference as SourceReference, ftuData_model_d_Tissue as Tissue, ftuData_model_d_TissueLibrary as TissueLibrary };
}

/** Any url */
declare const URL: z.core.$ZodBranded<z.ZodString, "URL">;
/** Same as an URL */
declare const IRI: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
/** Any url */
type Url = z.infer<typeof URL>;
/** Same as an Url */
type Iri = z.infer<typeof IRI>;
/**
 * Returns url with base href value
 * @param url url
 * @param baseHref base href
 * @returns updated url
 */
declare function setUrl(url: string, baseHref: string): Url;

/** Service for loading all data related to a single ftu */
declare abstract class FtuDataService {
    /**
     * Gets tissue library
     * @returns tissue library
     */
    abstract getTissueLibrary(): Observable<TissueLibrary>;
    /**
     * This method takes
     * @param iri and @returns an observable url
     */
    abstract getIllustrationUrl(iri: Iri): Observable<Url | undefined>;
    /**
     * This method takes
     * @param iri and @returns observable of IllustrationMappingItem
     */
    abstract getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]>;
    /**
     * Gets the
     * @param iri and
     * @returns observable of cell summaries
     */
    abstract getCellSummaries(iri: Iri): Observable<CellSummary[]>;
    /**
     * Gets the
     * @param iri
     * @returns obeservable of data file references
     */
    abstract getDataFileReferences(iri: Iri): Observable<DataFileReference[]>;
    /**
     * Gets the
     * @param iri
     * @returns obeservable of source references
     */
    abstract getSourceReferences(iri: Iri): Observable<SourceReference[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FtuDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FtuDataService>;
}

/** Endpoints for Injecting input path */
interface FtuDataImplEndpoints {
    /** Endpoint for baseHref */
    baseHref: string;
    /** Endpoint for File having Cell illustrations data */
    illustrations: string | object;
    /** Endpoint for File having Cell Summaries data */
    summaries: string | object;
    /** Endpoint for File having Cell Source References data */
    datasets: string | object;
}
/** Constant  to read the endpoints */
declare const FTU_DATA_IMPL_ENDPOINTS: InjectionToken<Observable<FtuDataImplEndpoints>>;
/** Input to different file formats supported */
declare const FTU_DATA_IMPL_FILE_FORMAT_MAPPING: InjectionToken<Record<string, string>>;
/**
 * FtuDataImplService - Angular service for handling FTU (Functional Tissue Unit) data operations.
 */
declare class FtuDataImplService extends FtuDataService {
    /** http client to read files */
    private readonly http;
    /** Endpoints injector to the service */
    private readonly endpoints;
    /** Endpoint injection for file formats */
    private readonly fileFormatMapping;
    /** Stores the last retrived Tissue Iri */
    private cachedIri?;
    /** Stores the last retrived data for tissue */
    private readonly cache;
    /** Setup cache invalidation triggers */
    constructor();
    /**
    Overrides the getTissueLibrary method to return a data for the tissue Library tree.
    @returns An Observable that emits the tissue Tree data.
    */
    getTissueLibrary(): Observable<TissueLibrary>;
    /**
    Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
    @param iri The Iri of the illustration.
    @returns An Observable that emits the mock URL.
    */
    getIllustrationUrl(iri: Iri): Observable<Url | undefined>;
    /**
    Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an IllustrationMappingItem array.
    */
    getIllustrationMapping(iri: Iri): Observable<IllustrationMappingItem[]>;
    /**
    Overrides the getCellSummaries method to return an CellSummary array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an CellSummary array.
    */
    getCellSummaries(iri: Iri): Observable<CellSummary[]>;
    /**
    Overrides the getDataFileReferences method to return an DataFileReference array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an DataFileReference array.
    */
    getDataFileReferences(iri: Iri): Observable<DataFileReference[]>;
    /**
    Overrides the getSourceReferences method to return an empty array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an empty array.
    */
    getSourceReferences(iri: Iri): Observable<SourceReference[]>;
    /**
     * Fetchs data after reading the file and parses with the requested schema
     * @template T : Schema to be formated
     * @param iri : Tissue iri
     * @param endpoint : Endpoint name
     * @param schema :  Format needed to be extracted
     * @returns data
     */
    private fetchData;
    /**
     * Finds object inside the @graph tag for the requested id element
     * @template T
     * @param data
     * @param iri
     * @returns graph item
     */
    private findGraphItem;
    /**
     * Finds illustration url and formates it to Url
     * @param files
     * @returns illustration url
     */
    private findIllustrationUrl;
    /**
     * To illustration mapping for each tissue open
     * @param mappings
     * @returns illustration mapping
     */
    private toIllustrationMapping;
    /**
     * Formates data to array of DataFileReference format
     * @param data
     * @returns data file references
     */
    private toDataFileReferences;
    /**
     * Formats data from 'dataSources' to 'SourceReferences'[] format
     * @param data
     * @returns source references
     */
    private toSourceReferences;
    /**
     * Constructs tissue library ,forming parent and child nodes
     * @param items
     * @returns
     */
    private constructTissueLibrary;
    static ɵfac: i0.ɵɵFactoryDeclaration<FtuDataImplService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FtuDataImplService>;
}

/**
 * Extended tissue
 */
interface ExtendedTissue extends Tissue {
    /** Base Id */
    representation_of: string;
    /** Objecy to stoe the file URL */
    object: {
        file: Url;
    };
}
/** Mock tissue data */
declare const MOCK_TISSUE_DATA: {
    root: Iri;
    nodes: Record<Iri, ExtendedTissue>;
};
/** Mock summary data */
declare const MOCK_SUMMARIES: {
    summary1: {
        label: string;
        cellSource: string;
        entries: {
            cell: {
                id: string;
                label: string;
            };
            biomarker: {
                id: string;
                label: string;
            };
            count: number;
            percentage: number;
            meanExpression: number;
            metadata: {
                label: string;
                value: string;
            }[][];
        }[];
    };
    summary2: {
        label: string;
        cellSource: string;
        entries: {
            cell: {
                id: string;
                label: string;
            };
            biomarker: {
                id: string;
                label: string;
            };
            count: number;
            percentage: number;
            meanExpression: number;
            metadata: {
                label: string;
                value: string;
            }[][];
        }[];
    };
    summary3: {
        label: string;
        cellSource: string;
        entries: never[];
    };
};
/**
This class represents a mock implementation of the FtuDataService class.
It overrides the methods from the parent class to provide mock data for testing purposes.
*/
declare class MockFtuDataService extends FtuDataService {
    /**
     * Overrides the getTissueLibrary method to return a mock data for the tissue tree
     * @returns tissue library
     */
    getTissueLibrary(): Observable<TissueLibrary>;
    /**
    Overrides the getIllustrationUrl method to return a mock URL for the given Iri.
    @param iri The Iri of the illustration.
    @returns An Observable that emits the mock URL.
    */
    getIllustrationUrl(iri: Iri): Observable<Url>;
    /**
    Overrides the getIllustrationMapping method to return an IllustrationMappingItem array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an IllustrationMappingItem array.
    */
    getIllustrationMapping(): Observable<IllustrationMappingItem[]>;
    /**
    Overrides the getCellSummaries method to return an CellSummary array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an CellSummary array.
    */
    getCellSummaries(): Observable<CellSummary[]>;
    /**
    Overrides the getDataFileReferences method to return an DataFileReference array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an DataFileReference array.
    */
    getDataFileReferences(iri: Iri): Observable<DataFileReference[]>;
    /**
    Overrides the getSourceReferences method to return an empty array.
    @param iri The Iri of the illustration.
    @returns An Observable that emits an empty array.
    */
    getSourceReferences(): Observable<SourceReference[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockFtuDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockFtuDataService>;
}

declare class HraServiceModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<HraServiceModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<HraServiceModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<HraServiceModule>;
}

/**
 * Tries to parse a value as json. Returns the original value if it could not be parsed.
 *
 * @param value Value to parse
 * @returns Parsed json value or the original value
 */
declare function tryParseJson<R = unknown>(value: unknown): R;
/** Selected illustration input schema */
declare const SELECTED_ILLUSTRATION_INPUT: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodLiteral<"">, z.ZodCustom<string, string>, z.ZodObject<{
    '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
    label: z.ZodString;
    organ_id: z.ZodString;
    organ_label: z.ZodString;
    representation_of: z.ZodString;
    mapping: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        svg_id: z.ZodString;
        svg_group_id: z.ZodString;
        representation_of: z.ZodString;
    }, z.core.$loose>>;
    illustration_files: z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        file_format: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>]>>;
/**
 * Parses selected illustration input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
declare function selectedIllustrationInput(value: unknown): string | {
    '@id': string & z.core.$brand<"URL"> & z.core.$brand<"IRI">;
    label: string;
    organ_id: string;
    organ_label: string;
    representation_of: string;
    mapping: {
        [x: string]: unknown;
        label: string;
        svg_id: string;
        svg_group_id: string;
        representation_of: string;
    }[];
    illustration_files: {
        file: string;
        file_format: string;
    }[];
} | undefined;
/** Illustrations input schema */
declare const ILLUSTRATIONS_INPUT: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodLiteral<"">, z.ZodCustom<string, string>, z.ZodObject<{
    '@graph': z.ZodArray<z.ZodObject<{
        '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        label: z.ZodString;
        organ_id: z.ZodString;
        organ_label: z.ZodString;
        representation_of: z.ZodString;
        mapping: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            svg_id: z.ZodString;
            svg_group_id: z.ZodString;
            representation_of: z.ZodString;
        }, z.core.$loose>>;
        illustration_files: z.ZodArray<z.ZodObject<{
            file: z.ZodString;
            file_format: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>]>>;
/**
 * Parses illustrations input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
declare function illustrationsInput(value: unknown): string | {
    '@graph': {
        '@id': string & z.core.$brand<"URL"> & z.core.$brand<"IRI">;
        label: string;
        organ_id: string;
        organ_label: string;
        representation_of: string;
        mapping: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        }[];
        illustration_files: {
            file: string;
            file_format: string;
        }[];
    }[];
} | undefined;
/** Cell summaries input schema */
declare const RAW_CELL_SUMMARIES_INPUT: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodLiteral<"">, z.ZodCustom<string, string>, z.ZodObject<{
    '@graph': z.ZodArray<z.ZodObject<{
        cell_source: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        biomarker_type: z.ZodString;
        summary: z.ZodArray<z.ZodObject<{
            cell_id: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
            cell_label: z.ZodString;
            genes: z.ZodArray<z.ZodObject<{
                gene_id: z.ZodString;
                gene_label: z.ZodString;
                ensemble_id: z.ZodString;
                mean_expression: z.ZodNumber;
            }, z.core.$strip>>;
            count: z.ZodNumber;
            percentage: z.ZodNumber;
            dataset_count: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>]>>;
/**
 * Parses cell summaries input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
declare function rawCellSummariesInput(value: unknown): string | {
    '@graph': {
        cell_source: string & z.core.$brand<"URL"> & z.core.$brand<"IRI">;
        biomarker_type: string;
        summary: {
            cell_id: string & z.core.$brand<"URL"> & z.core.$brand<"IRI">;
            cell_label: string;
            genes: {
                gene_id: string;
                gene_label: string;
                ensemble_id: string;
                mean_expression: number;
            }[];
            count: number;
            percentage: number;
            dataset_count?: number | undefined;
        }[];
    }[];
} | undefined;
/** Datasets input schema */
declare const RAW_DATASETS_INPUT: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodLiteral<"">, z.ZodCustom<string, string>, z.ZodObject<{
    '@graph': z.ZodArray<z.ZodObject<{
        '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        data_sources: z.ZodArray<z.ZodObject<{
            '@id': z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
            label: z.ZodString;
            description: z.ZodString;
            authors: z.ZodOptional<z.ZodArray<z.ZodString>>;
            year: z.ZodOptional<z.ZodNumber>;
            doi: z.ZodOptional<z.ZodString>;
            link: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>]>>;
/**
 * Parses datasets input
 *
 * @param value Value to parse
 * @returns Parsed input
 */
declare function rawDatasetsInput(value: unknown): string | {
    '@graph': {
        '@id': string & z.core.$brand<"URL"> & z.core.$brand<"IRI">;
        data_sources: {
            '@id': string & z.core.$brand<"URL"> & z.core.$brand<"IRI">;
            label: string;
            description: string;
            link: string;
            authors?: string[] | undefined;
            year?: number | undefined;
            doi?: string | undefined;
        }[];
    }[];
} | undefined;

export { BIOMARKER, CELL, CELL_SUMMARY, CELL_SUMMARY_ROW, DATA_FILE_REFERENCE, FTU_DATA_IMPL_ENDPOINTS, FTU_DATA_IMPL_FILE_FORMAT_MAPPING, FtuDataImplService, ftuData_model_d as FtuDataSchemas, FtuDataService, HraServiceModule, ILLUSTRATIONS_INPUT, ILLUSTRATION_MAPPING_ITEM, IRI, MOCK_SUMMARIES, MOCK_TISSUE_DATA, MockFtuDataService, RAW_CELL_ENTRY, RAW_CELL_SUMMARIES, RAW_CELL_SUMMARIES_INPUT, RAW_DATASETS, RAW_DATASETS_INPUT, RAW_ILLUSTRATION, RAW_ILLUSTRATIONS_JSONLD, RAW_ILLUSTRATION_FILE, SELECTED_ILLUSTRATION_INPUT, SOURCE_REFERENCE, TISSUE, TISSUE_LIBRARY, URL, illustrationsInput, rawCellSummariesInput, rawDatasetsInput, selectedIllustrationInput, setUrl, tryParseJson };
export type { Biomarker, Cell, CellSummary, CellSummaryRow, DataFileReference, FtuDataImplEndpoints, IllustrationMappingItem, Iri, RawCellEntry, RawCellSummary, RawDatasets, RawIllustration, RawIllustrationFile, RawIllustrationsJsonld, SourceReference, Tissue, TissueLibrary, Url };
