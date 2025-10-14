import * as _angular_elements from '@angular/elements';
import * as _hra_ui_webcomponents from '@hra-ui/webcomponents';
import { InputProps } from '@hra-ui/webcomponents';
import * as _deck_gl_core_typed from '@deck.gl/core/typed';
import * as _angular_core from '@angular/core';
import { OutputEmitterRef, Signal } from '@angular/core';
import { ViewMode, NodesInput, NodeKeysInput, EdgesInput, EdgeKeysInput, AnyData, ColorMapView, KeyMapping, ColorMapEntry, NodeFilterInput } from '@hra-ui/node-dist-vis/models';

interface NodeEvent {
    index: number;
    clientX: number;
    clientY: number;
    object: object;
}
declare const DEFAULT_NODE_TARGET_SELECTOR = "Endothelial";
declare const DEFAULT_MAX_EDGE_DISTANCE = 1000;
/** Node distance visualization */
declare class NodeDistVisComponent {
    /** View mode of the visualization */
    readonly mode: _angular_core.InputSignal<ViewMode>;
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
    /** Whether edges are disabled */
    readonly edgesDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Max distance to consider when calculating edges */
    readonly maxEdgeDistance: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Color map data */
    readonly colorMap: _angular_core.InputSignal<string | AnyData | ColorMapView | undefined>;
    /** Color map key mapping data */
    readonly colorMapKeys: _angular_core.InputSignal<string | KeyMapping<ColorMapEntry> | undefined>;
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
    /** Node filter data */
    readonly nodeFilter: _angular_core.InputSignal<NodeFilterInput>;
    /**
     * Node 'Cell Type's to display
     *
     * @deprecated Use `nodeFilter`'s `include` property to specify included nodes instead
     */
    readonly selection: _angular_core.InputSignal<string | string[] | undefined>;
    readonly nodesChange: OutputEmitterRef<AnyData>;
    readonly edgesChange: OutputEmitterRef<AnyData>;
    readonly colorMapChange: OutputEmitterRef<AnyData>;
    /** Emits when the user clicks on a node */
    readonly nodeClick: OutputEmitterRef<NodeEvent>;
    /** Emits when the user starts or stops hovering over a node */
    readonly nodeHover: OutputEmitterRef<NodeEvent | undefined>;
    /** Emits when the user selects one or more nodes in the 'select' view mode */
    readonly nodeSelectionChange: OutputEmitterRef<NodeEvent[]>;
    /** Reference to the rendered canvas element */
    readonly canvas: Signal<HTMLCanvasElement>;
    /** Reference to the deckgl instance */
    readonly deck: Signal<_deck_gl_core_typed.Deck>;
    /** Canvas element wrapped inside an `ElementRef` */
    private readonly canvasElementRef;
    /** Error handler for the application */
    private readonly errorHandler;
    /** Current version value of the deckgl view state */
    private viewStateVersion;
    /** Current deckgl view state */
    private readonly viewState;
    private readonly nodeTargetSelectorWithDefault;
    /** View of the node data */
    private readonly nodesView;
    /** View of the edge data */
    private readonly edgesView;
    /** View of the color map */
    private readonly colorMapView;
    /** View of the node filter */
    private readonly nodeFilterView;
    /** Node layer */
    private readonly nodesLayer;
    /** Edge layer */
    private readonly edgesLayer;
    /** Scale bar layer */
    private readonly scaleBarLayer;
    /** Selection layer */
    private readonly selectionLayer;
    /** All layers as an array */
    private readonly layers;
    /** Controller options */
    private readonly controller;
    /** Deckgl props */
    private readonly props;
    /** Currently hovered node entry */
    private activeHover;
    /** Initialize the visualization */
    constructor();
    /** Resets the view to the original location and rotation */
    resetView(): void;
    resetOrbit(): void;
    clearSelection(): void;
    /**
     * Creates a blob representing the image in the canvas.
     *
     * @param type Image format (default: image/png)
     * @param quality Image quality, a number between 0 and 1
     * @returns A data blob
     */
    toBlob(type?: string, quality?: number): Promise<Blob | null>;
    /**
     * Get the cursor to display
     *
     * @param state Cursor state
     * @returns Which cursor to display
     */
    private getCursor;
    /**
     * Handle a click in deckgl
     *
     * @param info Deckgl picking information
     */
    private onClick;
    /**
     * Handle hovering in deckgl
     *
     * @param info Deckgl picking information
     */
    private onHover;
    private onSelect;
    private pickingInfoToNodeEvent;
    private bindDataOutput;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NodeDistVisComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NodeDistVisComponent, "hra-node-dist-vis", never, { "mode": { "alias": "mode"; "required": false; "isSignal": true; }; "nodes": { "alias": "nodes"; "required": false; "isSignal": true; }; "nodeKeys": { "alias": "nodeKeys"; "required": false; "isSignal": true; }; "nodeTargetSelector": { "alias": "nodeTargetSelector"; "required": false; "isSignal": true; }; "nodeTargetKey": { "alias": "nodeTargetKey"; "required": false; "isSignal": true; }; "nodeTargetValue": { "alias": "nodeTargetValue"; "required": false; "isSignal": true; }; "edges": { "alias": "edges"; "required": false; "isSignal": true; }; "edgeKeys": { "alias": "edgeKeys"; "required": false; "isSignal": true; }; "edgesDisabled": { "alias": "edgesDisabled"; "required": false; "isSignal": true; }; "maxEdgeDistance": { "alias": "maxEdgeDistance"; "required": false; "isSignal": true; }; "colorMap": { "alias": "colorMap"; "required": false; "isSignal": true; }; "colorMapKeys": { "alias": "colorMapKeys"; "required": false; "isSignal": true; }; "colorMapKey": { "alias": "colorMapKey"; "required": false; "isSignal": true; }; "colorMapValue": { "alias": "colorMapValue"; "required": false; "isSignal": true; }; "nodeFilter": { "alias": "nodeFilter"; "required": false; "isSignal": true; }; "selection": { "alias": "selection"; "required": false; "isSignal": true; }; }, { "nodesChange": "nodes"; "edgesChange": "edges"; "colorMapChange": "colorMap"; "nodeClick": "nodeClick"; "nodeHover": "nodeHover"; "nodeSelectionChange": "nodeSelectionChange"; }, never, never, true, never>;
}

type NodeDistVisElementProps = InputProps<NodeDistVisComponent>;
type NodeDistVisElement = InstanceType<Awaited<typeof NodeDistVisElement>>;
/** Custom element definition for NodeDistVisComponent */
declare const NodeDistVisElement: Promise<_angular_elements.NgElementConstructor<InputProps<NodeDistVisComponent> & _hra_ui_webcomponents.NgElementExtensions<NodeDistVisComponent>>>;

export { DEFAULT_MAX_EDGE_DISTANCE, DEFAULT_NODE_TARGET_SELECTOR, NodeDistVisComponent, NodeDistVisElement };
export type { NodeDistVisElementProps, NodeEvent };
