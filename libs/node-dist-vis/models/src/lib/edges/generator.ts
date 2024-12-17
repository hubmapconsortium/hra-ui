import { ErrorHandler, inject, Signal } from '@angular/core';
import {
  catchError,
  filter,
  finalize,
  fromEvent,
  map,
  NextObserver,
  Observable,
  of,
  take,
  tap,
  Unsubscribable,
  using,
} from 'rxjs';
import { AnyDataEntry } from '../data-view';
import { NodesView } from '../nodes';
import { EdgeEntry, EdgesInput, EdgesView, EMPTY_EDGES_VIEW } from './edges';

interface Cell {
  index: number;
  type: string;
  x: number;
  y: number;
  z: number;
  object: AnyDataEntry;
}

const CELL_NEIGHBORHOOD_OFFSETS: [number, number][] = [
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

class CellGrid {
  readonly grid: Record<number, Record<number, Cell[]>> = {};

  addCellAt(x: number, y: number, cell: Cell): void {
    this.ensureCellsExistsAt(x, y).push(cell);
  }

  getCellsAt(x: number, y: number): Cell[] | undefined {
    return this.grid[x]?.[y];
  }

  *getNonEmptyIndices(): Generator<[number, number]> {
    for (const x in this.grid) {
      for (const y in this.grid[x]) {
        yield [+x, +y];
      }
    }
  }

  *getNeighborhood(x: number, y: number): Generator<Cell, undefined, undefined> {
    for (const [xOffset, yOffset] of CELL_NEIGHBORHOOD_OFFSETS) {
      const cells = this.getCellsAt(x + xOffset, y + yOffset);
      if (cells !== undefined) {
        yield* cells;
      }
    }
  }

  private ensureCellsExistsAt(x: number, y: number): Cell[] {
    this.grid[x] ??= {};
    this.grid[x][y] ??= [];
    return this.grid[x][y];
  }
}

function partitionNodes(
  nodes: NodesView,
  targetSelector: string,
  maxDistance: number,
): { sourceCells: CellGrid; targetCells: CellGrid } {
  const sourceCells = new CellGrid();
  const targetCells = new CellGrid();
  let index = 0;

  for (const node of nodes) {
    const type = nodes.getCellTypeFor(node);
    const cell: Cell = {
      index,
      type,
      x: nodes.getXFor(node),
      y: nodes.getYFor(node),
      z: nodes.getZFor(node) ?? 0,
      object: node,
    };
    const grid = type === targetSelector ? targetCells : sourceCells;
    const gridX = Math.floor(cell.x / maxDistance);
    const gridY = Math.floor(cell.y / maxDistance);

    grid.addCellAt(gridX, gridY, cell);
    index++;
  }

  return { sourceCells, targetCells };
}

function cellDistanceSquared(cell1: Cell, cell2: Cell): number {
  const x = cell1.x - cell2.x;
  const y = cell1.y - cell2.y;
  const z = cell1.z - cell2.z;
  return x * x + y * y + z * z;
}

function findClosestCell(cell: Cell, candidates: Cell[], maxDistance: number): Cell | undefined {
  let distance = maxDistance * maxDistance;
  let closest: Cell | undefined = undefined;
  for (const candidate of candidates) {
    const value = cellDistanceSquared(cell, candidate);
    if (value < distance) {
      distance = value;
      closest = candidate;
    }
  }

  return closest;
}

export function* generateEdges(
  nodes: NodesView,
  targetSelector: string,
  maxDistance: number,
): Generator<EdgeEntry, undefined, undefined> {
  const { sourceCells, targetCells } = partitionNodes(nodes, targetSelector, maxDistance);
  if (Object.keys(targetCells).length === 0) {
    console.warn(`No target cells found using selector '${targetSelector}'`);
    return;
  }

  for (const [x, y] of sourceCells.getNonEmptyIndices()) {
    const candidates = Array.from(targetCells.getNeighborhood(x, y));
    for (const cell of sourceCells.getCellsAt(x, y) ?? []) {
      const closest = findClosestCell(cell, candidates, maxDistance);
      if (closest !== undefined) {
        yield {
          'Cell ID': cell.index,
          'Target ID': closest.index,
          X1: cell.x,
          Y1: cell.y,
          Z1: cell.z,
          X2: closest.x,
          Y2: closest.y,
          Z2: closest.z,
        };
      }
    }
  }
}

export interface InitializeMessage {
  type: 'initialize';
  nodes: Pick<NodesView, 'data' | 'keyMapping' | 'offset'>;
  targetSelector: string;
  maxDistance: number;
  reportStep?: number;
}

export interface ProgressMessage {
  type: 'progress';
  processed: number;
  total: number;
  timestamp: number;
}

export interface ResultMessage {
  type: 'result';
  edges: Pick<EdgesView, 'data' | 'keyMapping' | 'offset'>;
}

type WorkerResource = { worker: Worker } & Unsubscribable;
type WorkerEvent = MessageEvent<ProgressMessage | ResultMessage>;

const progressTimeFormat = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  fractionalSecondDigits: 3,
});

function formatProgressMessage(msg: ProgressMessage): string {
  const { processed, total, timestamp } = msg;
  const percentage = Math.round((100 * processed) / total);
  const time = progressTimeFormat.format(timestamp);
  return `Computing edges: ${percentage}% (${processed}/${total}) complete at ${time}`;
}

function createEdgeGeneratorWorker(
  nodes: NodesView,
  targetSelector: string,
  maxDistance: number,
): Observable<WorkerEvent> {
  const createWorker = (): WorkerResource => {
    const worker = new Worker(new URL('generator.worker.ts', import.meta.url));
    worker.postMessage({
      type: 'initialize',
      nodes: {
        data: nodes.data,
        keyMapping: nodes.keyMapping,
        offset: nodes.offset,
      },
      targetSelector,
      maxDistance,
    } satisfies InitializeMessage);

    return {
      worker,
      unsubscribe: () => worker.terminate(),
    };
  };
  const toEvents = (resource: unknown) => {
    const { worker } = resource as WorkerResource;
    return fromEvent<WorkerEvent>(worker, 'message');
  };

  return using(createWorker, toEvents);
}

export function createEdgeGenerator(
  nodes: Signal<NodesView>,
  edges: Signal<EdgesInput>,
  nodeTargetSelector: Signal<string>,
  maxEdgeDistance: Signal<number>,
  loading?: NextObserver<boolean>,
): () => Observable<EdgesView> | EdgesView {
  const errorHandler = inject(ErrorHandler);

  return () => {
    const view = nodes();
    const input = edges();
    const selector = nodeTargetSelector();
    const distance = maxEdgeDistance();
    if (
      input instanceof EdgesView ||
      view.length === 0 ||
      selector === '' ||
      !Number.isFinite(distance) ||
      distance <= 0
    ) {
      loading?.next(false);
      return EMPTY_EDGES_VIEW;
    }

    loading?.next(true);
    return createEdgeGeneratorWorker(view, selector, distance).pipe(
      tap((event) => {
        if (event.data.type === 'progress') {
          console.log(formatProgressMessage(event.data));
        }
      }),
      filter((event): event is MessageEvent<ResultMessage> => event.data.type === 'result'),
      take(1),
      map((event) => {
        const { data, keyMapping, offset } = event.data.edges;
        return new EdgesView(data, keyMapping, offset);
      }),
      catchError((error) => {
        errorHandler.handleError(error);
        return of(EMPTY_EDGES_VIEW);
      }),
      finalize(() => loading?.next(false)),
    );
  };
}
