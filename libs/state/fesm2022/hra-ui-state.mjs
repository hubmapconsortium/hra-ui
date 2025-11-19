import { Action, createLinkId, createResourceId, createCustomType, payload, LinkRegistryActions, LinkType } from '@hra-ui/cdk/state';
import { __decorate, __metadata } from 'tslib';
import * as i1 from '@ngxs/store';
import { Action as Action$1, State, Selector, NgxsModule } from '@ngxs/store';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import { FtuDataService, FtuDataSchemas } from '@hra-ui/services';
import { tap, Observable, forkJoin, switchMap } from 'rxjs';
import * as z from 'zod';
import { HttpClient } from '@angular/common/http';
import { produce } from 'immer';

/** Loads the given Iri to the state */
let Load$5 = class Load extends Action('[CellSummary] Load') {
    /** Intializes the set iri */
    constructor(iri) {
        super();
        this.iri = iri;
    }
};
/** Filters summaries by sources */
class FilterSummaries extends Action('[CellSummary] Filter Summaries') {
    /** Initializes */
    constructor(sources) {
        super();
        this.sources = sources;
    }
}
/**
 * Action to combine summaries by biomarker
 */
class CombineSummariesByBiomarker extends Action('[CellSummary] Combine Summaries by Biomarker') {
}
/**
 * Compute aggregate of the given data and store to state */
class ComputeAggregates extends Action('[CellSummary] Compute Aggregates') {
}
/**
 * Action to reset the current state */
let Reset$3 = class Reset extends Action('[CellSummary] Reset') {
};

var cellSummary_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CombineSummariesByBiomarker: CombineSummariesByBiomarker,
    ComputeAggregates: ComputeAggregates,
    FilterSummaries: FilterSummaries,
    Load: Load$5,
    Reset: Reset$3
});

/**
 * Action to load the state with the current Iri
 */
let Load$4 = class Load extends Action('[SourceRefs] Load') {
    /** Intializes the set iri */
    constructor(iri) {
        super();
        this.iri = iri;
    }
};
/**
 * Action to set selected source references
 */
class SetSelectedSources extends Action('[SourceRefs] Set Selected Sources') {
    /** Intializes the set iri */
    constructor(sources) {
        super();
        this.sources = sources;
    }
}
/**
 * Action to reset selected source references
 */
class ResetSelectedSources extends Action('[SourceRefs] Reset Selected Sources') {
}
/**
 * Action to reset the state
 */
let Reset$2 = class Reset extends Action('[SourceRefs] Reset') {
};

var sourceRefs_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Load: Load$4,
    Reset: Reset$2,
    ResetSelectedSources: ResetSelectedSources,
    SetSelectedSources: SetSelectedSources
});

/**
 * State to handle the source references
 */
let SourceRefsState = class SourceRefsState {
    constructor() {
        /**
         * Data service of Ftu
         */
        this.dataService = inject(FtuDataService);
    }
    /**
     * Loads the current state with the source references
     */
    load({ setState }, { iri }) {
        return this.dataService.getSourceReferences(iri).pipe(tap((sources) => setState({ sources, selected: sources })));
    }
    /**
     * Sets selected source references
     */
    setSelectedSources({ patchState }, { sources }) {
        patchState({ selected: sources });
    }
    /**
     * Resets selected source references
     */
    resetSelectedSources({ getState, dispatch }) {
        return dispatch(new SetSelectedSources(getState().sources));
    }
    /**
     * Resets the current state
     */
    reset({ setState }) {
        setState({
            sources: [],
            selected: [],
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SourceRefsState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SourceRefsState }); }
};
__decorate([
    Action$1(Load$4, { cancelUncompleted: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Load$4]),
    __metadata("design:returntype", Observable)
], SourceRefsState.prototype, "load", null);
__decorate([
    Action$1(SetSelectedSources),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SetSelectedSources]),
    __metadata("design:returntype", void 0)
], SourceRefsState.prototype, "setSelectedSources", null);
__decorate([
    Action$1(ResetSelectedSources),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], SourceRefsState.prototype, "resetSelectedSources", null);
__decorate([
    Action$1(Reset$2),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SourceRefsState.prototype, "reset", null);
SourceRefsState = __decorate([
    State({
        name: 'sourceReferences',
        defaults: {
            sources: [],
            selected: [],
        },
    })
], SourceRefsState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: SourceRefsState, decorators: [{
            type: Injectable
        }], propDecorators: { load: [], setSelectedSources: [], resetSelectedSources: [], reset: [] } });

/** Selectors for SourceRefState */
class SourceRefsSelectors {
    /** returns the source references */
    static sourceReferences({ sources }) {
        return sources;
    }
    /**
     * Returns currently selected source references
     */
    static selectedSourceReferences({ selected }) {
        return selected;
    }
}
__decorate([
    Selector([SourceRefsState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], SourceRefsSelectors, "sourceReferences", null);
__decorate([
    Selector([SourceRefsState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], SourceRefsSelectors, "selectedSourceReferences", null);

/** Capitalizes the first character */
function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}
/**
 * Returns summaries with ids that are included in a source reference array
 */
function filterSummaries(summaries, sources) {
    const sourceIds = new Set(sources.map((source) => source.id));
    return summaries.filter((summary) => sourceIds.has(summary.cell_source));
}
/**
 * Combines multiple summaries into one per biomarker type
 *
 * @param summaries Summaries
 * @param types Biomarker types
 * @returns One summary for each biomarker type
 */
function combineSummariesByBiomarkerType(summaries, types) {
    const summariesByBiomarkerType = {};
    for (const summary of summaries) {
        summariesByBiomarkerType[summary.biomarker_type] ??= [];
        summariesByBiomarkerType[summary.biomarker_type].push(summary);
    }
    const results = [];
    for (const type of types) {
        const summariesByType = summariesByBiomarkerType[type] ?? [];
        const items = summariesByType.reduce((acc, { summary }) => acc.concat(summary), []);
        results.push({
            cell_source: `Aggregated by ${type}`,
            biomarker_type: type,
            summary: items,
        });
    }
    return results;
}
/** Helper class for building aggregate summaries */
class AggregateBuilder {
    constructor() {
        /** Mapping from column id to index */
        this.columnIndex = new Map();
        /** Mapping from row id to index */
        this.rowIndex = new Map();
        /** Column labels */
        this.columns = [];
        /** Aggregate rows */
        this.rows = [];
    }
    /**
     * Update the cell count for a row
     * @param rowObj Raw row object
     */
    updateRowCount(rowObj) {
        const row = this.getRow(rowObj);
        row[1] += rowObj.count;
    }
    /**
     * Update the entry corresponding to the row/column objects
     *
     * @param rowObj Raw row object
     * @param columnObj Raw column object
     */
    updateEntry(rowObj, columnObj) {
        const row = this.getRow(rowObj);
        const index = this.getColumnIndex(columnObj);
        row[index] ??= {
            color: 0,
            size: 0,
            data: {
                cell: rowObj.cell_id,
                biomarker: columnObj.gene_id,
                count: 0,
                meanExpression: 0,
                percentage: 0,
                dataset_count: 0,
            },
        };
        const entry = row[index];
        // Update count
        entry.data.count += rowObj.count;
        // Update meanExpression
        const { dataset_count: count = 0, meanExpression } = entry.data;
        const cumulativeMeanExpression = (count * meanExpression + columnObj.mean_expression) / (count + 1);
        entry.data.dataset_count = count + 1;
        entry.data.meanExpression = cumulativeMeanExpression;
        entry.color = cumulativeMeanExpression;
    }
    /**
     * Runs the final computations and returns the result
     *
     * @returns The finalized rows and columns
     */
    finalize() {
        const { columns, order } = this.sortColumns();
        const rows = this.sortRows(order);
        const totalCount = rows.reduce((acc, row) => acc + (row[1] ?? 0), 0);
        for (const entry of this.entries()) {
            const percentage = entry.data.count / totalCount;
            entry.size = entry.data.percentage = percentage;
        }
        return { columns, rows };
    }
    /**
     * Get the index for a column object. Adds a new column if necessary.
     *
     * @param obj Raw column object
     * @returns The associated index
     */
    getColumnIndex(obj) {
        const { columnIndex, columns } = this;
        const id = `${obj.gene_id}/${obj.ensemble_id}`;
        let index = columnIndex.get(id);
        if (index === undefined) {
            index = columnIndex.size + 2;
            columnIndex.set(id, index);
            columns.push(`${obj.gene_label} [${obj.ensemble_id}]`);
        }
        return index;
    }
    /**
     * Gets the row for a row object. Adds a new row if necessary.
     *
     * @param obj Raw row object
     * @returns The associated row
     */
    getRow(obj) {
        const { rowIndex, rows } = this;
        let index = rowIndex.get(obj.cell_id);
        if (index === undefined) {
            index = rows.length;
            rowIndex.set(obj.cell_id, index);
            rows.push([obj.cell_label, 0]);
        }
        return rows[index];
    }
    /**
     * Sorts the columns
     *
     * @returns The sorted columns and an array with the new index order
     */
    sortColumns() {
        const { columns } = this;
        const indexedColumns = columns.map((col, index) => [index + 2, col]);
        indexedColumns.sort((a, b) => (a[1] <= b[1] ? -1 : 1));
        return {
            columns: indexedColumns.map((item) => item[1]),
            order: indexedColumns.map((item) => item[0]),
        };
    }
    /**
     * Sorts the row data
     *
     * @param order The new column order
     * @returns Rows with data sorted in the new column order
     */
    sortRows(order) {
        return this.rows.map((row) => {
            const sorted = [row[0], row[1]];
            for (let index = 2; index < row.length; index++) {
                if (row[index] !== undefined) {
                    const newIndex = order[index - 2];
                    sorted[newIndex] = row[index];
                }
            }
            return sorted;
        });
    }
    /**
     * Iterates of all defined aggregate entries
     */
    *entries() {
        for (const row of this.rows) {
            for (let index = 2; index < row.length; index++) {
                if (row[index] !== undefined) {
                    yield row[index];
                }
            }
        }
    }
}
/**
 * Aggregates cell summaries for display in a table
 *
 * @param summary Raw cell summaries
 * @returns Aggregated cell summary rows
 */
function computeAggregate(summary) {
    const state = new AggregateBuilder();
    for (const cell of summary.summary) {
        state.updateRowCount(cell);
        for (const gene of cell.genes) {
            state.updateEntry(cell, gene);
        }
    }
    return {
        label: `${capitalize(summary.biomarker_type)} Biomarkers`,
        ...state.finalize(),
    };
}

/** Biomarker type labels */
const BIOMARKER_TYPES = ['gene', 'protein', 'lipid'];
/**
 * The AGGREGATE_CELL is an object that contains the color, size and
 * the data
 */
const AGGREGATE_CELL = z.object({
    color: z.number().nonnegative(),
    size: z.number().nonnegative(),
    data: FtuDataSchemas.CELL_SUMMARY_ROW,
});
/**
 * The AGGREGATE_ROW is a tuple of aggregate data structure with two elements:
 * a required string followed by an optional number
 */
const AGGREGATE_ROW = z.tuple([z.string(), z.number().optional()]).rest(AGGREGATE_CELL.optional());
/**
 * The AGGREGATE is an object that contains the label, columns
 * and rows */
const AGGREGATE = z.object({
    label: z.string(),
    columns: z.string().array(),
    rows: AGGREGATE_ROW.array(),
});

/** State handling cell summary data */
let CellSummaryState = class CellSummaryState {
    constructor() {
        /** Data service to load the FTU data */
        this.dataService = inject(FtuDataService);
    }
    /**
     * Loads the cell summary data and aggregrated of the current Iri into
     * the state and cancels uncompleted action if any
     */
    load({ patchState }, { iri }) {
        return this.dataService.getCellSummaries(iri).pipe(tap((summaries) => {
            patchState({ summaries, filteredSummaries: summaries, summariesByBiomarker: [], aggregates: [] });
        }));
    }
    /**
     * Filters summaries by source list and updates filteredSummaries
     */
    filterSummaries({ getState, patchState, dispatch }, { sources }) {
        const { summaries } = getState();
        const filteredSummaries = filterSummaries(summaries, sources);
        patchState({ filteredSummaries });
        return dispatch(new CombineSummariesByBiomarker());
    }
    /**
     * Combines summaries into array of cell summaries grouped by biomarker type, updates summariesByBiomarker
     */
    combineSummariesByBiomarker({ getState, patchState, dispatch }) {
        const { filteredSummaries, biomarkerTypes } = getState();
        const summariesByBiomarker = combineSummariesByBiomarkerType(filteredSummaries, biomarkerTypes);
        patchState({ summariesByBiomarker });
        return dispatch(new ComputeAggregates());
    }
    /**
     * Computes aggregate data and stores in the current state
     */
    computeAggregates({ getState, patchState }) {
        const { summariesByBiomarker } = getState();
        const aggregates = summariesByBiomarker.map(computeAggregate);
        patchState({ aggregates });
    }
    /**
     * Resets the summaries and aggregates for the current state
     */
    reset({ patchState }) {
        patchState({ summaries: [], filteredSummaries: [], summariesByBiomarker: [], aggregates: [] });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CellSummaryState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CellSummaryState }); }
};
__decorate([
    Action$1(Load$5, { cancelUncompleted: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Load$5]),
    __metadata("design:returntype", Observable)
], CellSummaryState.prototype, "load", null);
__decorate([
    Action$1([FilterSummaries, SetSelectedSources]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Observable)
], CellSummaryState.prototype, "filterSummaries", null);
__decorate([
    Action$1(CombineSummariesByBiomarker),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], CellSummaryState.prototype, "combineSummariesByBiomarker", null);
__decorate([
    Action$1(ComputeAggregates),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CellSummaryState.prototype, "computeAggregates", null);
__decorate([
    Action$1(Reset$3),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CellSummaryState.prototype, "reset", null);
CellSummaryState = __decorate([
    State({
        name: 'cellSummary',
        defaults: {
            biomarkerTypes: BIOMARKER_TYPES,
            summaries: [],
            filteredSummaries: [],
            summariesByBiomarker: [],
            aggregates: [],
        },
    })
], CellSummaryState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CellSummaryState, decorators: [{
            type: Injectable
        }], propDecorators: { load: [], filterSummaries: [], combineSummariesByBiomarker: [], computeAggregates: [], reset: [] } });

/** selectors for the CellSummary state */
class CellSummarySelectors {
    /** get the aggregate data from the state */
    static aggregates(state) {
        return state.aggregates;
    }
    /** get the summaries data from the state */
    static summaries(state) {
        return state.summaries;
    }
}
__decorate([
    Selector([CellSummaryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], CellSummarySelectors, "aggregates", null);
__decorate([
    Selector([CellSummaryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], CellSummarySelectors, "summaries", null);

/**
 * Define a Zod schema for `DOWNLOAD_FORMAT_ID`,
 * which is a string that is transformed into a branded string
 */
const DOWNLOAD_FORMAT_ID = z
    .string()
    .transform((id) => `DownloadFormatId:'${id}'`)
    .brand('DownloadFormatId');
/**
 * Define a Zod schema for `DOWNLOAD_ENTRY`,
 * which is a discriminated union of two objects with different properties
 */
const DOWNLOAD_ENTRY = z.discriminatedUnion('type', [
    z.object({ type: z.literal('url'), url: z.string() }),
    z.object({ type: z.literal('data'), data: z.string() }),
]);
/**
 * Define a Zod schema for `DOWNLOAD_FORMAT`,
 * which is an object with `id`, `label`, and `extension` properties
 */
const DOWNLOAD_FORMAT = z
    .object({
    id: DOWNLOAD_FORMAT_ID,
    label: z.string(),
    extension: z.string(),
})
    .partial({ extension: true });
/** Define a Zod schema for `DOWNLOAD_MODEL`,
 * which is an object with `formats` and `entries` properties */
const DOWNLOAD_MODEL = z.object({
    formats: z.record(DOWNLOAD_FORMAT_ID, DOWNLOAD_FORMAT),
    entries: z.record(DOWNLOAD_FORMAT_ID, DOWNLOAD_ENTRY),
});
/**
 * Creates download format id
 * @param id
 * @returns download format id
 */
function createDownloadFormatId(id) {
    return DOWNLOAD_FORMAT_ID.parse(id);
}

/**
 * SVG DEFAULT FORMAT CREATE ID
 */
const Svg = createDownloadFormatId('svg');
/**
 * PNG DEFAULT FORMAT CREATE ID
 */
const Png = createDownloadFormatId('png');

var builtinFormatsIds = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Png: Png,
    Svg: Svg
});

/**
 * Register format into state
 */
class RegisterFormat extends Action('[Download] Register Format') {
    /**
     * Creates an instance of register format.
     * @param format
     */
    constructor(format) {
        super();
        this.format = format;
    }
}
/**
 * Action to load entries from data service
 */
let Load$3 = class Load extends Action('[Download] Load') {
    /**
     * Creates a action to load from the enteries from the data service
     * @param iri Organ Iri for which the entries are loaded
     */
    constructor(iri) {
        super();
        this.iri = iri;
    }
};
/**
 * Add entry into download state
 */
class AddEntry extends Action('[Download] Add') {
    /** Constructor for Addd Entry */
    constructor(id, entry) {
        super();
        this.id = id;
        this.entry = entry;
    }
}
/**
 * Clear all entries from download state
 */
class ClearEntries extends Action('[Download] Clear') {
}
/**
 * Download file Action
 */
class Download extends Action('[Download] Download') {
    /**
     * Creates an instance of download.
     * @param selectedFormat
     */
    constructor(format) {
        super();
        this.format = format;
    }
}

var download_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AddEntry: AddEntry,
    ClearEntries: ClearEntries,
    Download: Download,
    Load: Load$3,
    RegisterFormat: RegisterFormat
});

/**
 * SVG DEFAULT FORMAT
 */
const SVG_FORMAT = {
    id: Svg,
    label: 'SVG',
    extension: '.svg',
};
/**
 * PNG DEFAULT FORMAT
 */
const PNG_FORMAT = {
    id: Png,
    label: 'PNG',
    extension: '.png',
};
// TODO add new formats: ai

/**
 * Download State Model used to convert
 * file from SVG file content to different
 * format and download to user.
 */
let DownloadState = class DownloadState {
    constructor() {
        /**
         * Http object inject for download state
         */
        this.http = inject(HttpClient);
        /**
         * Data service of download state
         */
        this.dataService = inject(FtuDataService);
    }
    /**
     * Ngxs on init and registry default format
     * @param ctx
     */
    ngxsOnInit(ctx) {
        ctx.dispatch([new RegisterFormat(SVG_FORMAT), new RegisterFormat(PNG_FORMAT)]);
    }
    /**
     * Actions register format in Download State
     * @param ctx
     * @param { format }
     */
    registerFormat(ctx, { format }) {
        ctx.setState(produce((draft) => {
            draft.formats[format.id] = format;
        }));
    }
    /**
     * Action to add the Organs IRI from the data service
     * @param ctx Context
     * @param iri Organ Data
     * @returns
     */
    load(ctx, { iri }) {
        return this.dataService.getDataFileReferences(iri).pipe(tap((items) => ctx.setState(produce((draft) => {
            draft.entries = {};
            for (const { format, url } of items) {
                draft.entries[createDownloadFormatId(format)] = { type: 'url', url };
            }
        }))));
    }
    /**
     * Add entry into download state
     * @param ctx
     * @param { id, entry }
     */
    addEntry(ctx, { id, entry }) {
        ctx.setState(produce((draft) => {
            draft.entries[id] = entry;
        }));
    }
    /**
     * Clear entires from download state
     * @param ctx
     */
    clearEntries(ctx) {
        ctx.setState(produce((draft) => {
            draft.entries = {};
        }));
    }
    /**
     * Actions download file in specified format
     * @param ctx
     * @param action
     */
    download(ctx, { format }) {
        const { entries } = ctx.getState();
        const entry = entries[format];
        switch (entry?.type) {
            case 'url': {
                const filename = this.guessFilename(ctx, format, entry.url);
                return this.downloadRemoteData(entry.url).pipe(tap((data) => this.downloadData(data, filename)));
            }
            case 'data': {
                const filename = this.guessFilename(ctx, format, '');
                this.downloadData(new Blob([entry.data]), filename);
                break;
            }
            default:
                throw new Error('Cannot download file without data');
        }
    }
    /**
     * Guess filename
     * @param ctx
     * @param id
     * @param url
     * @returns filename
     */
    guessFilename(ctx, id, url) {
        const { formats } = ctx.getState();
        const { extension = '' } = formats[id] ?? {};
        const fakeBase = 'https://base.com';
        const path = new URL(url, fakeBase).pathname;
        const segments = path.split('/').filter((seg) => seg !== '');
        const name = segments.length > 0 ? segments[segments.length - 1] : 'download';
        const guess = name.includes('.') ? name : `${name}${extension}`;
        return guess;
    }
    /**
     * Download converted formatted file to browser
     * @param blob
     * @param fileName
     */
    downloadData(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        document.body.appendChild(anchor);
        anchor.download = filename;
        anchor.href = url;
        anchor.click();
        anchor.remove();
        window.URL.revokeObjectURL(url);
    }
    /**
     * Downloads and save -  method is used to direct fetch file
     * if available on url without conversion
     * @param fileUrl
     * @param fileName
     */
    downloadRemoteData(url) {
        return this.http.get(url, { responseType: 'blob' });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: DownloadState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: DownloadState }); }
};
__decorate([
    Action$1(RegisterFormat),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RegisterFormat]),
    __metadata("design:returntype", void 0)
], DownloadState.prototype, "registerFormat", null);
__decorate([
    Action$1(Load$3),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Load$3]),
    __metadata("design:returntype", Observable)
], DownloadState.prototype, "load", null);
__decorate([
    Action$1(AddEntry),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddEntry]),
    __metadata("design:returntype", void 0)
], DownloadState.prototype, "addEntry", null);
__decorate([
    Action$1(ClearEntries),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DownloadState.prototype, "clearEntries", null);
__decorate([
    Action$1(Download),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Download]),
    __metadata("design:returntype", Object)
], DownloadState.prototype, "download", null);
DownloadState = __decorate([
    State({
        name: 'download',
        defaults: {
            formats: {},
            entries: {},
        },
    })
], DownloadState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: DownloadState, decorators: [{
            type: Injectable
        }], propDecorators: { registerFormat: [], load: [], addEntry: [], clearEntries: [], download: [] } });

/**
 * Available format selectors
 */
class DownloadSelectors {
    /**
     * Selectors available format for download selectors
     * @param state
     * @returns
     */
    static formats(state) {
        const { formats, entries } = state;
        const hasData = (format) => !!(format && format.id in entries);
        return Object.values(formats).filter(hasData);
    }
}
__decorate([
    Selector([DownloadState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], DownloadSelectors, "formats", null);

/** Update the screen mode */
let Set$1 = class Set extends Action('[Screenmode] Set Screenmode') {
    /**
     * Creates an instance of Set
     * @param isFullScreen Whether the mode is fullscreen
     */
    constructor(isFullScreen) {
        super();
        this.isFullScreen = isFullScreen;
    }
};
/** Update the screen mode */
class SetSize extends Action('[Screenmode] Set Size') {
    /**
     * Creates an instance of Set
     * @param size Whether the mode is small/large to toggle the footer behaviour
     */
    constructor(size) {
        super();
        this.size = size;
    }
}

var screenMode_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Set: Set$1,
    SetSize: SetSize
});

/** State storing the screen mode */
let ScreenModeState = class ScreenModeState {
    /**
     * Updates the screen mode
     * @param ctx State context
     * @param action Action with new mode
     */
    set({ setState }, { isFullScreen }) {
        setState(produce((draft) => {
            draft.isFullScreen = isFullScreen;
        }));
    }
    /**
     * Actions screen mode state
     * @param { setState } State Context
     * @param { size } Action regarding screen
     */
    SetSize({ setState }, { size }) {
        setState(produce((draft) => {
            draft.size = size;
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ScreenModeState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ScreenModeState }); }
};
__decorate([
    Action$1(Set$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Set$1]),
    __metadata("design:returntype", void 0)
], ScreenModeState.prototype, "set", null);
__decorate([
    Action$1(SetSize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SetSize]),
    __metadata("design:returntype", void 0)
], ScreenModeState.prototype, "SetSize", null);
ScreenModeState = __decorate([
    State({
        name: 'screenmode',
        defaults: {
            isFullScreen: false,
            size: 'large',
        },
    })
], ScreenModeState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ScreenModeState, decorators: [{
            type: Injectable
        }], propDecorators: { set: [], SetSize: [] } });

/**
 * Screen mode selectors
 */
class ScreenModeSelectors {
    /**
     * Selectors screen mode selectors
     * @param state
     * @returns true if full screen
     */
    static isFullScreen(state) {
        return state.isFullScreen;
    }
    /**
     * Selectors screen mode selectors
     * @param state
     * @returns size of value 'small' | 'large'
     */
    static size(state) {
        return state.size;
    }
}
__decorate([
    Selector([ScreenModeState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], ScreenModeSelectors, "isFullScreen", null);
__decorate([
    Selector([ScreenModeState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ScreenModeSelectors, "size", null);

/**
 * Loads the state with the current Iri
 */
let Load$2 = class Load extends Action('[Illustrator] Load') {
    /** Intializes the set iri */
    constructor(iri) {
        super();
        this.iri = iri;
    }
};
/**
 * Sets the selection for the Item in the current state on SetHover
 */
class SetHover extends Action('[Illustrator] Set Selection on Hover') {
    /** Initializes the Mapping Item */
    constructor(selectedOnHover) {
        super();
        this.selectedOnHover = selectedOnHover;
    }
}
/**
 * Sets the selection for the Item in the current state on SetClicked
 */
class SetClicked extends Action('[Illustrator] Set Selection on Clicked') {
    /** Initializes the Mapping Item */
    constructor(selectedOnClick) {
        super();
        this.selectedOnClick = selectedOnClick;
    }
}
/**
 * Sets highlighted cell type id in the state from label
 */
class HighlightCellType extends Action('[Illustrator] Highlight Cell Type Id') {
    /** Initializes the Mapping Item */
    constructor(hoverLabel) {
        super();
        this.hoverLabel = hoverLabel;
    }
}
/**
 * Clears the selection for the current state
 */
class ClearSelection extends Action('[Illustrator] Clear Selection') {
}
/**
 * Resets the state
 */
let Reset$1 = class Reset extends Action('[Illustrator] Reset') {
};

var illustrator_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ClearSelection: ClearSelection,
    HighlightCellType: HighlightCellType,
    Load: Load$2,
    Reset: Reset$1,
    SetClicked: SetClicked,
    SetHover: SetHover
});

/**
 * State handling medical illustrators
 */
let IllustratorState = class IllustratorState {
    constructor() {
        /**
         * Data service of Ftu
         */
        this.dataService = inject(FtuDataService);
    }
    /**
     * Loads the current state with the url and mapping.
     * The url and mapping are forked together using forkJoin.
     * It also cancels any uncompleted actions to the state.
     */
    load({ patchState }, { iri }) {
        const url$ = this.dataService.getIllustrationUrl(iri);
        const mapping$ = this.dataService.getIllustrationMapping(iri);
        const result$ = forkJoin({ url: url$, mapping: mapping$ });
        return result$.pipe(tap((result) => patchState({
            ...result,
            selectedOnHover: undefined,
            selectedOnClick: undefined,
        })));
    }
    /**
     * Sets the current selection to the state for SetHover
     */
    setHover({ patchState }, { selectedOnHover }) {
        patchState({ selectedOnHover });
    }
    /**
     * Sets the current selection to the state for SetClicked
     */
    setClicked({ patchState }, { selectedOnClick }) {
        patchState({ selectedOnClick });
    }
    /**
     * Clears the current selection from the state
     */
    clearSelection({ patchState }) {
        patchState({ selectedOnHover: undefined, selectedOnClick: undefined });
    }
    /**
     * Resets the mapping for the current state
     */
    reset({ setState }) {
        setState({ mapping: [] });
    }
    /**
     * Sets hover id of highlighted cell type from hover label
     */
    highlightCellType({ patchState, getState }, { hoverLabel }) {
        const match = getState().mapping.find((entry) => entry.ontologyId === hoverLabel);
        patchState({ hoveredCellTypeId: match ? match.ontologyId : undefined });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: IllustratorState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: IllustratorState }); }
};
__decorate([
    Action$1(Load$2, { cancelUncompleted: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Load$2]),
    __metadata("design:returntype", Observable)
], IllustratorState.prototype, "load", null);
__decorate([
    Action$1(SetHover),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SetHover]),
    __metadata("design:returntype", void 0)
], IllustratorState.prototype, "setHover", null);
__decorate([
    Action$1(SetClicked),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SetClicked]),
    __metadata("design:returntype", void 0)
], IllustratorState.prototype, "setClicked", null);
__decorate([
    Action$1(ClearSelection),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IllustratorState.prototype, "clearSelection", null);
__decorate([
    Action$1(Reset$1),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IllustratorState.prototype, "reset", null);
__decorate([
    Action$1(HighlightCellType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, HighlightCellType]),
    __metadata("design:returntype", void 0)
], IllustratorState.prototype, "highlightCellType", null);
IllustratorState = __decorate([
    State({
        name: 'illustrator',
        defaults: {
            mapping: [],
        },
    })
], IllustratorState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: IllustratorState, decorators: [{
            type: Injectable
        }], propDecorators: { load: [], setHover: [], setClicked: [], clearSelection: [], reset: [], highlightCellType: [] } });

/**
 * Selectors for Medical Illustrators
 */
class IllustratorSelectors {
    /**
     * Returns the url for the illustrator
     */
    static url({ url }) {
        return url;
    }
    /**
     * Returns the selected model of the illustrator on hover
     */
    static selectedOnHovered({ selectedOnHover }) {
        return selectedOnHover;
    }
    /**
     * Returns the selected model of the illustrator on click
     */
    static selectedOnClicked({ selectedOnClick }) {
        return selectedOnClick;
    }
    /**
     * Returns the current mapping of the illustrator
     */
    static mapping({ mapping }) {
        return mapping;
    }
    /**
     * Returns the current hovered cell id
     */
    static highlightedCell({ hoveredCellTypeId }) {
        return hoveredCellTypeId;
    }
}
__decorate([
    Selector([IllustratorState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IllustratorSelectors, "url", null);
__decorate([
    Selector([IllustratorState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IllustratorSelectors, "selectedOnHovered", null);
__decorate([
    Selector([IllustratorState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IllustratorSelectors, "selectedOnClicked", null);
__decorate([
    Selector([IllustratorState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Array)
], IllustratorSelectors, "mapping", null);
__decorate([
    Selector([IllustratorState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IllustratorSelectors, "highlightedCell", null);

/** Landing page id */
const LandingPage = createLinkId('LandingPage');
/** Product title link id */
const ProductTitle$1 = createLinkId('ProductTitle');
/** About Link id */
const About = createLinkId('About');
/** LinkId for HRA Portal */
const Portal = createLinkId('Portal');
/** LinkId for Illustration metadata */
const Illustration = createLinkId('Illustration');
/** LinkId for Embed */
const Embed = createLinkId('Embed');
/** LinkId for Explore FTU */
const ExploreFTU = createLinkId('ExploreFTU');
/** LinkId for read more in landing page content */
const LandingPageReadMore = createLinkId('LandingPageReadMore');

var linkIds = /*#__PURE__*/Object.freeze({
    __proto__: null,
    About: About,
    Embed: Embed,
    ExploreFTU: ExploreFTU,
    Illustration: Illustration,
    LandingPage: LandingPage,
    LandingPageReadMore: LandingPageReadMore,
    Portal: Portal,
    ProductTitle: ProductTitle$1
});

/** Product title id */
const ProductTitle = createResourceId('ProductTitle');
/** Product logo url id */
const ProductLogoUrl = createResourceId('ProductLogoUrl');
/** Landing Page Title id */
const LandingPageTitle = createResourceId('LandingPageIntroTitle');
/** Landing Page Description id */
const LandingPageDescription = createResourceId('LandingPageIntroDescription');
/** Landing Page Partners id */
const LandingPagePartners = createResourceId('LandingPageIntroPartners');
/** Landing Page More Text id */
const LandingPageIntroMoreText = createResourceId('LandingPageIntroMoreText');
/** Landing Page Read More text (For web components) */
const LandingPageIntroReadMore = createResourceId('LandingPageIntroReadMore');
/** Landing Page Intro Image id */
const LandingPageIntroImg = createResourceId('LandingPageIntroImg');
/** Metrics Logo id */
const MetricsLogo = createResourceId('MetricsLogo');
/** Metrics Title id */
const MetricsTitle = createResourceId('MetricsTitle');
/** Landing Page Depth Title */
const LandingPageDepthTitle = createResourceId('LandingPageDepthTitle');
/** Landing Page Depth Img id */
const LandingPageDepthImg = createResourceId('LandingPageDepthImg');
/** Lanading Page Depth Description id */
const LandingPageDepthDescription = createResourceId('LandingPageDepthDescription');
/** Landing Page Depth More Text id */
const LandingPageDepthMoreText = createResourceId('LandingPageDepthMoreText');
/** metrics id */
const Metrics$1 = createResourceId('Metrics');
/** Message to display after submitting contact form */
const ContactAcknowledgement = createResourceId('ContactAcknowledgement');
/** App title id */
const AppTitle = createResourceId('AppTitle');
/** Gradient legend id */
const GradientLegend = createResourceId('GradientLegend');
/** Size legend id */
const SizeLegend = createResourceId('SizeLegend');
/** Info to show on the tooltip for Gradient legend */
const GradientLegendInfo = createResourceId('GradientLegendInfo');
/** Info to show on the tooltip for Size legend */
const SizeLegendInfo = createResourceId('SizeLegendInfo');

var resourceIds = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AppTitle: AppTitle,
    ContactAcknowledgement: ContactAcknowledgement,
    GradientLegend: GradientLegend,
    GradientLegendInfo: GradientLegendInfo,
    LandingPageDepthDescription: LandingPageDepthDescription,
    LandingPageDepthImg: LandingPageDepthImg,
    LandingPageDepthMoreText: LandingPageDepthMoreText,
    LandingPageDepthTitle: LandingPageDepthTitle,
    LandingPageDescription: LandingPageDescription,
    LandingPageIntroImg: LandingPageIntroImg,
    LandingPageIntroMoreText: LandingPageIntroMoreText,
    LandingPageIntroReadMore: LandingPageIntroReadMore,
    LandingPagePartners: LandingPagePartners,
    LandingPageTitle: LandingPageTitle,
    Metrics: Metrics$1,
    MetricsLogo: MetricsLogo,
    MetricsTitle: MetricsTitle,
    ProductLogoUrl: ProductLogoUrl,
    ProductTitle: ProductTitle,
    SizeLegend: SizeLegend,
    SizeLegendInfo: SizeLegendInfo
});

/** Metrics resource */
const Metrics = createCustomType('metrics', payload());
/** Gradient legend resource */
const Gradient = createCustomType('gradient', payload());
/** Size legend resource */
const Size = createCustomType('size', payload());

var resourceTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Gradient: Gradient,
    Metrics: Metrics,
    Size: Size
});

/** Loads the Iri */
let Load$1 = class Load extends Action('[ActiveFtu] Load') {
    /**
     * Creates an instance of set iri.
     * @param iri
     */
    constructor(iri) {
        super();
        this.iri = iri;
    }
};
/** Action to set the illustration url of the active FTU */
class SetIllustrationUrl extends Action('[ActiveFtu] Set Illustration Url') {
    /**
     * Creates an instance of set iri.
     * @param iri
     */
    constructor(iri) {
        super();
        this.iri = iri;
    }
}
/** Clears the Iri */
class Clear extends Action('[ActiveFtu] Clear') {
}
/** Resets state */
class Reset extends Action('[ActiveFtu] Reset') {
}

var activeFtu_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Clear: Clear,
    Load: Load$1,
    Reset: Reset,
    SetIllustrationUrl: SetIllustrationUrl
});

/**
 * State to handle active FTU selection
 */
let ActiveFtuState = class ActiveFtuState {
    /**
     * loads the Cell summary, Illustrator and Source Refs
     * with the current iri
     * @param { iri } The iri which is in the url
     * @returns load An observable of void
     */
    load({ getState, patchState, dispatch }, { iri }) {
        if (getState().iri !== iri) {
            return dispatch([
                new Load$5(iri),
                new Load$2(iri),
                new Load$3(iri),
                new Load$4(iri),
                new SetIllustrationUrl(iri),
            ]).pipe(tap(() => patchState({ iri })), switchMap(() => dispatch(new ResetSelectedSources())));
        }
    }
    /**
     * This Action computes the url and dispatches the LinkRegistry Action to add
     * the link to the registry for navigation
     */
    setIllustrationUrl({ dispatch }, { iri }) {
        const BASE_URL = 'https://apps.humanatlas.io/kg-explorer/2d-ftu/';
        const [name] = iri.split('/').slice(-1);
        const url = `${BASE_URL}${name}/latest`;
        return dispatch(new LinkRegistryActions.Add(Illustration, { type: LinkType.External, url }));
    }
    /**
     * Action to clear the iri selections
     */
    clear({ patchState }) {
        patchState({ iri: undefined });
    }
    /**
     * Action to reset the states for
     * Cell summary, Illustrator and Source Refs
     */
    reset({ dispatch }) {
        return dispatch([
            new Reset$3(),
            new Reset$1(),
            new Reset$2(),
            new ClearEntries(),
        ]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ActiveFtuState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ActiveFtuState }); }
};
__decorate([
    Action$1(Load$1, { cancelUncompleted: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Load$1]),
    __metadata("design:returntype", Object)
], ActiveFtuState.prototype, "load", null);
__decorate([
    Action$1(SetIllustrationUrl),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SetIllustrationUrl]),
    __metadata("design:returntype", Object)
], ActiveFtuState.prototype, "setIllustrationUrl", null);
__decorate([
    Action$1([Clear, Reset]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ActiveFtuState.prototype, "clear", null);
__decorate([
    Action$1(Reset),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], ActiveFtuState.prototype, "reset", null);
ActiveFtuState = __decorate([
    State({
        name: 'activeFtu',
        defaults: {},
        children: [CellSummaryState, DownloadState, IllustratorState, SourceRefsState],
    })
], ActiveFtuState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ActiveFtuState, decorators: [{
            type: Injectable
        }], propDecorators: { load: [], setIllustrationUrl: [], clear: [], reset: [] } });

/** selectors for ActiveftuState */
class ActiveFtuSelectors {
    /** checks if the Iri is set */
    static isActive({ iri }) {
        return iri !== undefined;
    }
    /** gets the iri from the ActiveFtuModel */
    static iri({ iri }) {
        return iri;
    }
}
__decorate([
    Selector([ActiveFtuState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Boolean)
], ActiveFtuSelectors, "isActive", null);
__decorate([
    Selector([ActiveFtuState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ActiveFtuSelectors, "iri", null);

/** action of loading tissue data into the TissueLibrary state */
class Load extends Action('[TissueLibrary] Load Tissue Data') {
}

var tissueLibrary_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Load: Load
});

/** State handling tissue data*/
let TissueLibraryState = class TissueLibraryState {
    constructor() {
        /** injects the TissueLibraryService into a private readonly property */
        this.dataService = inject(FtuDataService);
    }
    /**
     * Loads the tissue data into the current state
     * @param ctx The state context instance
     * @returns data The tissue data to be added to the state
     */
    setActive(ctx) {
        return this.dataService.getTissueLibrary().pipe(tap((data) => ctx.setState(data)));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: TissueLibraryState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: TissueLibraryState }); }
};
__decorate([
    Action$1(Load),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Observable)
], TissueLibraryState.prototype, "setActive", null);
TissueLibraryState = __decorate([
    State({
        name: 'tissueLibrary',
        defaults: {
            root: '',
            nodes: {},
        },
    })
], TissueLibraryState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: TissueLibraryState, decorators: [{
            type: Injectable
        }], propDecorators: { setActive: [] } });

/** Selector class for retreiving data from the TissueLibraryState */
class TissueLibrarySelectors {
    /**
     * Gets the tissue data from the TissueLibrary object.
     * @param state the current state of the TissueLibraryState.
     * @returns node data of the type of TisseData.
     */
    static tissues(state) {
        return state.nodes;
    }
}
__decorate([
    Selector([TissueLibraryState]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TissueLibrarySelectors, "tissues", null);

/** Provides all states */
class HraStateModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HraStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.12", ngImport: i0, type: HraStateModule, imports: [i1.ɵNgxsFeatureModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HraStateModule, imports: [NgxsModule.forFeature([
                ActiveFtuState,
                CellSummaryState,
                DownloadState,
                IllustratorState,
                ScreenModeState,
                SourceRefsState,
                TissueLibraryState,
            ])] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HraStateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NgxsModule.forFeature([
                            ActiveFtuState,
                            CellSummaryState,
                            DownloadState,
                            IllustratorState,
                            ScreenModeState,
                            SourceRefsState,
                            TissueLibraryState,
                        ]),
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { activeFtu_actions as ActiveFtuActions, ActiveFtuSelectors, ActiveFtuState, builtinFormatsIds as BuiltinFormat, cellSummary_actions as CellSummaryActions, CellSummarySelectors, CellSummaryState, download_action as DownloadActions, DownloadSelectors, DownloadState, HraStateModule, illustrator_actions as IllustratorActions, IllustratorSelectors, IllustratorState, linkIds as LinkIds, resourceIds as ResourceIds, resourceTypes as ResourceTypes, screenMode_actions as ScreenModeAction, ScreenModeSelectors, ScreenModeState, sourceRefs_actions as SourceRefsActions, SourceRefsSelectors, SourceRefsState, tissueLibrary_actions as TissueLibraryActions, TissueLibrarySelectors, TissueLibraryState };
//# sourceMappingURL=hra-ui-state.mjs.map
