import { parse, registerLoaders } from '@loaders.gl/core';
import { DracoLoader, DracoWorkerLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { Matrix4 } from '@math.gl/core';

import { SpatialSceneNode } from '../shared/spatial-scene-node';
import { traverseScene } from './scene-traversal';

/**
 * This function registers the GLTF loaders, including the DracoWorkerLoader and GLTFLoader, to be used for loading GLTF files.
 */
export function registerGLTFLoaders(): void {
  registerLoaders([DracoWorkerLoader, GLTFLoader]);
}

/**
 * This function derives a scenegraph from a GLTF file based on the provided scenegraph node name.
 * It traverses the scenes in the GLTF file to find the specified node and updates its transformation matrix.
 * @param scenegraphNodeName The name of the scenegraph node to be derived.
 * @param gltf The GLTF file data.
 * @returns The updated GLTF file data with the derived scenegraph.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deriveScenegraph(scenegraphNodeName: string, gltf: any): any {
  const scenegraphNode = gltf.nodes?.find((n: { name: string }) => n.name === scenegraphNodeName);
  if (scenegraphNode) {
    let foundNodeInScene = false;
    for (const scene of gltf.scenes) {
      if (!foundNodeInScene) {
        traverseScene(scene, new Matrix4(Matrix4.IDENTITY), (child, modelMatrix) => {
          if (child === scenegraphNode) {
            child.matrix = modelMatrix;
            child.translation = undefined;
            child.rotation = undefined;
            child.scale = undefined;
            foundNodeInScene = true;
            return false;
          }
          return true;
        });
      }
    }
    gltf.scene = {
      id: scenegraphNodeName,
      name: scenegraphNodeName,
      nodes: [scenegraphNode],
    };
    gltf.scenes = [gltf.scene];

    return { scene: gltf.scene, scenes: gltf.scenes };
  } else {
    return gltf;
  }
}

/**
 * This function loads a GLTF file from a given URL and parses it using the GLTFLoader.
 * It also supports caching of the GLTF files. After loading, it derives the scenegraph for the specified node.
 * @param model The spatial scene node containing the scenegraph URL.
 * @param [cache] An optional cache for storing GLTF file promises.
 * @returns A promise that resolves to the parsed GLTF file data with the derived scenegraph.
 */
export async function loadGLTF(
  model: SpatialSceneNode,
  cache?: { [url: string]: Promise<Blob> },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const gltfUrl = model.scenegraph as string;
  let gltfPromise: Promise<Blob | Response>;
  if (cache) {
    gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then((r) => r.blob()));
  } else {
    gltfPromise = fetch(gltfUrl);
  }
  const gltf = await parse(gltfPromise, GLTFLoader, {
    DracoLoader,
    gltf: { decompressMeshes: true, postProcess: true },
  });

  if (!gltf.nodes) {
    console.log('WARNING: Empty Scene', gltfUrl, gltf);
  }

  return deriveScenegraph(model.scenegraphNode as string, gltf);
}

/**
 * This function loads a GLTF file from a promise and derives the scenegraph for the specified node.
 * @param scenegraphNodeName The name of the scenegraph node to be derived.
 * @param gltfPromise A promise that resolves to the GLTF file data.
 * @returns A promise that resolves to the parsed GLTF file data with the derived scenegraph.
 */
export async function loadGLTF2(
  scenegraphNodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gltfPromise: Promise<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return deriveScenegraph(scenegraphNodeName, await gltfPromise);
}
