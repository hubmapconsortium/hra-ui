import * as _angular_elements from '@angular/elements';
import * as _hra_ui_webcomponents from '@hra-ui/webcomponents';
import { InputProps } from '@hra-ui/webcomponents';
import * as _hra_ui_cde_visualization from '@hra-ui/cde-visualization';
import * as _hra_ui_node_dist_vis_models from '@hra-ui/node-dist-vis/models';
import { DataInput, AnyDataEntry, NodesInput, NodeKeysInput, EdgesInput, EdgeKeysInput, ColorMapInput, ColorMapKeysInput, AnyData, ColorMapView, NodeFilterView } from '@hra-ui/node-dist-vis/models';
import * as _angular_core from '@angular/core';
import { Signal, OutputEmitterRef, ViewContainerRef } from '@angular/core';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { NodeEvent } from '@hra-ui/node-dist-vis';
import * as rxjs from 'rxjs';
import { NextObserver, Observer, Observable } from 'rxjs';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { FileLoader, CsvFileLoaderOptions, FileLoaderEvent } from '@hra-ui/common/fs';

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
    /** Pixel size */
    pixelSize?: number;
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

/**
 * Manages loading states across multiple asynchronous operations.
 */
declare class LoadingManager {
    /** A BehaviorSubject holding an array of BehaviorSubjects representing individual loading states */
    private readonly observers$;
    /** An observable that emits a boolean indicating if any of the observers are in a loading state */
    readonly isLoading$: rxjs.Observable<boolean>;
    /**
     * Creates a new observer for tracking the loading state of an asynchronous operation.
     * @returns An Observer<boolean> that can be used to update the loading state.
     */
    createObserver(): Observer<boolean>;
}

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
    readonly nodeTargetSelector: _angular_core.InputSignal<string>;
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
    /** View container. Do NOT change the name. It is used by ngx-color-picker! */
    readonly vcRef: ViewContainerRef;
    /** Whether there are loading resources, etc. */
    protected loadingManager: LoadingManager;
    /** Sets the node target selector (uses default if not available) */
    private readonly nodeTargetSelectorWithDefault;
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
    /** List of selected cell types */
    readonly cellTypesSelection: _angular_core.WritableSignal<string[]>;
    /** Counter for resetting cell types */
    protected readonly cellTypesResetCounter: _angular_core.WritableSignal<number>;
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
    /** Computed distances between nodes */
    protected readonly distances: Signal<DistanceEntry[]>;
    /** Data for the histogram visualization */
    readonly filteredDistances: Signal<DistanceEntry[]>;
    /** Colors for the histogram visualization */
    protected readonly filteredColors: Signal<string[]>;
    /** Injected file saver service */
    private readonly fileSaver;
    /** Setup component */
    constructor();
    /** Reset cell types */
    resetCellTypes(): void;
    /** Update the color of a specific cell type entry */
    updateColor(entry: CellTypeEntry, color: Rgb): void;
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
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CdeVisualizationComponent, "cde-visualization-root", never, { "homeLink": { "alias": "homeLink"; "required": false; "isSignal": true; }; "nodes": { "alias": "nodes"; "required": false; "isSignal": true; }; "nodeKeys": { "alias": "nodeKeys"; "required": false; "isSignal": true; }; "nodeTargetSelector": { "alias": "nodeTargetSelector"; "required": false; "isSignal": true; }; "nodeTargetKey": { "alias": "nodeTargetKey"; "required": false; "isSignal": true; }; "nodeTargetValue": { "alias": "nodeTargetValue"; "required": false; "isSignal": true; }; "edges": { "alias": "edges"; "required": false; "isSignal": true; }; "edgeKeys": { "alias": "edgeKeys"; "required": false; "isSignal": true; }; "maxEdgeDistance": { "alias": "maxEdgeDistance"; "required": false; "isSignal": true; }; "colorMap": { "alias": "colorMap"; "required": false; "isSignal": true; }; "colorMapKeys": { "alias": "colorMapKeys"; "required": false; "isSignal": true; }; "colorMapKey": { "alias": "colorMapKey"; "required": false; "isSignal": true; }; "colorMapValue": { "alias": "colorMapValue"; "required": false; "isSignal": true; }; "metadata": { "alias": "metadata"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "organ": { "alias": "organ"; "required": false; "isSignal": true; }; "technology": { "alias": "technology"; "required": false; "isSignal": true; }; "sex": { "alias": "sex"; "required": false; "isSignal": true; }; "age": { "alias": "age"; "required": false; "isSignal": true; }; "thickness": { "alias": "thickness"; "required": false; "isSignal": true; }; "pixelSize": { "alias": "pixelSize"; "required": false; "isSignal": true; }; "creationTimestamp": { "alias": "creationTimestamp"; "required": false; "isSignal": true; }; "sourceFileName": { "alias": "sourceFileName"; "required": false; "isSignal": true; }; "colorMapFileName": { "alias": "colorMapFileName"; "required": false; "isSignal": true; }; }, { "nodeClick": "nodeClick"; "nodeHover": "nodeHover"; "nodesChange": "nodes"; "edgesChange": "edges"; "colorMapChange": "colorMap"; }, never, never, true, never>;
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
