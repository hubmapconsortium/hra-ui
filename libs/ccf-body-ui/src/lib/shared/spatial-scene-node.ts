import { Matrix4 } from '@math.gl/core';

/** Spatial scene geometry shapes */
export type SpatialSceneGeometry = 'sphere' | 'cube' | 'wireframe' | 'text' | 'cone' | 'cylinder';

/** This interface defines the structure of a spatial scene node, which represents an element in a spatial scene. */
export interface SpatialSceneNode {
  /** A unique identifier for the node. */
  '@id': string;
  /** The type of the node. */
  '@type': string;
  /** An optional entity identifier. */
  entityId?: string;
  /** An optional reference to what the node represents. */
  representation_of?: string;
  /** An optional reference to the organ associated with the node. */
  reference_organ?: string;
  /** A boolean indicating if the node is unpickable. */
  unpickable?: boolean;
  /** The geometry shape of the node, defined by the SpatialSceneGeometry type. */
  geometry?: SpatialSceneGeometry;
  /** Optional text associated with the node. */
  text?: string;
  /** Optional lighting information. */
  _lighting?: string;
  /** A URL or identifier for the scenegraph associated with the node. */
  scenegraph?: string;
  /** The specific node within the scenegraph. */
  scenegraphNode?: string;
  /** A boolean indicating if the opacity is based on zoom level. */
  zoomBasedOpacity?: boolean;
  /** A boolean indicating if the node should be zoomed to on load. */
  zoomToOnLoad?: boolean;
  /** An array representing the RGBA color of the node. */
  color?: [number, number, number, number];
  /** The opacity of the node. */
  opacity?: number;
  /** A Matrix4 object representing the transformation matrix of the node. */
  transformMatrix: Matrix4;
  /** The name of the node. */
  name?: string;
  /** Tooltip text for the node. */
  tooltip?: string;
  /** The priority of the node. */
  priority?: number;
}
