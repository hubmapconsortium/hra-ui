import * as _angular_elements from '@angular/elements';
import * as _hra_ui_webcomponents from '@hra-ui/webcomponents';
import { InputProps } from '@hra-ui/webcomponents';
import * as _hra_ui_cde_visualization from '@hra-ui/cde-visualization';
import * as _hra_ui_node_dist_vis_models from '@hra-ui/node-dist-vis/models';
import { DataInput, NodesInput, NodeKeysInput, EdgesInput, EdgeKeysInput, ColorMapInput, ColorMapKeysInput, AnyData, ColorMapView, NodeFilterView, AnyDataEntry, ViewMode } from '@hra-ui/node-dist-vis/models';
import * as _angular_core from '@angular/core';
import { Signal, OutputEmitterRef } from '@angular/core';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { NodeEvent } from '@hra-ui/node-dist-vis';
import { NextObserver, Observable } from 'rxjs';
import { FileLoader, CsvFileLoaderOptions, FileLoaderEvent } from '@hra-ui/common/fs';
import { ConnectedPosition } from '@angular/cdk/overlay';

/** Identifiers for each downloadable file */
type DownloadFileId = 'cells' | 'cell-links' | 'color-map' | 'visualization' | 'violin-graph' | 'histogram';
/** File formats offered by the downloads drawer */
type DownloadFormat = 'csv' | 'png' | 'svg';
/** Request to download a single file in a single format */
interface DownloadRequest {
    /** File to download */
    file: DownloadFileId;
    /** Format to download the file in */
    format: DownloadFormat;
}
/** Files that can't be downloaded because they would be empty, and why */
interface UnavailableDownloads {
    /** Files to disable */
    files: DownloadFileId[];
    /** Notice explaining why the files are disabled */
    notice: string;
    /** Whether hidden panels disable some files, so the notice offers to show all panels */
    showPanels?: boolean;
}

/** Text content for an empty state */
interface EmptyStateContent {
    /** Heading */
    heading: string;
    /** Supporting text below the heading */
    description: string;
    /** Action button label */
    actionLabel: string;
}

/** Panels that the toolbar's Panels menu shows and hides, in layout order. The cell types panel always shows. */
declare const PANEL_IDS: readonly ["metadata", "distance-visualization", "violin-graph", "histogram"];
/** Id of a panel */
type PanelId = (typeof PANEL_IDS)[number];
/**
 * Tabs of the tabbed layout, in order: the cell types tab, the visualizations, and the metadata last.
 * Every tab but cell types shows when its panel does.
 */
declare const TAB_IDS: readonly ["cell-types", "distance-visualization", "violin-graph", "histogram", "metadata"];
/** Id of a tab */
type TabId = (typeof TAB_IDS)[number];

/** Color theme */
type Theme = 'light' | 'dark';
/** Theme menu choice: the page's theme (System settings), or the light or dark theme */
type ThemePreference = 'system' | Theme;
/**
 * Switches the visualization between the page's theme and the light and dark themes, like cde-ui's header theme menu.
 * It changes only the visualization: the color scheme of the visualization element and of the overlay container
 * that holds its menus, tooltips and fullscreen views, not the page's.
 * It starts on the page's theme and doesn't remember the choice.
 * Provided by the visualization's root component, whose element it switches.
 */
declare class ThemeSwitchService {
    /** Document, whose view transitions fade between the themes */
    private readonly document;
    /** Application, used to wait until every view has updated to the new theme */
    private readonly appRef;
    /** Visualization element */
    private readonly el;
    /** Overlay container, which holds the visualization's menus, tooltips and fullscreen views */
    private readonly overlayContainer;
    /** Changes when the page's color scheme might have changed */
    private readonly pageColorScheme;
    /** Theme the page gives the visualization */
    private readonly pageTheme;
    /** Theme menu choice, writable */
    private readonly preferenceSignal;
    /** Theme menu choice */
    readonly preference: _angular_core.Signal<ThemePreference>;
    /** Theme in effect */
    readonly theme: _angular_core.Signal<Theme>;
    /**
     * Switches to a theme menu choice. Where view transitions are supported, the visualization keeps showing
     * the old theme until everything, including the charts that redraw in the new colors, has updated,
     * then switches all at once.
     *
     * @param preference Theme menu choice
     */
    setPreference(preference: ThemePreference): void;
    /**
     * Reads the theme the page gives the visualization by resolving a `light-dark()` color in the element's parent,
     * which has the page's color scheme but not the theme menu choice
     *
     * @returns The page's theme. Environments that don't resolve `light-dark()`, such as jsdom, get the light theme.
     */
    private readPageTheme;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ThemeSwitchService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<ThemeSwitchService>;
}

/** Sheets that toolbar items open in the drawer */
type ToolbarSheet = 'downloads' | 'about';

/** Interface representing a cell type entry */
interface CellTypeEntry {
    /** Name of the cell type */
    name: string;
    /** Count of instances for this cell type */
    count: number;
    /** Count of number of outgoing edges */
    outgoingEdgeCount: number;
    /** RGB color associated with this cell type */
    color: Rgb;
}

/** Metadata input */
type MetadataInput = DataInput<Metadata>;
/** Signals for metadata properties */
type MetadataMixins = {
    [P in keyof Metadata]: Signal<Metadata[P] | undefined>;
};
/** Metadata */
interface Metadata {
    /** Name of the study the data comes from. Shows first, and only when set. */
    study?: string;
    /** Url of the study's page, which the study name links to */
    studyUrl?: string;
    /** Title of the visualization */
    title?: string;
    /** Name of the organ */
    organ?: string;
    /** Technology */
    technology?: string;
    /** Sex */
    sex?: string;
    /** Age */
    age?: number;
    /** Thickness */
    thickness?: number;
    /** Pixel size, or the size of each axis when they differ (for example "0.65 × 0.65 × 2") */
    pixelSize?: number | string;
    /** Creation timestamp (ms since 1/1/1970 UTC) */
    creationTimestamp?: number;
    /** Name of the source file */
    sourceFileName?: string;
    /** Name of the colormap file */
    colorMapFileName?: string;
    /** Extra metadata for example datasets */
    sampleExtra?: SampleMetadataExtra;
}
/** Extra sample metadata (used by example datasets) */
interface SampleMetadataExtra {
    /** Sample type, generally '2D' or '3D' */
    type: string;
    /** Organ name */
    organ: string;
    /** Data file url*/
    sampleUrl: string;
    /** Source Data Sheet url */
    sourceDataUrl: string;
}
/**
 * Function to load metadata.
 * @param input - Signal representing the metadata input.
 * @param mixins - Object containing signals for each metadata property.
 * @param loading - Optional observer to track loading state.
 * @returns Signal representing the loaded metadata.
 */
declare function loadMetadata(input: Signal<MetadataInput>, mixins: MetadataMixins, loading?: NextObserver<boolean>): Signal<Metadata>;

/** Interface for representing the distance entry */
interface DistanceEntry {
    /** Source edge */
    edge: AnyDataEntry;
    /** Type of the entry */
    type: string;
    /** Distance value of the entry */
    distance: number;
}
/**
 * CDE Visualization Root Component
 */
declare class CdeVisualizationComponent {
    /** Link to the home page */
    readonly homeLink: _angular_core.InputSignal<string>;
    /** Node data */
    readonly nodes: _angular_core.InputSignal<NodesInput>;
    /** Node key mapping data */
    readonly nodeKeys: _angular_core.InputSignal<NodeKeysInput>;
    /** Node target selector used when calculating edges */
    readonly nodeTargetSelector: _angular_core.InputSignal<string | undefined>;
    /**
     * Column/property of the node's 'Cell Type' values
     *
     * @deprecated Use `nodeKeys` to specify the column instead
     */
    readonly nodeTargetKey: _angular_core.InputSignal<string | undefined>;
    /**
     * Node target selector used when calculating edges
     *
     * @deprecated Use `nodeTargetSelector` instead
     */
    readonly nodeTargetValue: _angular_core.InputSignal<string | undefined>;
    /** Edge data if already calculated */
    readonly edges: _angular_core.InputSignal<EdgesInput>;
    /** Edge key mapping data */
    readonly edgeKeys: _angular_core.InputSignal<EdgeKeysInput>;
    /** Max distance to consider when calculating edges */
    readonly maxEdgeDistance: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Color map data */
    readonly colorMap: _angular_core.InputSignal<ColorMapInput>;
    /** Color map key mapping data */
    readonly colorMapKeys: _angular_core.InputSignal<ColorMapKeysInput>;
    /**
     * Column/property of the color map's 'Cell Type' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    readonly colorMapKey: _angular_core.InputSignal<string | undefined>;
    /**
     * Column/property of the color map's 'Cell Color' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    readonly colorMapValue: _angular_core.InputSignal<string | undefined>;
    /** Input metadata */
    readonly metadata: _angular_core.InputSignal<MetadataInput>;
    /** Study the data comes from, shown first in the metadata panel */
    readonly study: _angular_core.InputSignal<string | undefined>;
    /** Url of the study's page, which the study name links to */
    readonly studyUrl: _angular_core.InputSignal<string | undefined>;
    /** Title of the visualization */
    readonly title: _angular_core.InputSignal<string | undefined>;
    /** Organ being visualized */
    readonly organ: _angular_core.InputSignal<string | undefined>;
    /** Technology used in the visualization */
    readonly technology: _angular_core.InputSignal<string | undefined>;
    /** Sex of the subject */
    readonly sex: _angular_core.InputSignal<string | undefined>;
    /** Age of the subject */
    readonly age: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Thickness of the sample */
    readonly thickness: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Pixel size in the visualization */
    readonly pixelSize: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Creation timestamp (ms since 1/1/1970 UTC) */
    readonly creationTimestamp: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Name of data source file */
    readonly sourceFileName: _angular_core.InputSignal<string | undefined>;
    /** Name of color map file */
    readonly colorMapFileName: _angular_core.InputSignal<string | undefined>;
    /** Hides the toolbar's Theme menu, for pages that switch the theme themselves */
    readonly hideThemeMenu: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Hides the toolbar's Help menu, for pages that link to help themselves */
    readonly hideHelpMenu: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Panels hidden at first and after Reset everything, as an array or a comma or space separated list of
     * metadata, distance-visualization, violin-graph and histogram. The cell types panel always shows.
     */
    readonly hiddenPanels: _angular_core.InputSignalWithTransform<("metadata" | "distance-visualization" | "violin-graph" | "histogram")[], unknown>;
    /** Remembers the panels shown and hidden from the toolbar in this browser's local storage */
    readonly rememberPanels: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Event emitted when a node is clicked */
    readonly nodeClick: OutputEmitterRef<NodeEvent>;
    /** Event emitted when a node is hovered */
    readonly nodeHover: OutputEmitterRef<NodeEvent | undefined>;
    /** Emits nodes change */
    readonly nodesChange: OutputEmitterRef<AnyData>;
    /** Emits edges change */
    readonly edgesChange: OutputEmitterRef<AnyData>;
    /** Emits color map change */
    readonly colorMapChange: OutputEmitterRef<AnyData>;
    /** Whether the nodes are loading */
    protected readonly nodesLoading: _angular_core.WritableSignal<boolean>;
    /** Whether the edges are loading */
    private readonly edgesLoading;
    /** Whether the edges are being generated from the nodes */
    private readonly edgesGenerating;
    /** Whether the color map is loading */
    private readonly colorMapLoading;
    /** Whether the metadata is loading */
    protected readonly metadataLoading: _angular_core.WritableSignal<boolean>;
    /** Whether the cell types are loading. They come from the nodes and the color map. */
    protected readonly cellTypesLoading: Signal<boolean>;
    /** Whether the distances are loading. They need the nodes and the loaded or generated edges. */
    protected readonly distancesLoading: Signal<boolean>;
    /** Whether any data is loading */
    private readonly anyLoading;
    /** Sets the node target selector (uses default if not available) */
    protected readonly nodeTargetSelectorWithDefault: Signal<string>;
    /** View of the node data */
    protected readonly nodesView: Signal<_hra_ui_node_dist_vis_models.NodesView>;
    /** View of the edge data */
    protected readonly edgesView: Signal<_hra_ui_node_dist_vis_models.EdgesView>;
    /** View of the color map */
    protected readonly colorMapView: Signal<ColorMapView>;
    /** Combined metadata */
    protected readonly metadataView: Signal<_hra_ui_cde_visualization.Metadata>;
    /** Filter for node data */
    readonly nodeFilterView: _angular_core.WritableSignal<NodeFilterView>;
    /** List of cell types */
    readonly cellTypes: _angular_core.WritableSignal<CellTypeEntry[]>;
    /** All cells color picked in the histogram, or undefined to use the theme's color */
    protected readonly allCellsColor: _angular_core.WritableSignal<Rgb | undefined>;
    /** List of selected cell types */
    readonly cellTypesSelection: _angular_core.WritableSignal<string[]>;
    /** Computed cell types as color map entries */
    protected readonly cellTypesAsColorMap: Signal<ColorMapView>;
    /** Function that gets the node type from an edge */
    private readonly edgeTypeAccessor;
    /** Gets current node counts */
    private readonly nodeCounts;
    /** Gets current edge counts */
    private readonly edgeCounts;
    /** Gets edge counts by source node */
    private readonly edgeCountsBySourceNode;
    /** Gets cell type entries from nodes */
    private readonly cellTypesFromNodes;
    /** Adjustments for cell type counts */
    readonly countAdjustments: Signal<Record<string, {
        count: number;
        outgoingEdgeCount: number;
    }>>;
    /** Computed selection of cell types from nodes */
    protected readonly cellTypesSelectionFromNodes: Signal<string[]>;
    /** Effect to create cell types */
    readonly cellTypesCreateRef: _angular_core.EffectRef;
    /** List of filtered cell types based on selection */
    protected readonly filteredCellTypes: Signal<CellTypeEntry[]>;
    /** Whether the cell types have loaded and none of them are selected, so every panel is empty */
    private readonly noCellTypesSelected;
    /**
     * Whether there are cell types besides the anchor type but none of them are selected.
     * The charts leave the anchor type out, so they have no distances to show.
     */
    private readonly noDistancesSelected;
    /** Empty state for the distance visualization */
    protected readonly visualizationEmptyState: Signal<EmptyStateContent | undefined>;
    /** Empty state for the violin graph and histogram */
    protected readonly chartsEmptyState: Signal<EmptyStateContent | undefined>;
    /**
     * Files that would be empty with the current selection, and images of hidden panels,
     * so the downloads drawer disables them
     */
    protected readonly unavailableDownloads: Signal<UnavailableDownloads | undefined>;
    /** Computed distances between nodes */
    protected readonly distances: Signal<DistanceEntry[]>;
    /** Data for the histogram visualization */
    readonly filteredDistances: Signal<DistanceEntry[]>;
    /** Colors for the histogram visualization */
    protected readonly filteredColors: Signal<string[]>;
    /** Whether the distance visualization hides cell links. Set from the toolbar and the fullscreen menu. */
    protected readonly edgesDisabled: _angular_core.WritableSignal<boolean>;
    /** Whether the cell types table shows the cell link columns */
    protected readonly showCellLinkData: _angular_core.WritableSignal<boolean>;
    /** Whether the metadata panel shows every field, including empty ones */
    protected readonly showAllMetadata: _angular_core.WritableSignal<boolean>;
    /** Distance visualization's view mode */
    protected readonly viewMode: _angular_core.WritableSignal<ViewMode>;
    /** Panels hidden from the toolbar, starting from the remembered panels or the hiddenPanels input */
    protected readonly panelsHidden: _angular_core.WritableSignal<("metadata" | "distance-visualization" | "violin-graph" | "histogram")[]>;
    /** Host element */
    private readonly elementRef;
    /** Width of the visualization, which picks between the panel and tabbed layouts */
    private readonly width;
    /** Whether the panels show as tabs. A visualization that isn't laid out yet (0 wide) keeps the panel layout. */
    protected readonly tabbed: Signal<boolean>;
    /** Whether the visualization is phone-sized: the toolbar runs along the bottom and the controls get compact */
    protected readonly compact: Signal<boolean>;
    /**
     * Panels hidden in the current layout. The tabs have no Panels menu, so they follow only the hiddenPanels input,
     * and panels hidden from the toolbar apply to the panel layout.
     */
    protected readonly layoutHiddenPanels: Signal<("metadata" | "distance-visualization" | "violin-graph" | "histogram")[]>;
    /** Tabs that show: the cell types tab and the tabs of the panels that the hiddenPanels input doesn't hide */
    protected readonly tabs: Signal<("metadata" | "distance-visualization" | "violin-graph" | "histogram" | "cell-types")[]>;
    /** Tab picked in the tab bar */
    protected readonly selectedTab: _angular_core.WritableSignal<"metadata" | "distance-visualization" | "violin-graph" | "histogram" | "cell-types" | undefined>;
    /** Tab that shows: the picked tab while it's available, otherwise the distance visualization or the cell types */
    protected readonly activeTab: Signal<"metadata" | "distance-visualization" | "violin-graph" | "histogram" | "cell-types">;
    /** Panel open in full screen. It becomes the active tab if the panels switch to tabs. */
    protected readonly fullscreenPanel: _angular_core.WritableSignal<"metadata" | "distance-visualization" | "violin-graph" | "histogram" | "cell-types" | undefined>;
    /** Name of the tab bar */
    protected readonly tabsLabel = "Panels";
    /** Labels of the tabs */
    protected readonly tabLabels: Record<"metadata" | "distance-visualization" | "violin-graph" | "histogram" | "cell-types", string>;
    /** Prefix of this visualization's tab ids */
    private readonly tabIdPrefix;
    /**
     * Which panels show, and whether the top row and the visualizations column still have a panel showing.
     * In the tabbed layout, only the active tab's panels show.
     */
    protected readonly layout: Signal<{
        sidebar: boolean;
        cellTypes: boolean;
        metadata: boolean;
        distanceVisualization: boolean;
        violinGraph: boolean;
        histogram: boolean;
        topRow: boolean;
        visualizations: boolean;
    }>;
    /** Whether the metadata has fields that only show with all metadata */
    protected readonly hasHiddenMetadata: Signal<boolean>;
    /** Whether any cells were deleted from the distance visualization */
    protected readonly hasDeletedCells: Signal<boolean>;
    /** Sheet that's open in the drawer, if any. The toolbar's Downloads and Info items open it */
    protected readonly openSheet: _angular_core.WritableSignal<ToolbarSheet | undefined>;
    /** Sheet shown in the drawer. Keeps the last open sheet while the drawer closes, so it doesn't vanish mid-animation */
    protected readonly sheet: _angular_core.WritableSignal<ToolbarSheet>;
    /** Injected file saver service */
    private readonly fileSaver;
    /** Announces the charts' empty state to screen readers */
    private readonly liveAnnouncer;
    /** Switches the visualization between the page's theme and the light and dark themes */
    protected readonly themeSwitch: ThemeSwitchService;
    /** Downloads sheet, while it's the drawer's sheet */
    private readonly downloadsSheet;
    /** About sheet, while it's the drawer's sheet */
    private readonly aboutSheet;
    /** Id of the sheet's title, which labels the drawer */
    protected readonly sheetLabelledBy: Signal<string | undefined>;
    /** Ids of the elements that describe the drawer */
    protected readonly sheetDescribedBy: Signal<string | undefined>;
    /** Distance visualization panel */
    private readonly nodeDistVisualizationComponent;
    /** Violin graph panel */
    private readonly violinComponent;
    /** Histogram panel */
    private readonly histogramComponent;
    /** Shows the snackbars that undo a reset */
    private readonly snackbar;
    /** Application, used to wait for a tab to render before downloading its image */
    private readonly appRef;
    /** Setup component */
    constructor();
    /** Selects every cell type, like the cell types table's select all checkbox */
    selectAllCellTypes(): void;
    /** Update the color of a specific cell type entry */
    updateColor(entry: CellTypeEntry, color: Rgb): void;
    /** Resets the distance visualization's view */
    resetView(): void;
    /** Restores the cells deleted from the distance visualization */
    restoreDeletedCells(): void;
    /**
     * Resets every cell type's color and the all cells color. The cell type selection stays.
     * A snackbar offers to undo the reset, as long as the data hasn't changed since.
     */
    resetColors(): void;
    /** Shows and hides panels, and remembers them if rememberPanels is set */
    protected setHiddenPanels(panels: PanelId[]): void;
    /** Shows every panel from the downloads notice, and announces it since the notice's button goes away */
    protected showAllPanels(): void;
    /**
     * Resets the view, panels, deleted cells and colors, selects every cell type, restores the default display
     * options, and switches the distance visualization back to explore. Panels go back to the hiddenPanels input.
     * A snackbar offers to undo everything but the view, as long as the data hasn't changed since.
     */
    resetEverything(): void;
    /** Gives every cell type its default color and the all cells color back to the theme */
    private useDefaultColors;
    /** Opens a snackbar whose Undo action calls `undo`, unless the data has changed since */
    private openUndoSnackbar;
    /** Downloads the requested file */
    handleDownload({ file, format }: DownloadRequest): Promise<void>;
    /**
     * Id of a tab in the tab bar, which also labels the tab panel
     *
     * @param tab Tab to get the id of
     * @returns The tab's id
     */
    protected tabLinkId(tab: TabId): string;
    /**
     * Shows a panel's tab before its image downloads. The charts in other tabs aren't laid out, so they have no size
     * to draw at.
     *
     * @param tab Tab of the panel
     */
    private showTab;
    /** Downloads nodes */
    downloadNodes(): Promise<void>;
    /** Downloads edges */
    downloadEdges(): Promise<void>;
    /** Downloads color map */
    downloadColorMap(): Promise<void>;
    /** Downlaods view */
    private downloadView;
    /** Compute distances between nodes based on edges */
    private computeDistances;
    /** Compute data for the violin visualization */
    private computeFilteredDistances;
    /** Compute colors for the violin visualization */
    private computeFilteredColors;
    /** Binds data output */
    private bindDataOutput;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CdeVisualizationComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CdeVisualizationComponent, "cde-visualization-root", never, { "homeLink": { "alias": "homeLink"; "required": false; "isSignal": true; }; "nodes": { "alias": "nodes"; "required": false; "isSignal": true; }; "nodeKeys": { "alias": "nodeKeys"; "required": false; "isSignal": true; }; "nodeTargetSelector": { "alias": "nodeTargetSelector"; "required": false; "isSignal": true; }; "nodeTargetKey": { "alias": "nodeTargetKey"; "required": false; "isSignal": true; }; "nodeTargetValue": { "alias": "nodeTargetValue"; "required": false; "isSignal": true; }; "edges": { "alias": "edges"; "required": false; "isSignal": true; }; "edgeKeys": { "alias": "edgeKeys"; "required": false; "isSignal": true; }; "maxEdgeDistance": { "alias": "maxEdgeDistance"; "required": false; "isSignal": true; }; "colorMap": { "alias": "colorMap"; "required": false; "isSignal": true; }; "colorMapKeys": { "alias": "colorMapKeys"; "required": false; "isSignal": true; }; "colorMapKey": { "alias": "colorMapKey"; "required": false; "isSignal": true; }; "colorMapValue": { "alias": "colorMapValue"; "required": false; "isSignal": true; }; "metadata": { "alias": "metadata"; "required": false; "isSignal": true; }; "study": { "alias": "study"; "required": false; "isSignal": true; }; "studyUrl": { "alias": "studyUrl"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "organ": { "alias": "organ"; "required": false; "isSignal": true; }; "technology": { "alias": "technology"; "required": false; "isSignal": true; }; "sex": { "alias": "sex"; "required": false; "isSignal": true; }; "age": { "alias": "age"; "required": false; "isSignal": true; }; "thickness": { "alias": "thickness"; "required": false; "isSignal": true; }; "pixelSize": { "alias": "pixelSize"; "required": false; "isSignal": true; }; "creationTimestamp": { "alias": "creationTimestamp"; "required": false; "isSignal": true; }; "sourceFileName": { "alias": "sourceFileName"; "required": false; "isSignal": true; }; "colorMapFileName": { "alias": "colorMapFileName"; "required": false; "isSignal": true; }; "hideThemeMenu": { "alias": "hideThemeMenu"; "required": false; "isSignal": true; }; "hideHelpMenu": { "alias": "hideHelpMenu"; "required": false; "isSignal": true; }; "hiddenPanels": { "alias": "hiddenPanels"; "required": false; "isSignal": true; }; "rememberPanels": { "alias": "rememberPanels"; "required": false; "isSignal": true; }; }, { "nodeClick": "nodeClick"; "nodeHover": "nodeHover"; "nodesChange": "nodes"; "edgesChange": "edges"; "colorMapChange": "colorMap"; }, never, never, true, never>;
}

/** Brand type key. No need to initialize */
declare const BRAND: unique symbol;
/** A brand that can be attached to different type to model nominal typing */
type Brand<T extends string | number | symbol> = {
    [BRAND]: {
        [P in T]: true;
    };
};

/** Type representing a key for color map types, enhanced with a branding mechanism */
type ColorMapTypeKey = string & Brand<'ColorMapTypeKey'>;
/** Type representing a key for color map colors, enhanced with a branding mechanism */
type ColorMapColorKey = string & Brand<'ColorMapValueKey'>;
/** Interface representing a color map entry */
interface ColorMapEntry {
    /** Key for the type in the color map */
    [key: ColorMapTypeKey]: string;
    /** Key for the corresponding RGB color in the color map */
    [value: ColorMapColorKey]: Rgb;
}
/** Default key for the color map type */
declare const DEFAULT_COLOR_MAP_KEY: ColorMapTypeKey;
/** Default key for the color map value */
declare const DEFAULT_COLOR_MAP_VALUE_KEY: ColorMapColorKey;
/** Converts a color map array to a lookup map for quick access */
declare function colorMapToLookup(colorMap: ColorMapEntry[], typeKey: ColorMapTypeKey, colorKey: ColorMapColorKey): Map<string, Rgb>;

/** Tooltip positions on the right side. */
declare const TOOLTIP_POSITION_RIGHT_SIDE: ConnectedPosition[];
/** Tooltip positions on the left side. */
declare const TOOLTIP_POSITION_LEFT_SIDE: ConnectedPosition[];
/** Tooltip positions below. */
declare const TOOLTIP_POSITION_BELOW: ConnectedPosition[];
/** Tooltip positions for color picker labels. */
declare const TOOLTIP_POSITION_COLOR_PICKER_LABEL: ConnectedPosition[];

/** Service to load color map entries from CSV files */
declare class ColorMapFileLoaderService implements FileLoader<ColorMapEntry[], CsvFileLoaderOptions> {
    /** CSV loader service for handling CSV file loading */
    private readonly csvLoader;
    /** Loads a color map file and returns an observable of the loading events */
    load(file: string | File, options: CsvFileLoaderOptions): Observable<FileLoaderEvent<ColorMapEntry[]>>;
    /** Parses the raw CSV data into an array of ColorMapEntry objects */
    private parseColorMapEntries;
    /**
     * Parses a color value string into an array of RGB values or returns the original string if it cannot be parsed.
     *
     * @param value Value to parse
     * @param type Format of the color value ('hex' or 'rgb')
     * @returns An array of RGB values if the value is valid, or the original string if it cannot be parsed
     */
    private parseColorValue;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ColorMapFileLoaderService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<ColorMapFileLoaderService>;
}

/** Input properties for CdeVisualizationComponent */
type CdeVisualizationElementProps = InputProps<CdeVisualizationComponent>;
/** Type for CdeVisualizationElement instance */
type CdeVisualizationElement = InstanceType<Awaited<typeof CdeVisualizationElement>>;
/** Custom element definition for CdeVisualizationComponent */
declare const CdeVisualizationElement: Promise<_angular_elements.NgElementConstructor<InputProps<CdeVisualizationComponent> & _hra_ui_webcomponents.NgElementExtensions<CdeVisualizationComponent>>>;

export { CdeVisualizationComponent, CdeVisualizationElement, ColorMapFileLoaderService, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY, TOOLTIP_POSITION_BELOW, TOOLTIP_POSITION_COLOR_PICKER_LABEL, TOOLTIP_POSITION_LEFT_SIDE, TOOLTIP_POSITION_RIGHT_SIDE, colorMapToLookup, loadMetadata };
export type { CdeVisualizationElementProps, ColorMapColorKey, ColorMapEntry, ColorMapTypeKey, DistanceEntry, Metadata, MetadataInput, MetadataMixins, SampleMetadataExtra };
