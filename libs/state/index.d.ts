import * as _hra_ui_cdk_state from '@hra-ui/cdk/state';
import { Iri, SourceReference, CellSummary, IllustrationMappingItem, Url, TissueLibrary, Tissue } from '@hra-ui/services';
import * as i1 from '@ngxs/store';
import { StateContext, NgxsOnInit } from '@ngxs/store';
import * as z from 'zod';
import { Observable } from 'rxjs';
import * as i0 from '@angular/core';
import { EmptyObject } from 'type-fest';

declare const Load_base$5: _hra_ui_cdk_state.ActionConstructor;
/** Loads the given Iri to the state */
declare class Load$5 extends Load_base$5 {
    readonly iri: Iri;
    /** Intializes the set iri */
    constructor(iri: Iri);
}
declare const FilterSummaries_base: _hra_ui_cdk_state.ActionConstructor;
/** Filters summaries by sources */
declare class FilterSummaries extends FilterSummaries_base {
    readonly sources: SourceReference[];
    /** Initializes */
    constructor(sources: SourceReference[]);
}
declare const CombineSummariesByBiomarker_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to combine summaries by biomarker
 */
declare class CombineSummariesByBiomarker extends CombineSummariesByBiomarker_base {
}
declare const ComputeAggregates_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Compute aggregate of the given data and store to state */
declare class ComputeAggregates extends ComputeAggregates_base {
}
declare const Reset_base$3: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to reset the current state */
declare class Reset$3 extends Reset_base$3 {
}

type cellSummary_actions_d_CombineSummariesByBiomarker = CombineSummariesByBiomarker;
declare const cellSummary_actions_d_CombineSummariesByBiomarker: typeof CombineSummariesByBiomarker;
type cellSummary_actions_d_ComputeAggregates = ComputeAggregates;
declare const cellSummary_actions_d_ComputeAggregates: typeof ComputeAggregates;
type cellSummary_actions_d_FilterSummaries = FilterSummaries;
declare const cellSummary_actions_d_FilterSummaries: typeof FilterSummaries;
declare namespace cellSummary_actions_d {
  export {
    cellSummary_actions_d_CombineSummariesByBiomarker as CombineSummariesByBiomarker,
    cellSummary_actions_d_ComputeAggregates as ComputeAggregates,
    cellSummary_actions_d_FilterSummaries as FilterSummaries,
    Load$5 as Load,
    Reset$3 as Reset,
  };
}

/** Type representing a single AGGREGATE_ROW */
type CellSummaryAggregateRow = z.infer<typeof AGGREGATE_ROW>;
/** Type representing AGGREGATE having label, columns and rows */
type CellSummaryAggregate = z.infer<typeof AGGREGATE>;
/**
 * An interface of the Cell summary model
 * having the summaries and aggregrates
 */
interface CellSummaryModel {
    /** Array of biomarker types */
    biomarkerTypes: string[];
    /** Array of summaries of the Cell Summary */
    summaries: CellSummary[];
    /** Summaries filtered by sources */
    filteredSummaries: CellSummary[];
    /** Summaries filtered by biomarker */
    summariesByBiomarker: CellSummary[];
    /** Array of aggregates of the Cell Summary */
    aggregates: CellSummaryAggregate[];
}
/** State context */
type Context$3 = StateContext<CellSummaryModel>;
/**
 * The AGGREGATE_ROW is a tuple of aggregate data structure with two elements:
 * a required string followed by an optional number
 */
declare const AGGREGATE_ROW: z.ZodTuple<[z.ZodString, z.ZodOptional<z.ZodNumber>], z.ZodOptional<z.ZodObject<{
    color: z.ZodNumber;
    size: z.ZodNumber;
    data: z.ZodObject<{
        cell: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
        biomarker: z.ZodString;
        count: z.ZodNumber;
        percentage: z.ZodNumber;
        meanExpression: z.ZodNumber;
        dataset_count: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>>>;
/**
 * The AGGREGATE is an object that contains the label, columns
 * and rows */
declare const AGGREGATE: z.ZodObject<{
    label: z.ZodString;
    columns: z.ZodArray<z.ZodString>;
    rows: z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodOptional<z.ZodNumber>], z.ZodOptional<z.ZodObject<{
        color: z.ZodNumber;
        size: z.ZodNumber;
        data: z.ZodObject<{
            cell: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "URL">, "IRI">;
            biomarker: z.ZodString;
            count: z.ZodNumber;
            percentage: z.ZodNumber;
            meanExpression: z.ZodNumber;
            dataset_count: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;

/** selectors for the CellSummary state */
declare class CellSummarySelectors {
    /** get the aggregate data from the state */
    static aggregates(state: CellSummaryModel): CellSummaryAggregate[];
    /** get the summaries data from the state */
    static summaries(state: CellSummaryModel): CellSummary[];
}

declare const Load_base$4: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to load the state with the current Iri
 */
declare class Load$4 extends Load_base$4 {
    readonly iri: Iri;
    /** Intializes the set iri */
    constructor(iri: Iri);
}
declare const SetSelectedSources_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to set selected source references
 */
declare class SetSelectedSources extends SetSelectedSources_base {
    readonly sources: SourceReference[];
    /** Intializes the set iri */
    constructor(sources: SourceReference[]);
}
declare const ResetSelectedSources_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to reset selected source references
 */
declare class ResetSelectedSources extends ResetSelectedSources_base {
}
declare const Reset_base$2: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to reset the state
 */
declare class Reset$2 extends Reset_base$2 {
}

type sourceRefs_actions_d_ResetSelectedSources = ResetSelectedSources;
declare const sourceRefs_actions_d_ResetSelectedSources: typeof ResetSelectedSources;
type sourceRefs_actions_d_SetSelectedSources = SetSelectedSources;
declare const sourceRefs_actions_d_SetSelectedSources: typeof SetSelectedSources;
declare namespace sourceRefs_actions_d {
  export {
    Load$4 as Load,
    Reset$2 as Reset,
    sourceRefs_actions_d_ResetSelectedSources as ResetSelectedSources,
    sourceRefs_actions_d_SetSelectedSources as SetSelectedSources,
  };
}

/**
 * Source refs model interface
 */
interface SourceRefsModel {
    /** Current source list */
    sources: SourceReference[];
    /** Selected sources */
    selected: SourceReference[];
}
/** State context */
type Context$2 = StateContext<SourceRefsModel>;
/**
 * State to handle the source references
 */
declare class SourceRefsState {
    /**
     * Data service of Ftu
     */
    private readonly dataService;
    /**
     * Loads the current state with the source references
     */
    load({ setState }: Context$2, { iri }: Load$4): Observable<unknown>;
    /**
     * Sets selected source references
     */
    setSelectedSources({ patchState }: Context$2, { sources }: SetSelectedSources): void;
    /**
     * Resets selected source references
     */
    resetSelectedSources({ getState, dispatch }: Context$2): Observable<void>;
    /**
     * Resets the current state
     */
    reset({ setState }: Context$2): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SourceRefsState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SourceRefsState>;
}

/** Selectors for SourceRefState */
declare class SourceRefsSelectors {
    /** returns the source references */
    static sourceReferences({ sources }: SourceRefsModel): SourceReference[];
    /**
     * Returns currently selected source references
     */
    static selectedSourceReferences({ selected }: SourceRefsModel): SourceReference[];
}

/** State handling cell summary data */
declare class CellSummaryState {
    /** Data service to load the FTU data */
    private readonly dataService;
    /**
     * Loads the cell summary data and aggregrated of the current Iri into
     * the state and cancels uncompleted action if any
     */
    load({ patchState }: Context$3, { iri }: Load$5): Observable<unknown>;
    /**
     * Filters summaries by source list and updates filteredSummaries
     */
    filterSummaries({ getState, patchState, dispatch }: Context$3, { sources }: FilterSummaries | SetSelectedSources): Observable<void>;
    /**
     * Combines summaries into array of cell summaries grouped by biomarker type, updates summariesByBiomarker
     */
    combineSummariesByBiomarker({ getState, patchState, dispatch }: Context$3): Observable<void>;
    /**
     * Computes aggregate data and stores in the current state
     */
    computeAggregates({ getState, patchState }: Context$3): void;
    /**
     * Resets the summaries and aggregates for the current state
     */
    reset({ patchState }: Context$3): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellSummaryState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CellSummaryState>;
}

/**
 * SVG DEFAULT FORMAT CREATE ID
 */
declare const Svg: string & z.$brand<"DownloadFormatId">;
/**
 * PNG DEFAULT FORMAT CREATE ID
 */
declare const Png: string & z.$brand<"DownloadFormatId">;

declare const builtinFormatsIds_d_Png: typeof Png;
declare const builtinFormatsIds_d_Svg: typeof Svg;
declare namespace builtinFormatsIds_d {
  export {
    builtinFormatsIds_d_Png as Png,
    builtinFormatsIds_d_Svg as Svg,
  };
}

/**
 * Define a TypeScript type called `DownloadFormatId`,
 * which is inferred from the type of the `DOWNLOAD_FORMAT_ID` constant
 */
type DownloadFormatId = z.infer<typeof DOWNLOAD_FORMAT_ID>;
/**
 * Define a TypeScript type called `DownloadFormat`,
 * which is inferred from the type of the `DOWNLOAD_FORMAT` constant
 */
type DownloadFormat = z.infer<typeof DOWNLOAD_FORMAT>;
/**
 * Define a TypeScript type called `DownloadEntry`,
 * which is inferred from the type of the `DOWNLOAD_ENTRY` constant
 */
type DownloadEntry = z.infer<typeof DOWNLOAD_ENTRY>;
/**
 * Define a TypeScript type called `DownloadModel`,
 * which is inferred from the type of the `DOWNLOAD_MODEL` constant
 */
type DownloadModel = z.infer<typeof DOWNLOAD_MODEL>;
/**
 * Define a TypeScript type called `DownloadContext`,
 * which is a state context for the `DownloadModel` type
 */
type DownloadContext = StateContext<DownloadModel>;
/**
 * Define a Zod schema for `DOWNLOAD_FORMAT_ID`,
 * which is a string that is transformed into a branded string
 */
declare const DOWNLOAD_FORMAT_ID: z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "DownloadFormatId">;
/**
 * Define a Zod schema for `DOWNLOAD_ENTRY`,
 * which is a discriminated union of two objects with different properties
 */
declare const DOWNLOAD_ENTRY: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"url">;
    url: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"data">;
    data: z.ZodString;
}, z.core.$strip>], "type">;
/**
 * Define a Zod schema for `DOWNLOAD_FORMAT`,
 * which is an object with `id`, `label`, and `extension` properties
 */
declare const DOWNLOAD_FORMAT: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "DownloadFormatId">;
    label: z.ZodString;
    extension: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Define a Zod schema for `DOWNLOAD_MODEL`,
 * which is an object with `formats` and `entries` properties */
declare const DOWNLOAD_MODEL: z.ZodObject<{
    formats: z.ZodRecord<z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "DownloadFormatId">, z.ZodObject<{
        id: z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "DownloadFormatId">;
        label: z.ZodString;
        extension: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    entries: z.ZodRecord<z.core.$ZodBranded<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, "DownloadFormatId">, z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"url">;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"data">;
        data: z.ZodString;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;

declare const RegisterFormat_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Register format into state
 */
declare class RegisterFormat extends RegisterFormat_base {
    readonly format: DownloadFormat;
    /**
     * Creates an instance of register format.
     * @param format
     */
    constructor(format: DownloadFormat);
}
declare const Load_base$3: _hra_ui_cdk_state.ActionConstructor;
/**
 * Action to load entries from data service
 */
declare class Load$3 extends Load_base$3 {
    readonly iri: Iri;
    /**
     * Creates a action to load from the enteries from the data service
     * @param iri Organ Iri for which the entries are loaded
     */
    constructor(iri: Iri);
}
declare const AddEntry_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Add entry into download state
 */
declare class AddEntry extends AddEntry_base {
    readonly id: DownloadFormatId;
    readonly entry: DownloadEntry;
    /** Constructor for Addd Entry */
    constructor(id: DownloadFormatId, entry: DownloadEntry);
}
declare const ClearEntries_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Clear all entries from download state
 */
declare class ClearEntries extends ClearEntries_base {
}
declare const Download_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Download file Action
 */
declare class Download extends Download_base {
    readonly format: DownloadFormatId;
    /**
     * Creates an instance of download.
     * @param selectedFormat
     */
    constructor(format: DownloadFormatId);
}

type download_action_d_AddEntry = AddEntry;
declare const download_action_d_AddEntry: typeof AddEntry;
type download_action_d_ClearEntries = ClearEntries;
declare const download_action_d_ClearEntries: typeof ClearEntries;
type download_action_d_Download = Download;
declare const download_action_d_Download: typeof Download;
type download_action_d_RegisterFormat = RegisterFormat;
declare const download_action_d_RegisterFormat: typeof RegisterFormat;
declare namespace download_action_d {
  export {
    download_action_d_AddEntry as AddEntry,
    download_action_d_ClearEntries as ClearEntries,
    download_action_d_Download as Download,
    Load$3 as Load,
    download_action_d_RegisterFormat as RegisterFormat,
  };
}

/**
 * Download State Model used to convert
 * file from SVG file content to different
 * format and download to user.
 */
declare class DownloadState implements NgxsOnInit {
    /**
     * Http object inject for download state
     */
    private readonly http;
    /**
     * Data service of download state
     */
    private readonly dataService;
    /**
     * Ngxs on init and registry default format
     * @param ctx
     */
    ngxsOnInit(ctx: DownloadContext): void;
    /**
     * Actions register format in Download State
     * @param ctx
     * @param { format }
     */
    registerFormat(ctx: DownloadContext, { format }: RegisterFormat): void;
    /**
     * Action to add the Organs IRI from the data service
     * @param ctx Context
     * @param iri Organ Data
     * @returns
     */
    load(ctx: DownloadContext, { iri }: Load$3): Observable<unknown>;
    /**
     * Add entry into download state
     * @param ctx
     * @param { id, entry }
     */
    addEntry(ctx: DownloadContext, { id, entry }: AddEntry): void;
    /**
     * Clear entires from download state
     * @param ctx
     */
    clearEntries(ctx: DownloadContext): void;
    /**
     * Actions download file in specified format
     * @param ctx
     * @param action
     */
    download(ctx: DownloadContext, { format }: Download): Observable<unknown> | void;
    /**
     * Guess filename
     * @param ctx
     * @param id
     * @param url
     * @returns filename
     */
    private guessFilename;
    /**
     * Download converted formatted file to browser
     * @param blob
     * @param fileName
     */
    private downloadData;
    /**
     * Downloads and save -  method is used to direct fetch file
     * if available on url without conversion
     * @param fileUrl
     * @param fileName
     */
    private downloadRemoteData;
    static ɵfac: i0.ɵɵFactoryDeclaration<DownloadState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DownloadState>;
}

/**
 * Available format selectors
 */
declare class DownloadSelectors {
    /**
     * Selectors available format for download selectors
     * @param state
     * @returns
     */
    static formats(state: DownloadModel): DownloadFormat[];
}

declare const Set_base: _hra_ui_cdk_state.ActionConstructor;
/** Update the screen mode */
declare class Set extends Set_base {
    readonly isFullScreen: boolean;
    /**
     * Creates an instance of Set
     * @param isFullScreen Whether the mode is fullscreen
     */
    constructor(isFullScreen: boolean);
}
declare const SetSize_base: _hra_ui_cdk_state.ActionConstructor;
/** Update the screen mode */
declare class SetSize extends SetSize_base {
    readonly size: 'small' | 'large';
    /**
     * Creates an instance of Set
     * @param size Whether the mode is small/large to toggle the footer behaviour
     */
    constructor(size: 'small' | 'large');
}

type screenMode_actions_d_Set = Set;
declare const screenMode_actions_d_Set: typeof Set;
type screenMode_actions_d_SetSize = SetSize;
declare const screenMode_actions_d_SetSize: typeof SetSize;
declare namespace screenMode_actions_d {
  export {
    screenMode_actions_d_Set as Set,
    screenMode_actions_d_SetSize as SetSize,
  };
}

/** Screen mode state model */
interface ScreenModeModel {
    /** Whether in fullscreen */
    isFullScreen: boolean;
    /** Wheather footer should be in small screen mode: Logo visibility */
    size: 'small' | 'large';
}

/** State storing the screen mode */
declare class ScreenModeState {
    /**
     * Updates the screen mode
     * @param ctx State context
     * @param action Action with new mode
     */
    set({ setState }: StateContext<ScreenModeModel>, { isFullScreen }: Set): void;
    /**
     * Actions screen mode state
     * @param { setState } State Context
     * @param { size } Action regarding screen
     */
    SetSize({ setState }: StateContext<ScreenModeModel>, { size }: SetSize): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScreenModeState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScreenModeState>;
}

/**
 * Screen mode selectors
 */
declare class ScreenModeSelectors {
    /**
     * Selectors screen mode selectors
     * @param state
     * @returns true if full screen
     */
    static isFullScreen(state: ScreenModeModel): boolean;
    /**
     * Selectors screen mode selectors
     * @param state
     * @returns size of value 'small' | 'large'
     */
    static size(state: ScreenModeModel): 'small' | 'large';
}

declare const Load_base$2: _hra_ui_cdk_state.ActionConstructor;
/**
 * Loads the state with the current Iri
 */
declare class Load$2 extends Load_base$2 {
    readonly iri: Iri;
    /** Intializes the set iri */
    constructor(iri: Iri);
}
declare const SetHover_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Sets the selection for the Item in the current state on SetHover
 */
declare class SetHover extends SetHover_base {
    readonly selectedOnHover: IllustrationMappingItem | undefined;
    /** Initializes the Mapping Item */
    constructor(selectedOnHover: IllustrationMappingItem | undefined);
}
declare const SetClicked_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Sets the selection for the Item in the current state on SetClicked
 */
declare class SetClicked extends SetClicked_base {
    readonly selectedOnClick: IllustrationMappingItem;
    /** Initializes the Mapping Item */
    constructor(selectedOnClick: IllustrationMappingItem);
}
declare const HighlightCellType_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Sets highlighted cell type id in the state from label
 */
declare class HighlightCellType extends HighlightCellType_base {
    readonly hoverLabel?: string | undefined;
    /** Initializes the Mapping Item */
    constructor(hoverLabel?: string | undefined);
}
declare const ClearSelection_base: _hra_ui_cdk_state.ActionConstructor;
/**
 * Clears the selection for the current state
 */
declare class ClearSelection extends ClearSelection_base {
}
declare const Reset_base$1: _hra_ui_cdk_state.ActionConstructor;
/**
 * Resets the state
 */
declare class Reset$1 extends Reset_base$1 {
}

type illustrator_actions_d_ClearSelection = ClearSelection;
declare const illustrator_actions_d_ClearSelection: typeof ClearSelection;
type illustrator_actions_d_HighlightCellType = HighlightCellType;
declare const illustrator_actions_d_HighlightCellType: typeof HighlightCellType;
type illustrator_actions_d_SetClicked = SetClicked;
declare const illustrator_actions_d_SetClicked: typeof SetClicked;
type illustrator_actions_d_SetHover = SetHover;
declare const illustrator_actions_d_SetHover: typeof SetHover;
declare namespace illustrator_actions_d {
  export {
    illustrator_actions_d_ClearSelection as ClearSelection,
    illustrator_actions_d_HighlightCellType as HighlightCellType,
    Load$2 as Load,
    Reset$1 as Reset,
    illustrator_actions_d_SetClicked as SetClicked,
    illustrator_actions_d_SetHover as SetHover,
  };
}

/**
 * interface for the Illustrator Model that contains the url, selected
 * and mapping fields
 */
interface IllustratorModel {
    /** Illustration URL */
    url?: Url;
    /** Selected Illustrator Item on hover */
    selectedOnHover?: IllustrationMappingItem;
    /** Selected Illustrator Item on click */
    selectedOnClick?: IllustrationMappingItem;
    /** Array of Illustrartor Items */
    mapping: IllustrationMappingItem[];
    /** Current hovered cell type id */
    hoveredCellTypeId?: string;
}
/** State context */
type Context$1 = StateContext<IllustratorModel>;
/**
 * State handling medical illustrators
 */
declare class IllustratorState {
    /**
     * Data service of Ftu
     */
    private readonly dataService;
    /**
     * Loads the current state with the url and mapping.
     * The url and mapping are forked together using forkJoin.
     * It also cancels any uncompleted actions to the state.
     */
    load({ patchState }: Context$1, { iri }: Load$2): Observable<unknown>;
    /**
     * Sets the current selection to the state for SetHover
     */
    setHover({ patchState }: Context$1, { selectedOnHover }: SetHover): void;
    /**
     * Sets the current selection to the state for SetClicked
     */
    setClicked({ patchState }: Context$1, { selectedOnClick }: SetClicked): void;
    /**
     * Clears the current selection from the state
     */
    clearSelection({ patchState }: Context$1): void;
    /**
     * Resets the mapping for the current state
     */
    reset({ setState }: Context$1): void;
    /**
     * Sets hover id of highlighted cell type from hover label
     */
    highlightCellType({ patchState, getState }: Context$1, { hoverLabel }: HighlightCellType): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IllustratorState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IllustratorState>;
}

/**
 * Selectors for Medical Illustrators
 */
declare class IllustratorSelectors {
    /**
     * Returns the url for the illustrator
     */
    static url({ url }: IllustratorModel): Url | string | undefined;
    /**
     * Returns the selected model of the illustrator on hover
     */
    static selectedOnHovered({ selectedOnHover }: IllustratorModel): IllustrationMappingItem | undefined;
    /**
     * Returns the selected model of the illustrator on click
     */
    static selectedOnClicked({ selectedOnClick }: IllustratorModel): IllustrationMappingItem | undefined;
    /**
     * Returns the current mapping of the illustrator
     */
    static mapping({ mapping }: IllustratorModel): IllustrationMappingItem[];
    /**
     * Returns the current hovered cell id
     */
    static highlightedCell({ hoveredCellTypeId }: IllustratorModel): string | undefined;
}

/** Landing page id */
declare const LandingPage: string & z.$brand<"LinkId">;
/** Product title link id */
declare const ProductTitle$1: string & z.$brand<"LinkId">;
/** About Link id */
declare const About: string & z.$brand<"LinkId">;
/** LinkId for HRA Portal */
declare const Portal: string & z.$brand<"LinkId">;
/** LinkId for Illustration metadata */
declare const Illustration: string & z.$brand<"LinkId">;
/** LinkId for Embed */
declare const Embed: string & z.$brand<"LinkId">;
/** LinkId for Explore FTU */
declare const ExploreFTU: string & z.$brand<"LinkId">;
/** LinkId for read more in landing page content */
declare const LandingPageReadMore: string & z.$brand<"LinkId">;

declare const linkIds_d_About: typeof About;
declare const linkIds_d_Embed: typeof Embed;
declare const linkIds_d_ExploreFTU: typeof ExploreFTU;
declare const linkIds_d_Illustration: typeof Illustration;
declare const linkIds_d_LandingPage: typeof LandingPage;
declare const linkIds_d_LandingPageReadMore: typeof LandingPageReadMore;
declare const linkIds_d_Portal: typeof Portal;
declare namespace linkIds_d {
  export {
    linkIds_d_About as About,
    linkIds_d_Embed as Embed,
    linkIds_d_ExploreFTU as ExploreFTU,
    linkIds_d_Illustration as Illustration,
    linkIds_d_LandingPage as LandingPage,
    linkIds_d_LandingPageReadMore as LandingPageReadMore,
    linkIds_d_Portal as Portal,
    ProductTitle$1 as ProductTitle,
  };
}

/** Product title id */
declare const ProductTitle: string & z.$brand<"ResourceId">;
/** Product logo url id */
declare const ProductLogoUrl: string & z.$brand<"ResourceId">;
/** Landing Page Title id */
declare const LandingPageTitle: string & z.$brand<"ResourceId">;
/** Landing Page Description id */
declare const LandingPageDescription: string & z.$brand<"ResourceId">;
/** Landing Page Partners id */
declare const LandingPagePartners: string & z.$brand<"ResourceId">;
/** Landing Page More Text id */
declare const LandingPageIntroMoreText: string & z.$brand<"ResourceId">;
/** Landing Page Read More text (For web components) */
declare const LandingPageIntroReadMore: string & z.$brand<"ResourceId">;
/** Landing Page Intro Image id */
declare const LandingPageIntroImg: string & z.$brand<"ResourceId">;
/** Metrics Logo id */
declare const MetricsLogo: string & z.$brand<"ResourceId">;
/** Metrics Title id */
declare const MetricsTitle: string & z.$brand<"ResourceId">;
/** Landing Page Depth Title */
declare const LandingPageDepthTitle: string & z.$brand<"ResourceId">;
/** Landing Page Depth Img id */
declare const LandingPageDepthImg: string & z.$brand<"ResourceId">;
/** Lanading Page Depth Description id */
declare const LandingPageDepthDescription: string & z.$brand<"ResourceId">;
/** Landing Page Depth More Text id */
declare const LandingPageDepthMoreText: string & z.$brand<"ResourceId">;
/** metrics id */
declare const Metrics$1: string & z.$brand<"ResourceId">;
/** Message to display after submitting contact form */
declare const ContactAcknowledgement: string & z.$brand<"ResourceId">;
/** App title id */
declare const AppTitle: string & z.$brand<"ResourceId">;
/** Gradient legend id */
declare const GradientLegend: string & z.$brand<"ResourceId">;
/** Size legend id */
declare const SizeLegend: string & z.$brand<"ResourceId">;
/** Info to show on the tooltip for Gradient legend */
declare const GradientLegendInfo: string & z.$brand<"ResourceId">;
/** Info to show on the tooltip for Size legend */
declare const SizeLegendInfo: string & z.$brand<"ResourceId">;

declare const resourceIds_d_AppTitle: typeof AppTitle;
declare const resourceIds_d_ContactAcknowledgement: typeof ContactAcknowledgement;
declare const resourceIds_d_GradientLegend: typeof GradientLegend;
declare const resourceIds_d_GradientLegendInfo: typeof GradientLegendInfo;
declare const resourceIds_d_LandingPageDepthDescription: typeof LandingPageDepthDescription;
declare const resourceIds_d_LandingPageDepthImg: typeof LandingPageDepthImg;
declare const resourceIds_d_LandingPageDepthMoreText: typeof LandingPageDepthMoreText;
declare const resourceIds_d_LandingPageDepthTitle: typeof LandingPageDepthTitle;
declare const resourceIds_d_LandingPageDescription: typeof LandingPageDescription;
declare const resourceIds_d_LandingPageIntroImg: typeof LandingPageIntroImg;
declare const resourceIds_d_LandingPageIntroMoreText: typeof LandingPageIntroMoreText;
declare const resourceIds_d_LandingPageIntroReadMore: typeof LandingPageIntroReadMore;
declare const resourceIds_d_LandingPagePartners: typeof LandingPagePartners;
declare const resourceIds_d_LandingPageTitle: typeof LandingPageTitle;
declare const resourceIds_d_MetricsLogo: typeof MetricsLogo;
declare const resourceIds_d_MetricsTitle: typeof MetricsTitle;
declare const resourceIds_d_ProductLogoUrl: typeof ProductLogoUrl;
declare const resourceIds_d_ProductTitle: typeof ProductTitle;
declare const resourceIds_d_SizeLegend: typeof SizeLegend;
declare const resourceIds_d_SizeLegendInfo: typeof SizeLegendInfo;
declare namespace resourceIds_d {
  export {
    resourceIds_d_AppTitle as AppTitle,
    resourceIds_d_ContactAcknowledgement as ContactAcknowledgement,
    resourceIds_d_GradientLegend as GradientLegend,
    resourceIds_d_GradientLegendInfo as GradientLegendInfo,
    resourceIds_d_LandingPageDepthDescription as LandingPageDepthDescription,
    resourceIds_d_LandingPageDepthImg as LandingPageDepthImg,
    resourceIds_d_LandingPageDepthMoreText as LandingPageDepthMoreText,
    resourceIds_d_LandingPageDepthTitle as LandingPageDepthTitle,
    resourceIds_d_LandingPageDescription as LandingPageDescription,
    resourceIds_d_LandingPageIntroImg as LandingPageIntroImg,
    resourceIds_d_LandingPageIntroMoreText as LandingPageIntroMoreText,
    resourceIds_d_LandingPageIntroReadMore as LandingPageIntroReadMore,
    resourceIds_d_LandingPagePartners as LandingPagePartners,
    resourceIds_d_LandingPageTitle as LandingPageTitle,
    Metrics$1 as Metrics,
    resourceIds_d_MetricsLogo as MetricsLogo,
    resourceIds_d_MetricsTitle as MetricsTitle,
    resourceIds_d_ProductLogoUrl as ProductLogoUrl,
    resourceIds_d_ProductTitle as ProductTitle,
    resourceIds_d_SizeLegend as SizeLegend,
    resourceIds_d_SizeLegendInfo as SizeLegendInfo,
  };
}

/** Metrics resource */
declare const Metrics: _hra_ui_cdk_state.ResourceType<{
    type: "custom:metrics";
} & {
    metrics: {
        icon: string;
        value: string;
        description: string;
    }[];
}>;
/** Gradient legend resource */
declare const Gradient: _hra_ui_cdk_state.ResourceType<{
    type: "custom:gradient";
} & {
    points: {
        color: string;
        percentage: number;
    }[];
}>;
/** Size legend resource */
declare const Size: _hra_ui_cdk_state.ResourceType<{
    type: "custom:size";
} & {
    sizes: {
        label: string;
        radius: number;
    }[];
}>;

declare const resourceTypes_d_Gradient: typeof Gradient;
declare const resourceTypes_d_Metrics: typeof Metrics;
declare const resourceTypes_d_Size: typeof Size;
declare namespace resourceTypes_d {
  export {
    resourceTypes_d_Gradient as Gradient,
    resourceTypes_d_Metrics as Metrics,
    resourceTypes_d_Size as Size,
  };
}

/** Interface for providing options for the hra state module */
type HraStateModuleOptions = EmptyObject;
/** Provides all states */
declare class HraStateModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<HraStateModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<HraStateModule, never, [typeof i1.ɵNgxsFeatureModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<HraStateModule>;
}

declare const Load_base$1: _hra_ui_cdk_state.ActionConstructor;
/** action of loading tissue data into the TissueLibrary state */
declare class Load$1 extends Load_base$1 {
}

declare namespace tissueLibrary_actions_d {
  export {
    Load$1 as Load,
  };
}

/** Type alias for the tissue data */
type TissueLibraryModel = TissueLibrary;
/** Helper alias for action handler's ctx argument */
type TissueLibraryContext = StateContext<TissueLibraryModel>;

/** Selector class for retreiving data from the TissueLibraryState */
declare class TissueLibrarySelectors {
    /**
     * Gets the tissue data from the TissueLibrary object.
     * @param state the current state of the TissueLibraryState.
     * @returns node data of the type of TisseData.
     */
    static tissues(state: TissueLibraryModel): Record<Iri, Tissue>;
}

/** State handling tissue data*/
declare class TissueLibraryState {
    /** injects the TissueLibraryService into a private readonly property */
    private readonly dataService;
    /**
     * Loads the tissue data into the current state
     * @param ctx The state context instance
     * @returns data The tissue data to be added to the state
     */
    setActive(ctx: TissueLibraryContext): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TissueLibraryState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TissueLibraryState>;
}

declare const Load_base: _hra_ui_cdk_state.ActionConstructor;
/** Loads the Iri */
declare class Load extends Load_base {
    readonly iri: Iri;
    /**
     * Creates an instance of set iri.
     * @param iri
     */
    constructor(iri: Iri);
}
declare const SetIllustrationUrl_base: _hra_ui_cdk_state.ActionConstructor;
/** Action to set the illustration url of the active FTU */
declare class SetIllustrationUrl extends SetIllustrationUrl_base {
    readonly iri: Iri;
    /**
     * Creates an instance of set iri.
     * @param iri
     */
    constructor(iri: Iri);
}
declare const Clear_base: _hra_ui_cdk_state.ActionConstructor;
/** Clears the Iri */
declare class Clear extends Clear_base {
}
declare const Reset_base: _hra_ui_cdk_state.ActionConstructor;
/** Resets state */
declare class Reset extends Reset_base {
}

type activeFtu_actions_d_Clear = Clear;
declare const activeFtu_actions_d_Clear: typeof Clear;
type activeFtu_actions_d_Load = Load;
declare const activeFtu_actions_d_Load: typeof Load;
type activeFtu_actions_d_Reset = Reset;
declare const activeFtu_actions_d_Reset: typeof Reset;
type activeFtu_actions_d_SetIllustrationUrl = SetIllustrationUrl;
declare const activeFtu_actions_d_SetIllustrationUrl: typeof SetIllustrationUrl;
declare namespace activeFtu_actions_d {
  export {
    activeFtu_actions_d_Clear as Clear,
    activeFtu_actions_d_Load as Load,
    activeFtu_actions_d_Reset as Reset,
    activeFtu_actions_d_SetIllustrationUrl as SetIllustrationUrl,
  };
}

/**
 * Interface for ActiveFtuModel */
interface ActiveFtuModel {
    /** Iri for the current Ftu  */
    iri?: Iri;
}
/** State context */
type Context = StateContext<ActiveFtuModel>;
/**
 * State to handle active FTU selection
 */
declare class ActiveFtuState {
    /**
     * loads the Cell summary, Illustrator and Source Refs
     * with the current iri
     * @param { iri } The iri which is in the url
     * @returns load An observable of void
     */
    load({ getState, patchState, dispatch }: Context, { iri }: Load): Observable<void> | void;
    /**
     * This Action computes the url and dispatches the LinkRegistry Action to add
     * the link to the registry for navigation
     */
    setIllustrationUrl({ dispatch }: Context, { iri }: SetIllustrationUrl): Observable<void> | void;
    /**
     * Action to clear the iri selections
     */
    clear({ patchState }: Context): void;
    /**
     * Action to reset the states for
     * Cell summary, Illustrator and Source Refs
     */
    reset({ dispatch }: Context): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActiveFtuState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActiveFtuState>;
}

/** selectors for ActiveftuState */
declare class ActiveFtuSelectors {
    /** checks if the Iri is set */
    static isActive({ iri }: ActiveFtuModel): boolean;
    /** gets the iri from the ActiveFtuModel */
    static iri({ iri }: ActiveFtuModel): Iri | undefined;
}

export { activeFtu_actions_d as ActiveFtuActions, ActiveFtuSelectors, ActiveFtuState, builtinFormatsIds_d as BuiltinFormat, cellSummary_actions_d as CellSummaryActions, CellSummarySelectors, CellSummaryState, download_action_d as DownloadActions, DownloadSelectors, DownloadState, HraStateModule, illustrator_actions_d as IllustratorActions, IllustratorSelectors, IllustratorState, linkIds_d as LinkIds, resourceIds_d as ResourceIds, resourceTypes_d as ResourceTypes, screenMode_actions_d as ScreenModeAction, ScreenModeSelectors, ScreenModeState, sourceRefs_actions_d as SourceRefsActions, SourceRefsSelectors, SourceRefsState, tissueLibrary_actions_d as TissueLibraryActions, TissueLibrarySelectors, TissueLibraryState };
export type { CellSummaryAggregate, CellSummaryAggregateRow, DownloadFormat, HraStateModuleOptions };
