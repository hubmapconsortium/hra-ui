import { SpatialSceneNode } from '@hra-api/ng-client';
import { MonoTypeOperatorFunction, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/** Set the zoomToOnLoad if the entities id matches */
function setZoomToIfMatching(entity: SpatialSceneNode, id: string | undefined): SpatialSceneNode {
  return entity.entityId !== id ? entity : { ...entity, zoomToOnLoad: true };
}

/**
 * Adds zoomToOnLoad to a data stream for the matching id
 *
 * @param id Id
 * @returns Operator that adds zoomToOnLoad
 */
export function zoomTo(id: Observable<string | undefined>): MonoTypeOperatorFunction<SpatialSceneNode[]> {
  const idWithInitalValue = id.pipe(startWith(''));
  return (source) =>
    combineLatest([source, idWithInitalValue]).pipe(
      map(([entities, iD]) => entities.map((entity) => setZoomToIfMatching(entity, iD))),
    );
}
