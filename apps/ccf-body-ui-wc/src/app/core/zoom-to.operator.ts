import { SpatialSceneNode } from 'ccf-database';
import { MonoTypeOperatorFunction, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function setZoomToIfMatching(entity: SpatialSceneNode, id: string | undefined): SpatialSceneNode {
  return entity.entityId !== id ? entity : { ...entity, zoomToOnLoad: true };
}

export function zoomTo(id: Observable<string | undefined>): MonoTypeOperatorFunction<SpatialSceneNode[]> {
  const idWithInitalValue = id.pipe(startWith(''));
  return (source) =>
    combineLatest([source, idWithInitalValue]).pipe(
      map(([entities, iD]) => entities.map((entity) => setZoomToIfMatching(entity, iD))),
    );
}
