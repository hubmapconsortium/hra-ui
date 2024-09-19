function squaredDistance3D(a: number[], b: number[]): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return dx * dx + dy * dy + dz * dz;
}

const CELL_OFFSETS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
];

function* getClosest(sources: number[][], sourceIndexes: number[], targets: number[][], maxDistSquared: number) {
  for (const [index, source] of sources.entries()) {
    let minDist = maxDistSquared;
    let closest: number[] | undefined;
    for (const target of targets) {
      const distSquared = squaredDistance3D(source, target);
      if (distSquared < minDist) {
        minDist = distSquared;
        closest = target;
      }
    }
    if (closest) {
      yield [sourceIndexes[index], ...source, ...closest];
    }
  }
}

function addToCell(node: any, cells: any) {
  const cx = (cells[node.cell[0]] = cells[node.cell[0]] || {});
  const cy = (cx[node.cell[1]] = cx[node.cell[1]] || {
    nodes: [],
    positions: [],
  });
  cy.nodes.push(node.__index__);
  cy.positions.push(node.position);
}

export function* distanceEdges(nodes: any[], type_field: string, target_type: string, maxDist: number) {
  console.log(nodes, type_field, target_type, maxDist);
  const source_cells: any = {};
  const target_cells: any = {};
  for (const [node_index, node] of nodes.entries()) {
    node.__index__ = node_index;
    node.position = [node.x ?? 0, node.y ?? 0, node.z ?? 0];
    node.cell = [Math.floor(node.x / maxDist), Math.floor(node.y / maxDist)];
    if (node[type_field] === target_type) {
      addToCell(node, target_cells);
    } else {
      addToCell(node, source_cells);
    }
  }

  const maxDistSquared = maxDist * maxDist;
  for (const sourceCellX in source_cells) {
    for (const sourceCellY in source_cells[sourceCellX]) {
      const sources = source_cells[sourceCellX][sourceCellY];
      let allTargets: number[][] = [];
      for (const [offsetX, offsetY] of CELL_OFFSETS) {
        const cellX = parseInt(sourceCellX) + offsetX;
        const cellY = parseInt(sourceCellY) + offsetY;
        const targets = target_cells[cellX]?.[cellY];
        if (targets) {
          allTargets = allTargets.concat(targets.positions);
        }
      }
      if (allTargets.length > 0) {
        yield* getClosest(sources.positions, sources.nodes, allTargets, maxDistSquared);
      }
    }
  }
}
