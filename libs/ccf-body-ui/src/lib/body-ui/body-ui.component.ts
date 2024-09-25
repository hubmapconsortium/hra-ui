import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  ElementRef,
  ErrorHandler,
  inject,
  input,
  output,
  OutputEmitterRef,
  Signal,
  viewChild,
} from '@angular/core';
import { SpatialSceneNode } from '@hra-api/ng-client';
import { derivedAsync } from 'ngxtension/derived-async';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { z } from 'zod';
import { BodyUI, NodeClickEvent, NodeDragEvent } from '../body-ui';

export interface XYZTriplet<T = number> {
  x: T;
  y: T;
  z: T;
}

type SetterMethods<ValueT> = keyof {
  [P in keyof BodyUI as BodyUI[P] extends (v: ValueT) => void ? P : never]: BodyUI[P];
};

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

function connectOutput<T>(out: OutputEmitterRef<T>, source: Observable<T>): Subscription {
  return source.subscribe((value) => out.emit(value));
}

// TODO: Try to improve this
export const SPATIAL_SCENE_NODE = z
  .object({})
  .passthrough()
  .refine((obj): obj is SpatialSceneNode => true);

export const SPATIAL_SCENE_NODE_ARRAY = z.array(SPATIAL_SCENE_NODE);

const SCENE_INPUT = z.preprocess(tryParseJson, z.union([z.literal(''), z.string().url(), SPATIAL_SCENE_NODE_ARRAY]));

@Component({
  standalone: true,
  imports: [],
  selector: 'hra-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrl: './body-ui.component.scss',
})
export class BodyUiComponent {
  readonly scene = input(undefined, { transform: SCENE_INPUT.parse.bind(SCENE_INPUT) });

  readonly rotation = input<number>();
  readonly rotationX = input<number>();
  readonly zoom = input<number>();
  readonly target = input<[number, number, number]>();
  readonly bounds = input<XYZTriplet>();
  readonly camera = input<string>();
  readonly interactive = input<boolean>();

  readonly rotationChange = output<[number, number]>();
  readonly nodeClick = output<NodeClickEvent>();
  readonly nodeDrag = output<NodeDragEvent>();
  readonly nodeHoverStart = output<SpatialSceneNode>();
  readonly nodeHoverStop = output<SpatialSceneNode>();
  readonly initialized = output<void>();

  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandler);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
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

  private readonly boundsZoom = computed(() => {
    const bounds = this.bounds();
    return bounds ? this.getBoundsZoom(bounds) : undefined;
  });

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

  zoomToBounds(bounds: XYZTriplet, margin = { x: 48, y: 48 }): void {
    const zoom = this.getBoundsZoom(bounds, margin);
    this.bodyUi()?.setZoom(zoom);
  }

  private getBoundsZoom(bounds: XYZTriplet, margin = { x: 48, y: 48 }): number {
    const { width, height } = this.canvas().nativeElement;
    const pxRatio = window.devicePixelRatio;
    return Math.min(
      Math.log2((width - margin.x) / pxRatio / bounds.x),
      Math.log2((height - margin.y) / pxRatio / bounds.y),
    );
  }
}
