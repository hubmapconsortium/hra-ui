import { Matrix4, NumericArray } from '@math.gl/core';

/**
 * This type defines a visitor function for traversing a scene. The visitor function takes three parameters:
 * @param child The current child node being visited.
 * @param modelMatrix The model matrix of the current child node.
 * @param parentMatrix The model matrix of the parent node.
 * @returns A boolean indicating whether to continue the traversal.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SceneTraversalVisitor = (child: any, modelMatrix: Matrix4, parentMatrix: Matrix4) => boolean;

/**
 * This function traverses a scene graph, applying transformations and invoking a visitor function at each node.
 * @param scene The scene object to be traversed.
 * @param worldMatrix The world transformation matrix. If not provided, it defaults to the identity matrix.
 * @param visitor The visitor function to be invoked at each node.
 * @returns A boolean indicating whether the traversal was completed successfully.
 */
export function traverseScene(
  scene: {
    matrix: Readonly<NumericArray>;
    translation: Readonly<NumericArray>;
    rotation: Readonly<NumericArray>;
    scale: number | Readonly<NumericArray>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodes: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
  },
  worldMatrix: Matrix4,
  visitor: SceneTraversalVisitor,
): boolean {
  if (!worldMatrix) {
    worldMatrix = new Matrix4(Matrix4.IDENTITY);
  }
  const matrix = new Matrix4(Matrix4.IDENTITY);
  if (!scene) {
    return true;
  } else if (scene.matrix) {
    matrix.copy(scene.matrix);
  } else {
    matrix.identity();

    if (scene.translation) {
      matrix.translate(scene.translation);
    }

    if (scene.rotation) {
      const rotationMatrix = new Matrix4(Matrix4.IDENTITY).fromQuaternion(scene.rotation);
      matrix.multiplyRight(rotationMatrix);
    }

    if (scene.scale) {
      matrix.scale(scene.scale);
    }
  }
  const modelMatrix = new Matrix4(worldMatrix).multiplyRight(matrix);
  if (visitor(scene, modelMatrix, worldMatrix) === false) {
    return false;
  }
  for (const child of scene.nodes || scene.children || []) {
    if (traverseScene(child, modelMatrix, visitor) === false) {
      return false;
    }
  }
  return true;
}
