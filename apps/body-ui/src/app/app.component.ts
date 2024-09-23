import { Component, computed, DestroyRef, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BodyUI } from 'ccf-body-ui';
import { map, Observable, switchMap } from 'rxjs';
import { z } from 'zod';
import { SceneDataService, SPATIAL_SCENE_NODE_ARRAY } from './scene-data.service';

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

const SCENE_INPUT = z.preprocess(tryParseJson, z.union([z.literal(''), z.string().url(), SPATIAL_SCENE_NODE_ARRAY]));

@Component({
  standalone: true,
  imports: [],
  providers: [SceneDataService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /** Scene can be a url or a json encoded string (TODO) */
  readonly scene = input(undefined, { transform: SCENE_INPUT.parse.bind(SCENE_INPUT) });

  readonly onMouseEnter = output<string>();
  readonly onMouseLeave = output<string>();
  readonly onClick = output<string>();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly deck = computed(() => {
    return new BodyUI({
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
  });
  private readonly deckInitialized = toSignal(this.getDeckInitialization(), { initialValue: false });

  private readonly sceneDataService = inject(SceneDataService);

  constructor() {
    effect(() => {
      this.sceneDataService.setInput(this.scene());
    });

    effect(() => {
      if (this.deckInitialized()) {
        this.deck().setScene(this.sceneDataService.scene());
      }
    });

    inject(DestroyRef).onDestroy(() => {
      this.deck().finalize();
    });
  }

  private getDeckInitialization(): Observable<boolean> {
    return toObservable(this.deck).pipe(
      switchMap((deck) => deck.initialize()),
      map(() => true),
    );
  }
}
