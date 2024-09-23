import { HttpClient } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { type SpatialSceneNode } from '@hra-api/ng-client';
import { catchError, map, Observable, of, Subject, switchMap } from 'rxjs';
import { z } from 'zod';

// TODO: Try to improve this
export const SPATIAL_SCENE_NODE = z
  .object({})
  .passthrough()
  .refine((obj): obj is SpatialSceneNode => true);

export const SPATIAL_SCENE_NODE_ARRAY = z.array(SPATIAL_SCENE_NODE);

@Injectable()
export class SceneDataService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly sceneInput = new Subject<string | SpatialSceneNode[]>();

  readonly scene$ = this.sceneInput.pipe(switchMap((input) => this.loadSceneData(input)));
  readonly scene = toSignal(this.scene$, { initialValue: [] });

  setInput(input: string | SpatialSceneNode[] | undefined): void {
    this.sceneInput.next(input ? input : []);
  }

  private loadSceneData(value: string | SpatialSceneNode[]): Observable<SpatialSceneNode[]> {
    if (typeof value !== 'string') {
      return of(value);
    }

    return this.http.get(value).pipe(
      map((data) => SPATIAL_SCENE_NODE_ARRAY.parse(data)),
      catchError((error) => {
        this.errorHandler.handleError(error);
        return of<SpatialSceneNode[]>([]);
      }),
    );
  }
}
