import { SpatialSceneNode } from '@hra-api/ng-client';
import { MonoTypeOperatorFunction, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/** Color tuple */
export type Color = [number, number, number, number];

/**
 * Adds color to an entity if the id matches
 *
 * @param entity Entity to test
 * @param id Id to match
 * @param color Color to add
 * @returns The new entity
 */
function highlightIfMatching(entity: SpatialSceneNode, id: string | undefined, color: Color): SpatialSceneNode {
  return entity.entityId !== id ? entity : { ...entity, color };
}

/**
 * Adds color to a data stream for the matching id
 *
 * @param id Id
 * @returns Operator that adds color
 */
export function hightlight(
  id: Observable<string | undefined>,
  color: Color,
): MonoTypeOperatorFunction<SpatialSceneNode[]> {
  const idWithInitalValue = id.pipe(startWith(''));
  return (source) =>
    combineLatest([source, idWithInitalValue]).pipe(
      map(([entities, iD]) => entities.map((entity) => highlightIfMatching(entity, iD, color))),
    );
}
