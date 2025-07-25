import { CompositeLayer, COORDINATE_SYSTEM, LayersList } from '@deck.gl/core/typed';
import { TextLayer } from '@deck.gl/layers/typed';
import { ScenegraphLayer, SimpleMeshLayer } from '@deck.gl/mesh-layers/typed';
import { Matrix4 } from '@math.gl/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Ignore missing typings
import { ConeGeometry, CubeGeometry, CylinderGeometry, Geometry, SphereGeometry } from '@luma.gl/core';

import { SpatialSceneNode } from './shared/spatial-scene-node';
import { loadGLTF, loadGLTF2, registerGLTFLoaders } from './util/load-gltf';
import { doCollisions } from './util/spatial-scene-collider';

/**
 * This function creates a SimpleMeshLayer based on the provided geometry type and options.
 * It supports different geometries like sphere, cone, cylinder, and cube.
 * @param id
 * @param data
 * @param options
 * @returns layer
 */
function meshLayer(
  id: string,
  data: SpatialSceneNode[],
  options: { [key: string]: unknown },
): SimpleMeshLayer<unknown> | undefined {
  if (!data || data.length === 0) {
    return undefined;
  }
  let mesh: Geometry;
  switch (options['geometry']) {
    case 'sphere':
      mesh = new SphereGeometry();
      break;
    case 'cone':
      mesh = new ConeGeometry();
      break;
    case 'cylinder':
      mesh = new CylinderGeometry();
      break;
    case 'cube':
    default:
      mesh = new CubeGeometry();
      break;
  }
  return new SimpleMeshLayer({
    ...{
      id,
      pickable: true,
      autoHighlight: false,
      highlightColor: [30, 136, 229, 255],
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      data,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mesh: mesh as any,
      wireframe: false,
      getColor: (d) => (d as { color: [number, number, number, number] }).color || [255, 255, 255, 0.9 * 255],
      getTransformMatrix: (d) => (d as { transformMatrix: number[] }).transformMatrix,
    },
    ...options,
  });
}

/**
 * This function creates a TextLayer for rendering text based on the provided data and options.
 * @param id
 * @param data
 * @param options
 * @returns layer
 */
function textLayer(
  id: string,
  data: SpatialSceneNode[],
  options: { [key: string]: unknown },
): TextLayer<unknown> | undefined {
  if (!data || data.length === 0) {
    return undefined;
  }
  return new TextLayer({
    ...{
      id,
      pickable: true,
      data: data.map((d) => ({
        ...d,
        position: new Matrix4(d.transformMatrix).getTranslation(),
      })),
      getText: (d) => (d as { text: string }).text,
      getPosition: (d) => (d as { position: [number, number] }).position,
      getColor: (d) => (d as { color: [number, number, number, number] }).color,
    },
    ...options,
  });
}

/**
 * This class extends CompositeLayer to create a custom layer that manages multiple sub-layers, including mesh and text layers.
 * It handles the initialization, rendering, and picking information for the layers.
 */
export class BodyUILayer extends CompositeLayer<SpatialSceneNode> {
  /** The layer name */
  static override readonly layerName = 'BodyUILayer';
  /** The GLTF Cache */
  static readonly gltfCache: { [url: string]: Promise<Blob> } = {};

  /**
   * This function initializes the state of the BodyUILayer class.
   * It sets the initial state with the provided data, a default zoom opacity of 0.8, and a flag to control collision detection.
   * It also registers GLTF loaders.
   */
  override initializeState(): void {
    const { data } = this.props;
    this.setState({ data: data ?? [], zoomOpacity: 0.8, doCollisions: false });
    registerGLTFLoaders();
  }

  /**
   * This function renders the layers based on the current state.
   * It categorizes the data into different geometries and creates corresponding layers for each geometry type.
   * It also handles loading GLTF models and manages collision detection if enabled.
   * @returns LayersList - A list of layers to be rendered.
   */
  renderLayers(): LayersList {
    const state = this.state as {
      data: SpatialSceneNode[];
      zoomOpacity: number;
      doCollisions: boolean;
    };
    const geometries: Record<string, SpatialSceneNode[]> = {
      sphere: [],
      cone: [],
      cylinder: [],
      cube: [],
      text: [],
      wireframe: [],
      scenegraph: [],
    };

    for (const node of state.data) {
      const geometry = node.geometry ?? 'cube';
      if (node.scenegraph) {
        geometries['scenegraph'].push(node);
      } else if (geometries[geometry] !== undefined) {
        geometries[geometry].push(node);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url2gltf: { [url: string]: Promise<any> } = {};
    for (const m of geometries['scenegraph']) {
      if (m.scenegraph && m.scenegraphNode && !Object.prototype.hasOwnProperty.call(url2gltf, m.scenegraph)) {
        url2gltf[m.scenegraph] = loadGLTF({ scenegraph: m.scenegraph } as SpatialSceneNode, BodyUILayer.gltfCache);
      }
    }

    const layers: unknown[] = [];
    for (const [geometry, nodes] of Object.entries(geometries)) {
      if (geometry === 'scenegraph') {
        for (const model of nodes) {
          layers.push(
            new ScenegraphLayer({
              id: 'models-' + model['@id'],
              opacity: model.zoomBasedOpacity ? state.zoomOpacity : (model.opacity ?? 1.0),
              pickable: !model.unpickable,
              coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
              data: [model],
              scenegraph: model.scenegraphNode
                ? loadGLTF2(model.scenegraphNode, url2gltf[model.scenegraph as string])
                : (model.scenegraph as unknown as URL),
              _lighting: model._lighting as 'pbr', // 'pbr' | undefined
              getTransformMatrix: model.transformMatrix,
              getColor: model.color ?? [0, 255, 0, 0.5 * 255],
              parameters: {
                depthMask: !model.zoomBasedOpacity && (model.opacity === undefined || model.opacity === 1),
              },
            }),
          );
        }
      } else if (geometry === 'text') {
        layers.push(
          textLayer(
            'text',
            nodes.filter((n) => n.unpickable),
            { pickable: false },
          ),
        );
        layers.push(
          textLayer(
            'textPickable',
            nodes.filter((n) => !n.unpickable),
            { pickable: true },
          ),
        );
      } else if (geometry === 'wireframe') {
        layers.push(
          meshLayer(geometry, nodes, {
            wireframe: true,
            pickable: false,
            geometry,
          }),
        );
      } else {
        layers.push(
          meshLayer(
            geometry,
            nodes.filter((n) => n.unpickable),
            { wireframe: false, pickable: false, geometry },
          ),
        );
        layers.push(
          meshLayer(
            `${geometry}Pickable`,
            nodes.filter((n) => !n.unpickable),
            { wireframe: false, pickable: true, geometry },
          ),
        );
      }
    }

    if (state.doCollisions) {
      doCollisions(state.data);
    }

    return layers.filter((l) => !!l) as LayersList;
  }

  /**
   * This function provides information about the picked object when the user interacts with the layer. It returns the picking information from the event.
   */
  override getPickingInfo(
    e: Parameters<CompositeLayer<SpatialSceneNode>['getPickingInfo']>[0],
  ): ReturnType<CompositeLayer<SpatialSceneNode>['getPickingInfo']> {
    return e.info;
  }
}
