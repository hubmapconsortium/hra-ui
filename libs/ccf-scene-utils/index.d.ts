import { SpatialEntity, SpatialSceneNode, SpatialSearch, SpatialPlacement } from '@hra-api/ng-client';

/**
 * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
 * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
 * @param includeLetters whether to show the keyboard letters associated with the origin points
 * @param centered whether to center the organ at the origin point
 * @returns a set of scene nodes for the body-ui
 */
declare function getOriginScene(node: SpatialEntity, includeLetters?: boolean, centered?: boolean): SpatialSceneNode[];

/**
 * Create a set of scene nodes for the body-ui to show the probing sphere and lines around it
 * for a given spatial search.
 * @param node the Spatial Entity (usually a reference organ) that the sphere is probing into
 * @param sphere the Spatial Search that defines where and how big the probing sphere is
 * @returns a set of scene nodes for the body-ui
 */
declare function getProbingSphereScene(node: SpatialEntity, sphere?: SpatialSearch): SpatialSceneNode[];

/**
 * Create a set of scene nodes for the body-ui to show the lines around a cube
 *
 * @param node the Spatial Entity that the scene is drawn around
 * @param placement the Spatial Placement where the cube is placed
 * @returns a set of scene nodes for the body-ui
 */
declare function getTissueBlockScene(node: SpatialEntity, placement: SpatialPlacement): SpatialSceneNode[];

export { getOriginScene, getProbingSphereScene, getTissueBlockScene };
