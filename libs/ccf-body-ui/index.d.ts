import { CompositeLayer, LayersList, Deck } from '@deck.gl/core/typed';
import { Matrix4, NumericArray } from '@math.gl/core';
import * as rxjs from 'rxjs';
import { SpatialSceneNode as SpatialSceneNode$1 } from '@hra-api/ng-client';
import * as _angular_core from '@angular/core';
import { OutputEmitterRef } from '@angular/core';
import { z } from 'zod';
import { JsonLdObj } from 'jsonld/jsonld-spec';
import { AABB, Vec3 } from 'cannon-es';

/** Spatial scene geometry shapes */
type SpatialSceneGeometry = 'sphere' | 'cube' | 'wireframe' | 'text' | 'cone' | 'cylinder';
/** This interface defines the structure of a spatial scene node, which represents an element in a spatial scene. */
interface SpatialSceneNode {
    /** A unique identifier for the node. */
    '@id': string;
    /** The type of the node. */
    '@type': string;
    /** An optional entity identifier. */
    entityId?: string;
    /** An optional reference to what the node represents. */
    representation_of?: string;
    /** An optional reference to the organ associated with the node. */
    reference_organ?: string;
    /** A boolean indicating if the node is unpickable. */
    unpickable?: boolean;
    /** The geometry shape of the node, defined by the SpatialSceneGeometry type. */
    geometry?: SpatialSceneGeometry;
    /** Optional text associated with the node. */
    text?: string;
    /** Optional lighting information. */
    _lighting?: string;
    /** A URL or identifier for the scenegraph associated with the node. */
    scenegraph?: string;
    /** The specific node within the scenegraph. */
    scenegraphNode?: string;
    /** A boolean indicating if the opacity is based on zoom level. */
    zoomBasedOpacity?: boolean;
    /** A boolean indicating if the node should be zoomed to on load. */
    zoomToOnLoad?: boolean;
    /** An array representing the RGBA color of the node. */
    color?: [number, number, number, number];
    /** The opacity of the node. */
    opacity?: number;
    /** A Matrix4 object representing the transformation matrix of the node. */
    transformMatrix: Matrix4;
    /** The name of the node. */
    name?: string;
    /** Tooltip text for the node. */
    tooltip?: string;
    /** The priority of the node. */
    priority?: number;
}

/**
 * This class extends CompositeLayer to create a custom layer that manages multiple sub-layers, including mesh and text layers.
 * It handles the initialization, rendering, and picking information for the layers.
 */
declare class BodyUILayer extends CompositeLayer<SpatialSceneNode> {
    /** The layer name */
    static readonly layerName = "BodyUILayer";
    /** The GLTF Cache */
    static readonly gltfCache: {
        [url: string]: Promise<Blob>;
    };
    /**
     * This function initializes the state of the BodyUILayer class.
     * It sets the initial state with the provided data, a default zoom opacity of 0.8, and a flag to control collision detection.
     * It also registers GLTF loaders.
     */
    initializeState(): void;
    /**
     * This function renders the layers based on the current state.
     * It categorizes the data into different geometries and creates corresponding layers for each geometry type.
     * It also handles loading GLTF models and manages collision detection if enabled.
     * @returns LayersList - A list of layers to be rendered.
     */
    renderLayers(): LayersList;
    /**
     * This function provides information about the picked object when the user interacts with the layer. It returns the picking information from the event.
     */
    getPickingInfo(e: Parameters<CompositeLayer<SpatialSceneNode>['getPickingInfo']>[0]): ReturnType<CompositeLayer<SpatialSceneNode>['getPickingInfo']>;
}

/**
 * This interface defines the properties for the BodyUI component.
 */
interface BodyUIProps {
    /** The ID of the component. */
    id: string;
    /** The canvas element or its ID. */
    canvas: string | HTMLCanvasElement;
    /** The parent HTML element. */
    parent: HTMLElement;
    /** A flag for debugging scene node processing. */
    debugSceneNodeProcessing?: boolean;
    /** The target position for the view. */
    target: [number, number, number];
    /** A flag indicating if the view is interactive. */
    interactive: boolean;
    /** The rotation angle. */
    rotation: number;
    /** The minimum rotation angle along the X-axis. */
    minRotationX: number;
    /** The maximum rotation angle along the X-axis. */
    maxRotationX: number;
    /** The zoom level. */
    zoom: number;
    /** A flag for enabling legacy lighting. */
    legacyLighting?: boolean;
    /** The camera type. */
    camera: string;
}
/**
 * This interface defines the information for a picked object of type D
 */
interface PickInfo<D> {
    /** The layer containing the picked object. */
    layer: unknown;
    /** The index of the picked object. */
    index: number;
    /** The picked object. */
    object: D;
    /** The x-coordinate of the pick event. */
    x: number;
    /** The y-coordinate of the pick event. */
    y: number;
    /** The coordinate of the pick event. */
    coordinate?: unknown;
    /** A flag indicating if the object was picked. */
    picked?: boolean;
}
/**
 * This type defines the event for a node drag.
 */
type NodeDragEvent = {
    /** The dragged node. */
    node: SpatialSceneNode$1;
    /** The pick information for the dragged node. */
    info: PickInfo<SpatialSceneNode$1>;
    /** The mouse event. */
    e: MouseEvent;
};
/**
 * This type defines the event for a node click.
 */
type NodeClickEvent = {
    /** The clicked node. */
    node: SpatialSceneNode$1;
    /** A flag indicating if the control key was pressed during the click. */
    ctrlClick: boolean;
};
/**
 * A convenience wrapper class for the CCF Body UI
 */
declare class BodyUI {
    private readonly deckProps;
    /** The Deck.gl instance. */
    deck: Deck;
    /** An instance of the `BodyUILayer` class. */
    private readonly bodyUILayer;
    /** A subject for node click events. */
    private readonly nodeClickSubject;
    /** A subject for node hover start events. */
    private readonly nodeHoverStartSubject;
    /** A subject for node hover stop events. */
    private readonly nodeHoverStopSubject;
    /** A behavior subject for scene rotation events. */
    private readonly sceneRotationSubject;
    /** A subject for node drag start events. */
    private readonly nodeDragStartSubject;
    /** A subject for node drag events. */
    private readonly nodeDragSubject;
    /** A subject for node drag end events. */
    private readonly nodeDragEndSubject;
    /** An observable for node click events. */
    readonly nodeClick$: rxjs.Observable<NodeClickEvent>;
    /** An observable for node hover start events. */
    readonly nodeHoverStart$: rxjs.Observable<SpatialSceneNode$1>;
    /** An observable for node hover stop events. */
    readonly nodeHoverStop$: rxjs.Observable<SpatialSceneNode$1>;
    /** An observable for scene rotation events. */
    readonly sceneRotation$: rxjs.Observable<[number, number]>;
    /** An observable for node drag start events. */
    readonly nodeDragStart$: rxjs.Observable<NodeDragEvent>;
    /** An observable for node drag events. */
    readonly nodeDrag$: rxjs.Observable<NodeDragEvent>;
    /** An observable for node drag end events. */
    readonly nodeDragEnd$: rxjs.Observable<NodeDragEvent>;
    /** The cursor style. */
    private cursor?;
    /** The last hovered node. */
    private lastHovered?;
    /**
     * Initializes the Deck.gl instance with the provided properties,
     * sets up the view state and event handlers, and initializes the scene rotation subject if a rotation is provided.
     * @param deckProps Deck.gl properties
     */
    constructor(deckProps: Partial<BodyUIProps>);
    /**
     * Waits for the `bodyUILayer` state to be initialized.
     * @returns Promise
     */
    initialize(): Promise<void>;
    /**
     * This method finalizes the Deck.gl instance, cleaning up any resources.
     */
    finalize(): void;
    /**
     * This method sets the scene data for the BodyUILayer and optionally zooms to nodes that require it.
     * @param data An array of SpatialSceneNode objects representing the scene data.
     */
    setScene(data: SpatialSceneNode$1[]): void;
    /**
     * This method processes scene nodes for debugging purposes and updates the BodyUILayer state with the processed data.
     * @param data An array of SpatialSceneNode objects representing the scene data.
     * @param zoomOpacity The zoom opacity value.
     */
    debugSceneNodeProcessing(data: SpatialSceneNode$1[], zoomOpacity: number): void;
    /**
     * This method zooms the view to a specific node.
     * @param node The SpatialSceneNode object to zoom to.
     */
    zoomTo(node: SpatialSceneNode$1): void;
    /**
     * This method sets the rotation orbit value for the view.
     * @param value The rotation orbit value.
     */
    setRotation(value: number): void;
    /**
     * This method sets the rotation X value for the view.
     * @param value The rotation X value.
     */
    setRotationX(value: number): void;
    /**
     * This method sets the zoom value for the view.
     * @param value The zoom value.
     */
    setZoom(value: number): void;
    /**
     * This method sets the target position for the view.
     * @param value An array representing the target position.
     */
    setTarget(value: number[]): void;
    /**
     * This method sets the interactivity of the view.
     * @param value A boolean indicating if the view should be interactive.
     */
    setInteractive(value: boolean): void;
    /**
     * Updates camera type
     * @param value Camera type
     */
    setCamera(value: string): void;
    /**
     * This method handles hover events, updating the cursor and emitting hover start and stop events.
     */
    private readonly _onHover;
    /**
     * This method handles click events, emitting node click events.
     */
    private readonly _onClick;
    /**
     * This method handles view state change events, updating the view state and emitting scene rotation events.
     */
    private readonly _onViewStateChange;
    /**
     * Handles drag start event, emitting the corresponding event.
     */
    private readonly _onDragStart;
    /**
     * Handles ondrag events, emitting the corresponding event.
     */
    private readonly _onDrag;
    /**
     * Handles drag end, emitting the corresponding event.
     */
    private readonly _onDragEnd;
    /**
     * This method handles drag events, emitting the corresponding drag event to the provided subject.
     * @param info The pick information for the dragged object.
     * @param e The mouse event.
     * @param subject The subject to emit the drag event to.
     */
    private _dragEvent;
    /**
     * Creates a new view
     * @param camera Camera type
     * @returns view
     */
    private createView;
}

/** Interface for bounds */
interface XYZTriplet<T = number> {
    /** The x-coordinate */
    x: T;
    /** The y-coordinate */
    y: T;
    /** The z-coordinate */
    z: T;
}
/** Zod for SPATIAL SCENE NODE  */
declare const SPATIAL_SCENE_NODE: z.ZodObject<{}, z.core.$loose>;
/** Zod for SPATIAL SCENE NODE array */
declare const SPATIAL_SCENE_NODE_ARRAY: z.ZodArray<z.ZodObject<{}, z.core.$loose>>;
/** HRA Body UI Component */
declare class BodyUiComponent {
    /** Scene for the deck gl */
    readonly scene: _angular_core.InputSignalWithTransform<string | {
        [x: string]: unknown;
    }[] | undefined, unknown>;
    /** Rotation for the deck gl */
    readonly rotation: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Rotation X for the deck gl */
    readonly rotationX: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Zoom for the deck gl */
    readonly zoom: _angular_core.InputSignalWithTransform<number | undefined, unknown>;
    /** Target for the deck gl */
    readonly target: _angular_core.InputSignalWithTransform<[number, number, number] | undefined, unknown>;
    /** Bounds for the deck gl */
    readonly bounds: _angular_core.InputSignalWithTransform<{
        x: number;
        y: number;
        z: number;
    } | undefined, unknown>;
    /** Camera for the deck gl */
    readonly camera: _angular_core.InputSignal<string | undefined>;
    /** Flag for the interactive for deck gl */
    readonly interactive: _angular_core.InputSignalWithTransform<boolean | undefined, unknown>;
    /** Output for node click */
    readonly nodeClick: OutputEmitterRef<NodeClickEvent>;
    /** Output for node drag */
    readonly nodeDrag: OutputEmitterRef<NodeDragEvent>;
    /** Output for node hover start */
    readonly nodeHoverStart: OutputEmitterRef<SpatialSceneNode$1>;
    /** Output for node hover end */
    readonly nodeHoverStop: OutputEmitterRef<SpatialSceneNode$1>;
    /** Output for rotation change */
    readonly rotationChange: OutputEmitterRef<[number, number]>;
    /** Output that emits when deck gl has been initialized */
    readonly initialized: OutputEmitterRef<void>;
    /** Instance of HttpClient */
    private readonly http;
    /** Instance of Error Handler */
    private readonly errorHandler;
    /** Instance of canvas element */
    private readonly canvas;
    /** Instance of BodyUI class */
    private readonly bodyUi;
    /** Processed scene data for deck gl */
    private readonly sceneData;
    /** Returns the bounds zoom according to bounds input */
    private readonly boundsZoom;
    /** Constructor for the component */
    constructor();
    /** Resets the deck gl view */
    resetView(): void;
    /** Sets the deck gl zoom according to the provided bounds */
    zoomToBounds(bounds: XYZTriplet, margin?: {
        x: number;
        y: number;
    }): void;
    /** Returns zoom value according to current bounds */
    private getBoundsZoom;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BodyUiComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BodyUiComponent, "hra-body-ui", never, { "scene": { "alias": "scene"; "required": false; "isSignal": true; }; "rotation": { "alias": "rotation"; "required": false; "isSignal": true; }; "rotationX": { "alias": "rotationX"; "required": false; "isSignal": true; }; "zoom": { "alias": "zoom"; "required": false; "isSignal": true; }; "target": { "alias": "target"; "required": false; "isSignal": true; }; "bounds": { "alias": "bounds"; "required": false; "isSignal": true; }; "camera": { "alias": "camera"; "required": false; "isSignal": true; }; "interactive": { "alias": "interactive"; "required": false; "isSignal": true; }; }, { "nodeClick": "nodeClick"; "nodeDrag": "nodeDrag"; "nodeHoverStart": "nodeHoverStart"; "nodeHoverStop": "nodeHoverStop"; "rotationChange": "rotationChange"; "initialized": "initialized"; }, never, never, true, never>;
}

/**
 * This interface defines the structure of a spatial placement JSON-LD object, which represents the placement information of a spatial entity.
 */
interface SpatialPlacementJsonLd extends JsonLdObj {
    /** The JSON-LD context. */
    '@context'?: string;
    /** A unique identifier for the placement object. */
    '@id': string;
    /** The type of the placement object. */
    '@type': string;
    /** The source of the placement object. */
    source?: string;
    /** The target of the placement object. */
    target: string;
    /** The date of the placement object. */
    placement_date: string;
    /** The scaling factor along the x-axis. */
    x_scaling: number;
    /** The scaling factor along the y-axis. */
    y_scaling: number;
    /** The scaling factor along the z-axis. */
    z_scaling: number;
    /** The units of the scaling factors. */
    scaling_units: string;
    /** The rotation angle around the x-axis. */
    x_rotation: number;
    /** The rotation angle around the y-axis. */
    y_rotation: number;
    /** The rotation angle around the z-axis. */
    z_rotation: number;
    /** The units of the rotation angles. */
    rotation_units: string;
    /** The translation distance along the x-axis. */
    x_translation: number;
    /** The translation distance along the y-axis. */
    y_translation: number;
    /** The translation distance along the z-axis. */
    z_translation: number;
    /** The units of the translation distances. */
    translation_units: string;
}
/**
 * This interface defines the structure of a spatial object reference JSON-LD object, which represents a reference to a spatial object.
 */
interface SpatialObjectReferenceJsonLd extends JsonLdObj {
    /** A unique identifier for the object reference. */
    '@id': string;
    /** The type of the object reference. */
    '@type': string;
    /** The file associated with the object reference. */
    file: string;
    /** The format of the file. */
    file_format: string;
    /** The placement information of the object, defined by the SpatialPlacementJsonLd interface. */
    placement: SpatialPlacementJsonLd;
}
/**
 * This interface defines the structure of a spatial entity JSON-LD object, which represents a spatial entity with various attributes and metadata.
 */
interface SpatialEntityJsonLd extends JsonLdObj {
    /** The JSON-LD context. */
    '@context': string;
    /** A unique identifier for the entity. */
    '@id': string;
    /** The type of the entity, which can be a string or an array of strings. */
    '@type': string | string[];
    /** The label of the entity. */
    label: string;
    /** A comment or description of the entity. */
    comment: string;
    /** The creator of the entity. */
    creator: string;
    /** The first name of the creator. */
    creator_first_name: string;
    /** The middle name of the creator. */
    creator_middle_name?: string;
    /** The last name of the creator. */
    creator_last_name: string;
    /** The email address of the creator. */
    creator_email?: string;
    /** The ORCID identifier of the creator. */
    creator_orcid?: string;
    /** The creation date of the entity. */
    creation_date: string;
    /** The date when the entity was last updated. */
    updated_date: string;
    /** An array of annotations related to the entity. */
    ccf_annotations: string[];
    /** The entity that this entity represents. */
    representation_of: string;
    /** The reference organ associated with the entity. */
    reference_organ: string;
    /** The extraction set associated with the entity. */
    extraction_set: string;
    /** The sex of the entity, either 'Male' or 'Female'. */
    sex?: 'Male' | 'Female';
    /** The side of the entity, either 'Left' or 'Right'. */
    side?: 'Left' | 'Right';
    /** The RUI rank of the entity. */
    rui_rank: number;
    /** The thickness of the tissue block slices. */
    slice_thickness: number;
    /** The number of tissue block slices. */
    slice_count: number;
    /** The dimension along the x-axis. */
    x_dimension: number;
    /** The dimension along the y-axis. */
    y_dimension: number;
    /** The dimension along the z-axis. */
    z_dimension: number;
    /** The units of the dimensions. */
    dimension_units: string;
    /** The spatial object reference, defined by the SpatialObjectReferenceJsonLd interface. */
    object: SpatialObjectReferenceJsonLd;
    /** The placement information, which can be a single SpatialPlacementJsonLd object or an array of such objects. */
    placement: SpatialPlacementJsonLd | SpatialPlacementJsonLd[];
    /** The DOI of the publication associated with the entity. */
    publication_doi?: string;
    /** The consortium associated with the entity.*/
    consortium?: string;
}

/**
 * This function registers the GLTF loaders, including the DracoWorkerLoader and GLTFLoader, to be used for loading GLTF files.
 */
declare function registerGLTFLoaders(): void;
/**
 * This function derives a scenegraph from a GLTF file based on the provided scenegraph node name.
 * It traverses the scenes in the GLTF file to find the specified node and updates its transformation matrix.
 * @param scenegraphNodeName The name of the scenegraph node to be derived.
 * @param gltf The GLTF file data.
 * @returns The updated GLTF file data with the derived scenegraph.
 */
declare function deriveScenegraph(scenegraphNodeName: string, gltf: any): any;
/**
 * This function loads a GLTF file from a given URL and parses it using the GLTFLoader.
 * It also supports caching of the GLTF files. After loading, it derives the scenegraph for the specified node.
 * @param model The spatial scene node containing the scenegraph URL.
 * @param [cache] An optional cache for storing GLTF file promises.
 * @returns A promise that resolves to the parsed GLTF file data with the derived scenegraph.
 */
declare function loadGLTF(model: SpatialSceneNode, cache?: {
    [url: string]: Promise<Blob>;
}): Promise<any>;
/**
 * This function loads a GLTF file from a promise and derives the scenegraph for the specified node.
 * @param scenegraphNodeName The name of the scenegraph node to be derived.
 * @param gltfPromise A promise that resolves to the GLTF file data.
 * @returns A promise that resolves to the parsed GLTF file data with the derived scenegraph.
 */
declare function loadGLTF2(scenegraphNodeName: string, gltfPromise: Promise<any>): Promise<any>;

/**
 * This type defines a visitor function for traversing a scene. The visitor function takes three parameters:
 * @param child The current child node being visited.
 * @param modelMatrix The model matrix of the current child node.
 * @param parentMatrix The model matrix of the parent node.
 * @returns A boolean indicating whether to continue the traversal.
 */
type SceneTraversalVisitor = (child: any, modelMatrix: Matrix4, parentMatrix: Matrix4) => boolean;
/**
 * This function traverses a scene graph, applying transformations and invoking a visitor function at each node.
 * @param scene The scene object to be traversed.
 * @param worldMatrix The world transformation matrix. If not provided, it defaults to the identity matrix.
 * @param visitor The visitor function to be invoked at each node.
 * @returns A boolean indicating whether the traversal was completed successfully.
 */
declare function traverseScene(scene: {
    matrix: Readonly<NumericArray>;
    translation: Readonly<NumericArray>;
    rotation: Readonly<NumericArray>;
    scale: number | Readonly<NumericArray>;
    nodes: any;
    children: any;
}, worldMatrix: Matrix4, visitor: SceneTraversalVisitor): boolean;

/**
 * This interface defines the structure of a collision object, which includes an ID, name, and a list of hits.
 */
interface Collision {
    /** Id of collision object */
    '@id': string;
    /** Name of collision object */
    name: string;
    /** List of hits */
    hits: {
        '@id': string;
        name: string;
    }[];
}
/**
 * This function performs collision detection between spatial scene nodes.
 * It creates bounding boxes for source and target nodes, checks for overlaps, and generates a collision report.
 * @param scene An array of SpatialSceneNode objects representing the scene.
 * @returns A promise that resolves to an array of Collision objects, detailing the collisions detected.
 */
declare function doCollisions(scene: SpatialSceneNode[]): Promise<Collision[]>;

/**
 * This interface extends the SpatialSceneNode interface to include additional properties for processed nodes.
 */
interface ProcessedNode extends SpatialSceneNode {
    /** The bounding box of the node, represented by an AABB object. */
    bbox: AABB;
    /** The JSON-LD representation of the node. */
    jsonld: unknown;
    /** The original node object. */
    node: unknown;
    /** The size of the node, represented by a Vec3 object. */
    size: Vec3;
    /** The center of the node, represented by a Vec3 object. */
    center: Vec3;
}
/**
 * This function processes scene nodes from a GLTF file, generating processed nodes with bounding boxes, sizes, and centers.
 * @param gltfUrl The URL of the GLTF file to be loaded.
 * @param [worldMatrix] The world transformation matrix. Defaults identity matrix.
 * @param [scenegraphNode] The specific scenegraph node to be processed.
 * @param [gltfCache] An optional cache for storing GLTF file promises.
 * @returns scene nodes A promise that resolves to an object where the keys are node IDs and the values are ProcessedNode objects.
 */
declare function processSceneNodes(gltfUrl: string, worldMatrix?: Matrix4, scenegraphNode?: string, gltfCache?: {
    [url: string]: Promise<Blob>;
}): Promise<{
    [node: string]: ProcessedNode;
}>;

/**
 * This function simplifies a scene by processing spatial scene nodes, loading GLTF files, and generating new nodes with simplified geometry.
 * @param nodes An array of SpatialSceneNode objects representing the nodes in the scene.
 * @returns A promise that resolves to an array of simplified SpatialSceneNode objects.
 */
declare function simplifyScene(nodes: SpatialSceneNode[]): Promise<SpatialSceneNode[]>;

export { BodyUI, BodyUILayer, BodyUiComponent, SPATIAL_SCENE_NODE, SPATIAL_SCENE_NODE_ARRAY, deriveScenegraph, doCollisions, loadGLTF, loadGLTF2, processSceneNodes, registerGLTFLoaders, simplifyScene, traverseScene };
export type { BodyUIProps, NodeClickEvent, NodeDragEvent, PickInfo, ProcessedNode, SceneTraversalVisitor, SpatialEntityJsonLd, SpatialObjectReferenceJsonLd, SpatialPlacementJsonLd, SpatialSceneGeometry, SpatialSceneNode, XYZTriplet };
