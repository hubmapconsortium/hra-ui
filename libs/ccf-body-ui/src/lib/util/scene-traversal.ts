import { Matrix4, NumericArray } from '@math.gl/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SceneTraversalVisitor = (child: any, modelMatrix: Matrix4, parentMatrix: Matrix4) => boolean;

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
