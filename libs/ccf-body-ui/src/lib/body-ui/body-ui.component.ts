import { HttpClient } from '@angular/common/http';
import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  input,
  numberAttribute,
  output,
  OutputEmitterRef,
  Signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { derivedAsync } from 'ngxtension/derived-async';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { z } from 'zod';
import { BodyUI, NodeClickEvent, NodeDragEvent } from '../body-ui';

/** Interface for bounds */
export interface XYZTriplet<T = number> {
  x: T;
  y: T;
  z: T;
}

/** Type for setter methods of the BodyUI */
type SetterMethods<ValueT> = keyof {
  [P in keyof BodyUI as BodyUI[P] extends (v: ValueT) => void ? P : never]: BodyUI[P];
};

/** Parses the input if it is a JSON String */
function tryParseJson(value: unknown): unknown {
  try {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
  } catch {
    // Ignore errors
  }

  return value;
}

/** Utility function to use input data to set to relevant body ui setter */
function connectInput<T>(
  bodyUi: Signal<BodyUI | undefined>,
  source: Signal<T | undefined>,
  setter: SetterMethods<T>,
): void {
  const value = source();
  if (value !== undefined) {
    bodyUi()?.[setter](value as never);
  }
}

/** Utility function to use output data to set to relevant body ui subject */
function connectOutput<T>(out: OutputEmitterRef<T>, source: Observable<T>): Subscription {
  return source.subscribe((value) => out.emit(value));
}

/** Zod for SPATIAL SCENE NODE  */
export const SPATIAL_SCENE_NODE = z
  .object({})
  .passthrough()
  .refine((obj): obj is SpatialSceneNode => true);

/** Zod for SPATIAL SCENE NODE array */
export const SPATIAL_SCENE_NODE_ARRAY = z.array(SPATIAL_SCENE_NODE);

/** Preprocesses the scene input */
const SCENE_INPUT = z.preprocess(tryParseJson, z.union([z.literal(''), z.string().url(), SPATIAL_SCENE_NODE_ARRAY]));
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

/** HRA Body UI Component */
@Component({
  standalone: true,
  imports: [],
  selector: 'hra-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrl: './body-ui.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BodyUiComponent {
  /** Scene for the deck gl */
  readonly scene = input(undefined, { transform: parseSceneInput });

  /** Rotation for the deck gl */
  readonly rotation = input(undefined, { transform: numberAttribute });
  /** Rotation X for the deck gl */
  readonly rotationX = input(undefined, { transform: numberAttribute });
  /** Zoom for the deck gl */
  readonly zoom = input(undefined, { transform: numberAttribute });
  /** Target for the deck gl */
  readonly target = input(undefined, { transform: parseTargetInput });
  /** Bounds for the deck gl */
  readonly bounds = input(undefined, { transform: parseBoundsInput });
  /** Camera for the deck gl */
  readonly camera = input<string>();
  /** Flag for the interactive for deck gl */
  readonly interactive = input(true, { transform: booleanAttribute });

  /** Output for rotation change */
  readonly rotationChange = output<[number, number]>();
  /** Output for node click */
  readonly nodeClick = output<NodeClickEvent>();
  /** Output for node drag */
  readonly nodeDrag = output<NodeDragEvent>();
  /** Output for node hover start */
  readonly nodeHoverStart = output<SpatialSceneNode>();
  /** Output for node hover end */
  readonly nodeHoverStop = output<SpatialSceneNode>();

  /** Instance of HttpClient */
  private readonly http = inject(HttpClient);
  /** Instance of Error Handler */
  private readonly errorHandler = inject(ErrorHandler);

  /** Instance of canvas element */
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  /** Instance of BodyUI class */
  private readonly bodyUi = derivedAsync(
    async () => {
      const bodyUi = new BodyUI({
        id: 'bodyUI',
        canvas: this.canvas().nativeElement,
        zoom: 9.5,
        target: [0, 0, 0],
        rotation: 0,
        minRotationX: -75,
        maxRotationX: 75,
        interactive: true,
        camera: '',
      });

      await bodyUi.initialize();
      return bodyUi;
    },
    { initialValue: undefined },
  );

  /** Processed scene data for deck gl */
  private readonly sceneData = derivedAsync<SpatialSceneNode[]>(
    () => {
      const value = this.scene();
      if (!value) {
        return [];
      } else if (typeof value !== 'string') {
        return value;
      }

      return this.http.get(value).pipe(
        map((data) => SPATIAL_SCENE_NODE_ARRAY.parse(data)),
        catchError((error) => {
          this.errorHandler.handleError(error);
          return of<SpatialSceneNode[]>([]);
        }),
      );
    },
    { initialValue: [] },
  );

  /** Returns the bounds zoom according to bounds input */
  private readonly boundsZoom = computed(() => {
    const bounds = this.bounds();
    return bounds ? this.getBoundsZoom(bounds) : undefined;
  });

  /** Constructor for the component */
  constructor() {
    effect(() => connectInput(this.bodyUi, this.sceneData, 'setScene'));
    effect(() => connectInput(this.bodyUi, this.rotation, 'setRotation'));
    effect(() => connectInput(this.bodyUi, this.rotationX, 'setRotationX'));
    effect(() => connectInput(this.bodyUi, this.target, 'setTarget'));
    effect(() => connectInput(this.bodyUi, this.boundsZoom, 'setZoom'));

    effect((onCleanup) => {
      const bodyUi = this.bodyUi();
      if (bodyUi) {
        const subscriptions = new Subscription();
        subscriptions.add(connectOutput(this.nodeClick, bodyUi.nodeClick$));
        subscriptions.add(connectOutput(this.nodeDrag, bodyUi.nodeDrag$));
        subscriptions.add(connectOutput(this.nodeHoverStart, bodyUi.nodeHoverStart$));
        subscriptions.add(connectOutput(this.nodeHoverStop, bodyUi.nodeHoverStop$));
        subscriptions.add(() => bodyUi.finalize());
        onCleanup(() => subscriptions.unsubscribe());
      }
    });
  }

  /** Sets the deck gl zoom according to the provided bounds */
  zoomToBounds(bounds: XYZTriplet, margin = { x: 48, y: 48 }): void {
    const zoom = this.getBoundsZoom(bounds, margin);
    this.bodyUi()?.setZoom(zoom);
  }

  /** Returns zoom value according to current bounds */
  private getBoundsZoom(bounds: XYZTriplet, margin = { x: 48, y: 48 }): number {
    const { width, height } = this.canvas().nativeElement;
    const pxRatio = window.devicePixelRatio;
    return Math.min(
      Math.log2((width - margin.x) / pxRatio / bounds.x),
      Math.log2((height - margin.y) / pxRatio / bounds.y),
    );
  }
}
