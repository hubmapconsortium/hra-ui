import { COORDINATE_SYSTEM, CompositeLayer, LightingEffect, AmbientLight, Deck, OrthographicView, OrbitView } from '@deck.gl/core/typed';
import { TextLayer } from '@deck.gl/layers/typed';
import { SimpleMeshLayer, ScenegraphLayer } from '@deck.gl/mesh-layers/typed';
import { Matrix4 } from '@math.gl/core';
import { CubeGeometry, CylinderGeometry, ConeGeometry, SphereGeometry } from '@luma.gl/core';
import { registerLoaders, parse, load } from '@loaders.gl/core';
import { DracoWorkerLoader, DracoLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { AABB, Vec3 } from 'cannon-es';
import { Subject, BehaviorSubject, map, catchError, of, Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as i0 from '@angular/core';
import { effect, input, numberAttribute, booleanAttribute, output, inject, ErrorHandler, viewChild, ViewEncapsulation, Component } from '@angular/core';
import { derivedAsync } from 'ngxtension/derived-async';
import * as z from 'zod';

/**
 * This function traverses a scene graph, applying transformations and invoking a visitor function at each node.
 * @param scene The scene object to be traversed.
 * @param worldMatrix The world transformation matrix. If not provided, it defaults to the identity matrix.
 * @param visitor The visitor function to be invoked at each node.
 * @returns A boolean indicating whether the traversal was completed successfully.
 */
function traverseScene(scene, worldMatrix, visitor) {
    if (!worldMatrix) {
        worldMatrix = new Matrix4(Matrix4.IDENTITY);
    }
    const matrix = new Matrix4(Matrix4.IDENTITY);
    if (!scene) {
        return true;
    }
    else if (scene.matrix) {
        matrix.copy(scene.matrix);
    }
    else {
        matrix.identity();
        if (scene.translation) {
            matrix.translate(scene.translation);
        }
        if (scene.rotation) {
            const rotationMatrix = new Matrix4(Matrix4.IDENTITY).fromQuaternion(scene.rotation);
            matrix.multiplyRight(rotationMatrix);
        }
        if (scene.scale) {
            matrix.scale(scene.scale);
        }
    }
    const modelMatrix = new Matrix4(worldMatrix).multiplyRight(matrix);
    if (visitor(scene, modelMatrix, worldMatrix) === false) {
        return false;
    }
    for (const child of scene.nodes || scene.children || []) {
        if (traverseScene(child, modelMatrix, visitor) === false) {
            return false;
        }
    }
    return true;
}

/**
 * This function registers the GLTF loaders, including the DracoWorkerLoader and GLTFLoader, to be used for loading GLTF files.
 */
function registerGLTFLoaders() {
    registerLoaders([DracoWorkerLoader, GLTFLoader]);
}
/**
 * This function derives a scenegraph from a GLTF file based on the provided scenegraph node name.
 * It traverses the scenes in the GLTF file to find the specified node and updates its transformation matrix.
 * @param scenegraphNodeName The name of the scenegraph node to be derived.
 * @param gltf The GLTF file data.
 * @returns The updated GLTF file data with the derived scenegraph.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deriveScenegraph(scenegraphNodeName, gltf) {
    const scenegraphNode = gltf.nodes?.find((n) => n.name === scenegraphNodeName);
    if (scenegraphNode) {
        let foundNodeInScene = false;
        for (const scene of gltf.scenes) {
            if (!foundNodeInScene) {
                traverseScene(scene, new Matrix4(Matrix4.IDENTITY), (child, modelMatrix) => {
                    if (child === scenegraphNode) {
                        child.matrix = modelMatrix;
                        child.translation = undefined;
                        child.rotation = undefined;
                        child.scale = undefined;
                        foundNodeInScene = true;
                        return false;
                    }
                    return true;
                });
            }
        }
        gltf.scene = {
            id: scenegraphNodeName,
            name: scenegraphNodeName,
            nodes: [scenegraphNode],
        };
        gltf.scenes = [gltf.scene];
        return { scene: gltf.scene, scenes: gltf.scenes };
    }
    return gltf;
}
/**
 * This function loads a GLTF file from a given URL and parses it using the GLTFLoader.
 * It also supports caching of the GLTF files. After loading, it derives the scenegraph for the specified node.
 * @param model The spatial scene node containing the scenegraph URL.
 * @param [cache] An optional cache for storing GLTF file promises.
 * @returns A promise that resolves to the parsed GLTF file data with the derived scenegraph.
 */
async function loadGLTF(model, cache) {
    const gltfUrl = model.scenegraph;
    let gltfPromise;
    if (cache) {
        gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then((r) => r.blob()));
    }
    else {
        gltfPromise = fetch(gltfUrl);
    }
    const gltf = await parse(gltfPromise, GLTFLoader, {
        DracoLoader,
        gltf: { decompressMeshes: true, postProcess: true },
    });
    if (!gltf.nodes) {
        console.log('WARNING: Empty Scene', gltfUrl, gltf);
    }
    return deriveScenegraph(model.scenegraphNode, gltf);
}
/**
 * This function loads a GLTF file from a promise and derives the scenegraph for the specified node.
 * @param scenegraphNodeName The name of the scenegraph node to be derived.
 * @param gltfPromise A promise that resolves to the GLTF file data.
 * @returns A promise that resolves to the parsed GLTF file data with the derived scenegraph.
 */
async function loadGLTF2(scenegraphNodeName, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
gltfPromise) {
    return deriveScenegraph(scenegraphNodeName, await gltfPromise);
}

/**
 * This function performs collision detection between spatial scene nodes.
 * It creates bounding boxes for source and target nodes, checks for overlaps, and generates a collision report.
 * @param scene An array of SpatialSceneNode objects representing the scene.
 * @returns A promise that resolves to an array of Collision objects, detailing the collisions detected.
 */
async function doCollisions(scene) {
    console.log('Starting Collisioning');
    const sourceBoxes = scene
        .filter((d) => !d.scenegraph && d.geometry !== 'wireframe')
        .map((model) => {
        const mat = new Matrix4(model.transformMatrix);
        const lowerBound = mat.transformAsPoint([-1, -1, -1], []);
        const upperBound = mat.transformAsPoint([1, 1, 1], []);
        return {
            '@id': model['@id'],
            name: model.tooltip,
            entityId: model.entityId,
            bbox: new AABB({
                lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i]))),
            }),
        };
    });
    const targetBoxes = [];
    for (const model of scene.filter((d) => !!d.scenegraph)) {
        const gltf = await load(model.scenegraph, GLTFLoader, {
            DracoLoader,
            decompress: true,
            postProcess: true,
        });
        for (const gltfScene of gltf.scenes ?? []) {
            traverseScene(gltfScene, new Matrix4(model.transformMatrix), (node, modelMatrix) => {
                if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                    for (const primitive of node.mesh.primitives) {
                        if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                            const lowerBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                            const upperBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                            targetBoxes.push({
                                '@id': model['@id'],
                                name: node.name,
                                entityId: model.entityId,
                                bbox: new AABB({
                                    lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                                    upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i]))),
                                }),
                                gltf,
                            });
                        }
                    }
                }
                return true;
            });
        }
    }
    const report = [];
    const sad = [];
    for (const src of sourceBoxes) {
        const hits = [];
        for (const target of targetBoxes) {
            if (src.bbox.overlaps(target.bbox)) {
                hits.push({ '@id': target['@id'], name: target.name });
            }
        }
        if (hits.length > 0) {
            report.push({
                '@id': src.entityId,
                name: src.name,
                hits,
            });
        }
        else {
            sad.push(src);
        }
    }
    console.log({
        sourceBoxes,
        targetBoxes,
        report,
        sad,
        maxHits: Math.max(...report.map((r) => r.hits.length)),
    });
    const csvReport = [];
    for (const hit of report) {
        csvReport.push({
            'Tissue ID': hit['@id'],
            'Tissue Name': hit.name,
            'Hit ID': '',
            'Hit Name': '',
        });
        for (const h of hit.hits) {
            csvReport.push({
                'Tissue ID': hit['@id'],
                'Tissue Name': hit.name,
                'Hit ID': h['@id'],
                'Hit Name': h.name,
            });
        }
    }
    console.log(csvReport);
    return report;
}

/**
 * This function creates a SimpleMeshLayer based on the provided geometry type and options.
 * It supports different geometries like sphere, cone, cylinder, and cube.
 * @param id
 * @param data
 * @param options
 * @returns layer
 */
function meshLayer(id, data, options) {
    if (!data || data.length === 0) {
        return undefined;
    }
    let mesh;
    switch (options['geometry']) {
        case 'sphere':
            mesh = new SphereGeometry();
            break;
        case 'cone':
            mesh = new ConeGeometry();
            break;
        case 'cylinder':
            mesh = new CylinderGeometry();
            break;
        case 'cube':
        default:
            mesh = new CubeGeometry();
            break;
    }
    return new SimpleMeshLayer({
        ...{
            id,
            pickable: true,
            autoHighlight: false,
            highlightColor: [30, 136, 229, 255],
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            data,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mesh: mesh,
            wireframe: false,
            getColor: (d) => d.color || [255, 255, 255, 0.9 * 255],
            getTransformMatrix: (d) => d.transformMatrix,
        },
        ...options,
    });
}
/**
 * This function creates a TextLayer for rendering text based on the provided data and options.
 * @param id
 * @param data
 * @param options
 * @returns layer
 */
function textLayer(id, data, options) {
    if (!data || data.length === 0) {
        return undefined;
    }
    return new TextLayer({
        ...{
            id,
            pickable: true,
            data: data.map((d) => ({
                ...d,
                position: new Matrix4(d.transformMatrix).getTranslation(),
            })),
            getText: (d) => d.text,
            getPosition: (d) => d.position,
            getColor: (d) => d.color,
        },
        ...options,
    });
}
/**
 * This class extends CompositeLayer to create a custom layer that manages multiple sub-layers, including mesh and text layers.
 * It handles the initialization, rendering, and picking information for the layers.
 */
class BodyUILayer extends CompositeLayer {
    /** The layer name */
    static { this.layerName = 'BodyUILayer'; }
    /** The GLTF Cache */
    static { this.gltfCache = {}; }
    /**
     * This function initializes the state of the BodyUILayer class.
     * It sets the initial state with the provided data, a default zoom opacity of 0.8, and a flag to control collision detection.
     * It also registers GLTF loaders.
     */
    initializeState() {
        const { data } = this.props;
        this.setState({ data: data ?? [], zoomOpacity: 0.8, doCollisions: false });
        registerGLTFLoaders();
    }
    /**
     * This function renders the layers based on the current state.
     * It categorizes the data into different geometries and creates corresponding layers for each geometry type.
     * It also handles loading GLTF models and manages collision detection if enabled.
     * @returns LayersList - A list of layers to be rendered.
     */
    renderLayers() {
        const state = this.state;
        const geometries = {
            sphere: [],
            cone: [],
            cylinder: [],
            cube: [],
            text: [],
            wireframe: [],
            scenegraph: [],
        };
        for (const node of state.data) {
            const geometry = node.geometry ?? 'cube';
            if (node.scenegraph) {
                geometries['scenegraph'].push(node);
            }
            else if (geometries[geometry] !== undefined) {
                geometries[geometry].push(node);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const url2gltf = {};
        for (const m of geometries['scenegraph']) {
            if (m.scenegraph && m.scenegraphNode && !Object.prototype.hasOwnProperty.call(url2gltf, m.scenegraph)) {
                url2gltf[m.scenegraph] = loadGLTF({ scenegraph: m.scenegraph }, BodyUILayer.gltfCache);
            }
        }
        const layers = [];
        for (const [geometry, nodes] of Object.entries(geometries)) {
            if (geometry === 'scenegraph') {
                for (const model of nodes) {
                    layers.push(new ScenegraphLayer({
                        id: 'models-' + model['@id'],
                        opacity: model.zoomBasedOpacity ? state.zoomOpacity : (model.opacity ?? 1.0),
                        pickable: !model.unpickable,
                        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
                        data: [model],
                        scenegraph: model.scenegraphNode
                            ? loadGLTF2(model.scenegraphNode, url2gltf[model.scenegraph])
                            : model.scenegraph,
                        _lighting: model._lighting, // 'pbr' | undefined
                        getTransformMatrix: model.transformMatrix,
                        getColor: model.color ?? [0, 255, 0, 0.5 * 255],
                        parameters: {
                            depthMask: !model.zoomBasedOpacity && (model.opacity === undefined || model.opacity === 1),
                        },
                    }));
                }
            }
            else if (geometry === 'text') {
                layers.push(textLayer('text', nodes.filter((n) => n.unpickable), { pickable: false }));
                layers.push(textLayer('textPickable', nodes.filter((n) => !n.unpickable), { pickable: true }));
            }
            else if (geometry === 'wireframe') {
                layers.push(meshLayer(geometry, nodes, {
                    wireframe: true,
                    pickable: false,
                    geometry,
                }));
            }
            else {
                layers.push(meshLayer(geometry, nodes.filter((n) => n.unpickable), { wireframe: false, pickable: false, geometry }));
                layers.push(meshLayer(`${geometry}Pickable`, nodes.filter((n) => !n.unpickable), { wireframe: false, pickable: true, geometry }));
            }
        }
        if (state.doCollisions) {
            doCollisions(state.data);
        }
        return layers.filter((l) => !!l);
    }
    /**
     * This function provides information about the picked object when the user interacts with the layer. It returns the picking information from the event.
     */
    getPickingInfo(e) {
        return e.info;
    }
}

/**
 * This recursive function collects the names of all child nodes in a scene.
 * @param scene The scene object containing nodes or children.
 * @param [names] An array to collect the names of the child nodes. Defaults to an empty array.
 * @returns An array of strings representing the names of the child nodes.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function childNames(scene, names = []) {
    for (const child of scene.nodes || scene.children || []) {
        names.push(child.name);
        childNames(child, names);
    }
    return names;
}
/**
 * This function processes scene nodes from a GLTF file, generating processed nodes with bounding boxes, sizes, and centers.
 * @param gltfUrl The URL of the GLTF file to be loaded.
 * @param [worldMatrix] The world transformation matrix. Defaults identity matrix.
 * @param [scenegraphNode] The specific scenegraph node to be processed.
 * @param [gltfCache] An optional cache for storing GLTF file promises.
 * @returns scene nodes A promise that resolves to an object where the keys are node IDs and the values are ProcessedNode objects.
 */
async function processSceneNodes(gltfUrl, worldMatrix, scenegraphNode, gltfCache) {
    registerGLTFLoaders();
    const gltf = await loadGLTF({ scenegraph: gltfUrl, scenegraphNode }, gltfCache);
    const nodes = {};
    const gltfNodes = [];
    worldMatrix = new Matrix4(worldMatrix ?? Matrix4.IDENTITY);
    for (const scene of gltf.scenes) {
        traverseScene(scene, worldMatrix, (node, modelMatrix) => {
            const processedNode = {
                '@id': (node.name || node.id),
                '@type': 'ProcessedNode',
                transformMatrix: new Matrix4(modelMatrix),
                geometry: 'wireframe',
                node,
            };
            gltfNodes.push({
                '@id': `GLTF:${processedNode['@id']}`,
                '@type': 'GLTFNode',
                scenegraph: gltfUrl,
                scenegraphNode: processedNode['@id'],
                transformMatrix: new Matrix4(worldMatrix || Matrix4.IDENTITY),
                tooltip: (node.name || node.id),
                color: [255, 255, 255, 255],
                _lighting: 'pbr',
                zoomBasedOpacity: true,
                node,
            });
            if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                for (const primitive of node.mesh.primitives) {
                    if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                        const lowerBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                        const upperBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                        processedNode.bbox = new AABB({
                            lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                            upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i]))),
                        });
                    }
                }
            }
            nodes[processedNode['@id']] = processedNode;
            return true;
        });
    }
    for (const node of Object.values(nodes).filter((n) => !n.bbox)) {
        for (const child of childNames(node.node)
            .map((n) => nodes[n])
            .filter((n) => n.bbox)) {
            if (!node.bbox) {
                node.bbox = child.bbox.clone();
            }
            else {
                node.bbox.extend(child.bbox);
            }
        }
        if (!node.bbox) {
            delete nodes[node['@id']];
        }
    }
    for (const node of Object.values(nodes)) {
        const lb = node.bbox.lowerBound;
        const ub = node.bbox.upperBound;
        const size = (node.size = ub.clone().vsub(lb));
        const halfSize = size.clone().vmul(new Vec3(0.5, 0.5, 0.5));
        const center = (node.center = lb.clone().vadd(halfSize));
        node.transformMatrix = new Matrix4(Matrix4.IDENTITY).translate(center.toArray()).scale(halfSize.toArray());
    }
    for (const node of gltfNodes) {
        nodes[node['@id']] = node;
    }
    return nodes;
}

/**
 * A convenience wrapper class for the CCF Body UI
 */
class BodyUI {
    /**
     * Initializes the Deck.gl instance with the provided properties,
     * sets up the view state and event handlers, and initializes the scene rotation subject if a rotation is provided.
     * @param deckProps Deck.gl properties
     */
    constructor(deckProps) {
        this.deckProps = deckProps;
        /** An instance of the `BodyUILayer` class. */
        this.bodyUILayer = new BodyUILayer({});
        /** A subject for node click events. */
        this.nodeClickSubject = new Subject();
        /** A subject for node hover start events. */
        this.nodeHoverStartSubject = new Subject();
        /** A subject for node hover stop events. */
        this.nodeHoverStopSubject = new Subject();
        /** A behavior subject for scene rotation events. */
        this.sceneRotationSubject = new BehaviorSubject([0, 0]);
        /** A subject for node drag start events. */
        this.nodeDragStartSubject = new Subject();
        /** A subject for node drag events. */
        this.nodeDragSubject = new Subject();
        /** A subject for node drag end events. */
        this.nodeDragEndSubject = new Subject();
        /** An observable for node click events. */
        this.nodeClick$ = this.nodeClickSubject.pipe(share());
        /** An observable for node hover start events. */
        this.nodeHoverStart$ = this.nodeHoverStartSubject.pipe(share());
        /** An observable for node hover stop events. */
        this.nodeHoverStop$ = this.nodeHoverStopSubject.pipe(share());
        /** An observable for scene rotation events. */
        this.sceneRotation$ = this.sceneRotationSubject.pipe(share());
        /** An observable for node drag start events. */
        this.nodeDragStart$ = this.nodeDragStartSubject.pipe(share());
        /** An observable for node drag events. */
        this.nodeDrag$ = this.nodeDragSubject.pipe(share());
        /** An observable for node drag end events. */
        this.nodeDragEnd$ = this.nodeDragEndSubject.pipe(share());
        /**
         * This method handles hover events, updating the cursor and emitting hover start and stop events.
         */
        this._onHover = (e) => {
            const { lastHovered } = this;
            this.cursor = e.picked ? 'pointer' : undefined;
            if (e.picked && e.object?.['@id']) {
                if (lastHovered !== e.object) {
                    if (lastHovered) {
                        this.nodeHoverStopSubject.next(lastHovered);
                    }
                    this.lastHovered = e.object;
                    this.nodeHoverStartSubject.next(e.object);
                }
            }
            else if (lastHovered) {
                this.nodeHoverStopSubject.next(lastHovered);
                this.lastHovered = undefined;
            }
        };
        /**
         * This method handles click events, emitting node click events.
         */
        this._onClick = (info, e) => {
            if (info.picked && info.object?.['@id']) {
                this.nodeClickSubject.next({
                    node: info.object,
                    ctrlClick: e?.srcEvent?.ctrlKey ?? undefined,
                });
            }
        };
        /**
         * This method handles view state change events, updating the view state and emitting scene rotation events.
         */
        this._onViewStateChange = (event) => {
            if (event.interactionState?.isZooming) {
                const currentState = this.bodyUILayer.state;
                const zoomOpacity = Math.min(Math.max(1 - (event.viewState.zoom - 8.9) / 2, 0.05), 1.0);
                if (currentState.zoomOpacity !== zoomOpacity) {
                    this.bodyUILayer.setState({ data: currentState.data, zoomOpacity });
                }
            }
            this.deck.setProps({ viewState: { ...event.viewState } });
            this.sceneRotationSubject.next([event.viewState.rotationOrbit, event.viewState.rotationX]);
        };
        /**
         * Handles drag start event, emitting the corresponding event.
         */
        this._onDragStart = (info, e) => {
            this._dragEvent(info, e, this.nodeDragStartSubject);
        };
        /**
         * Handles ondrag events, emitting the corresponding event.
         */
        this._onDrag = (info, e) => {
            this._dragEvent(info, e, this.nodeDragSubject);
        };
        /**
         * Handles drag end, emitting the corresponding event.
         */
        this._onDragEnd = (info, e) => {
            this._dragEvent(info, e, this.nodeDragEndSubject);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = {
            ...deckProps,
            views: [this.createView(deckProps.camera)],
            controller: deckProps.interactive ?? true,
            layers: [this.bodyUILayer],
            onHover: this._onHover,
            onClick: this._onClick,
            onViewStateChange: this._onViewStateChange,
            onDragStart: this._onDragStart,
            onDrag: this._onDrag,
            onDragEnd: this._onDragEnd,
            getCursor: (e) => this.cursor ?? (e.isDragging ? 'grabbing' : 'grab'),
        };
        if (deckProps.legacyLighting) {
            props.effects = [
                new LightingEffect({
                    ambientLight: new AmbientLight({
                        color: [255, 255, 255],
                        intensity: 10.0,
                    }),
                }),
            ];
        }
        this.deck = new Deck(props);
        this.deck.setProps({
            viewState: {
                orbitAxis: 'Y',
                minRotationX: deckProps.minRotationX ?? -15,
                maxRotationX: deckProps.maxRotationX ?? 15,
                target: deckProps.target ?? [0.5, 0.5, 0],
                rotationX: 0,
                rotationOrbit: deckProps.rotation ?? 0,
                zoom: deckProps.zoom ?? 9.5,
                camera: deckProps.camera,
            },
        });
        if (deckProps.rotation) {
            this.sceneRotationSubject.next([deckProps.rotation, 0]);
        }
    }
    /**
     * Waits for the `bodyUILayer` state to be initialized.
     * @returns Promise
     */
    async initialize() {
        while (!this.bodyUILayer.state) {
            await new Promise((r) => {
                setTimeout(r, 200);
            });
        }
    }
    /**
     * This method finalizes the Deck.gl instance, cleaning up any resources.
     */
    finalize() {
        this.deck.finalize();
    }
    /**
     * This method sets the scene data for the BodyUILayer and optionally zooms to nodes that require it.
     * @param data An array of SpatialSceneNode objects representing the scene data.
     */
    setScene(data) {
        let zoomOpacity = this.bodyUILayer.state.zoomOpacity;
        let didZoom = false;
        for (const node of data) {
            if (node.zoomToOnLoad) {
                this.zoomTo(node);
                didZoom = true;
            }
        }
        zoomOpacity = didZoom ? 0.05 : zoomOpacity;
        if (!this.deckProps.debugSceneNodeProcessing) {
            this.bodyUILayer.setState({ data, zoomOpacity });
        }
        else {
            this.debugSceneNodeProcessing(data, zoomOpacity);
        }
    }
    /**
     * This method processes scene nodes for debugging purposes and updates the BodyUILayer state with the processed data.
     * @param data An array of SpatialSceneNode objects representing the scene data.
     * @param zoomOpacity The zoom opacity value.
     */
    debugSceneNodeProcessing(data, zoomOpacity) {
        const gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Female/United/VHF_United_Color.glb';
        const gltfTransform = new Matrix4([
            0.076, 0, 0, 0, 0, 0.076, 1.6875389974302382e-17, 0, 0, -1.6875389974302382e-17, 0.076, 0, 0.49, 0.034, 0.11, 1,
        ]);
        processSceneNodes(gltfUrl, gltfTransform, 'VHF_Kidney_L_Low1').then((results) => {
            console.log('results', results);
            console.log('data', data);
            data = data.concat(Object.values(results));
            data.push({
                '@id': 'TEST',
                '@type': 'TEST',
                scenegraph: gltfUrl,
                scenegraphNode: 'VHF_Kidney_R_Low',
                transformMatrix: gltfTransform,
                color: [255, 255, 255, 200],
                _lighting: 'pbr',
                zoomBasedOpacity: false,
            });
            this.bodyUILayer.setState({ data, zoomOpacity });
        });
    }
    /**
     * This method zooms the view to a specific node.
     * @param node The SpatialSceneNode object to zoom to.
     */
    zoomTo(node) {
        const matrix = new Matrix4(node.transformMatrix);
        this.deck.setProps({
            viewState: {
                ...this.deck.props.viewState,
                target: matrix.getTranslation(),
                rotationX: 0,
                rotationOrbit: 0,
                zoom: 11.5,
            },
        });
    }
    /**
     * This method sets the rotation orbit value for the view.
     * @param value The rotation orbit value.
     */
    setRotation(value) {
        this.deck.setProps({
            viewState: {
                ...this.deck.props.viewState,
                rotationOrbit: value,
            },
        });
    }
    /**
     * This method sets the rotation X value for the view.
     * @param value The rotation X value.
     */
    setRotationX(value) {
        this.deck.setProps({
            viewState: {
                ...this.deck.props.viewState,
                rotationX: value,
            },
        });
    }
    /**
     * This method sets the zoom value for the view.
     * @param value The zoom value.
     */
    setZoom(value) {
        this.deck.setProps({
            viewState: {
                ...this.deck.props.viewState,
                zoom: value,
            },
        });
    }
    /**
     * This method sets the target position for the view.
     * @param value An array representing the target position.
     */
    setTarget(value) {
        this.deck.setProps({
            viewState: {
                ...this.deck.props.viewState,
                target: value,
            },
        });
    }
    /**
     * This method sets the interactivity of the view.
     * @param value A boolean indicating if the view should be interactive.
     */
    setInteractive(value) {
        const { camera } = this.deck.props.viewState;
        this.deck.setProps({
            controller: value,
            views: [this.createView(camera)],
        });
    }
    /**
     * Updates camera type
     * @param value Camera type
     */
    setCamera(value) {
        this.deck.setProps({
            views: [this.createView(value)],
            viewState: {
                ...this.deck.props.viewState,
                camera: value,
            },
        });
    }
    /**
     * This method handles drag events, emitting the corresponding drag event to the provided subject.
     * @param info The pick information for the dragged object.
     * @param e The mouse event.
     * @param subject The subject to emit the drag event to.
     */
    _dragEvent(info, e, subject) {
        if (info?.object?.['@id']) {
            subject.next({ node: info.object, info, e });
        }
    }
    /**
     * Creates a new view
     * @param camera Camera type
     * @returns view
     */
    createView(camera) {
        return camera === 'orthographic'
            ? new OrthographicView({ flipY: false, near: -1000 })
            : new OrbitView({ orbitAxis: 'Y' });
    }
}

const _c0 = ["canvas"];
/** Parses the input if it is a JSON String */
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
/** Utility function to set input values to BodyUI */
function setInput(bodyUi, source, setter, defaultValue) {
    const value = source ?? defaultValue;
    if (bodyUi && value !== undefined) {
        bodyUi[setter](value);
    }
}
/** Utility function to use input data to set to relevant body ui setter */
function connectInput(bodyUi, source, setter) {
    effect(() => setInput(bodyUi(), source(), setter));
}
/** Utility function to use output data to set to relevant body ui subject */
function connectOutput(out, source) {
    return source.subscribe((value) => out.emit(value));
}
/** Zod for SPATIAL SCENE NODE  */
const SPATIAL_SCENE_NODE = z
    .object({})
    .passthrough()
    .refine((obj) => true);
/** Zod for SPATIAL SCENE NODE array */
const SPATIAL_SCENE_NODE_ARRAY = z.array(SPATIAL_SCENE_NODE);
/** Preprocesses the scene input */
const SCENE_INPUT = z.preprocess(tryParseJson, z.union([z.undefined(), z.literal(''), z.string().url(), SPATIAL_SCENE_NODE_ARRAY]));
/** Bind scene input */
const parseSceneInput = SCENE_INPUT.parse.bind(SCENE_INPUT);
/** Preprocess the target input */
const TARGET_INPUT = z.preprocess(tryParseJson, z.tuple([z.number(), z.number(), z.number()]));
/** Bind target input */
const parseTargetInput = TARGET_INPUT.parse.bind(TARGET_INPUT);
/** Preprocess the bounds input */
const BOUNDS_INPUT = z.preprocess(tryParseJson, z.object({ x: z.number(), y: z.number(), z: z.number() }));
/** Bind the bounds input */
const parseBoundsInput = BOUNDS_INPUT.parse.bind(BOUNDS_INPUT);
/** Initial state properties for the deck gl view */
const INITIAL_PROPS = {
    zoom: 9.5,
    target: [0, 0, 0],
    rotation: 0,
    minRotationX: -75,
    maxRotationX: 75,
    interactive: true,
    camera: '',
};
/** HRA Body UI Component */
class BodyUiComponent {
    /** Constructor for the component */
    constructor() {
        /** Scene for the deck gl */
        this.scene = input(undefined, ...(ngDevMode ? [{ debugName: "scene", transform: parseSceneInput }] : [{ transform: parseSceneInput }]));
        /** Rotation for the deck gl */
        this.rotation = input(undefined, ...(ngDevMode ? [{ debugName: "rotation", transform: numberAttribute }] : [{ transform: numberAttribute }]));
        /** Rotation X for the deck gl */
        this.rotationX = input(undefined, ...(ngDevMode ? [{ debugName: "rotationX", transform: numberAttribute }] : [{ transform: numberAttribute }]));
        /** Zoom for the deck gl */
        this.zoom = input(undefined, ...(ngDevMode ? [{ debugName: "zoom", transform: numberAttribute }] : [{ transform: numberAttribute }]));
        /** Target for the deck gl */
        this.target = input(undefined, ...(ngDevMode ? [{ debugName: "target", transform: parseTargetInput }] : [{ transform: parseTargetInput }]));
        /** Bounds for the deck gl */
        this.bounds = input(undefined, ...(ngDevMode ? [{ debugName: "bounds", transform: parseBoundsInput }] : [{ transform: parseBoundsInput }]));
        /** Camera for the deck gl */
        this.camera = input(...(ngDevMode ? [undefined, { debugName: "camera" }] : []));
        /** Flag for the interactive for deck gl */
        this.interactive = input(undefined, ...(ngDevMode ? [{ debugName: "interactive", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
        /** Output for node click */
        this.nodeClick = output();
        /** Output for node drag */
        this.nodeDrag = output();
        /** Output for node hover start */
        this.nodeHoverStart = output();
        /** Output for node hover end */
        this.nodeHoverStop = output();
        /** Output for rotation change */
        this.rotationChange = output();
        /** Output that emits when deck gl has been initialized */
        this.initialized = output();
        /** Instance of HttpClient */
        this.http = inject(HttpClient);
        /** Instance of Error Handler */
        this.errorHandler = inject(ErrorHandler);
        /** Instance of canvas element */
        this.canvas = viewChild.required('canvas');
        /** Instance of BodyUI class */
        this.bodyUi = derivedAsync(async () => {
            const bodyUi = new BodyUI({
                id: 'bodyUI',
                canvas: this.canvas().nativeElement,
                ...INITIAL_PROPS,
            });
            await bodyUi.initialize();
            return bodyUi;
        }, { initialValue: undefined });
        /** Processed scene data for deck gl */
        this.sceneData = derivedAsync(() => {
            const value = this.scene();
            if (!value) {
                return [];
            }
            else if (typeof value !== 'string') {
                return value;
            }
            return this.http.get(value).pipe(map((data) => SPATIAL_SCENE_NODE_ARRAY.parse(data)), catchError((error) => {
                this.errorHandler.handleError(error);
                return of([]);
            }));
        }, { initialValue: [] });
        /** Returns the bounds zoom according to bounds input */
        this.boundsZoom = () => {
            const bounds = this.bounds();
            return bounds ? this.getBoundsZoom(bounds) : undefined;
        };
        connectInput(this.bodyUi, this.sceneData, 'setScene');
        connectInput(this.bodyUi, this.rotation, 'setRotation');
        connectInput(this.bodyUi, this.rotationX, 'setRotationX');
        connectInput(this.bodyUi, this.target, 'setTarget');
        connectInput(this.bodyUi, this.zoom, 'setZoom');
        connectInput(this.bodyUi, this.boundsZoom, 'setZoom');
        connectInput(this.bodyUi, this.camera, 'setCamera');
        connectInput(this.bodyUi, this.interactive, 'setInteractive');
        effect((onCleanup) => {
            const bodyUi = this.bodyUi();
            if (bodyUi) {
                const subscriptions = new Subscription();
                subscriptions.add(connectOutput(this.nodeClick, bodyUi.nodeClick$));
                subscriptions.add(connectOutput(this.nodeDrag, bodyUi.nodeDrag$));
                subscriptions.add(connectOutput(this.nodeHoverStart, bodyUi.nodeHoverStart$));
                subscriptions.add(connectOutput(this.nodeHoverStop, bodyUi.nodeHoverStop$));
                subscriptions.add(connectOutput(this.rotationChange, bodyUi.sceneRotation$));
                subscriptions.add(() => bodyUi.finalize());
                onCleanup(() => subscriptions.unsubscribe());
            }
        });
        const initializeEffect = effect(() => {
            if (this.bodyUi()) {
                this.initialized.emit();
                initializeEffect.destroy();
            }
        }, ...(ngDevMode ? [{ debugName: "initializeEffect" }] : []));
    }
    /** Resets the deck gl view */
    resetView() {
        const bodyUi = this.bodyUi();
        setInput(bodyUi, this.target(), 'setTarget', INITIAL_PROPS.target);
        setInput(bodyUi, this.rotation(), 'setRotation', INITIAL_PROPS.rotation);
        setInput(bodyUi, this.rotationX(), 'setRotationX', 0);
        setInput(bodyUi, this.zoom(), 'setZoom', INITIAL_PROPS.zoom);
        setInput(bodyUi, this.boundsZoom(), 'setZoom');
    }
    /** Sets the deck gl zoom according to the provided bounds */
    zoomToBounds(bounds, margin = { x: 48, y: 48 }) {
        const zoom = this.getBoundsZoom(bounds, margin);
        this.bodyUi()?.setZoom(zoom);
    }
    /** Returns zoom value according to current bounds */
    getBoundsZoom(bounds, margin = { x: 48, y: 48 }) {
        const { width, height } = this.canvas().nativeElement;
        const pxRatio = window.devicePixelRatio;
        if (bounds.x === 0 && bounds.y === 0) {
            return INITIAL_PROPS.zoom;
        }
        return Math.min(Math.log2((width - margin.x) / pxRatio / bounds.x), Math.log2((height - margin.y) / pxRatio / bounds.y));
    }
    static { this.ɵfac = function BodyUiComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BodyUiComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BodyUiComponent, selectors: [["hra-body-ui"]], viewQuery: function BodyUiComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.canvas, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { scene: [1, "scene"], rotation: [1, "rotation"], rotationX: [1, "rotationX"], zoom: [1, "zoom"], target: [1, "target"], bounds: [1, "bounds"], camera: [1, "camera"], interactive: [1, "interactive"] }, outputs: { nodeClick: "nodeClick", nodeDrag: "nodeDrag", nodeHoverStart: "nodeHoverStart", nodeHoverStop: "nodeHoverStop", rotationChange: "rotationChange", initialized: "initialized" }, decls: 2, vars: 0, consts: [["canvas", ""], ["role", "img", "part", "canvas"]], template: function BodyUiComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElement(0, "canvas", 1, 0);
        } }, styles: [":host{display:block;position:relative;width:100%;height:100%}:host canvas{background-color:#000}\n"], encapsulation: 3 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BodyUiComponent, [{
        type: Component,
        args: [{ selector: 'hra-body-ui', encapsulation: ViewEncapsulation.ShadowDom, template: "<canvas role=\"img\" part=\"canvas\" #canvas></canvas>\n", styles: [":host{display:block;position:relative;width:100%;height:100%}:host canvas{background-color:#000}\n"] }]
    }], () => [], { scene: [{ type: i0.Input, args: [{ isSignal: true, alias: "scene", required: false }] }], rotation: [{ type: i0.Input, args: [{ isSignal: true, alias: "rotation", required: false }] }], rotationX: [{ type: i0.Input, args: [{ isSignal: true, alias: "rotationX", required: false }] }], zoom: [{ type: i0.Input, args: [{ isSignal: true, alias: "zoom", required: false }] }], target: [{ type: i0.Input, args: [{ isSignal: true, alias: "target", required: false }] }], bounds: [{ type: i0.Input, args: [{ isSignal: true, alias: "bounds", required: false }] }], camera: [{ type: i0.Input, args: [{ isSignal: true, alias: "camera", required: false }] }], interactive: [{ type: i0.Input, args: [{ isSignal: true, alias: "interactive", required: false }] }], nodeClick: [{ type: i0.Output, args: ["nodeClick"] }], nodeDrag: [{ type: i0.Output, args: ["nodeDrag"] }], nodeHoverStart: [{ type: i0.Output, args: ["nodeHoverStart"] }], nodeHoverStop: [{ type: i0.Output, args: ["nodeHoverStop"] }], rotationChange: [{ type: i0.Output, args: ["rotationChange"] }], initialized: [{ type: i0.Output, args: ["initialized"] }], canvas: [{ type: i0.ViewChild, args: ['canvas', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BodyUiComponent, { className: "BodyUiComponent", filePath: "lib/body-ui/body-ui.component.ts", lineNumber: 125 }); })();

/**
 * This function simplifies a scene by processing spatial scene nodes, loading GLTF files, and generating new nodes with simplified geometry.
 * @param nodes An array of SpatialSceneNode objects representing the nodes in the scene.
 * @returns A promise that resolves to an array of simplified SpatialSceneNode objects.
 */
async function simplifyScene(nodes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gltfCache = {};
    const gltfUrls = new Set(nodes.map((n) => n.scenegraph).filter((n) => !!n));
    for (const gltfUrl of gltfUrls) {
        gltfCache[gltfUrl] = await loadGLTF({
            scenegraph: gltfUrl,
        });
    }
    const newNodes = nodes.filter((n) => !n.scenegraph);
    for (const model of nodes.filter((n) => n.scenegraph)) {
        const gltf = gltfCache[model.scenegraph];
        const bbox = new AABB();
        let worldMatrix = new Matrix4(model.transformMatrix);
        if (model.scenegraphNode) {
            const scenegraphNode = model.scenegraphNode
                ? gltf.nodes.find((n) => n.name === model.scenegraphNode)
                : undefined;
            let foundNodeInScene = false;
            for (const scene of gltf.scenes) {
                if (!foundNodeInScene) {
                    traverseScene(scene, new Matrix4(model.transformMatrix), (child, modelMatrix) => {
                        if (child === scenegraphNode) {
                            worldMatrix = modelMatrix;
                            foundNodeInScene = true;
                            return false;
                        }
                        return true;
                    });
                }
            }
            gltf.scene = {
                id: model.scenegraphNode,
                name: model.scenegraphNode,
                nodes: [scenegraphNode],
            };
        }
        traverseScene(gltf.scene, worldMatrix, (node, modelMatrix) => {
            if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                for (const primitive of node.mesh.primitives) {
                    if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                        const lowerBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                        const upperBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                        const innerBbox = new AABB({
                            lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                            upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i]))),
                        });
                        bbox.extend(innerBbox);
                    }
                }
            }
            return true;
        });
        const size = bbox.upperBound.clone().vsub(bbox.lowerBound);
        const halfSize = size.clone().vmul(new Vec3(0.5, 0.5, 0.5));
        const position = bbox.lowerBound.clone().vadd(halfSize);
        const transformMatrix = new Matrix4(Matrix4.IDENTITY).translate(position.toArray()).scale(halfSize.toArray());
        const newNode = {
            ...model,
            transformMatrix,
            geometry: 'wireframe',
        };
        delete newNode.scenegraph;
        delete newNode.scenegraphNode;
        newNodes.push(newNode);
    }
    return newNodes;
}

// Hack to support deck.gl and other typings
/// <reference types="node" />
/*
 * Public API Surface of ccf-body-ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BodyUI, BodyUILayer, BodyUiComponent, SPATIAL_SCENE_NODE, SPATIAL_SCENE_NODE_ARRAY, deriveScenegraph, doCollisions, loadGLTF, loadGLTF2, processSceneNodes, registerGLTFLoaders, simplifyScene, traverseScene };
//# sourceMappingURL=ccf-body-ui.mjs.map
