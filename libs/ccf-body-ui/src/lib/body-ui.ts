import { AmbientLight, Deck, LightingEffect, OrbitView, OrthographicView } from '@deck.gl/core/typed';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { Matrix4 } from '@math.gl/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

import { BodyUILayer } from './body-ui-layer';
import { processSceneNodes } from './util/process-scene-nodes';

/**
 * This interface defines the properties for the view state of the BodyUI component.
 */
interface BodyUIViewStateProps {
  /** The axis of orbit rotation. */
  orbitAxis?: string;
  /** The target position for the view. */
  target?: [number, number, number];
  /** The zoom level. */
  zoom: number;
  /** The orbit rotation angle. */
  rotationOrbit: number;
  /** The rotation angle along the X-axis. */
  rotationX: number;
  /** The camera type. */
  camera: string;
}

/**
 * This interface defines the properties for the BodyUI component.
 */
export interface BodyUIProps {
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
export interface PickInfo<D> {
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
export type NodeDragEvent = {
  /** The dragged node. */
  node: SpatialSceneNode;
  /** The pick information for the dragged node. */
  info: PickInfo<SpatialSceneNode>;
  /** The mouse event. */
  e: MouseEvent;
};

/**
 * This type defines the event for a node click.
 */
export type NodeClickEvent = {
  /** The clicked node. */
  node: SpatialSceneNode;
  /** A flag indicating if the control key was pressed during the click. */
  ctrlClick: boolean;
};

/**
 * A convenience wrapper class for the CCF Body UI
 */
export class BodyUI {
  /** The Deck.gl instance. */
  deck: Deck;
  /** An instance of the `BodyUILayer` class. */
  private readonly bodyUILayer = new BodyUILayer({});

  /** A subject for node click events. */
  private readonly nodeClickSubject = new Subject<NodeClickEvent>();
  /** A subject for node hover start events. */
  private readonly nodeHoverStartSubject = new Subject<SpatialSceneNode>();
  /** A subject for node hover stop events. */
  private readonly nodeHoverStopSubject = new Subject<SpatialSceneNode>();
  /** A behavior subject for scene rotation events. */
  private readonly sceneRotationSubject = new BehaviorSubject<[number, number]>([0, 0]);
  /** A subject for node drag start events. */
  private readonly nodeDragStartSubject = new Subject<NodeDragEvent>();
  /** A subject for node drag events. */
  private readonly nodeDragSubject = new Subject<NodeDragEvent>();
  /** A subject for node drag end events. */
  private readonly nodeDragEndSubject = new Subject<NodeDragEvent>();

  /** An observable for node click events. */
  readonly nodeClick$ = this.nodeClickSubject.pipe(share());
  /** An observable for node hover start events. */
  readonly nodeHoverStart$ = this.nodeHoverStartSubject.pipe(share());
  /** An observable for node hover stop events. */
  readonly nodeHoverStop$ = this.nodeHoverStopSubject.pipe(share());
  /** An observable for scene rotation events. */
  readonly sceneRotation$ = this.sceneRotationSubject.pipe(share());
  /** An observable for node drag start events. */
  readonly nodeDragStart$ = this.nodeDragStartSubject.pipe(share());
  /** An observable for node drag events. */
  readonly nodeDrag$ = this.nodeDragSubject.pipe(share());
  /** An observable for node drag end events. */
  readonly nodeDragEnd$ = this.nodeDragEndSubject.pipe(share());

  /** The cursor style. */
  private cursor?: string;
  /** The last hovered node. */
  private lastHovered?: SpatialSceneNode;

  /**
   * Initializes the Deck.gl instance with the provided properties,
   * sets up the view state and event handlers, and initializes the scene rotation subject if a rotation is provided.
   * @param deckProps Deck.gl properties
   */
  constructor(private readonly deckProps: Partial<BodyUIProps>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {
      ...deckProps,
      views: [
        deckProps.camera === 'orthographic'
          ? new OrthographicView({ flipY: false, near: -1000 })
          : new OrbitView({ orbitAxis: 'Y' }),
      ],
      controller: deckProps.interactive ?? true,
      layers: [this.bodyUILayer],
      onHover: this._onHover,
      onClick: this._onClick,
      onViewStateChange: this._onViewStateChange,
      onDragStart: this._onDragStart,
      onDrag: this._onDrag,
      onDragEnd: this._onDragEnd,
      getCursor: (e: { isDragging: boolean }) => this.cursor ?? (e.isDragging ? 'grabbing' : 'grab'),
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
      } as BodyUIViewStateProps,
    });
    if (deckProps.rotation) {
      this.sceneRotationSubject.next([deckProps.rotation, 0]);
    }
  }

  /**
   * Waits for the `bodyUILayer` state to be initialized.
   * @returns Promise
   */
  async initialize(): Promise<void> {
    while (!this.bodyUILayer.state) {
      await new Promise((r) => {
        setTimeout(r, 200);
      });
    }
  }

  /**
   * This method finalizes the Deck.gl instance, cleaning up any resources.
   */
  finalize(): void {
    this.deck.finalize();
  }

  /**
   * This method sets the scene data for the BodyUILayer and optionally zooms to nodes that require it.
   * @param data An array of SpatialSceneNode objects representing the scene data.
   */
  setScene(data: SpatialSceneNode[]): void {
    if (data?.length > 0) {
      let zoomOpacity = (this.bodyUILayer.state as { zoomOpacity: number }).zoomOpacity;
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
      } else {
        this.debugSceneNodeProcessing(data, zoomOpacity);
      }
    }
  }

  /**
   * This method processes scene nodes for debugging purposes and updates the BodyUILayer state with the processed data.
   * @param data An array of SpatialSceneNode objects representing the scene data.
   * @param zoomOpacity The zoom opacity value.
   */
  debugSceneNodeProcessing(data: SpatialSceneNode[], zoomOpacity: number): void {
    const gltfUrl =
      'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Female/United/VHF_United_Color.glb';
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
  zoomTo(node: SpatialSceneNode): void {
    const matrix = new Matrix4(node.transformMatrix);
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        target: matrix.getTranslation(),
        rotationX: 0,
        rotationOrbit: 0,
        zoom: 11.5,
      } as BodyUIViewStateProps,
    });
  }

  /**
   * This method sets the rotation orbit value for the view.
   * @param value The rotation orbit value.
   */
  setRotation(value: number): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        rotationOrbit: value,
      } as BodyUIViewStateProps,
    });
  }

  /**
   * This method sets the rotation X value for the view.
   * @param value The rotation X value.
   */
  setRotationX(value: number): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        rotationX: value,
      } as BodyUIViewStateProps,
    });
  }

  /**
   * This method sets the zoom value for the view.
   * @param value The zoom value.
   */
  setZoom(value: number): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        zoom: value,
      } as BodyUIViewStateProps,
    });
  }

  /**
   * This method sets the target position for the view.
   * @param value An array representing the target position.
   */
  setTarget(value: number[]): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        target: value,
      } as BodyUIViewStateProps,
    });
  }

  /**
   * This method sets the interactivity of the view.
   * @param value A boolean indicating if the view should be interactive.
   */
  setInteractive(value: boolean): void {
    this.deck.setProps({
      controller: value,
    });
  }

  /**
   * This method handles hover events, updating the cursor and emitting hover start and stop events.
   */
  private readonly _onHover = (e: { picked: boolean; object: SpatialSceneNode }): void => {
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
    } else if (lastHovered) {
      this.nodeHoverStopSubject.next(lastHovered);
      this.lastHovered = undefined;
    }
  };

  /**
   * This method handles click events, emitting node click events.
   */
  private readonly _onClick = (info: PickInfo<SpatialSceneNode>, e: { srcEvent: { ctrlKey: boolean } }): void => {
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
  private readonly _onViewStateChange = (event: {
    interactionState: { isZooming: boolean };
    viewState: BodyUIViewStateProps;
  }): void => {
    if (event.interactionState?.isZooming) {
      const currentState = this.bodyUILayer.state as {
        zoomOpacity: number;
        data: unknown;
      };
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
  private readonly _onDragStart = (info: PickInfo<SpatialSceneNode>, e: MouseEvent): void => {
    this._dragEvent(info, e, this.nodeDragStartSubject);
  };

  /**
   * Handles ondrag events, emitting the corresponding event.
   */
  private readonly _onDrag = (info: PickInfo<SpatialSceneNode>, e: MouseEvent): void => {
    this._dragEvent(info, e, this.nodeDragSubject);
  };

  /**
   * Handles drag end, emitting the corresponding event.
   */
  private readonly _onDragEnd = (info: PickInfo<SpatialSceneNode>, e: MouseEvent): void => {
    this._dragEvent(info, e, this.nodeDragEndSubject);
  };

  /**
   * This method handles drag events, emitting the corresponding drag event to the provided subject.
   * @param info The pick information for the dragged object.
   * @param e The mouse event.
   * @param subject The subject to emit the drag event to.
   */
  private _dragEvent(info: PickInfo<SpatialSceneNode>, e: MouseEvent, subject: Subject<NodeDragEvent>): void {
    if (info?.object?.['@id']) {
      subject.next({ node: info.object, info, e });
    }
  }
}
