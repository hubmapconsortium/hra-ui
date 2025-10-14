import * as i0 from '@angular/core';
import { TemplateRef, OnChanges, OnDestroy, EventEmitter, SimpleChanges, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { SVGScriptEvalMode } from 'ng-inline-svg-2';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { TableRow, TableComponent, TableColumn } from '@hra-ui/design-system/table';
import * as _hra_ui_services from '@hra-ui/services';
import { Iri, IllustrationMappingItem } from '@hra-ui/services';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import * as _hra_ui_cdk_state from '@hra-ui/cdk/state';
import { LinkId } from '@hra-ui/cdk/state';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { DataItem } from '@hra-ui/design-system/info-modal';
import * as _hra_ui_utils_types from '@hra-ui/utils/types';
import * as zod from 'zod';
import { CellSummaryAggregate } from '@hra-ui/state';
import * as _angular_router from '@angular/router';

/**
 *  Component for any empty biomaker cell
 *  to inform about the empty data and has
 *  button to navigate to HRA Team.
 */
declare class EmptyBiomarkerComponent {
    /** Text to display for the empty behavior button */
    readonly emptyBehaviorText: i0.InputSignal<string>;
    /** Snackbar service */
    private readonly snackbar;
    /** Shows the copied snackbar message */
    protected showCopiedMessage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EmptyBiomarkerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EmptyBiomarkerComponent, "ftu-empty-biomarker", never, { "emptyBehaviorText": { "alias": "emptyBehaviorText"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** An interface of gradient colors along with their percentages for the gradient bar. */
interface GradientPoint {
    /** Gradient color at a specific percentage */
    color: string;
    /** Percentage point along the gradient bar */
    percentage: number;
}
/** Gradient legend for biomarkers */
declare class GradientLegendComponent {
    /** Gradient colors along with their stop points */
    gradient: GradientPoint[];
    /** Computes the css linear-gradient function for the gradient bar */
    get gradientCss(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<GradientLegendComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GradientLegendComponent, "ftu-gradient-legend", never, { "gradient": { "alias": "gradient"; "required": false; }; }, {}, never, never, true, never>;
}

/** Label box component for reuse accross the page. The content with "end" selector will be added to the end of the label box */
declare class LabelBoxComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LabelBoxComponent, "ftu-label-box", never, {}, {}, never, ["*", ".end"], true, never>;
}

/** Defining the input data types for the radius and label to be displayed. */
interface SizeLegend {
    /** Label under circle */
    label: string;
    /** Radius for cirlce */
    radius: number;
}
/** Size legend component for the biomarkers table. */
declare class SizeLegendComponent {
    /** Taking input for the radius of the circle and the label to be displayed. */
    sizes: i0.InputSignal<SizeLegend[]>;
    /** Filtered sizes of size legend component */
    filteredSizes: i0.Signal<SizeLegend[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SizeLegendComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SizeLegendComponent, "ftu-size-legend", never, { "sizes": { "alias": "sizes"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Tooltips for illustrations
 */
declare class TooltipComponent {
    /**
     * Text to display
     */
    text: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipComponent, "ftu-ui-tooltip", never, { "text": { "alias": "text"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Describes the data icon for the table
 */
declare class BiomarkerTableDataIconComponent {
    /** Represents the color of the icon */
    color: string;
    /** Represents the size of the icon  */
    size: number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BiomarkerTableDataIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BiomarkerTableDataIconComponent, "ftu-biomarker-table-data-icon", never, { "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

/** A component that wraps any child components of type FullscreenContentComponent and
 * sets their isFullScreen property to true or false based on its own fullscreen input property
 */
declare class FullscreenContainerComponent {
    /**
     * Illustration template of fullscreen container component
     */
    readonly illustrationTemplate: i0.InputSignal<TemplateRef<unknown> | null>;
    /**
     * Biomarker template of fullscreen container component
     */
    readonly biomarkerTemplate: i0.InputSignal<TemplateRef<unknown> | null>;
    /**
     * Source list template of fullscreen container component
     */
    readonly sourceListTemplate: i0.InputSignal<TemplateRef<unknown> | null>;
    /** A boolean input property that controls the fullscreen mode */
    readonly fullscreen: i0.InputSignal<boolean>;
    /**
     * Fullscreentab index of fullscreen container component
     */
    readonly fullscreentabIndex: i0.ModelSignal<number>;
    /**
     * Close fullscreen of fullscreen container component
     */
    readonly closeFullscreen: i0.OutputEmitterRef<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FullscreenContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FullscreenContainerComponent, "ftu-fullscreen-container", never, { "illustrationTemplate": { "alias": "illustrationTemplate"; "required": false; "isSignal": true; }; "biomarkerTemplate": { "alias": "biomarkerTemplate"; "required": false; "isSignal": true; }; "sourceListTemplate": { "alias": "sourceListTemplate"; "required": false; "isSignal": true; }; "fullscreen": { "alias": "fullscreen"; "required": false; "isSignal": true; }; "fullscreentabIndex": { "alias": "fullscreentabIndex"; "required": false; "isSignal": true; }; }, { "fullscreentabIndex": "fullscreentabIndexChange"; "closeFullscreen": "closeFullscreen"; }, never, never, true, never>;
}

/** Node tooltip data */
interface NodeTooltipData {
    /** Node name */
    node: string;
    /** Center point of hovered node in screen coordinates */
    origin: {
        x: number;
        y: number;
    };
}
/** Interface for node entries */
interface NodeMapEntry {
    /** Node label */
    label: string;
    /** Node id in svg */
    id: string;
    /** Node group id */
    groupId: string;
    /** Ontology id of cell type */
    ontologyId: string;
}
/**
 * Interactive SVG component
 */
declare class InteractiveSvgComponent<T extends NodeMapEntry> implements OnChanges, OnDestroy {
    /** SVG url */
    url?: string;
    /** Mapping info */
    mapping: T[];
    /** Highlighted ontology id */
    highlightId?: string;
    /** Emits node id when hovered */
    readonly nodeHover: EventEmitter<T | undefined>;
    /** Emits node id when clicked */
    readonly nodeClick: EventEmitter<T>;
    /** SVG script eval mode */
    readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
    /** Tooltip position settings */
    readonly TOOLTIP_POSITIONS: ConnectedPosition[];
    /** Observable of node hover data or undefined when there is no active hover */
    readonly nodeHoverData$: BehaviorSubject<NodeTooltipData | undefined>;
    /** Observable of node hover with a timer */
    readonly nodeHoverDelayedData$: Observable<NodeTooltipData | undefined>;
    /** Custom renderer */
    private readonly renderer;
    /** Destroys */
    private destroy$;
    /** Crosswalk element of svg */
    private crosswalkEl?;
    /** List of highlighted svg elements */
    private highlightedElements;
    /**
     * Updates the highlighting based on current highlight id
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Highlights cells that match highlightId
     */
    private setHighlight;
    /**
     * Resets all highlighted elements in the svg
     */
    private resetHighlight;
    /**
     * Clears observables on destroy
     */
    ngOnDestroy(): void;
    /**
     * Sets SVG element
     * @param el SVG element
     */
    setSvgElement(el: SVGElement): void;
    /**
     * Removes underscores from id
     * @param name Node name
     * @returns node name without underscores
     */
    formatNodeName(name: string): string;
    /**
     * Attaches crosswalk hover
     * @param el element
     */
    private attachCrosswalkHover;
    /**
     * Finds matching node in data from a hovered element
     * @param event Mouse event
     */
    private onCrosswalkHover;
    /**
     * Clears observables
     */
    private clear;
    /**
     * Returns entry from mapping if target, parent, or grandparent id matches the node name
     * @param event Event
     * @returns Node entry that matches the target id
     */
    private getNode;
    /**
     * Decodes id into a normal string
     * @param id Undecoded ID
     * @returns id
     */
    private decodeId;
    /**
     * Turns normal string into decoded SVG id
     * @param id id
     * @returns Encoded id
     */
    private encodeId;
    /**
     * Attaches an event listener
     * @template K
     * @param el Element
     * @param event Event
     * @returns Observable
     */
    private attachEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<InteractiveSvgComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InteractiveSvgComponent<any>, "ftu-interactive-svg", never, { "url": { "alias": "url"; "required": false; }; "mapping": { "alias": "mapping"; "required": false; }; "highlightId": { "alias": "highlightId"; "required": false; }; }, { "nodeHover": "nodeHover"; "nodeClick": "nodeClick"; }, never, never, true, never>;
}

/** SourceListItem interface contains title and link to the dataset for the SourceList*/
interface SourceListItem extends TableRow {
    /** Unique identifier for the source */
    id: Iri;
    /** List of authors for the source */
    authors: string[];
    /** Year dataset was released */
    year: number;
    /** Title of the dataset in the SourceList */
    title: string;
    /** DOI of dataset */
    doi: string;
    /** Label of the dataset in the SourceList */
    label: string;
    /** Link to the dataset in the SourceList */
    link: string;
}
/** This component shows list of sources with title and links to the datasets */
declare class SourceListComponent implements OnChanges {
    /** List of sources with titles and links displayed to the user */
    sources: SourceListItem[];
    /** Text that appears in the empty biomarker message */
    message: string;
    /** Whether to hide the title of the source list */
    readonly hideTitle: i0.InputSignal<boolean>;
    /** Fullscreen service */
    private readonly fullscreenService;
    /** Whether to show the biomarker table */
    showTable: i0.WritableSignal<boolean>;
    /** Number of selected sources */
    selectedCount: i0.WritableSignal<number>;
    /** Emits when source selection changed */
    readonly selectionChanged: EventEmitter<SourceListItem[]>;
    /** Reference to the table component */
    sourceTable: TableComponent<TableRow>;
    /** Table columns configuration */
    readonly tableColumns: TableColumn[];
    /** Opens the source list in fullscreen mode */
    openSourceListFullscreen(): void;
    /** On sources change, resets selection and selects all sources */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * It changes the value of showTable to false if value it true
     * and vice versa
     */
    toggleTable(): void;
    /**
     * Handle selection changes from the table
     */
    onSelectionChange(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SourceListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SourceListComponent, "ftu-source-list", never, { "sources": { "alias": "sources"; "required": false; }; "message": { "alias": "message"; "required": false; }; "hideTitle": { "alias": "hideTitle"; "required": false; "isSignal": true; }; }, { "selectionChanged": "selectionChanged"; }, never, never, true, never>;
}

/** Base node type */
interface DataNode<K extends string> {
    /** User readable label */
    label: string;
    /** Id to pass as a query parameter on navigation */
    id?: string;
    /** Link to navigate to on node click */
    link?: LinkId;
    /** Nested nodes */
    children?: K[];
}
/**
 * Internal interface for flat tissue data hierarchy
 */
interface InternalNode<K extends string, T extends DataNode<K>> {
    /** Displayed label */
    label: string;
    /** Whether the node can be expanded to display child nodes */
    expandable: boolean;
    /** Depth of node in the tree */
    level: number;
    /** Associated user node data */
    data: T;
}
/**
 * Tabular View for hubMap tissue side-bar
 */
declare class TissueTreeListComponent<K extends string, T extends DataNode<K>> implements OnChanges {
    /**
     * Input  of tissue tree list component
     */
    nodes: Record<K, T>;
    /**
     * Node selected, to view the data associated with it
     */
    selected?: T;
    /**
     * Output  of tissue tree list component
     */
    readonly selectedChange: EventEmitter<T | undefined>;
    /**
     * Navigates to an illustration page
     */
    readonly navigate: EventEmitter<any>;
    /**
     * Whether keyboard navigation is enabled
     */
    enableNav: boolean;
    /**
     * tree controller, used to control the nodes in the tree
     */
    readonly control: FlatTreeControl<InternalNode<K, T>, InternalNode<K, T>>;
    /**
     * Flattener of tissue tree list component, returns flat-data structure
     */
    readonly flattener: MatTreeFlattener<T, InternalNode<K, T>, InternalNode<K, T>>;
    /**
     * Data source of tissue tree list component, defines the data in mat-tree
     */
    readonly dataSource: MatTreeFlatDataSource<T, InternalNode<K, T>, InternalNode<K, T>>;
    /**
     * Take actions if any data changes
     * @param changes changes in data
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * check if the current node has children
     * @param node current selected node
     * @returns boolean, which means if node has children
     */
    hasChild(_: number, node: InternalNode<K, T>): boolean;
    /**
     * It selects the node, which is clicked.
     * @param node Tissue Tree Item, which is clicked
     */
    selectNode(node: T): void;
    /**
     * Resets selection and collapes all nodes of the tree.
     */
    resetSelection(): void;
    /**
     * It creates a copy of the input nodes object.
     * It iterates over it and removes all the children nodes from it.
     * @returns remaining nodes which are root nodes.
     */
    private findRootNodes;
    /**
     * expands the tree nodes based on the path provided.
     * @param path is given as an input.
     */
    private expandPath;
    /**
     * It used the logic of depth first search to find the target node.
     * returns the path to the target node.
     */
    private dfsFindPath;
    /**
     * Keyboard navigation for tissue tree list
     * @param event Keyboard event
     */
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Disable keyboard nav on click
     */
    handlePageClick(): void;
    /**
     * Enables keyboard nav only if the tissue tree list is clicked
     * @param event Click event
     */
    handleListClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TissueTreeListComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TissueTreeListComponent<any, any>, "ftu-tissue-tree-list", never, { "nodes": { "alias": "nodes"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "selectedChange": "selectedChange"; "navigate": "navigate"; }, never, never, true, never>;
}

/**
 * RGBTriblet of type RGB to store color
 */
type RGBTriplet = [number, number, number];
/**
 * An interface representing a single cell of the table.
 */
interface DataCell {
    /** Represents the color of the icon */
    color: string;
    /** Represents the size of the icon */
    size: number;
    /** Represents the data for the data card */
    data: {
        /** Cell name */
        cell: string;
        /** Biomarker name */
        biomarker: string;
        /** Mean expression value */
        meanExpression: number;
        /** Dataset count */
        dataset_count?: number;
    };
}
/**
 * Details of the Tissue
 */
interface TissueInfo {
    /** ID of the Tissue */
    id: string;
    /** Name of the Tissue */
    label: string;
}
/** Describes the composition of a single row in the table */
type DataRow<T> = [string, number | undefined, ...(T | undefined)[]];
/** Cell types table, describing the types and quanitites of cells for a specific organ */
declare class BiomarkerTableComponent<T extends DataCell> implements OnInit, OnChanges {
    /**
     * Input: TissueInfo carrying the details of the tissue open
     */
    tissueInfo: TissueInfo;
    /** Columns for the table */
    columns: string[];
    /** Source list for biomarker table */
    dataSources: SourceListItem[];
    /** Rows of the table */
    data: DataRow<T>[];
    /** Gradient colors along with their stop points */
    gradient: GradientPoint[];
    /** Taking input for the radius of the circle and the label to be displayed. */
    sizes: SizeLegend[];
    /** Cell id which is hovered, used for highlighting */
    highlightedCellId: string;
    /** List of cell ids in the illustration */
    illustrationIds: string[];
    /** Emits cell type label when row is hovered */
    readonly rowHover: EventEmitter<string>;
    /** Reference to virtual scroll viewport */
    vscroll: CdkVirtualScrollViewport;
    /** Reference to biomarker table */
    table: ElementRef;
    /** Columns replaysubject */
    readonly columns$: ReplaySubject<string[]>;
    /** Cell width (px) */
    private readonly cellWidth;
    /** Extra columns to render outside the visible viewport */
    private readonly extraDisplayedColumnCount;
    /** Current horizontal viewport size */
    private horizontalViewportSize;
    /** Current horizontal scroll offset */
    private horizontalScrollOffset;
    /** Current displayed column count */
    private displayedColumnCount;
    /** Current displayed column offset */
    private displayedColumnOffset;
    /** Injects BottomSheetService */
    private readonly bottomSheetService;
    /** row height */
    readonly rowHeight = 28;
    /** header height */
    readonly headerHeight = 97;
    /** max visible rows */
    readonly maxVisibleRows = 10;
    /**
     * Gets viewport height
     * @returns viewport height in pixels
     */
    get viewportHeight(): number;
    /** Gets the current width of the prefiller column */
    get preFillerWidth(): string;
    /** Gets the current width of the postfiller column */
    get postFillerWidth(): string;
    /** Source for the table */
    readonly dataSource: TableVirtualScrollDataSource<DataRow<T>>;
    /** Change detection */
    private readonly cdr;
    /**
     * Subscribes to scroll event on virtual scroll viewport and checks displayed columns
     */
    ngOnInit(): void;
    /**
     * Sets the data source for the table on every change
     * Sorts the biomarker table on illustrationIds change
     * @param changes object consisting of change in the Input
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Checks for column updates on mouse move
     */
    onMouseMove(): void;
    /**
     * Returns index value
     */
    trackByIndex(index: number): number;
    /**
     * Checks to see if columns should be updated
     */
    checkDisplayedColumns(forceUpdate?: boolean): void;
    /**
     * Opens bottom sheet
     * @param cellData
     */
    openBottomSheet(cellData: T): void;
    /**
     * Updates horizontal viewport size and updates displayed column count
     */
    updateHorizontalViewportSize(size: number): void;
    /**
     * Updates horizontal viewport offset and updates displayed column offset
     */
    updateHorizontalViewportOffset(offset: number): void;
    /**
     * Updates table columns with prefiller and postfiller columns
     */
    updateColumns(): void;
    /**
     * Sorts table by cell type alphabetically, then puts cells that are in the illustration on top
     */
    sortTableData(data: DataRow<T>[]): DataRow<T>[];
    /**
     * Returns true if id matches the cell id of the row
     * @param row Highlighted row
     */
    isHighlighted(row: DataRow<T>): boolean;
    /**
     * Gets hover id from row
     * @param data row data
     * @returns cell type id
     */
    getHoverId(data: DataRow<T>): string;
    /** Lerp function to give value beween min and max value based on the given value
     *
     * @param value
     * @param min
     * @param max
     * @returns
     */
    lerp(value: number, min: number, max: number): number;
    /**
     * Converts HexCode to RGB
     * @param hex
     * @returns
     */
    hex2rgb(hex: string): RGBTriplet;
    /**
     * Gets Min and Max color grade based on the meanExpression value
     * @param meanExpression
     * @returns
     */
    getMinMaxColor(meanExpression: number): {
        minColor: RGBTriplet;
        maxColor: RGBTriplet;
    };
    /**
     * Gets Min and Max size grade based on the Percentage value
     * @param percentage
     * @returns
     */
    getMinMaxSize(percentage: number): {
        minSize: number;
        maxSize: number;
    };
    /**
     * Calculates the color of this value on this gradient
     * @param value
     * @returns
     */
    getColor(value: number): string;
    /**
     * gets Size of the Cell based on the percentage value
     * @param value
     * @returns
     */
    getSize(value: number): number;
    /**
     * Processes the object for hover data for Table Cell
     * @param index index of the row of the datasource
     * @param row row of the datasource
     * @returns
     */
    getHoverData([index, row]: [number, DataRow<T>]): DataItem[][];
    /**
     * Sets and emits cell type id on row hover
     * @param hoverId cell type id
     */
    setHoverId(hoverId?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BiomarkerTableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BiomarkerTableComponent<any>, "ftu-biomarker-table", never, { "tissueInfo": { "alias": "tissueInfo"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; "dataSources": { "alias": "dataSources"; "required": false; }; "data": { "alias": "data"; "required": false; }; "gradient": { "alias": "gradient"; "required": false; }; "sizes": { "alias": "sizes"; "required": false; }; "highlightedCellId": { "alias": "highlightedCellId"; "required": false; }; "illustrationIds": { "alias": "illustrationIds"; "required": false; }; }, { "rowHover": "rowHover"; }, never, never, true, never>;
}

/** The component displays the biomarker details which includes the details, gradient legends, size legends and source lists*/
declare class BiomarkerDetailsComponent implements AfterViewInit {
    /** Reference to biomarker table */
    table: BiomarkerTableComponent<DataCell>;
    /** Tooltip text for percentage of cells legend */
    static readonly PERCENTAGE_TOOLTIP_TEXT = "The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.";
    /** Tooltip text for biomarker expression mean legend */
    static readonly EXPRESSION_TOOLTIP_TEXT = "Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.";
    /** Instance access to percentage tooltip text */
    readonly percentageTooltipText = "The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.";
    /** Instance access to expression tooltip text */
    readonly expressionTooltipText = "Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.";
    /** Table tabs */
    readonly getTabs: () => {
        label: string;
        columns: string[];
        rows: [string, (number | undefined)?, ...({
            color: number;
            size: number;
            data: {
                cell: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
                biomarker: string;
                count: number;
                percentage: number;
                meanExpression: number;
                dataset_count?: number | undefined;
            };
        } | undefined)[]][];
    }[];
    /** Info to be shown on the tooltip for Gradient Legend */
    readonly gradientHoverInfo: <Res = string, Args extends _hra_ui_utils_types.Any[] = []>(...args: Args) => Res;
    /** Info to be shown on the tooltip for Size Legend */
    readonly sizeHoverInfo: <Res = string, Args extends _hra_ui_utils_types.Any[] = []>(...args: Args) => Res;
    /** Indicates if the table is fully shown, defaults to false*/
    isTableFullScreen: boolean;
    /** Gradient colors along with their stop points */
    readonly gradients: () => GradientPoint[];
    /** Taking input for the radius of the circle and the label to be displayed. */
    readonly sizes: () => SizeLegend[];
    /** List of sources with titles and links displayed to the user */
    readonly source: () => {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        title: string;
        label: string;
        authors: string[];
        year: number;
        doi: string;
        link: string;
    }[];
    /**
     * Iri  of medical illustration behavior component
     */
    readonly iri: () => (string & zod.$brand<"URL"> & zod.$brand<"IRI">) | undefined;
    /**
     * Get all tissues
     */
    readonly tissues: () => Record<string & zod.$brand<"URL"> & zod.$brand<"IRI">, {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        label: string;
        parent: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        children: (string & zod.$brand<"URL"> & zod.$brand<"IRI">)[];
        link?: (string & zod.$brand<"LinkId">) | undefined;
    }>;
    /** Selects the cells hovered currently to highlight in table */
    readonly selectedOnHovered: () => {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    } | undefined;
    /** Illustration mapping data */
    readonly mapping: () => {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    }[];
    /** Action to highlight a cell type */
    readonly highlightCell: (hoverLabel?: string | undefined) => {
        readonly hoverLabel?: string | undefined;
        readonly type: string;
    };
    /** Action to set selected sources */
    readonly setSelectedSources: (sources: {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        title: string;
        label: string;
        authors: string[];
        year: number;
        doi: string;
        link: string;
    }[]) => {
        readonly sources: _hra_ui_services.SourceReference[];
        readonly type: string;
    };
    /** List of selected sources */
    readonly selectedSources: i0.WritableSignal<SourceListItem[]>;
    /** Active tab index */
    activeTabIndex: number;
    /** Fullscreen service */
    private readonly fullscreenService;
    /**
     * Determines whether biomarkerfullscreen is in fullscreen mode
     */
    readonly isBiomarkerfullscreen: i0.WritableSignal<boolean>;
    /**
     * View child of source list component
     */
    sourceListRef: TemplateRef<unknown>;
    /**
     * Source list template of biomarker details component
     */
    readonly sourceListTemplate: i0.OutputEmitterRef<TemplateRef<unknown>>;
    ngAfterViewInit(): void;
    /** Table tabs */
    get tab(): CellSummaryAggregate;
    /** Toggle options for the biomarker table */
    readonly toggleOptions: {
        value: string;
        label: string;
    }[];
    /** Selected toggle value */
    selectedToggleValue: string;
    /**
     * Handle toggle change from biomarker table
     * @param value selected toggle value
     */
    onToggleChange(value: string): void;
    /**
     * Determines if a toggle option is disabled.
     * @param index index of the toggle option
     * @returns true if the toggle option is disabled, false otherwise
     */
    isToggleOptionDisabled(index: number): boolean;
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueInfo(): TissueInfo;
    /**
     * Gets ids for cells in the illustration
     */
    get illustrationIds(): string[];
    /**
     * button text of empty biomarker component.
     */
    readonly collaborateText = "Collaborate with the HRA Team";
    /** A dispatcher function to set the screen mode */
    private readonly setScreenMode;
    /** Table tabs */
    private tabs_;
    /** Mapping items reference */
    private mapping_;
    /** Illustration ids reference */
    private illustrationIds_;
    /**
     * Track a tab by it's label
     *
     * @param _index Unused index of tab
     * @param tab Tab data
     */
    trackByLabel(_index: number, tab: CellSummaryAggregate): string;
    /** A function that toggles isTableFullScreen and
     * calls the setScreenMode function.
     */
    toggleFullscreen(): void;
    /**
     * Highlights cells matching the label
     * @param event
     */
    highlightCells(label?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BiomarkerDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BiomarkerDetailsComponent, "ftu-biomarker-details", never, {}, { "sourceListTemplate": "sourceListTemplate"; }, never, never, true, never>;
}

/**
 * Behavior component for medical illustration component
 */
declare class MedicalIllustrationBehaviorComponent {
    /**
     * Current illustration url
     */
    readonly currentUrl: () => string | (string & zod.$brand<"URL">) | undefined;
    /**
     * Current mapping file
     */
    readonly mapping: () => {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    }[];
    /**
     * Curent highlighted cell id
     */
    readonly highlightId: () => string | undefined;
    /**
     * Iri  of medical illustration behavior component
     */
    readonly iri: () => (string & zod.$brand<"URL"> & zod.$brand<"IRI">) | undefined;
    /**
     * Get all tissues
     */
    readonly tissues: () => Record<string & zod.$brand<"URL"> & zod.$brand<"IRI">, {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        label: string;
        parent: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        children: (string & zod.$brand<"URL"> & zod.$brand<"IRI">)[];
        link?: (string & zod.$brand<"LinkId">) | undefined;
    }>;
    /**
     * Whether the illustration is in fullscreen mode
     */
    readonly isFullscreen: i0.ModelSignal<boolean>;
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueTitle(): string;
    /**
     * Updates the active node on node hover
     */
    readonly updateNodeOnHover: (selectedOnHover: {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    } | undefined) => {
        readonly selectedOnHover: _hra_ui_services.IllustrationMappingItem | undefined;
        readonly type: string;
    };
    /**
     * Updates the active node on node click
     */
    readonly updateNodeOnClicked: (selectedOnClick: {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    }) => {
        readonly selectedOnClick: _hra_ui_services.IllustrationMappingItem;
        readonly type: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<MedicalIllustrationBehaviorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MedicalIllustrationBehaviorComponent, "ftu-medical-illustration-behavior", never, { "isFullscreen": { "alias": "isFullscreen"; "required": false; "isSignal": true; }; }, { "isFullscreen": "isFullscreenChange"; }, never, never, true, never>;
}

/**
 * Full screen tab index enum
 */
declare enum FullscreenTab {
    Illustration = 0,
    SourceList = 1,
    BiomarkerDetails = 2
}
/**
 * Ftu Full screen service
 */
declare class FtuFullScreenService {
    /**
     * Boolean input signal to determine if full screen is enabled
     */
    readonly isFullscreen: i0.WritableSignal<boolean>;
    /**
     * Input signal to store the current fullscreen tab index
     */
    readonly fullscreentabIndex: i0.WritableSignal<FullscreenTab>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FtuFullScreenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FtuFullScreenService>;
}

/**
 * Component for Tissue Library Behavior
 */
declare class TissueLibraryBehaviorComponent {
    /** Options for full screen */
    FullScreenTab: typeof FullscreenTab;
    /**
     * Reference to the TissueTreeListComponent.
     */
    private readonly list?;
    /**
     * Input for tissues data
     */
    readonly tissues: () => Record<string & zod.$brand<"URL"> & zod.$brand<"IRI">, {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        label: string;
        parent: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        children: (string & zod.$brand<"URL"> & zod.$brand<"IRI">)[];
        link?: (string & zod.$brand<"LinkId">) | undefined;
    }>;
    /**
     * Selected  of tissue library behavior component
     */
    readonly selected: i0.ModelSignal<{
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        label: string;
        parent: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        children: (string & zod.$brand<"URL"> & zod.$brand<"IRI">)[];
        link?: (string & zod.$brand<"LinkId">) | undefined;
    } | undefined>;
    /**
     * Navigates to a tissue page
     */
    protected navigate: (id: string & zod.$brand<"LinkId">, extras?: _angular_router.UrlCreationOptions | undefined) => {
        readonly id: _hra_ui_cdk_state.LinkId;
        readonly extras: _angular_router.UrlCreationOptions;
        readonly type: string;
    };
    /** Data for Menus */
    /** Illustration Metadata */
    protected readonly illustrationMetadata: string & zod.$brand<"LinkId">;
    /** Available Download Formats */
    protected readonly downloadFormats: () => {
        id: string & zod.$brand<"DownloadFormatId">;
        label: string;
        extension?: string | undefined;
    }[];
    /** Download Action Dispatcher */
    protected readonly download: (format: string & zod.$brand<"DownloadFormatId">) => {
        readonly format: string & zod.$brand<"DownloadFormatId">;
        readonly type: string;
    };
    /** Full Screen Service */
    protected fullScreenService: FtuFullScreenService;
    /** Compact Mode */
    protected readonly isCompactMode: i0.WritableSignal<boolean>;
    /**
     * Sets the TissueItem instance as undefined if the url is undefined
     */
    constructor();
    /**
     * Opens the full screen mode with the specified tab index.
     */
    openFullScreen(mode: FullscreenTab): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TissueLibraryBehaviorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TissueLibraryBehaviorComponent, "ftu-tissue-library-behavior", never, { "selected": { "alias": "selected"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, never, never, true, never>;
}

/** Component for Biomarker Table Details Web component */
declare class BiomarkerDetailsWcComponent {
    /** Tooltip text for percentage of cells legend */
    static readonly PERCENTAGE_TOOLTIP_TEXT = "The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.";
    /** Tooltip text for biomarker expression mean legend */
    static readonly EXPRESSION_TOOLTIP_TEXT = "Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.";
    /** Instance access to percentage tooltip text */
    readonly percentageTooltipText = "The percentage of cells in the functional tissue unit (FTU) is calculated by dividing the total number of cells in all FTUs by the number of all cells in that tissue section.";
    /** Instance access to expression tooltip text */
    readonly expressionTooltipText = "Functional tissue unit expression is scaled linearly to the range [0,1]. Scaling is done by designating the minimum value in the current view to 0 and the max is assigned to 1.";
    /** Dialog service for opening notice dialogs */
    private readonly dialogService;
    /** Text to be copied to clipboard */
    emailText: string;
    /** Component constructor */
    constructor();
    /**
     * Copies email to clipboard
     */
    copyEmailToClipboard(): Promise<void>;
    /**
     * Reference to the biomarker table component
     */
    table: BiomarkerTableComponent<DataCell>;
    /**
     * Current illustration url
     */
    readonly currentUrl: () => string | (string & zod.$brand<"URL">) | undefined;
    /**
     * Current mapping file
     */
    readonly mapping: () => {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    }[];
    /**
     * Iri  of medical illustration behavior component
     */
    readonly iri: () => (string & zod.$brand<"URL"> & zod.$brand<"IRI">) | undefined;
    /**
     * Get all tissues
     */
    readonly tissues: () => Record<string & zod.$brand<"URL"> & zod.$brand<"IRI">, {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        label: string;
        parent: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        children: (string & zod.$brand<"URL"> & zod.$brand<"IRI">)[];
        link?: (string & zod.$brand<"LinkId">) | undefined;
    }>;
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueTitle(): string;
    /**
     * Updates the active node on node hover
     */
    readonly updateNodeOnHover: (selectedOnHover: {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    } | undefined) => {
        readonly selectedOnHover: IllustrationMappingItem | undefined;
        readonly type: string;
    };
    /**
     * Updates the active node on node click
     */
    readonly updateNodeOnClicked: (selectedOnClick: {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    }) => {
        readonly selectedOnClick: IllustrationMappingItem;
        readonly type: string;
    };
    /** Table tabs */
    readonly getTabs: () => {
        label: string;
        columns: string[];
        rows: [string, (number | undefined)?, ...({
            color: number;
            size: number;
            data: {
                cell: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
                biomarker: string;
                count: number;
                percentage: number;
                meanExpression: number;
                dataset_count?: number | undefined;
            };
        } | undefined)[]][];
    }[];
    /** Info to be shown on the tooltip for Gradient Legend */
    readonly gradientHoverInfo: <Res = string, Args extends _hra_ui_utils_types.Any[] = []>(...args: Args) => Res;
    /** Info to be shown on the tooltip for Size Legend */
    readonly sizeHoverInfo: <Res = string, Args extends _hra_ui_utils_types.Any[] = []>(...args: Args) => Res;
    /** Action to highlight a cell type */
    readonly highlightCell: (hoverLabel?: string | undefined) => {
        readonly hoverLabel?: string | undefined;
        readonly type: string;
    };
    /** Indicates if the table is fully shown, defaults to false*/
    isTableFullScreen: boolean;
    /** Gradient colors along with their stop points */
    readonly gradients: () => GradientPoint[];
    /** Taking input for the radius of the circle and the label to be displayed. */
    readonly sizes: () => SizeLegend[];
    /** List of sources with titles and links displayed to the user */
    readonly source: () => {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        title: string;
        label: string;
        authors: string[];
        year: number;
        doi: string;
        link: string;
    }[];
    /** List of selected sources */
    readonly selectedSources: i0.WritableSignal<SourceListItem[]>;
    /**
     * Gets tissue title from the list of tissues
     */
    get tissueInfo(): TissueInfo;
    /**
     * Gets tabs containing cell summary aggregate data
     */
    get tabs(): CellSummaryAggregate[];
    /**
     * Gets ids for cells in the illustration
     */
    get illustrationIds(): string[];
    /**
     * button text of empty biomarker component.
     */
    readonly collaborateText = "Collaborate with the HRA Team";
    /**
     * message markdown of empty biomarker component.
     */
    readonly message = "We currently do not have cell type data for this biomarker.\n<br><br> Please contact us to discuss your dataset.";
    /** Sets currently selected sources */
    readonly setSelectedSources: (sources: {
        id: string & zod.$brand<"URL"> & zod.$brand<"IRI">;
        title: string;
        label: string;
        authors: string[];
        year: number;
        doi: string;
        link: string;
    }[]) => {
        readonly sources: _hra_ui_services.SourceReference[];
        readonly type: string;
    };
    /** Selects the cells hovered currently to highlight in table */
    readonly selectedOnHovered: () => {
        id: string;
        groupId: string;
        label: string;
        ontologyId: string;
        source: {
            [x: string]: unknown;
            label: string;
            svg_id: string;
            svg_group_id: string;
            representation_of: string;
        };
    } | undefined;
    /** A dispatcher function to set the screen mode */
    private readonly setScreenMode;
    /** Mapping item reference */
    private mapping_;
    /** Illustration ids reference */
    private illustrationIds_;
    /** Tabs reference */
    private tabs_;
    /** Returns the index number */
    trackByIndex(index: number): number;
    /** A function that toggles isTableFullScreen and
     * calls the setScreenMode function.
     */
    toggleFullscreen(): void;
    /** Toggle options for the biomarker table */
    readonly toggleOptions: {
        value: string;
        label: string;
    }[];
    /** Active tab index */
    activeTabIndex: number;
    /** Selected toggle value */
    selectedToggleValue: string;
    /**
     * Handle toggle change from biomarker table
     * @param value selected toggle value
     */
    onToggleChange(value: string): void;
    /** Table tabs */
    get tab(): CellSummaryAggregate;
    /**
     * Determines if a toggle option is disabled.
     * @param index index of the toggle option
     * @returns true if the toggle option is disabled, false otherwise
     */
    isToggleOptionDisabled(index: number): boolean;
    /**
     * Highlights cells matching the label
     * @param event
     */
    highlightCells(label?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BiomarkerDetailsWcComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BiomarkerDetailsWcComponent, "ftu-wc-biomarker-details", never, {}, {}, never, never, true, never>;
}

export { BiomarkerDetailsComponent, BiomarkerDetailsWcComponent, BiomarkerTableComponent, BiomarkerTableDataIconComponent, EmptyBiomarkerComponent, FtuFullScreenService, FullscreenContainerComponent, FullscreenTab, GradientLegendComponent, InteractiveSvgComponent, LabelBoxComponent, MedicalIllustrationBehaviorComponent, SizeLegendComponent, SourceListComponent, TissueLibraryBehaviorComponent, TissueTreeListComponent, TooltipComponent };
export type { DataCell, DataNode, DataRow, GradientPoint, NodeMapEntry, NodeTooltipData, SizeLegend, SourceListItem, TissueInfo };
