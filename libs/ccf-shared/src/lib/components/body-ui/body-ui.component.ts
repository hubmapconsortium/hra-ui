import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { BodyUI, NodeClickEvent, NodeDragEvent } from 'ccf-body-ui';
import { Subscription } from 'rxjs';

/** x, y, z coordinage triplet */
interface XYZTriplet<T = number> {
  /** X coordinate */
  x: T;
  /** Y coordinate */
  y: T;
  /** Z coordinate */
  z: T;
}

/**
 * Component that handles displaying the 3D models in the stage
 */
@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BodyUiComponent implements AfterViewInit, OnDestroy {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-body-ui';

  /** Get scene nodes */
  @Input()
  get scene(): SpatialSceneNode[] {
    return this._scene;
  }

  /** Set scene nodes */
  set scene(nodes: SpatialSceneNode[]) {
    this._scene = nodes;
    this.bodyUI?.setScene(nodes);
  }

  /** Get scene rotation */
  @Input()
  get rotation(): number {
    return this._rotation;
  }

  /** Set scene rotation */
  set rotation(value: number) {
    this._rotation = value;
    this.bodyUI?.setRotation(value);
  }

  /** Get scene x rotation */
  @Input()
  get rotationX(): number {
    return this._rotationX;
  }

  /** Set scene x rotation */
  set rotationX(value: number) {
    this._rotationX = value;
    this.bodyUI?.setRotationX(value);
  }

  /** Get scene zoom */
  @Input()
  get zoom(): number {
    return this._zoom;
  }

  /** Set scene zoom */
  set zoom(value: number) {
    this._zoom = value;
    this.bodyUI?.setZoom(value);
  }

  /** Get scene target */
  @Input()
  get target(): [number, number, number] {
    return this._target;
  }

  /** Set scene target */
  set target(value: [number, number, number]) {
    this._target = value;
    this.bodyUI?.setTarget(value);
  }

  /** Get scene bounds */
  @Input()
  get bounds(): XYZTriplet {
    return this._bounds;
  }

  /** Set scene bounds */
  set bounds(value: XYZTriplet) {
    this._bounds = value;
    this.zoomToBounds(value);
  }

  /** Get scene camera */
  @Input()
  get camera(): string {
    return this._camera;
  }

  /** Set scene camera */
  set camera(value: string) {
    this._camera = value;
  }

  /** Emits when the scene is rotated */
  @Output()
  readonly rotationChange = new EventEmitter<[number, number]>();

  /** Emits when a node is dragged */
  @Output()
  readonly nodeDrag = new EventEmitter<NodeDragEvent>();

  /** Emits when a node is clicked */
  @Output()
  readonly nodeClick = new EventEmitter<NodeClickEvent>();

  /** Emits when a node is hovered */
  @Output()
  readonly nodeHoverStart = new EventEmitter<SpatialSceneNode>();

  /** Emits when a node is no longer hovered */
  @Output()
  readonly nodeHoverStop = new EventEmitter<SpatialSceneNode>();

  /** Emits once the scene is initialized */
  @Output()
  readonly initialized = new EventEmitter<void>();

  /** Get whether the scene is interactive */
  @Input()
  get interactive(): boolean {
    return this._interactive;
  }

  /** Set whether the scene is interactive */
  set interactive(value: boolean) {
    this._interactive = value;
    if (this.bodyUI) {
      this.recreateBodyUI();
    }
  }

  /** Whether the scene is interactive */
  private _interactive = true;
  /** Current rotation */
  private _rotation = 0;
  /** Current x rotation */
  private _rotationX = 0;
  /** Current zoom level */
  private _zoom = 9.5;
  /** Current target */
  private _target: [number, number, number] = [0, 0, 0];
  /** Current bounds */
  private _bounds!: XYZTriplet;
  /** Scene nodes */
  private _scene: SpatialSceneNode[] = [];
  /** Subscriptions */
  private subscriptions: Subscription[] = [];
  /** Camera */
  private _camera!: string;

  /**
   * Instance of the body UI class for rendering the deckGL scene
   */
  bodyUI!: BodyUI;

  /**
   * Reference to the div we are using to mount the body UI to.
   */
  @ViewChild('bodyCanvas', { read: ElementRef })
  bodyCanvas!: ElementRef<HTMLCanvasElement>;

  /**
   * Performs setup required after initialization
   */
  ngAfterViewInit(): void {
    this.setupBodyUI();
  }

  /** Zoom to bounds */
  zoomToBounds(bounds: XYZTriplet, margin = { x: 48, y: 48 }): void {
    if (this.bodyCanvas) {
      const { width, height } = this.bodyCanvas.nativeElement;
      const pxRatio = window.devicePixelRatio;
      const zoom = Math.min(
        Math.log2((width - margin.x) / pxRatio / bounds.x),
        Math.log2((height - margin.y) / pxRatio / bounds.y),
      );
      this.zoom = zoom;
    }
  }

  /**
   * Set up required to render the body UI with the scene nodes.
   */
  private async setupBodyUI(): Promise<void> {
    const canvas = this.bodyCanvas.nativeElement;
    const bodyUI = new BodyUI({
      id: 'body-ui',
      canvas,
      zoom: this.zoom,
      target: [0, 0, 0],
      rotation: 0,
      minRotationX: -75,
      maxRotationX: 75,
      interactive: this.interactive,
      camera: this.camera,
    });
    canvas.addEventListener('contextmenu', (evt) => evt.preventDefault());
    await bodyUI.initialize();
    this.bodyUI = bodyUI;
    (window as unknown as { bodyUI: unknown }).bodyUI = bodyUI;
    if (this.scene?.length > 0) {
      this.bodyUI.setScene(this.scene);
    }
    if (this.bounds) {
      this.zoomToBounds(this.bounds);
    }
    if (this.target) {
      this.bodyUI.setTarget(this.target);
    }
    this.subscriptions = [
      this.bodyUI.sceneRotation$.subscribe((rotation) => this.rotationChange.next(rotation)),
      this.bodyUI.nodeDrag$.subscribe((event) => this.nodeDrag.emit(event)),
      this.bodyUI.nodeClick$.subscribe((event) => this.nodeClick.emit(event)),
      this.bodyUI.nodeHoverStart$.subscribe((event) => this.nodeHoverStart.emit(event)),
      this.bodyUI.nodeHoverStop$.subscribe((event) => this.nodeHoverStop.emit(event)),
    ];
    this.initialized.emit();
  }

  /** Reinitializes the body ui */
  private recreateBodyUI(): void {
    this.clearSubscriptions();
    this.bodyUI.finalize();
    this.setupBodyUI();
  }

  /** Cleans up subscriptions */
  private clearSubscriptions(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }

  /** Cleans up the component */
  ngOnDestroy(): void {
    this.clearSubscriptions();
  }
}
