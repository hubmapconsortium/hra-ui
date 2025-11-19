import * as i0 from '@angular/core';
import { computed, effect, input, booleanAttribute, numberAttribute, output, viewChild, inject, ErrorHandler, signal, ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { createCustomElement } from '@hra-ui/webcomponents';
import { Deck, COORDINATE_SYSTEM, CompositeLayer, OrbitView } from '@deck.gl/core/typed';
import { NodesView, loadNodes, withDataViewDefaultGenerator, loadEdges, createEdgeGenerator, EMPTY_EDGES_VIEW, loadColorMap, createColorMapGenerator, EMPTY_COLOR_MAP_VIEW, loadNodeFilter } from '@hra-ui/node-dist-vis/models';
import { DataFilterExtension } from '@deck.gl/extensions/typed';
import { LineLayer, PointCloudLayer, SolidPolygonLayer } from '@deck.gl/layers/typed';
import { colorCategories } from '@deck.gl/carto/typed';
import { ScaleBarLayer } from '@vivjs/layers';
import { DrawPolygonByDraggingMode } from '@nebula.gl/edit-modes';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import bbox from '@turf/bbox';

/** Initial/default controller options */
const DEFAULT_CONTROLLER_OPTIONS = true;
/** Controller options for 'select' view mode */
const SELECT_CONTROLLER_OPTIONS = {
    dragRotate: false,
};
/**
 * Get the controller options based on current view mode
 *
 * @param mode The view mode
 * @returns Controller options
 */
function createController(mode) {
    return computed(() => {
        return mode() === 'select' ? SELECT_CONTROLLER_OPTIONS : DEFAULT_CONTROLLER_OPTIONS;
    });
}

/**
 * Create a deck instance. Automatically cleans up the deck when the
 * surrounding injection context is destroyed.
 *
 * @param canvas Canvas element
 * @param props Additional deckgl props
 * @returns A deck instance
 */
function createDeck(canvas, props) {
    const deck = computed(() => {
        return new Deck({
            canvas: canvas(),
            ...props,
        });
    }, ...(ngDevMode ? [{ debugName: "deck" }] : []));
    effect((onCleanup) => {
        const instance = deck();
        onCleanup(() => instance.finalize());
    });
    return deck;
}

/** Color used if no default is provided */
const WHITE = [255, 255, 255];
/**
 * Create a color accessor
 *
 * @param accessor Domain value accessor
 * @param colorMap Color map
 * @param defaultColor Default color
 * @returns An accessor
 */
function createColorAccessor(accessor, colorMap, defaultColor) {
    let context;
    const coding = colorCategories({
        attr: (obj) => accessor(obj, context),
        domain: colorMap.domain,
        colors: colorMap.range,
        nullColor: (defaultColor ?? WHITE),
        othersColor: (defaultColor ?? WHITE),
    });
    return (obj, info) => {
        context = info;
        return coding(obj, info);
    };
}

/** Value used to indicate that an item is in the filter */
const FILTER_INCLUDE_VALUE = 1;
/** Value used to indicate that an item is not in the filter */
const FILTER_EXCLUDE_VALUE = 3;
/** Filter value range. Must be set so it includes `FILTER_INCLUDE_VALUE` and excludes `FILTER_EXCLUDE_VALUE` */
const FILTER_RANGE = [0, 2];
/**
 * Create a filter accessor
 *
 * @param accessor Type value accessor
 * @param indexAccessor Item index accessor
 * @param filterFn Filter predicate
 * @returns An accessor
 */
function createNodeFilterAccessor(accessor, indexAccessor, filterFn) {
    return (obj, info) => {
        const type = accessor(obj, info);
        const index = indexAccessor(obj, info);
        const result = filterFn(type, index);
        return result ? FILTER_INCLUDE_VALUE : FILTER_EXCLUDE_VALUE;
    };
}
/**
 * Create a filter accessor
 *
 * @param accessor1 Type value accessor
 * @param indexAccessor1 Item index accessor
 * @param accessor2 Type value accessor
 * @param indexAccessor2 Item index accessor
 * @param filterFn Filter predicate
 * @returns An accessor
 */
function createNodeFilterAccessor2(accessor1, indexAccessor1, accessor2, indexAccessor2, filterFn) {
    return (obj, info) => {
        const type1 = accessor1(obj, info);
        const index1 = indexAccessor1(obj, info);
        const result1 = filterFn(type1, index1);
        if (!result1) {
            return FILTER_EXCLUDE_VALUE;
        }
        const type2 = accessor2(obj, info);
        const index2 = indexAccessor2(obj, info);
        const result2 = filterFn(type2, index2);
        return result2 ? FILTER_INCLUDE_VALUE : FILTER_EXCLUDE_VALUE;
    };
}

/**
 * Create a position accessor that scales position to the range [-1, 1]
 *
 * @param accessor Unscaled position accessor
 * @param dimensions Dimensions of visualization
 * @returns An accessor
 */
function createScaledPositionAccessor(accessor, dimensions) {
    const [min, max] = dimensions;
    const diff = max - min;
    const scale = (value) => (value - min) / diff;
    return (obj, info) => {
        const { target } = info;
        const position = accessor(obj, info);
        target[0] = scale(position[0]);
        target[1] = 1 - scale(position[1]);
        target[2] = scale(position[2] ?? 0);
        return target;
    };
}

/**
 * Create a deckgl layer for rendering edges
 *
 * @param nodes Nodes data view
 * @param edges Edges data view
 * @param nodeFilter Node filter
 * @param colorMap Color map
 * @param disabled Whether to show/hide the layer
 * @returns A deckgl layer
 */
function createEdgesLayer(nodes, edges, nodeFilter, colorMap, disabled) {
    const sourcePositionAccessor = computed(() => {
        const accessor = edges().getSourcePositionFor;
        const dimensions = nodes().getDimensions();
        return createScaledPositionAccessor(accessor, dimensions);
    }, ...(ngDevMode ? [{ debugName: "sourcePositionAccessor" }] : []));
    const targetPositionAccessor = computed(() => {
        const accessor = edges().getTargetPositionFor;
        const dimensions = nodes().getDimensions();
        return createScaledPositionAccessor(accessor, dimensions);
    }, ...(ngDevMode ? [{ debugName: "targetPositionAccessor" }] : []));
    const sourceCellTypeAccessor = computed(() => {
        const nodeIndex = edges().getCellIDFor;
        const nodeCellType = nodes().getCellTypeAt;
        return (obj) => nodeCellType(nodeIndex(obj));
    }, ...(ngDevMode ? [{ debugName: "sourceCellTypeAccessor" }] : []));
    const targetCellTypeAccessor = computed(() => {
        const nodeIndex = edges().getTargetIDFor;
        const nodeCellType = nodes().getCellTypeAt;
        return (obj) => nodeCellType(nodeIndex(obj));
    }, ...(ngDevMode ? [{ debugName: "targetCellTypeAccessor" }] : []));
    const colorAccessor = computed(() => {
        const map = colorMap().getColorMap();
        return createColorAccessor(sourceCellTypeAccessor(), map);
    }, ...(ngDevMode ? [{ debugName: "colorAccessor" }] : []));
    const filterValueAccessor = computed(() => {
        const sourceIndex = edges().getCellIDFor;
        const targetIndex = edges().getTargetIDFor;
        const filterFn = nodeFilter().includes;
        return createNodeFilterAccessor2(sourceCellTypeAccessor(), sourceIndex, targetCellTypeAccessor(), targetIndex, filterFn);
    }, ...(ngDevMode ? [{ debugName: "filterValueAccessor" }] : []));
    return computed(() => {
        if (nodes().length === 0) {
            return undefined;
        }
        return new LineLayer({
            id: 'edges',
            visible: !disabled(),
            data: edges(),
            getSourcePosition: sourcePositionAccessor(),
            getTargetPosition: targetPositionAccessor(),
            getColor: colorAccessor(),
            pickable: false,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            getWidth: 1,
            getFilterValue: filterValueAccessor(),
            filterRange: FILTER_RANGE,
            filterEnabled: !nodeFilter().isEmpty(),
            extensions: [new DataFilterExtension()],
            updateTriggers: {
                getColor: colorMap().getRange(),
                getFilterValue: nodeFilter(),
            },
        });
    });
}

/** Nodes layer */
class NodesLayer extends PointCloudLayer {
    getPickingInfo({ info }) {
        const { data } = this.props;
        if (data instanceof NodesView) {
            info.object = data.at(info.index);
        }
        return info;
    }
}
/** Default/initial node size */
const DEFAULT_NODE_SIZE = 2;
/** Node size in the 'inspect' view mode */
const INSPECT_NODE_SIZE = 6;
/**
 * Get the node size based on the view mode
 *
 * @param mode Current view mode
 * @returns The node size
 */
function getNodeSize(mode) {
    return mode === 'inspect' ? INSPECT_NODE_SIZE : DEFAULT_NODE_SIZE;
}
/**
 * Accessor for getting a node's index
 *
 * @param _obj Raw node data object
 * @param info Accessor context
 * @returns The index of the node
 */
function getIndex(_obj, info) {
    return info.index;
}
/**
 * Create a deckgl for rendering nodes
 *
 * @param mode View mode
 * @param nodes Nodes view
 * @param nodeFilter Nodes filter
 * @param colorMap Color map
 * @returns A deckgl layer
 */
function createNodesLayer(mode, nodes, nodeFilter, colorMap) {
    const positionAccessor = computed(() => {
        const accessor = nodes().getPositionFor;
        const dimensions = nodes().getDimensions();
        return createScaledPositionAccessor(accessor, dimensions);
    }, ...(ngDevMode ? [{ debugName: "positionAccessor" }] : []));
    const colorAccessor = computed(() => {
        const accessor = nodes().getCellTypeFor;
        const map = colorMap().getColorMap();
        return createColorAccessor(accessor, map);
    }, ...(ngDevMode ? [{ debugName: "colorAccessor" }] : []));
    const filterValueAccessor = computed(() => {
        const accessor = nodes().getCellTypeFor;
        const filterFn = nodeFilter().includes;
        return createNodeFilterAccessor(accessor, getIndex, filterFn);
    }, ...(ngDevMode ? [{ debugName: "filterValueAccessor" }] : []));
    return computed(() => {
        return new NodesLayer({
            id: 'nodes',
            data: nodes(),
            getPosition: positionAccessor(),
            getColor: colorAccessor(),
            pickable: true,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            pointSize: getNodeSize(mode()),
            getFilterValue: filterValueAccessor(),
            filterRange: FILTER_RANGE,
            filterEnabled: !nodeFilter().isEmpty(),
            extensions: [new DataFilterExtension()],
            updateTriggers: {
                getColor: colorMap().getRange(),
                getFilterValue: nodeFilter(),
            },
        });
    });
}

/**
 * Create a deckgl for rendering a scale bar
 *
 * @param nodes Nodes view
 * @param viewSize Size of view element
 * @param viewState Current state of deckgl
 * @returns A deckgl layer
 */
function createScaleBarLayer(nodes, viewSize, viewState) {
    const size = computed(() => {
        const [min, max] = nodes().getDimensions();
        const result = (max - min) / (1 - min);
        return Number.isFinite(result) ? result : 1;
    }, ...(ngDevMode ? [{ debugName: "size" }] : []));
    const state = computed(() => {
        const { width, height } = viewSize();
        return {
            ...viewState(),
            width: width - 136,
            height: height - 32,
        };
    }, ...(ngDevMode ? [{ debugName: "state" }] : []));
    return computed(() => {
        if (nodes().length === 0) {
            return undefined;
        }
        return new ScaleBarLayer({
            id: 'scalebar',
            unit: 'µm',
            position: 'top-right',
            length: 0.1,
            snap: true,
            size: size(),
            viewState: state(),
        });
    });
}

var SelectionSubLayerId;
(function (SelectionSubLayerId) {
    SelectionSubLayerId["LassoLayer"] = "lasso";
    SelectionSubLayerId["MaskLayer"] = "mask";
})(SelectionSubLayerId || (SelectionSubLayerId = {}));
var SelectionEditType;
(function (SelectionEditType) {
    SelectionEditType["SetSelection"] = "addFeature";
    SelectionEditType["ClearSelection"] = "clearSelection";
})(SelectionEditType || (SelectionEditType = {}));
const EMPTY_DATA = {
    type: 'FeatureCollection',
    features: [],
};
const EMPTY_STATE = {
    data: EMPTY_DATA,
    boundingBox: undefined,
    mask: undefined,
    selection: undefined,
};
const defaultProps = {
    nodesLayer: undefined,
    onSelect: () => undefined,
    parameters: {
        depthTest: false,
    },
};
class ClickableDrawPolygonByDraggingMode extends DrawPolygonByDraggingMode {
    handleClick(_event, props) {
        props.onEdit({
            updatedData: EMPTY_DATA,
            editType: SelectionEditType.ClearSelection,
            editContext: undefined,
        });
    }
    handleStartDragging(event, props) {
        const mouseEvent = event.sourceEvent;
        if (mouseEvent.shiftKey) {
            this.handleDraggingThrottled = null;
        }
        else {
            super.handleStartDragging(event, props);
        }
    }
}
class SelectionLayer extends CompositeLayer {
    static layerName = 'SelectionLayer';
    static defaultProps = defaultProps;
    initializeState() {
        this.state = { ...EMPTY_STATE };
    }
    renderLayers() {
        return [this.getLassoLayer(), this.getNodesLayer(), this.getMaskLayer()];
    }
    filterSubLayer({ layer, isPicking }) {
        return isPicking || layer.id.endsWith(SelectionSubLayerId.LassoLayer);
    }
    async getSelection() {
        const MAX_ROUNDS = 20;
        const { deck } = this.context;
        const { nodesLayer } = this.props;
        const { boundingBox } = this.state;
        if (!deck || !nodesLayer || !boundingBox) {
            return [];
        }
        const [xMin, yMin, xMax, yMax] = boundingBox;
        const [x1, y1] = this.project([xMin, yMin]);
        const [x2, y2] = this.project([xMax, yMax]);
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        const { id: maskId } = this.getSubLayerProps({ id: SelectionSubLayerId.MaskLayer });
        const pickingOpts = { x, y, width, height, layerIds: [this.id] };
        const result = [];
        let selection = [];
        for (let round = 0; round < MAX_ROUNDS; round++) {
            this.setState({ selection });
            deck.redraw();
            await new Promise((res) => setTimeout(res, 16));
            const infos = deck.pickObjects(pickingOpts);
            const maskInfo = infos.find((info) => info.sourceLayer?.id === maskId);
            if (infos.length <= 1) {
                break;
            }
            else if (!maskInfo) {
                continue;
            }
            selection = [...selection];
            for (const info of infos) {
                if (info.sourceLayer?.id !== maskId) {
                    result.push(info);
                    selection.push(info.object);
                }
            }
        }
        return result;
    }
    clearSelection() {
        this.setState(EMPTY_STATE);
    }
    getMaskLayer() {
        const { mask = [] } = this.state;
        return new SolidPolygonLayer(this.getSubLayerProps({ id: SelectionSubLayerId.MaskLayer }), {
            pickable: true,
            data: [{ polygon: mask }],
        });
    }
    getNodesLayer() {
        const { nodesLayer } = this.props;
        const { selection } = this.state;
        const { id, getFilterValue, filterEnabled, filterRange, updateTriggers } = nodesLayer.props;
        const exclusionSet = new Set(selection);
        return nodesLayer.clone({
            ...this.getSubLayerProps({ id }),
            pickable: true,
            getFilterValue: (obj, info) => [
                getFilterValue(obj, info),
                exclusionSet.has(obj) ? FILTER_EXCLUDE_VALUE : FILTER_INCLUDE_VALUE,
            ],
            filterRange: [filterRange, FILTER_RANGE],
            filterEnabled: filterEnabled !== false || exclusionSet.size > 0,
            extensions: [new DataFilterExtension({ filterSize: 2 })],
            updateTriggers: {
                ...updateTriggers,
                getFilterValue: [updateTriggers['getFilterValue'], selection],
            },
        });
    }
    getLassoLayer() {
        const { data = EMPTY_DATA } = this.state;
        return new EditableGeoJsonLayer(this.getSubLayerProps({ id: SelectionSubLayerId.LassoLayer }), {
            data: data,
            mode: ClickableDrawPolygonByDraggingMode,
            selectedFeatureIndexes: [],
            onEdit: (event) => this.handleEdit(event),
            getFillColor: [255, 255, 255, 51],
            getLineColor: [255, 255, 255, 255],
            getLineWidth: 2,
            getTentativeLineWidth: 2,
            _subLayerProps: {
                guides: {
                    _subLayerProps: {
                        'points-circle': {
                            visible: false,
                        },
                    },
                },
            },
        });
    }
    async handleEdit(event) {
        const { onSelect } = this.props;
        const { editType, updatedData: data } = event;
        if (editType === SelectionEditType.ClearSelection) {
            this.setState(EMPTY_STATE);
            onSelect([]);
        }
        else if (editType === SelectionEditType.SetSelection) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const boundingBox = bbox(data);
            const mask = this.createMaskPolygon(data, boundingBox);
            this.setState({ data, boundingBox, mask });
            onSelect(await this.getSelection());
        }
    }
    createMaskPolygon(data, boundingBox) {
        const holes = data.features.flatMap((feat) => feat.geometry.coordinates);
        const adjust = 0.01;
        const xMin = (1 - adjust) * boundingBox[0];
        const yMin = (1 - adjust) * boundingBox[1];
        const xMax = (1 + adjust) * boundingBox[2];
        const yMax = (1 + adjust) * boundingBox[3];
        return [
            [
                [xMin, yMin],
                [xMax, yMin],
                [xMax, yMax],
                [xMin, yMax],
            ],
            ...holes,
        ];
    }
}
function createSelectionLayer(mode, nodesLayer, onSelect) {
    return computed(() => {
        if (mode() !== 'select') {
            return undefined;
        }
        return new SelectionLayer({
            id: 'selection',
            nodesLayer: nodesLayer(),
            onSelect,
        });
    });
}

const DEFAULT_NODE_TARGET_SELECTOR = 'Endothelial';
const DEFAULT_MAX_EDGE_DISTANCE = 1000;
/** Initial visualization deckgl state */
const INITIAL_VIEW_STATE = {
    version: 0,
    orbitAxis: 'Y',
    camera: 'orbit',
    zoom: 9,
    minRotationX: -90,
    maxRotationX: 90,
    rotationX: 0,
    rotationOrbit: 0,
    dragMode: 'rotate',
    target: [0.5, 0.5],
};
/** Node distance visualization */
class NodeDistVisComponent {
    /** View mode of the visualization */
    mode = input('explore', ...(ngDevMode ? [{ debugName: "mode" }] : []));
    /** Node data */
    nodes = input(...(ngDevMode ? [undefined, { debugName: "nodes" }] : []));
    /** Node key mapping data */
    nodeKeys = input(...(ngDevMode ? [undefined, { debugName: "nodeKeys" }] : []));
    /** Node target selector used when calculating edges */
    nodeTargetSelector = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetSelector" }] : []));
    /**
     * Column/property of the node's 'Cell Type' values
     *
     * @deprecated Use `nodeKeys` to specify the column instead
     */
    nodeTargetKey = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetKey" }] : []));
    /**
     * Node target selector used when calculating edges
     *
     * @deprecated Use `nodeTargetSelector` instead
     */
    nodeTargetValue = input(...(ngDevMode ? [undefined, { debugName: "nodeTargetValue" }] : []));
    /** Edge data if already calculated */
    edges = input(...(ngDevMode ? [undefined, { debugName: "edges" }] : []));
    /** Edge key mapping data */
    edgeKeys = input(...(ngDevMode ? [undefined, { debugName: "edgeKeys" }] : []));
    /** Whether edges are disabled */
    edgesDisabled = input(false, ...(ngDevMode ? [{ debugName: "edgesDisabled", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Max distance to consider when calculating edges */
    maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, ...(ngDevMode ? [{ debugName: "maxEdgeDistance", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Color map data */
    colorMap = input(...(ngDevMode ? [undefined, { debugName: "colorMap" }] : []));
    /** Color map key mapping data */
    colorMapKeys = input(...(ngDevMode ? [undefined, { debugName: "colorMapKeys" }] : []));
    /**
     * Column/property of the color map's 'Cell Type' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    colorMapKey = input(...(ngDevMode ? [undefined, { debugName: "colorMapKey" }] : []));
    /**
     * Column/property of the color map's 'Cell Color' values
     *
     * @deprecated Use `colorMapKeys` to specify the column instead
     */
    colorMapValue = input(...(ngDevMode ? [undefined, { debugName: "colorMapValue" }] : []));
    /** Node filter data */
    nodeFilter = input(...(ngDevMode ? [undefined, { debugName: "nodeFilter" }] : []));
    /**
     * Node 'Cell Type's to display
     *
     * @deprecated Use `nodeFilter`'s `include` property to specify included nodes instead
     */
    selection = input(...(ngDevMode ? [undefined, { debugName: "selection" }] : []));
    // eslint-disable-next-line @angular-eslint/no-output-rename
    nodesChange = output({ alias: 'nodes' });
    // eslint-disable-next-line @angular-eslint/no-output-rename
    edgesChange = output({ alias: 'edges' });
    // eslint-disable-next-line @angular-eslint/no-output-rename
    colorMapChange = output({ alias: 'colorMap' });
    /** Emits when the user clicks on a node */
    nodeClick = output();
    /** Emits when the user starts or stops hovering over a node */
    nodeHover = output();
    /** Emits when the user selects one or more nodes in the 'select' view mode */
    nodeSelectionChange = output();
    /** Reference to the rendered canvas element */
    canvas = computed(() => this.canvasElementRef().nativeElement, ...(ngDevMode ? [{ debugName: "canvas" }] : []));
    /** Reference to the deckgl instance */
    deck = createDeck(this.canvas, {
        controller: true,
        views: new OrbitView({ id: 'orbit', orbitAxis: 'Y' }),
        initialViewState: INITIAL_VIEW_STATE,
        layers: [],
        getCursor: this.getCursor.bind(this),
        onClick: this.onClick.bind(this),
        onHover: this.onHover.bind(this),
        onViewStateChange: ({ viewState }) => this.viewState.set(viewState),
        onError: (error) => this.errorHandler.handleError(error),
    });
    /** Canvas element wrapped inside an `ElementRef` */
    canvasElementRef = viewChild.required('canvas');
    /** Error handler for the application */
    errorHandler = inject(ErrorHandler);
    /** Current version value of the deckgl view state */
    viewStateVersion = INITIAL_VIEW_STATE.version;
    /** Current deckgl view state */
    viewState = signal(INITIAL_VIEW_STATE, ...(ngDevMode ? [{ debugName: "viewState" }] : []));
    nodeTargetSelectorWithDefault = computed(() => {
        return this.nodeTargetSelector() || this.nodeTargetValue() || DEFAULT_NODE_TARGET_SELECTOR;
    }, ...(ngDevMode ? [{ debugName: "nodeTargetSelectorWithDefault" }] : []));
    /** View of the node data */
    nodesView = loadNodes(this.nodes, this.nodeKeys, this.nodeTargetKey);
    /** View of the edge data */
    edgesView = withDataViewDefaultGenerator(loadEdges(this.edges, this.edgeKeys), createEdgeGenerator(this.nodesView, this.edges, this.nodeTargetSelectorWithDefault, this.maxEdgeDistance), EMPTY_EDGES_VIEW, false);
    /** View of the color map */
    colorMapView = withDataViewDefaultGenerator(loadColorMap(this.colorMap, this.colorMapKeys, this.colorMapKey, this.colorMapValue), createColorMapGenerator(this.nodesView, this.colorMap), EMPTY_COLOR_MAP_VIEW);
    /** View of the node filter */
    nodeFilterView = loadNodeFilter(this.nodeFilter, this.selection);
    /** Node layer */
    nodesLayer = createNodesLayer(this.mode, this.nodesView, this.nodeFilterView, this.colorMapView);
    /** Edge layer */
    edgesLayer = createEdgesLayer(this.nodesView, this.edgesView, this.nodeFilterView, this.colorMapView, this.edgesDisabled);
    /** Scale bar layer */
    scaleBarLayer = createScaleBarLayer(this.nodesView, this.canvas, this.viewState);
    /** Selection layer */
    selectionLayer = createSelectionLayer(this.mode, this.nodesLayer, this.onSelect.bind(this));
    /** All layers as an array */
    layers = computed(() => [
        this.nodesLayer(),
        this.edgesLayer(),
        this.scaleBarLayer(),
        this.selectionLayer(),
    ], ...(ngDevMode ? [{ debugName: "layers" }] : []));
    /** Controller options */
    controller = createController(this.mode);
    /** Deckgl props */
    props = computed(() => {
        return {
            controller: this.controller(),
            layers: this.layers(),
        };
    }, ...(ngDevMode ? [{ debugName: "props" }] : []));
    /** Currently hovered node entry */
    activeHover = undefined;
    /** Initialize the visualization */
    constructor() {
        // Connect data to deckgl
        effect(() => this.deck().setProps(this.props()));
        // Connect outputs
        this.bindDataOutput(this.nodesView, this.nodesChange);
        this.bindDataOutput(this.edgesView, this.edgesChange);
        this.bindDataOutput(this.colorMapView, this.colorMapChange);
    }
    /** Resets the view to the original location and rotation */
    resetView() {
        this.deck().setProps({
            initialViewState: {
                ...INITIAL_VIEW_STATE,
                version: ++this.viewStateVersion,
            },
        });
    }
    resetOrbit() {
        this.deck().setProps({
            initialViewState: {
                ...this.viewState(),
                rotationX: 0,
                rotationOrbit: 0,
                version: ++this.viewStateVersion,
            },
        });
    }
    clearSelection() {
        this.selectionLayer()?.clearSelection();
    }
    /**
     * Creates a blob representing the image in the canvas.
     *
     * @param type Image format (default: image/png)
     * @param quality Image quality, a number between 0 and 1
     * @returns A data blob
     */
    toBlob(type, quality) {
        return new Promise((resolve) => {
            this.deck().redraw('toDataUrl');
            this.canvas().toBlob(resolve, type, quality);
        });
    }
    /**
     * Get the cursor to display
     *
     * @param state Cursor state
     * @returns Which cursor to display
     */
    getCursor({ isDragging, isHovering }) {
        if (isDragging) {
            return 'grabbing';
        }
        else if (isHovering) {
            return 'pointer';
        }
        return 'grab';
    }
    /**
     * Handle a click in deckgl
     *
     * @param info Deckgl picking information
     */
    onClick(info) {
        if (this.mode() === 'select') {
            return;
        }
        else if (info.picked) {
            this.nodeClick.emit(this.pickingInfoToNodeEvent(info));
        }
    }
    /**
     * Handle hovering in deckgl
     *
     * @param info Deckgl picking information
     */
    onHover(info) {
        if (this.mode() === 'select') {
            return;
        }
        else if (info.picked) {
            const event = this.pickingInfoToNodeEvent(info);
            if (event.object !== this.activeHover) {
                this.nodeHover.emit(event);
                this.activeHover = event.object;
            }
        }
        else if (this.activeHover !== undefined) {
            this.nodeHover.emit(undefined);
            this.activeHover = undefined;
        }
    }
    onSelect(infos) {
        const events = infos.map((info) => this.pickingInfoToNodeEvent(info));
        this.nodeSelectionChange.emit(events);
    }
    pickingInfoToNodeEvent(info) {
        const view = this.nodesView();
        const { index, x, y } = info;
        return { index, clientX: x, clientY: y, object: view.materializeAt(index) };
    }
    bindDataOutput(view, outputRef) {
        effect(() => {
            if (view().length !== 0) {
                outputRef.emit(view().data);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: NodeDistVisComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.12", type: NodeDistVisComponent, isStandalone: true, selector: "hra-node-dist-vis", inputs: { mode: { classPropertyName: "mode", publicName: "mode", isSignal: true, isRequired: false, transformFunction: null }, nodes: { classPropertyName: "nodes", publicName: "nodes", isSignal: true, isRequired: false, transformFunction: null }, nodeKeys: { classPropertyName: "nodeKeys", publicName: "nodeKeys", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetSelector: { classPropertyName: "nodeTargetSelector", publicName: "nodeTargetSelector", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetKey: { classPropertyName: "nodeTargetKey", publicName: "nodeTargetKey", isSignal: true, isRequired: false, transformFunction: null }, nodeTargetValue: { classPropertyName: "nodeTargetValue", publicName: "nodeTargetValue", isSignal: true, isRequired: false, transformFunction: null }, edges: { classPropertyName: "edges", publicName: "edges", isSignal: true, isRequired: false, transformFunction: null }, edgeKeys: { classPropertyName: "edgeKeys", publicName: "edgeKeys", isSignal: true, isRequired: false, transformFunction: null }, edgesDisabled: { classPropertyName: "edgesDisabled", publicName: "edgesDisabled", isSignal: true, isRequired: false, transformFunction: null }, maxEdgeDistance: { classPropertyName: "maxEdgeDistance", publicName: "maxEdgeDistance", isSignal: true, isRequired: false, transformFunction: null }, colorMap: { classPropertyName: "colorMap", publicName: "colorMap", isSignal: true, isRequired: false, transformFunction: null }, colorMapKeys: { classPropertyName: "colorMapKeys", publicName: "colorMapKeys", isSignal: true, isRequired: false, transformFunction: null }, colorMapKey: { classPropertyName: "colorMapKey", publicName: "colorMapKey", isSignal: true, isRequired: false, transformFunction: null }, colorMapValue: { classPropertyName: "colorMapValue", publicName: "colorMapValue", isSignal: true, isRequired: false, transformFunction: null }, nodeFilter: { classPropertyName: "nodeFilter", publicName: "nodeFilter", isSignal: true, isRequired: false, transformFunction: null }, selection: { classPropertyName: "selection", publicName: "selection", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { nodesChange: "nodes", edgesChange: "edges", colorMapChange: "colorMap", nodeClick: "nodeClick", nodeHover: "nodeHover", nodeSelectionChange: "nodeSelectionChange" }, host: { classAttribute: "hra-app" }, viewQueries: [{ propertyName: "canvasElementRef", first: true, predicate: ["canvas"], descendants: true, isSignal: true }], ngImport: i0, template: '<canvas (contextmenu)="$event.preventDefault()" #canvas></canvas>', isInline: true, styles: [":host{display:block;position:relative;width:100%;height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: NodeDistVisComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-node-dist-vis', template: '<canvas (contextmenu)="$event.preventDefault()" #canvas></canvas>', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'hra-app',
                    }, styles: [":host{display:block;position:relative;width:100%;height:100%}\n"] }]
        }], ctorParameters: () => [], propDecorators: { mode: [{ type: i0.Input, args: [{ isSignal: true, alias: "mode", required: false }] }], nodes: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodes", required: false }] }], nodeKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeKeys", required: false }] }], nodeTargetSelector: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetSelector", required: false }] }], nodeTargetKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetKey", required: false }] }], nodeTargetValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeTargetValue", required: false }] }], edges: [{ type: i0.Input, args: [{ isSignal: true, alias: "edges", required: false }] }], edgeKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgeKeys", required: false }] }], edgesDisabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "edgesDisabled", required: false }] }], maxEdgeDistance: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxEdgeDistance", required: false }] }], colorMap: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMap", required: false }] }], colorMapKeys: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapKeys", required: false }] }], colorMapKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapKey", required: false }] }], colorMapValue: [{ type: i0.Input, args: [{ isSignal: true, alias: "colorMapValue", required: false }] }], nodeFilter: [{ type: i0.Input, args: [{ isSignal: true, alias: "nodeFilter", required: false }] }], selection: [{ type: i0.Input, args: [{ isSignal: true, alias: "selection", required: false }] }], nodesChange: [{ type: i0.Output, args: ["nodes"] }], edgesChange: [{ type: i0.Output, args: ["edges"] }], colorMapChange: [{ type: i0.Output, args: ["colorMap"] }], nodeClick: [{ type: i0.Output, args: ["nodeClick"] }], nodeHover: [{ type: i0.Output, args: ["nodeHover"] }], nodeSelectionChange: [{ type: i0.Output, args: ["nodeSelectionChange"] }], canvasElementRef: [{ type: i0.ViewChild, args: ['canvas', { isSignal: true }] }] } });

/** Custom element definition for NodeDistVisComponent */
const NodeDistVisElement = createCustomElement('hra-node-dist-vis', NodeDistVisComponent, {
    providers: [provideZonelessChangeDetection()],
});

/**
 * Generated bundle index. Do not edit.
 */

export { DEFAULT_MAX_EDGE_DISTANCE, DEFAULT_NODE_TARGET_SELECTOR, NodeDistVisComponent, NodeDistVisElement };
//# sourceMappingURL=hra-ui-node-dist-vis.mjs.map
